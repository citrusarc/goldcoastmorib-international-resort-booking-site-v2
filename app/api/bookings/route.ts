import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";

// GET all bookings (optionally filter by email or status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    let query = supabaseServer.from("bookings").select("*, rooms(*)");

    if (email) query = query.eq("email", email);
    if (status) query = query.eq("status", status);

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch bookings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST create a booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      roomId,
      checkin,
      checkout,
      adult,
      children,
      firstName,
      lastName,
      email,
      phone,
      arrivalTime,
      request,
    } = body;

    if (
      !roomId ||
      !checkin ||
      !checkout ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch room price
    const { data: room, error: roomError } = await supabaseServer
      .from("rooms")
      .select("price")
      .eq("id", roomId)
      .single();

    if (roomError || !room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const price =
      typeof room.price === "string" ? JSON.parse(room.price) : room.price;

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.max(
      1,
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const pricePerNight = Number(price.current);
    const totalPrice = pricePerNight * nights;

    // Save into bookings with breakdown
    const { data, error } = await supabaseServer
      .from("bookings")
      .insert([
        {
          room_id: roomId,
          checkin_date: checkin,
          checkout_date: checkout,
          adults: adult,
          kids: children,
          status: "pending",
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          special_request: request,
          arrival_time: arrivalTime,
          nights,
          price_per_night: pricePerNight,
          total_price: totalPrice,
          currency: price.currency || "RM",
        },
      ])
      .select("*, rooms(*)") // also return joined room data
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
