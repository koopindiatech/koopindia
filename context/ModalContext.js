"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import EnquiryModal from "@/components/forms/EnquiryForm";

const ModalContext = createContext();

const NO_MODAL_PAGES = ["/services"]; // ← jitne pages chahiye add karo

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reopenTimerRef = useRef(null);
  const pathname = usePathname();

  // Jab bhi pathname change ho aur services page ho — modal force close karo
  useEffect(() => {
    if (NO_MODAL_PAGES.includes(pathname)) {
      setIsOpen(false); // ← directly state set karo, openModal bypass karo
    }
  }, [pathname]);

  const openModal = () => {
    if (NO_MODAL_PAGES.includes(pathname)) return;
    if (NO_MODAL_PAGES.includes(window.location.pathname)) return; // ← double check
    if (sessionStorage.getItem("enquiry_open")) return;
    sessionStorage.setItem("enquiry_open", "true");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.removeItem("enquiry_open");
    clearTimeout(reopenTimerRef.current);
    reopenTimerRef.current = setTimeout(() => {
      if (!localStorage.getItem("enquiry_scroll_shown")) {
        openModal();
      }
    }, 40000);
  };

  useEffect(() => {
    if (NO_MODAL_PAGES.includes(pathname)) return;

    const handleScroll = () => {
      if (localStorage.getItem("enquiry_scroll_shown")) return;
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight * 0.5) {
        localStorage.setItem("enquiry_scroll_shown", "true");
        openModal();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(reopenTimerRef.current);
    };
  }, [pathname]);

  return (
    <ModalContext.Provider value={{ onOpenModal: openModal }}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);