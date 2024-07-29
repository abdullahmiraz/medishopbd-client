import {
    FaHome,
    FaUsers,
    FaList,
    FaUtensils,
    FaCashRegister,
    FaDollarSign,
    FaUser,
    FaHistory,
    FaFileMedicalAlt,
    FaCartArrowDown,
  } from "react-icons/fa";
  import { TbCategoryPlus } from "react-icons/tb";

  export const mongoUserId = sessionStorage.getItem("mongoUserId");

  export const menuItems = {
    admin: [
      {
        href: "overview",
        icon: FaHome,
        text: "Overview",
      },
      {
        href: "userslist",
        icon: FaUsers,
        text: "Users List",
      },
      {
        href: "productlist",
        icon: FaList,
        text: "Products List",
      },
      {
        href: "categorylist",
        icon: TbCategoryPlus,
        text: "Category List",
      },
      {
        href: "addproducts",
        icon: FaUtensils,
        text: "Add Products",
      },
      {
        href: "orders",
        icon: FaCashRegister,
        text: "Orders/Sales",
      },
      {
        href: "payments",
        icon: FaDollarSign,
        text: "Payments",
      },
      {
        href: "promocodes",
        icon: FaCashRegister,
        text: "Promo Codes",
      },
    ],
    manager: [
      {
        href: "overview",
        icon: FaHome,
        text: "Overview",
      },
      {
        href: "productlist",
        icon: FaList,
        text: "Products List",
      },
      {
        href: "categorylist",
        icon: TbCategoryPlus,
        text: "Category List",
      },
      {
        href: "addproducts",
        icon: FaUtensils,
        text: "Add Products",
      },
      {
        href: "orders",
        icon: FaCashRegister,
        text: "Orders/Sales",
      },
      {
        href: "payments",
        icon: FaDollarSign,
        text: "Payments",
      },
    ],
    user: [
      {
        href: `profile/${mongoUserId}`,
        icon: FaUser,
        text: "Profile",
      },
      {
        href: "orderhistory",
        icon: FaHistory,
        text: "Order History",
      },
      // {
      //   href: "deliveryaddress",
      //   icon: FaMapMarker,
      //   text: "Delivery Address",
      // },
      {
        href: "myprescription",
        icon: FaFileMedicalAlt,
        text: "My Prescription",
      },
      // {
      //   href: "submitreview",
      //   icon: FaStar,
      //   text: "Submit Review",
      // },
      {
        href: "../../",
        icon: FaHome,
        text: "Home",
      },
      {
        href: "../../cart",
        icon: FaCartArrowDown,
        text: "Cart",
      },
    ],
  };
