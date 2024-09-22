"use client";

import CreateMemoryModal from "@/features/memories/components/create-memory-modal";
import MemoryDetailsModal from "@/features/memories/components/memory-details-modal";
import { CreateYearModal } from "@/features/years/components/use-year-modal";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <MemoryDetailsModal />
      <Toaster duration={3000} />
      <CreateMemoryModal />
      <CreateYearModal />
    </>
  );
};
