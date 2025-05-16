import { useQuery } from "@tanstack/react-query";

import { getSavedBoardApi } from "@/api/boardApi";

const useGetSavedBoard = (pinId: string) => {
  const { data, status } = useQuery({
    queryKey: ["save-pin", pinId],
    queryFn: () => getSavedBoardApi(pinId),
  });

  return { board: data?.data, status };
};

export default useGetSavedBoard;
