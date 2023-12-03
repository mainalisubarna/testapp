import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  jwtToken: "",
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, data) => {
      (state.isLogged = true), (state.jwtToken = data.payload);
    },
    logout: () => {
      localStorage.setItem("persist:root", "");
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
