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
        className="flex-1 flex flex-col items-center gap-5 justify-center"
      >
        <Label htmlFor="email">Email:</Label>
        <Input name="email" placeholder="Email" />
        <Label htmlFor="password">Password:</Label>
        <Input name="password" placeholder="Password" />
        <Label htmlFor="phone number">Phone Number:</Label>
        <Input name="phoneNumber" placeholder="Phone Number" />
        <Label htmlFor="name">Name:</Label>
        <Input name="name" placeholder="Name" />
        <Button type="submit" color="btn-accent" size="btn-block">
          Register
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;
