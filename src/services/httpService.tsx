import axios from "axios";
import { getLocal, getSession } from "../utils/storage";
import config from "./config.json";

const axiosInstance = axios.create({ baseURL: config.api });
const axiosInstanceProtectd = axios.create({
  baseURL: config.api,
});
axiosInstance.interceptors.request.use(
  (onFulfilled: any) => {
    const token: string | null = getLocal("token");
    if (token) {
      onFulfilled.headers["Authorization"] = `Bearer ${token}`;
    }
    return onFulfilled;
  },
  (onRejected) => {
    const expectedErrors =
      onRejected.response &&
      onRejected.response.status >= 400 &&
      onRejected.response.status < 500;
    if (!expectedErrors) {
      console.log(onRejected);
    }
    return Promise.reject(onRejected);
  }
);

axiosInstanceProtectd.interceptors.request.use(
  (onFulfilled: any) => {
    const token: string = getSession("token");
    onFulfilled.headers["Authorization"] = `Bearer ${token}`;
    return onFulfilled;
  },
  (onRejected: any) => {
    const expectedErrors =
      onRejected.response &&
      onRejected.response.status >= 400 &&
      onRejected.response.status < 500;
    if (!expectedErrors) {
      console.log(onRejected);
    }
    return Promise.reject(onRejected);
  }
);

export const axiosConfig = {
  axiosProtected: axiosInstanceProtectd,
  axios: axiosInstance,
};
