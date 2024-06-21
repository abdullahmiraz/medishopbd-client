import Link from "next/link";
import React from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";

const OptionBar = () => {
  const navOptions = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <details>
          <summary>Medicines</summary>
          <ul className="p-2">
            <li>
              <a>OTC Medicines</a>
            </li>
            <li>
              <a>Prescription Medicines</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Products</summary>
          <ul className="p-2">
            <li>
              <a>Healthcare Products</a>
            </li>
            <li>
              <a>Men's Products</a>
            </li>
            <li>
              <a>Women's Products</a>
            </li>
            <li>
              <a>Kids' Items</a>
            </li>
            <li>
              <a>Baby Care</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Equipment</summary>
          <ul className="p-2">
            <li>
              <a>Device & Equipments</a>
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
    <div className="sticky top-0 z-10 bg-white">
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
