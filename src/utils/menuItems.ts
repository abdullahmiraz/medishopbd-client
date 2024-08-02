import {
  FaCartArrowDown,
  FaCashRegister,
  FaDollarSign,
  FaFileMedicalAlt,
  FaHistory,
  FaHome,
  FaList,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";

export const menuItems = {
  admin: [
    {
      href: `profile`,
      icon: FaUser,
      text: "Profile",
    },
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
  customer: [
    {
      href: `profile`,
      icon: FaUser,
      text: "Profile",
    },
    {
      href: "orderhistory",
      icon: FaHistory,
      text: "Order History",
    },
    {
      href: "myprescription",
      icon: FaFileMedicalAlt,
      text: "My Prescription",
    },
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
