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
        className="flex flex-col items-center gap-5"
      >
        <Label htmlFor="username">Username:</Label>
        <Input name="Username" />
        <Label htmlFor="password">Password:</Label>
        <Input name="Password" />
        <a className="self-end font-form text-gray hover:underline hover:text-grayL">
          Forgot Password?
        </a>
        <Button type="submit" color="btn-accent" size="btn-block">
          Login
        </Button>
        <a className="font-form text-accent hover:underline">Create Account</a>
      </form>
    </>
  );
}

export default LoginForm;
