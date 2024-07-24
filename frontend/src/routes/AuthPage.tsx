import React from "react";
import Login from "../components/Login";

interface AuthPageProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const AuthPage = ({ isLogin, setIsLogin }: AuthPageProps) => {
  return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
};

export default AuthPage;
