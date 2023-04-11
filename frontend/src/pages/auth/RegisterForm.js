import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { pushError, pushSuccess } from "../../store/ui/uiSlice";
import { registerFormValidator } from "../../util/validator";
import { registerHandler } from "../../util/api";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isValid, setIsValid] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = registerFormValidator(formData);
    if (!response.ok) {
      setIsValid(response.target);
      response.errorMsg.forEach((msg) => {
        dispatch(pushError(msg));
      });
      return;
    }
    try {
      const res = await registerHandler(formData);
      dispatch(pushSuccess(res.msg));
      navigate("/login");
    } catch (err) {
      dispatch(pushError(err.message));
      err.data.forEach((msg) => dispatch(pushError(msg)));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
    setIsValid({ ...isValid, [name]: false });
  };

  const inputFeildStyling =
    "w-full pb-2 bg-secondary border-b-gray focus:border-none focus:outline focus:outline-offset-8 focus:outline-2 focus:pb-0";

  return (
    <>
      <h1 className="text-4xl font-extrabold z-10 mx-auto">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex-1 grid grid-cols-2 gap-5"
      >
        <Label htmlFor="email">Email:</Label>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          extra={`col-span-2 ${inputFeildStyling}`}
          onChange={handleChange}
          invalid={isValid.email}
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          extra={`col-span-2 ${inputFeildStyling}`}
          onChange={handleChange}
          invalid={isValid.password}
        />
        <Label htmlFor="confirmPassword">Confirm Password:</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          extra={`col-span-2 ${inputFeildStyling}`}
          onChange={handleChange}
          invalid={isValid.confirmPassword}
        />
        <Label htmlFor="phoneNumber">Phone Number:</Label>
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          extra={`col-span-2 ${inputFeildStyling}`}
          onChange={handleChange}
          invalid={isValid.phoneNumber}
        />
        <Label htmlFor="firstName">First Name:</Label>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          invalid={isValid.firstName}
          extra={inputFeildStyling}
        />
        <Label htmlFor="firstName">Last Name:</Label>
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          invalid={isValid.lastName}
          extra={inputFeildStyling}
        />
        <Button
          type="submit"
          color="btn-accent"
          size="btn-block"
          extra="col-span-2"
        >
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;
