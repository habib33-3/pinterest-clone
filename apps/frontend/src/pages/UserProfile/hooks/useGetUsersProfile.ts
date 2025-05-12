import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getUserProfileApi } from "@/api/userApi";

const useGetUsersProfile = () => {
  const { userName } = useParams();

  const { data, status } = useQuery({
    queryKey: ["users", userName],
    queryFn: () => getUserProfileApi(userName as string),
  });

  return { profile: data ?? null, status };
};

export default useGetUsersProfile;
