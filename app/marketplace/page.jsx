import { Suspense } from "react";
import KoopHomepage from "@/components/ui/KoopHomepage";

export const metadata = {
  title: "B2B Marketplace India — Connect Buyers, Sellers & Distributors | Koop India",
  description:
    "India's leading B2B marketplace. Discover 1000+ verified manufacturers, MSME sellers, distributors and buyers across FMCG, Food, Pharma, Textiles, Industrial and 38+ categories. Register free today.",
  keywords: [
    "B2B marketplace India",
    "buyer seller platform India",
    "manufacturers India",
    "distributors India",
    "MSME B2B India",
    "FMCG marketplace India",
    "wholesale buyer India",
    "online B2B platform India",
  ],
  alternates: {
    canonical: "https://www.koopindia.com/marketplace",
  },
  openGraph: {
    title: "B2B Marketplace India — Connect Buyers, Sellers & Distributors | Koop India",
    description:
      "India's leading B2B marketplace. Discover 1000+ verified manufacturers, MSME sellers, distributors and buyers across 38+ categories.",
    url: "https://www.koopindia.com/marketplace",
    siteName: "Koop India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koop India B2B Marketplace India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Marketplace India — Connect Buyers, Sellers & Distributors",
    description:
      "India's leading B2B marketplace connecting manufacturers, distributors, and buyers across 38+ categories.",
    images: ["https://www.koopindia.com/og-image.png"],
  },
};

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" /></div>}>
      <KoopHomepage />
    </Suspense>
  );
}
