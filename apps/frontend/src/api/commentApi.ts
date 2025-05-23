import type { AxiosResponse } from "axios";

import { apiPrivate } from "@/lib/api/apiPrivate";
import { apiPublic } from "@/lib/api/apiPublic";

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
  const res = await apiPublic.get<ApiResponse<Comment[]>>(`/comment/${pinId}`);

  return res.data;
};

export const updateCommentApi = async (data: {
  commentId: string;
  commentText: string;
}) => {
  const res = await apiPrivate.patch<AxiosResponse<ApiResponse<Comment>>>(
    `/comment/${data.commentId}`,
    { comment: data.commentText }
  );

  return res.data;
};

export const deleteCommentApi = async (commentId: string) => {
  const res = await apiPrivate.delete<AxiosResponse<ApiResponse<Comment>>>(
    `/comment/${commentId}`
  );

  return res.data;
};
