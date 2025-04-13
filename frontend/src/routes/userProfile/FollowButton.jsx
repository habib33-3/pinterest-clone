import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../../utils/apiRequest";

const FollowButton = ({ data }) => {
  const queryClient = useQueryClient();

  const followUser = async () => {
    const res = await apiRequest.post(`/user/follow/${data.username}`);

    return res.data;
  };

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", data.username]);
      alert("Followed");
    },
  });

  const handleFollow = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleFollow}
      disabled={mutation.isPending}
    >
      {data.isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
