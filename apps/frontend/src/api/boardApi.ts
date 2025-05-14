import { apiPrivate } from "@/lib/api/apiPrivate";

import type { ApiResponse } from "@/types/response";

import type { Board } from "../types";

export const getAllBoardApi = async () => {
  const res = await apiPrivate.get<ApiResponse<Board[]>>("/board");

  return res.data;
};
