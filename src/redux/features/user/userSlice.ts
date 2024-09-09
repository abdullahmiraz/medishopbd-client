// src/redux/features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
 import { serverUrl } from "../../../../api";
import { StatusCode, StatusCodeType } from "../../../utils/statusCode";

// Define types for user data and state
interface User {
  userId: string;
  role: string;
  name?: string;
  phone?: string;
  address?: string;
  // Add any other properties relevant to your user object
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
    // After sign-up, attempt to log the user in immediately
    const response = await axios.post(`${serverUrl}/api/users/login`, {
      phone,
      password,
    });
    localStorage.setItem("userId", response?.data?.userId);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", response?.data?.role);
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
      localStorage.removeItem("userId");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
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
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("isAuthenticated", "true");
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

export const { logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.isAuthenticated;
export const selectStatus = (state: { user: UserState }) => state.user.status;
export const selectError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
