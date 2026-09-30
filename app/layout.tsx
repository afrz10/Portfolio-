import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://afruz.vercel.app"),

  title: {
    default: "Afruz — Developer · Student · Editor",
    template: "%s | Afruz",
  },

  description:
    "Afruz is a student, developer and editor building creative digital projects.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },
};
