import { useState } from "react";

import EmojiPicker from "emoji-picker-react";

import Image from "../Image/Image";
import "./comments.css";

const Comments = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">5 Comments</span>
        <div className="comment">
          <Image
            path={"/general/noAvatar.png"}
            alt=""
          />
          <div className="commentContent">
            <div className="commentUsername">John Doe</div>
            <p className="commentText">
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              nesciunt.
            </p>
            <span className="commentTime">1h ago</span>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Comments;
