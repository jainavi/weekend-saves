import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorArr: [{ msg: "error-1", id: 0 }],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    pushError: (state, action) => {
      const error = action.payload;
      state.errorArr.push(error);
    },
  },
});

export const { pushError } = uiSlice.actions;
export default uiSlice.reducer;
