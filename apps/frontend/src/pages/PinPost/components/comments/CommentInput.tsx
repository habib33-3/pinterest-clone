import { SendHorizontal } from "lucide-react";

import usePostComment from "@/hooks/comments/usePostComment";

import { useUserStore } from "@/stores/userStore";

import { Button } from "@/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/ui/form";
import { Textarea } from "@/ui/textarea";

const CommentInput = () => {
  const { user } = useUserStore();
  const { form, handlePostComment, isPosting } = usePostComment();

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePostComment)}>
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Textarea
                    id="comment"
                    placeholder="Add a comment..."
                    className="min-h-[60px] resize-none rounded-lg border border-none border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-none outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                    rows={2}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!user || isPosting}
              title={!user ? "Login to comment" : "Send"}
              className="rounded-full p-2 hover:bg-primary/90 disabled:opacity-50"
              type="submit"
            >
              <SendHorizontal size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentInput;
