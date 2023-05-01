import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";
import { setLogOut, setUserInfo } from "../../store/reducers/AuthuserSlice";
import { toast } from "react-toastify";
import { setHeadersToken } from "../../services/axiosConfig";
import { GetUserApi, UpdateUserInfoApi } from "../../services/AuthService";

const EditProfile = () => {
  const { userInfo, token } = useAppSelector((state) => state.authuser);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (userInfo) {
      setState({
        ...state,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
      });
    }
  }, [userInfo]);

  const handleSubmit = async () => {
    const res = await UpdateUserInfoApi(state, setHeadersToken(token));
    if (res?.isSuccess) {
      if (res?.data) {
        toast.success(res?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        const ress = await GetUserApi(setHeadersToken(token));
        if (ress?.isSuccess) {
          if (ress?.data) {
            dispatch(setUserInfo(ress.data));
          }
        } else {
          toast.error(ress?.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (ress?.data.isNotAuth) {
            dispatch(setLogOut());
          }
        }
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
  return (
    <div>
      <div className="w-1/2 px-10">
        <p className="text-black text-lg font-semibold text-left pb-1 pt-4">
          Firstname
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
      <div className="w-1/2 px-10 mt-3">
        <p className="text-black text-lg font-semibold text-left pb-1">
          Lastname
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
      <div className="w-1/2 px-10 mt-3">
        <p className="text-black text-lg font-semibold text-left pb-1">Email</p>
        <input
          className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
          value={state.email}
          type="email"
          name="email"
          disabled
          onChange={(e) =>
            setState({
              ...state,
              email: e.target.value,
            })
          }
        />
      </div>
      <div className="w-1/2 px-10 mt-3">
        <p className="text-black text-lg font-semibold text-left pb-1">
          Mobile Number
        </p>
        <input
          className="bg-gray-100 focus:bg-white border-2 w-full text-black border-gray-500 rounded-lg px-5 py-2"
          value={state.phoneNumber}
          type="number"
          name="phoneNumber"
          disabled
          onChange={(e) =>
            setState({
              ...state,
              phoneNumber: e.target.value,
            })
          }
        />
      </div>
      <div className="w-1/2 px-10 mt-3 flex justify-center">
        <button className="common-btn mt-6 mb-5 !px-10" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
