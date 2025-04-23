import { format } from "timeago.js";

import Image from "../image/image";

const Comment = ({ comment }) => {
  return (
    <div className=" flex gap-4">
      <Image
        src={comment.user.img || "/general/noAvatar.png"}
        alt=""
      />
      <div className=" flex flex-col gap-1">
        <span className=" font-medium text-sm">{comment.user.displayName}</span>
        <p className=" text-sm ">{comment.description}</p>
        <span className=" text-xs text-neutral-400">
          {format(comment.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
