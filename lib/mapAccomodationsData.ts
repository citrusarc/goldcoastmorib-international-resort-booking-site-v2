import { iconoirMap } from "@/lib/iconoirMap";
import { AccomodationsItem, PriceItem } from "@/types";

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
  // // Enhanced fallback for null or undefined
  return (price || { currency: "RM", current: 0, original: 0 }) as PriceItem;
}

export function mapAccomodationsData(
  raw: Record<string, unknown>
): AccomodationsItem {
  return {
    id: raw.id as string,
    name: raw.name as string,
    description: raw.description as string,
    facilities: Array.isArray(raw.facilities)
      ? raw.facilities.map((f: { label: string; icon?: string }) => ({
          label: f.label,
          icon: f.icon
            ? iconoirMap[f.icon as keyof typeof iconoirMap]
            : undefined,
        }))
      : [],
    price: normalizePrice(raw.price),
    image: raw.image as string,
    alt: raw.alt as string,
    totalUnits: raw.totalUnits ? Number(raw.totalUnits) : undefined,
    availableUnits: raw.availableUnits ? Number(raw.availableUnits) : undefined,
    // // Add required fields from Supabase schema
    maxGuests: raw.maxGuests ? Number(raw.maxGuests) : 1,
    isDiscount: raw.isDiscount ? Boolean(raw.isDiscount) : false,
    isRecommended: raw.isRecommended ? Boolean(raw.isRecommended) : false,
  };
}
