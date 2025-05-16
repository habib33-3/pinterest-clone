import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getSinglePinByIdApi } from "@/api/pinApi";

const useGetSInglePinById = () => {
  const { id } = useParams();

  const { data, status } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => getSinglePinByIdApi(id as string),
  });

  return { pin: data?.data, status };
};

export default useGetSInglePinById;
