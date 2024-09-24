"use client";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

const useMonthId = () => {
  const params = useParams();

  return params.monthId as Id<"months">;
};

export default useMonthId;
