import React from "react";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import HeroCarousel from "./HeroCarousel/HeroCarousel";
import ReviewCard from "./ServiceCard/ServiceCard";
import CategoryCard from "./CategoryCard/CategoryCard";
import Footer from "../Shared/Footer/Footer";
import CardCarousel from "./CardCarousel/CardCarousel";
import TestComp from "../../components/TestComp";
import PrescriptionMedicine from "./PrescriptionMedicines/PrescriptionMedicine";
import SkinCareProducts from "./SkinCareProducts/SkinCareProducts";

const HomeView = () => {
  return (
    <div>
      <SearchBarTop />
      <OptionBar />
      <HeroCarousel />
      <ReviewCard />
      <CategoryCard />

      {/* <CardCarousel /> */}

      <PrescriptionMedicine />

      <SkinCareProducts />
      <Footer />
    </div>
  );
};

export default HomeView;
