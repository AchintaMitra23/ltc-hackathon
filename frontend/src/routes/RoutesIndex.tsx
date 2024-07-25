import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import History from "./History";
import Approval from "./Approval";
import BookingList from "./BookingList";
import Login from "../components/Login";
import Register from "../components/Register";
import Bookings from "./Bookings";

interface RoutesProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const RoutesIndex = ({ isAuth, setIsAuth }: RoutesProps) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route
        path="/login"
        element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
      />
      <Route
        path="/register"
        element={<Register isAuth={isAuth} setIsAuth={setIsAuth} />}
      />

      {/* Users pages */}
      <Route path="/bookings" element={<Bookings employeeId={'5607490'}/>} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />

      {/* HR pages */}
      <Route path="/approval" element={<Approval />} />

      {/* Admin pages */}
      <Route path="/booking-list" element={<BookingList />} />
    </Routes>
  );
};

export default RoutesIndex;
