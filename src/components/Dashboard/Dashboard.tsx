"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, selectUser } from "../../redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import { menuItems } from "../../utils/menuItems";

const Dashboard = ({ content }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => selectUser(state));

  useEffect(() => {
    const mongoUserId = localStorage.getItem("userId");

    if (mongoUserId) {
      dispatch(fetchUserById(mongoUserId));
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const dashLocation = "admin"; // Simplified to always use "user" dashboard

  return (
    <div className="w-full flex justify-start">
      <div className="">
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
      <div className="w-full">{content}</div>
    </div>
  );
};

export default Dashboard;
