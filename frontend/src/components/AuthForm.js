import { useLocation } from "react-router-dom";

import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";

const AuthForm = () => {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <LoginForm />;
  }
  return <RegisterForm />;
};

export default AuthForm;
