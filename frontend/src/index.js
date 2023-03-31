import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
// import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import AuthPage from "./pages/auth/index";
import Layout from "./components/Layout";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import HomePage from "./pages/home/index";
import AboutUsPage from "./pages/aboutUs/index";
import ProfilePage from "./pages/profile/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <AuthPage Page={AuthPage} /> },
      { path: "/register", element: <AuthPage Page={AuthPage} /> },
      { path: "/", element: <ProtectedRoute Page={HomePage} /> },
      { path: "/home", element: <ProtectedRoute Page={HomePage} /> },
      { path: "/about-us", element: <ProtectedRoute Page={AboutUsPage} /> },
      { path: "/profile", element: <ProtectedRoute Page={ProfilePage} /> },
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
