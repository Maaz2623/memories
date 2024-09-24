"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { slides } from "../../../public/mock";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useGetMemoriesByYear } from "@/features/memories/api/use-get-memories-by-year";
import useYearId from "@/hooks/use-year-id";
import { AlertTriangleIcon, TriangleAlertIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ startDelay: 2000, speed: 0.8 }),
  ]);

  const yearId = useYearId();

  const { data: memories, isLoading: memoriesLoading } = useGetMemoriesByYear({
    yearId: yearId,
  });

  if (!memories) return;

  return (
    <Card className="w-full items-center relative">
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-l from-transparent via-white/50 to-white top-0 left-0 z-20" />
      <CardContent
        className="overflow-hidden my-2 p-4 w-full h-[30vh]"
        ref={emblaRef}
      >
        <div className="flex w-1/4 h-full">
          {memories?.map((memory) => (
            <Image
              src={memory?.image || "/placeholder.jpg"} // Fallback to a placeholder image if undefined
              alt="memory image"
              width={200}
              height={200}
              key={memory.image}
              className="ml-4 rounded-xl cursor-pointer h-full w-[350px] hover:scale-110 duration-200 transition-all"
            />
          ))}
        </div>
      </CardContent>
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-r from-transparent via-white/50 to-white top-0 right-0 z-20" />
    </Card>
  );
};

export default EmblaCarousel;
