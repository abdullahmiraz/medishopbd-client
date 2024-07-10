import React from "react";
import CategorySingleProducts from "../../../components/HomeView/CategorySingleProducts/CategorySingleProducts";

const SingleCategoryProducts = ({ params }) => {
  console.log(params.category);
  return (
    <div>
      <CategorySingleProducts categoryCode={params.category} />
    </div>
  );
};

export default SingleCategoryProducts;
