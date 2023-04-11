import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import AuthPage from "./pages/auth/index";
import Layout from "./components/Layout";
import HomePage from "./pages/home/index";
import AboutUsPage from "./pages/aboutUs/index";
import ProfilePage from "./pages/profile/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <AuthRoute Page={AuthPage} /> },
      { path: "/register", element: <AuthRoute Page={AuthPage} /> },
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
