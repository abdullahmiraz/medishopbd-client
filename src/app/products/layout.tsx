import React from "react";
import CategoryCard from "../../components/HomeView/CategoryCard/CategoryCard";
import HeroCarousel from "../../components/HomeView/HeroCarousel/HeroCarousel";
import PrescriptionMedicine from "../../components/HomeView/PrescriptionMedicines/PrescriptionMedicine";
import ReviewCard from "../../components/HomeView/ServiceCard/ServiceCard";
import SkinCareProducts from "../../components/HomeView/SkinCareProducts/SkinCareProducts";
import Footer from "../../components/Shared/Footer/Footer";
import OptionBar from "../../components/Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";

const ProductsPageLayout = ({ children }) => {
  return (
    <>
      <SearchBarTop />
      <OptionBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default ProductsPageLayout;
