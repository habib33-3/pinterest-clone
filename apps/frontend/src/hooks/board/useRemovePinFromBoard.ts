import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { removePinFromBoardApi } from "@/api/boardApi";

import type { ApiResponse } from "@/types/response";

const useRemovePinFromBoard = (pinId: string, boardId: string) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: () => removePinFromBoardApi(boardId, pinId),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["save-pin", pinId] });

      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  const handleRemovePinFromBoard = () => {
    mutate.mutate();
  };

  return {
    handleRemovePinFromBoard,
    isPending: mutate.isPending,
  };
};

export default useRemovePinFromBoard;
