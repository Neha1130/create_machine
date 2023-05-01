import axios from "axios";

export const GetEmailReminderAlert = async (token: any) => {
  try {
    const { data } = await axios.get("/machine/email-reminder", token);
    return { isSuccess: true, data: data.data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const SetEmailReminderAlert = async (payload: any, token: any) => {
  try {
    const { data } = await axios.post(
      "/machine/set-email-reminder",
      payload,
      token
    );
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};
