import axios from "axios";
export const LoginApi = async (payload: any) => {
  try {
    const { data } = await axios.post("/auth/login", payload);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const VerificationApi = async (payload: any) => {
  try {
    const { data } = await axios.get(`/auth/verification/${payload}`);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const SignupApi = async (payload: any) => {
  try {
    const { data } = await axios.post("/auth/singup", payload);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const GetUserApi = async (payload: any) => {
  try {
    const { data } = await axios.get("/userInfo", payload);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const UpdateUserInfoApi = async (payload: any, token: any) => {
  try {
    const { data } = await axios.post("/update-userInfo", payload, token);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};
