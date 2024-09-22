"use client";
import EmblaCarousel from "@/components/embla/embla-carousel";
import Memories from "@/components/memories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetMemories } from "@/features/memories/api/use-get-memories";
import { useGetMemoriesByYear } from "@/features/memories/api/use-get-memories-by-year";
import { useCreateMemoryModalStore } from "@/features/memories/store/use-create-memory-modal-store";
import useMonthId from "@/hooks/use-month-id";
import useYearId from "@/hooks/use-year-id";
import React, { memo } from "react";

const MonthIdPage = () => {
  const [open, setOpen] = useCreateMemoryModalStore();

  const yearId = useYearId();
  const monthId = useMonthId();

  const { data: memories, isLoading: memoriesLoading } = useGetMemories({
    yearId,
    monthId,
  });

  return (
    <div className="px-6 pt-10">
      <div>
        <h2 className="text-3xl flex font-semibold tracking-tight text-gray-900">
          A Glimpse into <span className="text-emerald-500 mx-1">Our</span>
          Cherished Moments
        </h2>
        <EmblaCarousel />
      </div>
      <Separator className="my-10 bg-emerald-500/80" />
      <div className="h-auto">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-3xl flex font-semibold tracking-tight text-gray-900">
            <span className="text-emerald-500 mx-1">Our</span>Book of Memories
          </h2>
          <Button
            onClick={() => setOpen(true)}
            className="font-semibold bg-emerald-600 text-gray-100  transition-all duration-300  hover:bg-emerald-600/80 text-xs"
          >
            + Add
          </Button>
        </div>
        <Memories />
      </div>
    </div>
  );
};

export default MonthIdPage;
