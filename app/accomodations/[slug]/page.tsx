"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { mapAccomodationsData } from "@/lib/mapAccomodationsData";
import { AccomodationsItem, CarouselItem } from "@/types";
import { cormorantGaramond } from "@/config/fonts";

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
  const [accomodation, setAccomodation] = useState<AccomodationsItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchAccomodation() {
      try {
        setLoading(true);
        const res = await fetch(`/api/accomodations?slug=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch accommodation");

        const data = await res.json();
        if (!data) throw new Error("No accommodation found");

        const mappedData = mapAccomodationsData(data);
        setAccomodation(mappedData);
      } catch (err) {
        console.error("Error fetching accommodation:", err);
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Failed to load accommodation details"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchAccomodation();
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-16 text-center text-zinc-500">
        Loading accommodation...
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="px-4 py-16 text-center text-red-600">
        {errorMessage}
      </section>
    );
  }

  if (!accomodation) {
    return (
      <section className="px-4 py-16 text-center text-zinc-500">
        Room not found.
      </section>
    );
  }

  return (
    <section className="flex flex-col p-4 sm:p-24 gap-8 sm:gap-16">
      <div className="relative w-full h-[280px] sm:h-[640px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slidesData.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-[280px] sm:h-[640px] flex-shrink-0"
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
      <div className="flex flex-col gap-8">
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          {accomodation.name}
        </h2>
        <p className="text-zinc-600 leading-relaxed">
          {accomodation.description}
        </p>
        <ul className="flex flex-row sm:flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
          {accomodation.facilities?.map((item) => {
            if (!item.icon) return null;
            const Icon = item.icon;
            const itemClassName =
              "flex flex-col sm:flex-row gap-2 sm:gap-4 items-center text-zinc-500";
            return (
              <li key={item.label} className={itemClassName}>
                <Icon className="w-6 h-6" />
                {item.label}
              </li>
            );
          })}
        </ul>
        <p className="flex flex-col gap-2 text-zinc-500">
          <span className="text-amber-500">Starting from</span>
          {/* <span>
            <span className="text-2xl sm:text-4xl text-zinc-800">
              {accomodation.price.currency}
              {accomodation.price.current}
            </span>
            <span className="text-xl sm:text-2xl text-zinc-500">/night</span>
          </span> */}
          <span>
            {accomodation.price &&
            accomodation.price.currency &&
            accomodation.price.current ? (
              <span className="text-2xl sm:text-4xl text-zinc-800">
                {accomodation.price.currency}
                {accomodation.price.current}
              </span>
            ) : (
              <span className="text-2xl sm:text-4xl text-zinc-800">
                Price unavailable
              </span>
            )}
            <span className="text-xl sm:text-2xl text-zinc-500">/night</span>
          </span>
        </p>
        <Link href={`/booking?accomodationsId=${accomodation.id}`}>
          <button className="px-6 py-4 w-full sm:w-fit text-white bg-amber-500 hover:bg-amber-600">
            Check Availability
          </button>
        </Link>
      </div>
    </section>
  );
}
