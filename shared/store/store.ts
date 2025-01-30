import { configureStore } from "@reduxjs/toolkit";
import { DataServices } from "../utils/services/dataServices";
import { persistedReducer } from "./reducer";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(DataServices.middleware) as any,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
