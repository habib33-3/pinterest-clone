import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";

import { apiRequest } from "../../utils/apiRequest";

const CommentForm = ({ pinId }) => {
  const [open, setOpen] = useState(false);

  const [desc, setDesc] = useState("");

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const addComment = async () => {
    const res = await apiRequest.post("/comments", {
      description: desc,
      pinId: pinId,
    });

    console.log(res);

    return res.data;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", pinId]);

      setDesc("");
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <form
      className="commentForm bg-neutral-100 p-4 rounded-4xl flex align-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 border-none outline-none bg-transparent text-base"
        type="text"
        placeholder="Add a comment"
        name="comment"
        id="comment"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <div
        onClick={() => setOpen(!open)}
        className="emoji"
      >
        😊
      </div>
      {open && (
        <div className="emojiPicker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
};

export default CommentForm;
