import React, { useState } from "react";
import { useEffect } from "react";
import { getInventoryDetails } from "../../../../api";
import ProductsList from "../../../components/Dashboard/AdminDash/ProductsList/ProductsList";

const page = () => {
  return (
    <>
      <ProductsList />
    </>
  );
};

export default page;
