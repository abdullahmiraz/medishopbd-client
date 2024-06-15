"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // corrected import to useRouter
import { useEffect } from "react";
import {
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
      text: "Product List",
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
      text: "Product List",
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
      href: "profile",
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
  ],
};

const Dashboard = () => {
  const isAdmin = true; // Example user role, replace with actual logic
  const isManager = true; // Example user role, replace with actual logic
  const isUser = true; // Example user role, replace with actual logic

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
    <div className="flex">
      {/* dashboard side bar */}
      <div className="min-w-32 w-full h-screen text-[darkblue] bg-green-400">
        <ul className="menu p-0">
          {menuItems[dashLocation]?.map((item) => (
            <li key={item.href} className="border-b-2 border-b-green-300">
              <Link
                href={`../dashboard/${item.href}`}
                className="dashboard-link"
              >
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
