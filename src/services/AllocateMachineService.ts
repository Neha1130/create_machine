import axios from "axios";

export const VMGetApi = async (token: any) => {
  try {
    const { data } = await axios.get("/allocate/machine/", token);
    return { isSuccess: true, data: data.data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const VMCreateApi = async (payload: any, token: any) => {
  try {
    const { data } = await axios.post(
      "/allocate/machine/create",
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

export const VMUpdateApi = async (id: string, payload: any, token: any) => {
  try {
    const { data } = await axios.put(
      `/allocate/machine/update/${id}`,
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

export const VMDeleteApi = async (id: string, token: any) => {
  try {
    const { data } = await axios.delete(
      `/allocate/machine/delete/${id}`,
      token
    );
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const VMStartStopApi = async (id: string, payload: any, token: any) => {
  try {
    const { data } = await axios.put(
      `/allocate/machine/start-stop/${id}`,
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
