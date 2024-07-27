"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { placeholderImage, serverUrl } from "../../../../api";
import ReviewSection from "./ReviewSection";

const ProductSingleView = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [stripCount, setStripCount] = useState(0);
  const [stockOutAlert, setStockOutAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/reviews/product/${productId}`
        );
        setReviews(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    if (productId) {
      fetchProduct();
      fetchReviews();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    handleQuantityChange(0); // reset after you submit the cart

    if (stripCount >= 1) {
      let totalProfit;
      let totalPrice;

      if (product?.packaging?.unitsPerStrip) {
        // Product sold in strips
        totalProfit =
          product?.pricePerUnit * stripCount -
          product?.buyingPricePerUnit * stripCount;
        totalPrice = product?.pricePerUnit * stripCount;
      } else {
        // Product sold individually
        totalProfit =
          product?.pricePerUnit * stripCount -
          product?.buyingPricePerUnit * stripCount;
        totalPrice = product?.pricePerUnit * stripCount;
      }

      const cartItem = {
        productId: product?._id,
        name: product?.productName,
        measure: product?.measure,
        stripCount: stripCount,
        productCount: stripCount, // Assuming each strip is counted as a unit
        pricePerStrip: product?.pricePerUnit,
        totalPrice: totalPrice,
        totalProfit: totalProfit,
        prescription: product?.requiresPrescription,
      };

      const existingCart =
        JSON.parse(localStorage.getItem("medicine_cart")) || [];

      const existingItemIndex = existingCart.findIndex(
        (item) => item.productId === product?._id
      );

      if (existingItemIndex > -1) {
        // Update the existing item's strip count, product count, and total price
        existingCart[existingItemIndex].stripCount += stripCount;
        existingCart[existingItemIndex].productCount += stripCount;
        existingCart[existingItemIndex].totalPrice += cartItem.totalPrice;
        existingCart[existingItemIndex].totalProfit += cartItem.totalProfit;
      } else {
        // Add the new item to the cart
        existingCart.push(cartItem);
      }

      localStorage.setItem("medicine_cart", JSON.stringify(existingCart));

      toast.success("Product added successfully!");
    } else {
      toast.error("Enter a valid number quantity");
    }
  };

  const handleQuantityChange = (newValue) => {
    if (
      product?.stockDetails.reduce((acc, curr) => acc + curr.quantity, 0) < 1
    ) {
      setStockOutAlert(true);
    }
    const newCount = Number(newValue);
    const availableStock = product?.stockDetails.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
    if (!isNaN(newCount) && newCount >= 1 && newCount <= availableStock) {
      setStripCount(newCount);
    } else if (newValue === "" || newCount === 0) {
      setStripCount(0); // Reset to 0 if input is empty or zero
    } else {
      setStripCount(availableStock); // Maximum strip count is availableStock
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`);
        const userData = response.data;
        setName(userData.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!product) {
    return <div className="text-center my-20">Loading...</div>;
  }
  return (
    <div className="flex flex-col container mx-auto my-12 px-6">
      <Toaster />
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          <div
            className="relative md:col-span-1 xl:col-span-1 min-h-52"
            style={{ paddingBottom: "60%" }}
          >
            <Image
              src={`${product?.productImage}` || placeholderImage}
              alt={product?.productName}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md border"
            />
          </div>
          <div className="info-table grid grid-cols-1 md:grid-cols-1 xl:grid-cols-10 md:col-span-1 xl:col-span-2 gap-4">
            <div className="xl:col-span-7">
              <h2 className="font-bold text-2xl mb-4">
                {product?.productName} {product?.measure}
              </h2>
              <p>
                <strong>Type:</strong> {product?.productType}
              </p>
              <p>
                <strong>Manufacturer:</strong> {product?.manufacturer}
              </p>
              <div className="flex gap-2">
                <strong>Stock:</strong>{" "}
                {product?.stockDetails.length > 0 ? (
                  product?.stockDetails.reduce(
                    (acc, curr) => acc + curr.quantity,
                    0
                  )
                ) : (
                  <p className="text-red-600">Stock Out !!</p>
                )}
              </div>

              <p>
                <strong>Generics: </strong>
                <span className="font-semibold text-cyan-700">
                  {product?.activeIngredient}
                </span>
              </p>
              <div className="pack-details">
                {product?.packaging?.unitsPerStrip ? (
                  <>
                    <strong>Pack Details:</strong>
                    <p>
                      Per Strip:{" "}
                      {`${product?.packaging?.unitsPerStrip} Tablets`}
                    </p>
                    <p>Strips: {product?.packaging?.stripsPerBox}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="price-view">
                <p>
                  <strong>Price:</strong>
                  <span className="font-bold text-xl">
                    Tk. {product?.pricePerUnit}
                  </span>
                  {/* {product?.primaryCategory === "Medicine" ? "/ strip" : ""} */}
                </p>
              </div>

              <div className="mt-4 w-full">
                <label>
                  <strong>Quantity:</strong>
                  {/* (
                  {product?.primaryCategory == "Medicine"
                    ? "strip"
                    : "Single Unit"}
                  ) */}
                </label>
                <div className="flex items-center text-3xl font-bold ">
                  <button
                    className="px-2 py-1 border bg-red-400"
                    disabled={stockOutAlert}
                    onClick={() => handleQuantityChange(stripCount - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 text-center mx-2 w-32"
                    value={stripCount === 0 ? "" : stripCount}
                    min="0"
                    max={product?.availableStock}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                  />
                  <button
                    className="px-2 py-1 border bg-green-400"
                    disabled={stockOutAlert}
                    onClick={() => handleQuantityChange(stripCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                disabled={stockOutAlert}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className="extra-infos xl:col-span-3 ">
              <h3 className="font-bold text-lg underline mb-4  ">
                Extra Information
              </h3>
              {product?.requiresPrescription ? (
                <p className="text-red-500 font-bold mb-4">
                  Prescription required
                </p>
              ) : null}
              {product?.leafletImage ? (
                <Link
                  href={product?.leafletImage || placeholderImage}
                  className="cursor-pointer bg-orange-500 text-white py-2 px-4 rounded-xl"
                  target="_blank"
                >
                  Leaflet
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="indications mt-12">
        <h3 className="font-bold text-lg p-2 bg-slate-100 rounded-md">
          Usage Indications of {product?.productName}
        </h3>
        <ul>
          <div>{product?.usageDetails?.indications?.mainTitle}</div>
          <li>
            {product?.usageDetails?.indications?.subtitles?.map(
              (subtitle, index) => (
                <span key={index} className="flex">
                  {index + 1}. {subtitle}
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
        <h3 className="font-bold text-lg  p-2 bg-slate-100 rounded-md">
          Dosage & Administration of {product?.productName}
        </h3>
        {product?.usageDetails?.dosageDetails?.map((detail, index) => (
          <div key={index} className="mt-2">
            <h4 className="font-semibold">{detail.ageRange}</h4>
            <p>{detail.userGroup}</p>
            <ul>
              {detail.dosageInstructions.map((instruction, idx) => (
                <div key={idx}>
                  <li>
                    {idx + 1}. {instruction}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="divider"></div>
      <ReviewSection productId={productId} />
    </div>
  );
};

export default ProductSingleView;
