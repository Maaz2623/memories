import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMemoriesByYear {
  yearId: Id<"years">;
}

export type GetMemoriesReturnType = typeof api.memories.get._returnType;

export const useGetMemoriesByYear = ({ yearId }: UseGetMemoriesByYear) => {
  const data = useQuery(api.memories.getAllByYearId, { yearId: yearId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
