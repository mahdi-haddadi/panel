import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Signin = lazy(() => import("../screens/signin/Signin"));
const NotFound = lazy(() => import("../screens/404/NotFound"));
const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthLayout;
