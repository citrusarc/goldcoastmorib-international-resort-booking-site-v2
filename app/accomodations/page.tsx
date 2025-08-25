import Image from "next/image";

import { cormorantGaramond } from "@/config/fonts";
import { rooms } from "@/data/rooms";
import { Cellar, SeaWaves, Yoga } from "iconoir-react";

export default function AccomodationsPage() {
  return (
    <section className="-mt-28 sm:-mt-40">
      <div className="relative w-full h-[640px] sm:h-[960px]">
        <Image
          fill
          src="/Images/hero-banner-1.png"
          alt="Gold Coast Morib International Resort Hero Banner"
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
        <div
          key={item.id}
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
              <span>Starting from</span>
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
          </div>
          <div className="relative w-full sm:w-1/2 h-72 sm:h-[560px]">
            <Image
              fill
              src="/Images/hero-banner-1.png"
              alt="Gold Coast Morib International Resort Overview"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
