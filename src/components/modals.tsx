"use client";

import { CreateYearModal } from "@/features/years/components/use-year-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateYearModal />
    </>
  );
};