import React from "react";
import Footer from "../../components/Shared/Footer/Footer";
import OptionBar from "../../components/Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";
import ReduxProvider from "../ReduxProvider";

const CartPageLayout = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <SearchBarTop />
        <OptionBar />
        <div className="h-screen">{children}</div>
        <Footer />
      </ReduxProvider>
    </>
  );
};

export default CartPageLayout;
