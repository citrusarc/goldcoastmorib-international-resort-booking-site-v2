"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { cormorantGaramond } from "@/config/fonts";
import { CarouselItem } from "@/types";
import { accomodations } from "@/data/accomodations";

const slidesData: CarouselItem[] = [
  {
    name: "Accomodations Image 1",
    src: "/Images/accomodations-banner-1.jpg",
    alt: "Accomodations Image 1",
  },
  {
    name: "Accomodations Image 2",
    src: "/Images/accomodations-banner-1.jpg",
    alt: "Accomodations Image 2",
  },
  {
    name: "Accomodations Image 3",
    src: "/Images/accomodations-banner-1.jpg",
    alt: "Accomodations Image 3",
  },
];

export default function AccomodationsDetailsPage() {
  const { slug } = useParams();
  const accomodation = accomodations.find((item) => item.id === slug);
  const [current, setCurrent] = useState(0);

  if (!accomodation) {
    return (
      <section className="px-4 py-16 text-center text-zinc-500">
        Room not found.
      </section>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slidesData.length]);

  return (
    <section className="flex flex-col p-4 sm:p-24 gap-8 sm:gap-16">
      <div className="relative w-full h-[560px] sm:h-[720px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slidesData.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-[640px] sm:h-[960px] flex-shrink-0"
            >
              <Image
                fill
                src={item.src}
                alt={item.alt}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute flex gap-4 w-full justify-center bottom-6">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-center">
        <div className="flex-1 flex flex-col gap-6">
          <p className="text-zinc-600 leading-relaxed">
            {accomodation.description}
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {accomodation.facilities?.map((item) => {
              if (!item.icon) return null;
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-zinc-600"
                >
                  <Icon className="w-6 h-6 text-amber-500" />
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-2 text-zinc-500">
            <span className="text-amber-500">Starting from</span>
            <span>
              <span className="text-2xl sm:text-4xl text-zinc-800">
                {accomodation.price.currency}
                {accomodation.price.current}
              </span>
              <span className="text-xl sm:text-2xl text-zinc-500">/night</span>
            </span>
          </div>

          <Link href={`/booking?accomodationsId=${accomodation.id}`}>
            <button className="px-6 py-4 w-full sm:w-fit text-white bg-amber-500 hover:bg-amber-600">
              Check Availability
            </button>
          </Link>
        </div>
        <div className="relative w-full sm:w-1/2 h-72 sm:h-[480px]">
          <Image
            fill
            src={accomodation.image}
            alt={accomodation.alt}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
