/* eslint-disable prefer-const */
import { useState } from "react";
import { Admins } from "../types";

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
    <div>
      <div>
        {adminList.length === 0 ? (
          <h4>Nothing to show.....</h4>
        ) : (
          <div>
            {adminList.map((admin, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => handleComplete(admin.id)}
                  checked={admin.approval_status}
                />
                <span>
                  {admin.id} - {admin.name} - {admin.email}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <input type="button" value="Submit" onClick={onSubmit} />
    </div>
  );
};

export default Approval;
