"use client";
import { useState,useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/forms/EnquiryForm";

export default function ClientLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight * 0.5) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header onOpenModal={() => setIsOpen(true)} />
      <main>{children}</main>
      <Footer onOpenModal={() => setIsOpen(true)} />
      <EnquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
