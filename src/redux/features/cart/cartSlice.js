// src/redux/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to get initial state from localStorage
const getInitialCartState = () => {
  const storedCart = localStorage.getItem("medicine_cart");
  if (storedCart) {
    const cart = JSON.parse(storedCart);
    // Recalculate checkout amount based on stored items
    // const checkoutAmount = calculateCheckoutAmount(cart);
    return { items: cart };
    // return { items: cart, checkoutAmount };
  }
  return {
    items: [],
    checkoutAmount: {
      subtotal: 0,
      deliveryFee: 0,
      discountedAmount: 0,
      total: 0,
    },
  };
};

// Initial state with data from localStorage if available
const initialState = getInitialCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItemIndex > -1) {
        state.items[existingItemIndex].stripCount += item.stripCount;
        state.items[existingItemIndex].productCount += item.stripCount;
        state.items[existingItemIndex].totalPrice += item.totalPrice;
        state.items[existingItemIndex].totalProfit += item.totalProfit;
      } else {
        state.items.push(item);
      }

      // Recalculate checkoutAmount
      state.checkoutAmount = calculateCheckoutAmount(state.items);

      // Save cart to localStorage
      localStorage.setItem("medicine_cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );

      // Recalculate checkoutAmount
      state.checkoutAmount = calculateCheckoutAmount(state.items);

      // Save updated cart to localStorage
      localStorage.setItem("medicine_cart", JSON.stringify(state.items));
    },
    setCart: (state, action) => {
      state.items = action.payload;

      // Recalculate checkoutAmount
      state.checkoutAmount = calculateCheckoutAmount(state.items);

      // Save updated cart to localStorage
      localStorage.setItem("medicine_cart", JSON.stringify(state.items));
    },
    updateCheckoutAmount: (state, action) => {
      state.checkoutAmount = {
        ...state.checkoutAmount,
        ...action.payload,
      };
      state.checkoutAmount.total = calculateTotalAmount(state.checkoutAmount);

      // Save updated checkoutAmount to localStorage
      localStorage.setItem("medicine_cart", JSON.stringify(state.items));
    },
  },
});

const calculateCheckoutAmount = (items) => {
  let subtotal = 0;
  let discountedAmount = 0;
  items.forEach((item) => {
    subtotal += item.totalPrice;
    discountedAmount += item.discountedAmount || 0;
  });
  return {
    subtotal,
    deliveryFee: 0, // Initial value, can be updated later
    discountedAmount,
    total: subtotal, // Initial value, will be updated later
  };
};

const calculateTotalAmount = (checkoutAmount) => {
  return (
    checkoutAmount.subtotal +
    checkoutAmount.deliveryFee -
    checkoutAmount.discountedAmount
  );
};

export const { addToCart, removeFromCart, setCart, updateCheckoutAmount } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCheckoutAmount = (state) => state.cart.checkoutAmount;

export default cartSlice.reducer;
