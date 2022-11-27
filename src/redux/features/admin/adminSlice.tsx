import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  removeLocal,
  removeSession,
  setLocal,
  setSession,
} from "../../../utils/storage";
import { login } from "./adminService";
import { IState, IFormSignin, IResSignin } from "./type";

const initialState: IState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

export const signinAdmin: any = createAsyncThunk(
  "signin/admin",
  async (user: IFormSignin, thunkApi) => {
    try {
      const res = await login(user.user);
      if (res && res.success && user.rememberMe) {
        setLocal("token", res.token);
      }
      return res as IResSignin;
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        return thunkApi.rejectWithValue("error of side server");
      }
      const msg =
        (error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.msg)) ||
        error.message ||
        error.toString();
      if (!error.response.data.user && !error.response.data.success) {
        return thunkApi.rejectWithValue({ user: false });
      }
      return thunkApi.rejectWithValue(msg);
    }
  }
);
const signinSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeLocal("token");
      removeSession("token");
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(signinAdmin.pending, (state: IState) => {
      state.loading = true;
    });
    bulider.addCase(signinAdmin.fulfilled, (state: IState, action: any) => {
      setSession("token", action.payload.token);
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.user = action.payload.info;
    });
    bulider.addCase(signinAdmin.rejected, (state: IState, action: any) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const { setToken, logout } = signinSlice.actions;

export default signinSlice.reducer;
