"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { slides } from "../../../public/mock";

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoScroll()]);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  return (
    <div className="w-full items-center relative">
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-l from-transparent via-white/50 to-white top-0 left-0 z-20" />
      <div className="overflow-hidden my-2 p-4 w-full h-[30vh]" ref={emblaRef}>
        <div className="flex w-1/4 h-full">
          {slides.map((image) => (
            <Image
              src={image}
              alt="image"
              width={200}
              height={100}
              key={image}
              className="ml-4 rounded-xl h-full hover:scale-105 transition-all"
            />
          ))}
        </div>
      </div>
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-r from-transparent via-white/50 to-white top-0 right-0 z-20" />
    </div>
  );
};

export default EmblaCarousel;
