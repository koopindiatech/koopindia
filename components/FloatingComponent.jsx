"use client";

import Image from "next/image";
import { useState } from "react";
import ContactSlideForm from "./forms/ContactSlideForm"; // Path adjust karein folder structure ke hisaab se

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed right-0 bottom-20 z-[100] flex flex-col gap-4 items-end pr-2">
        {/* Contact Us Sidebar Button */}
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-600 text-white px-3 py-2 rounded-lg rotate-180 font-medium tracking-wide cursor-pointer"
          style={{ writingMode: "vertical-rl" }}
        >
          Contact Us
        </button>

        {/* WhatsApp Link */}
        <div className="relative flex items-center justify-center mt-2">
          {/* Slow pulsing ring animation (Ripple effect) */}
          <div className="absolute w-12 h-12 border-[2px] border-green-500 rounded-full animate-ping opacity-60" style={{ animationDuration: '4s' }}></div>
          <div className="absolute w-12 h-12 border-[2px] border-green-500 rounded-full animate-ping opacity-40" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
          
          <a
            href="https://wa.me/9891233311"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform relative z-10"
            onClick={() => {
              if (typeof window !== "undefined" && window.fbq) {
                window.fbq("track", "Contact");
              }
            }}
          >
            <Image
              src="/whatsapp-image.png"
              alt="WhatsApp"
              width={45}
              height={45}
            />
          </a>
        </div>
      </div>

      {/* Sidebar Form Component */}
      <ContactSlideForm open={open} onClose={() => setOpen(false)} />
    </>
  );
}
