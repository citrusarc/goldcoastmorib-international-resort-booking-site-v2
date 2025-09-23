import { NextRequest, NextResponse } from "next/server";
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

    const { data: rooms, error: roomError } = await supabaseServer
      .from("rooms")
      .select("*")
      .gte("maxGuests", totalGuests);

    if (roomError) throw roomError;
    if (!rooms?.length) return NextResponse.json([]);

    const { data: availability, error: availError } = await supabaseServer
      .from("room_availability")
      .select("room_id, date, available_units")
      .gte("date", checkin)
      .lt("date", checkout);

    if (availError) throw availError;

    const availabilityMap = new Map<string, number>();

    availability?.forEach((a) => {
      const current = availabilityMap.get(a.room_id) ?? Infinity;
      availabilityMap.set(a.room_id, Math.min(current, a.available_units));
    });

    const availableRooms = rooms
      .filter((r) => (availabilityMap.get(r.id) ?? 0) > 0)
      .map((r) => ({ ...r, price: normalizePrice(r.price) }));

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
