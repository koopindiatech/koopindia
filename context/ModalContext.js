"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import EnquiryModal from "@/components/forms/EnquiryForm";

const ModalContext = createContext();

const NO_MODAL_PAGES = ["/services"]; 

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reopenTimerRef = useRef(null);
  const pathname = usePathname();

  // Modal Open karne ka function
  const openModal = () => {
    if (NO_MODAL_PAGES.includes(pathname)) return;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // 40 seconds baad firse dikhane ka timer (optional logic)
    clearTimeout(reopenTimerRef.current);
    reopenTimerRef.current = setTimeout(() => {
        if (!NO_MODAL_PAGES.includes(pathname)) {
            setIsOpen(true);
        }
    }, 40000);
  };

  // Auto-scroll logic yahan handle ho rahi hai
  useEffect(() => {
    if (NO_MODAL_PAGES.includes(pathname)) return;

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