import { useQuery } from "@tanstack/react-query";

import { getAllBoardApi } from "@/api/boardApi";

import type { Board } from "@/types/index";
import type { ApiResponse } from "@/types/response";

const useGetAllBoards = () => {
  const { data, status } = useQuery<ApiResponse<Board[]>>({
    queryKey: ["boards"],
    queryFn: getAllBoardApi,
  });

  return { boards: data?.data ?? [], status };
};

export default useGetAllBoards;
