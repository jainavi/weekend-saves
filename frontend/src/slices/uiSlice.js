import { createSlice } from "@reduxjs/toolkit";

let id = 0;

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
      error.id = id;
      id += 1;
      const updatedArr = [...state.errorArr, error];
      state.errorArr = updatedArr;
    },
    popError: (state, action) => {
      const errorId = action.payload;
      const updatedArr = state.errorArr.filter((error) => error.id !== errorId);
      state.errorArr = updatedArr;
    },
    pushSuccess: (state, action) => {
      const success = action.payload;
      success.id = id;
      id += 1;
      const updatedArr = [...state.successArr, success];
      state.successArr = updatedArr;
    },
    popSuccess: (state, action) => {
      const successId = action.payload;
      const updatedArr = state.successArr.filter(
        (success) => success.id !== successId
      );
      state.successArr = updatedArr;
    },
  },
});

export const { pushError, popError, pushSuccess, popSuccess } = uiSlice.actions;
export default uiSlice.reducer;
