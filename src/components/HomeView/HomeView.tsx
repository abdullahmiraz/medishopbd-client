"use client";
import axios from "axios";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../api";
import Footer from "../Shared/Footer/Footer";
import OptionBar from "../Shared/Navbar/OptionBar/OptionBar";
import SearchBarTop from "../Shared/Navbar/SearchBarTop/SearchBarTop";
import CategoryCard from "./CategoryCard/CategoryCard";
import HeroCarousel from "./HeroCarousel/HeroCarousel";
import PrescriptionMedicine from "./PrescriptionMedicines/PrescriptionMedicine";
import ReviewCard from "./ServiceCard/ServiceCard";
import SkinCareProducts from "./SkinCareProducts/SkinCareProducts";
import { UserAuth } from "../../context/AuthContext";
import AllMedicineViewCarousel from "./AllMedicineViewCarousel/AllMedicineViewCarousel";

const HomeView = () => {
  const { user } = UserAuth();
  // console.log(user || "");

  // const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null); // State for phone validation error

  useEffect(() => {
    const fetchUserIdByUid = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/uid/${user?.uid}`
        );
        const userMongoId = response?.data?.id;
        if (userMongoId) {
          fetchUser(userMongoId);
          sessionStorage.setItem("mongoUserId", userMongoId);
        }
      } catch (error) {
        console.error("Error fetching user id:", error);
      }
    };

    const fetchUser = async (id: string) => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${id}`);
        const userData = response.data;
        // sessionStorage.setItem("mongoUserRole", userData.role || "");
        // // sessionStorage.setItem("mongoUserRole", JSON.stringify(userData));
        // setUser(userData);
        setPhone(userData.phone);
        setAddress(userData.address);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserIdByUid();
  }, [user]);

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
      <Footer />
    </div>
  );
};

export default HomeView;
