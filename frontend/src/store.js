import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    user: userSlice,
  },
});

export default store;
