/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const Login = ({ isLogin, setIsLogin }: LoginProps) => {
  const [empId, setEmpId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [pref, setPref] = useState<string>("");
  const navigate: any = useNavigate();

  const loginRequestModel = {
    empId: empId,
    password: password,
  };

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

  const login = () => {
    console.log(loginRequestModel);
  };

  const register = () => {
    console.log(registerRequestModel);
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-12"></div>
          <div className="col-lg-4 col-sm-12 card border-light-subtle shadow-sm pt-5 pb-5">
            {isLogin ? (
              <h4 className="text-center mb-5">
                Welcome back you've been missed!
              </h4>
            ) : (
              <h4 className="text-center mb-5">Please fill the details</h4>
            )}
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
              {!isLogin && (
                <>
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
                      <select
                        name="pref"
                        id="pref"
                        onChange={(e) => handlePrefChange(e)}
                      >
                        <option value="">Please select the option</option>
                        <option value="v">Veg</option>
                        <option value="n">Non-Veg</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">User Type</label>
                    <div className="form-floating mb-3">
                      <select
                        name="type"
                        id="type"
                        onChange={(e) => handleTypeChange(e)}
                      >
                        <option value="">Please select the option</option>
                        <option value="u">User</option>
                        <option value="a">Admin</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              <div className="col-12">
                <div className="d-grid">
                  <button
                    className="btn btn-dark btn-lg"
                    type="submit"
                    onClick={isLogin ? login : register}
                  >
                    {isLogin ? <>Login Now</> : <>Register Now</>}
                  </button>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                  {isLogin ? (
                    <>
                      <a
                        href=""
                        className="link-secondary text-decoration-none"
                        onClick={() => setIsLogin(false)}
                      >
                        Create new account
                      </a>
                      <a
                        href=""
                        className="link-secondary text-decoration-none"
                      >
                        Forgot password
                      </a>
                    </>
                  ) : (
                    <a
                      href=""
                      className="link-secondary text-decoration-none"
                      onClick={() => setIsLogin(true)}
                    >
                      Already existing account
                    </a>
                  )}
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
