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

export type CarouselItem = {
  name: string;
  src: string;
};

export type AutoCarouselItem = {
  images: string[];
  interval?: number;
  className?: string;
};

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
  maxGuests: number;
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

export type FloatingInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type BookingProps = {
  roomId: RoomItem["id"] | "any";
  checkin: string;
  checkout: string;
  adults: number;
  kids: number;
};

export type BookingForms = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalTime?: string;
  request?: string;
};

export type PhoneCodes = {
  code: string;
  label: string;
  emoji?: string;
};

export type SearchErrors = {
  dates?: string;
  guests?: string;
};
