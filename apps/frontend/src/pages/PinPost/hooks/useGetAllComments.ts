import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllCommentsApi } from "@/api/commentApi";

const useGetAllComments = () => {
  const { id: pinId } = useParams();

  const { data, status } = useQuery({
    queryKey: ["comments", pinId],
    queryFn: () => getAllCommentsApi(pinId as string),
  });

  return { comments: data?.data ?? [], status };
};

export default useGetAllComments;
