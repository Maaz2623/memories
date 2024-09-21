"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { slides } from "../../../public/mock";
import { Card, CardContent } from "../ui/card";

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);

  return (
    <Card className="w-full items-center relative">
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-l from-transparent via-white/50 to-white top-0 left-0 z-20" />
      <CardContent
        className="overflow-hidden my-2 p-4 w-full h-[30vh]"
        ref={emblaRef}
      >
        <div className="flex w-1/4 h-full">
          {slides.map((image) => (
            <Image
              src={image}
              alt="image"
              width={400}
              height={200}
              key={image}
              className="ml-4 rounded-xl h-full w-full hover:scale-105 duration-200 transition-all"
            />
          ))}
        </div>
      </CardContent>
      <div className="bg-transparent w-32 h-[100%] absolute bg-gradient-to-r from-transparent via-white/50 to-white top-0 right-0 z-20" />
    </Card>
  );
};

export default EmblaCarousel;
