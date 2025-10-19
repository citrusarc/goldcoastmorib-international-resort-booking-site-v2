"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LightBulbOn } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";

export default function RestaurantPage() {
  const images = [
    "/Images/theme-park-banner-2.jpg",
    "/Images/theme-park-banner-3.jpg",
    "/Images/theme-park-banner-4.jpg",
    "/Images/theme-park-banner-5.jpg",
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
        <div className="flex flex-col gap-4 w-full sm:w-2/3">
          <span className="text-lg sm:text-xl text-amber-500">
            Gold Coast Morib Waterpark
          </span>
          <h2
            className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
          >
            Family Water Wonderland
          </h2>
          <p className="text-zinc-500">
            Spend afternoons riding family slides, floating the lazy river, and
            letting little ones giggle in the shallow splash playground. With
            beachfront views, food kiosks, and poolside services. Perfect for
            couples, families and groups seeking sun and splashy memories.
          </p>
          <div className="flex flex-col gap-4 p-4 sm:p-8 w-full max-w-xl bg-amber-500/30">
            <h2
              className={`flex gap-4 items-center text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
            >
              <LightBulbOn className="w-6 sm:w-8 h-6 sm:h-8 " /> Visitor Tips
            </h2>
            <p className="text-zinc-500">
              Water theme park operates daily from 9:00 AM to 7:00 PM, featuring
              slides, splash pools, and play zones for all ages. Guests staying
              at the resort often enjoy complimentary park access, while day
              visitors can purchase tickets (around RM 35 for adults and RM 25
              for children).
            </p>
          </div>
        </div>
        <div className="relative w-full sm:w-1/3 aspect-square">
          <Image
            fill
            src="/Images/theme-park-banner-1.jpg"
            alt="Gold Coast Morib International Resort Theme Park Banner"
            className="object-cover"
          />
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
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
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
      </div>
      <div className="flex flex-col my-24 gap-8 sm:gap-16">
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
              Splash, Slide & Soak
            </span>
          </h2>
          <p className="text-zinc-500">
            Thrilling slides, splash pools, and fun zones perfect for both kids
            and adults to cool off under the tropical sun.
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
