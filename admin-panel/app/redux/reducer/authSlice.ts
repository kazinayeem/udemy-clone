import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/login`,
        credentials
      );
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data as User;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Async register
export const register = createAsyncThunk(
  "auth/register",
  async (data: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/register`,
        data
      );

      return response.data.user as User;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
