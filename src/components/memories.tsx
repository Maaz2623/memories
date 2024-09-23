"use client";
import React, { Suspense, useState } from "react";
import { memories } from "../../public/mock";
import MemoryCard from "./memory-card";
import useYearId from "@/hooks/use-year-id";
import useMonthId from "@/hooks/use-month-id";
import { useGetMemories } from "@/features/memories/api/use-get-memories";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMemoryDetails } from "@/features/memories/store/use-memory-details-store";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";

const CardRenderer = dynamic(() => import("@/components/card-renderer"), {
  ssr: false,
});

const Memories = () => {
  const yearId = useYearId();
  const monthId = useMonthId();

  const { data: memories, isLoading: memoriesLoading } = useGetMemories({
    yearId: yearId,
    monthId: monthId,
  });

  const [loading, setLoading] = useState(true);

  return (
    <div className="border border-green-500 transition-all mb-40">
      {!memories?.length && (
        <div className="w-full h-[350px] flex justify-center items-start pt-20 text-muted-foreground">
          <div className="flex flex-col justify-center items-center">
            <TriangleAlertIcon className="" />
            <p>No memories created in this month yet</p>
          </div>
        </div>
      )}
      <div className="w-full pt-4 grid grid-cols-3 gap-x-16 gap-y-6 transition-all">
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
              <DialogContent className="max-w-[80%] flex flex-col h-[80%] w-[80%] rounded-lg shadow-lg bg-white overflow-hidden">
                <div className="flex items-center justify-between border-b p-4">
                  <DialogHeader className="flex-1">
                    <DialogTitle className="text-2xl first-letter:capitalize">
                      {memory.title}
                    </DialogTitle>
                  </DialogHeader>
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src={memory.image || ""}
                        width={800}
                        height={500}
                        className="w-[150px] cursor-pointer h-[100px] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                        alt="image"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-screen w-[800px]  border-none">
                      <div className="border-2 overflow-hidden rounded-2xl relative">
                        {memory.image ? (
                          <>
                            <Image
                              src={memory.image}
                              width={800}
                              height={500}
                              alt="image"
                              className="w-full h-full"
                              onLoadingComplete={() => setLoading(false)}
                              onError={() => setLoading(false)} // Optional: handle errors
                            />
                            {loading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                                <Loader2Icon className="animate-spin size-4" />
                              </div>
                            )}
                          </>
                        ) : (
                          <Loader2Icon className="animate-spin size-4" />
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <ScrollArea className="flex-1 p-4 overflow-y-auto">
                  <CardRenderer value={memory.body} />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default Memories;
