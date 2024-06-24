"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // corrected import to useRouter
import { useEffect } from "react";
import {
  FaCartArrowDown,
  FaCashRegister,
  FaDollarSign,
  FaFileMedicalAlt,
  FaHistory,
  FaHome,
  FaList,
  FaMapMarker,
  FaStar,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { isAdmin, isManager, isUser } from "../../../userTurner";

const userId =
  typeof window !== "undefined" ? sessionStorage.getItem("firebaseUid") : null;
const menuItems = {
  admin: [
    {
      href: "overview",
      icon: FaHome,
      text: "Overview",
    },
    {
      href: "userslist",
      icon: FaUsers,
      text: "Users List",
    },
    {
      href: "productlist",
      icon: FaList,
      text: "Products List",
    },
    {
      href: "sales",
      icon: FaCashRegister,
      text: "Sales",
    },
    {
      href: "addproducts",
      icon: FaUtensils,
      text: "Add Products",
    },
    {
      href: "payments",
      icon: FaDollarSign,
      text: "Payments",
    },
  ],
  manager: [
    {
      href: "overview",
      icon: FaHome,
      text: "Overview",
    },
    {
      href: "productlist",
      icon: FaList,
      text: "Products List",
    },
    {
      href: "sales",
      icon: FaCashRegister,
      text: "Sales",
    },
    {
      href: "addproducts",
      icon: FaUtensils,
      text: "Add Products",
    },
    {
      href: "payments",
      icon: FaDollarSign,
      text: "Payments",
    },
  ],
  user: [
    {
      href: `profile/${userId}`,
      icon: FaUser,
      text: "Profile",
    },
    {
      href: "orderhistory",
      icon: FaHistory,
      text: "Order History",
    },
    {
      href: "deliveryaddress",
      icon: FaMapMarker,
      text: "Delivery Address",
    },
    {
      href: "myprescription",
      icon: FaFileMedicalAlt,
      text: "My Prescription",
    },
    {
      href: "submitreview",
      icon: FaStar,
      text: "Submit Review",
    },
    {
      href: "../../",
      icon: FaHome,
      text: "Home",
    },
    {
      href: "../../cart",
      icon: FaCartArrowDown,
      text: "Cart",
    },
  ],
};

const Dashboard = () => {
  isAdmin; // Example user role, replace with actual logic
  isManager; // Example user role, replace with actual logic
  isUser; // Example user role, replace with actual logic

  const dashLocation = isAdmin
    ? "admin"
    : isManager
    ? "manager"
    : isUser
    ? "user"
    : "/error";

  const router = useRouter();

  //   useEffect(() => {
  //     const links = document.querySelectorAll(".dashboard-link");
  //     links.forEach((link) => {
  //       if (link.pathname === router.pathname) {
  //         link.classList.add("bg-blue-500", "text-white");
  //       } else {
  //         link.classList.remove("bg-blue-500", "text-white");
  //       }
  //     });
  //   }, [router.pathname]);

  return (
    <div className="flex h-screen bg-green-400">
      {/* dashboard side bar */}
      <div className="min-w-32 w-full h-screen text-[darkblue] bg-green-400">
        <ul className="menu p-0">
          {menuItems[dashLocation]?.map((item) => (
            <li key={item.href} className="border-b-2 border-b-green-300">
              <Link href={`/dashboard/${item.href}`} className="dashboard-link">
                <item.icon />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* dashboard content */}
    </div>
  );
};

export default Dashboard;
