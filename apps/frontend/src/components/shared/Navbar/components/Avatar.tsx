import { Link } from "react-router";

import { AxiosError } from "axios";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useUserStore } from "@/stores/userStore";

import { logoutApi } from "@/api/userApi";

const Avatar = () => {
  const { user, clearUser } = useUserStore();

  if (!user) {
    return (
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  const handleLogout = async () => {
    try {
      await logoutApi();

      clearUser();

      toast.success("Logout successful.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof AxiosError) {
        const errorMessage = (error.response?.data as { message?: string })
          .message;

        toast.error(errorMessage ?? "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={user.avatar}
          alt=""
          className="size-10 cursor-pointer rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent className="mx-2 w-36">
        <ul className="flex flex-col items-start justify-center space-y-2">
          <li>
            <Link
              to="/profile"
              className="text-sm hover:underline"
            >
              Profile
            </Link>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center space-x-2"
              aria-label="Logout"
            >
              <LogOut />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Avatar;
