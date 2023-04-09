import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Page }) {
  const navigate = useNavigate();
  const { isAuth, isStateUpdating } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isStateUpdating && !isAuth) {
      navigate("/login");
    }
  }, [isAuth, isStateUpdating, navigate]);
  return <>{isAuth && <Page />}</>;
}

export default ProtectedRoute;
