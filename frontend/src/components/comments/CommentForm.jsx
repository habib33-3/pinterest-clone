import { useState } from "react";

import EmojiPicker from "emoji-picker-react";

const CommentForm = () => {
  const [open, setOpen] = useState(false);

  

  return (
    <form className="commentForm">
      <input
        type="text"
        placeholder="Add a comment"
        name="comment"
        id="comment"
      />
      <div
        onClick={() => setOpen(!open)}
        className="emoji"
      >
        😊
      </div>
      {open && (
        <div className="emojiPicker">
          <EmojiPicker />
        </div>
      )}
    </form>
  );
};

export default CommentForm;
