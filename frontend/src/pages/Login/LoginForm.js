import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";

function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold z-10 mx-auto">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col items-center gap-5 justify-center"
      >
        <Label htmlFor="username">Username:</Label>
        <Input name="username" placeholder="Username" />
        <Label htmlFor="password">Password:</Label>
        <Input name="password" placeholder="Password" />
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
