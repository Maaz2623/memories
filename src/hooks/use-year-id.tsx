"use client";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

const useYearId = () => {
  const params = useParams();

  return params.yearId as Id<"years">;
};

export default useYearId;
