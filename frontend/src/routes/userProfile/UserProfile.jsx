import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import Image from "../../components/Image/Image";
import Boards from "../../components/boards/boards";
import Gallery from "../../components/gallery/gallery";
import { apiRequest } from "../../utils/apiRequest";
import "./userProfile.css";

const UserProfile = () => {
  const [type, setType] = useState("saved");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", username],
    queryFn: () => apiRequest.get(`/user/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";

  return (
    <div className="profilePage">
      <Image
        src={data.img || "/general/noAvatar.png"}
        alt={""}
        w={100}
        h={100}
      />

      <h1 className="profileName">{data.displayName}</h1>

      <span className="profileUsername">{data.username}</span>

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

      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default UserProfile;
