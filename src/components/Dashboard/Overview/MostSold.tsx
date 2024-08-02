"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const MostSold = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orders } = await axios.get(`${serverUrl}/api/orders`);

        const productSales = {};

        orders?.forEach((order) => {
          order.products.forEach((product) => {
            const productId = product?.productId?._id;
            if (!productSales[productId]) {
              productSales[productId] = {
                productName: product?.productId?.productName,
                quantitySold: 0,
                pricePerUnit: product?.price,
                totalRevenue: 0,
                totalProfit: 0,
              };
            }
            productSales[productId].quantitySold += product?.quantity;
            productSales[productId].totalRevenue +=
              product.quantity * product?.price;
            productSales[productId].totalProfit +=
              product.quantity * product.price -
              product?.productId?.buyingPricePerUnit;
          });
        });

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

  // Transform data for the chart
  const chartData = mostSoldProducts.map((product) => ({
    name: product.productName,
    quantitySold: product.quantitySold,
    totalRevenue: product.totalRevenue,
    totalProfit: product.totalProfit,
  }));

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 bg-blue-100 p-2">
        Most Sold Products
      </h2>
      <div className="flex w-full gap-2">
        <div className="min-h-96 w-full bg-orange-50 rounded p-2 border">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="quantitySold"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="totalRevenue"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="totalProfit"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    Product Name
                  </th>
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
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {product?.productName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product?.quantitySold}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product?.pricePerUnit.toFixed(2)}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {product?.totalRevenue.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product?.totalProfit?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSold;
