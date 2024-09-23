import React, { useState, useEffect } from "react";
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
import { useGetMemoriesByYear } from "@/features/memories/api/use-get-memories-by-year";
import useYearId from "@/hooks/use-year-id";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import dynamic from "next/dynamic";
import { ScrollArea } from "./ui/scroll-area";

const CardRenderer = dynamic(() => import("@/components/card-renderer"), {
  ssr: false,
});

const SearchBarModal = () => {
  const [open, setOpen] = useSearchBar();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const yearId = useYearId();

  const handleClose = () => {
    setOpen(false);
  };

  const { data: memories, isLoading: memoriesLoading } = useGetMemoriesByYear({
    yearId: yearId,
  });

  const [loading, setLoading] = useState(true);

  return (
    <CommandDialog open={open} onOpenChange={handleClose}>
      <CommandInput placeholder="Search memories in this year..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {memories?.map((memory) => (
            <Dialog>
              <CommandItem key={memory._id} className="">
                <DialogTrigger className="w-full h-full flex items-center justify-between">
                  <p className="font-medium truncate w-[80%] text-start">
                    {memory.title}
                  </p>
                  <Image
                    src={memory.image || ""}
                    alt="image"
                    width={500}
                    height={500}
                    className="w-[50px] h-[40px] rounded-lg"
                  />
                </DialogTrigger>
              </CommandItem>
              <DialogContent className="max-w-[80%] flex flex-col h-[80%] w-[80%] rounded-lg shadow-lg bg-white overflow-hidden">
                <div className="flex items-center justify-between border-b p-4">
                  <DialogHeader className="flex-1">
                    <DialogTitle className="text-2xl first-letter:capitalize">
                      {memory.title}
                    </DialogTitle>
                  </DialogHeader>
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src={memory.image || ""}
                        width={800}
                        height={500}
                        className="w-[150px] cursor-pointer h-[100px] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                        alt="image"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-screen w-[800px] bg-transparent border-none">
                      <div className="border-2 overflow-hidden rounded-2xl relative">
                        {memory.image ? (
                          <>
                            <Image
                              src={memory.image}
                              width={800}
                              height={500}
                              alt="image"
                              className="w-full h-full"
                              onLoadingComplete={() => setLoading(false)}
                              onError={() => setLoading(false)} // Optional: handle errors
                            />
                            {loading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                                <Loader2Icon className="animate-spin size-4" />
                              </div>
                            )}
                          </>
                        ) : (
                          <Loader2Icon className="animate-spin size-4" />
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <ScrollArea className="flex-1 p-4 overflow-y-auto">
                  <CardRenderer value={memory.body} />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchBarModal;
