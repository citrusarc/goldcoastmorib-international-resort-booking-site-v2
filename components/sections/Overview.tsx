"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cormorantGaramond } from "@/config/fonts";

export default function OverviewSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col sm:flex-row mt-8 sm:mt-16 p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16"
    >
      <div className="flex flex-col gap-4">
        <span className="text-lg sm:text-xl text-amber-500">
          Gold Coast Morib
        </span>
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Seaside Gem on Selangor&apos;s Tranquil Coast
        </h2>
        <p className="text-zinc-500">
          Wake up to the gentle rhythm of the waves, unwind in your private
          bathtub, and create unforgettable moments with the kids at the on-site
          water theme park.
        </p>
      </div>
      <div className="relative w-full sm:w-1/2 h-72">
        <Image
          fill
          src="/Images/overview-banner-1.png"
          alt="Gold Coast Morib International Resort Overview"
          className="object-cover"
        />
      </div>
    </motion.section>
  );
}
