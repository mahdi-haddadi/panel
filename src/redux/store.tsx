import { configureStore } from "@reduxjs/toolkit";
import signinSlice from "./features/admin/adminSlice";
import configSlice from "./features/config/configSlice";
import plyearSlice from "./features/player/playerSlice";
const reducers = {
  admin: signinSlice,
  players: plyearSlice,
  config: configSlice,
};
export const store = configureStore({
  reducer: reducers,
});

export const states =  store.getState()
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
