import { Ellipsis, Share } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";

type Props = {
  className?: string;
};

const ShareMoreButtons = ({ className }: Props) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="ghost"
        className="group/share flex items-center justify-center rounded-full bg-gray-100 p-2 transition-all duration-300 hover:bg-gray-200"
        aria-label="Share"
      >
        <Share className="size-6 text-gray-800 transition-transform duration-300 group-hover/share:-translate-y-1 group-hover/share:text-blue-600" />
      </Button>
      <Button
        variant="ghost"
        className="group/more flex items-center justify-center rounded-full bg-gray-100 p-2 transition-all duration-300 hover:bg-gray-200"
        aria-label="More options"
        title="More"
      >
        <Ellipsis className="size-6 text-gray-800 transition-transform duration-300 group-hover/more:-translate-y-1 group-hover/more:text-blue-600" />
      </Button>
    </div>
  );
};

export default ShareMoreButtons;
