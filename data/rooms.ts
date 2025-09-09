import { RoomItem } from "@/types";
import { Bathroom, Bed, MediaImage } from "iconoir-react";

export const rooms: RoomItem[] = [
  {
    id: "studio-suite",
    name: "Studio Suite",
    image: "/Images/accomodations-banner-1.jpg",
    alt: "Room 1",
    description:
      "A cozy retreat with 2 single beds, garden views, and a private balcony — perfect for couples or friends seeking a relaxing escape.",
    facilities: [
      { icon: Bed, label: "2 Single Beds" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 120, original: 120 },
    isDiscount: true,
    isRecommended: true,
    maxGuests: 2,
  },
  {
    id: "apartment-balcony",
    name: "Apartment With Balcony",
    image: "/Images/accomodations-banner-2.jpg",
    alt: "Room 2",
    description:
      "Spacious 46 m² apartment featuring a queen bed, shower + bathtub, and a balcony/terrace for a relaxing stay.",
    facilities: [
      { icon: Bed, label: "1 Queen Bed" },
      { icon: Bathroom, label: "Rain Shower + Bathtub" },
      { icon: MediaImage, label: "Balcony/terrace" },
    ],
    price: { currency: "RM", current: 180, original: 180 },
    isDiscount: true,
    isRecommended: true,
    maxGuests: 2,
  },
  {
    id: "two-rooms-apartment",
    name: "2 Rooms Apartment",
    image: "/Images/accomodations-banner-3.jpg",
    alt: "Room 3",
    description:
      "Comfortable 51 m² unit with 2 single beds, shower, and a garden view — perfect for small families.",
    facilities: [
      { icon: Bed, label: "2 Single Beds" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 250, original: 250 },
    isDiscount: true,
    isRecommended: false,
    maxGuests: 3,
  },
  {
    id: "three-rooms-apartment",
    name: "3 Rooms Apartment",
    image: "/Images/accomodations-banner-4.jpg",
    alt: "Room 4",
    description:
      "Large 68 m² apartment with 5 single beds, a shower, and garden views — great for groups or big families.",
    facilities: [
      { icon: Bed, label: "5 Single Beds" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 280, original: 280 },
    isDiscount: true,
    isRecommended: false,
    maxGuests: 5,
  },
  {
    id: "penthouse-room",
    name: "Penthouse Room",
    image: "/Images/accomodations-banner-5.jpg",
    alt: "Room 5",
    description:
      "Expansive 177 m² penthouse featuring 1 king and 1 single bed, a shower, sweeping garden views, and an extra-large balcony facing the sea — spacious enough to host private events of up to 50 guests.",
    facilities: [
      { icon: Bed, label: "1 Single Bed + 1 King Bed" },
      { icon: Bathroom, label: "Rain Shower" },
      { icon: MediaImage, label: "Garden View" },
    ],
    price: { currency: "RM", current: 350, original: 350 },
    isDiscount: true,
    isRecommended: true,
    maxGuests: 5,
  },
];
