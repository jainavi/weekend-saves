import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import ErrorList from "./ErrorList";

function Layout() {
  return (
    <>
      <Navbar />
      <ErrorList />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
