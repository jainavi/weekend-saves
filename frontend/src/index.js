import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
// import App from "./App";
import LoginPage from "./pages/login/index";
import Navbar from "./components/navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
