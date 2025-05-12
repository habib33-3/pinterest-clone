import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/stores/userStore";

import { getFollowerCountApi } from "@/api/followApi";

const useGetFollowerCount = () => {
  const { userName: followingUsername } = useParams();

  const { user } = useUserStore();

  const followerUsername = user?.userName;

  const { data, status } = useQuery({
    queryFn: () => getFollowerCountApi(followingUsername as string),
    queryKey: ["followerCount", followingUsername, followerUsername],
    enabled: Boolean(followingUsername),
  });

  return {
    status,
    data: data?.data ?? {
      followerCount: 0,
      followingCount: 0,
      isFollowing: false,
    },
  };
};

export default useGetFollowerCount;
