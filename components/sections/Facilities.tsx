"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cormorantGaramond } from "@/config/fonts";

export default function FacilitiesSection() {
  return (
    <section className="flex flex-col mt-8 sm:mt-16 p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16">
      <div className="flex flex-col gap-4">
        <span className="text-lg sm:text-xl text-amber-500">
          Plan Your Stay
        </span>
        <h2
          className={`relative inline-block text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Create Your Own Adventure
          <motion.span
            className="absolute left-0 bottom-0 h-[2px] w-full bg-amber-500 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </h2>
        <p className="text-zinc-500">
          Find comfort, convenience, and everything you need for the perfect
          escape, designed around the way you want to unwind.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
        <div className="relative w-full h-96">
          <Image
            fill
            src="/Images/hero-banner-1.png"
            alt="Gold Coast Morib International Resort Overview"
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-96">
          <Image
            fill
            src="/Images/hero-banner-1.png"
            alt="Gold Coast Morib International Resort Overview"
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-96">
          <Image
            fill
            src="/Images/hero-banner-1.png"
            alt="Gold Coast Morib International Resort Overview"
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-96">
          <Image
            fill
            src="/Images/hero-banner-1.png"
            alt="Gold Coast Morib International Resort Overview"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
