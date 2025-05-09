import { Link } from "react-router";

import { MoveUpRight } from "lucide-react";

import type { Pin } from "@/types/index";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";

import ShareMoreButtons from "@/buttons/ShareMoreButtons";

type Props = {
  pin: Pin;
};

const PinCard = ({ pin }: Props) => {
  const { media, link, id } = pin;

  return (
    <Link to={`/pin/${id}`}>
      <div className="group mb-4 cursor-pointer break-inside-avoid rounded-2xl border-1">
        <Card className="relative overflow-hidden rounded-lg shadow">
          <img
            src={media}
            alt={pin.title}
            className="block h-auto w-full object-contain"
          />
          <div className="absolute bottom-4 left-6 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center justify-between px-2">
              {link ? (
                <Link
                  to={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="flex items-center gap-2 border-2 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-secondary/80 hover:shadow-xl"
                    variant="secondary"
                  >
                    <MoveUpRight className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <p className="text-sm font-semibold">Visit Website</p>
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>

          <ShareMoreButtons className="absolute right-4 bottom-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Card>
      </div>
    </Link>
  );
};

export default PinCard;
