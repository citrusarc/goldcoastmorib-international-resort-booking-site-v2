"use client";

import Image from "next/image";
import { useRef, useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { NavArrowDown } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { AccommodationsItem, SearchErrors } from "@/types";
import { formatDate } from "@/utils/formatDate";

function BookingContent() {
  const router = useRouter();
  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const [dateRangeUI, setDateRangeUI] = useState("");
  const [adult, setAdult] = useState(2);
  const [children, setChildren] = useState(0);
  const [filteredAccommodations, setFilteredAccommodations] = useState<
    AccommodationsItem[]
  >([]);
  const [errors, setErrors] = useState<SearchErrors>({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalGuests = adult + children;
  const label =
    totalGuests > 0
      ? `${adult} Adult${adult > 1 ? "s" : ""}${
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
      minDate: "today",
      onClose: (selectedDates, dateStr) => {
        if (selectedDates.length === 2) {
          const [checkin, checkout] = selectedDates;
          setDateRange(dateStr.replace(" to ", " - "));
          const formattedUi = `${formatDate(checkin)} - ${formatDate(
            checkout
          )}`;
          setDateRangeUI(formattedUi);
          input.value = formattedUi;
          input.classList.remove("placeholder:text-zinc-200");
          input.classList.add("text-zinc-800");
        }
      },
    });
  }, []);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        setLoading(true);
        const res = await fetch("/api/accommodations");
        if (!res.ok) throw new Error("Failed to fetch accommodations");
        const data = await res.json();
        setFilteredAccommodations(
          Array.isArray(data) ? data : data.accommodations || []
        );
      } catch (err) {
        console.error("Error fetching accommodations:", err);
        setErrorMessage("Failed to load accommodations");
      } finally {
        setLoading(false);
      }
    }
    fetchAccommodations();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const [checkin, checkout] = dateRange ? dateRange.split(" - ") : ["", ""];
    const newErrors: { dates?: string; guests?: string } = {};

    if (!checkin || !checkout) {
      newErrors.dates = "This field cannot be empty";
    }
    if (totalGuests < 1) {
      newErrors.guests = "Please select at least 1 guest.";
    }

    // Validate dates
    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
        newErrors.dates = "Invalid date format";
      } else if (checkinDate >= checkoutDate) {
        newErrors.dates = "Check-out date must be after check-in date";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage("Please correct the errors in the form");
      return;
    }

    setErrors({});
    setErrorMessage(null);

    let url = "/api/accommodations";
    if (checkin && checkout) {
      url = `/api/accommodations/availability?checkin=${checkin}&checkout=${checkout}&guests=${totalGuests}`;
    }

    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch accommodations");
      const data = await res.json();
      const accommodations = Array.isArray(data)
        ? data
        : data.accomodations || [];
      const filtered = accommodations.filter(
        (accommodations: AccommodationsItem) =>
          totalGuests <= accommodations.maxGuests
      );
      setFilteredAccommodations(filtered);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error("Error searching accommodations:", err);
      setErrorMessage("Failed to search accommodations");
      setFilteredAccommodations([]);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !!(dateRange && totalGuests > 0);

  return (
    <section className="-mt-28 sm:-mt-40">
      {errorMessage && (
        <div className="p-4 w-full max-w-2xl mx-auto rounded-xl bg-red-100 text-red-600">
          {errorMessage}
        </div>
      )}
      <div className="relative w-full h-screen">
        <Image
          fill
          src="/Images/booking-hero-banner.jpg"
          alt="Gold Coast Morib International Resort Booking Hero Banner"
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
                    value={dateRangeUI}
                    className={`p-4 w-full rounded-xl cursor-pointer border text-zinc-800 placeholder:text-zinc-400 focus:outline-none 
                      ${
                        errors.dates
                          ? "border-red-500"
                          : "border-zinc-200 focus:ring-amber-500 focus:border-amber-500"
                      }`}
                    onChange={() => {
                      if (
                        (
                          document.getElementById(
                            "date-range"
                          ) as HTMLInputElement
                        )?.value
                      ) {
                        setErrors((prev) => ({ ...prev, dates: undefined }));
                        setErrorMessage(null);
                      }
                    }}
                  />
                  {errors.dates && (
                    <p className="mt-2 text-red-500">{errors.dates}</p>
                  )}
                </div>

                {/* Guest */}
                <div
                  ref={guestDropdownRef}
                  className="relative form-control w-full sm:w-xs"
                >
                  <div
                    onClick={() => setOpen(!open)}
                    className={`p-4 pr-12 w-full rounded-xl cursor-pointer border text-zinc-800 placeholder:text-zinc-400 focus-within:ring-amber-500 
                      ${
                        errors.guests
                          ? "border-red-500"
                          : "border-zinc-200 focus-within:border-amber-500"
                      }`}
                  >
                    {totalGuests === 0 ? (
                      <span className="text-zinc-400">Guests</span>
                    ) : (
                      label
                    )}
                  </div>
                  {errors.guests && (
                    <p className="mt-2 text-red-500">{errors.guests}</p>
                  )}
                  <NavArrowDown
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    } text-zinc-400`}
                    width={20}
                    height={20}
                  />

                  {open && (
                    <div className="absolute z-10 p-4 mt-2 space-y-4 w-full rounded-xl bg-white border border-zinc-200">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-800">
                          {adult} Adult{adult > 1 ? "s" : ""}
                        </span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              const next = Math.max(1, adult - 1);
                              setAdult(next);
                              if (next + children > 0) {
                                setErrors((prev) => ({
                                  ...prev,
                                  guests: undefined,
                                }));
                                setErrorMessage(null);
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            −
                          </button>
                          <span>{adult}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = adult + 1;
                              setAdult(next);
                              if (next + children > 0) {
                                setErrors((prev) => ({
                                  ...prev,
                                  guests: undefined,
                                }));
                                setErrorMessage(null);
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-800">
                          {children} Child{children > 1 ? "ren" : ""}
                        </span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              const next = Math.max(0, children - 1);
                              setChildren(next);
                              if (adult + next > 0) {
                                setErrors((prev) => ({
                                  ...prev,
                                  guests: undefined,
                                }));
                                setErrorMessage(null);
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-800"
                          >
                            −
                          </button>
                          <span>{children}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = children + 1;
                              setChildren(next);
                              if (adult + next > 0) {
                                setErrors((prev) => ({
                                  ...prev,
                                  guests: undefined,
                                }));
                                setErrorMessage(null);
                              }
                            }}
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
                    disabled={!isFormValid}
                    className={`px-6 py-4 w-full font-medium rounded-xl  
                      ${
                        isFormValid
                          ? "text-white bg-amber-500 hover:bg-amber-600"
                          : "text-zinc-400 bg-gray-200 cursor-not-allowed"
                      }`}
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
          ) : filteredAccommodations.length === 0 ? (
            <p className="text-zinc-500">
              No rooms available for your selection.
            </p>
          ) : (
            filteredAccommodations.map((accommodations, index) => (
              <motion.div
                key={accommodations.id}
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
                    src={accommodations.image}
                    alt={accommodations.alt}
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col flex-grow gap-4 p-4">
                  <h2
                    className={`text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
                  >
                    {accommodations.name}
                  </h2>
                  <p className="text-zinc-500">{accommodations.description}</p>
                  <p className="flex flex-col gap-2 text-zinc-500">
                    <span className="text-amber-500">Starting from</span>
                    <span>
                      <span className="text-xl sm:text-2xl text-zinc-800">
                        {accommodations.price.currency}
                        {accommodations.price.current}
                      </span>
                      <span className="text-lg sm:text-2xl text-zinc-500">
                        /night
                      </span>
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      let [checkin, checkout] = dateRange
                        ? dateRange.split(" - ")
                        : ["", ""];

                      if (!checkin || !checkout) {
                        const today = new Date();
                        const tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);

                        checkin = today.toISOString().split("T")[0];
                        checkout = tomorrow.toISOString().split("T")[0];
                      }

                      const safeAdult = adult > 0 ? adult : 1;

                      // Validate dates before navigation
                      const checkinDate = new Date(checkin);
                      const checkoutDate = new Date(checkout);
                      if (
                        isNaN(checkinDate.getTime()) ||
                        isNaN(checkoutDate.getTime())
                      ) {
                        setErrorMessage("Invalid date format");
                        return;
                      }
                      if (checkinDate >= checkoutDate) {
                        setErrorMessage(
                          "Check-out date must be after check-in date"
                        );
                        return;
                      }
                      router.push(
                        `/booking/${accommodations.id}?checkin=${checkin}&checkout=${checkout}&adult=${safeAdult}&children=${children}`
                      );
                    }}
                    className="mt-auto px-6 py-3 w-full font-medium rounded-xl text-white bg-amber-500 hover:bg-amber-600"
                  >
                    Reserve Now
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
