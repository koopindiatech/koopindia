import { Suspense } from "react";
import SellersClient from "./SellersClient";

export const metadata = {
  title: "Sellers Directory — Find Manufacturers & Suppliers in India | Koop India",
  description:
    "Browse 1000+ verified Indian manufacturers, MSME sellers and product suppliers across FMCG, Food, Pharma, Textiles, Industrial and 38+ categories on Koop India B2B Marketplace.",
  keywords: [
    "manufacturers India",
    "suppliers India",
    "MSME sellers",
    "B2B sellers directory India",
    "find manufacturers India",
    "product suppliers India",
    "FMCG manufacturers India",
    "Indian sellers marketplace",
  ],
  alternates: {
    canonical: "https://www.koopindia.com/sellers",
  },
  openGraph: {
    title: "Sellers Directory — Find Manufacturers & Suppliers in India | Koop India",
    description:
      "Browse 1000+ verified Indian manufacturers, MSME sellers and product suppliers across FMCG, Food, Pharma, Textiles, Industrial and 38+ categories.",
    url: "https://www.koopindia.com/sellers",
    siteName: "Koop India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koop India Sellers Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sellers Directory — Find Manufacturers & Suppliers in India",
    description:
      "Browse 1000+ verified Indian manufacturers and MSME sellers on Koop India B2B Marketplace.",
    images: ["https://www.koopindia.com/og-image.png"],
  },
};

export default function SellersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      }
    >
      <SellersClient />
    </Suspense>
  );
}
