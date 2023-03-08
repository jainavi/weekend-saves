import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";

function RegisterForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold z-10 mx-auto">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex-1 grid grid-cols-2 gap-5"
      >
        <Label htmlFor="email">Email:</Label>
        <Input name="email" placeholder="Email" extra="col-span-2" />
        <Label htmlFor="password">Password:</Label>
        <Input name="password" placeholder="Password" extra="col-span-2" />
        <Label htmlFor="confirmPassword">Confirm Password:</Label>
        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          extra="col-span-2"
        />
        <Label htmlFor="name">Name:</Label>
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          extra="col-span-2"
        />
        <Label htmlFor="firstName">First Name:</Label>
        <Input name="firstName" placeholder="First Name" />
        <Label htmlFor="firstName">Last Name:</Label>
        <Input name="lastName" placeholder="Last Name" />
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
