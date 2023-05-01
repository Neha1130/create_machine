import axios from "axios";

export const getVirtualMachinePassword = async (payload: any, token: any) => {
  try {
    const { data } = await axios.post(`/machine-password`, payload, token);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};

export const getVirtualMachineInfo = async (id: string, token: any) => {
  try {
    const { data } = await axios.get(`/machine-info/${id}`, token);
    return { isSuccess: true, data: data };
  } catch (e: any) {
    if (e?.response) {
      return { isSuccess: false, data: e?.response.data };
    }
  }
};
