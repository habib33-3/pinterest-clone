import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllPinsApi } from "@/api/pinApi";

import { DEBOUNCE_DELAY, GC_TIME, STALE_TIME } from "@/constants/index";

import useDebounce from "../useDebounce";

const MIN_SEARCH_LENGTH = 3;

const useGetAllPins = () => {
  const [searchParams] = useSearchParams();
  const rawSearchTerm = searchParams.get("search")?.trim() ?? "";
  const searchTerm = useDebounce(rawSearchTerm, DEBOUNCE_DELAY);

  const shouldFetch =
    searchTerm.length === 0 || searchTerm.length >= MIN_SEARCH_LENGTH;

  const { data, status } = useQuery({
    queryKey: ["pins", { search: searchTerm }],
    queryFn: () => getAllPinsApi(searchTerm),
    enabled: shouldFetch,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,

    placeholderData: (previousData) => previousData ?? { data: [] },
  });

  return { pins: data?.data ?? [], status };
};

export default useGetAllPins;
