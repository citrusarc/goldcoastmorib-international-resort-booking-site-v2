import Image from "next/image";

import { cormorantGaramond } from "@/config/fonts";

export default function HeroSection() {
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
          <h1 className="text-lg sm:text-xl">Discover The Beauty</h1>
          <p
            className={`text-center text-4xl sm:text-6xl font-medium ${cormorantGaramond.className}`}
          >
            Gold Coast Morib <br /> International Resort
          </p>
        </div>
      </div>
    </section>
  );
}
