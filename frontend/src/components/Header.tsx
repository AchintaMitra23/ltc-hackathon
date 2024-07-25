/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const Header = ({ setIsAuth }: HeaderProps) => {
  const userType: string | null = localStorage.getItem("userType");
  const navigate: any = useNavigate();

  const onLogout = () => {
    setIsAuth(false);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          {/* <img src="assets/logo.jpeg" alt="" /> */}
          Lunch Box
        </a>
        {userType !== null && userType !== "" && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                {userType === "user" || userType === 'customer' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/bookings">
                      Order
                    </NavLink>
                  </li>
                )}
                {userType === "user" || userType === 'customer' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/history">
                      Order History
                    </NavLink>
                  </li>
                )}
                {userType === "user" || userType === 'customer' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      User Profile
                    </NavLink>
                  </li>
                )}
                {userType === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/booking-list">
                      Bookings
                    </NavLink>
                  </li>
                )}
                {userType === "hr" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/approval">
                      Approvals
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link" onClick={onLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
