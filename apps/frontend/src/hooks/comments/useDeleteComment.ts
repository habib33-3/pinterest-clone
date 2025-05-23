import { useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { deleteCommentApi } from "@/api/commentApi";

import type { ApiResponse } from "@/types/response";

const useDeleteComment = (commentId: string) => {
  const { id: pinId } = useParams();

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: () => deleteCommentApi(commentId),
    onSuccess: () => {
      void query.invalidateQueries({
        queryKey: ["comments", pinId],
      });

      toast.success("Comment deleted successfully");
    },

    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Failed to delete comment");
    },
  });

  const handleDeleteComment = () => {
    mutate.mutate();
  };

  return {
    handleDeleteComment,
    isPending: mutate.isPending,
  };
};

export default useDeleteComment;
