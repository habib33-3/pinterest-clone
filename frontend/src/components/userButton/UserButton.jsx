import { useState } from "react";

import Image from "../Image/Image";
import "./userButton.css";

const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = true;

  if (currentUser) {
    return (
      <div className="userButton">
        <img
          src="/general/noAvatar.png"
          alt="User Avatar"
        />
        <Image
          onClick={() => setIsOpen(!isOpen)}
          path="/general/arrow.svg"
          alt="Dropdown Arrow"
        />
        {isOpen && (
          <div className="userOptions">
            <div className="userOption">Profile</div>
            <div className="userOption">Settings</div>
            <div className="userOption">Logout</div>
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
