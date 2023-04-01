import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { token } = action.payload;
      state.isAuth = true;
      state.token = token;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
    },
  },
});

export const { setLogout, setLogin } = authSlice.actions;
export default authSlice.reducer;
