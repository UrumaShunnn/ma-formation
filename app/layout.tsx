import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "[TON NOM] — Formation E-commerce",
  description:
    "Apprends à créer et scaler ta boutique e-commerce. +250 membres, méthodes testées, résultats prouvés. Lance ton business en 90 jours.",
  keywords: ["formation ecommerce", "dropshipping", "shopify", "formation en ligne", "boutique en ligne", "tiktok ads", "facebook ads"],
  authors: [{ name: "[TON NOM]" }],
  creator: "[TON NOM]",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ma-formation.vercel.app"),
  openGraph: {
    title: "[TON NOM] — Formation E-commerce",
    description:
      "Apprends à créer et scaler ta boutique e-commerce. +250 membres, méthodes testées, résultats prouvés.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ma-formation.vercel.app",
    siteName: "[TON NOM] Formation",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Formation E-Commerce Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[TON NOM] — Formation E-commerce",
    description:
      "Apprends à créer et scaler ta boutique e-commerce. +250 membres, méthodes testées, résultats prouvés.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ma-formation.vercel.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#0A0A0A" }}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
