"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation"; // ✅ useParams added
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { cormorantGaramond } from "@/config/fonts";

export default function BookingDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams(); // ✅ FIX
  const supabase = createClientComponentClient();

  const slug = params.slug as string; // ✅ FIX: get slug safely
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const adults = parseInt(searchParams.get("adults") || "1");
  const kids = parseInt(searchParams.get("kids") || "0");

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    arrivalTime: "",
    request: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch room details by slug
  useEffect(() => {
    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("id, name, description, image, price, currency")
        .eq("id", slug) // 👈 match your DB column
        .single();

      if (!error) setRoom(data);
      setLoading(false);
    };

    if (slug) fetchRoom();
  }, [slug, supabase]);

  // ✅ Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle booking submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: slug,
        checkin,
        checkout,
        adults,
        kids,
        ...form,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/booking/confirmation?id=${data.id}`);
    } else {
      alert(data.error || "Booking failed");
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-500">Room not found.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center p-4 sm:px-64 sm:py-24 gap-12">
      <div className="w-full flex flex-col sm:flex-row gap-12">
        {/* Room Info */}
        <div className="flex-1">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={room.image || "/Images/hero-banner-1.png"}
              alt={room.name}
              fill
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
            {room.currency}
            {room.price} / night
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-4 p-6 rounded-2xl border border-zinc-200 bg-white"
        >
          <h2 className="text-lg font-semibold text-zinc-800">Your Stay</h2>
          <p>
            <span className="text-zinc-500">Check In:</span> {checkin}
          </p>
          <p>
            <span className="text-zinc-500">Check Out:</span> {checkout}
          </p>
          <p>
            <span className="text-zinc-500">Guests:</span> {adults} Adults{" "}
            {kids > 0 && `, ${kids} Kids`}
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
