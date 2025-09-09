import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("rooms")
      .select("*")
      .order("price->>current", { ascending: true });

    if (error) throw error;

    const normalized = (data || []).map((r) => ({
      ...r,
      price: normalizePrice(r.price),
    }));

    return NextResponse.json(normalized);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
