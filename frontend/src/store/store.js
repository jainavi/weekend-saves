import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import uiSlice from "./ui/uiSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    user: userSlice,
  },
});

export default store;
