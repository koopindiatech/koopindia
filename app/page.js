"use client"
import HeroSection from "@/components/ui/hero";
import Image from "next/image";
import EnquiryModal from "@/components/forms/EnquiryForm";
import { useState } from "react";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <div>
      {/* Hero Section */}
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
