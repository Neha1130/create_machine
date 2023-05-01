/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCookies, RemoveCookies } from "../../utils/Cookies";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  phoneNumber:string;
};
type AuthType = {
  token?: string | undefined | null;
  isNavigate?: boolean;
  userInfo?: UserInfo;
};

const initialState: AuthType = {
  token: GetCookies("token"),
  isNavigate: false,
  userInfo: undefined,
};

export const AuthuserSlice = createSlice({
  name: "authuser",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthType>) => {
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      RemoveCookies("token");
      state.token = null;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      return {
        ...state,
        userInfo: {
          firstName: action.payload?.firstName,
          lastName: action.payload?.lastName,
          id: action.payload?.id,
          email: action.payload?.email,
          phoneNumber:action.payload?.phoneNumber,
        },
      };
    },
  },
});

export const { setToken, setLogOut, setUserInfo } = AuthuserSlice.actions;

export default AuthuserSlice.reducer;
