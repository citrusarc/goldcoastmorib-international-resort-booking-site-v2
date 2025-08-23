import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gold Coast Morib International Resort",
  description: "Gold Coast Morib",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased overflow-x-hidden overflow-y-auto">
        {children}
      </body>
    </html>
  );
}
