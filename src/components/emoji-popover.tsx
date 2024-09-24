import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEmojiSelect: (emoji: any) => void;
}

const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
