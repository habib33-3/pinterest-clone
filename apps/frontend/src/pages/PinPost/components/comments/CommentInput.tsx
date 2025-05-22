import { useState } from "react";

import type { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { SendHorizontal, Smile } from "lucide-react";

import usePostComment from "@/hooks/comments/usePostComment";

import { useUserStore } from "@/stores/userStore";

import { Button } from "@/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/ui/form";
import { Textarea } from "@/ui/textarea";

const CommentInput = () => {
  const { user } = useUserStore();
  const { form, handlePostComment, isPosting } = usePostComment();
  const [emojiOpen, setEmojiOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const current = form.getValues("comment") || "";
    form.setValue("comment", current + emojiData.emoji);
    setEmojiOpen(false);
  };

  return (
    <div className="relative rounded-xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePostComment)}
          className="space-y-2"
        >
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="relative">
                    <Textarea
                      id="comment"
                      placeholder="Add a comment..."
                      className="min-h-[60px] resize-none rounded-lg bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 dark:bg-gray-900 dark:text-white"
                      rows={2}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setEmojiOpen((prev) => !prev);
                      }}
                    >
                      <Smile
                        size={20}
                        className="text-gray-500"
                      />
                    </Button>
                  </div>
                  {emojiOpen ? (
                    <div className="absolute top-[100%] right-2 z-50 mt-2">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        lazyLoadEmojis
                      />
                    </div>
                  ) : null}
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
