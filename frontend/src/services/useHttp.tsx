import { emitAuthUnauthorized, isPublicAuthPath } from "@/utils/authSession";
import axios from "axios";

const useHttp = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

useHttp.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

useHttp.interceptors.response.use(
  function (response) {
    const token = response.data.token;
    if (token) {
      localStorage.setItem("access-token", token);
    }

    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("access-token");
      if (!isPublicAuthPath()) {
        emitAuthUnauthorized();
      }
    }

    return Promise.reject(error);
  }
);

export default useHttp;
