// src/redux/features/order/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: {},
  invoiceNumber: `INV-${Date.now()}`,
  checkoutAmount: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setCheckoutAmount: (state, action) => {
      state.checkoutAmount = action.payload;
    },
  },
});

export const { setOrderDetails, setInvoiceNumber, setCheckoutAmount } =
  orderSlice.actions;

export const selectOrderDetails = (state) => state.order.orderDetails;
export const selectInvoiceNumber = (state) => state.order.invoiceNumber;
export const selectOrderCheckoutAmount = (state) => state.order.checkoutAmount;

export default orderSlice.reducer;
