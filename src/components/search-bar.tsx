import React from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useSearchBar } from "@/hooks/use-search-bar";

const SearchBar = () => {
  const [open, setOpen] = useSearchBar();

  return (
    <Button
      variant={`outline`}
      className="w-[150px] flex justify-start items-center gap-1"
      size={`sm`}
      onClick={() => setOpen(true)}
    >
      Search <SearchIcon className="size-4 text-muted-foreground" />
    </Button>
  );
};

export default SearchBar;
