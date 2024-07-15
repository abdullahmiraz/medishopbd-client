import React from "react";
import SubCategorySingleProducts from "../../../../components/HomeView/CategorySingleProducts/SubCategorySingleProducts";

const SubCategoryPage = ({ params }) => {
  console.log(params);
  return (
    <div>
      <SubCategorySingleProducts subcategory={params.subcategory} />
    </div>
  );
};

export default SubCategoryPage;
