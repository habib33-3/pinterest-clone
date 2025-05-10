import type { AxiosResponse } from "axios";

import { apiPrivate } from "@/lib/api/apiPrivate";

import type { ApiResponse } from "@/types/response";

import type { Comment } from "../types";

export const postCommentApi = async (data: {
  comment: string;
  pinId: string;
}) => {
  const res = await apiPrivate.post<AxiosResponse<ApiResponse<Comment>>>(
    "/comment",
    data
  );

  return res.data;
};

export const getAllCommentsApi = async (pinId: string) => {
  const res = await apiPrivate.get<ApiResponse<Comment[]>>(`/comment/${pinId}`);

  return res.data;
};
