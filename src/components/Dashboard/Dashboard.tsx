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
    <div className="w-full flex justify-start">
      <div className="">
        <div className="  bg-green-400  min-h-screen text-[darkblue]  min-w-max   sticky top-0 left-0">
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
                    <span className="hidden md:block">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">{content}</div>
    </div>
  );
};

export default Dashboard;
