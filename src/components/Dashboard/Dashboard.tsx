"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, selectUser } from "../../redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import { menuItems } from "../../utils/menuItems";

const allowedRoutes = {
  admin: [
    "profile",
    "overview",
    "userslist",
    "productlist",
    "categorylist",
    "addproducts",
    "orders",
    "payments",
    "promocodes",
    "deliveryfees",
  ],
  manager: [
    "profile",
    "overview",
    "productlist",
    "categorylist",
    "addproducts",
    "orders",
    "payments",
    "promocodes",
    "deliveryfees",
  ],
  customer: ["profile", "orderhistory", "myprescription", "home", "cart"],
};

const Dashboard = ({ content }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => selectUser(state));
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch(fetchUserById(userId));
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (user) {
      const path = window.location.pathname.split("/").pop(); // Get the current route
      const userRole = (user?.role).toLowerCase();

      if (!allowedRoutes[userRole].includes(path)) {
        setIsAuthorized(false);
        router.push("/unauthorized"); // Redirect to an unauthorized page or home
      }
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Redirecting...</div>;
  }

  const dashLocation = (user?.role).toLowerCase(); // Simplified to always use "user" dashboard

  return (
    <div className="flex justify-start">
      <div className="w-1/5 ">
        <div className="bg-green-400 min-h-screen text-[darkblue] min-w-max sticky top-0 left-0">
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
      <div className="w-4/5">{content}</div>
    </div>
  );
};

export default Dashboard;
