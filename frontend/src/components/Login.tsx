/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledDiv1, StyledH5 } from "../styles/Login.styled";

const Login = () => {
  const [empId, setEmpId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate: any = useNavigate();

  const loginRequestModel = {
    empId: empId,
    password: password,
  };

  const handleEmplIDChange = (e: any) => {
    const id: any = e.target.value;
    setEmpId(id);
  };

  const handlePasswordChange = (e: any) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  const login = (e: any) => {
    e.preventDefault();
    console.log(loginRequestModel);
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-12"></div>
          <StyledDiv1 className="col-lg-4 col-sm-12 card border-light-subtle shadow-lg pt-5 pb-5">
            <StyledH5 className="text-center mb-5">
              Welcome back you've been missed!
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
                <div className="d-grid">
                  <button
                    className="btn btn-dark btn-lg"
                    type="submit"
                    onClick={(e) => login(e)}
                  >
                    Login Now
                  </button>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                  <a
                    href=""
                    className="link-secondary text-decoration-none"
                    onClick={() => navigate('/register')}
                  >
                    Create new account
                  </a>
                  <a href="" className="link-secondary text-decoration-none">
                    Forgot password
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

export default Login;
