import axios, { type AxiosError } from "axios";

import { env } from "@/config/env.config";

import { useUserStore } from "@/stores/userStore";

export const apiPrivate = axios.create({
  baseURL: env.VITE_BACKEND_API_URL,
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
