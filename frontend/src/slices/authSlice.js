import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { token } = action.payload;
      state.isAuth = true;
      state.token = token;
      state.isLoading = false;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLogout, setLogin, setLoading } = authSlice.actions;
export default authSlice.reducer;
