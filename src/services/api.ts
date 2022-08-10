import axios, { AxiosResponse } from "axios";

interface Api {
  [key: string]: () => Promise<AxiosResponse>;
}

const BASE_URL: string = "https://randomuser.me";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const getUser = () => api.get("/api");

const API: Api = {
  getUser,
};

export default API;
