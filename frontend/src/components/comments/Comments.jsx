import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";

import { apiRequest } from "../../utils/apiRequest";
import Image from "../Image/Image";
import Comment from "./Comment";
import "./comments.css";

const Comments = ({ id: postId }) => {
  const [open, setOpen] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      apiRequest.get(`/comments/${postId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">
          {data.length === 0
            ? "No Comments"
            : data.length === 1
              ? "1 Comment"
              : `${data.length} Comments`}
        </span>
        {data.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
          />
        ))}
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
