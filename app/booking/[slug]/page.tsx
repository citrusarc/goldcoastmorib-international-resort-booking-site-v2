"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { NavArrowDown } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { mapRoomData } from "@/lib/mapRoomData";
import { RoomItem, BookingForms } from "@/types";
import { phoneCodes } from "@/lib/phoneCodes";
import { arrivalTimes } from "@/lib/arrivalTimes";

export default function BookingDetailsPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [room, setRoom] = useState<RoomItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openPhoneDropdown, setOpenPhoneDropdown] = useState(false);
  const [openArrivalDropdown, setOpenArrivalDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState(phoneCodes[0]);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const arrivalDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenPhoneDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        arrivalDropdownRef.current &&
        !arrivalDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenArrivalDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [form, setForm] = useState<BookingForms>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    arrivalTime: "",
    request: "",
  });

  const [errors, setErrors] = useState<Partial<BookingForms>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleBlur = (field: keyof BookingForms) => {
    const fieldError = validateField(field);
    setErrors({ ...errors, [field]: fieldError });
  };

  const validateField = (field: keyof BookingForms) => {
    const value = form[field];
    switch (field) {
      case "firstName":
        if (!value?.trim()) return "This field cannot be empty";
        break;
      case "lastName":
        if (!value?.trim()) return "This field cannot be empty";
        break;
      case "email":
        if (!value?.trim()) return "This field cannot be empty";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format";
        break;
      case "phone":
        if (!value?.trim()) return "This field cannot be empty";
        const phoneRegex = /^[0-9]{7,15}$/;
        if (!phoneRegex.test(value)) return "Invalid phone number format";
        break;
      case "arrivalTime":
        if (value?.trim()) {
          const checkin = searchParams.get("checkin");
          if (checkin) {
            const [hours, minutes] = value.split(":").map(Number);
            const arrivalDate = new Date(checkin);
            arrivalDate.setHours(hours || 0, minutes || 0, 0, 0);

            const checkinDate = new Date(checkin);
            checkinDate.setHours(15, 0, 0, 0);

            if (arrivalDate > checkinDate) {
              return "Arrival time cannot be later than check-in time";
            }
          }
        }
        break;
    }
    return undefined;
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${slug}`);
        const data = await res.json();
        setRoom(mapRoomData(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchRoom();
  }, [slug]);

  const validateForm = () => {
    const newErrors: Partial<BookingForms> = {};
    (
      [
        "firstName",
        "lastName",
        "email",
        "phone",
        "arrivalTime",
      ] as (keyof BookingForms)[]
    ).forEach((field) => {
      const error = validateField(field);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const isFormValid = () => {
    const requiredChecks =
      form.firstName.trim() &&
      form.lastName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      /^[0-9]{7,15}$/.test(form.phone);

    const formErrors = validateForm();
    return requiredChecks && Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const checkin = searchParams.get("checkin");
      const checkout = searchParams.get("checkout");
      const adult = parseInt(searchParams.get("adult") || "1", 10);
      const children = parseInt(searchParams.get("children") || "0", 10);

      const payload = {
        roomId: room?.id,
        checkin,
        checkout,
        adult,
        children,
        ...form,
        phone: `${selectedCode.code}${form.phone}`,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "Booking already exists") {
          alert("You already made this booking.");
        } else {
          alert(data.error || "Failed to create booking");
        }
        return;
      }

      alert("Booking confirmed! 🎉");
      router.push("/booking");
    } catch (err) {
      console.error(err);
      alert("Error submitting booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center py-20">Loading room details...</p>;
  if (!room) return <p className="text-center py-20">Room not found</p>;

  const inputStyle = (field?: keyof BookingForms) =>
    `p-4 w-full rounded-xl border text-zinc-800 placeholder:text-zinc-400 focus:outline-none 
    focus:ring-amber-500 focus:border-amber-500 border-zinc-200 ${
      field && errors[field] ? "border-red-500" : ""
    }`;

  return (
    <section className="flex flex-col items-center p-4 sm:px-64 sm:py-24 gap-12">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full">
        {/* Room Info */}
        <div className="flex-1">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              fill
              src={room.image}
              alt={room.alt}
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col flex-grow gap-4 p-4">
            <h2
              className={`text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
            >
              {room.name}
            </h2>
            <p className="text-zinc-500">{room.description}</p>

            <ul className="flex flex-row sm:flex-col gap-4 justify-between sm:justify-start text-center sm:text-start">
              {room.facilities?.map((item) => {
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
            <p className="flex flex-col gap-2 mt-4 p-4 w-fit text-zinc-500 bg-amber-500/30">
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
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 rounded-2xl border border-zinc-200 bg-white">
          <h2
            className={`text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
          >
            Your Booking Details
          </h2>
          {(() => {
            const checkin = searchParams.get("checkin");
            const checkout = searchParams.get("checkout");
            const adult = parseInt(searchParams.get("adult") || "0", 10);
            const children = parseInt(searchParams.get("children") || "0", 10);

            let nights = 0;
            let checkinStr = checkin;
            let checkoutStr = checkout;

            if (checkin && checkout) {
              const checkinDate = new Date(checkin);
              const checkoutDate = new Date(checkout);
              nights =
                (checkoutDate.getTime() - checkinDate.getTime()) /
                (1000 * 60 * 60 * 24);

              const formatter = new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              checkinStr = `${formatter.format(checkinDate)}`;
              checkoutStr = `${formatter.format(checkoutDate)}`;
            }

            const totalGuests = adult + children;
            const guestsLabel =
              totalGuests > 0
                ? `${totalGuests} (${adult} Adult${adult !== 1 ? "s" : ""}${
                    children > 0
                      ? `, ${children} Child${children !== 1 ? "ren" : ""}`
                      : ""
                  })`
                : "0";

            return (
              <div className="flex flex-col gap-4 sm:gap-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-24">
                  <div>
                    <p className="text-zinc-500">Check In:</p>
                    <p>{checkinStr}</p>
                    <p>(3PM – 12AM)</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Check Out:</p>
                    <p>{checkoutStr}</p>
                    <p>(12PM – 1PM)</p>
                  </div>
                </div>
                <div>
                  <p>
                    <span className="text-zinc-500">Total Guests: </span>
                    {guestsLabel}
                  </p>
                </div>
                <div className="w-full border-t border-zinc-200" />
                <div>
                  <p className="flex gap-2 text-center">
                    {room.price.currency}
                    {room.price.current}
                    <span>per night</span>
                    <span>x</span>
                    <span>
                      {nights} Night{nights > 1 ? "s" : ""}
                    </span>
                  </p>
                  <p className="mt-4 text-2xl sm:text-4xl font-medium text-amber-500">
                    Total Price: {room.price.currency}
                    {room.price.current * (nights > 0 ? nights : 1)}
                  </p>
                </div>
              </div>
            );
          })()}

          <div className="w-full border-t border-zinc-200" />

          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-4 sm:gap-8"
          >
            <h2
              className={`text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
            >
              Guest Informations
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="flex px-2 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={inputStyle("firstName")}
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="flex px-2 mb-2">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={inputStyle("lastName")}
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="flex px-2 mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputStyle("email")}
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="flex px-2 mb-2">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div
                  ref={phoneDropdownRef}
                  className="relative flex gap-2 w-full"
                >
                  <div
                    onClick={() => setOpenPhoneDropdown(!openPhoneDropdown)}
                    className="relative p-4 pr-12 w-24 rounded-xl cursor-pointer border text-zinc-800 placeholder:text-zinc-400 focus-within:ring-amber-500 border-zinc-200 focus-within:border-amber-500"
                  >
                    <span>{selectedCode.code}</span>
                    <NavArrowDown
                      className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                        openPhoneDropdown ? "rotate-180" : ""
                      } text-zinc-400`}
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className={inputStyle("phone")}
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                  />
                  {openPhoneDropdown && (
                    <div className="absolute z-10 mt-17 w-full rounded-xl shadow-md border-zinc-200 bg-white border ">
                      {phoneCodes.map((item) => (
                        <div
                          key={item.code}
                          onClick={() => {
                            setSelectedCode(item);
                            setOpenPhoneDropdown(false);
                          }}
                          className="p-4 cursor-pointer text-zinc-800 hover:bg-zinc-100"
                        >
                          {item.emoji} {item.label} ({item.code})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <h2
              className={`text-2xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
            >
              Additional Informations
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="flex px-2 mb-2 gap-2">
                  Early Check In
                  <span className="text-zinc-400">(Optional)</span>
                </label>
                <div ref={arrivalDropdownRef} className="relative w-full">
                  <div
                    onClick={() => setOpenArrivalDropdown(!openArrivalDropdown)}
                    className={`relative p-4 pr-12 w-full rounded-xl cursor-pointer border text-zinc-800 placeholder:text-zinc-400 ${
                      errors.arrivalTime
                        ? "border-red-500"
                        : "border-zinc-200 focus-within:ring-amber-500 focus-within:border-amber-500"
                    }`}
                  >
                    {form.arrivalTime || "Select Arrival Time"}
                    <NavArrowDown
                      className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                        openArrivalDropdown ? "rotate-180" : ""
                      } text-zinc-400`}
                      width={16}
                      height={16}
                    />
                  </div>

                  {openArrivalDropdown && (
                    <div className="absolute z-10 mt-2 w-full rounded-xl bg-white border border-zinc-200 shadow-md">
                      {arrivalTimes.map((time) => (
                        <div
                          key={time.value}
                          onClick={() => {
                            setForm({ ...form, arrivalTime: time.value });
                            setOpenArrivalDropdown(false);
                            setErrors({ ...errors, arrivalTime: undefined });
                          }}
                          className="p-4 cursor-pointer text-zinc-800 hover:bg-zinc-100"
                        >
                          {time.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.arrivalTime && (
                  <p className="text-red-500">{errors.arrivalTime}</p>
                )}
              </div>

              <div>
                <label className="flex px-2 mb-2 gap-2">
                  Special Request
                  <span className="text-zinc-400">(Optional)</span>
                </label>
                <textarea
                  name="request"
                  placeholder="Special Request"
                  className={`${inputStyle()} h-56`}
                  value={form.request}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !isFormValid()}
              className={`px-6 py-4 w-full font-medium rounded-xl ${
                isFormValid()
                  ? "text-white bg-amber-500 hover:bg-amber-600"
                  : "text-zinc-400 bg-gray-200 cursor-not-allowed"
              }`}
            >
              {submitting ? "Submitting..." : "Secure My Stay"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
