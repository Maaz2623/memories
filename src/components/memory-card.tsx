import React from "react";
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

interface MemoryCardProps {
  image: string;
  title: string;
  date: Date;
  content: string;
}

const MemoryCard = ({ image, title, date, content }: MemoryCardProps) => {
  return (
    <div className="w-full hover:opacity-90 overflow-hidden rounded-lg border border-gray-200 shadow-md shrink-0 grow-0 cursor-pointer hover:scale-105 hover:shadow-xl transition-all">
      <Image
        src={image}
        height={500}
        width={1000}
        alt="image"
        className="w-full h-44 -z-10 transition duration-1000 hover:scale-110"
      />
      <div className="w-full flex justify-between items-center px-3 mt-2">
        <h3 className="w-1/2 truncate font-semibold text-lg tracking-tight">
          {title}
        </h3>
        <div className="bg-gray-200 rounded-sm w-[90px] truncate text-sm flex justify-center items-center font-normal h-[fit-content]">
          {format(date, "dd/MM/yyyy")}
        </div>
      </div>
      <div className="mt-4 px-3 mb-8">
        <p className="truncate">{content}</p>
      </div>
    </div>
  );
};

export default MemoryCard;
