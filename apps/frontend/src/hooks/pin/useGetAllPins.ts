import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllPinsApi } from "@/api/pinApi";

const useGetAllPins = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const { data, status } = useQuery({
    queryKey: ["pins", search],
    queryFn: () => getAllPinsApi(search),
  });

  return { pins: data?.data ?? [], status };
};

export default useGetAllPins;
