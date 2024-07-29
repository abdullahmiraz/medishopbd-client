// src/redux/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import orderReducer from '../features/order/orderSlice';
import categoryReducer from '../features/category/categorySlice';
import promoCodeReducer from '../features/promoCode/promoCodeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer,
    promoCode: promoCodeReducer,
  },
});

export default store;
