import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import StatusList from "./StatusList";

function Layout() {
  return (
    <>
      <Navbar />
      <StatusList />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
