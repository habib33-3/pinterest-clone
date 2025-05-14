import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { savePinApi } from "@/api/pinApi";

import type { ApiResponse } from "@/types/response";

import type { SavePinSchemaType } from "@/validations/pin";
import { savePinSchema } from "@/validations/pin";

const useSavePin = (pinId: string) => {
  const form = useForm<SavePinSchemaType>({
    resolver: zodResolver(savePinSchema),
    defaultValues: {
      boardId: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["board", pinId],
    mutationFn: (boardId: string) => savePinApi(pinId, boardId),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  const handleSavePin = (data: SavePinSchemaType) => {
    if (data.boardId) {
      mutate(data.boardId);
    } else {
      toast.error("Please select a board.");
    }
  };

  return {
    form,
    handleSavePin,
    isLoading: isPending,
  };
};

export default useSavePin;
