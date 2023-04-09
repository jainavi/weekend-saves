import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isStateUpdating: true,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateUpdating: (state, action) => {
      state.isStateUpdating = action.payload;
    },
    setLogin: (state, action) => {
      const { token } = action.payload;
      state.isAuth = true;
      state.token = token;
      state.isStateUpdating = false;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.isStateUpdating = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
    },
  },
});

export const { setLogout, setLogin, setStateUpdating } = authSlice.actions;
export default authSlice.reducer;
