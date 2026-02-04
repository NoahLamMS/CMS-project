import axios from "axios";
import queryString from "query-string";
import { ENV } from "../constants/env";

const baseURL = ENV.END_POINT;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config: any) => {
  const access_token = '';
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...config.headers,
  };

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return Promise.reject(response.data);
  },

  (error) => {
    const { response } = error;

    if (response?.status === 401) {

      /**
       * @update
       * re-direct login
       * handle refresh token
       */
      window.location.href = '/login';

      return Promise.reject(response.data);
    }
    return Promise.reject(response?.data || error);
  }
);

export default axiosClient;