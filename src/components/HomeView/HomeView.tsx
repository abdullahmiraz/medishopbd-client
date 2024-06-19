import Footer from "../Shared/Footer/Footer";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import CategoryCard from "./CategoryCard/CategoryCard";
import HeroCarousel from "./HeroCarousel/HeroCarousel";
import PrescriptionMedicine from "./PrescriptionMedicines/PrescriptionMedicine";
import ReviewCard from "./ServiceCard/ServiceCard";
import SkinCareProducts from "./SkinCareProducts/SkinCareProducts";

const HomeView = () => {
  return (
    <div>
      <SearchBarTop />
      <OptionBar />
      <HeroCarousel />
      <ReviewCard />
      <CategoryCard />
      <PrescriptionMedicine />
      <SkinCareProducts />
      <Footer />
    </div>
  );
};

export default HomeView;
