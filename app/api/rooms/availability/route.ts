import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const guests = parseInt(searchParams.get("guests") || "1", 10);

    if (!checkin || !checkout) {
      return NextResponse.json(
        { error: "Missing checkin/checkout dates" },
        { status: 400 }
      );
    }

    // 1️⃣ Rooms that can fit guests
    const { data: rooms, error: roomError } = await supabaseServer
      .from("rooms")
      .select("*")
      .gte("maxGuests", guests);

    if (roomError) throw roomError;
    if (!rooms?.length) return NextResponse.json([]);

    // 2️⃣ Bookings overlapping the requested period
    const { data: booked, error: bookingError } = await supabaseServer
      .from("bookings")
      .select("room_id")
      .lt("checkin_date", checkout) // starts before checkout
      .gt("checkout_date", checkin); // ends after checkin

    if (bookingError) throw bookingError;

    // 3️⃣ If no bookings → all rooms available
    if (!booked?.length) return NextResponse.json(rooms);

    const bookedIds = booked.map((b) => b.room_id);

    // 4️⃣ Filter out booked rooms
    const availableRooms = rooms.filter((r) => !bookedIds.includes(r.id));

    return NextResponse.json(availableRooms);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
