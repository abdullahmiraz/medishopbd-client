"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { placeholderImage, serverUrl } from "../../../../api";

const ProductSingleView = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [stripCount, setStripCount] = useState(1);
  const [stockOutAlert, setStockOutAlert] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [reviewIdToEdit, setReviewIdToEdit] = useState(null);
  const [editedRating, setEditedRating] = useState(1);
  const [editedComment, setEditedComment] = useState("");
  const userId = sessionStorage.getItem("mongoUserId");

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
    handleQuantityChange(1); // reset after you submit the cart
    if (stripCount >= 1) {
      let productCount = 0;

      // Check if packaging details are available and not null/undefined
      if (
        product.packaging &&
        product.packaging.unitsPerStrip !== null &&
        product.packaging.stripsPerBox !== null
      ) {
        productCount =
          stripCount *
          product.packaging.unitsPerStrip *
          product.packaging.stripsPerBox;
      } else {
        productCount = stripCount; // Fallback to stripCount if packaging details are null
      }

      const cartItem = {
        productId: product._id,
        name: product.productName,
        measure: product.measure,
        stripCount: stripCount,
        productCount: productCount,
        pricePerStrip: product.pricePerUnit,
        totalPrice: product?.pricePerUnit * productCount,
        prescription: product?.requiresPrescription,
      };

      console.log(cartItem);
      console.log(product);

      const existingCart =
        JSON.parse(localStorage.getItem("medicine_cart")) || [];

      const existingItemIndex = existingCart.findIndex(
        (item) => item.productId === product._id
      );

      if (existingItemIndex > -1) {
        // Update the existing item's strip count, product count, and total price
        existingCart[existingItemIndex].stripCount += stripCount;
        existingCart[existingItemIndex].productCount += productCount;
        existingCart[existingItemIndex].totalPrice += cartItem.totalPrice;
      } else {
        // Add the new item to the cart
        existingCart.push(cartItem);
      }

      localStorage.setItem("medicine_cart", JSON.stringify(existingCart));

      console.log(
        `Added ${productCount} products (strips) of ${product?.productName} to cart`
      );
      toast.success("Product added successfully!");
    } else {
      toast.error("Enter a valid number quantity");
    }
  };

  const handleQuantityChange = (newValue) => {
    if (product?.availableStock < 1) {
      setStockOutAlert(true);
    }
    // Handle direct input or backspace
    const newCount = Number(newValue);
    if (
      !isNaN(newCount) &&
      newCount >= 1 &&
      newCount <= product.availableStock
    ) {
      setStripCount(newCount);
    } else if (newValue === "" || newCount === 0) {
      setStripCount(0); // Reset to 0 if input is empty or zero
    } else {
      setStripCount(product.availableStock); // Maximum strip count is availableStock
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
  }, [userId]);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to submit a review.");
      return;
    }
    try {
      if (reviewIdToEdit) {
        // Update review
        await axios.patch(`${serverUrl}/api/reviews/${reviewIdToEdit}`, {
          rating: editedRating,
          comment: editedComment,
        });
        toast.success("Review updated successfully!");
        setReviewIdToEdit(null);
        setEditedRating(1);
        setEditedComment("");
      } else {
        // Create a new review
        await axios.post(`${serverUrl}/api/reviews`, {
          productId,
          userId,
          name,
          rating,
          comment,
        });
        toast.success("Review submitted successfully!");
      }
      // Clear the form and fetch new reviews
      setRating(1);
      setComment("");
      const res = await axios.get(
        `${serverUrl}/api/reviews/product/${productId}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("Failed to submit review.");
    }
  };

  const handleEditReview = (review) => {
    setReviewIdToEdit(review._id);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${serverUrl}/api/reviews/${reviewId}`);
      toast.success("Review deleted successfully!");
      // Fetch new reviews
      const res = await axios.get(
        `${serverUrl}/api/reviews/product/${productId}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error("Error deleting review", error);
      toast.error("Failed to delete review.");
    }
  };

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
              alt={product.productName}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md border"
            />
          </div>
          <div className="info-table grid grid-cols-1 md:grid-cols-1 xl:grid-cols-10 md:col-span-1 xl:col-span-2 gap-4">
            <div className="xl:col-span-7">
              <h2 className="font-bold text-2xl mb-4">
                {product.productName} {product.measure}
              </h2>
              <p>
                <strong>Type:</strong> {product.productType}
              </p>
              <p>
                <strong>Manufacturer:</strong> {product.manufacturer}
              </p>
              <div className="flex gap-2">
                <strong>Stock:</strong>{" "}
                {product.stockDetails.length > 0 ? (
                  product.stockDetails[0].expirationDate
                ) : (
                  <p className="text-red-600">Stock Out !!</p>
                )}
              </div>
              <p>
                <strong>Generics: </strong>
                <span className="font-semibold text-cyan-700">
                  {product.activeIngredient}
                </span>
              </p>
              <div className="pack-details">
                {product.packaging?.unitsPerStrip ? (
                  <>
                    <strong>Pack Details:</strong>
                    <p>
                      Per Strip: {`${product.packaging?.unitsPerStrip} Tablets`}
                    </p>
                    <p>Strips: {product.packaging?.stripsPerBox}</p>
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

              <div className="mt-4">
                <label>
                  <strong>Quantity:</strong>
                  {/* (
                  {product?.primaryCategory === "Medicine"
                    ? "strip"
                    : "Single Unit"}
                  ) */}
                </label>
                <div className="flex items-center text-3xl font-bold">
                  <button
                    className="px-2 py-1 border bg-red-400"
                    disabled={stockOutAlert}
                    onClick={() => handleQuantityChange(stripCount - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 text-center mx-2"
                    value={stripCount === 0 ? "" : stripCount}
                    min="1"
                    max={product.availableStock}
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
                disabled={product?.availableStock < 1}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className="extra-infos xl:col-span-3 ">
              <h3 className="font-bold text-lg underline mb-4  ">
                Extra Information
              </h3>
              {product.requiresPrescription ? (
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
          <div>{product.usageDetails?.indications?.mainTitle}</div>
          <li>
            {product.usageDetails?.indications?.subtitles?.map(
              (subtitle, index) => (
                <span key={index} className="flex">
                  {index + 1}. {subtitle}
                  {index !==
                    product.usageDetails?.indications?.subtitles?.length - 1 &&
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
        {product.usageDetails?.dosageDetails?.map((detail, index) => (
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
      {/* Review Form */}
      <div className="review-form mt-8">
        <h3 className="font-bold text-lg">
          {reviewIdToEdit ? "Edit Your Review" : "Submit a Review"}
        </h3>
        <form onSubmit={handleSubmitReview} className="mt-4">
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-semibold">
              Rating:
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() =>
                    reviewIdToEdit ? setEditedRating(star) : setRating(star)
                  }
                  className={`cursor-pointer text-2xl ${
                    (reviewIdToEdit ? editedRating : rating) >= star
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-semibold">
              Comment:
            </label>
            <textarea
              id="comment"
              value={reviewIdToEdit ? editedComment : comment}
              onChange={(e) =>
                reviewIdToEdit
                  ? setEditedComment(e.target.value)
                  : setComment(e.target.value)
              }
              className="border rounded px-2 py-1 w-full"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {reviewIdToEdit ? "Update Review" : "Submit Review"}
          </button>
        </form>
      </div>
      {/* Reviews Section */}
      <div className="reviews mt-8">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">Reviews</h3>

          <div className="font-bold">
            Average Rating:{" "}
            {reviews.length > 0
              ? (
                  reviews.reduce((sum, review) => sum + review?.rating, 0) /
                  reviews.length
                ).toFixed(1)
              : "No reviews yet"}
          </div>
        </div>
        {reviews?.length > 0 ? (
          <ul className="list-disc my-4">
            {reviews?.map((review) => (
              <li
                key={review?._id}
                className="mt-2 list-none bg-slate-100 p-3 rounded-md"
              >
                <div>
                  <strong>User:</strong> {name}{" "}
                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>
                <p>{review?.comment}</p>
                <p className="text-gray-500 text-sm">
                  <strong>Submitted on:</strong>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                {review?.userId?._id === userId && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductSingleView;
