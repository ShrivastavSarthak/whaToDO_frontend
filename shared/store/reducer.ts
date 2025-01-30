import { combineReducers } from "@reduxjs/toolkit";
// import { userSlice } from "./slices/userSlice";
// import { tagSlice } from "./slices/tagSlice";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { DataServices } from "../utils/services/dataServices";
// import { projectSlice } from "./slices/projectslice";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user", "project"],
};

const Reducer = combineReducers({
//   user: userSlice.reducer,
//   tagSlice: tagSlice.reducer,
//   project: projectSlice.reducer,
  [DataServices.reducerPath]: DataServices.reducer,
});

export const persistedReducer = persistReducer(persistConfig, Reducer);
