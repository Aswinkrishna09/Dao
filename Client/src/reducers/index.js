import { createSlice } from "@reduxjs/toolkit";
import {
  ADD_ERROR,
  REMOVE_ERROR,
  START_LOADING,
  STOP_LOADING,
} from "./constants/Error";
import { ORPHANGE_STATECHANGE } from "./constants/Orphanages";

export const slice = createSlice({
  name: "Error",
  initialState: {
    value: 0,
    error: "",
    organizationName: "",
    amountRequired: 0,
    withdrawOwner: "",
    Orphanage: {},
    OrphanageList: [],
    loading: false,
    isOrphanage: false,
    OrphanageID: 0,
  },
  reducers: {
    Error: (state, action) => {
      switch (action.payload.type) {
        case ADD_ERROR:
          state.error = action.payload.value;
          break;
        case REMOVE_ERROR:
          state.error = "";
          break;

        default:
      }
    },
    Orphanages: (state, action) => {
      switch (action.payload.type) {
        case ORPHANGE_STATECHANGE:
          return {
            ...state,
            [action.payload.key]: action.payload.value,
          };
        case REMOVE_ERROR:
          state.error = "";
          break;
        default:
      }
    },
    Loading: (state, action) => {
      switch (action.payload.type) {
        case START_LOADING:
          return {
            ...state,
            loading: true,
          };
        case STOP_LOADING:
          return {
            ...state,
            loading: false,
          };
        default:
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { Error, Orphanages, Loading } = slice.actions;

export const selectCount = (state) => state.counter.value;

export default slice.reducer;
