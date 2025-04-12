import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import GalleryItem from "../galleryItem/GalleryItem";
import "./gallery.css";

const Gallery = () => {
  const fetchPins = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pins`);

    return res.data;
  };

  const {
    isPending,
    isError,
    data: items,
  } = useQuery({
    queryKey: ["pins"],
    queryFn: fetchPins,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="gallery">
      {items.map((item) => (
        <GalleryItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  );
};

export default Gallery;
