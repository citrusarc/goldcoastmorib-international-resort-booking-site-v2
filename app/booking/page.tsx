"use client";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { NavArrowDown } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { rooms } from "@/data/rooms";
import { RoomItem } from "@/types";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdFromQuery = searchParams.get("roomId");
  const [filteredRooms, setFilteredRooms] = useState<RoomItem[]>(rooms);
  const [open, setOpen] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const supabase = createClientComponentClient();

  const totalGuests = adults + children;
  const label =
    totalGuests > 0
      ? `${adults} Adult${adults > 1 ? "s" : ""}${
          children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""
        }`
      : "Guests";

  useEffect(() => {
    if (roomIdFromQuery) {
      const preselectedRoom = rooms.find((room) => room.id === roomIdFromQuery);
      if (preselectedRoom) {
        setSelectedRoom(preselectedRoom);
      }
    }
  }, [roomIdFromQuery]);

  useEffect(() => {
    const input = document.getElementById("date-range") as HTMLInputElement;
    if (!input) return;

    flatpickr(input, {
      mode: "range",
      dateFormat: "d/m/Y",
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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const checkin = form.get("checkin") as string;
    const checkout = form.get("checkout") as string;
    const roomId = form.get("room") as string;
    const adults = Number(form.get("adults") || 1);
    const kids = Number(form.get("kids") || 0);

    console.log({ checkin, checkout, roomId, adults, kids });

    let query = supabase.from("rooms").select("*");

    if (roomId) {
      query = query.eq("slug", roomId);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(data.length ? (data as RoomItem[]) : rooms);
    }

    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
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

                {/* Rooms */}
                <div className="relative form-control w-full sm:w-xs">
                  <div
                    onClick={() => setOpenRoom(!openRoom)}
                    className="p-4 pr-12 w-full rounded-xl cursor-pointer border border-zinc-200 text-zinc-800 placeholder:text-zinc-400 focus-within:ring-amber-500 focus-within:border-amber-500"
                  >
                    {selectedRoom ? (
                      <span>{selectedRoom.name}</span>
                    ) : (
                      <span className="text-zinc-400">
                        Pick your perfect room
                      </span>
                    )}
                  </div>

                  <NavArrowDown
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                      openRoom ? "rotate-180" : ""
                    } text-zinc-400`}
                    width={20}
                    height={20}
                  />

                  {openRoom && (
                    <div className="absolute z-10 p-2 mt-2 space-y-2 w-full rounded-xl bg-white border border-zinc-200 shadow-lg">
                      {rooms.map((room) => (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => {
                            setSelectedRoom(room);
                            setOpenRoom(false);
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-100 text-zinc-800"
                        >
                          {room.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Guest */}
                <div className="relative form-control w-full sm:w-xs">
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
        className="flex flex-col mt-8 sm:mt-16 p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16"
      >
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeIn", delay: index * 0.1 }}
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
          ))}
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
