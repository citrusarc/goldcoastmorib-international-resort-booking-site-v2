import { iconoirMap } from "@/lib/iconoirMap";
import { RoomItem } from "@/types";

export function mapRoomData(raw: any): RoomItem {
  return {
    ...raw,
    facilities: raw.facilities?.map((f: any) => ({
      label: f.label,
      icon: f.icon ? iconoirMap[f.icon as keyof typeof iconoirMap] : undefined,
    })),
  };
}
