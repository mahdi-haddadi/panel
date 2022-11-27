import { axiosConfig } from "../../../services/httpService";
import { rest } from "../../../services/api";
import { IAdminSignin } from "./type";
export const login = async (userData: IAdminSignin) => {
  const response = await axiosConfig.axios.post(rest.auth.signin, userData);
  return response.data;
};