import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";

import { transporter } from "@/utils/email";

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
      status,
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

    // Check duplicate confirmed booking
    const { data: existing, error: checkError } = await supabaseServer
      .from("bookings")
      .select("id")
      .eq("room_id", roomId)
      .eq("checkin_date", checkin)
      .eq("checkout_date", checkout)
      .eq("status", "confirmed");

    if (checkError) throw checkError;

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "This room is already booked for the selected dates." },
        { status: 400 }
      );
    }

    // Fetch room price
    const { data: room, error: roomError } = await supabaseServer
      .from("rooms")
      .select("name, price")
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
          status: status || "confirmed",
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
      .select("*, rooms(*)")
      .single();

    if (error) throw error;

    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: body.email,
      cc: process.env.ADMIN_EMAIL,
      subject: "Booking Confirmation",
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Thanks for booking <b>${room?.name || "your room"}</b>.</p>
        <p>Check-in: ${checkin} <br/> Check-out: ${checkout}</p>
        <p>Total Price: ${totalPrice} ${price.currency || "RM"}</p>
        <br/>
        <p>We look forward to your stay!</p>
      `,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
