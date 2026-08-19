"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import EnquiryModal from "@/components/forms/EnquiryForm";

const ModalContext = createContext();

const STATIC_ROUTES_MODAL = [
  "/", "/aboutus", "/blog", "/contactus", "/digital-marketing",
  "/documentation-compliance", "/gst-registration", "/marketplace",
  "/privacy", "/seller-onboarding", "/services", "/solutions",
  "/startup-consulting", "/tech-solutions", "/term-services",
  "/terms-and-conditions", "/termsevices",
];

function isSellerPage(path) {
  if (!path) return false;
  const isKnownStatic = STATIC_ROUTES_MODAL.some(r => path === r || path.startsWith(r + "/"));
  const isKnownPrefix = path.startsWith("/adminpanel") || path.startsWith("/sellers") || path.startsWith("/marketplace") || path.startsWith("/api");
  return !isKnownStatic && !isKnownPrefix;
}

const NO_MODAL_PAGES = ["/services"];
const isNoModal = (path) => NO_MODAL_PAGES.includes(path) || path.startsWith("/adminpanel") || isSellerPage(path);


export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reopenTimerRef = useRef(null);
  const pathname = usePathname();

  // Modal Open karne ka function
  const openModal = () => {
    if (isNoModal(pathname)) return;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // 40 seconds baad firse dikhane ka timer (optional logic)
    clearTimeout(reopenTimerRef.current);
    reopenTimerRef.current = setTimeout(() => {
        if (!isNoModal(pathname)) {
            setIsOpen(true);
        }
    }, 40000);
  };

  // Auto-scroll logic yahan handle ho rahi hai
  useEffect(() => {
    if (isNoModal(pathname)) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      
      // 50% scroll hone par modal khulega
      if (scrollPosition >= pageHeight * 0.5) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <ModalContext.Provider value={{ onOpenModal: openModal }}>
      {children}
      {/* Ek hi global modal poore app ke liye */}
      <EnquiryModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);