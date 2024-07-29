"use client";
import Dashboard from "../../components/Dashboard/Dashboard";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";

const DashboardLayout = ({ children }: any) => {
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
