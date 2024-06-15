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
      href: "/dashboard/overview",
      icon: FaHome,
      text: "Overview",
    },
    {
      href: "/dashboard/userslist",
      icon: FaUsers,
      text: "Users List",
    },
    {
      href: "/dashboard/productlist",
      icon: FaList,
      text: "Product List",
    },
    {
      href: "/dashboard/sales",
      icon: FaCashRegister,
      text: "Sales",
    },
    {
      href: "/dashboard/addproducts",
      icon: FaUtensils,
      text: "Add Products",
    },
    {
      href: "/dashboard/payments",
      icon: FaDollarSign,
      text: "Payments",
    },
  ],
  manager: [
    {
      href: "/dashboard/overview",
      icon: FaHome,
      text: "Overview",
    },
    {
      href: "/dashboard/productlist",
      icon: FaList,
      text: "Product List",
    },
    {
      href: "/dashboard/sales",
      icon: FaCashRegister,
      text: "Sales",
    },
    {
      href: "/dashboard/addproducts",
      icon: FaUtensils,
      text: "Add Products",
    },
    {
      href: "/dashboard/payments",
      icon: FaDollarSign,
      text: "Payments",
    },
  ],
  user: [
    {
      href: "/dashboard/profile",
      icon: FaUser,
      text: "Profile",
    },
    {
      href: "/dashboard/orderhistory",
      icon: FaHistory,
      text: "Order History",
    },
    {
      href: "/dashboard/deliveryaddress",
      icon: FaMapMarker,
      text: "Delivery Address",
    },
    {
      href: "/dashboard/myprescription",
      icon: FaFileMedicalAlt,
      text: "My Prescription",
    },
    {
      href: "/dashboard/submitreview",
      icon: FaStar,
      text: "Submit Review",
    },
  ],
};

const Dashboard = () => {
  const isAdmin = false; // Example user role, replace with actual logic
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

  useEffect(() => {
    const links = document.querySelectorAll(".dashboard-link");
    links.forEach((link) => {
      if (link.pathname === router.pathname) {
        link.classList.add("bg-blue-500", "text-white");
      } else {
        link.classList.remove("bg-blue-500", "text-white");
      }
    });
  }, [router.pathname]);

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="min-w-32 w-full min-h-screen text-[darkblue] bg-green-400">
        <ul className="menu">
          {menuItems[dashLocation]?.map((item) => (
            <li key={item.href} className="border-b-2 border-b-green-300">
              <Link
                href={`${dashLocation}/${item.href}`}
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
