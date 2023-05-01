import axios from "axios";
import { io } from "socket.io-client";

const url = process.env.REACT_APP_BASE_URL_SOCKET;
export const socket = io(url ?? "");

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const setHeadersToken = (token: string | null | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
