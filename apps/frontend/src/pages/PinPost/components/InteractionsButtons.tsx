import { MessageCircle } from "lucide-react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

import ShareMoreButtons from "@/buttons/ShareMoreButtons";

import useGetPinsLikeCount from "../hooks/useGetPinsLikeCount";
import useLikePin from "../hooks/useLikePin";

const InteractionsButtons = () => {
  const { data, status } = useGetPinsLikeCount();
  const { isLiking, likePin } = useLikePin();

  if (status === "pending") return <Skeleton />;

  if (status === "error") return <div>Error</div>;

  const { count, isLiked } = data;

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <div className="flex items-center justify-center gap-2">
          {" "}
          <Button
            onClick={() => {
              likePin();
            }}
            className="group/like flex items-center justify-center rounded-full bg-gray-100 p-2 transition-all duration-300 hover:bg-gray-200"
            variant="ghost"
            size="icon"
            aria-label="Like"
          >
            <span
              className={cn(
                "text-red-500 transition-transform duration-300 group-hover/like:scale-110",
                isLiking && "animate-pop"
              )}
            >
              {isLiked ? (
                <IoIosHeart className="size-6" />
              ) : (
                <IoIosHeartEmpty className="size-6 text-gray-800" />
              )}
            </span>
          </Button>
          <p>{count}</p>
        </div>

        <Button
          className="group/comment flex items-center justify-center rounded-full bg-gray-100 p-2 transition-all duration-300 hover:bg-gray-200"
          variant="ghost"
          size="icon"
          aria-label="Comment"
        >
          <MessageCircle className="size-6 text-gray-800 transition-transform duration-300 group-hover/comment:scale-110" />
        </Button>

        <ShareMoreButtons />
      </div>
    </div>
  );
};

export default InteractionsButtons;
