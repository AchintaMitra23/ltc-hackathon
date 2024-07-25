/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  ButtonStyle1,
  ErrorStyle,
  LoginLogo,
  StyledDiv1,
  StyledLabel,
  StyledLink,
} from "../styles/Login.styled";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../apis/register";
import { LoginResponseModel } from "../types";
import Logo from "../assets/logo.png";

interface RegisterProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const Register = () => {
  const [empId, setEmpId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("password");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [pref, setPref] = useState<string>("veg");
  const [type, setType] = useState<string>("user");
  const [empIdError, setEmpIdError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");
  const navigate: any = useNavigate();

  const registerRequestModel = {
    userId: empId,
    username: name,
    password: password,
    email: email,
    mobile: mobile,
    type: type,
    preference: pref,
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

  const handleNameChange = (e: any) => {
    const currentValue: any = e.target.value;
    if (currentValue && currentValue !== "") {
      if (RegExp(/^[a-zA-Z][a-zA-Z ]{3,}$/).exec(currentValue)) {
        setNameError("");
      } else {
        setNameError("Employee name should conatins three letters.");
      }
    } else if (currentValue === null || currentValue === "") {
      setNameError("Please enter the full name");
    } else {
      setNameError("Employee name should conatins three letters.");
    }
    setName(currentValue);
  };

  const handleEmailChange = (e: any) => {
    const currentValue: any = e.target.value;
    if (currentValue && currentValue !== "") {
      if (RegExp(/^[^\s@]+@lloydsbanking.com+$/).exec(currentValue)) {
        setEmailError("");
      } else {
        setEmailError("Email should be <abc>@lloydsbanking.com.");
      }
    } else if (currentValue === null || currentValue === "") {
      setEmailError("Please enter the email");
    } else {
      setEmailError("Email should be <abc>@lloydsbanking.com.");
    }
    setEmail(currentValue);
  };

  const handleMobileChange = (e: any) => {
    const currentValue: any = e.target.value;
    if (currentValue && currentValue !== "") {
      if (RegExp(/^[0-9]{10}$/).exec(currentValue)) {
        setMobileError("");
      } else {
        setMobileError("Mobile Number should contains 10 digits.");
      }
    } else if (currentValue === null || currentValue === "") {
      setMobileError("Please enter the mobile no");
    } else {
      setMobileError("Mobile Number should contains 10 digits.");
    }
    setMobile(currentValue);
  };

  const register = async (e: any) => {
    e.preventDefault();
    if (
      empId !== "" &&
      name !== "" &&
      email !== "" &&
      mobile !== "" &&
      empIdError === "" &&
      nameError === "" &&
      emailError === "" &&
      mobileError === ""
    ) {
      await registerAPI(registerRequestModel)
        .then((response) => {
          if (response.status === 201) {
            alert(response.body.message);
            const loginResponse: LoginResponseModel = response.body.user;
            if (loginResponse.userId !== null && loginResponse.userId !== "") {
              navigate("/login");
            }
            // localStorage.setItem("details", JSON.stringify(loginResponse));
            // localStorage.setItem("userType", loginResponse.type);
            // localStorage.setItem("employeeID", loginResponse.userId);
            // setIsAuth(true);
            // if (
            //   loginResponse.type === "user" ||
            //   loginResponse.type === "customer"
            // ) {
            //   navigate("/bookings");
            // } else if (loginResponse.type === "admin") {
            //   navigate("/booking-list");
            // } else if (loginResponse.type === "hr") {
            //   navigate("/approval");
            // }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (empId === "") setEmpIdError("Please enter valid employee id.");
      if (name === "") setNameError("Please enter valid full name.");
      if (email === "") setEmailError("Please enter valid email.");
      if (mobile === "") setMobileError("Please enter valid mobile number.");
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
                  placeholder="Please enter employee id"
                  onChange={(e) => handleEmplIDChange(e)}
                  value={empId}
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
                  placeholder="Please enter password"
                  value={password}
                  disabled
                />
                <StyledLabel className="form-label">Password</StyledLabel>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter full name"
                  onChange={(e) => handleNameChange(e)}
                  value={name}
                />
                <StyledLabel className="form-label">Full Name</StyledLabel>
                {nameError !== "" && <ErrorStyle>{nameError}</ErrorStyle>}
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Please enter email"
                  onChange={(e) => handleEmailChange(e)}
                  value={email}
                />
                <StyledLabel className="form-label">Email ID</StyledLabel>
                {emailError !== "" && <ErrorStyle>{emailError}</ErrorStyle>}
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Please enter mobile"
                  onChange={(e) => handleMobileChange(e)}
                  value={mobile}
                />
                <StyledLabel className="form-label">Mobile No.</StyledLabel>
                {mobileError !== "" && <ErrorStyle>{mobileError}</ErrorStyle>}
              </div>
            </div>
            <div className="col-12 mt-3 mb-3">
              <StyledLabel className="form-label">
                Food Preference :{" "}
              </StyledLabel>{" "}
              <input
                style={{ marginLeft: "5%", marginRight: "2.5%" }}
                type="radio"
                checked={pref === "veg"}
                onChange={() => setPref("veg")}
              />
              VEG
              <input
                style={{ marginLeft: "5%", marginRight: "2.5%" }}
                type="radio"
                checked={pref === "non-veg"}
                onChange={() => setType("non-veg")}
              />{" "}
              NON VEG
            </div>
            <div className="col-12 mt-3 mb-3">
              <StyledLabel className="form-label">User Type : </StyledLabel>{" "}
              <input
                style={{ marginLeft: "5%", marginRight: "2.5%" }}
                type="radio"
                checked={type === "user"}
                onChange={() => setType("user")}
              />
              USER
              <input
                style={{ marginLeft: "5%", marginRight: "2.5%" }}
                type="radio"
                checked={type === "admin"}
                onChange={() => setType("admin")}
              />{" "}
              ADMIN
            </div>
            <div className="col-12">
              <div className="d-grid">
                <ButtonStyle1
                  type="submit"
                  onClick={(e) => register(e)}
                >
                  Register Now
                </ButtonStyle1>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                <StyledLink to="/login">Already existing account</StyledLink>
              </div>
            </div>
          </form>
        </StyledDiv1>
        <div className="col-lg-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default Register;
