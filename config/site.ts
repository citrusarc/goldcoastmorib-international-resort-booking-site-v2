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
      id: "rooms-suites",
      name: "Rooms & Suites",
      href: "/rooms-suites",
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
      id: "rooms-suites",
      category: "explore",
      name: "Rooms & Suites",
      href: "/rooms-suites",
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
