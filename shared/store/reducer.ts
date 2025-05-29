import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { DataServices } from "../utils/services/dataServices";
import { userSlice } from "./slices/user-slice";
import { peopleSlice } from "./slices/people-slice";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: [],
};

const Reducer = combineReducers({
  user: userSlice.reducer,
  people: peopleSlice.reducer,
  [DataServices.reducerPath]: DataServices.reducer,
});

export const persistedReducer = persistReducer(persistConfig, Reducer);
