import React from "react";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import HeroCarousel from "./HeroCarousel/HeroCarousel";
import ReviewCard from "./ReviewCard/ReviewCard";
import CategoryCard from "./CategoryCard/CategoryCard";
import Footer from "../Shared/Footer/Footer";
import CardCarousel from "./CardCarousel/CardCarousel";
import TestComp from "../../components/TestComp";

const HomeView = () => {
  return (
    <div>
      <SearchBarTop />
      <OptionBar />
      <HeroCarousel />
      <ReviewCard />
      <CategoryCard />

      {/* <CardCarousel /> */}

      <TestComp />
      <Footer />
    </div>
  );
};

export default HomeView;
