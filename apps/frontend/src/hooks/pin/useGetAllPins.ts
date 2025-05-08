import { useQuery } from "@tanstack/react-query";

import { getAllPinsApi } from "@/api/pinApi";

const useGetAllPins = () => {
  const { data, status } = useQuery({
    queryKey: ["pins"],
    queryFn: getAllPinsApi,
  });

  return { pins: data?.data ?? [], status };
};

export default useGetAllPins;
