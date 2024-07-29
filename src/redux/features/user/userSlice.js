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
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId) => {
    const response = await axios.get(`${serverUrl}/api/users/${userId}`);
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
      // Save userId and authentication state to localStorage
      localStorage.setItem("userId", response.data.userId);
      console.log(response.data.userId);
      localStorage.setItem("isAuthenticated", "true");
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
      const loginResponse = await axios.post(`${serverUrl}/api/users/login`, {
        phone,
        password,
      });
      return loginResponse.data;
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
      localStorage.removeItem("userId");
      localStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = StatusCode.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
console.log(selectUser);
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export const { logout } = userSlice.actions;
export default userSlice.reducer;
