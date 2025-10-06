"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cellar, SeaWaves, Yoga } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { CarouselItem } from "@/types";

const accomodationsData: CarouselItem[] = [
  {
    name: "Studio Suite",
    src: "/Images/accomodations-banner-1.jpg",
    alt: "Gold Coast Morib International Resort Accomodations Banner 1",
  },
  {
    name: "Apartment",
    src: "/Images/accomodations-banner-2.jpg",
    alt: "Gold Coast Morib International Resort Accomodations Banner 2",
  },
  {
    name: "Penthouse",
    src: "/Images/accomodations-banner-3.jpg",
    alt: "Gold Coast Morib International Resort Accomodations Banner 3",
  },
];

export default function TheResortPage() {
  const itemClassName =
    "flex flex-col sm:flex-row gap-2 sm:gap-4 items-center text-2xl sm:text-4xl text-zinc-500";

  const images = [
    "/Images/activities-banner-1.jpg",
    "/Images/activities-banner-2.jpg",
    "/Images/activities-banner-3.jpg",
    "/Images/activities-banner-4.jpg",
  ];

  return (
    <section className="flex flex-col p-4 sm:p-24 gap-8 sm:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:flex-row gap-8 sm:gap-16"
      >
        <div className="relative w-full sm:w-1/2 h-72 sm:h-[640px] ">
          <Image
            fill
            src="/Images/resort-banner-1.jpg"
            alt="Gold Coast Morib International Resort The Resort Hero Banner"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-lg sm:text-xl text-amber-500">Welcome To</span>
          <h2
            className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
          >
            Gold Coast Morib <br />
            International Resort
          </h2>
          <p className="text-zinc-500">
            Nestled in the most central location of Malaysia, this resort offers
            a serene escape untouched by monsoon winds or seasonal rains,
            ensuring perfect weather all year round.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-between mt-4 sm:mt-8">
            <ul className="flex flex-row sm:flex-col gap-12 justify-between sm:justify-start">
              <li className={itemClassName}>
                <Cellar className="w-12 h-12" />
                Stay
              </li>
              <li className={itemClassName}>
                <SeaWaves className="w-12 h-12" />
                Play
              </li>
              <li className={itemClassName}>
                <Yoga className="w-12 h-12" />
                Relax
              </li>
            </ul>
            <div className="flex flex-col gap-4 p-4 sm:p-8 w-full max-w-xl bg-amber-500/30">
              <h2
                className={`text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
              >
                More Than A Stay
              </h2>
              <p className="text-zinc-500">
                Just 30–60 minutes from Kuala Lumpur and KLIA on weekends, this
                resort lets you avoid the long holiday traffic jams of Malacca
                or Kuantan, save on tolls that can practically cover your stay,
                and spend more precious time enjoying stunning sea views,
                exciting water parks, and the vibrant SKY World.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col py-4 sm:py-24 gap-8 sm:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-lg sm:text-xl text-amber-500">Activities</span>
          <h2
            className={`relative inline-block w-fit px-2 text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className}`}
          >
            <motion.span
              className="absolute inset-0 bg-amber-400/50 block pointer-events-none"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />
            <span className="relative z-20 text-zinc-800">
              Savor the Journey
            </span>
          </h2>
          <p className="text-zinc-500">
            A wide variety of activities designed for fun, adventure, and
            connection, from team-building experiences to kayaking on the water
            and a lively play park perfect for families.
          </p>
        </div>
        <div className="w-full border-t border-red-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-full h-96"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Image
                fill
                src={src}
                alt={`Activities Banner ${index + 1}`}
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col -mx-4 sm:-mx-24 py-8 sm:py-24 bg-zinc-200">
        <div className="flex flex-col gap-8 sm:gap-16 px-4 sm:px-24">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-center">
            <h2
              className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-amber-500`}
            >
              Stay In <br />
              Your Comfort
            </h2>
            <p className="text-zinc-500">
              Enjoy a restful stay in our carefully curated rooms and villas,
              equipped with everything you need to recharge and feel at ease.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            <ImageCarousel items={accomodationsData} />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 sm:py-24 gap-8 sm:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-lg sm:text-xl text-amber-500">
            Memories Begin Here
          </span>
          <h2
            className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
          >
            Adventure is <br />
            for everyone
          </h2>
          <p className="text-zinc-500">
            Where every family can relax, explore, and create lasting memories.
            Enjoy fun activities, cozy accommodations, and moments that bring
            everyone together. <br />
            <br />
            <Link href="/">
              <button className="px-6 py-4 w-full sm:w-fit text-amber-500 border border-amber-500 bg-white hover:text-white hover:border hover:bg-amber-500">
                Start Your Story Today
              </button>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
