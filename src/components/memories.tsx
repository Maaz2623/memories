import React from "react";
import { memories } from "../../public/mock";
import MemoryCard from "./memory-card";

const Memories = () => {
  return (
    <div className="w-full h-auto pt-4 grid grid-cols-3 gap-x-10 gap-y-6">
      {memories.map((memory, index) => {
        return (
          <MemoryCard
            key={index}
            title={memory.title}
            content={memory.content}
            image={memory.image}
            date={memory.date}
          />
        );
      })}
    </div>
  );
};

export default Memories;
