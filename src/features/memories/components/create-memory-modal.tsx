import React from "react";
import { useCreateMemoryModalStore } from "../store/use-create-memory-modal-store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ChatInput from "@/components/chat-input";

const CreateMemoryModal = () => {
  const [open, setOpen] = useCreateMemoryModalStore();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-[80%] w-[fit-content] h-[fit-content]">
        <ChatInput placeholder={`Write something...`} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateMemoryModal;
