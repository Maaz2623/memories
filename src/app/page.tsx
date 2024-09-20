"use client";
import EmblaCarousel from "@/components/embla/embla-carousel";
import Memories from "@/components/memories";
import { Separator } from "@/components/ui/separator";
import React from "react";

const HomePage = () => {
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
        <h2 className="text-3xl flex font-semibold tracking-tight text-gray-900">
          <span className="text-emerald-500 mx-1">Our</span>Book of Memories
        </h2>
        <Memories />
      </div>
    </div>
  );
};

export default HomePage;
