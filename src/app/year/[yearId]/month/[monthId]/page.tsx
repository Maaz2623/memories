"use client";
import EmblaCarousel from "@/components/embla/embla-carousel";
import Memories from "@/components/memories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useMonthId from "@/hooks/use-month-id";
import useYearId from "@/hooks/use-year-id";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const MonthIdPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const yearId = useYearId();
  const monthId = useMonthId();

  const router = useRouter();

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
          <Button
            onClick={() => {
              router.replace(
                `/year/${yearId}/month/${monthId}/memories/create`
              );
            }}
            disabled={isLoading}
            className="font-semibold bg-emerald-600 text-gray-100  transition-all duration-300  hover:bg-emerald-600/80 text-xs"
          >
            {isLoading ? (
              <Loader2Icon className="size-3 text-white animate-spin" />
            ) : (
              "+ Add"
            )}
          </Button>
        </div>
        <Memories />
      </div>
    </div>
  );
};

export default MonthIdPage;
