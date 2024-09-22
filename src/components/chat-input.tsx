"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useCreateMemory } from "@/features/memories/api/use-create-memory";
import useYearId from "@/hooks/use-year-id";
import useMonthId from "@/hooks/use-month-id";
import { toast } from "sonner";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload";
import { Id } from "../../convex/_generated/dataModel";
import { useCreateMemoryModalStore } from "@/features/memories/store/use-create-memory-modal-store";

interface ChatInputProps {
  placeholder: string;
}

type CreateMemoryValues = {
  yearId: Id<"years">;
  monthId: Id<"months">;
  body: string;
  image: Id<"_storage"> | undefined;
  title: string;
  date: string;
};

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [open, setOpen] = useCreateMemoryModalStore();

  const editorRef = useRef<Quill | null>(null);

  const [isPending, setIsPending] = useState(false);

  const yearId = useYearId();
  const monthId = useMonthId();

  const { mutate: createMemory } = useCreateMemory();

  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleSubmit = async ({
    body,
    image,
    video,
    title,
    date,
  }: {
    body: string;
    image: File | null;
    video: File | null;
    title: string;
    date: string;
  }) => {
    try {
      setIsPending(true);

      editorRef?.current?.enable(false);

      const values: CreateMemoryValues = {
        yearId,
        monthId,
        body,
        image: undefined,
        title,
        date,
      };

      if (image) {
        const url = await generateUploadUrl({}, { throwError: true });

        if (!url) throw new Error("Url not found");

        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": image.type,
          },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        const { storageId } = await result.json();

        values.image = storageId;
      }

      await createMemory(values, { throwError: true });
      setOpen(false);
      toast.success("Memory created successfully.");
    } catch (error) {
      toast.error("Failed to create memory.");
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);
    }
  };

  return (
    <div className="w-full">
      <Editor
        isLoading={isPending}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
