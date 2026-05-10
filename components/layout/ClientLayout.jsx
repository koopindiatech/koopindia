"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useModal } from "@/context/ModalContext";

export default function ClientLayout({ children }) {
  // Context se function nikalein
  const { onOpenModal } = useModal();

  return (
    <>
      {/* Header ko context wala function pass karein */}
      <Header onOpenModal={onOpenModal} />
      <main>{children}</main>
      <Footer onOpenModal={onOpenModal} />
    </>
  );
}