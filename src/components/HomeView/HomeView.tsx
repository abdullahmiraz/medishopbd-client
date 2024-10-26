"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  selectStatus,
  selectUser,
} from "../../redux/features/user/userSlice";
 import Footer from "../Shared/Footer/Footer";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import Spinner from "../Shared/Spinner/Spinner";
import AllMedicineViewCarousel from "./AllMedicineViewCarousel/AllMedicineViewCarousel";
import HeroCarousel from "./HeroCarousel/HeroCarousel";
import PrescriptionMedicine from "./PrescriptionMedicines/PrescriptionMedicine";
import SatisfiedCustomers from "./SatisfiedCustomers/SatisfiedCustomers";
import ReviewCard from "./ServiceCard/ServiceCard";
import SkinCareProducts from "./SkinCareProducts/SkinCareProducts";
import FloatingCart from "./FloatingCart/FloatingCart";
import toast, { Toaster } from "react-hot-toast";
import AllCategoryProductViewCarousel from "./AllCategoryProductViewCarousel/AllCategoryProductViewCarousel";
import CategoryCard from "./CategoryCard/CategoryCard";
import { StatusCode } from "../../utils/StatusCode";

const HomeView = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    // Fetch user data from localStorage or cookies
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch<any>(fetchUserById(userId));
    } else {
      // Redirect to login if no userId is found
      if (pathname !== "/") {
        toast.error("Login First");
      }
      router.push("/");
    }
  }, [dispatch, router]);

  if (status === StatusCode.LOADING) {
    return <Spinner />;
  }

  // if (status === StatusCode.ERROR) {
  //   return (
  //     <div className="text-center my-20 text-red-500">
  //       Error fetching user data.
  //     </div>
  //   );
  // }

  return (
    <div className="relative">
      <Toaster />
      <div className="relative right-0 top-1/2">
        <FloatingCart />
      </div>
      <SearchBarTop />
      <OptionBar />
      <HeroCarousel />
      <ReviewCard />
      <CategoryCard />
      <AllCategoryProductViewCarousel />
      {/* <AllMedicineViewCarousel />
      <PrescriptionMedicine />
      <SkinCareProducts /> */}
      {/* <SatisfiedCustomers /> */}
      <Footer />
    </div>
  );
};

export default HomeView;
