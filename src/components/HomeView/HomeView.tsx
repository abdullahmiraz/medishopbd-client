import React from "react";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import HeroCarousel from "./HeroCarousel/HeroCarousel";

const HomeView = () => {
  return (
    <div>
      <SearchBarTop />
      <OptionBar />
      <HeroCarousel />
    </div>
  );
};

export default HomeView;
