import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import { SearchIcon, X } from "lucide-react";

import { Input } from "@/components/ui/input";

import useDebounce from "@/hooks/useDebounce";

import { Button } from "@/ui/button";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") ?? ""
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const currentSearchParam = searchParams.get("search") ?? "";

  useEffect(() => {
    if (currentSearchParam === debouncedSearchQuery) return;

    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (debouncedSearchQuery) {
          newParams.set("search", debouncedSearchQuery);
        } else {
          newParams.delete("search");
        }
        return newParams;
      },
      { replace: true }
    );
  }, [debouncedSearchQuery, currentSearchParam, setSearchParams]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-1 items-center gap-2 rounded-2xl bg-neutral-100 p-4">
      <SearchIcon className="size-5 text-neutral-500" />
      <Input
        type="text"
        placeholder="Search"
        className="flex-1 border-none bg-transparent p-0 text-lg font-medium text-gray-700 shadow-none hover:border hover:bg-gray-100 focus-visible:ring-0 focus-visible:outline-none"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
      />
      {searchQuery ? (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-transform duration-200 hover:scale-110 hover:bg-muted focus:outline-none"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          <X className="size-4 text-muted-foreground" />
        </Button>
      ) : null}
    </div>
  );
};

export default SearchBar;
