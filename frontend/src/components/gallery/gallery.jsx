import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import GalleryItem from "../galleryItem/GalleryItem";
import "./gallery.css";

const Gallery = ({ search, userId, boardId }) => {
  const fetchPins = async ({ pageParam, search }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/pins?cursor=${pageParam}&search=${search || ""}&userId=${userId}&boardId=${boardId}`
    );
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins", search, userId],
    queryFn: ({ pageParam = 0 }) => fetchPins({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  const allPins = data.pages.flatMap((page) => page.pins) || [];

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={<p>Yay! You have seen it all</p>}
    >
      <div className="gallery">
        {allPins.map((item) => (
          <GalleryItem
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
