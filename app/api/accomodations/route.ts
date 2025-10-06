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

    // Get all rooms with totalUnits
    const { data: accomodations, error: accomodationError } = await supabase
      .from("accomodations")
      .select("*, totalUnits")
      .order("id", { ascending: true });

    if (accomodationError) {
      console.error("Supabase accomodations error:", accomodationError);
      throw accomodationError;
    }

    // Get all confirmed bookings that overlap today
    const { data: booked, error: bookingError } = await supabase
      .from("bookings")
      .select("accomodationsId")
      .eq("status", "confirmed")
      .lte("checkInDate", today)
      .gte("checkOutDate", today);

    if (bookingError) {
      console.error("Supabase booking error:", bookingError);
      throw bookingError;
    }

    // Count bookings per room
    const bookingCounts: Record<string, number> = {};
    booked?.forEach((b) => {
      bookingCounts[b.accomodationsId] =
        (bookingCounts[b.accomodationsId] || 0) + 1;
    });

    // Filter rooms with available units
    const availableAccomodations = (accomodations || [])
      .map((r) => {
        const bookedCount = bookingCounts[r.id] || 0;
        const availableUnits = r.totalUnits - bookedCount;
        return {
          ...r,
          available_units: availableUnits,
          price: normalizePrice(r.price),
        };
      })
      .filter((r) => r.available_units > 0);

    return NextResponse.json(availableAccomodations);
  } catch (err: unknown) {
    console.error("API /api/accomodations error:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
