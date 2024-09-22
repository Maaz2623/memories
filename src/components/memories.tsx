import React, { Suspense } from "react";
import { memories } from "../../public/mock";
import MemoryCard from "./memory-card";
import useYearId from "@/hooks/use-year-id";
import useMonthId from "@/hooks/use-month-id";
import { useGetMemories } from "@/features/memories/api/use-get-memories";
import { TriangleAlertIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const Memories = () => {
  const yearId = useYearId();
  const monthId = useMonthId();

  const { data: memories, isLoading: memoriesLoading } = useGetMemories({
    yearId: yearId,
    monthId: monthId,
  });

  return (
    <div className="min-h-screen transition-all">
      {!memories?.length && (
        <div className="w-full h-[350px] flex justify-center items-start pt-20 text-muted-foreground">
          <div className="flex flex-col justify-center items-center">
            <TriangleAlertIcon className="" />
            <p>No memories created in this month yet</p>
          </div>
        </div>
      )}
      <div className="w-full h-auto pt-4 grid grid-cols-3 gap-x-16 gap-y-6 mb-40 transition-all">
        {memories?.map((memory, index) => {
          return (
            <Dialog>
              <DialogTrigger>
                <MemoryCard
                  id={memory._id}
                  key={index}
                  title={memory.title}
                  content={memory.body}
                  image={memory.image || ""}
                  date={memory.date}
                />
              </DialogTrigger>
              <DialogContent className="max-w-[screen] w-[80%]">
                <DialogHeader>
                  <DialogTitle>{memory.title}</DialogTitle>
                  <DialogDescription>{memory.body}</DialogDescription>
                </DialogHeader>
                <Image
                  src={memory.image || ""}
                  width={200}
                  height={200}
                  alt="image"
                  className="w-[500px] rounded-lg"
                />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default Memories;
