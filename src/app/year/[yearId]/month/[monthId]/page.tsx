"use client";
import EmblaCarousel from "@/components/embla/embla-carousel";
import Memories from "@/components/memories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetMemories } from "@/features/memories/api/use-get-memories";
import { useCreateMemoryModalStore } from "@/features/memories/store/use-create-memory-modal-store";
import useMonthId from "@/hooks/use-month-id";
import useYearId from "@/hooks/use-year-id";
import { Loader2Icon } from "lucide-react";

const MonthIdPage = () => {
  const [, setOpen] = useCreateMemoryModalStore();

  const yearId = useYearId();
  const monthId = useMonthId();

  const { isLoading: memoriesLoading } = useGetMemories({
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
        {memoriesLoading ? (
          <div className="h-[25vh] w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center text-muted-foreground">
              <Loader2Icon className="text-emerald-500/80 animate-spin" />
              <p>Loading slide show</p>
            </div>
          </div>
        ) : (
          <EmblaCarousel />
        )}
      </div>
      <Separator className="my-10 bg-emerald-500/40" />
      <div className="h-[fit-content]">
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
