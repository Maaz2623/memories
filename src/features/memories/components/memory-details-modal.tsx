import React from "react";
import { useCreateMemoryModalStore } from "../store/use-create-memory-modal-store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ChatInput from "@/components/chat-input";
import { useMemoryDetailsStore } from "../store/use-memory-details-store";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const MemoryDetailsModal = () => {
  const [open, setOpen] = useMemoryDetailsStore();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-2 border-blue-500 max-w-full w-[80%] min-h-[80%] h-[80%] max-h-screen"></DialogContent>
    </Dialog>
  );
};

export default MemoryDetailsModal;
