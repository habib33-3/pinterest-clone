import { apiPrivate } from "@/lib/api/apiPrivate";
import { apiPublic } from "@/lib/api/apiPublic";

import type { ApiResponse } from "@/types/response";

export const followUserApi = async (
  followerUsername: string,
  followingUsername: string
) => {
  const res = await apiPrivate.post<ApiResponse<{ message: string }>>(
    "/follow",
    {
      followerUsername,
      followingUsername,
    }
  );

  return res.data;
};

export const getFollowerCountApi = async (userName: string) => {
  const res = await apiPublic.get<
    ApiResponse<{
      followerCount: number;
      followingCount: number;
      isFollowing: boolean;
    }>
  >(`/follow/${userName}`);

  return res.data;
};
