import { NextRequest, NextResponse } from "next/server";
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    const adult = parseInt(searchParams.get("adult") || "0", 10);
    const children = parseInt(searchParams.get("children") || "0", 10);
    const guestsParam = parseInt(searchParams.get("guests") || "0", 10);

    const totalGuests =
      adult + children > 0 ? adult + children : Math.max(1, guestsParam);

    if (!checkin || !checkout) {
      return NextResponse.json(
        { error: "Missing checkin/checkout dates" },
        { status: 400 }
      );
    }

    if (totalGuests < 1) {
      return NextResponse.json(
        { error: "At least 1 guest required" },
        { status: 400 }
      );
    }

    // fetch rooms that can host required guests
    const { data: accomodations, error: accomodationError } = await supabase
      .from("accomodations")
      .select("*")
      .gte("maxGuests", totalGuests);

    if (accomodationError) throw accomodationError;
    if (!accomodations?.length) return NextResponse.json([]);

    // fetch overlapping bookings
    const { data: booked, error: bookingError } = await supabase
      .from("bookings")
      .select("accomodationsId")
      .eq("status", "confirmed")
      .lte("checkInDate", checkout)
      .gte("checkOutDate", checkin);

    if (bookingError) throw bookingError;

    // count bookings per room
    const bookingCounts: Record<string, number> = {};
    booked?.forEach((b) => {
      bookingCounts[b.accomodationsId] =
        (bookingCounts[b.accomodationsId] || 0) + 1;
    });

    const availableAccomodations = accomodations
      .map((item) => {
        const bookedCount = bookingCounts[item.id] || 0;
        const availableUnits = item.totalUnits - bookedCount;
        return {
          ...item,
          available_units: availableUnits,
          price: normalizePrice(item.price),
        };
      })
      .filter((r) => r.available_units > 0);

    return NextResponse.json(availableAccomodations);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("Availability API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
