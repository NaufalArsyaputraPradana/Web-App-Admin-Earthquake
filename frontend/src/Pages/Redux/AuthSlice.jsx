import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("auth_token") || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Simpan data user dan token di localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("auth_token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Hapus data user dan token dari localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
