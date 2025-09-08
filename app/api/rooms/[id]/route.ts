// app/api/rooms/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;

    const { data, error } = await supabaseServer
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // ✅ Normalize price field
    let price = data.price;
    if (typeof price === "string") {
      try {
        price = JSON.parse(price);
      } catch {
        price = {
          currency: "RM",
          current: Number(price),
          original: Number(price),
        };
      }
    } else if (typeof price === "number") {
      price = { currency: "RM", current: price, original: price };
    }

    return NextResponse.json({ ...data, price }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    ``;
    console.error("Error fetching room:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
