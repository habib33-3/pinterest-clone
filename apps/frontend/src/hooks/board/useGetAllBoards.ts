import { useQuery } from "@tanstack/react-query";

import { getAllBoardApi } from "@/api/boardApi";

import type { Board } from "@/types/index";
import type { ApiResponse } from "@/types/response";

const useGetAllBoards = (searchQuery?: string) => {
  const { data, status } = useQuery<ApiResponse<Board[]>>({
    queryKey: ["boards", searchQuery],
    queryFn: () => getAllBoardApi(searchQuery),
  });

  return { boards: data?.data ?? [], status };
};

export default useGetAllBoards;
