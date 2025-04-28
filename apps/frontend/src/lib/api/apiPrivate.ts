import axios, { type AxiosError } from "axios";

import { useUserStore } from "@/stores/userStore";

export const apiPrivate = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      useUserStore.getState().clearUser();
    }

    return Promise.reject(error);
  }
);
