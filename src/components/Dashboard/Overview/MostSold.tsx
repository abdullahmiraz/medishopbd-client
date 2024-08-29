"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import ReactToPrint from "react-to-print";

const MostSold = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const mostSoldRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orders } = await axios.get(`${serverUrl}/api/orders`);
        console.log(orders);

        const productSales = {};

        orders?.forEach((order) => {
          // Check if the order falls within the selected date range
          const orderDate = new Date(order.created_at);
          const isWithinRange =
            (!startDate || orderDate >= new Date(startDate)) &&
            (!endDate || orderDate <= new Date(endDate));

          if (isWithinRange) {
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
          }
        });

        const sortedProducts = Object.values(productSales)
          .sort((a: any, b: any) => b.quantitySold - a.quantitySold)
          .slice(0, 10); // Limit to the top 10 most sold products
        setMostSoldProducts(sortedProducts);
      } catch (error) {
        toast.error("Error fetching most sold products");
        console.error(error);
      }
    };

    fetchOrders();
  }, [startDate, endDate]);

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

      {/* Date Range Picker */}
      <div className="flex mb-4 gap-4">
        <div>
          <label className="block text-sm">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <ReactToPrint
          trigger={() => (
            <button className="py-0 px-2 bg-blue-500 text-white rounded">
              Print Invoice
            </button>
          )}
          content={() => mostSoldRef.current}
        />
      </div>

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
          <div ref={mostSoldRef} className="overflow-x-auto">
            <h2 className="print-only text-2xl font-bold text-center my-4">
              {startDate
                ? `Most Sold Products Report: ${startDate} to ${endDate}`
                : "Most Sold Products Report"}
            </h2>{" "}
            {/* Title to be printed */}
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
                      {product?.totalProfit?.toFixed(2) || "N/A"}
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
