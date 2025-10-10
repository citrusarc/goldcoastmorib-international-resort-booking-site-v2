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

    let query = supabase.from("bookings").select("*, accommodations(*)");

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
      accommodationsId,
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

    // Validate required fields
    const requiredFields = {
      accommodationsId,
      checkin,
      checkout,
      firstName,
      lastName,
      email,
      phone,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(
        ([, value]) => !value || (typeof value === "string" && !value.trim())
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Validate dates
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

    // Validate earlyCheckIn
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

    // Fetch room details including totalUnits
    const { data: accommodation, error: accommodationError } = await supabase
      .from("accommodations")
      .select("id, name, price, totalUnits")
      .eq("id", accommodationsId)
      .single();

    if (accommodationError || !accommodation) {
      return NextResponse.json(
        {
          error: `Accommodations not found: ${
            accommodationError?.message || "Unknown error"
          }`,
        },
        { status: 404 }
      );
    }

    // Check room availability for the selected dates
    const { data: existingBookings, error: checkError } = await supabase
      .from("bookings")
      .select("id, accommodationsId")
      .eq("accommodationsId", accommodationsId)
      .eq("status", "confirmed")
      .lte("checkInDate", checkout)
      .gte("checkOutDate", checkin);

    if (checkError) {
      throw new Error(`Supabase booking check error: ${checkError.message}`);
    }

    const bookedCount = existingBookings?.length || 0;
    if (bookedCount >= accommodation.totalUnits) {
      return NextResponse.json(
        { error: "This accomodations is fully booked for the selected dates." },
        { status: 400 }
      );
    }

    const price =
      typeof accommodation.price === "string"
        ? JSON.parse(accommodation.price)
        : accommodation.price;

    const nights = Math.max(
      1,
      Math.round(
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    const pricePerNight = Number(price.current);
    if (isNaN(pricePerNight)) {
      return NextResponse.json(
        { error: "Invalid accommodation price format" },
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
          accommodationsId,
          checkInDate: checkin,
          checkOutDate: checkout,
          adults: Number(adults),
          children: Number(children),
          status: status || "confirmed",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          remarks: remarks?.trim() || null,
          earlyCheckIn: earlyCheckIn || null,
          nights,
          pricePerNight,
          totalPrice,
          currency: price.currency || "RM",
        },
      ])
      .select("*, accommodations(*)")
      .single();

    if (error) throw new Error(`Supabase insert error: ${error.message}`);

    // Handle email sending in try-catch
    try {
      await transporter.sendMail({
        from: `"Gold Coast Morib International Resort" <${process.env.EMAIL_USER}>`,
        to: email,
        cc: process.env.ADMIN_EMAIL,
        subject: "Booking Confirmation",
        html: bookingEmailTemplate({
          bookingNumber,
          firstName,
          accommodationsName: accommodation?.name || "Accommodations",
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
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    console.error("Booking creation error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
