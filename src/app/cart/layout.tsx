import React from "react";
import Footer from "../../components/Shared/Footer/Footer";
import OptionBar from "../../components/Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";

const CartPageLayout = ({ children }) => {
  return (
    <>
      <SearchBarTop />
      <OptionBar />
      <div className="h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CartPageLayout;
