import { Skeleton } from "@/ui/skeleton";

import useGetAllComments from "../hooks/useGetAllComments";
import CommentBox from "./comments/Comment";
import CommentInput from "./comments/CommentInput";

const Comments = () => {
  const { comments, status } = useGetAllComments();

  if (status === "pending") {
    return <Skeleton />;
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-500">
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="flex-1 space-y-4 overflow-y-auto border-b border-gray-200 p-4">
        {comments.length === 0 && (
          <div className="text-center text-gray-500">
            No comments yet. Be the first one to comment!
          </div>
        )}

        {comments.map((comment) => (
          <CommentBox
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <CommentInput />
      </div>
    </div>
  );
};

export default Comments;
