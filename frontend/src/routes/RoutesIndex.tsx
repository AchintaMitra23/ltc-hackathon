import { Route, Routes } from "react-router-dom";
import Bookings from "./Bookings";
import Profile from "./Profile";
import History from "./History";
import Approval from "./Approval";
import BookingList from "./BookingList";
import Login from "../components/Login";
import Register from "../components/Register";

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Users pages */}
      <Route path="/bookings" element={<Bookings />} />
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
