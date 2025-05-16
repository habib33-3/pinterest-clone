import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getPinsCountApi } from "@/api/likeApi";

const useGetPinsLikeCount = () => {
  const { id: pinId } = useParams<{ id: string }>();

  const { data, status } = useQuery({
    queryFn: () => getPinsCountApi(pinId as string),
    queryKey: ["like", pinId],
    enabled: Boolean(pinId),
  });

  return {
    status,
    data: data?.data ?? { count: 0, isLiked: false },
  };
};

export default useGetPinsLikeCount;
