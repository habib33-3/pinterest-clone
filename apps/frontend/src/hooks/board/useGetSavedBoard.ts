import { useQuery } from "@tanstack/react-query";

import { getSavedBoardApi } from "@/api/boardApi";

import { GC_TIME, STALE_TIME } from "@/constants/index";

const useGetSavedBoard = (pinId: string) => {
  const { data, status } = useQuery({
    queryKey: ["save-pin", pinId],
    queryFn: () => getSavedBoardApi(pinId),
    enabled: Boolean(pinId),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

  return { board: data?.data, status };
};

export default useGetSavedBoard;
