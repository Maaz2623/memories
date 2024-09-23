"use client";
import React from "react";
import { Button } from "./ui/button";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";
import MonthButton from "./month-button";
import useYearId from "@/hooks/use-year-id";
import { useGetMonths } from "@/features/months/api/use-get-months";
import useMonthId from "@/hooks/use-month-id";
import { Loader2Icon } from "lucide-react";

const Sidebar = () => {
  const yearId = useYearId();
  const monthId = useMonthId();

  const [on, toggle] = useToggle(true);

  const { data: months, isLoading: monthsLoading } = useGetMonths({ yearId });

  return (
    <div className="px-4 h-full z-50">
      <div className="h-full">
        <div className="flex gap-2 justify-start items-center mt-2">
          <Button
            variant={`transparent`}
            className={cn(
              "text-primary hover:bg-emerald-400/40 transition-all",
              on && "bg-emerald-400"
            )}
            size={`iconSm`}
            onClick={toggle}
          >
            <FaCaretRight
              className={cn("transition-transform", on && "rotate-90")}
            />
          </Button>
          <h2 className="text-xl font-semibold tracking-tighter">Months</h2>
        </div>
        {monthsLoading && (
          <div className="w-full h-full flex justify-center items-start pt-32">
            <Loader2Icon className="size-6 animate-spin text-emerald-500/80" />
          </div>
        )}
        {on && (
          <div
            className={cn(
              "w-full mt-2 ml-10 space-y-1 font-medium transform transition-transform duration-500"
            )}
          >
            {months?.map((month) => (
              <MonthButton
                yearId={month.yearId}
                name={month.name}
                monthId={month._id}
                isActive={monthId === month._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
