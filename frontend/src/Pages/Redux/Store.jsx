import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"; // Import reducer untuk autentikasi

// Konfigurasi store Redux Toolkit
const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer untuk autentikasi
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Middleware default
});

export default store;
