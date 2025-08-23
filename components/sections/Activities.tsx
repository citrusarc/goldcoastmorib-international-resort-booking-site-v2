"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cormorantGaramond } from "@/config/fonts";
import ImageCarousel from "../ui/ImageCarousel";

export default function ActivitiesSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("activities-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - rect.bottom / (rect.height + windowHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateX = 100 - scrollProgress * 200;

  return (
    <section
      id="activities-section"
      className="relative flex flex-col mt-8 sm:mt-16 px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 overflow-x-hidden bg-zinc-200"
    >
      <h2
        className={`absolute left-1/2 [top:-4%] sm:[top:-6%] transform -translate-x-1/2 whitespace-nowrap text-4xl sm:text-8xl font-semibold ${cormorantGaramond.className} text-amber-500`}
        style={{
          transform: `translateX(${translateX}%) translateX(-50%)`,
        }}
      >
        Your Getaway, Your Hideaway
      </h2>
      <div className="flex flex-col gap-4">
        <span className="text-lg sm:text-xl text-amber-500">
          Feel the Moment
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
            Your Next Adventure
          </span>
        </h2>
        <p className="text-zinc-500">
          Dive into culture, uncover secrets, and create stories worth sharing.
        </p>
      </div>
      <ImageCarousel
        images={[
          "/Images/hero-banner-1.png",
          "/Images/hero-banner-1.png",
          "/Images/hero-banner-1.png",
        ]}
        className="relative w-full h-96 sm:h-120"
      />
    </section>
  );
}
