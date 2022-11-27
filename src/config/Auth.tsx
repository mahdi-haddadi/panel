import { FC, Fragment, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocal, getSession } from "../utils/storage";
import { setToken } from "../redux/features/admin/adminSlice";
interface Props {
  children: ReactNode;
}
const Auth: FC<Props> = ({ children }) => {
  const token = getSession('token') || getLocal("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch, token]);

  return <Fragment>{children}</Fragment>;
};

export default Auth;
