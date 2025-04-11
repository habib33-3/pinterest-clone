import Image from "../Image/Image";
import UserButton from "../userButton/UserButton";
import "./topBar.css";

const TopBar = () => {
  return (
    <div className="topBar">
      {/* Search */}
      <div className="search">
        <Image
          path="/general/search.svg"
          alt=""
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
        />
      </div>
      {/* User */}
      <UserButton />
    </div>
  );
};

export default TopBar;
