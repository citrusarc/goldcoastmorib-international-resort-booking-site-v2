import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

// GET single booking
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("bookings")
      .select("*, accomodations(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// UPDATE booking (e.g. change status or guest info)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { data, error } = await supabase
      .from("bookings")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE booking
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
