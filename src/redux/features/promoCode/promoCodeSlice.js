// src/redux/features/promoCode/promoCodeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../../../api";

// Async thunk to validate promo code
export const validatePromoCode = createAsyncThunk(
  "promoCode/validatePromoCode",
  async ({ promoCode, subtotal }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}/api/promocodes/validate`, {
        code: promoCode,
      });
      const { discount, discountType } = response.data;
      console.log(response.data)

      let discountAmount;
      if (discountType === "percentage") {
        discountAmount = (subtotal * discount) / 100;
      } else {
        discountAmount = discount;
      }

      return { discount: discountAmount };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState: {
    code: "",
    discount: 0,
    discountType: "",
    status: "idle",
    error: null,
  },
  reducers: {
    clearPromoCode: (state) => {
      state.code = "";
      state.discount = 0;
      state.discountType = "";
      state.status = "idle";
      state.error = null;
    },
    setPromoCode: (state, action) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validatePromoCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(validatePromoCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.discount = action.payload.discount;
        state.discountType = action.payload.discountType;
        state.error = null;
      })
      .addCase(validatePromoCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { clearPromoCode, setPromoCode } = promoCodeSlice.actions;

export const selectPromoCode = (state) => state.promoCode;

export default promoCodeSlice.reducer;
