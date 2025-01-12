import { createSlice } from "@reduxjs/toolkit";

// Slice untuk autentikasi pengguna
const authSlice = createSlice({
  name: "auth", // Nama slice
  initialState: {
    user: null, // Data pengguna
    token: null, // Token autentikasi
  },
  reducers: {
    // Action untuk login
    login: (state, action) => {
      const { user, token } = action.payload;

      // Validasi payload sebelum memperbarui state
      if (user && token) {
        state.user = user;
        state.token = token;
      } else {
        console.error("Login action gagal: payload tidak valid.");
      }
    },
    // Action untuk logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions dan reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
