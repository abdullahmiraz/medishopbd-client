import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusCode } from "../../../utils/statusCode";
import { serverUrl } from "../../../../api";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: StatusCode.IDLE,
  error: null,
};

// Async thunk to fetch user data by ID
// Async thunk to fetch user data by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId) => {
    console.log(userId);
    const response = await axios.get(`${serverUrl}/api/users/${userId}`);
    return response.data;
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (userDetails) => {
    console.log(userDetails);
    const { userId, name, email, phone, address, photoURL } = userDetails;
    const response = await axios.patch(`${serverUrl}/api/users/${userId}`, {
      name,
      email,
      phone,
      address,
      photoURL,
    });
    console.log(response.data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}/api/users/login`, {
        phone,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async ({ phone, password }, { rejectWithValue }) => {
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        console.log(action.payload);
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.status = StatusCode.SUCCEEDED;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.status = StatusCode.LOADING;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
