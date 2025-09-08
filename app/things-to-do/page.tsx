"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { activities } from "@/data/activities";
import { cormorantGaramond } from "@/config/fonts";

export default function ThingsToDoPage() {
  return (
    <section className="flex flex-col p-4 sm:p-24 gap-8 sm:gap-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:flex-row gap-8 sm:gap-16"
      >
        <div className="relative w-full sm:w-1/2 h-72 sm:h-[640px]">
          <Image
            fill
            src="/Images/things-to-do-hero-banner-1.jpg"
            alt="Gold Coast Morib International Resort Things To Do Hero Banner 1"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-lg sm:text-xl text-amber-500">
            A Sense Of Freedom
          </span>
          <h2
            className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
          >
            Must-Do Activities <br />
            During Your Holiday
          </h2>
          <p className="text-zinc-500">
            Take a break from the ordinary with activities designed to refresh
            your mind, body, and soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-8 sm:mt-24 w-full h-full justify-between bg-amber-500/30">
            <div className="flex flex-col gap-4">
              <h2
                className={`text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
              >
                Beachside Adventures
              </h2>
              <p className="text-zinc-500">
                Dive into seaside fun with hands-on activities like fishing,
                crab hunting, and clam digging. Explore the wonders of the coast
                while creating unforgettable memories by the shore.
              </p>
            </div>
            <div className="relative w-full sm:w-4/3 h-72 sm:h-full">
              <Image
                fill
                src="/Images/things-to-do-hero-banner-2.jpg"
                alt="Gold Coast Morib International Resort Things To Do Hero Banner 2"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <div className="-mx-4 sm:-mx-24 py-8 sm:py-24">
        <div
          className="relative w-full h-[560px] sm:h-[800px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/Images/things-to-do-image-seperator.jpg')",
          }}
        >
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white">
            <h1 className="text-lg sm:text-xl">
              Sunrise Strolls To Sunset Adventures
            </h1>
            <p
              className={`text-center text-4xl sm:text-6xl ${cormorantGaramond.className}`}
            >
              Make Every <br /> Moment Count
            </p>
          </div>
        </div>
      </div>

      {activities.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={item.id}
            className="relative flex flex-col sm:flex-row gap-8 sm:gap-16 py-8 sm:py-24 items-center"
          >
            <div
              className={`absolute top-24 w-[360px] sm:w-[640px] h-[300px] bg-gradient-to-r ${
                isEven
                  ? "left-10 from-amber-500/30 to-transparent"
                  : "right-10 from-transparent to-amber-500/30"
              } z-0`}
            />

            <div
              className={`relative hidden sm:block w-96 aspect-square z-10 ${
                isEven ? "order-1" : "order-3"
              }`}
            >
              <Image
                fill
                src={isEven ? item.image1 : item.image2}
                alt="Gold Coast Morib International Resort Activity Image 1"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 order-1 sm:order-2 z-10">
              <h2
                className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
              >
                {item.name}
              </h2>
              <div className="w-full border-t border-red-500" />
              <p className="text-zinc-500">{item.description}</p>
            </div>
            <div
              className={`relative w-full sm:w-1/2 h-72 sm:h-[640px] ${
                isEven ? "order-3" : "order-1"
              }`}
            >
              <Image
                fill
                src={isEven ? item.image2 : item.image1}
                alt="Gold Coast Morib International Resort Activity Image 2"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
