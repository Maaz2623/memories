import { useState } from "react";
import { useCreateYearModal } from "../store/use-create-year-modal";
import { useRouter } from "next/navigation";
import { useCreateYear } from "../api/use-create-year";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateYearModal = () => {
  const [open, setOpen] = useCreateYearModal();
  const [name, setName] = useState("");

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const { mutate, isPending } = useCreateYear();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess(data) {
          toast.success("Year created.");
          router.push(`/year/${data}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new year</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            minLength={3}
            maxLength={4}
            type="number"
            placeholder="Enter year e.g. '2005'"
          />
          <div className="flex w-full items-center justify-end">
            <Button disabled={isPending} type="submit" className="ml-auto">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
