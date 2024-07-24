/* eslint-disable prefer-const */
import { useState } from "react";
import { Admins } from "../types";
import {
  ButtonStyle1,
  CheckBoxStyle1,
  DivStyle2,
  SpanStyle1,
} from "../styles/Login.styled";

const Approval = () => {
  const [adminList, setAdminList] = useState<Admins[]>([
    {
      id: 5606349,
      name: "Achinta",
      email: "achinta@lbg.com",
      approval_status: false,
    },
  ]);

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

  const onSubmit = () => {
    console.log(adminList);
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
