import type { AxiosResponse } from "axios";

type Meta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<T> = {
  statusCode?: number;
  success?: boolean;
  message?: string | null;
  meta?: Meta;
  data?: T | null;
};

export type ApiAxiosResponse<T> = AxiosResponse<ApiResponse<T>>;
