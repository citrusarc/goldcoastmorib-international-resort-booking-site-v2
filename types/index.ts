import { SVGProps } from "react";
import { ChangeEvent } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ItemStatus = {
  isDisabled?: boolean;
  isHidden?: boolean;
  isComingSoon?: boolean;
};

export type NavItem = {
  id: string;
  name: string;
  href?: string;
  target?: string;
  rel?: string;
  status?: ItemStatus;
};

export type FooterCategory = "explore" | "legal";

export type FooterItem = {
  id: string;
  category: string;
  name: string;
  href?: string;
  target?: string;
  rel?: string;
  status?: ItemStatus;
};

export interface CarouselItem {
  name: string;
  src: string;
}

export interface AutoCarouselItem {
  images: string[];
  interval?: number;
  className?: string;
}

export type PriceItem = {
  currency: string;
  original: string;
  current: string;
};

export type IconProps = {
  icon?: React.FC<IconSvgProps>;
  label?: string;
};

export type RoomItem = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description?: string;
  facilities?: IconProps[];
  price: PriceItem;
  isDiscount: boolean;
  isRecommended: boolean;
};

export type ActivityItem = {
  id: string;
  name: string;
  image1: string;
  image2: string;
  alt: string;
  description?: string;
  highlights?: IconProps[];
};

export interface FloatingInputProps {
  id: string;
  label: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
