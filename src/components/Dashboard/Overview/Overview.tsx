"use client";

import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Overview = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const productList = await axios.get(`${serverUrl}/api/orders`);
        setMostSoldProducts(productList?.data);
        console.log(productList?.data);
      } catch (error) {
        toast.error("Error fetching most sold products");
        console.error(error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <Toaster />
      Most sold Products
      <div className="products">
        {mostSoldProducts.map((item) => (
          <div key={item?._id}>
            {item?.products.map((product) => (
              <div key={product._id}>{product?.productId?.productName}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
