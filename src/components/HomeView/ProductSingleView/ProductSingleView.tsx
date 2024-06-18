"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../api";

const ProductSingleView = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`);
        setProduct(res.data[0]);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    }; 

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-center">{product.name}</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <img src={product.image} alt={product.name} className="w-full" />
        </div>
        <div>
          <p>
            <strong>Generics:</strong> {product.generics}
          </p>
          <p>
            <strong>Measure:</strong> {product.measure}
          </p>
          <p>
            <strong>User Area:</strong> {product.userArea}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Type:</strong> {product.type}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Manufacturer:</strong> {product.manufacturer}
          </p>
          <p>
            <strong>Expiry Date:</strong> {product.expiry_date}
          </p>
          <p>
            <strong>Batch Number:</strong> {product.batch_number}
          </p>
          <p>
            <strong>Aisle Location:</strong> {product.aisle_location}
          </p>
          <p>
            <strong>Prescription Required:</strong>{" "}
            {product.prescription_required ? "Yes" : "No"}
          </p>
          <p>
            <strong>Usage Indications:</strong>
          </p>
          <ul>
            {product.usage_details?.indications.subtitles.map(
              (subtitle, index) => (
                <li key={index}>{subtitle}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductSingleView;
