/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
import { Admins } from "../types";
import {
  ButtonStyle1,
  CheckBoxStyle1,
  DivStyle2,
  SpanStyle1,
} from "../styles/Login.styled";
import { getAllUnapprovedAdmins } from "../apis/getAllUnapprovedAdmins";
import { saveAllAdmins } from "../apis/saveAllAdmins";

const Approval = () => {
  const [adminList, setAdminList] = useState<Admins[]>([]);

  useEffect(() => {
    getAllAdmins();
  }, []);

  const getAllAdmins = async () => {
    await getAllUnapprovedAdmins().then((response) => {
      if (response.status === 200) {
        setAdminList(response.body.admins);
      }
    }).catch((error) => console.log(error));
  }

  const handleComplete = (id: number) => {
    let newAdminList: Admins[] = [];
    for (let i of adminList) {
      if (i.id === id) {
        i.approval_status = !i.approval_status;
      }
      newAdminList.push(i);
    }
    setAdminList(newAdminList);
  };

  const onSubmit = async () => {
    await saveAllAdmins(adminList).then((response) => {
      if (response.status === 200) {
        alert('Saved Successfully');
      }
    }).catch((error) => console.log(error));
  };

  return (
    <div className="m-5">
      <div>
        {adminList.length === 0 ? (
          <h4>Nothing to show.....</h4>
        ) : (
          <div>
            {adminList.map((admin, index) => (
              <DivStyle2 key={index}>
                <CheckBoxStyle1
                  type="checkbox"
                  onChange={() => handleComplete(admin.id)}
                  checked={admin.approval_status}
                />
                <SpanStyle1>{admin.id}</SpanStyle1>
                <SpanStyle1>{admin.name}</SpanStyle1>
                <SpanStyle1>{admin.email}</SpanStyle1>
              </DivStyle2>
            ))}
            <ButtonStyle1 type="button" onClick={onSubmit}>
              Submit
            </ButtonStyle1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approval;
