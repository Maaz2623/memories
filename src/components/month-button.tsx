import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface MonthButtonProps {
  yearId: Id<"years">;
  name: string;
  monthId: Id<"months">;
  isActive: boolean;
}

const MonthButton = ({ name, monthId, isActive, yearId }: MonthButtonProps) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex w-[80%] hover:bg-emerald-500/20 cursor-pointer transition-all px-2 rounded-sm hover:scale-105",
        isActive && "bg-emerald-400 hover:bg-emerald-400"
      )}
      onClick={() => router.push(`/year/${yearId}/month/${monthId}`)}
    >
      <p className="first-letter:capitalize text-md py-1 truncate">{name}</p>
    </div>
  );
};

export default MonthButton;
