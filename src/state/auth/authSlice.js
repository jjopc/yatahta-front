import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { isLoggedIn: false },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.value.isLoggedIn = true;
    },
    logout: (state) => {
      state.value.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.value.isLoggedIn;

export default authSlice.reducer;
