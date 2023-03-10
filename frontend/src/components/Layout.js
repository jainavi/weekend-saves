import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./Navbar";
import StatusList from "./StatusList";
import { setLogin, setLogout, setLoading } from "../slices/authSlice";
import { pushSuccess } from "../slices/uiSlice";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      dispatch(setLoading(false));
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      dispatch(setLogout());
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(setLogin({ token, userId }));
    setAutoLogout(remainingMilliseconds);
  }, []);

  const setAutoLogout = (remainingMilliseconds) => {
    setTimeout(() => {
      dispatch(setLogout());
      dispatch(pushSuccess("Session time out, Please log in again"));
      navigate("/login");
    }, remainingMilliseconds);
  };

  return (
    <>
      <Navbar />
      <StatusList />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
