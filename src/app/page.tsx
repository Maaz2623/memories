"use client";
import EmblaCarousel from "@/components/embla/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";

const HomePage = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  // const SLIDE_COUNT = 8;
  const SLIDES = [
    "/mock/1.jpg",
    "/mock/2.jpg",
    "/mock/3.jpg",
    "/mock/4.jpg",
    "/mock/5.jpg",
    "/mock/6.jpg",
    "/mock/7.jpg",
    "/mock/8.jpg",
  ];

  return (
    <>
      <div className="border border-yellow-500 my-4">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </>
  );
};

export default HomePage;
