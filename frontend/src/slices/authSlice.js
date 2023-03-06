import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginForm: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showRegisterForm: (state) => {
      state.showLoginForm = false;
    },
    showLoginForm: (state) => {
      state.showLoginForm = true;
    },
  },
});

export const { showRegisterForm, showLoginForm } = authSlice.actions;
export default authSlice.reducer;
