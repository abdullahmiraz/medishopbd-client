// src/redux/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
// import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";
// import categoryReducer from "../features/category/categorySlice";
import promoCodeReducer from "../features/promoCode/promoCodeSlice";

// Configure the store with all the reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    // product: productReducer,
    order: orderReducer,
    // category: categoryReducer,
    promoCode: promoCodeReducer,
  },
});

// Export the store
export default store;

// Export RootState and AppDispatch types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
