"use client";

import CreateMemoryModal from "@/features/memories/components/create-memory-modal";
import { CreateYearModal } from "@/features/years/components/use-year-modal";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import SearchBarModal from "./search-bar-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <SearchBarModal />
      <Toaster duration={3000} />
      <CreateMemoryModal />
      <CreateYearModal />
    </>
  );
};
