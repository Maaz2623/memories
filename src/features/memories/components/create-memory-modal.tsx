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
      <AlertDialogContent className="border max-w-full w-[80%] h-[80%] max-h-screen">
        <ChatInput placeholder={`Write something...`} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateMemoryModal;
