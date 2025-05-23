import { useParams } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateCommentApi } from "@/api/commentApi";

import type { Comment } from "@/types/index";
import type { ApiResponse } from "@/types/response";

import {
  type UpdateCommentInputType,
  updateCommentInputSchema,
} from "@/validations/comments";

const useUpdateComment = (comment: Comment) => {
  const form = useForm<UpdateCommentInputType>({
    resolver: zodResolver(updateCommentInputSchema),
    defaultValues: {
      commentText: comment.comment,
    },
  });

  const { id: pinId } = useParams();

  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateCommentInputType) =>
      updateCommentApi({
        commentId: comment.id,
        commentText: data.commentText,
      }),

    onSuccess: () => {
      toast.success("Comment updated successfully");
      void query.invalidateQueries({
        queryKey: ["comments", pinId],
      });
      form.reset();
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Failed to update comment");
    },
  });

  const onSubmit = (data: UpdateCommentInputType) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isUpdating: mutation.isPending || form.formState.isSubmitting,
  };
};

export default useUpdateComment;
