/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { LoginResponseModel } from "../types";
import {
  ButtonStyle1,
  InputStyle1,
  SelectStyle1,
  SpanStyle2,
  StyleTRProfile,
} from "../styles/Login.styled";

const Profile = () => {
  const [profile, setProfile] = useState<LoginResponseModel>();

  useEffect(() => {
    const details: string | null = localStorage.getItem("details");
    if (details !== null) {
      setProfile(JSON.parse(details));
    }
  }, []);

  const onUpdate = () => {};

  const onDelete = () => {};

  if (profile !== undefined && profile !== null) {
    return (
      <div
        className="card text-center"
        style={{
          width: "25rem",
          transform: "translate(-50%, 50%)",
          left: "50%",
          top: "50%",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{profile.username}</h5>
          <p className="card-text">{profile.userId}</p>
        </div>
        <table>
          <StyleTRProfile>
            <td>
              <SpanStyle2>Email : </SpanStyle2>
            </td>
            <td>
              <InputStyle1 type="text" value={profile.email} />
            </td>
          </StyleTRProfile>
          <StyleTRProfile>
            <td>
              <SpanStyle2>Mobile : </SpanStyle2>
            </td>
            <td>
              <InputStyle1 type="text" value={profile.mobile} />
            </td>
          </StyleTRProfile>
          <StyleTRProfile>
            <td>
              <SpanStyle2>Food Preference : </SpanStyle2>
            </td>
            <td>
              <SelectStyle1>
                <option value="" selected={profile.preference === ""}>
                  Please select the option
                </option>
                <option value="veg" selected={profile.preference === "veg"}>
                  Veg
                </option>
                <option
                  value="non-veg"
                  selected={profile.preference === "non-veg"}
                >
                  Non-Veg
                </option>
              </SelectStyle1>
            </td>
          </StyleTRProfile>
          <StyleTRProfile>
            <td>
              <SpanStyle2>User Type : </SpanStyle2>
            </td>
            <td>
              <InputStyle1
                disabled
                type="text"
                value={profile.type.toUpperCase()}
              />
            </td>
          </StyleTRProfile>
        </table>
        <div className="card-body">
          <ButtonStyle1 type="button" className="card-link" onClick={onUpdate}>
            Update
          </ButtonStyle1>
          <ButtonStyle1 type="button" className="card-link" onClick={onDelete}>
            Delete
          </ButtonStyle1>
        </div>
      </div>
    );
  }
  return <p>Unable to extract profile</p>;
};

export default Profile;
