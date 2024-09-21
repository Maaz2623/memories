import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMonthsProps {
  yearId: Id<"years">;
}

export const useGetMonths = ({ yearId }: UseGetMonthsProps) => {
  const data = useQuery(api.months.getByYearId, { yearId });
  const isLoading = data === undefined

  return {
    data,
    isLoading
  }
};
