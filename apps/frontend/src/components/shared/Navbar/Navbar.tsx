import Avatar from "./components/Avatar";
import SearchBar from "./components/SearchBar";

const Navbar = () => {
  return (
    <nav className="mx-auto my-4 flex max-w-7xl items-center justify-between gap-4 px-2">
      <SearchBar />

      <Avatar />
    </nav>
  );
};

export default Navbar;
