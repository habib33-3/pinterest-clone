import { useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { useUserStore } from "@/stores/userStore";

import { followUserApi } from "@/api/followApi";

import type { ApiResponse } from "@/types/response";

const useFollowUser = () => {
  const { user } = useUserStore();

  const followerUsername = user?.userName;

  const { userName: followingUsername } = useParams();

  const query = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["follow", followerUsername, followingUsername],
    mutationFn: () => {
      return followUserApi(
        followerUsername as string,
        followingUsername as string
      );
    },
    onSuccess: (data) => {
      void query.invalidateQueries({
        queryKey: ["followerCount", followingUsername, followerUsername],
      });

      toast.success(data.message);
    },
    onError: (e: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(e.response?.data.message);
    },
  });

  const handleFollowUser = () => {
    mutate.mutate();
  };

  return { isFollowing: mutate.status === "pending", handleFollowUser };
};

export default useFollowUser;
