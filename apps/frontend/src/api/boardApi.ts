import { apiPrivate } from "@/lib/api/apiPrivate";

import type { ApiResponse } from "@/types/response";

import type { Board } from "../types";

export const getAllBoardApi = async (searchQuery?: string) => {
  const url = searchQuery
    ? `/board?searchQuery=${encodeURIComponent(searchQuery)}`
    : "/board";

  const res = await apiPrivate.get<ApiResponse<Board[]>>(url);

  return res.data;
};
