import { Outlet } from "react-router-dom";

import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import Container from "./Container";

function NavBar() {
  return (
    <Container>
      <div className=" fixed bg-neutral/50 backdrop-blur-sm w-[100vw] h-16 left-0 top-0 -z-10 " />
      <div className="navbar justify-between">
        <div className="flex-1 w-1/3">
          <a className="btn btn-ghost normal-case text-xl rounded-full">Weekend-Saves</a>
        </div>
        <div className="gap-2 bg-primary rounded-full px-1 w-2/3 justify-around max-w-xl">
          <div
            tabindex="1"
            className="transition-all flex gap-2 input rounded-full items-center w-32 focus-within:w-40 h-9 border-solid border-2 border-gray-400  hover:border-secondry focus-within:border-secondry"
          >
            <AiOutlineSearch className="transition-transform ease-in-out scale-150 hover:scale-[1.7] hover:text-gray-500 hover:cursor-pointer" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-black w-full"
            />
          </div>

          <div className="box-content px-[5px] rounded transition ease-in-out hover:text-active cursor-pointer hover:scale-105">
            Home
          </div>
          <div className="box-content px-[5px] rounded transition ease-in-out hover:text-active cursor-pointer hover:scale-105">
            About Us
          </div>

          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <CgProfile className="w-full h-full" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default NavBar;
