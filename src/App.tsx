import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxhook";
import { DynamicePathAuth, GetRoutes } from "./routes";
import { setHeadersToken } from "./services/axiosConfig";
import HeaderLayout from "./Components/layout/HeaderLayout";
import { GetUserApi } from "./services/AuthService";
import { toast } from "react-toastify";
import { setLogOut, setUserInfo } from "./store/reducers/AuthuserSlice";

const App = () => {
  const { token } = useAppSelector((state) => state.authuser);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const deafultRoute = GetRoutes(token).filter(
      (data: any) => data.default
    )[0];
    const pathRoute = GetRoutes(token).map((data: any) => data.path);
    if (!pathRoute.includes(location.pathname)) {
      if (!DynamicePathAuth(location.pathname, token)) navigation(deafultRoute.path);
    }
  }, [token, location]);

  const fetchUserInfo = async () => {
    const res = await GetUserApi(setHeadersToken(token));
    if (res?.isSuccess) {
      if (res?.data) {
        dispatch(setUserInfo(res.data));
      }
    } else {
      toast.error(res?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (res?.data.isNotAuth) {
        dispatch(setLogOut());
      }
    }
  };
  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token]);
  return (
    <>
      {!!token && <HeaderLayout />}
      <Routes>
        {GetRoutes(token)?.map((data: any, index: number) => {
          return <Route key={index} path={data.path} element={data.element} />;
        })}
      </Routes>
    </>
  );
};

export default App;
