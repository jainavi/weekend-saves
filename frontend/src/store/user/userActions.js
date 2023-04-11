import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSavesApi, deleteSaveApi, typeChangeApi } from "../../util/api";
import { pushError } from "../ui/uiSlice";

//ASYNC THUNK FUNCTIONS
export const loadSaves = createAsyncThunk(
  "saves/loadSaves",
  async ({ type, pageNum }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    if (!token) {
      return Promise.reject("Invalid token");
    }

    try {
      const res = await getSavesApi(token, pageNum, type);
      res.type = type;
      res.pageNum = pageNum;
      return res;
    } catch (err) {
      thunkAPI.dispatch(pushError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const typeChange = createAsyncThunk(
  "saves/typeChange",
  async ({ type, toType, saveId }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      await typeChangeApi(token, toType, saveId);
      return { type, saveId, toType };
    } catch (err) {
      thunkAPI.dispatch(pushError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteSave = createAsyncThunk(
  "saves/deleteSave",
  async ({ type, saveId }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      await deleteSaveApi(token, saveId);
      return { type, saveId };
    } catch (err) {
      thunkAPI.dispatch(pushError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//REDUCES FUNCTIONS
export const setUserDetails = (state, action) => {
  const { _id, firstName, lastName, phoneNumber, email } = action.payload;
  state.userId = _id;
  state.firstName = firstName;
  state.lastName = lastName;
  state.phoneNumber = phoneNumber;
  state.email = email;
};

export const addNewSave = (state, action) => {
  const save = action.payload;
  const newSaveArr = [save, ...state.saves[0].savesArr];
  state.saves[0].count += 1;
  state.saves[0].savesArr = newSaveArr;
};
