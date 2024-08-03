import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";

const SatisfiedCustomers = () => {
  const [reviews, setReviews ]= useState('')
  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const response = await axios.get(`${serverUrl}/api/reviews`);
        console.log(response.data);
      };
 
      fetchReviews();
    } catch (error) {
      toast.error("Unable to fetch the reviews");
    }
  }, []);

  return (
    <div>
      <Toaster />
      SatisfiedCustomers
    </div>
  );
};

export default SatisfiedCustomers;
