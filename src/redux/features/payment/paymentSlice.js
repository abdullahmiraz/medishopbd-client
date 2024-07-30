// src/redux/features/payment/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {},
  invoiceNumber: "",
  checkoutAmount: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
      console.log(action.payload);
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setCheckoutAmount: (state, action) => {
      state.checkoutAmount = action.payload;
    },
    clearPaymentData: (state) => {
      state.orderDetails = null;
      state.invoiceNumber = "";
      state.checkoutAmount = null;
    },
  },
});

export const {
  setOrderDetails,
  clearOrderDetails,
  setInvoiceNumber,
  setCheckoutAmount,
  clearPaymentData,
} = paymentSlice.actions;

export const selectOrderDetails = (state) => state.payment?.orderDetails || {};
export const selectInvoiceNumber = (state) => state.payment?.invoiceNumber || "";
export const selectCheckoutAmount = (state) =>
  state.payment?.checkoutAmount || 0;

export default paymentSlice.reducer;
