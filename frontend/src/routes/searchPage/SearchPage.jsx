import { useSearchParams } from "react-router";

import Gallery from "../../components/gallery/gallery";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const boardId = searchParams.get("boardId");

  return (
    <Gallery
      search={search}
      boardId={boardId}
    />
  );
};

export default SearchPage;
