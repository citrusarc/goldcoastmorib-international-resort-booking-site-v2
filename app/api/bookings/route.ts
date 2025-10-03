import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

import { transporter } from "@/utils/email";
import { bookingEmailTemplate } from "@/utils/email/bookingEmailTemplate";
import { formatDate } from "@/utils/formatDate";

// GET all bookings (optionally filter by email or status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    let query = supabase.from("bookings").select("*, rooms(*)");

    if (email) query = query.eq("email", email);
    if (status) query = query.eq("status", status);

    const { data, error } = await query.order("createdAt", {
      ascending: false,
    });

    if (error) throw new Error(`Supabase error: ${error.message}`);

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
      adults,
      children,
      firstName,
      lastName,
      email,
      phone,
      earlyCheckIn,
      remarks,
      status,
    } = body;

    // // Validate required fields
    const requiredFields = {
      roomId,
      checkin,
      checkout,
      firstName,
      lastName,
      email,
      phone,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(
        ([_, value]) => !value || (typeof value === "string" && !value.trim())
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // // Validate phone format
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // // Validate dates
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }
    if (checkinDate >= checkoutDate) {
      return NextResponse.json(
        { error: "Check-out date must be after check-in date" },
        { status: 400 }
      );
    }

    // // Validate earlyCheckIn
    if (earlyCheckIn) {
      const [hours, minutes] = earlyCheckIn.split(":").map(Number);
      const earlyCheckInDate = new Date(checkin);
      earlyCheckInDate.setHours(hours || 0, minutes || 0, 0, 0);
      const standardCheckIn = new Date(checkin);
      standardCheckIn.setHours(15, 0, 0, 0);
      if (earlyCheckInDate > standardCheckIn) {
        return NextResponse.json(
          {
            error:
              "Early check-in cannot be later than standard check-in (3:00 PM)",
          },
          { status: 400 }
        );
      }
    }

    // Fetch room price
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("id, name, price, totalUnits")
      .eq("id", roomId)
      .single();

    if (roomError || !room) {
      return NextResponse.json(
        { error: `Room not found: ${roomError?.message || "Unknown error"}` }, // // Improved error message
        { status: 404 }
      );
    }

    // Check duplicate confirmed booking
    const { data: existing, error: checkError } = await supabase
      .from("bookings")
      .select("id, roomId")
      .eq("roomId", roomId)
      .eq("status", "confirmed")
      .lte("checkInDate", checkout)
      .gte("checkOutDate", checkin);

    if (checkError)
      throw new Error(`Supabase booking！

System: check error: ${checkError.message}`); // // Improved error message

    if (existing && existing.length >= room.totalUnits) {
      return NextResponse.json(
        { error: "This room is fully booked for the selected dates." },
        { status: 400 }
      );
    }

    // // Check for duplicate booking by the same user
    const { data: existingUserBooking, error: userBookingError } =
      await supabase
        .from("bookings")
        .select("id")
        .eq("email", email)
        .eq("roomId", roomId)
        .eq("status", "confirmed")
        .lte("checkInDate", checkout)
        .gte("checkOutDate", checkin);

    if (userBookingError) {
      throw new Error(
        `Supabase user booking check error: ${userBookingError.message}`
      ); // // Improved error message
    }

    if (existingUserBooking && existingUserBooking.length > 0) {
      return NextResponse.json(
        { error: "You already have a booking for these dates." },
        { status: 400 }
      ); // // Prevent duplicate bookings by the same user
    }

    const price =
      typeof room.price === "string" ? JSON.parse(room.price) : room.price;

    const nights = Math.max(
      1,
      Math.round(
        // // Use Math.round to ensure integer nights
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    const pricePerNight = Number(price.current);
    if (isNaN(pricePerNight)) {
      // // Validate price
      return NextResponse.json(
        { error: "Invalid room price format" },
        { status: 500 }
      );
    }
    const totalPrice = pricePerNight * nights;
    const bookingNumber = `BKG-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Save into bookings with breakdown
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          bookingNumber,
          roomId,
          checkInDate: checkin,
          checkOutDate: checkout,
          adults: Number(adults), // // Ensure type safety
          children: Number(children), // // Ensure type safety
          status: status || "confirmed",
          firstName: firstName.trim(), // // Trim string fields
          lastName: lastName.trim(), // // Trim string fields
          email: email.trim(), // // Trim string fields
          phone: phone.trim(), // // Trim string fields
          remarks: remarks?.trim() || null, // // Handle optional field
          earlyCheckIn: earlyCheckIn || null, // // Handle optional field
          nights,
          pricePerNight,
          totalPrice,
          currency: price.currency || "RM",
        },
      ])
      .select("*, rooms(*)")
      .single();

    if (error) throw new Error(`Supabase insert error: ${error.message}`); // // Improved error message

    // // Handle email sending in try-catch to prevent failure from affecting response
    try {
      await transporter.sendMail({
        from: `"Gold Coast Morib International Resort" <${process.env.EMAIL_USER}>`,
        to: email,
        cc: process.env.ADMIN_EMAIL,
        subject: "Booking Confirmation",
        html: bookingEmailTemplate({
          bookingNumber,
          firstName,
          roomName: room?.name || "Room",
          checkInDate: formatDate(checkinDate),
          checkOutDate: formatDate(checkoutDate),
          adults,
          children,
          earlyCheckIn,
          remarks,
          currency: price.currency || "RM",
          totalPrice,
          createdAt: formatDate(new Date()),
        }),
      });
    } catch (emailError: unknown) {
      console.error("Email sending failed:", emailError); // // Log email errors
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    console.error("Booking creation error:", err); // // Log errors for debugging
    const message =
      err instanceof Error ? err.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
