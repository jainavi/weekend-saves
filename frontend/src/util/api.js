import axios from "axios";

const serverUrl = "http://localhost:8080";

export async function registerHandler(data) {
  let response = {};
  try {
    const res = await axios.post(`${serverUrl}/auth/signup`, {
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
  } catch (err) {
    const error = new Error("Signup Failed");
    error.data = [];
    if (err.response) {
      error.message = err.response.data.message;
      error.data = err.response.data.data.map((body) => body.msg);
    }
    throw error;
  }
}

export async function loginHandler(data) {
  let response = {};
  try {
    const res = await axios.post(`${serverUrl}/auth/login`, {
      email: data.email,
      password: data.password,
    });
    if (res.status === 200) {
      response.data = res.data;
      response.msg = "Logged in successfully";
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      return response;
    }
    const error = new Error("Oops! Something went wrong");
    error.data = [];
    throw error;
  } catch (err) {
    const error = new Error("Login Failed");
    error.data = [];
    if (err.response) {
      error.message = err.response.data.message;
      error.data = err.response.data.data.map((body) => body.msg);
    }
    throw error;
  }
}
