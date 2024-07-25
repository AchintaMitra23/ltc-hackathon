/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  ErrorStyle,
  StyledDiv1,
  StyledH5,
  StyledSelect,
} from "../styles/Login.styled";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../apis/register";
import { LoginResponseModel } from "../types";

interface RegisterProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const Register = ({ setIsAuth }: RegisterProps) => {
  const [empId, setEmpId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("password");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [pref, setPref] = useState<string>("");
  const [type, setType] = useState<string>("user");
  const [empIdError, setEmpIdError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");
  const [prefError, setPrefError] = useState<string>("");
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

  const handlePrefChange = (e: any) => {
    const preference = e.target.value;
    if (preference === null || preference === "") {
      setPrefError("Please enter the preference");
    } else {
      setPrefError("");
    }
    setPref(preference);
  };

  const register = async (e: any) => {
    e.preventDefault();
    if (
      empId !== "" &&
      name !== "" &&
      email !== "" &&
      mobile !== "" &&
      pref !== "" &&
      empIdError === "" &&
      nameError === "" &&
      emailError === "" &&
      mobileError === "" &&
      prefError === ""
    ) {
      await registerAPI(registerRequestModel)
        .then((response) => {
          if (response.status === 201) {
            console.log(response.body.message);
            const loginResponse: LoginResponseModel = response.body.user;
            localStorage.setItem("details", JSON.stringify(loginResponse));
            localStorage.setItem("userType", loginResponse.type);
            localStorage.setItem("employeeID", loginResponse.userId);
            setIsAuth(true);
            if (
              loginResponse.type === "user" ||
              loginResponse.type === "customer"
            ) {
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
      if (empId === "") setEmpIdError("Please enter valid employee id.");
      if (name === "") setNameError("Please enter valid full name.");
      if (email === "") setEmailError("Please enter valid email.");
      if (mobile === "") setMobileError("Please enter valid mobile number.");
      if (pref === "") setPrefError("Please select valid food preference.");
    }
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-12"></div>
          <StyledDiv1 className="col-lg-4 col-sm-12 card border-light-subtle shadow-lg pt-5 pb-5">
            <StyledH5 className="text-center mb-5">
              Please fill the details
            </StyledH5>
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
                  <label className="form-label">Employee ID</label>
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
                  <label className="form-label">Password</label>
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
                  <label className="form-label">Full Name</label>
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
                  <label className="form-label">Email ID</label>
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
                  <label className="form-label">Mobile No.</label>
                  {mobileError !== "" && <ErrorStyle>{mobileError}</ErrorStyle>}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Preference</label>
                <div className="form-floating mb-3">
                  <StyledSelect onChange={(e) => handlePrefChange(e)}>
                    <option value="">Please select the option</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                  </StyledSelect>
                </div>
                {prefError !== "" && <ErrorStyle>{prefError}</ErrorStyle>}
              </div>
              <div className="col-12 mt-3 mb-3">
                <label className="form-label">User Type : </label>{" "}
                <input
                  type="radio"
                  checked={type === "user"}
                  onChange={() => setType("user")}
                />{" "}
                User
                <input
                  type="radio"
                  checked={type === "admin"}
                  onChange={() => setType("admin")}
                />{" "}
                Admin
              </div>
              <div className="col-12">
                <div className="d-grid">
                  <button
                    className="btn btn-dark btn-lg"
                    type="submit"
                    onClick={(e) => register(e)}
                  >
                    Register Now
                  </button>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                  <Link to="/login">Already existing account</Link>
                </div>
              </div>
            </form>
          </StyledDiv1>
          <div className="col-lg-4 col-sm-12"></div>
        </div>
      </div>
    </section>
  );
};

export default Register;
