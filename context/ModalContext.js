"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import EnquiryModal from "@/components/forms/EnquiryForm";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reopenTimerRef = useRef(null);

  const openModal = () => {
    if (sessionStorage.getItem("enquiry_open")) return;
    sessionStorage.setItem("enquiry_open", "true");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.removeItem("enquiry_open");

    // 🔁 reopen after 40 seconds (ONLY ONCE)
    clearTimeout(reopenTimerRef.current);
    reopenTimerRef.current = setTimeout(() => {
      if (!sessionStorage.getItem("enquiry_scroll_shown")) {
        openModal();
      }
    }, 40000);
  };

  useEffect(() => {
    const handleScroll = () => {
      // 🛑 HARD LOCK — scroll trigger sirf ek baar
      if (sessionStorage.getItem("enquiry_scroll_shown")) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight * 0.5) {
        sessionStorage.setItem("enquiry_scroll_shown", "true");
        openModal();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(reopenTimerRef.current);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ onOpenModal: openModal }}>
      {children}

      {/* ✅ SINGLE INSTANCE ONLY */}
      <EnquiryModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);