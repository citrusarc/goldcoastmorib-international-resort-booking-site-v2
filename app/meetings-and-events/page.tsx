"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ImageAutoCarousel from "@/components/ui/ImageAutoCarousel";
import { cormorantGaramond } from "@/config/fonts";

export default function MeetingsAndEventsPage() {
  const images = [
    "/Images/theme-park-banner-2.jpg",
    "/Images/theme-park-banner-3.jpg",
    "/Images/theme-park-banner-4.jpg",
    "/Images/theme-park-banner-5.jpg",
  ];
  return (
    <section className="-mt-28 sm:-mt-40">
      <div className="relative w-full h-[640px] sm:h-[960px]">
        <Image
          fill
          src="/Images/accommodations-hero-banner.jpg"
          alt="Gold Coast Morib International Resort Accommodations Hero Banner"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white">
          <h1 className="text-lg sm:text-xl">Celebrate Together</h1>
          <p
            className={`text-center text-4xl sm:text-6xl ${cormorantGaramond.className}`}
          >
            Crafted for Success <br /> Joyful Gatherings
          </p>
        </div>
      </div>
      <div className="flex flex-col px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 bg-zinc-200">
        <div className="flex flex-col gap-4">
          <span className="text-lg sm:text-xl text-amber-500">
            Bring People Together
          </span>
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
              Celebrate, Collaborate, Connect
            </span>
          </h2>
          <p className="text-zinc-500">
            Modern comfort with attentive service, we ensure every event from
            intimate meetings to grand celebrations runs seamlessly from start
            to finish.
          </p>
        </div>
        <ImageAutoCarousel
          images={[
            "/Images/highlight-banner-1.jpg",
            "/Images/highlight-banner-2.jpg",
            "/Images/highlight-banner-3.jpg",
          ]}
          className="relative w-full h-96 sm:h-120"
        />
      </div>
      <div className="flex flex-col my-24 p-4 sm:px-24 gap-8 sm:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-lg sm:text-xl text-amber-500">
            Event Highlights
          </span>
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
              Celebrate Success For Every Occasion
            </span>
          </h2>
          <p className="text-zinc-500">
            Be it intimate meetings, joyful celebrations, or relaxing corporate
            retreats, experience flawless planning and tropical elegance in
            every detail.
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
    </section>
  );
}
