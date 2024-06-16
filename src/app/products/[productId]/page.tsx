// pages/products/[productId].js
import React from "react";
import ProductSingleView from "../../../components/HomeView/ProductSingleView/ProductSingleView";

const ProductPageSingle = ({ params }) => {
  console.log(params);
  return <ProductSingleView productId={params.productId} />;
};

export default ProductPageSingle;
