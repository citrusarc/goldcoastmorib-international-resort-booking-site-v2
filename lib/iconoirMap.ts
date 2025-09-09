import { Bed, Bathroom, MediaImage } from "iconoir-react";
import { IconSvgProps } from "@/types";

export const iconoirMap = {
  Bed,
  Bathroom,
  MediaImage,
} as const;

export type IconoirName = keyof typeof iconoirMap;
