/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const Login = () => {
  const [empId, setEmpId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmplIDChange = (e: any) => {
    console.log(e.target.value);
    setEmpId(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const login = () => {};

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-12"></div>
          <div className="col-lg-4 col-sm-12 card border-light-subtle shadow-sm pt-5 pb-5">
            <h4 className="text-center mb-5">
              Welcome back you've been missed!
            </h4>
            <form action="">
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
                    onClick={login}
                  >
                    Log in now
                  </button>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                  <a href="#!" className="link-secondary text-decoration-none">
                    Create new account
                  </a>
                  <a href="#!" className="link-secondary text-decoration-none">
                    Forgot password
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-sm-12"></div>
        </div>
      </div>
    </section>
  );
};

export default Login;
