import type { Comment } from "@/types/index";

type Props = {
  comment: Comment;
};

const CommentBox = ({ comment }: Props) => {
  const {
    comment: commentText,
    user: { avatar, displayName },
  } = comment;

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <img
          src={avatar}
          alt={`${displayName}'s avatar`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <h5 className="text-sm font-medium text-gray-800">{displayName}</h5>
      </div>
      <p className="ml-2 text-sm leading-relaxed text-gray-700">
        {commentText}
      </p>
    </div>
  );
};

export default CommentBox;
