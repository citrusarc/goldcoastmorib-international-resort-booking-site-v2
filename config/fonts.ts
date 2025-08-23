import {
  Alex_Brush,
  Cormorant_Garamond,
  Merriweather,
  Zain,
} from "next/font/google";

export const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const zain = Zain({
  weight: ["300", "400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const merriweather = Merriweather({
  weight: ["300", "400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
