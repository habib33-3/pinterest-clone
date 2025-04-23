import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { format } from "timeago.js";

import { apiRequest } from "../../utils/apiRequest";
import Image from "../Image/Image";
import "./boards.css";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["board", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full grid grid-cols-7 gap-16">
      {data.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className=" mb-8 cursor-pointer"
          key={board._id}
        >
          <Image
            className={"w-full object-cover rounded-2xl "}
            src={board.firstPin.media}
            alt=""
          />
          <div className=" flex flex-col gap-2">
            <h1 className="font-medium text-base">{board.title}</h1>
            <span className="text-gray-500 text-sm">
              {board.pinCount} pins . {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
