"use client";
import { useGetMonths } from "@/features/months/api/use-get-months";
import useYearId from "@/hooks/use-year-id";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const YearIdPage = () => {
  const yearId = useYearId();

  const { data: months, isLoading: monthsLoading } = useGetMonths({ yearId });

  const monthId = useMemo(() => months?.[0]?._id, [months]);

  const router = useRouter();

  useEffect(() => {
    if (monthsLoading) return;
    if (monthId) {
      router.replace(`/year/${yearId}/month/${monthId}`);
    }
  }, [months, monthsLoading, monthId, router, yearId]);

  return;
};

export default YearIdPage;
