// src/redux/features/order/orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serverUrl } from "../../../../api";
import axios from "axios";

// Define the types for order details, checkout amount, and the overall state
interface OrderDetails {
  [key: string]: any; // Adjust as per the actual structure of orderDetails
}

interface CheckoutAmount {
  subtotal: number;
  deliveryFee: number;
  discountedAmount: number;
  total: number;
}

interface OrderState {
  orderDetails: OrderDetails;
  invoiceNumber: string;
  checkoutAmount: Partial<CheckoutAmount>; // Partial in case some fields are optional
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

// Initial state with the defined types
const initialState: OrderState = {
  orderDetails: {},
  invoiceNumber: "",
  checkoutAmount: {},
  status: "idle",
  error: null,
};

// Create async thunk for creating an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: OrderDetails, { dispatch, rejectWithValue }) => {
    console.log(orderData);
    try {
      const response = await axios.post(`${serverUrl}/api/orders`, orderData);
      console.log(response.data);

      localStorage.removeItem("orderData");
      return response.data;
    } catch (error: any) {
      console.error("Error finalizing order:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create the order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<OrderDetails>) => {
      state.orderDetails = action.payload;
      localStorage.setItem("orderDetails", JSON.stringify(action.payload));
      console.log(action.payload);
    },
    setInvoiceNumber: (state, action: PayloadAction<string>) => {
      state.invoiceNumber = action.payload;
      localStorage.setItem("invoiceNumber", action.payload);
    },
    setCheckoutAmount: (state, action: PayloadAction<Partial<CheckoutAmount>>) => {
      state.checkoutAmount = action.payload;
      localStorage.setItem("checkoutDetails", JSON.stringify(action.payload));

      console.log(action.payload);
    },
    clearOrderData: (state) => {
      state.orderDetails = {};
      state.invoiceNumber = "";
      state.checkoutAmount = {};
      localStorage.removeItem("orderDetails");
      localStorage.removeItem("invoiceNumber");
      localStorage.removeItem("checkoutDetails");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading"; // Set status to loading
        state.error = null; // Clear previous errors
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded"; // Set status to succeeded
        // Optionally update state with any additional data from action.payload
        // Example: state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed"; // Set status to failed
        state.error = action.payload; // Set the error message
        console.error("Order creation failed:", action.payload);
      });
  },
});

export const {
  setOrderDetails,
  setInvoiceNumber,
  setCheckoutAmount,
  clearOrderData,
} = orderSlice.actions;

export const selectOrderDetails = (state: { order: OrderState }) => state.order.orderDetails;
export const selectInvoiceNumber = (state: { order: OrderState }) => state.order.invoiceNumber;
export const selectOrderCheckoutAmount = (state: { order: OrderState }) => state.order.checkoutAmount;
export const selectOrderError = (state: { order: OrderState }) => state.order.error;
export const selectOrderStatus = (state: { order: OrderState }) => state.order.status;

export default orderSlice.reducer;
