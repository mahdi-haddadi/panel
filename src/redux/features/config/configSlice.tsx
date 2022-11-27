import { createSlice } from "@reduxjs/toolkit";
import { getLocal } from "../../../utils/storage";
interface IState {
  language: "fa" | "en";
  theme: string;
  fontSize: string;
}
const initialState: IState = {
  language: getLocal("lang") ? getLocal("lang") : "fa",
  theme: "default",
  fontSize: "1",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setLanguage, setTheme, setFontSize } = configSlice.actions;

export default configSlice.reducer;
