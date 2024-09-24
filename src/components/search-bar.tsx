import React from "react";
import { Button } from "./ui/button";
import { useSearchBar } from "@/hooks/use-search-bar";

const SearchBar = () => {
  const [, setOpen] = useSearchBar();

  return (
    <Button
      variant={`outline`}
      className="w-[150px] flex justify-between items-center gap-1 text-muted-foreground"
      size={`sm`}
      onClick={() => setOpen(true)}
    >
      <p>Search</p>
      <p className="text-sm text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">ctrl </span>k
        </kbd>
      </p>
    </Button>
  );
};

export default SearchBar;
