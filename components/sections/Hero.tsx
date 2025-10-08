import Image from "next/image";
import Link from "next/link";
import { Bed, Swimming, Cutlery } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";

export default function HeroSection() {
  return (
    <section className="-mt-28 sm:-mt-40">
      <div className="relative w-full h-[960px]">
        <Image
          fill
          src="/Images/hero-banner-1.png"
          alt="Gold Coast Morib International Resort Hero Banner"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white">
          <h1 className="text-lg sm:text-xl">Discover The Beauty</h1>
          <p
            className={`text-center text-4xl sm:text-6xl font-medium ${cormorantGaramond.className}`}
          >
            Gold Coast Morib <br /> International Resort
          </p>
          <div className="flex flex-col sm:flex-row mt-16 gap-8">
            <Link
              href="/booking"
              className="flex flex-col gap-4 px-16 py-6 max-w-2xl items-center justify-center text-zinc-800 bg-white hover:text-white hover:bg-amber-500"
            >
              <Bed className="w-8 h-8" />
              Comfortable Stay
            </Link>
            <Link
              href="/theme-park"
              className="flex flex-col gap-4 px-16 py-6 max-w-2xl items-center justify-center text-zinc-800 bg-white hover:text-white hover:bg-amber-500"
            >
              <Swimming className="w-8 h-8" />
              Joyful Moments
            </Link>
            <Link
              href="/restaurant"
              className="flex flex-col gap-4 px-16 py-6 max-w-2xl items-center justify-center text-zinc-800 bg-white hover:text-white hover:bg-amber-500"
            >
              <Cutlery className="w-8 h-8" />
              Delightful Dining
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
