/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { StyledDiv1, StyledH5, StyledSelect } from "../styles/Login.styled";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [empId, setEmpId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [pref, setPref] = useState<string>("");
  const navigate: any = useNavigate();

  const registerRequestModel = {
    empId: empId,
    password: password,
    email: email,
    mobile: mobile,
    type: type,
    pref: pref,
  };

  const handleEmplIDChange = (e: any) => {
    const id: any = e.target.value;
    setEmpId(id);
  };

  const handlePasswordChange = (e: any) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  const handleEmailChange = (e: any) => {
    const emailId = e.target.value;
    setEmail(emailId);
  };

  const handleMobileChange = (e: any) => {
    const phone = e.target.value;
    setMobile(phone);
  };

  const handleTypeChange = (e: any) => {
    const userType = e.target.value;
    setType(userType);
  };

  const handlePrefChange = (e: any) => {
    const preference = e.target.value;
    setPref(preference);
  };

  const register = (e: any) => {
    e.preventDefault();
    console.log(registerRequestModel);
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
                    name="emp-id"
                    id="emp-id"
                    placeholder="Please enter employee id"
                    onChange={(e) => handleEmplIDChange(e)}
                    value={empId}
                    required
                  />
                  <label className="form-label">Employee ID</label>
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
                    onChange={(e) => handlePasswordChange(e)}
                    value={password}
                    required
                  />
                  <label className="form-label">Password</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Please enter email"
                    onChange={(e) => handleEmailChange(e)}
                    value={email}
                    required
                  />
                  <label className="form-label">Email ID</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    id="mobile"
                    placeholder="Please enter mobile"
                    onChange={(e) => handleMobileChange(e)}
                    value={mobile}
                    required
                  />
                  <label className="form-label">Mobile No.</label>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Preference</label>
                <div className="form-floating mb-3">
                  <StyledSelect
                    name="pref"
                    id="pref"
                    onChange={(e) => handlePrefChange(e)}
                  >
                    <option value="">Please select the option</option>
                    <option value="v">Veg</option>
                    <option value="n">Non-Veg</option>
                  </StyledSelect>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">User Type</label>
                <div className="form-floating mb-3">
                  <StyledSelect
                    name="type"
                    id="type"
                    onChange={(e) => handleTypeChange(e)}
                  >
                    <option value="">Please select the option</option>
                    <option value="u">User</option>
                    <option value="a">Admin</option>
                  </StyledSelect>
                </div>
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
                  <a
                    href=""
                    className="link-secondary text-decoration-none"
                    onClick={() => navigate("/login")}
                  >
                    Already existing account
                  </a>
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
