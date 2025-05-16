import { useParams } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { postCommentApi } from "@/api/commentApi";

import type { PostCommentsInputType } from "@/validations/comments";
import { postCommentsInputSchema } from "@/validations/comments";

const usePostComment = () => {
  const { id: pinId } = useParams();

  const form = useForm<PostCommentsInputType>({
    resolver: zodResolver(postCommentsInputSchema),
    defaultValues: { comment: "" },
  });

  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { comment: string; pinId: string }) =>
      postCommentApi(data),
    mutationKey: ["comment", pinId],
    onSuccess: () => {
      form.reset();
      void query.invalidateQueries({ queryKey: ["comments", pinId] });
      toast.success("Comment posted successfully");
    },
    onError: () => {
      toast.error("Failed to post comment");
    },
  });

  const handlePostComment = (data: PostCommentsInputType) => {
    mutation.mutate({
      comment: data.comment,
      pinId: pinId as string,
    });
  };

  return {
    form,
    handlePostComment,
    isPosting: mutation.status === "pending",
  };
};

export default usePostComment;
