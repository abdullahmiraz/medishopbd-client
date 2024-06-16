"use client";
import { useEffect, useState } from "react";
import { baseUrl, getAllProducts } from "../../../../../api";
import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(products);

  return (
    <>
      <div className="w-48 mx-auto">
        <h2 className="font-extrabold text-2xl text-center mx-auto my-4 border-b-4 border-b-green-400 ">
          Products List
        </h2>
      </div>
      <div className="overflow-x-auto m-4 border">
        <table className="table table-zebra table-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Measure</th>
              <th>Type</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Manufacturer</th>
              <th>Expiry </th>
              <th>Batch</th>
              <th>Aisle</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr>
                <th>{product?.id}</th>
                <td>{product?.name}</td>
                <td>{product?.measure}</td>
                <td>{product?.type}</td>
                <td>{product?.price}</td>
                <td>{product?.stock}</td>
                <td>{product?.manufacturer}</td>
                <td>{product?.expiry_date}</td>
                <td>{product?.batch_number}</td>
                <td>{product?.aisle_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsList;
