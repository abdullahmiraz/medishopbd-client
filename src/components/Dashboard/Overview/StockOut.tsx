"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";
import { ProductData } from "../AdminDash/AddProducts/products.types";

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

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Stock Out Products</h2>
      <table className="table-auto w-full text-left border-collapse border border-gray-300">
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
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product._id}>
              {product.stockDetails.map(
                (stock, stockIndex) =>
                  (stock.quantity <= 0 ||
                    new Date(stock.expirationDate) <= warningDate) && (
                    <tr
                      key={`${product._id}-${stockIndex}`}
                      className="hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.productName}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          stock.quantity <= 0 ? "bg-red-500 text-white" : ""
                        }`}
                      >
                        {stock.quantity}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          new Date(stock.expirationDate) <= warningDate
                            ? "bg-orange-500 text-white"
                            : ""
                        }`}
                      >
                        {stock.expirationDate}
                      </td>
                    </tr>
                  )
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockOut;
