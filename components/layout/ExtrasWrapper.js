"use client";
import { usePathname } from "next/navigation";
import FloatingContact from "@/components/FloatingComponent";

const STATIC_ROUTES = [
  "/", "/aboutus", "/blog", "/contactus", "/digital-marketing",
  "/documentation-compliance", "/gst-registration", "/marketplace",
  "/privacy", "/seller-onboarding", "/services", "/solutions",
  "/startup-consulting", "/tech-solutions", "/term-services",
  "/terms-and-conditions", "/termsevices",
];

function isSellerSlugRoute(pathname) {
  if (!pathname) return false;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return false;
  const isKnownStatic = STATIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"));
  const isKnownPrefix = pathname.startsWith("/adminpanel") || pathname.startsWith("/sellers") || pathname.startsWith("/marketplace") || pathname.startsWith("/api");
  return !isKnownStatic && !isKnownPrefix;
}

export default function ExtrasWrapper() {
  const pathname = usePathname();
  const noLayoutRoutes = ["/services"];
  const hideExtras = noLayoutRoutes.includes(pathname) || pathname.startsWith("/marketplace") || pathname.startsWith("/adminpanel") || pathname.startsWith("/sellers") || isSellerSlugRoute(pathname);

  if (hideExtras) return null;

  return <FloatingContact />;
}