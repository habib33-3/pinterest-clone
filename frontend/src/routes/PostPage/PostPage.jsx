import { Link } from "react-router";

import Image from "../../components/Image/Image";
import Comments from "../../components/comments/Comments";
import PostInteraction from "../../components/postInteraction/PostInteraction";
import "./PostPage.css";

const PostPage = () => {
  return (
    <div className="postPage">
      <svg
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>

      <div className="postContainer">
        <div className="postImg">
          <Image
            path={"/pins/pin1.jpeg"}
            alt={""}
            w={736}
          />
        </div>
        <div className="postDetails">
          <PostInteraction />
          <Link
            to={"/john"}
            className="postUser"
          >
            <Image
              path={"/general/noAvatar.png"}
              alt={""}
            />
            <span>John</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
