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
      localStorage.setItem("orderDetails", JSON.stringify(action.payload));
      console.log(state.orderDetails);
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
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

export default orderSlice.reducer;
