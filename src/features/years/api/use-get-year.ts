import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface UseGetYearProps {
  id: Id<"years">;
}

export const useGetYear = ({ id }: UseGetYearProps) => {
  const data = useQuery(api.years.getById, { id });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
