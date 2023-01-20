import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import doctorReducer from "./doctorSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    auth: authReducer,
    doctor: doctorReducer,
  },
});
