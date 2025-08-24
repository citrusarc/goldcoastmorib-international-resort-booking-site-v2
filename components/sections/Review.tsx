import { StarSolid } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";

export default function ReviewSection() {
  return (
    <section className="flex flex-col mt-8 sm:mt-16 p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-center justify-center text-center">
      <div className="flex flex-col gap-8">
        <h2
          className={`relative inline-block text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Moments Made, Memories Shared
        </h2>
        <div className="flex flex-row w-full items-center justify-center gap-4 text-slate-800">
          <StarSolid className="w-8 h-8 text-amber-500" />
          <StarSolid className="w-8 h-8 text-amber-500" />
          <StarSolid className="w-8 h-8 text-amber-500" />
          <StarSolid className="w-8 h-8 text-amber-500" />
        </div>
        <p className="text-zinc-500">4-star review on Google</p>
      </div>
    </section>
  );
}
