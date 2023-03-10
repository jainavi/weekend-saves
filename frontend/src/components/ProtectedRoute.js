import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Page }) {
  const navigate = useNavigate();
  const { isAuth, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && !isAuth) {
      navigate("/login");
    }
  }, [isLoading, isAuth, navigate]);

  return <>{!isLoading && <Page />}</>;
}

export default ProtectedRoute;
