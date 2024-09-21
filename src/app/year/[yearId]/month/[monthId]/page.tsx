import EmblaCarousel from "@/components/embla/embla-carousel";
import Memories from "@/components/memories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const MonthIdPage = () => {
  return (
    <div className="px-6 pt-10">
      <div>
        <h2 className="text-3xl flex font-semibold tracking-tight text-gray-900">
          A Glimpse into <span className="text-emerald-500 mx-1">Our</span>
          Cherished Moments
        </h2>
        <EmblaCarousel />
      </div>
      <Separator className="my-10" />
      <div className="h-auto">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-3xl flex font-semibold tracking-tight text-gray-900">
            <span className="text-emerald-500 mx-1">Our</span>Book of Memories
          </h2>
          <Button className="font-semibold bg-emerald-600/80 text-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-600 text-xs">
            + Add
          </Button>
        </div>
        <Memories />
      </div>
    </div>
  );
};

export default MonthIdPage;
