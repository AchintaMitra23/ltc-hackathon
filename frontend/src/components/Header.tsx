import { NavLink } from "react-router-dom";

const Header = () => {
  const userType: string = localStorage.getItem("userType");
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          Lunch Box
        </a>
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
            {userType === "USER" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/bookings">
                  Order
                </NavLink>
              </li>
            )}
            {userType === "USER" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/history">
                  Order History
                </NavLink>
              </li>
            )}
            {userType === "USER" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  User Profile
                </NavLink>
              </li>
            )}
            {userType === "ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/booking-list">
                  Bookings
                </NavLink>
              </li>
            )}
            {userType === "HR" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/approval">
                  Approvals
                </NavLink>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
