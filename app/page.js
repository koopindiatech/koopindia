"use client";
import HeroSection from "@/components/ui/hero";
import { useModal } from "@/context/ModalContext";

export default function Home() {
  const { onOpenModal } = useModal();

  return (
    <div>
      <HeroSection onOpenModal={onOpenModal} />
    </div>
  );
}