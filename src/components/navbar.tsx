"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  ChevronsUpDownIcon,
  Loader2Icon,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";
import Hint from "./hint";
import { useCreateYearModal } from "@/features/years/store/use-create-year-modal";
import { useGetYears } from "@/features/years/api/use-get-years";
import useYearId from "@/hooks/use-year-id";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useGetYear } from "@/features/years/api/use-get-year";
import SearchBar from "./search-bar";
import { useSearchBar } from "@/hooks/use-search-bar";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Navbar = () => {
  const yearId = useYearId();

  const { data: years, isLoading: yearsLoading } = useGetYears();

  const filteredYears = years?.filter((year) => year.name);

  const [open, setOpen] = useCreateYearModal();

  const { data: currentYear, isLoading: currentYearLoading } = useGetYear({
    id: yearId,
  });

  const router = useRouter();

  return (
    <nav className="w-full justify-between flex items-center py-2 border-b px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-[150px]" asChild>
          <Button
            className="outline-none flex justify-between focus-visible:outline-none focus-visible:ring-0 ring-0 ring-offset-0 focus-visible:ring-offset-0"
            variant={`outline`}
            size={`sm`}
          >
            <p className="w-1/2 justify-center flex items-center">
              {currentYearLoading ? (
                <Loader2Icon className="size-3 animate-spin text-muted-foreground" />
              ) : (
                currentYear?.name
              )}
            </p>
            <ChevronsUpDownIcon className="ml-3 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-[250px] ml-6">
          <DropdownMenuLabel className="text-md font-semibold">
            Available years
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filteredYears?.map(({ name, _id }) => (
            <DropdownMenuCheckboxItem
              onClick={() => router.push(`/year/${_id}`)}
              checked={_id === yearId}
              className="font-medium cursor-pointer"
              key={_id}
            >
              {name}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between items-center cursor-pointer w-full">
            <Button
              variant={`ghost`}
              className="flex w-full justify-between items-center cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <p className="text-base font-medium">Create new year</p>
              <PlusCircleIcon className="ml-2 size-5" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex-grow flex items-start justify-center cursor-default gap-1">
        <Hint label="Forever" duration={150}>
          <Image
            src={`/assets/logo`}
            alt="logo"
            width={45}
            height={45}
            className=""
          />
        </Hint>
        <h1
          className="text-gray-900 text-4xl font-extrabold tracking-tight justify-center items-end flex"
          style={{
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
          }}
        >
          Me{" "}
          <p className="text-emerald-600 hover:rotate-180 transition-all duration-300">
            m
          </p>
          o
          <p className="text-emerald-600 hover:rotate-180 transition-all duration-300">
            r
          </p>
          ies
        </h1>
      </div>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
