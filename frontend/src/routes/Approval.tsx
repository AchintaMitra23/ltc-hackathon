/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
import { Admins } from "../types";
import {
  ButtonStyle1,
  CheckBoxStyle1,
  DivStyle2,
  SpanStyle1,
} from "../styles/Approval.styled";
import { getAllUnapprovedAdmins } from "../apis/getAllUnapprovedAdmins";
import { saveAllAdmins } from "../apis/saveAllAdmins";

const Approval = () => {
  const [adminList, setAdminList] = useState<Admins[]>([]);
  const employeeID: string = localStorage.getItem("employeeID");

  useEffect(() => {
    getAllAdmins();
  }, []);

  const getAllAdmins = async () => {
    await getAllUnapprovedAdmins()
      .then((response) => {
        if (response.status === 200) {
          setAdminList(response.body.user);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleComplete = (id: number) => {
    let newAdminList: Admins[] = [];
    for (let i of adminList) {
      if (i.userId === id) {
        i.approval_status = i.approval_status === "false" ? "true" : "false";
      }
      newAdminList.push(i);
    }
    setAdminList(newAdminList);
  };

  let adminApprovalRequestBody: any = {
    userId: 0,
    approvalStatus: "true",
    approved_by: employeeID,
    type: "admin",
  };

  const onSubmit = async () => {
    adminList?.map(async (admin: Admins) => {
      if (admin.approval_status === "true") {
        adminApprovalRequestBody.userId = admin.userId;
        await saveAllAdmins(adminApprovalRequestBody)
          .then((response) => {
            if (response.status === 200) {
              alert("Saved Successfully");
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div className="m-5">
      {adminList?.length === 0 ? (
        <h4>Nothing to show.....</h4>
      ) : (
        <div>
          {adminList?.map((admin: Admins, index) => (
            <DivStyle2 key={index}>
              <CheckBoxStyle1
                type="checkbox"
                onChange={() => handleComplete(admin.userId)}
                checked={admin.approval_status === "true"}
              />
              <SpanStyle1>{admin.userId}</SpanStyle1>
              <SpanStyle1>{admin.username}</SpanStyle1>
              <SpanStyle1>{admin.email}</SpanStyle1>
            </DivStyle2>
          ))}
          <ButtonStyle1 type="button" onClick={onSubmit}>
            Submit
          </ButtonStyle1>
        </div>
      )}
    </div>
  );
};

export default Approval;
