"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
  "Food & Beverages", "Spices & Masalas", "Tea & Coffee",
  "Cosmetics & Personal Care", "Healthcare & Wellness",
  "Industrial & Machinery", "Home Care & Essentials",
  "Packaging & Raw Materials",
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Branding Guide", href: "/resources/branding-guide" },
  { label: "Export Guide", href: "/resources/export-guide" },
  { label: "Business Tools", href: "/resources/business-tools" },
  { label: "Success Stories", href: "/resources/success-stories" },
];

const MarketplaceHeader = ({ onOpenModal }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => { setIsOpen(false); setOpenDropdown(null); };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[64px] gap-4">

                    <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); close(); }} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm leading-none">K</span>
              </div>
              <div>
                <div className="font-black text-[15px] leading-none text-[#1e3a5f]">
                  KOOP <span className="text-[#f97316]">INDIA</span>
                </div>
                <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-0.5">
                  Grow Brands. Grow India
                </div>
              </div>
            </div>
          </Link>

                    <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-gray-700">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }} className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Home
            </Link>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('sellers-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Sellers
            </button>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('buyers-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Buyers
            </button>

            <button onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              How It Works
            </button>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Success Stories
            </button>
          </nav>

                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/seller-buyer-registration"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors shadow-md shadow-orange-500/20 whitespace-nowrap flex items-center gap-1.5"
            >
              List Your Brand →
            </Link>
            <Link href="/adminpanel/login" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#f97316] text-gray-500 hover:text-[#f97316] transition-colors">
              <User size={16} />
            </Link>
          </div>

                    <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

            {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] lg:hidden" onClick={close} />
      )}

            <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[110] lg:hidden shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
                <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="text-white font-black text-base">KOOP <span className="text-[#f97316]">INDIA</span></span>
          </div>
          <button onClick={close} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-65px)]">
          <div className="flex-1 overflow-y-auto py-2">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); close(); }} className="flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Home</Link>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('sellers-section')?.scrollIntoView({ behavior: 'smooth' }); close(); }} className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Sellers</button>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('buyers-section')?.scrollIntoView({ behavior: 'smooth' }); close(); }} className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Buyers</button>

            <button onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); close(); }} className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">How It Works</button>
            <button onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); close(); }} className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Success Stories</button>
          </div>

                    <div className="px-5 py-4 border-t bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
            <Link
              href="/seller-buyer-registration?type=seller"
              onClick={close}
              className="block w-full text-center bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 rounded-lg transition-colors shadow-md"
            >
              List Your Brand →
            </Link>
            <p className="text-center text-xs text-gray-400 mt-3">© 2026 Koop India</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MarketplaceHeader;
