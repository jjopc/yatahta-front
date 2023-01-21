import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import doctorReducer from "./doctorSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  doctor: doctorReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
