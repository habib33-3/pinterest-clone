
import { useSearchParams } from "react-router";
import Gallery from "../../components/gallery/gallery";

const SearchPage = () => {

const [searchParams]=useSearchParams()

const search=searchParams.get("search")

  return <Gallery search={search} />;
};

export default SearchPage;
