/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonStyle1, ErrorStyle, LoginLogo, StyledDiv1, StyledLabel, StyledLink } from "../styles/Login.styled";
import { loginAPI } from "../apis/login";
import { LoginResponseModel } from "../types";
import Logo from "../assets/logo.png";

interface LoginProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const Login = ({ setIsAuth }: LoginProps) => {
  const [empId, setEmpId] = useState<string>("");
  const [password, setPassword] = useState<string>("password");
  const [empIdError, setEmpIdError] = useState<string>("");
  const navigate: any = useNavigate();

  const loginRequestModel = {
    empId: empId,
    password: password,
  };

  const handleEmplIDChange = (e: any) => {
    const currentValue: any = e.target.value;
    if (currentValue && currentValue !== "") {
      if (RegExp(/^[0-9]{7}$/).exec(currentValue)) {
        setEmpIdError("");
      } else {
        setEmpIdError("Employee id should contains 7 digits.");
      }
    } else if (currentValue === null || currentValue === "") {
      setEmpIdError("Please enter the employee id");
    } else {
      setEmpIdError("Employee id should contains 7 digits.");
    }
    setEmpId(currentValue);
  };

  const login = async (e: any) => {
    e.preventDefault();
    if (empId !== null && empId !== "" && empIdError === "") {
      await loginAPI(loginRequestModel)
        .then((response) => {
          if (response.status === 200) {
            const loginResponse: LoginResponseModel = response.body;
            localStorage.setItem("details", JSON.stringify(loginResponse));
            localStorage.setItem("userType", loginResponse.type);
            localStorage.setItem("employeeID", loginResponse.userId);
            setIsAuth(true);
            if (loginResponse.type === "user") {
              navigate("/bookings");
            } else if (loginResponse.type === "admin") {
              navigate("/booking-list");
            } else if (loginResponse.type === "hr") {
              navigate("/approval");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (empId === null || empId === "")
        setEmpIdError("Please enter valid employee id.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-sm-12"></div>
        <StyledDiv1 className="col-lg-4 col-sm-12 card border-light-subtle shadow-lg p-5">
          <LoginLogo>
            <img src={Logo} alt="" width={200} />
          </LoginLogo>
          <form>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="emp-id"
                  id="emp-id"
                  placeholder="Please enter employee id"
                  onChange={(e) => handleEmplIDChange(e)}
                  value={empId}
                  required
                />
                <StyledLabel className="form-label">Employee ID</StyledLabel>
                {empIdError !== "" && <ErrorStyle>{empIdError}</ErrorStyle>}
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Please enter password"
                  value={password}
                  required
                  disabled
                />
                <StyledLabel className="form-label">Password</StyledLabel>
              </div>
            </div>
            <div className="col-12">
              <div className="d-grid">
                <ButtonStyle1
                  type="submit"
                  onClick={(e) => login(e)}
                >
                  Login Now
                </ButtonStyle1>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                <StyledLink to="/register">Create new account</StyledLink>
              </div>
            </div>
          </form>
        </StyledDiv1>
        <div className="col-lg-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default Login;
