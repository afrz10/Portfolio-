import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://afruz.vercel.app"),

  title: {
    default: "Afruz — Crafting Ideas Into Digital Experiences",
    template: "%s | Afruz",
  },

  description:
    "Explore Afruz's portfolio — creative projects, development, digital editing, technology and ideas brought to life.",

  authors: [{ name: "Afruz" }],
  creator: "Afruz",
  publisher: "Afruz",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://afruz.vercel.app/",
    title: "Afruz — Crafting Ideas Into Digital Experiences",
    description:
      "Explore Afruz's portfolio — creative projects, development, digital editing, technology and ideas brought to life.",
    siteName: "Afruz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Afruz — Personal Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Afruz — Crafting Ideas Into Digital Experiences",
    description:
      "Explore Afruz's portfolio — creative projects, development, digital editing, technology and ideas brought to life.",
    images: ["/og-image.png"],
  },
};
