import type { AxiosResponse } from "axios";

import { apiPrivate } from "@/lib/api/apiPrivate";

import type { ApiAxiosResponse, ApiResponse } from "@/types/response";

export const likePinApi = async (pinId: string) => {
  const res = await apiPrivate.post<ApiAxiosResponse<{ message: string }>>(
    `/like/pin/${pinId}`
  );

  return res.data;
};

export const getPinsCountApi = async (pinId: string) => {
  const res = await apiPrivate.get<
    AxiosResponse<ApiResponse<{ isLiked: boolean; count: number }>>
  >(`/like/pin/${pinId}`);

  return res.data;
};
