import { Suspense } from "react";
import KoopHomepage from "@/components/ui/KoopHomepage";

export const metadata = {
  title: "Buyer Directory — Discover Trusted Indian Buyers | Koop India",
  description: "Explore 1000+ verified Indian manufacturers, MSME buyers and startups across Food, Spices, Healthcare, Industrial and more categories on Koop India.",
};

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" /></div>}>
      <KoopHomepage />
    </Suspense>
  );
}
