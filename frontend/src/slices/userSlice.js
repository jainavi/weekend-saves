import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  email: null,
  isLoading: true,
  saves: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { _id, firstName, lastName, phoneNumber, email, saves } =
        action.payload;
      state.userId = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.email = email;
      state.saves = saves;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
