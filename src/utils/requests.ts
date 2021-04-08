import { BINANCE_BACK_URL } from "./secrets";
import Axios from "axios";
import { Method } from "./types";

export const sendRequest = async (method: Method, url: string, payload?: { body?: object; params?: object }, headers?: any): Promise<any> => {
  const axios = Axios.create({
    baseURL: BINANCE_BACK_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await axios[method as string](url, payload);
  return response;
};

export const initRequest = async (key: string, secret: string): Promise<any> => {
  return sendRequest(Method.GET, "/init", { params: { key, secret } });
};

export const destroyRequest = async (token: string): Promise<any> => {
  return sendRequest(Method.DELETE, "/destroy", { params: { token } });
};

export const getAllTradinPairsRequest = async (token: string): Promise<any> => {
  return sendRequest(Method.GET, "/getAllTradingPairs", { params: { token } });
};

