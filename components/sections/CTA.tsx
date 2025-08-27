import Link from "next/link";

import { cormorantGaramond } from "@/config/fonts";

export default function CTASection() {
  return (
    <section className="flex flex-col mt-8 sm:mt-16 px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-center justify-center text-center bg-zinc-200">
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <h2
          className={`relative inline-block text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Your Beachfront Escape Awaits
        </h2>
        <p className="text-zinc-500">
          Whether it’s a weekend retreat or a long-awaited holiday, the perfect
          stay begins here.
        </p>
        <Link href="/booking">
          <button className="px-6 py-4 w-full sm:w-fit text-white bg-amber-500 hover:text-amber-500 hover:bg-white">
            Plan Your Escape
          </button>
        </Link>
      </div>
    </section>
  );
}
