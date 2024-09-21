import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetYears = () => {
  const data = useQuery(api.years.get);
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
