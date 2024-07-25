/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';
import { StyledLogoutAnchor, StyledLogoutLink, StyledNavLink } from "../styles/Header.styled";

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

  if (userType === undefined || userType === null) return null;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          <img src={Logo} alt="" width={100}/>
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
                  <StyledNavLink className="nav-item">
                    <NavLink className="nav-link" to="/bookings">
                      Order
                    </NavLink>
                  </StyledNavLink>
                )}
                {userType === "user" || userType === 'customer' && (
                  <StyledNavLink className="nav-item">
                    <NavLink className="nav-link" to="/history">
                      History
                    </NavLink>
                  </StyledNavLink>
                )}
                {userType === "user" || userType === 'customer' && (
                  <StyledNavLink className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </StyledNavLink>
                )}
                {userType === "admin" && (
                  <StyledNavLink className="nav-item">
                    <NavLink className="nav-link" to="/booking-list">
                      Bookings
                    </NavLink>
                  </StyledNavLink>
                )}
                {userType === "hr" && (
                  <StyledNavLink className="nav-item">
                    <NavLink className="nav-link" to="/approval">
                      Approvals
                    </NavLink>
                  </StyledNavLink>
                )}
                <StyledLogoutLink className="nav-item">
                  <StyledLogoutAnchor className="nav-link" onClick={onLogout}>
                    Logout
                  </StyledLogoutAnchor>
                </StyledLogoutLink>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
