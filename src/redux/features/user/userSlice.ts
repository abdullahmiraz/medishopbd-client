'use client'

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../../../api";
import { StatusCode, StatusCodeType } from "../../../utils/StatusCode";

// Define types for user data and state
interface User {
  displayName: string;
  photoURL: string;
  _id: string;
  email: string;
  userId: string;
  role: string;
  name?: string;
  phone?: string;
  address?: string;
  prescription?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  status: StatusCodeType;
  error: string | null;
}

// Initial state typed
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: StatusCode.IDLE,
  error: null,
};

// Async thunk to fetch user data by ID
export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: { message: string } }
>("user/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${serverUrl}/api/users/${userId}`);
    if (response.data) {
      return response.data;
    } else {
      return rejectWithValue({ message: "User not found" });
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateUserDetails = createAsyncThunk<
  User,
  { userId: string; userDetails: Partial<User> },
  { rejectValue: string }
>(
  "user/updateUserDetails",
  async ({ userId, userDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${serverUrl}/api/users/${userId}`,
        userDetails
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  User,
  { phone: string; password: string },
  { rejectValue: string }
>("user/loginUser", async ({ phone, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${serverUrl}/api/users/login`, {
      phone,
      password,
    });
    const { userId, role } = response.data;
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const signUpUser = createAsyncThunk<
  User,
  { phone: string; password: string },
  { rejectValue: string }
>("user/signUpUser", async ({ phone, password }, { rejectWithValue }) => {
  try {
    await axios.post(`${serverUrl}/api/users/signup`, {
      phone,
      password,
    });
    const response = await axios.post(`${serverUrl}/api/users/login`, {
      phone,
      password,
    });
    const { userId, role } = response.data;
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = StatusCode.IDLE;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userId");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
      }
    },
    setUserFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");
        const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

        if (userId && role && isAuthenticated) {
          state.isAuthenticated = true;
          state.user = { userId, role } as User; // Adjust the structure as per your User object
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = StatusCode.SUCCEEDED;
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(
        fetchUserById.rejected,
        (state, action: PayloadAction<{ message: string } | undefined>) => {
          state.status = StatusCode.ERROR;
          state.error = action.payload?.message || null;
          state.isAuthenticated = false;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("userId", action.payload.userId);
          localStorage.setItem("role", action.payload.role);
          localStorage.setItem("isAuthenticated", "true");
        }
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = StatusCode.ERROR;
          state.error = action.payload || null;
          state.isAuthenticated = false;
        }
      )
      .addCase(signUpUser.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.status = StatusCode.SUCCEEDED;
      })
      .addCase(
        signUpUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = StatusCode.ERROR;
          state.error = action.payload || null;
        }
      )
      .addCase(updateUserDetails.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(
        updateUserDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = StatusCode.SUCCEEDED;
          state.user = action.payload;
        }
      )
      .addCase(
        updateUserDetails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = StatusCode.ERROR;
          state.error = action.payload || null;
        }
      );
  },
});

export const { logout, setUserFromLocalStorage } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.isAuthenticated;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
