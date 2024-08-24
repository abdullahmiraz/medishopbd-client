import React from "react";
import SubCategorySingleProducts from "../../../../components/HomeView/CategorySingleProducts/SubCategorySingleProducts";

const SubCategoryPage = ({ params }) => {
  console.log(params);
  return (
    <div>
      <div className="text-center text-3xl font-bold my-8 uppercase">
        {`${params.category} : ${params.subcategory
          .replace(/-/g, " ") // Replace hyphens with spaces
          .replace(/[^a-zA-Z ]/g, "")}`}{" "}
        - Products
      </div>

      <SubCategorySingleProducts subcategory={params.subcategory} />
    </div>
  );
};

export default SubCategoryPage;
