import { useState } from "react";

import EmojiPicker from "emoji-picker-react";

import { apiRequest } from "../../utils/apiRequest";

const CommentForm = ({ pinId }) => {
  const [open, setOpen] = useState(false);

  const [desc, setDesc] = useState("");

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      description: desc,
      pinId: pinId,
    };

    const res = await apiRequest.post("/comments", data);

    if (res.status === 201) {
      setDesc("");
    }
  };

  return (
    <form
      className="commentForm"
      onSubmit={handleSubmit}
    >
      <input
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
