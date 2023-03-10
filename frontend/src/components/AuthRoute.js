import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthRoute({ Page }) {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  });
  return <Page />;
}

export default AuthRoute;
