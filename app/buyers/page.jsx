import { Suspense } from "react";
import BuyersClient from "./BuyersClient";

export const metadata = {
  title: "Buyers Directory — Find Distributors, Wholesalers & Retailers in India | Koop India",
  description:
    "Connect with 1000+ verified Indian distributors, wholesalers, retailers and B2B buyers across FMCG, Food, Pharma, Textiles and 38+ categories on Koop India.",
  keywords: [
    "buyers India",
    "distributors India",
    "wholesalers India",
    "find buyers India",
    "B2B buyers directory India",
    "FMCG distributors India",
    "Indian buyer marketplace",
    "distributor network India",
  ],
  alternates: {
    canonical: "https://www.koopindia.com/buyers",
  },
  openGraph: {
    title: "Buyers Directory — Find Distributors, Wholesalers & Retailers in India | Koop India",
    description:
      "Connect with 1000+ verified Indian distributors, wholesalers and B2B buyers across FMCG, Food, Pharma, Textiles and 38+ categories.",
    url: "https://www.koopindia.com/buyers",
    siteName: "Koop India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koop India Buyers Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buyers Directory — Find Distributors & Wholesalers in India",
    description:
      "Connect with 1000+ verified Indian distributors, wholesalers and B2B buyers on Koop India.",
    images: ["https://www.koopindia.com/og-image.png"],
  },
};

export default function BuyersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      }
    >
      <BuyersClient />
    </Suspense>
  );
}
