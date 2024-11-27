import ProductViewer from "../../../../../components/Dashboard/ProductViewer/ProductViewer";

const DashboardProductPage = ({ params }) => {
  console.log(params);
  return <ProductViewer productId={params.productId} />;
};

export default DashboardProductPage;
