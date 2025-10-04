"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cormorantGaramond } from "@/config/fonts";

export default function GallerySection() {
  return (
    <section className="flex flex-col px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-center">
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-amber-500`}
        >
          Every picture <br />
          tells your story
        </h2>
        <p className="text-zinc-500">
          A collection of memories you can see, relive, and never forget.
        </p>
      </div>
      <div className="-mx-4 sm:-mx-64">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full sm:w-1/2 h-72 sm:h-[640px]"
          >
            <Image
              fill
              src="/Images/gallery-banner-1.jpg"
              alt="Gold Coast Morib International Resort Gallery Banner 1"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-8 sm:gap-16 w-full sm:w-1/2"
          >
            <div className="relative w-full h-[288px]">
              <Image
                fill
                src="/Images/gallery-banner-2.jpg"
                alt="Gold Coast Morib International Resort Gallery Banner 2"
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[288px]">
              <Image
                fill
                src="/Images/gallery-banner-3.jpg"
                alt="Gold Coast Morib International Resort Gallery Banner 3"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <h2
        className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
      >
        Peaceful morning… <br />
        Joyful laugh…
      </h2>
      <p className="text-zinc-500">
        Soulful sunsets, quiet corners, golden light, heartfelt moments,
        memories captured forever in a single frame.
      </p>
    </section>
  );
}
