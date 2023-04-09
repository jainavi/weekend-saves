import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getSaves } from "../util/api";
import { pushError } from "./uiSlice";
import { TYPES_ITS } from "../util/global";

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  email: null,
  isSavesLoading: false,
  saves: [
    { savesArr: null, count: 0 },
    { savesArr: null, count: 0 },
    { savesArr: null, count: 0 },
  ],
  savesLimitPerPage: 6,
};

export const loadSaves = createAsyncThunk(
  "saves/loadSaves",
  async ({ type, pageNum }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    if (!token) {
      return Promise.reject("Invalid token");
    }

    try {
      const res = await getSaves(token, pageNum, type);
      res.type = type;
      res.pageNum = pageNum;
      return res;
    } catch (err) {
      thunkAPI.dispatch(pushError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const pageUp = createAsyncThunk();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { _id, firstName, lastName, phoneNumber, email } = action.payload;
      state.userId = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.email = email;
    },
    addNewSave: (state, action) => {
      const save = action.payload;
      const newSaveArr = [save, ...state.saves[0].savesArr];
      state.saves[0].count += 1;
      state.saves[0].savesArr = newSaveArr;
    },
  },
  extraReducers: {
    [loadSaves.pending]: (state) => {
      state.isSavesLoading = true;
    },
    [loadSaves.fulfilled]: (state, action) => {
      const { saves, type, pageNum, docCount } = action.payload;

      if (!state.saves[type].savesArr) {
        state.saves[type].savesArr = [];
      }
      let savesArr = [...state.saves[type].savesArr];
      let strtIndex =
          pageNum === 1 ? 0 : (pageNum - 1) * state.savesLimitPerPage,
        j = 0;

      for (let i = strtIndex; i < strtIndex + saves.length; i++, j++) {
        if (savesArr.length < i + 1) {
          savesArr.push(saves[j]);
        }
        savesArr[i] = saves[j];
      }

      state.saves[type].savesArr = savesArr;
      state.saves[type].count =
        type === 0 ? docCount.total : docCount[TYPES_ITS[type]];
      state.isSavesLoading = false;
    },
    [loadSaves.rejected]: (state) => {
      state.isSavesLoading = false;
    },
  },
});

export const { setUserDetails, addNewSave } = userSlice.actions;
export default userSlice.reducer;
