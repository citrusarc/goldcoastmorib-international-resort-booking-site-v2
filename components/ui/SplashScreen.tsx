"use client"; // ✨ make this a client component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname === "/" && !localStorage.getItem("hasVisited")) {
      setShow(true);
      window.addEventListener("load", () => {
        setTimeout(() => {
          setShow(false);
          localStorage.setItem("hasVisited", "true");
        }, 3000);
      });
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500">
      <Image
        src="/Images/brand-logo-horizontal.png"
        alt="Brand Logo"
        width={120}
        height={120}
        priority
      />
    </div>
  );
}
