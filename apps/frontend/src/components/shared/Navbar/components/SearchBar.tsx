import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <form className="flex flex-1 items-center gap-2 rounded-2xl bg-neutral-100 p-4">
      <SearchIcon className="h-5 w-5 text-neutral-500" />
      <Input
        type="text"
        placeholder="Search"
        className="flex-1 border-none bg-transparent p-0 text-lg font-medium text-gray-700 shadow-none focus-visible:ring-0 focus-visible:outline-none"
      />
    </form>
  );
};

export default SearchBar;
