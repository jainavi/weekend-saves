import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  isLoading: true,
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
      state.isLoading = false;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.userId = null;
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
