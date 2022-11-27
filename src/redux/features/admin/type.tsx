export interface IAdmin {
  fullname: string;
  username: string;
  email: string;
  accessLevel: number;
  active: boolean;
}
export interface IState {
  user: IAdmin | null;
  loading: boolean;
  error: string | null | IUserError;
  token: number | null;
}
export interface IAdminSignin {
  username: string;
  password: string;
}
export interface IFormSignin {
  user: IAdminSignin;
  rememberMe: boolean;
}
export interface IResSignin {
  success: boolean;
  msg: string;
  token: string;
}
interface IUserError {
  user:boolean
}