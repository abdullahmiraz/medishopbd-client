import Footer from "../../components/Shared/Footer/Footer";
import OptionBar from "../../components/Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../../components/Shared/Navbar/SearchBarTop/SearchBarTop";

const ProductsPageLayout = ({ children }) => {
  return (
    <>
      <SearchBarTop />
      <OptionBar />
      <div className="min-h-screen overflow-y-auto">{children}</div>
      <Footer />
    </>
  );
};

export default ProductsPageLayout;
