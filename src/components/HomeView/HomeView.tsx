"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  selectStatus,
  selectUser,
} from "../../redux/features/user/userSlice";
import { StatusCode } from "../../utils/statusCode";
import Footer from "../Shared/Footer/Footer";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import Spinner from "../Shared/Spinner/Spinner";
import AllMedicineViewCarousel from "./AllMedicineViewCarousel/AllMedicineViewCarousel";
import CategoryCard from "./CategoryCard/CategoryCard";
import HeroCarousel from "./HeroCarousel/HeroCarousel";
import PrescriptionMedicine from "./PrescriptionMedicines/PrescriptionMedicine";
import SatisfiedCustomers from "./SatisfiedCustomers/SatisfiedCustomers";
import ReviewCard from "./ServiceCard/ServiceCard";
import SkinCareProducts from "./SkinCareProducts/SkinCareProducts";

const HomeView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  useEffect(() => {
    // Fetch user data from localStorage or cookies
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch(fetchUserById(userId));
    } else {
      // Redirect to login if no userId is found
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
    <div>
      <SearchBarTop />
      <OptionBar />
      <HeroCarousel />
      <ReviewCard />
      <CategoryCard />
      <AllMedicineViewCarousel />
      <PrescriptionMedicine />
      <SkinCareProducts />
      <SatisfiedCustomers />
      <Footer />
    </div>
  );
};

export default HomeView;
