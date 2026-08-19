"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useModal } from "@/context/ModalContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Known static top-level routes — anything else is treated as a seller slug
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
  const topLevel = "/" + segments[0];
  // If not a known static route and not admin/sellers/marketplace prefix, treat as seller slug
  const isKnownStatic = STATIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"));
  const isKnownPrefix = pathname.startsWith("/adminpanel") || pathname.startsWith("/sellers") || pathname.startsWith("/marketplace") || pathname.startsWith("/api");
  return !isKnownStatic && !isKnownPrefix;
}

export default function ClientLayout({ children }) {
  const { onOpenModal } = useModal();
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/adminpanel");
  const isSeller = pathname.startsWith("/sellers") || isSellerSlugRoute(pathname);
  const isMarketplace = pathname.startsWith("/marketplace");
  const hideGlobalLayout = isAdmin || isSeller || isMarketplace;

  useEffect(() => {
    if (hideGlobalLayout) {
      document.body.style.paddingTop = "0px";
      if (isAdmin) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    } else {
      document.body.style.paddingTop = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingTop = "";
      document.body.style.overflow = "";
    };
  }, [isAdmin, isSeller, hideGlobalLayout]);

  if (hideGlobalLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header onOpenModal={onOpenModal} />
      <main>{children}</main>
      <Footer onOpenModal={onOpenModal} />
    </>
  );
}