import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
import App from "./App";
import LoginPage from "./pages/login/index";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/index";
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      {
        path: "/login",
        element: <LoginPage />,
        children: [{ path: "/login", element: <LoginForm /> }],
      },
      {
        path: "/register",
        element: <LoginPage />,
        children: [{ path: "/register", element: <RegisterForm /> }],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
