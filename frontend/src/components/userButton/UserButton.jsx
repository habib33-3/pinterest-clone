import { useState } from "react";

import { Link, useNavigate } from "react-router";

import { apiRequest } from "../../utils/apiRequest";
import { useAuthStore } from "../../utils/store";
import Image from "../Image/Image";
import "./userButton.css";

const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/user/auth/logout");

      removeCurrentUser();

      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    return (
      <div className="userButton">
        <Image
          src={currentUser.img || "/general/noAvatar.png"}
          alt="User Avatar"
        />
        <div
          className=""
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
        >
          <Image
            path="/general/arrow.svg"
            alt="Dropdown Arrow"
          />
        </div>
        {isOpen && (
          <div className="userOptions">
            <Link
              to={`/profile/${currentUser.username}`}
              className="userOption"
            >
              Profile
            </Link>
            <div className="userOption">Settings</div>
            <div
              onClick={handleLogout}
              className="userOption"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to="/auth"
      className="loginLink"
    >
      Login / Sign Up
    </Link>
  );
};

export default UserButton;
