import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";
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

    // Get all rooms //
    const { data: rooms, error: roomError } = await supabaseServer
      .from("rooms")
      .select("*")
      .order("price->>current", { ascending: true });

    if (roomError) throw roomError;

    // Get all confirmed bookings that overlap today //
    const { data: booked, error: bookingError } = await supabaseServer
      .from("bookings")
      .select("roomId")
      .eq("status", "confirmed")
      .lte("checkInDate", today)
      .gte("checkOutDate", today);

    if (bookingError) throw bookingError;

    const bookedRoomIds = new Set(booked?.map((b) => b.roomId) || []);

    // Filter only available rooms //
    const availableRooms = (rooms || [])
      .filter((r) => !bookedRoomIds.has(r.id))
      .map((r) => ({
        ...r,
        price: normalizePrice(r.price),
      }));

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
