import { useState } from "react";

import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import useDeleteComment from "@/hooks/comments/useDeleteComment";

import { useUserStore } from "@/stores/userStore";

import type { Comment } from "@/types/index";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

import UpdateComment from "./UpdateComment";

type Props = {
  comment: Comment;
};

const CommentBox = ({ comment }: Props) => {
  const {
    comment: commentText,
    user: { avatar, displayName, userName },
  } = comment;

  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUserStore();

  const { handleDeleteComment, isPending } = useDeleteComment(comment.id);

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
        <div className="mb-3 flex items-center gap-3">
          <Link
            to={`/profile/${userName}`}
            className="flex items-center gap-2"
          >
            <Avatar>
              <AvatarImage
                src={avatar}
                alt={displayName}
              />
              <AvatarFallback>
                {displayName && displayName.length > 0
                  ? displayName[0].toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-800 hover:underline">
              {displayName}
            </span>
          </Link>
        </div>

        <p className="ml-1 text-sm leading-relaxed text-gray-700">
          {commentText}
        </p>

        {user?.userName && userName && user.userName === userName ? (
          <div className="mt-3 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={isPending}
              className="text-red-500 hover:text-red-600"
              onClick={() => {
                handleDeleteComment();
              }}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CommentBox;
