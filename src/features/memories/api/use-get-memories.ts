import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMemoriesProps {
  yearId: Id<"years">;
  monthId: Id<"months">;
}

export type GetMemoriesReturnType = typeof api.memories.get._returnType;

export const useGetMemories = ({ yearId, monthId }: UseGetMemoriesProps) => {
  const data = useQuery(api.memories.get, { yearId: yearId, monthId: monthId });
  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
