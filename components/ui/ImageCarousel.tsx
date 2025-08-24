"use client";

import { useState } from "react";
import Image from "next/image";
import { CarouselItem } from "@/types";

interface ImageCarouselProps {
  items: CarouselItem[];
}

export default function ImageCarousel({ items }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex flex-col sm:flex-row gap-8 w-full items-center justify-center">
      <div className="relative w-full sm:w-4xl h-96 sm:h-120 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="flex-shrink-0 w-full h-full relative"
            >
              <Image
                fill
                src={item.src}
                alt={item.name}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row sm:flex-col gap-4">
        {items.map((item, index) => (
          <p
            key={item.name}
            className={`cursor-pointer ${
              activeIndex === index ? "text-amber-500" : "text-zinc-500"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}
