"use client";
import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMemoryDetailsStore } from "@/features/memories/store/use-memory-details-store";
import dynamic from "next/dynamic";

const CardRenderer = dynamic(() => import("@/components/card-renderer"), {
  ssr: false,
});

interface MemoryCardProps {
  image: string | undefined;
  title: string;
  date: string;
  content: string;
  id: Id<"memories">;
}

const MemoryCard = ({ image, title, date, content }: MemoryCardProps) => {
  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th"; // Covers 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const day: number = parseInt(format(date, "d"), 10);

  const ordinalSuffix: string = getOrdinalSuffix(day); // Get the suffix

  const [open, setOpen] = useMemoryDetailsStore();

  return (
    <div
      onClick={() => setOpen(true)}
      className="w-full hover:opacity-90 overflow-hidden rounded-lg border border-gray-200 shadow-md shrink-0 grow-0 cursor-pointer hover:scale-105 hover:shadow-xl transition-all"
    >
      <Suspense fallback={<div>Loading Image</div>}>
        <Image
          src={image || ""}
          height={500}
          width={500}
          alt="image"
          className="w-full h-44 -z-10 transition duration-1000 hover:scale-110"
        />
      </Suspense>
      <div className="w-full flex justify-between items-center px-3 mt-2">
        <h3 className="w-1/2 truncate font-semibold text-lg tracking-tight">
          {title}
        </h3>
        <div className="bg-gray-200 font-mono rounded-sm w-[40px] truncate text-sm flex justify-center items-center font-normal h-[fit-content]">
          {`${day}${ordinalSuffix}`}
        </div>
      </div>
      <div className="mt-4 px-3 mb-8">
        {/* <CardRenderer value={content} /> */}
      </div>
    </div>
  );
};

export default MemoryCard;
