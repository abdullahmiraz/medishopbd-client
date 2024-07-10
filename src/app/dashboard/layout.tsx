"use client";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Shared/Footer/Footer";
import OptionBar from "../../components/Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";
import { UserAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }: any) => {
  const { user } = UserAuth();
  return (
    <div>
      <SearchBarTop />
      <OptionBar />
      <div className="flex overflow-hidden ">
        <div className="w-[20%] bg-green-400">
          <Dashboard />
        </div>
        <div className="w-full ">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
