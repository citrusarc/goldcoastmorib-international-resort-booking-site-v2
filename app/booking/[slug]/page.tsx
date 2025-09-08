"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { cormorantGaramond } from "@/config/fonts";
import { RoomItem } from "@/types";

export default function BookingDetailsPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();

  const [room, setRoom] = useState<RoomItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [kids] = useState(0); // // something need to check

  // // something need to check
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    arrivalTime: "",
    request: "",
  });

  // // why use onChange not useEffect?
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${slug}`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchRoom();
  }, [slug]);

  // // Enhance later
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room?.id,
          checkin: searchParams.get("checkin"),
          checkout: searchParams.get("checkout"),
          guests: searchParams.get("guests"),
          ...form,
        }),
      });
      if (!res.ok) throw new Error("Failed to create booking");
      alert("Booking confirmed! 🎉"); // replace with nicer UI later
    } catch (err) {
      console.error(err);
      alert("Error submitting booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading room details...</p>;
  }

  if (!room) {
    return <p className="text-center py-20">Room not found</p>;
  }

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
          <h1
            className={`mt-4 text-2xl sm:text-3xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
          >
            {room.name}
          </h1>
          <p className="text-zinc-500 mt-2">{room.description}</p>

          <p className="mt-4 font-semibold text-xl text-zinc-800">
            {room.price.currency}
            {room.price.current}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 p-6 rounded-2xl border border-zinc-200 bg-white"
        >
          <h2 className="text-lg font-semibold text-zinc-800">Your Stay</h2>
          <p>
            <span className="text-zinc-500">Check In:</span>
            {searchParams.get("checkin")}
          </p>
          <p>
            <span className="text-zinc-500">Check Out:</span>
            {searchParams.get("checkout")}
          </p>
          <p>
            <span className="text-zinc-500">Guests:</span>
            {searchParams.get("guests")} Adults {kids > 0 && `, ${kids} Kids`}
          </p>

          <hr className="my-2" />

          <h2 className="text-lg font-semibold text-zinc-800">
            Guest Information
          </h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="p-3 border rounded-lg"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="p-3 border rounded-lg"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded-lg"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="p-3 border rounded-lg"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="arrivalTime"
            placeholder="Arrival Time (e.g. 14:00)"
            className="p-3 border rounded-lg"
            value={form.arrivalTime}
            onChange={handleChange}
          />
          <textarea
            name="request"
            placeholder="Special Request"
            className="p-3 border rounded-lg"
            value={form.request}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 px-6 py-3 rounded-xl text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}
