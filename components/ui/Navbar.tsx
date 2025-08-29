"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone, Mail, Menu, Xmark } from "iconoir-react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { cormorantGaramond } from "@/config/fonts";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const pathname = usePathname();

  const navItems = siteConfig.navItems.filter((item) => !item.status?.isHidden);
  const isHome = pathname === "/";
  const isAccomodation = pathname === "/accomodations";
  const isBooking = pathname === "/booking";

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = openMobileMenu ? "hidden" : "";
  }, [openMobileMenu]);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 flex p-4 sm:py-6 sm:px-24 items-center justify-between w-full transition-colors duration-300",
        scroll || openMobileMenu || !(isHome || isAccomodation || isBooking)
          ? "text-zinc-800 border-zinc-800 bg-white"
          : "text-white border-white bg-transparent"
      )}
    >
      <Link
        href="/"
        className={clsx(
          "flex items-center gap-4",
          openMobileMenu && "invisible"
        )}
      >
        <Image
          priority
          src="/Images/brand-logo.png"
          alt="Gold Coast Morib International Resort Logo"
          width={56}
          height={56}
          className="w-12 h-12 sm:w-14 sm:h-14"
        />
        <p
          className={`leading-tight text-lg sm:text-xl ${cormorantGaramond.className}`}
        >
          Gold Coast Morib <br /> International Resort
        </p>
      </Link>
      <div className="hidden sm:flex flex-col flex-1 ml-8">
        <div className="flex flex-row gap-4 p-2 items-center justify-end">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="hover:text-amber-500"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/booking">
            <button
              className={clsx(
                "px-4 py-2 hover:text-white hover:bg-amber-500",
                scroll || !(isHome || isAccomodation || isBooking)
                  ? "text-white bg-zinc-800"
                  : "text-zinc-800 bg-white"
              )}
            >
              Book Now
            </button>
          </Link>
        </div>
        <div
          className={clsx(
            "w-full border-t",
            scroll || !(isHome || isAccomodation || isBooking)
              ? "border-red-500"
              : ""
          )}
        />
        <div className="flex gap-4 p-2 justify-end">
          <Link href="tel:+60331981028" className="flex items-center gap-2">
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

      <button
        className="sm:hidden p-2"
        onClick={() => setOpenMobileMenu(!openMobileMenu)}
      >
        {openMobileMenu ? (
          <Xmark className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      {openMobileMenu && (
        <div
          className={clsx(
            "absolute sm:hidden top-full left-0 w-full h-screen shadow-md bg-white text-zinc-800 transform transition-all duration-300 origin-top",
            openMobileMenu
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-8 p-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpenMobileMenu(false)}
                className="hover:text-amber-500"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setOpenMobileMenu(false)}>
              <button className="px-4 py-2 text-white bg-zinc-800 hover:bg-amber-500 w-full">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
