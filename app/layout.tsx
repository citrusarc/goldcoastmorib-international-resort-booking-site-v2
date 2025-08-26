import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "iconoir-react";

import { cormorantGaramond } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gold Coast Morib International Resort",
  description:
    "Experience luxury and comfort at Gold Coast Morib International Resort, your perfect beachfront getaway in Malaysia.",
  keywords: [
    "Gold Coast Morib",
    "Gold Coast Morib International Resort",
    "Morib resort",
    "beachfront resort Malaysia",
    "family resort Selangor",
    "holiday resort Morib",
  ],
  authors: [{ name: "Gold Coast Morib International Resort" }],
  creator: "Gold Coast Morib International Resort",
  publisher: "Gold Coast Morib International Resort",
  metadataBase: new URL(
    "https://goldcoastmorib-international-resort.vercel.app"
  ),
  alternates: {
    canonical: "https://goldcoastmorib-international-resort.vercel.app",
  },
  openGraph: {
    type: "website",
    url: "https://goldcoastmorib-international-resort.vercel.app",
    title: "Gold Coast Morib International Resort",
    description:
      "Enjoy a beachfront escape with family-friendly amenities, water park fun, and unforgettable holidays at Gold Coast Morib International Resort.",
    siteName: "Gold Coast Morib International Resort",
    images: [
      {
        url: "https://goldcoastmorib-international-resort.vercel.app/Images/banner.png",
        width: 1200,
        height: 630,
        alt: "Gold Coast Morib International Resort beachfront view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Coast Morib International Resort",
    description:
      "Discover the perfect beachfront holiday at Gold Coast Morib International Resort in Malaysia.",
    images: [
      "https://goldcoastmorib-international-resort.vercel.app/Images/banner.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "Travel & Hospitality",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased overflow-x-hidden overflow-y-auto">
        <Navbar />
        <main>{children}</main>
        <footer className="flex flex-col items-start justify-start px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row gap-8 w-full justify-between">
            <div className="flex flex-col gap-4 sm:gap-8 text-zinc-500">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  priority
                  src="/Images/brand-logo.png"
                  alt="Gold Coast Morib International Resort Logo"
                  width={56}
                  height={56}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
                <p
                  className={`leading-tight text-md sm:text-lg ${cormorantGaramond.className}`}
                >
                  Gold Coast Morib <br /> International Resort
                </p>
              </Link>
              <p>GOLD COAST MORIB INTERNATIONAL RESORT</p>
              <p>
                PT 294, Kawasan Kanchong Laut, <br />
                Mukim Morib, Morib Beach,
                <br />
                42700 Banting, Selangor, <br />
                Malaysia
              </p>
              <div className="flex flex-col gap-4">
                <Link
                  href="tel:+60331981028"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" strokeWidth={2} />
                  <span className="hover:underline">+6 03 3198 1028</span>
                </Link>
                <Link
                  href="mailto:reservation@goldcoastresort.com.my"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" strokeWidth={2} />
                  <span className="hover:underline">
                    reservation@goldcoastresort.com.my
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-zinc-500">
              <span className="font-semibold text-zinc-800">Explore</span>
              {siteConfig.footerItems
                .filter(
                  (item) =>
                    item.category === "explore" && !item.status?.isHidden
                )
                .map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-zinc-500 hover:text-amber-500"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row pt-4 gap-4 w-full border-t border-zinc-200">
            {siteConfig.footerItems
              .filter(
                (item) => item.category === "legal" && !item.status?.isHidden
              )
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-zinc-500 hover:text-amber-500"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </footer>
      </body>
    </html>
  );
}
