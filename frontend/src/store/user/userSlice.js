import { createSlice } from "@reduxjs/toolkit";

import {
  loadSaves,
  deleteSave,
  typeChange,
  setUserDetails as setUserDetailsFunction,
  addNewSave as addNewSaveFunctions,
} from "./userActions";
import { balanceCount } from "../util";

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

const loadSavesPending = (state) => {
  state.isSavesLoading = true;
};

const loadSavesFulfilled = (state, action) => {
  const { saves, type, pageNum, docCount } = action.payload;

  if (!state.saves[type].savesArr) {
    state.saves[type].savesArr = [];
  }
  let savesArr = [...state.saves[type].savesArr];
  let strtIndex = pageNum === 1 ? 0 : (pageNum - 1) * state.savesLimitPerPage,
    j = 0;

  for (let i = strtIndex; i < strtIndex + saves.length; i++, j++) {
    if (savesArr.length < i + 1) {
      savesArr.push(saves[j]);
    }
    savesArr[i] = saves[j];
  }

  state.saves[type].savesArr = savesArr;
  state.saves[type].count = docCount[type];
  state.isSavesLoading = false;
};

const loadSavesRejected = (state) => {
  state.isSavesLoading = false;
};

const deleteSavePending = (state) => {};

const deleteSaveFulfilled = (state, action) => {
  const { type, saveId } = action.payload;
  switch (type) {
    case 0:
      state.saves[0].savesArr = null;
      state.saves[0].count = 0;
      break;
    case 1:
      state.saves[0].savesArr = null;
      state.saves[1].savesArr = null;
      break;
    case 2:
      state.saves[2].savesArr = null;
      break;
    default:
      break;
  }

  if (state.saves[type].savesArr) {
    const filteredArr = state.saves[type].savesArr.filter((save) => {
      return save._id !== saveId;
    });
    state.saves[type].savesArr = filteredArr;
  }
};

const deleteSaveRejected = (state) => {};

const typeChangePending = (state) => {};

const typeChangeFulfilled = (state, action) => {
  const { saveId, type, toType } = action.payload;

  switch (type) {
    case 0:
      if (toType !== 1) {
        const newSavesArr = state.saves[0].savesArr.filter((save) => {
          return save._id !== saveId;
        });
        state.saves[0].savesArr = newSavesArr;
      } else {
        state.saves[0].savesArr.forEach((save) => {
          if (save._id === saveId) {
            save.userOptions.type = 1;
          }
        });
      }
      state.saves[toType].savesArr = null;
      break;
    case 1:
      if (state.saves[1].savesArr) {
        const newFavSavesArr = state.saves[1].savesArr.filter((save) => {
          return save._id !== saveId;
        });
        state.saves[1].savesArr = newFavSavesArr;
      }
      const newAllSavesArr = state.saves[0].savesArr.filter((save) => {
        if (save._id === saveId) {
          save.userOptions.type = 0;
        }
        return save._id !== saveId || toType === 0;
      });
      state.saves[0].savesArr = newAllSavesArr;

      toType === 2 && (state.saves[2].savesArr = null);
      break;
    case 2:
      const newSavesArr = state.saves[2].savesArr.filter((save) => {
        return save._id !== saveId;
      });
      state.saves[2].savesArr = newSavesArr;
      state.saves[0].savesArr = null;
      state.saves[1].savesArr = null;
      break;
    default:
      break;
  }

  balanceCount(state.saves);
};

const typeChangeRejected = (state) => {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: setUserDetailsFunction,
    addNewSave: addNewSaveFunctions,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSaves.pending, loadSavesPending)
      .addCase(loadSaves.fulfilled, loadSavesFulfilled)
      .addCase(loadSaves.rejected, loadSavesRejected)
      .addCase(deleteSave.pending, deleteSavePending)
      .addCase(deleteSave.fulfilled, deleteSaveFulfilled)
      .addCase(deleteSave.rejected, deleteSaveRejected)
      .addCase(typeChange.pending, typeChangePending)
      .addCase(typeChange.fulfilled, typeChangeFulfilled)
      .addCase(typeChange.rejected, typeChangeRejected);
  },
});

export const { setUserDetails, addNewSave } = userSlice.actions;
export default userSlice.reducer;
