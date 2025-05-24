import { useState } from "react";

import useGetUsersProfile from "@/hooks/users/useGetUsersProfile";

import { useUserStore } from "@/stores/userStore";

import { cn } from "@/lib/utils";

import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

import Created from "./components/Created";
import FollowMessageButton from "./components/FollowMessageButton";
import Saved from "./components/Saved";
import ShareEditButton from "./components/ShareEditButton";

const tabs = ["Created", "Saved"] as const;
type TabType = (typeof tabs)[number];

const UserProfile = () => {
  const { status, profile } = useGetUsersProfile();

  const { user } = useUserStore();

  const [isTab, setIsTab] = useState<TabType>("Saved");

  if (status === "pending") {
    return <Skeleton />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-center gap-4">
        <div className="size-20 overflow-hidden rounded-full shadow-md">
          <img
            src={profile.user.avatar}
            alt={`${profile.user.userName}'s avatar`}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profile.user.displayName}</h1>
          <p className="text-sm text-gray-600">@{profile.user.userName}</p>
        </div>
      </div>

      {user?.id === profile.user.id ? (
        <ShareEditButton />
      ) : (
        <FollowMessageButton userProfile={profile.user} />
      )}

      <div className="mt-10 flex items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => {
                setIsTab(tab);
              }}
              className={cn(
                "px-6 py-3 font-medium transition-all duration-300",
                isTab === tab
                  ? "border-b-4 border-gray-800 font-semibold text-gray-900"
                  : "border-b-4 border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {isTab === "Created" && <Created pins={profile.user.Pin} />}
        {isTab === "Saved" && <Saved boards={profile.user.Board} />}
      </div>
    </div>
  );
};

export default UserProfile;
