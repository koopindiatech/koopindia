"use client";
import { usePathname } from "next/navigation";
import FloatingContact from "@/components/FloatingComponent";

const STATIC_ROUTES = [
  "/", "/aboutus", "/blog", "/contactus", "/digital-marketing",
  "/documentation-compliance", "/gst-registration", "/marketplace",
  "/privacy", "/seller-onboarding", "/services", "/solutions",
  "/startup-consulting", "/tech-solutions", "/term-services",
  "/terms-and-conditions", "/termsevices", "/website-development",
  "/custom-website-development", "/trademark-registration",
  "/iso-certification", "/startup-india-registration",
  "/crm-development", "/seo-services",
  "/social-media-marketing", "/logo-design",
  "/appoint-distributors",
  "/company-registration",
  "/fssai-registration",
];

function isSellerSlugRoute(pathname) {
  if (!pathname) return false;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return false;
  const isKnownStatic = STATIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"));
  const isKnownPrefix =
    pathname.startsWith("/adminpanel") ||
    pathname.startsWith("/sellers") ||
    pathname.startsWith("/buyers") ||
    pathname.startsWith("/marketplace") ||
    pathname.startsWith("/company-registration") ||
    pathname.startsWith("/fssai-registration") ||
    pathname.startsWith("/seller-buyer-registration") ||
    pathname.startsWith("/api");
  return !isKnownStatic && !isKnownPrefix;
}

export default function ExtrasWrapper() {
  const pathname = usePathname();
  const noLayoutRoutes = ["/services"];
  const hideExtras =
    noLayoutRoutes.includes(pathname) ||
    pathname.startsWith("/marketplace") ||
    pathname.startsWith("/adminpanel") ||
    pathname.startsWith("/sellers") ||
    pathname.startsWith("/website-development") ||
    pathname.startsWith("/company-registration") ||
    pathname.startsWith("/fssai-registration") ||
    isSellerSlugRoute(pathname);

  if (hideExtras) return null;

  return <FloatingContact />;
}
