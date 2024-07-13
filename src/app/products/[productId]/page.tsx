// pages/products/[productCode].js
"use client";
import { useSearchParams } from "next/navigation";
import ProductSingleView from "../../../components/HomeView/ProductSingleView/ProductSingleView";

const ProductPageSingle = ({ params }) => {
  console.log(params);
  const searchParams = useSearchParams();

  const productId = searchParams.get("pid");
  console.log(productId);

  return <ProductSingleView productId={productId} />;
};

export default ProductPageSingle;
