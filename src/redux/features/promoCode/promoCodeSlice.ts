// src/redux/features/promoCode/promoCodeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../../../api";

// Define the types for PromoCode validation
interface PromoCodeState {
  code: string;
  discount: number;
  discountType: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state with typed structure
const initialState: PromoCodeState = {
  code: "",
  discount: 0,
  discountType: "",
  status: "idle",
  error: null,
};

// Define the argument type for the promo code validation
interface ValidatePromoCodeArgs {
  promoCode: string;
  subtotal: number;
}

// Define the response type for promo code validation
interface PromoCodeResponse {
  discount: number;
  discountType: string;
}

// Async thunk to validate promo code
export const validatePromoCode = createAsyncThunk(
  "promoCode/validatePromoCode",
  async ({ promoCode, subtotal }: ValidatePromoCodeArgs, { rejectWithValue }) => {
    try {
      const response = await axios.post<PromoCodeResponse>(`${serverUrl}/api/promocodes/validate`, {
        code: promoCode,
      });
      const { discount, discountType } = response.data;

      let discountAmount: number;
      if (discountType === "percentage") {
        discountAmount = (subtotal * discount) / 100;
      } else {
        discountAmount = discount;
      }

      return { discount: discountAmount, discountType };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the promo code slice
const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    clearPromoCode: (state) => {
      state.code = "";
      state.discount = 0;
      state.discountType = "";
      state.status = "idle";
      state.error = null;
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validatePromoCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(validatePromoCode.fulfilled, (state, action: PayloadAction<{ discount: number, discountType: string }>) => {
        state.status = "succeeded";
        state.discount = action.payload.discount;
        state.discountType = action.payload.discountType;
        state.error = null;
      })
      .addCase(validatePromoCode.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload?.message || "Promo code validation failed";
      });
  },
});

// Export actions
export const { clearPromoCode, setPromoCode } = promoCodeSlice.actions;

// Selector to get the promo code state
export const selectPromoCode = (state: { promoCode: PromoCodeState }) => state.promoCode;

// Export the reducer as the default export
export default promoCodeSlice.reducer;
