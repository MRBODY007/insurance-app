import { configureStore } from "@reduxjs/toolkit";
import premiumReducer from "./premiumSlice";

export const store = configureStore({
  reducer: {
    premium: premiumReducer,
  },
});

//  กำหนด Type ของ State และ Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
