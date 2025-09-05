"use client";

import Image from "next/image";
import { useRef, useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { NavArrowDown } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { RoomItem } from "@/types";

function BookingContent() {
  const router = useRouter();
  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [filteredRooms, setFilteredRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(true);

  const totalGuests = adults + children;
  const label =
    totalGuests > 0
      ? `${adults} Adult${adults > 1 ? "s" : ""}${
          children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""
        }`
      : "Guests";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const input = document.getElementById("date-range") as HTMLInputElement;
    if (!input) return;

    flatpickr(input, {
      mode: "range",
      dateFormat: "Y-m-d",
      allowInput: false,
      onClose: (selectedDates, dateStr) => {
        if (dateStr) {
          input.value = dateStr.replace(" to ", " - ");
          input.classList.remove("placeholder:text-zinc-200");
          input.classList.add("text-zinc-800");
        }
      },
    });
  }, []);

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const res = await fetch("/api/rooms");
        const data: RoomItem[] = await res.json();
        setFilteredRooms(data);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = document.getElementById("date-range") as HTMLInputElement;
    const [checkin, checkout] = input?.value
      ? input.value.split(" - ")
      : ["", ""];

    let url = "/api/rooms";
    if (checkin && checkout) {
      url = `/api/rooms/availability?checkin=${checkin}&checkout=${checkout}&guests=${totalGuests}`;
    }

    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch rooms");
      const data: RoomItem[] = await res.json();
      setFilteredRooms(data);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
      setFilteredRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="-mt-28 sm:-mt-40">
      <div className="relative w-full h-screen">
        <Image
          fill
          src="/Images/booking-hero-banner.jpg"
          alt="Gold Coast Morib International Resort Hero Banner"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white">
          <h1 className="text-lg sm:text-xl">Your Getaway Starts Here</h1>
          <p
            className={`text-center text-4xl sm:text-6xl ${cormorantGaramond.className}`}
          >
            Your Perfect Dates <br />
            Unforgettable Funs
          </p>

          <div className="mt-8 sm:mt-24 px-4 w-full sm:w-fit">
            <div className="p-4 rounded-2xl text-zinc-800 bg-white">
              <form
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={handleSearch}
              >
                {/* Date Range */}
                <div className="form-control w-full sm:w-xs">
                  <input
                    readOnly
                    id="date-range"
                    type="text"
                    placeholder="Check-in date - Check-out date"
                    className="p-4 w-full rounded-xl cursor-pointer border border-zinc-200 text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                {/* Guest */}
                <div
                  ref={guestDropdownRef}
                  className="relative form-control w-full sm:w-xs"
                >
                  <div
                    onClick={() => setOpen(!open)}
                    className="p-4 pr-12 w-full rounded-xl cursor-pointer border border-zinc-200 text-zinc-800 placeholder:text-zinc-400 focus-within:ring-amber-500 focus-within:border-amber-500"
                  >
                    {totalGuests === 0 ? (
                      <span className="text-zinc-400">Guests</span>
                    ) : (
                      label
                    )}
                  </div>
                  <NavArrowDown
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    } text-zinc-400`}
                    width={20}
                    height={20}
                  />

                  {open && (
                    <div className="absolute z-10 p-4 mt-2 space-y-4 w-full  rounded-xl bg-white border border-zinc-200">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-800">Adults</span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            −
                          </button>
                          <span>{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults(adults + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-800">Children</span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              setChildren(Math.max(0, children - 1))
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            −
                          </button>
                          <span>{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren(children + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Button */}
                <div className="form-control self-end w-full sm:w-36">
                  <button
                    type="submit"
                    className="px-6 py-4 w-full font-medium rounded-xl text-white bg-amber-500"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section
        id="results"
        ref={resultsRef}
        className="flex flex-col mt-8 sm:mt-16 p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16"
      >
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-zinc-500">Loading rooms...</p>
          ) : filteredRooms.length === 0 ? (
            <p className="text-zinc-500">
              No rooms available for your selection.
            </p>
          ) : (
            filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeIn",
                  delay: index * 0.1,
                }}
                className="flex flex-col w-full min-h-[480px] rounded-2xl overflow-hidden border border-zinc-200"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    fill
                    src={room.image}
                    alt={room.alt}
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex flex-col flex-grow gap-4 p-4">
                  <h2
                    className={`text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
                  >
                    {room.name}
                  </h2>
                  <p className="text-zinc-500">{room.description}</p>

                  <p className="flex flex-col gap-2 text-zinc-500">
                    <span className="text-amber-500">Starting from</span>
                    <span>
                      <span className="text-xl sm:text-2xl text-zinc-800">
                        {room.price.currency}
                        {room.price.current}
                      </span>
                      <span className="text-lg sm:text-2xl text-zinc-500">
                        /night
                      </span>
                    </span>
                  </p>

                  <button
                    onClick={() => {
                      const input = document.getElementById(
                        "date-range"
                      ) as HTMLInputElement;
                      const [checkin, checkout] = input?.value
                        ? input.value.split(" - ")
                        : ["", ""];

                      router.push(
                        `/booking/${room.id}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&kids=${children}`
                      );
                    }}
                    className="mt-auto px-6 py-3 w-full font-medium rounded-xl text-white bg-amber-500"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
