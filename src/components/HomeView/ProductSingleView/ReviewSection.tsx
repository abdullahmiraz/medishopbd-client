// components/ReviewSection.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../../api";
import EditProductPage from "../../../app/dashboard/editproduct/[id]/page";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/user/userSlice";

interface Review {
  _id: string;
  rating: number;
  reviewText: string;
  userId: string;
}

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [orders, setOrders] = useState();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [reviewIdToEdit, setReviewIdToEdit] = useState(null);
  const [editedRating, setEditedRating] = useState(1);
  const [editedComment, setEditedComment] = useState("");
  const [reviewEligibility, setReviewEligibility] = useState(false);
  const [userReviewCount, setUserReviewCount] = useState(0);
  const user = useSelector(selectUser);
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to submit a review.");
      return;
    }
    if (!reviewEligibility) {
      toast.error(
        "You have to purchase this product   first to submit a review"
      );
      return;
    }
    if (userReviewCount > 1 && (!editedRating || !editedComment)) {
      toast.error("User Can Submit Only 1 review");
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/orders`);
        setOrders(response?.data);
      } catch (error) {
        toast.error("Error fetching orders");
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/reviews/product/${productId}`
        );
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // console.log(orders);
  const userFilteredOrders = orders?.filter(
    (order) => order?.userId._id === userId
  );
  // console.log(userFilteredOrders);

  useEffect(() => {
    userFilteredOrders?.map((orders) => {
      orders?.products.map((order) =>
        order?.productId?._id === productId ? setReviewEligibility(true) : ""
      );
    });
  }, [productId, userFilteredOrders]);

  console.log(reviewEligibility);

  useEffect(() => {
    reviews?.map((review) =>
      review?.userId._id === userId
        ? setUserReviewCount(userReviewCount + 1)
        : ""
    );
  }, [userId, reviews]);

  return (
    <div>
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

export default ReviewSection;
