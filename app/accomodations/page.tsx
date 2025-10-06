"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cormorantGaramond } from "@/config/fonts";
import { rooms } from "@/data/rooms";

export default function AccomodationsPage() {
  return (
    <section className="-mt-28 sm:-mt-40">
      <div className="relative w-full h-[640px] sm:h-[960px]">
        <Image
          fill
          src="/Images/accomodations-hero-banner.jpg"
          alt="Gold Coast Morib International Resort Accomodations Hero Banner"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white">
          <h1 className="text-lg sm:text-xl">Stay In Comfort</h1>
          <p
            className={`text-center text-4xl sm:text-6xl ${cormorantGaramond.className}`}
          >
            Spacious Stays <br /> Memorable Moments
          </p>
        </div>
      </div>

      {rooms.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className={`flex flex-col sm:flex-row px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-start sm:items-center ${
            index % 2 !== 0 ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className="flex flex-col gap-8">
            <h2
              className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
            >
              {item.name}
            </h2>
            <p className="text-zinc-500">{item.description}</p>
            <ul className="flex flex-row sm:flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
              {item.facilities?.map((item) => {
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
              <span>
                <span className="text-2xl sm:text-4xl text-zinc-800">
                  {item.price.currency}
                  {item.price.current}
                </span>
                <span className="text-xl sm:text-2xl text-zinc-500">
                  /night
                </span>
              </span>
            </p>
            <Link href={`/accomodations/${item.id}`}>
              <button className="px-6 py-4 w-full sm:w-fit text-white bg-amber-500 hover:bg-amber-600">
                View Rooms
              </button>
            </Link>
          </div>
          <div className="relative w-full sm:w-1/2 h-72 sm:h-[560px]">
            <Image
              fill
              src={item.image}
              alt={item.alt}
              className="object-cover"
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
}
