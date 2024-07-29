"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";

const MostSold = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orders } = await axios.get(`${serverUrl}/api/orders`);

        console.log(orders);
        const productSales = {};

        orders.forEach((order) => {
          order.products.forEach((product) => {
            const productId = product.productId._id;
            if (!productSales[productId]) {
              productSales[productId] = {
                productName: product.productId.productName,
                quantitySold: 0,
                pricePerUnit: product.price,
                totalRevenue: 0,
                totalProfit: 0,
              };
            }
            productSales[productId].quantitySold += product.quantity;
            productSales[productId].totalRevenue +=
              product.quantity * product.price;
            productSales[productId].totalProfit +=
              product.quantity * product.price -
              product.productId.buyingPricePerUnit;
          });
        });

        console.log(productSales);

        const sortedProducts = Object.values(productSales).sort(
          (a, b) => b.quantitySold - a.quantitySold
        );
        setMostSoldProducts(sortedProducts);
      } catch (error) {
        toast.error("Error fetching most sold products");
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Most Sold Products</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Quantity Sold
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Price per Unit (Tk.)
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Total Revenue (Tk.)
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Total Profit (Tk.)
              </th>
            </tr>
          </thead>
          <tbody>
            {mostSoldProducts.map((product, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {product.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.quantitySold}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.pricePerUnit.toFixed(2)}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {product.totalRevenue.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.totalProfit?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MostSold;
