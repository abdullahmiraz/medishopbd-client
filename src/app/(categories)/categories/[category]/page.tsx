import React from "react";
import CategorySingleProducts from "../../../../components/HomeView/CategorySingleProducts/CategorySingleProducts";

const SingleCategoryProducts = ({ params }) => {
  console.log(params.category);
  return (
    <div>
      <div className="text-center text-3xl font-bold my-8 uppercase">
        {params.category
          .replace(/-/g, " ") // Replace hyphens with spaces
          .replace(/[^a-zA-Z ]/g, "")}{" "}
        Products
      </div>
      <CategorySingleProducts categoryCode={params.category} />
    </div>
  );
};

export default SingleCategoryProducts;
