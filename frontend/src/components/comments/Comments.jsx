import { useQuery } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";

import { apiRequest } from "../../utils/apiRequest";
import Image from "../Image/Image";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./comments.css";

const Comments = ({ id: postId }) => {
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

      <CommentForm />
    </div>
  );
};

export default Comments;
