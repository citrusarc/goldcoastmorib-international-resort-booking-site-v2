import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function normalizePrice(price: any) {
  if (typeof price === "string") {
    try {
      return JSON.parse(price);
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
  return price;
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

    const { data: booked, error: bookingError } = await supabaseServer
      .from("bookings")
      .select("room_id")
      .lt("checkin_date", checkout)
      .gt("checkout_date", checkin);

    if (bookingError) throw bookingError;

    if (!booked?.length) return NextResponse.json(rooms);

    const bookedIds = booked.map((b) => b.room_id);

    const availableRooms = rooms
      .filter((r) => !bookedIds.includes(r.id))
      .map((r) => ({ ...r, price: normalizePrice(r.price) }));

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
