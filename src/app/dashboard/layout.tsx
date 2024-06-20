import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[25%] bg-green-400 ">
        <Dashboard />
      </div>
      <div className="w-[75%] ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
