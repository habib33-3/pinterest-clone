import { useMemo, useState } from "react";

import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import useDeleteComment from "@/hooks/comments/useDeleteComment";

import { useUserStore } from "@/stores/userStore";

import { calculateTimeAgo } from "@/lib/utils";

import type { Comment } from "@/types/index";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

import UpdateComment from "./UpdateComment";

type Props = {
  comment: Comment;
};

const CommentBox = ({ comment }: Props) => {
  const {
    comment: commentText,
    createdAt,
    user: { avatar, displayName, userName },
  } = comment;

  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { handleDeleteComment, isPending } = useDeleteComment(comment.id);

  const timeAgo = useMemo(() => calculateTimeAgo(createdAt), [createdAt]);

  if (isEditing) {
    return (
      <UpdateComment
        comment={comment}
        setIsEditing={setIsEditing}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-3">
          <Link
            to={`/profile/${userName}`}
            className="flex items-center gap-2"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={avatar}
                alt={displayName}
              />
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 hover:underline">
                {displayName}
              </span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>
          </Link>
        </div>

        <p className="ml-1 text-sm leading-relaxed text-gray-700">
          {commentText}
        </p>

        {user?.userName === userName && (
          <div className="mt-3 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(true);
              }}
              className="text-blue-500 hover:text-blue-600"
              title="Edit Comment"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={isPending}
              onClick={handleDeleteComment}
              className="text-red-500 hover:text-red-600"
              title="Delete Comment"
            >
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentBox;
