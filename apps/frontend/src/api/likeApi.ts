import { apiPrivate } from "@/lib/api/apiPrivate";
import { apiPublic } from "@/lib/api/apiPublic";

import type { ApiAxiosResponse, ApiResponse } from "@/types/response";

export const likePinApi = async (pinId: string) => {
  const res = await apiPrivate.post<ApiAxiosResponse<{ message: string }>>(
    `/like/pin/${pinId}`
  );

  return res.data;
};

export const getPinsCountApi = async (pinId: string) => {
  const res = await apiPublic.get<
    ApiResponse<{ count: number; isLiked: boolean }>
  >(`/like/pin/${pinId}`);

  return res.data;
};
