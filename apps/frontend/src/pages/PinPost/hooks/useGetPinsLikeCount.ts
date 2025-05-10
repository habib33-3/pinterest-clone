import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getPinsCountApi } from "@/api/likeApi";

const useGetPinsLikeCount = () => {
  const { id: pinId } = useParams();

  const { data, status } = useQuery({
    queryFn: () => getPinsCountApi(pinId as string),
    queryKey: ["pin", pinId],
    enabled: Boolean(pinId),
  });

  return { status, data };
};

export default useGetPinsLikeCount;
