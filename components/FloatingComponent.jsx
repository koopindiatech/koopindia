"use client";

import Image from "next/image";
import { useState } from "react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed right-2 bottom-1/9 z-40 flex flex-col gap-3 items-center">
        {/* <button
          onClick={() => setOpen(true)}
          className="fixed top-4/6 -translate-y-1/2 z-40
         bg-[#0072b1] text-white px-2 py-1 rounded-lg
          rotate-180  font-medium tracking-wide cursor-pointer"
          style={{ writingMode: "vertical-rl" }}
        >
          Contact Us
        </button> */}

        {/* <a href="tel:+917782069184">
          <Image src="/call4.png" alt="Call" width={34} height={34} />
        </a> */}

        <a
          href="https://wa.me/9891233311"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/whatsapp-image.png"
            alt="WhatsApp"
            width={45}
            height={45}
          />
        </a>
      </div>

      {/* <ContactSlideForm open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
}
