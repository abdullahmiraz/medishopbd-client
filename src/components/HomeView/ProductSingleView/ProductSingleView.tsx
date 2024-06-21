"use client";

// ProductSingleView.tsx

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";
import Link from "next/link";

const ProductSingleView = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [stripCount, setStripCount] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product?._id,
      name: product?.productName,
      measure: product?.measure,
      stripCount: stripCount,
      pricePerStrip: product?.pricePerUnit,
      totalPrice: product?.pricePerUnit * stripCount,
    };

    const existingCart =
      JSON.parse(localStorage.getItem("medicine_cart")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === product?._id
    );

    if (existingItemIndex > -1) {
      // Update the existing item's strip count and total price
      existingCart[existingItemIndex].stripCount += stripCount;
      existingCart[existingItemIndex].totalPrice += cartItem.totalPrice;
    } else {
      // Add the new item to the cart
      existingCart.push(cartItem);
    }

    localStorage.setItem("medicine_cart", JSON.stringify(existingCart));
    console.log(
      `Added ${stripCount} strips of ${product?.productName} to cart`
    );
    toast.success("Product added successfully!");
  };

  if (!product) {
    return <div className="text-center my-20">Loading...</div>;
  }

  return (
    <div className="flex flex-col container mx-auto my-12 px-6">
      <Toaster />
      <div className="">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div
            className="relative col-span-4 min-h-52"
            style={{ paddingBottom: "60%" }}
          >
            <Image
              src={`https://i.ibb.co/ZGCQxbH/osudpotro-default.webp`}
              alt={product?.productName}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md border"
            />
          </div>
          <div className="info-table grid grid-cols-10 col-span-8">
            <div className="col-span-7">
              <h2 className="font-bold text-2xl mb-4">
                {product?.productName} {product?.measure}
              </h2>
              <p>
                <strong>Type:</strong> {product?.productType}
              </p>
              <p>
                <strong>Manufacturer:</strong> {product?.manufacturer}
              </p>
              <p>
                <strong>Generics:</strong>{" "}
                <span className="font-semibold text-cyan-700">
                  {product?.activeIngredient}
                </span>
              </p>
              <div className="pack-details">
                <strong>Pack Details:</strong>
                <p>
                  Per Strip: {product?.packaging.unitsPerStrip}{" "}
                  {product?.measure}
                </p>
                <p>Strips: {product?.packaging.stripsPerBox}</p>
              </div>
              <div className="price-view">
                <p>
                  <strong>Best Price:</strong>{" "}
                  <span className="font-bold text-2xl">
                    Tk. {product?.pricePerUnit}
                  </span>{" "}
                  / strip
                </p>
              </div>
              <div className="mt-4">
                <label>
                  <strong>Quantity:</strong> (strips)
                </label>
                <div className="flex items-center text-3xl font-bold">
                  <button
                    className="px-2 py-1 border bg-red-400"
                    onClick={() =>
                      setStripCount(stripCount > 1 ? stripCount - 1 : 1)
                    }
                  >
                    -
                  </button>
                  <span className="px-4">{stripCount}</span>
                  <button
                    className="px-2 py-1 border bg-green-400"
                    onClick={() => setStripCount(stripCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className="extra-infos col-span-3 px-2">
              <h3 className="font-bold text-lg underline mb-4">
                Extra Information
              </h3>
              {product?.requiresPrescription ? (
                <p className="text-red-500 font-bold mb-4">
                  Prescription required
                </p>
              ) : null}
              <Link
                href={"https://www.via.placeholder.co/50x50"}
                className="cursor-pointer bg-orange-500 text-white  py-2 px-4 rounded-xl"
              >
                Prescription
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="indications mt-4">
        <h3 className="font-bold text-lg">Usage Indications:</h3>
        <ul>
          <li>
            <strong>Main Title:</strong>{" "}
            {product?.usageDetails?.indications?.mainTitle}
          </li>
          <li>
            <strong>Subtitles:</strong>{" "}
            {product?.usageDetails?.indications?.subtitles?.map(
              (subtitle, index) => (
                <span key={index}>
                  {subtitle}
                  {index !==
                    product?.usageDetails?.indications?.subtitles?.length - 1 &&
                    ", "}
                </span>
              )
            )}
          </li>
        </ul>
      </div>
      <div className="usage-details mt-4">
        <h3 className="font-bold text-lg">Usage Details:</h3>
        {product?.usageDetails?.dosageDetails?.map((detail, index) => (
          <div key={index} className="mt-2">
            <h4 className="font-semibold">{detail.ageRange}</h4>
            <p>
              <strong>User Group:</strong> {detail.userGroup}
            </p>
            <ul>
              {detail.dosageInstructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSingleView;
