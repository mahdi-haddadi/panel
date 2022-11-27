import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "./redux/store";
import ThemeProvider from "./theme/ThemeProvider";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Auth from "./config/Auth";
import Loading from "./components/loading/Loading";
import "./assets/app.scss";
import { IState } from "./redux/features/admin/type";
import CustomScroll from "./components/scrollbar/CustomScroll";

const App = () => {
  const { token }: IState = useSelector((state: RootState) => state.admin);
  const ProtectRoute: any = () => {
    return <MainLayout />;
  };
  const AuthRoute: any = () => {
    return <AuthLayout />;
  };

  return (
    <Suspense
      fallback={
        <Loading
          className="w-full flex justify-center items-center"
          height={"100vh"}
        />
      }
    >
      <Auth>
        <ThemeProvider>
          <div
            className="wrapper mx-auto h-auto"
            style={{ maxWidth: "2400px" }}
          >
            <Routes>
              {/* <Route
                path="/auth/*"
                element={token ? <Navigate to={"/"} /> : <AuthRoute />}
              />
              <Route
                path="/*"
                element={
                  !token ? <Navigate to={"auth/signin"} /> : <ProtectRoute />
                }
              /> */}
              <Route path="/*" element={<ProtectRoute />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Auth>
    </Suspense>
  );
};

export default App;
