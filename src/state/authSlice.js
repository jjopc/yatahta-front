import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import { getUser, getAuthHeader } from "../services/AuthService";
import axios from "axios";

const user = getUser();

export const registerDoctorReducer = createAsyncThunk(
  "auth/registerDoctor",
  async ({ username, email, password1, password2 }, thunkAPI) => {
    const url = `${import.meta.env.VITE_API_URL}/users/add_doctor/`;
    const headers = getAuthHeader();
    try {
      const response = await axios.post(
        url,
        {
          username,
          email,
          password1,
          password2,
        },
        { headers: headers }
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logInReducer = createAsyncThunk(
  "auth/logIn",
  async ({ username, password }, thunkAPI) => {
    const url = `${import.meta.env.VITE_AUTH_URL}/login/`;
    try {
      // const response = await logIn(username, password);
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        "yatahta.auth",
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.detail;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = user
  ? {
      isLoggedIn: true,
      user,
    }
  : {
      isLoggedIn: false,
      user: null,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutReducer(state, action) {
      window.localStorage.removeItem("yatahta.auth");
      state.isLoggedIn = false;
      state.user = null;
      window.location.reload();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerDoctorReducer.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(registerDoctorReducer.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(logInReducer.pending, (state, action) => {
        console.log("Estoy en PENDING de logInReducer en AuthSlice");
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logInReducer.fulfilled, (state, action) => {
        console.log("Estoy en FULFILLED de logInReducer en AuthSlice");
        state.isLoggedIn = true;
        state.user = getUser(JSON.stringify(action.payload));
      })
      .addCase(logInReducer.rejected, (state, action) => {
        console.log("Estoy en REJECTED de logInReducer en AuthSlice");
        state.isLoggedIn = false;
        state.user = null;
      });
    // .addCase(logOutReducer.fulfilled, (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // });
  },
});

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const { logOutReducer } = authSlice.actions;

export default authSlice.reducer;
