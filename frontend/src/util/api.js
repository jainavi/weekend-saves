import axios from "axios";

export async function registerHandler(data) {
  let response = {};
  try {
    const res = await axios.put("http://localhost:8080/auth/signup", {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    if (res.status === 201) {
      response.statusCode = 201;
      response.msg = "Signed up successfully";
      return response;
    }
    const error = new Error("OOps! Something went wrong");
    error.data = [];
    throw error;
  } catch (err) {
    const error = new Error("Signup Failed");
    error.data = [];
    if (err.response) {
      error.data = err.response.data.data.map((body) => body.msg);
    }
    throw error;
  }
}
