import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://afruz.vercel.app"),

  title: {
    default: "Afruz — Crafting Ideas Into Digital Experiences",
    template: "%s | Afruz",
  },

  description:
    "Welcome to Afruz's portfolio — a creative developer and digital creator exploring code, design, editing, and technology.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },
};
