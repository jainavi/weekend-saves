import { useRef } from "react";

import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const searchRef = useRef();

  return (
    <>
      <div className="fixed w-full bg-neutral/[.1] backdrop-blur top-0 left-0 z-10">
        <div className="mx-4 lg:mx-0 lg:px-8">
          <div className="navbar justify-between max-w-[90rem] mx-auto">
            <div className="flex-1 w-1/3">
              <Link
                to="/"
                className="btn btn-ghost normal-case text-xl rounded-full text-secondry px-0"
              >
                Weekend-Saves
              </Link>
            </div>

            <div className="gap-2 bg-primary rounded-full px-1 lg:w-2/3 justify-around max-w-xl text-sm font-semibold text-neutral">
              <div
                tabIndex="1"
                className="transition-all flex justify-center gap-2 input rounded-full items-center w-10 pl-6  focus-within:w-28 focus-within:pl-2 lg:w-32 lg:focus-within:w-40 h-9 border-solid border-2 border-gray-400  hover:border-secondry focus-within:border-secondry"
              >
                <AiOutlineSearch className="text-grayL flex-none transition-transform ease-in-out scale-150 hover:scale-[175%] hover:text-gray-500 hover:cursor-pointer" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search"
                  className="lg:block outline-none text-black w-full"
                />
              </div>
              <Link
                to="/home"
                className="hidden lg:block box-content px-[5px] rounded transition ease-in-out hover:text-active cursor-pointer hover:scale-105"
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="hidden lg:block box-content px-[5px] rounded transition ease-in-out hover:text-active cursor-pointer hover:scale-105"
              >
                About Us
              </Link>

              <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <CgProfile className="hidden lg:block w-full h-full" />
                    <GiHamburgerMenu className="lg:hidden w-full h-full" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary rounded-box w-52"
                >
                  <li>
                    <Link to="/home" className="lg:hidden">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="lg:hidden">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
