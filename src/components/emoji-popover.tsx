import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertDialog } from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: any) => void;
}

const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onSelect = (emoji: any) => {
    onEmojiSelect(emoji);
    setTooltipOpen(false);
  };

  return (
    <TooltipProvider>
      <Dialog open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <DialogTrigger asChild>
            <TooltipTrigger>{children}</TooltipTrigger>
          </DialogTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="p-0 w-auto border-none shadow-none">
          <Picker theme={"light"} data={data} onEmojiSelect={onSelect} />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default EmojiPopover;
