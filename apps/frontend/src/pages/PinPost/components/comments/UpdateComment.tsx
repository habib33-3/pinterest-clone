import type { Dispatch, SetStateAction } from "react";

import useUpdateComment from "@/hooks/comments/useUpdateComment";

import type { Comment } from "@/types/index";

import type { UpdateCommentInputType } from "@/validations/comments";

import { Button } from "@/ui/button";
import { Form, FormField } from "@/ui/form";
import { Textarea } from "@/ui/textarea";

type Props = {
  comment: Comment;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const UpdateComment = ({ comment, setIsEditing }: Props) => {
  const { comment: commentText } = comment;

  const { form, onSubmit, isUpdating } = useUpdateComment(comment);

  const handleUpdateComment = (data: UpdateCommentInputType) => {
    try {
      onSubmit(data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateComment)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="commentText"
            defaultValue={commentText}
            render={({ field }) => (
              <Textarea
                {...field}
                autoFocus
                id="commentText"
                disabled={isUpdating}
                className="min-h-[60px] resize-none rounded-lg bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white"
                rows={3}
              />
            )}
          />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="submit"
              disabled={isUpdating}
              className="mt-2"
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
              variant="outline"
              className="mt-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateComment;
