"use client";
import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import {
  CalendarIcon,
  FileVideo2Icon,
  FileVideoIcon,
  ImagesIcon,
  Loader2Icon,
  SmileIcon,
  VideoIcon,
  VideotapeIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import Hint from "./hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import EmojiPopover from "./emoji-popover";
import Image from "next/image";
import { useCreateMemoryModalStore } from "@/features/memories/store/use-create-memory-modal-store";
import { Input } from "./ui/input";
import { AlertDialog } from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

type EditorValue = {
  image: File | null;
  video: File | null;
  body: string;
  title: string;
  date: string;
};

interface EditorProps {
  onSubmit: ({ image, body, video }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
  isLoading?: boolean;
}

const Editor = ({
  variant = "create",
  onCancel,
  onSubmit,
  placeholder = "Write something",
  defaultValue = [],
  disabled = false,
  isLoading,
  innerRef,
}: EditorProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [date, setDate] = React.useState<Date>();
  const [title, setTitle] = useState("");

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled);
  const imageElementRef = useRef<HTMLInputElement>(null);
  const videoElementRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const isEmpty =
    !video && !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;

    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  // Inside the handleSubmit function
  const handleSubmit = () => {
    const quill = quillRef.current;
    const text = quill?.getText();

    // Fetch image from image input field
    const addedImage = imageElementRef.current?.files?.[0] || null;

    // Fetch video from video input field
    const addedVideo = videoElementRef.current?.files?.[0] || null;

    const isEmpty =
      !addedVideo &&
      !addedImage &&
      text?.replace(/<(.|\n)*?>/g, "").trim().length === 0;

    if (isEmpty) return;

    if (!date) return;

    if (!image) return;

    const body = JSON.stringify(quill?.getContents());

    const formattedDate = date?.toString();

    // Submit both image and video with the body content
    submitRef.current?.({
      body,
      image: addedImage,
      video: addedVideo,
      title,
      date: formattedDate,
    });
  };

  const [open, setOpen] = useCreateMemoryModalStore();

  return (
    <div className="flex flex-col w-[800px] max-w-[800px]">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(event) => setImage(event.target.files![0])}
        className="hidden"
      />
      <div className="w-full mb-4 flex justify-between items-center">
        <Hint label="Add a title" duration={50}>
          <Input
            required
            className="outline-none w-1/2 ring-0 border-none focus-visible:ring-0 ring-offset-0 text-xl font-medium truncate"
            placeholder="Add a title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </Hint>
        <Dialog>
          <Hint label="Enter the date" duration={50}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yy") : <span>Pick a date</span>}
              </Button>
            </DialogTrigger>
          </Hint>
          <DialogContent className="w-[fit-content]">
            <Calendar
              classNames={{
                multiple_months: "hidden",
                nav_button_previous: "hidden",
                nav_button_next: "hidden",
              }}
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col border border-green-500 max-w-full rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove image" duration={50}>
                <button
                  onClick={() => {
                    setImage(null);
                    imageElementRef.current!.value === "";
                  }}
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <XIcon className="size-3.5 " />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="uploaded"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex px-2 pb-2 z-[5]">
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button
              className=""
              disabled={disabled}
              size={`icon`}
              variant={`ghost`}
            >
              <SmileIcon className="size-4 " />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <>
              <Hint duration={50} label="Images">
                <Button
                  className=""
                  disabled={disabled}
                  size={`icon`}
                  variant={`ghost`}
                  onClick={() => imageElementRef.current?.click()}
                >
                  <ImagesIcon className="size-4 " />
                </Button>
              </Hint>
            </>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={`outline`}
                size={`sm`}
                onClick={onCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                disabled={disabled}
                onClick={handleSubmit}
                size={`sm`}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      {variant === "create" && (
        <div className={cn("p-2 flex justify-between text-[12px]")}>
          <p
            className={cn(
              "opacity-0 transition text-muted-foreground",
              !isEmpty && "opacity-100"
            )}
          >
            <strong>Shift + Return</strong> to add a new line
          </p>
          {variant === "create" && (
            <div className="flex gap-3 mt-4">
              <Button
                variant={`outline`}
                onClick={() => setOpen(false)}
                className="hover:text-rose-900"
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                disabled={isEmpty || disabled}
                onClick={handleSubmit}
                size={`default`}
                className={cn(
                  "ml-auto w-20 bg-[#007a5a] hover:bg-[#007a5a]/80 hover:scale-105 transition duration-300 text-white"
                )}
              >
                {isLoading ? (
                  <Loader2Icon className="size-4 animate-spin text-gray-200" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;
