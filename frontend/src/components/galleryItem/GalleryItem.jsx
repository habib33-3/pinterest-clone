import { Link } from "react-router";

import "./galleryItem.css";

const GalleryItem = ({ item }) => {
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <img
        src={item.media}
        alt=""
      />
      <Link
        to={`/pin/${item.id}`}
        className="overlay"
      />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <img
            src="/general/share.svg"
            alt=""
          />
        </button>
        <button>
          <img
            src="/general/share.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
