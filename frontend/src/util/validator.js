export function registerFormValidator(data) {
  const { email, password, confirmPassword, phoneNumber, firstName, lastName } =
    data;
  let response = {
    ok: true,
    target: {},
    errorMsg: [],
  };
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex = /^[1-9][0-9]{9}$/;
  const nameRegex = /^[a-zA-Z]+$/;

  if (!emailRegex.test(email)) {
    response.ok = false;
    response.target.email = true;
    response.errorMsg.push("Invalid email");
  }
  if (password.length < 5) {
    response.ok = false;
    response.target.password = true;
    response.errorMsg.push("Password must be at least 5 characters long");
  }
  if (password !== confirmPassword) {
    response.ok = false;
    response.target.confirmPassword = true;
    response.errorMsg.push("Passwords must match");
  }
  if (!phoneRegex.test(phoneNumber)) {
    response.ok = false;
    response.target.phoneNumber = true;
    response.errorMsg.push("Invalid phone number");
  }
  if (!nameRegex.test(firstName)) {
    response.ok = false;
    response.target.firstName = true;
    response.errorMsg.push("Please provide a valid name");
  }
  if (!nameRegex.test(lastName)) {
    response.ok = false;
    response.target.lastName = true;
    response.errorMsg.push("Please provide a valid name");
  }
  return response;
}
