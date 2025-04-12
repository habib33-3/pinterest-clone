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

  console.log(data);

  return (
    <div className="collections">
      {data.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image
            src={board.firstPin.media}
            alt=""
          />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} pins . {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
