"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";
import { ProductData } from "../AdminDash/AddProducts/products.types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const StockOut: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();
  const warningDate = new Date();
  warningDate.setDate(currentDate.getDate() + 7);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductData[]>(
          `${serverUrl}/api/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.stockDetails.some(
      (stock) =>
        stock.quantity <= 0 || new Date(stock.expirationDate) <= warningDate
    )
  );

  // Prepare data for PieChart
  const data01 = filteredProducts.map((product) => ({
    name: product.productName,
    value: product.stockDetails.reduce((acc, stock) => acc + stock.quantity, 0),
  }));

  const data02 = filteredProducts.flatMap((product) =>
    product.stockDetails
      .filter(
        (stock) =>
          stock.quantity <= 0 || new Date(stock.expirationDate) <= warningDate
      )
      .map((stock) => ({
        name: `${product.productName} - ${stock.batchNumber}`,
        value: stock.quantity,
      }))
  );

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 bg-blue-100 p-2">
        Stock Out Products
      </h2>
      <div className="flex gap-2 mt-6">
        <div className="flex w-full border rounded p-2">
          <div className="flex flex-col mr-6">
            <div className="mb-2 flex items-center">
              <div className="w-4 h-4 bg-[#8884d8] mr-2"></div>
              <span>Total Available Stock</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#82ca9d] mr-2"></div>
              <span>Stock Details (Expired/Low Stock)</span>
            </div>
          </div>
          <div className="flex-1 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={data01}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                />
                <Pie
                  data={data02}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <table className="table-auto w-full text-left border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Available Stock
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Expiration Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => {
              // Calculate total quantity of the product stock
              const totalQuantity = product.stockDetails.reduce(
                (acc, stock) => acc + stock.quantity,
                0
              );

              // Check if any stock has expired or has zero quantity
              const isAnyStockWarning = product.stockDetails.some(
                (stock) =>
                  stock.quantity <= 0 ||
                  new Date(stock.expirationDate) <= warningDate
              );

              // Find the nearest expiration date for the product
              const nearestExpirationDate = product.stockDetails.reduce(
                (nearestExp, stock) =>
                  new Date(stock.expirationDate) < new Date(nearestExp)
                    ? stock.expirationDate
                    : nearestExp,
                product.stockDetails[0]?.expirationDate // Handle edge case for empty stockDetails
              );

              return (
                // Show only one row for each product with total quantity and nearest expiration date
                isAnyStockWarning && (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.productName}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${
                        totalQuantity <= 0 ? "bg-red-500 text-white" : ""
                      }`}
                    >
                      {totalQuantity}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${
                        new Date(nearestExpirationDate) <= warningDate
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      {nearestExpirationDate}
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOut;
