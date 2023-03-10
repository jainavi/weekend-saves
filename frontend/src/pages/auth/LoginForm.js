import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";
import { loginHandler } from "../../util/api";
import { pushSuccess, pushError } from "../../slices/uiSlice";
import { setLogin, setLogout } from "../../slices/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await loginHandler(formData);
      const remainingMilliseconds = 60 * 60 * 1000;
      dispatch(setLogin(res.data));
      setAutoLogout(remainingMilliseconds);
      dispatch(pushSuccess(res.msg));
      navigate("/home");
    } catch (err) {
      dispatch(pushError(err.message));
      err.data.forEach((msg) => dispatch(pushError(msg)));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const setAutoLogout = (remainingMilliseconds) => {
    setTimeout(() => {
      dispatch(setLogout());
      dispatch(pushSuccess("Session time out, Please log in again"));
      navigate("/login");
    }, remainingMilliseconds);
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold z-10 mx-auto">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 justify-center"
      >
        <Label htmlFor="email">Email:</Label>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <a className="self-end font-form font-light hover:font-normal text-gray hover:underline hover:text-grayL">
          Forgot Password?
        </a>
        <Button type="submit" color="btn-accent" size="btn-block">
          Login
        </Button>
        <Link
          to="/register"
          className="font-form text-accent hover:underline font-extralight hover:font-light hover:cursor-pointer"
        >
          Create Account
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
