"use client";

import Image from "next/image";
import Link from "next/link";
// import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { cormorantGaramond } from "@/config/fonts";
// import { CarouselItem } from "@/types";
import { accomodations } from "@/data/accomodations";

// const slidesData: CarouselItem[] = [
//   {
//     name: "Accomodations Image 1",
//     src: "/Images/accomodations-banner-1.jpg",
//     alt: "Accomodations Image 1",
//   },
//   {
//     name: "Accomodations Image 2",
//     src: "/Images/accomodations-banner-2.jpg",
//     alt: "RooAccomodationsm Image 2",
//   },
//   {
//     name: "Accomodations Image 3",
//     src: "/Images/accomodations-banner-3.jpg",
//     alt: "Accomodations Image 3",
//   },
// ];

export default function AccomodationsDetailsPage() {
  const { slug } = useParams();
  const accomodation = accomodations.find((item) => item.id === slug);

  if (!accomodation) {
    return (
      <section className="px-4 py-16 text-center text-zinc-500">
        Room not found.
      </section>
    );
  }
  return (
    <section className="flex flex-col p-4 sm:p-24 gap-8 sm:gap-16">
      <div className="relative w-full h-[400px] sm:h-[640px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          fill
          src={accomodation.image}
          alt={accomodation.alt}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className={`text-5xl sm:text-7xl ${cormorantGaramond.className}`}>
            {accomodation.name}
          </h1>
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
