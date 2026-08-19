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

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={close}>
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-gray-700">
            <Link href="/" className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link href="/marketplace" className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Brands
            </Link>

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("categories")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 rounded transition-colors whitespace-nowrap ${openDropdown === "categories" ? "text-[#f97316]" : "hover:text-[#f97316]"}`}>
                Categories <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === "categories" ? "rotate-180 text-[#f97316]" : "text-gray-400"}`} />
              </button>
              {openDropdown === "categories" && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 min-w-[220px] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="h-0.5 w-full bg-gradient-to-r from-[#1e3a5f] to-[#f97316] rounded-full mb-1" />
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href={`/marketplace?category=${encodeURIComponent(cat)}`}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2.5 text-[13px] text-gray-700 font-semibold hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/aboutus" className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              About Us
            </Link>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 rounded transition-colors whitespace-nowrap ${openDropdown === "resources" ? "text-[#f97316]" : "hover:text-[#f97316]"}`}>
                Resources <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180 text-[#f97316]" : "text-gray-400"}`} />
              </button>
              {openDropdown === "resources" && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 min-w-[200px] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="h-0.5 w-full bg-gradient-to-r from-[#1e3a5f] to-[#f97316] rounded-full mb-1" />
                  {RESOURCES.map((r) => (
                    <Link
                      key={r.label}
                      href={r.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2.5 text-[13px] text-gray-700 font-semibold hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contactus" className="px-3 py-2 rounded hover:text-[#f97316] transition-colors whitespace-nowrap">
              Contact Us
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/seller-onboarding"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-[13px] px-5 py-2.5 rounded-lg transition-colors shadow-md shadow-orange-500/20 whitespace-nowrap flex items-center gap-1.5"
            >
              List Your Brand →
            </Link>
            <Link href="/adminpanel/login" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-[#f97316] text-gray-500 hover:text-[#f97316] transition-colors">
              <User size={16} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] lg:hidden" onClick={close} />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[110] lg:hidden shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
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
            <Link href="/" onClick={close} className="flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Home</Link>
            <Link href="/marketplace" onClick={close} className="flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Brands</Link>

            <button
              onClick={() => setOpenDropdown(openDropdown === "categories" ? null : "categories")}
              className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100"
            >
              Categories <ChevronDown size={16} className={`text-gray-400 transition-transform ${openDropdown === "categories" ? "rotate-180 text-[#f97316]" : ""}`} />
            </button>
            {openDropdown === "categories" && (
              <div className="bg-orange-50/60 border-b border-gray-100">
                {CATEGORIES.map(cat => (
                  <Link key={cat} href={`/marketplace?category=${encodeURIComponent(cat)}`} onClick={close} className="block px-8 py-2.5 text-[13px] font-medium text-gray-700 hover:text-[#f97316]">
                    {cat}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/aboutus" onClick={close} className="flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">About Us</Link>

            <button
              onClick={() => setOpenDropdown(openDropdown === "resources" ? null : "resources")}
              className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100"
            >
              Resources <ChevronDown size={16} className={`text-gray-400 transition-transform ${openDropdown === "resources" ? "rotate-180 text-[#f97316]" : ""}`} />
            </button>
            {openDropdown === "resources" && (
              <div className="bg-orange-50/60 border-b border-gray-100">
                {RESOURCES.map(r => (
                  <Link key={r.label} href={r.href} onClick={close} className="block px-8 py-2.5 text-[13px] font-medium text-gray-700 hover:text-[#f97316]">
                    {r.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/contactus" onClick={close} className="flex items-center justify-between px-5 py-3.5 font-semibold text-gray-800 hover:bg-gray-50 border-b border-gray-100">Contact Us</Link>
          </div>

          {/* Bottom CTA */}
          <div className="px-5 py-4 border-t bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
            <Link
              href="/seller-onboarding"
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
