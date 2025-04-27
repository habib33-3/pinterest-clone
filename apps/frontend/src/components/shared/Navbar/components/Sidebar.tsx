import { Link, useLocation } from "react-router";

import {
  BellIcon,
  HomeIcon,
  MessageCircle,
  PlusIcon,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

import logo from "@/assets/logo.png";

const sideMenu = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon size={24} />,
  },
  {
    name: "Create",
    path: "/create",
    icon: <PlusIcon size={24} />,
  },
  {
    name: "Update",
    path: "/update",
    icon: <BellIcon size={24} />,
  },
  {
    name: "Message",
    path: "/message",
    icon: <MessageCircle size={24} />,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="sticky top-0 flex h-screen w-20 flex-col items-center justify-between border-r border-solid border-neutral-200 bg-gray-100 px-4 py-6">
      <Link to={"/"}>
        <img
          src={logo}
          alt="Logo"
          className="mx-auto mb-6 size-12 object-contain object-center"
        />
      </Link>
      <ul className="flex flex-col items-center gap-6">
        {sideMenu.map((item) => (
          <li
            key={item.name}
            className={cn(
              pathname === item.path
                ? "bg-primary-foreground text-gray-50"
                : "text-gray-600",
              "group flex h-16 w-16 transform items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-gray-200"
            )}
          >
            <Link
              to={item.path}
              className="flex items-center justify-center text-gray-600 group-hover:text-primary"
            >
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to={"/setting"}
        className="group mt-auto flex h-16 w-16 transform items-center justify-center rounded-full text-gray-600 transition-transform group-hover:text-primary hover:scale-110 hover:bg-gray-200"
      >
        <Settings size={24} />
      </Link>
    </aside>
  );
};

export default Sidebar;
