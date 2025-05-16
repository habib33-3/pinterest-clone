import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { savePinApi } from "@/api/pinApi";

import type { ApiResponse } from "@/types/response";

const useSavePin = ({ pinId }: { pinId: string }) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["save-pin", pinId],
    mutationFn: (boardId: string) => savePinApi(pinId, boardId),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["save-pin", pinId] });

      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  return { handleSavePin: mutate.mutate, isPending: mutate.isPending };
};

export default useSavePin;
