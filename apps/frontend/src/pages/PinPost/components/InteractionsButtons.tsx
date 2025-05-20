import { MessageCircle } from "lucide-react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

import ShareMoreButtons from "@/buttons/ShareMoreButtons";

import useGetPinsLikeCount from "../../../hooks/pin/useGetPinsLikeCount";
import useLikePin from "../../../hooks/pin/useLikePin";

type PinsLikeCount = {
  count: number;
  isLiked: boolean;
};

const InteractionsButtons = () => {
  const { data, status } = useGetPinsLikeCount();
  const { isLiking, likePin } = useLikePin();

  if (status === "pending") {
    return (
      <div className="p-2">
        <Skeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-2 text-red-500">
        Error loading likes. Please try again later.
      </div>
    );
  }

  const { count, isLiked } = data as PinsLikeCount;

  return (
    <div className="p-2">
      <div className="flex items-center justify-start gap-3">
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => {
              likePin();
            }}
            disabled={isLiking}
            className="group/like flex items-center justify-center rounded-full bg-gray-100 p-2 transition-all duration-300 hover:bg-gray-200"
            variant="ghost"
            size="icon"
            aria-label="Like"
            title="Like"
          >
            <span
              className={cn(
                "transition-transform duration-300 group-hover/like:scale-110",
                isLiked ? "text-red-500" : "text-gray-800",
                isLiking && "animate-pop"
              )}
            >
              {isLiked ? (
                <IoIosHeart className="size-6" />
              ) : (
                <IoIosHeartEmpty className="size-6" />
              )}
            </span>
          </Button>
          <p>{count}</p>
        </div>

        <a href="#comment">
          <Button
            className="group/comment flex items-center justify-center rounded-full bg-gray-100 p-2 transition-all duration-300 hover:bg-gray-200"
            variant="ghost"
            size="icon"
            aria-label="Comment"
            title="Comment"
          >
            <MessageCircle className="size-6 text-gray-800 transition-transform duration-300 group-hover/comment:scale-110" />
          </Button>
        </a>

        <ShareMoreButtons />
      </div>
    </div>
  );
};

export default InteractionsButtons;
