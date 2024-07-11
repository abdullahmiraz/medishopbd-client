"use client";
import Dashboard from "../../components/Dashboard/Dashboard";
import OptionBar from "../../components/Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";
import { UserAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }: any) => {
  const { user } = UserAuth();
  return (
    <div>
      <SearchBarTop />
      {/* <OptionBar /> */}
      <Dashboard content={children} />

      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;
