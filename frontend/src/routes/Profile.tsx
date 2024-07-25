/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { LoginResponseModel } from "../types";
import {
  ButtonStyle1,
  ButtonStyle2,
  InputStyle1,
  SelectStyle1,
  SpanStyle2,
  StyledBody,
  StyleTRProfile,
} from "../styles/Profile.styled";

const Profile = () => {
  const [profile, setProfile] = useState<LoginResponseModel>();

  useEffect(() => {
    const details: string | null = localStorage.getItem("details");
    if (details !== null) {
      setProfile(JSON.parse(details));
    }
  }, []);

  const onUpdate = () => {
    alert("Work in progress...");
  };

  const onDelete = () => {
    alert("Work in progress...");
  };

  if (profile !== undefined && profile !== null) {
    return (
      <StyledBody className="card">
        <div className="card-body">
          <h2 className="card-title text-center">
            {profile.username.toString().toUpperCase()}
          </h2>
          <h4 className="card-text text-center">{profile.userId}</h4>
        </div>
        <table>
          <StyleTRProfile>
            <td>
              <SpanStyle2>EMAIL ID</SpanStyle2>
            </td>
            <td>
              <InputStyle1 type="text" value={profile.email} />
            </td>
          </StyleTRProfile>
          <StyleTRProfile>
            <td>
              <SpanStyle2>MOBILE</SpanStyle2>
            </td>
            <td>
              <InputStyle1 type="text" value={profile.mobile} />
            </td>
          </StyleTRProfile>
          <StyleTRProfile>
            <td>
              <SpanStyle2>FOOD PREFERENCE</SpanStyle2>
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
                  Non Veg
                </option>
              </SelectStyle1>
            </td>
          </StyleTRProfile>
          <StyleTRProfile>
            <td>
              <SpanStyle2>USER ROLE</SpanStyle2>
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
        <div className="card-body text-center">
          <ButtonStyle1 type="button" className="card-link" onClick={onUpdate}>
            UPDATE
          </ButtonStyle1>
          <ButtonStyle2 type="button" className="card-link" onClick={onDelete}>
            DELETE
          </ButtonStyle2>
        </div>
      </StyledBody>
    );
  }
  return <p>Unable to extract profile</p>;
};

export default Profile;
