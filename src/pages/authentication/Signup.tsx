import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignupApi } from "../../services/AuthService";

const Signup = () => {
  const navigation = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      !!state.firstName &&
      !!state.lastName &&
      !!state.phoneNumber &&
      !!state.email &&
      !!state.password &&
      !!state.confirmPassword
    ) {
      const res: any = await SignupApi(state);
      if (res?.isSuccess) {
        if (res?.data.isLogin) {
          toast.success(res?.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
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
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <div className="flex justify-center">
        <form className="sm:w-1/3 bg-white border-2 rounded-md py-5 text-center mt-16 mb-8">
          <h1 className="text-2xl font-black border-b-2 inline-block border-gray-500 pb-1">
            Registration
          </h1>
          <div className="w-full px-10 mt-10">
            <p className="text-black text-lg font-semibold text-left pb-1 pt-4">
              Enter Firstname
            </p>
            <input
              className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
              value={state.firstName}
              type="text"
              name="firstName"
              onChange={(e) =>
                setState({
                  ...state,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full px-10 mt-3">
            <p className="text-black text-lg font-semibold text-left pb-1">
              Enter Lastname
            </p>
            <input
              className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
              value={state.lastName}
              type="text"
              name="lastName"
              onChange={(e) =>
                setState({
                  ...state,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full px-10 mt-3">
            <p className="text-black text-lg font-semibold text-left pb-1">
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
          <div className="w-full px-10 mt-3">
            <p className="text-black text-lg font-semibold text-left pb-1">
              Enter Mobile Number
            </p>
            <input
              className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
              value={state.phoneNumber}
              type="number"
              name="phoneNumber"
              onChange={(e) =>
                setState({
                  ...state,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="px-10 mt-3">
            <p className="text-black text-lg font-semibold text-left pb-1">
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
          <div className="px-10 mt-3">
            <p className="text-black text-lg font-semibold text-left pb-1">
              Confirm Password
            </p>
            <input
              className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
              value={state.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={(e) =>
                setState({
                  ...state,
                  confirmPassword: e.target.value,
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
              Sign Up
            </button>
          </div>
          <p>
            <Link
              className="text-sm hover:text-blue-500 font-bold"
              to={"/auth/login"}
            >
              Already have an account?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
