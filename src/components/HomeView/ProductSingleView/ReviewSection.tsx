// components/ReviewSection.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../api";
import StarRating from "./StarRating";
import { mongoUserId } from "../../Dashboard/menuItems";
import toast, { Toaster } from "react-hot-toast";

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [orders, setOrders] = useState([]);

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
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        setUserId(response.data._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmitReview = async () => {
    try {
      await axios.post(`${serverUrl}/api/reviews/add`, {
        productId,
        userId,
        rating,
        reviewText: newReview,
      });
      setNewReview("");
      setRating(0);
      // Update the review list
      const res = await axios.get(
        `${serverUrl}/api/reviews/product/${productId}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

   console.log(orders);
  const userFilteredOrders = orders.filter(
    (order) => order?.userId === mongoUserId
  );
  console.log(userFilteredOrders);

  return (
    <div className="review-section mt-8">
      <Toaster />
      <h3 className="text-xl font-bold mb-4">Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}
      {reviews.map((review) => (
        <div key={review._id} className="review-item mb-4">
          <StarRating rating={review.rating} onRatingChange={() => {}} />
          <p>{review.reviewText}</p>
          <small>Reviewed by User {review.userId}</small>
        </div>
      ))}
      <div className="add-review mt-4">
        <textarea
          className="w-full border rounded p-2 mb-2"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <StarRating
          rating={rating}
          onRatingChange={(rating) => setRating(rating)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmitReview}
          disabled={!newReview || rating === 0}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
