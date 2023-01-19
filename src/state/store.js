import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    auth: authReducer,
  },
});
