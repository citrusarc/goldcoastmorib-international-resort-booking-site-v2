import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import { PriceItem } from "@/types";

function normalizePrice(price: unknown): PriceItem {
  if (typeof price === "string") {
    try {
      return JSON.parse(price) as PriceItem;
    } catch {
      return {
        currency: "RM",
        current: Number(price),
        original: Number(price),
      };
    }
  }
  if (typeof price === "number") {
    return { currency: "RM", current: price, original: price };
  }
  return price as PriceItem;
}

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Get all rooms
    const { data: rooms, error: roomError } = await supabase
      .from("rooms")
      .select("*")
      // // safer: remove JSON path ordering, just order by a plain column
      .order("id", { ascending: true }); // // change here

    if (roomError) {
      console.error("Supabase room error:", roomError); // // log actual error
      throw roomError;
    }

    // Get all confirmed bookings that overlap today
    const { data: booked, error: bookingError } = await supabase
      .from("bookings")
      .select("roomId")
      .eq("status", "confirmed")
      .lte("checkInDate", today)
      .gte("checkOutDate", today);

    if (bookingError) {
      console.error("Supabase booking error:", bookingError); // // log actual error
      throw bookingError;
    }

    const bookedRoomIds = new Set(booked?.map((b) => b.roomId) || []);

    // Filter only available rooms
    const availableRooms = (rooms || [])
      .filter((r) => !bookedRoomIds.has(r.id))
      .map((r) => ({
        ...r,
        price: normalizePrice(r.price),
      }));

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    console.error("API /api/rooms error:", err); // // better logging
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
