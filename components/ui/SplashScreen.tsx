"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname === "/" && !localStorage.getItem("hasVisited")) {
      setShow(true);

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      window.addEventListener("load", () => {
        setTimeout(() => {
          setShow(false);
          localStorage.setItem("hasVisited", "true");

          // ✅ restore scroll
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
        }, 3000);
      });
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-[9999] overflow-hidden">
      <Image
        src="/Images/brand-logo-horizontal.png"
        alt="Brand Logo"
        width={240}
        height={240}
        priority
        className="max-w-[90%] h-auto"
      />
    </div>
  );
}
