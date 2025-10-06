"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { cormorantGaramond } from "@/config/fonts";
import { rooms } from "@/data/rooms";

export default function AccomodationsDetailsPage() {
  const { slug } = useParams();
  const room = rooms.find((item) => item.id === slug);

  if (!room) {
    return (
      <section className="px-4 py-16 text-center text-zinc-500">
        Room not found.
      </section>
    );
  }
  return (
    <section className="px-4 sm:px-64 py-16 flex flex-col gap-8">
      {/* // // Hero Image */}
      <div className="relative w-full h-[400px] sm:h-[640px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          fill
          src={room.image} // //
          alt={room.alt} // //
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className={`text-5xl sm:text-7xl ${cormorantGaramond.className}`}>
            {room.name} {/* // // */}
          </h1>
        </div>
      </div>

      {/* // // Room Details */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-center">
        <div className="flex-1 flex flex-col gap-6">
          <p className="text-zinc-600 leading-relaxed">{room.description}</p>

          {/* // // Facilities */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {room.facilities?.map((item) => {
              if (!item.icon) return null;
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-zinc-600"
                >
                  <Icon className="w-6 h-6 text-amber-500" />
                  {item.label}
                </li>
              );
            })}
          </ul>

          {/* // // Price & CTA */}
          <div className="mt-4 flex flex-col gap-2 text-zinc-500">
            <span className="text-amber-500">Starting from</span>
            <span>
              <span className="text-2xl sm:text-4xl text-zinc-800">
                {room.price.currency}
                {room.price.current}
              </span>
              <span className="text-xl sm:text-2xl text-zinc-500">/night</span>
            </span>
          </div>

          <Link href={`/booking?roomId=${room.id}`}>
            {" "}
            {/* // // */}
            <button className="px-6 py-4 w-full sm:w-fit text-white bg-amber-500 hover:bg-amber-600">
              Check Availability
            </button>
          </Link>
        </div>

        {/* // // Room Image (optional second image or same image) */}
        <div className="relative w-full sm:w-1/2 h-72 sm:h-[480px]">
          <Image
            fill
            src={room.image}
            alt={room.alt}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
