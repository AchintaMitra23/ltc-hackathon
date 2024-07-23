import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./AuthPage";
import Bookings from "./Bookings";
import Profile from "./Profile";
import History from "./History";
import Approval from "./Approval";
import BookingList from "./BookingList";

const RoutesIndex = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AuthPage />} />

        {/* Users pages */}
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />

        {/* HR pages */}
        <Route path="/approval" element={<Approval />} />

        {/* Admin pages */}
        <Route path="/booking-list" element={<BookingList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesIndex;
