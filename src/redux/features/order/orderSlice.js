import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../../../api";
import axios from "axios";

const initialState = {
  orderDetails: {},
  invoiceNumber: "",
  checkoutAmount: {},
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { dispatch, rejectWithValue }) => {
    console.log(orderData);
    try {
      const response = await axios.post(`${serverUrl}/api/orders`, orderData);
      console.log(response.data);

      localStorage.removeItem("orderData");
      return response.data;
    } catch (error) {
      console.error("Error finalizing order:", error);
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
      localStorage.setItem("orderDetails", JSON.stringify(action.payload));
      console.log(state.orderDetails);
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
      localStorage.setItem("invoiceNumber", action.payload);
    },
    setCheckoutAmount: (state, action) => {
      state.checkoutAmount = action.payload;
      localStorage.setItem("checkoutDetails", JSON.stringify(action.payload));

      console.log(action.payload);
    },
    clearOrderData: (state) => {
      state.orderDetails = {};
      state.invoiceNumber = "";
      state.checkoutAmount = {};
      localStorage.removeItem("orderDetails");
    },

    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.status = "loading"; // Set status to loading
          state.error = null; // Clear previous errors
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.status = "succeeded"; // Set status to succeeded
          // Optionally update state with any additional data from action.payload
          // Example: state.orderConfirmation = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.status = "failed"; // Set status to failed
          state.error = action.payload; // Set the error message
          console.error("Order creation failed:", action.payload);
        });
    },
  },
});

export const {
  setOrderDetails,
  setInvoiceNumber,
  setCheckoutAmount,
  clearOrderData,
} = orderSlice.actions;

export const selectOrderDetails = (state) => state.order.orderDetails;
export const selectInvoiceNumber = (state) => state.order.invoiceNumber;
export const selectOrderCheckoutAmount = (state) => state.order.checkoutAmount;

export const selectOrderError = (state) => state.order.error;
export const selectOrderStatus = (state) => state.order.status;

export default orderSlice.reducer;
