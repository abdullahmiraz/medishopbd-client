"use client";
import Dashboard from "../../components/Dashboard/Dashboard";
import { UserAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user } = UserAuth();
  return (
    <div className="flex justify-center">
      <div className="w-[25%] bg-green-400">
        <Dashboard />
      </div>
      <div className="w-[75%]">{children}</div>
      {/* {user ? (
        <div className="w-[75%]">{children}</div>
      ) : (
        <div className="w-[75%] flex items-center justify-center">
          <p>Please log in to view this content.</p>
        </div>
      )} */}
    </div>
  );
};

export default DashboardLayout;
