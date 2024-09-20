"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDownIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Hint from "./hint";

const Navbar = () => {
  const years = [2020, 2021, 2022, 2023, 2024].reverse();

  return (
    <nav className="w-full justify-between flex items-center py-2 border-b px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-[150px]" asChild>
          <Button
            className="outline-none flex justify-between focus-visible:outline-none focus-visible:ring-0 ring-0 ring-offset-0 focus-visible:ring-offset-0"
            variant={`outline`}
            size={`sm`}
          >
            {years[0]}
            <ChevronsUpDownIcon className="ml-3 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-[250px] ml-6">
          <DropdownMenuLabel>Available years</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {years.map((year) => (
            <DropdownMenuItem className="font-base" key={year}>
              {year}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between items-center">
            <p className="text-base font-medium">New Year</p>
            <PlusCircleIcon className="ml-2 size-5" />
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
      <div>UserButton</div>
    </nav>
  );
};

export default Navbar;
