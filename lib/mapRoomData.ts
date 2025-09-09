import { iconoirMap } from "@/lib/iconoirMap";
import { RoomItem } from "@/types";

export function mapRoomData(raw: Record<string, unknown>): RoomItem {
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
  } as RoomItem;
}
