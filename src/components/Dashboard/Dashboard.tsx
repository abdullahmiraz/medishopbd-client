"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { User } from "firebase/auth";
import { serverUrl } from "../../../api";
import { menuItems } from "./menuItems";

const mongoUserId = sessionStorage.getItem("mongoUserId");

const Dashboard = ({ content }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
        // console.log(userData);
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
    <div className="flex ">
      <div className="  bg-green-400  h-screen text-[darkblue]  min-w-60   sticky top-0 left-0">
        <div>
          <ul className="menu p-0">
            {menuItems[dashLocation]?.map((item) => (
              <li
                key={item.href}
                className="border-b-2 border-b-green-300 text-xl p-4"
              >
                <Link
                  href={`/dashboard/${item.href}`}
                  className="dashboard-link"
                >
                  <item.icon />
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-red-200 w-full">{content}</div>
    </div>
  );
};

export default Dashboard;
