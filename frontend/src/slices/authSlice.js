import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  authLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { token, userId } = action.payload;
      state.isAuth = true;
      state.token = token;
      state.userId = userId;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
    },
    setLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const { setLogout, setLogin, setLoading } = authSlice.actions;
export default authSlice.reducer;
