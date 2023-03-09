import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorArr: [],
  successArr: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    pushError: (state, action) => {
      const error = action.payload;
      state.errorArr.push(error);
    },
    pushSuccess: (state, action) => {
      const success = action.payload;
      state.successArr.push(success);
    },
  },
});

export const { pushError } = uiSlice.actions;
export default uiSlice.reducer;
