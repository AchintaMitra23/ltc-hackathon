import { Route, Routes } from "react-router-dom";
import AuthPage from "./AuthPage";
import Bookings from "./Bookings";
import Profile from "./Profile";
import History from "./History";
import Approval from "./Approval";
import BookingList from "./BookingList";

interface RoutesIndexProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const RoutesIndex = ({ isLogin, setIsLogin }: RoutesIndexProps) => {
  return (
      <Routes>
        <Route
          path=""
          element={<AuthPage isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

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
