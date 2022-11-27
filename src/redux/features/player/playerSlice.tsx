import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rest } from "../../../services/api";
import {axiosConfig} from "../../../services/httpService";
import { IState } from "./type";
const initialState: IState = {
  data: [],
  loading: false,
  error: null,
};
const getDataPlayers = async () => {
  const response = await axiosConfig.axiosProtected(rest.user.getUser);
  return response.data.data;
};
export const getPlayers: any = createAsyncThunk(
  "data/players",
  async (_, thunkApi) => {
    try {
      const res = await getDataPlayers();
      return res;
    } catch (error: any) {
      const msg =
        (error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.msg)) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(msg);
    }
  }
);
const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlayers.pending, (state: IState) => {
      state.loading = true;
    });
    builder.addCase(getPlayers.fulfilled, (state: IState, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getPlayers.rejected, (state: IState, action: any) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    });
  },
});

export default playerSlice.reducer;
