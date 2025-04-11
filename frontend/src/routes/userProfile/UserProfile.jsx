import { useState } from "react";

import Image from "../../components/Image/Image";
import Collections from "../../components/collections/Collections";
import Gallery from "../../components/gallery/gallery";
import "./userProfile.css";

const UserProfile = () => {
  const [type, setType] = useState("saved");

  return (
    <div className="profilePage">
      <Image
        path={"/general/noAvatar.png"}
        alt={""}
        w={100}
        h={100}
      />

      <h1 className="profileName">John Doe</h1>

      <span className="profileUsername">@johndoe</span>

      <div className="followCounts">10 followers . 10 following</div>
      <div className="profileInteractions">
        <Image
          path={"/general/share.svg"}
          alt={""}
        />

        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>

        <Image
          path={"/general/more.svg"}
          alt={""}
        />
      </div>

      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>

      {type === "created" ? <Gallery /> : <Collections />}
    </div>
  );
};

export default UserProfile;
