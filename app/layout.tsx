import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Mail, Phone } from "iconoir-react";
import "flatpickr/dist/flatpickr.min.css";

import { cormorantGaramond } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/ui/Navbar";
import FlyonuiScript from "@/components/ui/FlyonuiScript";
import "@/app/globals.css";
import SplashScreen from "@/components/ui/SplashScreen";

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
  metadataBase: new URL("https://www.goldcoastmoribresort.com"),
  alternates: {
    canonical: "https://www.goldcoastmoribresort.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.goldcoastmoribresort.com",
    title: "Gold Coast Morib International Resort",
    description:
      "Enjoy a beachfront escape with family-friendly amenities, water park fun, and unforgettable holidays at Gold Coast Morib International Resort.",
    siteName: "Gold Coast Morib International Resort",
    images: [
      {
        url: "https://www.goldcoastmoribresort.com/Images/banner.png",
        width: 1200,
        height: 630,
        alt: "Gold Coast Morib International Resort Beachfront View",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold Coast Morib International Resort",
    description:
      "Discover the perfect beachfront holiday at Gold Coast Morib International Resort in Malaysia.",
    images: ["https://www.goldcoastmoribresort.com/Images/banner.png"],
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
      <head>
        <meta name="theme-color" content="#f59e0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FCJQJHEQ4E"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FCJQJHEQ4E');
          `}
        </Script>
        <Script
          id="ldjson-hotel"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: "Gold Coast Morib International Resort",
            description:
              "Experience luxury and comfort at Gold Coast Morib International Resort, your perfect beachfront getaway in Malaysia.",
            image: "https://www.goldcoastmoribresort.com/Images/banner.png",
            logo: "https://www.goldcoastmoribresort.com/Images/brand-logo.png",
            url: "https://www.goldcoastmoribresort.com",
            telephone: "+60331981028",
            email: "reservation@goldcoastresort.com.my",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "PT 294, Kawasan Kanchong Laut, Mukim Morib, Morib Beach",
              addressLocality: "Banting",
              addressRegion: "Selangor",
              postalCode: "42700",
              addressCountry: "MY",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 2.7401,
              longitude: 101.5012,
            },
            checkinTime: "14:00",
            checkoutTime: "12:00",
            openingHours: "Mo-Su 00:00-23:59",
            priceRange: "RM",
            amenityFeature: [
              {
                "@type": "LocationFeatureSpecification",
                name: "Water Park",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Beachfront",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Family-friendly",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Swimming Pool",
                value: true,
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Restaurant",
                value: true,
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.2",
              reviewCount: "2150",
            },
            sameAs: [
              "https://www.facebook.com/goldcoastmoribresort",
              "https://www.instagram.com/goldcoastmoribresort",
              "https://maps.google.com/?q=Gold+Coast+Morib+International+Resort",
            ],
          })}
        </Script>
      </head>
      <body className="relative antialiased overflow-x-hidden overflow-y-auto max-w-full">
        <SplashScreen />
        <Navbar />
        <main className="w-full max-w-full">{children}</main>
        <footer className="flex flex-col items-start justify-start px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 overflow-x-hidden max-w-full border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-full justify-between">
            <div className="flex flex-col gap-8 text-zinc-500">
              <Link
                href="/"
                className="flex items-center gap-2 max-w-full overflow-x-hidden"
              >
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
      <FlyonuiScript />
    </html>
  );
}
