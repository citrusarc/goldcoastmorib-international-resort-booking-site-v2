import { iconoirMap } from "@/lib/iconoirMap";
import { AccomodationsItem } from "@/types";

export function mapAccomodationsData(
  raw: Record<string, unknown>
): AccomodationsItem {
  return {
    ...raw,
    facilities: Array.isArray(raw.facilities)
      ? raw.facilities.map((f: { label: string; icon?: string }) => ({
          label: f.label,
          icon: f.icon
            ? iconoirMap[f.icon as keyof typeof iconoirMap]
            : undefined,
        }))
      : [],
  } as AccomodationsItem;
}
