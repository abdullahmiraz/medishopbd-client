import Link from "next/link";
import React from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";

const OptionBar = () => {
  const navOptions = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <details>
          <summary>Medicines</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Products</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Equipment</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a>Online Doctor's</a>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBars size={30} />
            </label>
            <ul
              tabIndex={0}
              className="menu  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default OptionBar;
