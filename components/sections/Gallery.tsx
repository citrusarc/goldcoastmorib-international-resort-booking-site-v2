import Image from "next/image";

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
          <div className="relative w-full sm:w-1/2 h-72 sm:h-[640px]">
            <Image
              fill
              src="/Images/hero-banner-1.png"
              alt="Gold Coast Morib International Resort Gallery Image 1"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 sm:gap-16 w-full sm:w-1/2">
            <div className="relative w-full h-[288px]">
              <Image
                fill
                src="/Images/hero-banner-1.png"
                alt="Gold Coast Morib International Resort Gallery Image 2"
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[288px]">
              <Image
                fill
                src="/Images/hero-banner-1.png"
                alt="Gold Coast Morib International Resort Gallery Image 3"
                className="object-cover"
              />
            </div>
          </div>
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
