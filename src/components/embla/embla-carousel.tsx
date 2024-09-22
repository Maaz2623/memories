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
        {!memories.length && (
          <div className="flex text-muted-foreground w-full h-full justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <TriangleAlertIcon className="" />
              <p>No memories created yet</p>
            </div>
          </div>
        )}
        {memoriesLoading && (
          <div className="flex h-full">
            <Skeleton className="h-full w-[350px] ml-4 bg-gray-200" />
            <Skeleton className="h-full w-[350px] ml-4 bg-gray-200" />
            <Skeleton className="h-full w-[350px] ml-4 bg-gray-200" />
            <Skeleton className="h-full w-[350px] ml-4 bg-gray-200" />
          </div>
        )}
        <div className="flex w-1/4 h-full">
          {memories?.map(
            (memory) =>
              memory.image ? (
                <Image
                  src={memory?.image || "/placeholder.jpg"} // Fallback to a placeholder image if undefined
                  alt="memory image"
                  width={200}
                  height={200}
                  key={memory.image}
                  className="ml-4 rounded-xl h-full w-[350px] hover:scale-105 duration-200 transition-all"
                />
              ) : null // Skip rendering if no image is available
          )}
        </div>
        s
      </CardContent>
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-r from-transparent via-white/50 to-white top-0 right-0 z-20" />
    </Card>
  );
};

export default EmblaCarousel;
