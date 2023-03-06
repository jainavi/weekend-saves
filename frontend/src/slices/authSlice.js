import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginForm: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getRegisterForm: (state) => {
      state.showLoginForm = false;
    },
  },
});

export const { getRegisterForm } = authSlice.actions;
export default authSlice.reducer;
