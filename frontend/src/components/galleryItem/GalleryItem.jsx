import { Link } from "react-router";

import Image from "../Image/Image";
import "./galleryItem.css";

const GalleryItem = ({ item }) => {
  const optimizedHeight = 372 * item.height * item.width;

  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image
        alt={""}
        className={""}
        h={optimizedHeight}
        src={item.media}
        w={372}
      />
      <Link
        to={`/pin/${item._id}`}
        className="overlay"
      />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Image
            path="/general/share.svg"
            alt=""
          />
        </button>
        <button>
          <Image
            path="/general/more.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
