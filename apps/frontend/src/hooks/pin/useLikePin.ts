import { useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { likePinApi } from "@/api/likeApi";

const useLikePin = () => {
  const { id: pinId } = useParams();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!pinId) throw new Error("Missing pinId");
      return likePinApi(pinId);
    },
    mutationKey: ["like", pinId],
    onSuccess: (data) => {
      if (pinId) {
        void queryClient.invalidateQueries({ queryKey: ["like", pinId] });
      }
      toast.success(data.data.message);
    },
    onError: () => {
      toast.error("Failed to like pin");
    },
  });

  return {
    likePin: mutation.mutate,
    isLiking: mutation.status === "pending",
  };
};

export default useLikePin;
