import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginApi } from "../../services/AuthService";
import { SetCookies } from "../../utils/Cookies";
import { useAppDispatch } from "../../store/reduxhook";
import { setToken } from "../../store/reducers/AuthuserSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!!state.email && !!state.password) {
      const res: any = await LoginApi(state);
      if (res?.isSuccess) {
        if (res?.data.isLogin) {
          toast.success(res?.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          SetCookies({
            name: "token",
            value: res?.data.token,
            exdays: res?.data?.expireDay,
          });
          dispatch(setToken({ token: res?.data.token }));
          navigation("/");
        }
      } else {
        toast.error(res?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
      <div className="flex justify-center">
        <form className="sm:w-1/3 bg-white border-2 rounded-md py-5 text-center mt-16">
          <h1 className="text-2xl font-black border-b-2 inline-block border-gray-500 pb-1">
            Login
          </h1>
          <div className="w-full px-10 mt-10">
            <p className="text-black text-lg font-semibold text-left pb-2 pt-4">
              Enter Email
            </p>
            <input
              className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
              value={state.email}
              type="email"
              name="email"
              onChange={(e) =>
                setState({
                  ...state,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="px-10">
            <p className="text-black text-lg font-semibold text-left pb-2 pt-4">
              Enter Password
            </p>
            <input
              className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
              value={state.password}
              type="password"
              name="password"
              onChange={(e) =>
                setState({
                  ...state,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div>
            <button
              type="button"
              className="common-btn mt-8 mb-4"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p className="flex justify-between mx-10 mt-5">
            <Link
              className="text-sm hover:text-blue-500 font-bold"
              to={"/auth/signup"}
            >
              Don't have an account?
            </Link>
            <Link className="text-sm hover:text-blue-500 font-bold" to={""}>
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
