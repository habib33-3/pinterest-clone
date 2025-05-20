import useFollowUser from "@/hooks/users/useFollowUser";
import useGetFollowerCount from "@/hooks/users/useGetFollowerCount";

import { useUserStore } from "@/stores/userStore";

import type { User } from "@/types/index";

import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

type Props = {
  userProfile: User;
};

const FollowMessageButton = ({ userProfile }: Props) => {
  const { user } = useUserStore();
  const { data, status } = useGetFollowerCount();
  const { handleFollowUser, isFollowing } = useFollowUser();

  if (status === "pending")
    return <Skeleton className="h-28 w-full rounded-xl" />;
  if (status === "error")
    return (
      <div className="text-center text-red-500">
        Something went wrong. Please try again.
      </div>
    );

  return (
    <div className="mt-6 space-y-6 rounded-xl p-5">
      <div className="flex items-center justify-center gap-8 text-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {data.followerCount}
          </p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {data.followingCount}
          </p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span
          title={!user ? "Login to follow" : `Follow ${userProfile.userName}`}
        >
          <Button
            onClick={handleFollowUser}
            disabled={!user || isFollowing}
            className="min-w-[100px]"
          >
            {data.isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </span>

        <span
          title={!user ? "Login to message" : `Message ${userProfile.userName}`}
        >
          <Button
            disabled={!user}
            variant="secondary"
            className="min-w-[100px] border shadow-sm"
          >
            Message
          </Button>
        </span>
      </div>
    </div>
  );
};

export default FollowMessageButton;
