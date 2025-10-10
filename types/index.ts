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
  alt: string;
};

export type AutoCarouselItem = {
  images: string[];
  interval?: number;
  className?: string;
};

export type PriceItem = {
  currency: string;
  original: number;
  current: number;
};

export type IconProps = {
  icon?: React.FC<IconSvgProps>;
  label?: string;
};

export type AccommodationsItem = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description?: string;
  facilities?: IconProps[];
  price: PriceItem;
  maxGuests: number;
  isDiscount: boolean;
  isRecommended: boolean;
  totalUnits?: number;
  availableUnits?: number;
};

export type ThingsToDoItem = {
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
  accommodationsId: AccommodationsItem["id"] | "any";
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
  earlyCheckIn?: string;
  remarks?: string;
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

export type BookingEmailTemplateProps = {
  bookingNumber: string;
  firstName: string;
  accommodationsName: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  earlyCheckIn?: string | null;
  remarks?: string | null;
  currency: string;
  totalPrice: number;
  createdAt: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
};
