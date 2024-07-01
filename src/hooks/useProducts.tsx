// hooks/useProduct.ts

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { serverUrl } from "../../api";
import { ProductData } from "../components/Dashboard/AdminDash/AddProducts/products.types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseProductOptions {
  method?: HttpMethod;
  data?: any;
  endpoint?: string; // Endpoint for unique API calls or to fetch all products
}

const useProduct = (
  productId: string | null,
  options: UseProductOptions = {}
) => {
  const { method = "GET", data, endpoint = "" } = options;
  const [products, setProducts] = useState<ProductData[] | null>(null); // State for all products
  const [product, setProduct] = useState<ProductData | null>(null); // State for a single product
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data based on the method and endpoint
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${serverUrl}/api/products`;
      if (productId) {
        url = endpoint
          ? `${serverUrl}/api/products/${productId}/${endpoint}`
          : `${serverUrl}/api/products/${productId}`;
      } else if (endpoint) {
        url = `${serverUrl}/api/products/${endpoint}`;
      }

      const response = await axios({
        url,
        method,
        data,
      });

      if (productId) {
        if (endpoint) {
          // For unique API calls
          return response.data;
        } else {
          setProduct(response.data);
        }
      } else {
        // For fetching all products
        setProducts(response.data);
      }
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [productId, method, data, endpoint]);

  // Fetch data on mount or when productId or options change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    products,
    product,
    loading,
    error,
    fetchData, // Expose the fetchData function for unique API calls
  };
};

export default useProduct;
