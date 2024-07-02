"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router"; // corrected import to useRouter
import { useEffect, useState } from "react";
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
import { serverUrl } from "../../../api";
import { User } from "firebase/auth";

const mongoUserId = sessionStorage.getItem("mongoUserId");

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
      href: "categorylist",
      icon: FaList,
      text: "Category List",
    },
    {
      href: "addproducts",
      icon: FaUtensils,
      text: "Add Products",
    },
    {
      href: "orders",
      icon: FaCashRegister,
      text: "Orders/Sales",
    },
    {
      href: "payments",
      icon: FaDollarSign,
      text: "Payments",
    },
    {
      href: "promocodes",
      icon: FaCashRegister,
      text: "Promo Codes",
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
      href: "categorylist",
      icon: FaList,
      text: "Category List",
    },
    {
      href: "addproducts",
      icon: FaUtensils,
      text: "Add Products",
    },
    {
      href: "orders",
      icon: FaCashRegister,
      text: "Orders/Sales",
    },
    {
      href: "payments",
      icon: FaDollarSign,
      text: "Payments",
    },
  ],
  user: [
    {
      href: `profile/${mongoUserId}`,
      icon: FaUser,
      text: "Profile",
    },
    {
      href: "orderhistory",
      icon: FaHistory,
      text: "Order History",
    },
    // {
    //   href: "deliveryaddress",
    //   icon: FaMapMarker,
    //   text: "Delivery Address",
    // },
    {
      href: "myprescription",
      icon: FaFileMedicalAlt,
      text: "My Prescription",
    },
    // {
    //   href: "submitreview",
    //   icon: FaStar,
    //   text: "Submit Review",
    // },
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

console.log(mongoUserId);

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
        console.log(userData);
        setUser(userData); // Assuming userData contains a 'role' property
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // if (!user) {
  //   return <div>You are not allowed to see this</div>;
  // }

  const isAdmin: boolean = user?.role === "Admin" || false;
  const isManager: boolean = user?.role === "Manager" || false;
  const isUser: boolean = user?.role === "Customer" || false;

  const dashLocation = isAdmin
    ? "admin"
    : isManager
    ? "manager"
    : isUser
    ? "user"
    : "/error";

  return (
    <div className="flex h-screen ">
      {/* dashboard side bar */}
      <div className="min-w-32 w-full h-screen text-[darkblue]  ">
        <ul className="menu p-0">
          {menuItems[dashLocation]?.map((item) => (
            <li
              key={item.href}
              className="border-b-2 border-b-green-300 text-xl p-4"
            >
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
