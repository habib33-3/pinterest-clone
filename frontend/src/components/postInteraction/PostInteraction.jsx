import Image from "../Image/Image";
import "./postInteraction.css";

const PostInteraction = () => {
  return (
    <div className="postInteraction">
      <div className="interactionIcons">
        <Image
          path="/general/react.svg"
          alt=""
        />
        273
        <Image
          path="/general/share.svg"
          alt=""
        />
        <Image
          path={"/general/more.svg"}
          alt={""}
        />
      </div>
    </div>
  );
};

export default PostInteraction;
