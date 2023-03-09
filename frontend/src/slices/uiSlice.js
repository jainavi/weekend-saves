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
      const updatedArr = [...state.errorArr, error];
      state.errorArr = updatedArr;
    },
    pushSuccess: (state, action) => {
      const success = action.payload;
      const updatedArr = [...state.successArr, success];
      state.successArr = updatedArr;
    },
  },
});

export const { pushError } = uiSlice.actions;
export default uiSlice.reducer;
