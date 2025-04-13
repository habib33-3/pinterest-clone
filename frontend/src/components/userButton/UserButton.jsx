import { useState } from "react";

import { apiRequest } from "../../utils/apiRequest";
import Image from "../Image/Image";
import "./userButton.css";
import { useNavigate } from "react-router";

const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/user/auth/logout");

      navigate("/auth");

    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = true;

  if (currentUser) {
    return (
      <div className="userButton">
        <img
          src="/general/noAvatar.png"
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
            <div className="userOption">Profile</div>
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
    <a
      href="/"
      className="loginLink"
    >
      Login / Sign Up
    </a>
  );
};

export default UserButton;
