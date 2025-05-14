import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { savePinInNewBoardApi } from "@/api/pinApi";

import type { ApiResponse } from "@/types/response";

import type { SavePinToNewBoardSchemaType } from "@/validations/pin";
import { savePinToNewBoardSchema } from "@/validations/pin";

const useSavePinToNewBoard = (pinId: string) => {
  const form = useForm<SavePinToNewBoardSchemaType>({
    resolver: zodResolver(savePinToNewBoardSchema),
    defaultValues: {
      boardTitle: "",
      isBoardPrivate: false,
    },
  });

  const mutate = useMutation({
    mutationFn: (data: SavePinToNewBoardSchemaType) =>
      savePinInNewBoardApi({
        pinId,
        board: data,
      }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  return {
    form,
    handleSavePinToNewForm: mutate.mutate,
    isPending: mutate.isPending,
  };
};

export default useSavePinToNewBoard;
