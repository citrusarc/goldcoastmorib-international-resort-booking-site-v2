import { ItemStatus, NavItem, FooterItem } from "@/types";

export type SiteConfig = typeof siteConfig;

const defaultStatus = {
  isDisabled: false,
  isHidden: false,
  isComingSoon: false,
};

export const siteConfig = {
  navItems: [
    {
      id: "the-resort",
      name: "The Resort",
      href: "/the-resort",
      status: { ...defaultStatus },
    },
    {
      id: "accomodations",
      name: "Accomodations",
      href: "/accomodations",
      status: { ...defaultStatus },
    },
    {
      id: "things-to-do",
      name: "Things To Do",
      href: "/things-to-do",
      status: { ...defaultStatus },
    },
    {
      id: "theme-park",
      name: "Theme Park",
      href: "/theme-park",
      status: { ...defaultStatus },
    },
    {
      id: "restaurant",
      name: "Restaurant",
      href: "/restaurant",
      status: { ...defaultStatus },
    },
    {
      id: "meetings-and-events",
      name: "Meetings And Events",
      href: "/meetings-and-events",
      status: { ...defaultStatus },
    },
  ] satisfies (ItemStatus | NavItem)[],
  footerItems: [
    {
      id: "the-resort",
      category: "explore",
      name: "The Resort",
      href: "/the-resort",
      status: { ...defaultStatus },
    },
    {
      id: "accomodations",
      category: "explore",
      name: "Accomodations",
      href: "/accomodations",
      status: { ...defaultStatus },
    },
    {
      id: "things-to-do",
      category: "explore",
      name: "Things To Do",
      href: "/things-to-do",
      status: { ...defaultStatus },
    },
    {
      id: "theme-park",
      category: "explore",
      name: "Theme Park",
      href: "/theme-park",
      status: { ...defaultStatus },
    },
    {
      id: "restaurant",
      category: "explore",
      name: "Restaurant",
      href: "/restaurant",
      status: { ...defaultStatus },
    },
    {
      id: "meetings-and-events",
      category: "explore",
      name: "Meetings And Events",
      href: "/meetings-and-events",
      status: { ...defaultStatus },
    },
    {
      id: "disclaimer",
      category: "legal",
      name: "Disclaimer",
      href: "/disclaimer",
      status: { ...defaultStatus },
    },
    {
      id: "term-of-use",
      category: "legal",
      name: "Term of Use",
      href: "/term-of-use",
      status: { ...defaultStatus },
    },
    {
      id: "privacy-policy",
      category: "legal",
      name: "Privacy Policy",
      href: "/privacy-policy",
      status: { ...defaultStatus },
    },
  ],
};
