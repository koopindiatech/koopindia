"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Users,
  Lightbulb,
  Phone,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ onOpenModal }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigationItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "About Us", href: "/aboutus", icon: <Users size={18} /> },
    {
      name: "Tech Solutions",
      icon: <Lightbulb size={18} />,
      dropdown: [
        { name: "Startups / Brands", href: "/solutions/brands" },
        { name: "Buyers / Distributors", href: "/solutions/distributors" },
        {
          name: "Website Development",
          href: "/tech-solutions/website-development",
        },
        { name: "CRM Development", href: "/tech-solutions/crm-development" },
        { name: "SEO Services", href: "/tech-solutions/seo" },
      ],
    },
    {
      name: "Startup Consulting",
      dropdown: [
        { name: "Business Consulting", href: "/startup-consulting/business" },
        {
          name: "Market Analysis",
          href: "/startup-consulting/market-analysis",
        },
        {
          name: "Product & Margin Valuation",
          href: "/startup-consulting/product-valuation",
        },
        {
          name: "Distribution Module",
          href: "/startup-consulting/distribution-model",
        },
        {
          name: "Franchise Module",
          href: "/startup-consulting/franchise-model",
        },
      ],
    },
    {
      name: "Documentation & Compliance",
      dropdown: [
        {
          name: "GST Registration & Filing",
          href: "/documentation-compliance/gst-registration",
        },
        {
          name: "Company Registration",
          href: "/documentation-compliance/company-registration",
        },
        {
          name: "Trademark Registration",
          href: "/documentation-compliance/trademark-registration",
        },
        {
          name: "FSSAI License",
          href: "/documentation-compliance/fssai-license",
        },
        {
          name: "ISO Certification",
          href: "/documentation-compliance/iso-certification",
        },
        {
          name: "Startup India Registration",
          href: "/documentation-compliance/startup-india-registration",
        },
        {
          name: "Company Accounting",
          href: "/documentation-compliance/company-accounting",
        },
        {
          name: "Tax & Compliance Services",
          href: "/documentation-compliance/tax-compliance",
        },
      ],
    },
    {
      name: "Bussiness Promotion",
      dropdown: [
        {
          name: "Social Media Marketing",
          href: "/digital-marketing/social-media",
        },
        { name: "Google My Business", href: "/digital-marketing/gmb" },
        // { name: "SEO Services", href: "/digital-marketing/seo" },
        {
          name: "Logo & Graphic Design",
          href: "/digital-marketing/logo-design",
        },
        { name: "Content Writing", href: "/digital-marketing/content-writing" },
      ],
    },
    { name: "Contact Us", href: "/contactus", icon: <Phone size={18} /> },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigate = (href) => {
    router.push(href);
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
        {/* ================= DESKTOP & MOBILE HEADER BAR ================= */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
          <Link href="/" className="text-2xl sm:text-3xl font-extrabold z-[80]">
            <span className="text-orange-500">koop</span>
            <span className="text-slate-800">india</span>
            <span className="text-orange-500">.</span>
          </Link>

          {/* Desktop Navigation */}
         <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[15px] font-medium text-gray-800">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative cursor-pointer"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button className="flex items-center cursor-pointer gap-1 hover:text-orange-500 transition-colors">
                      {item.name}
                      <ChevronDown size={16} />
                    </button>

                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 
                    bg-white rounded-xl shadow-lg border transition-all duration-200
                    ${
                      openDropdown === item.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                    >
                      <div className="p-3 grid gap-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center gap-2 p-1 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition"
                          >
                            <ChevronRight size={16} />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:block ml-4 xl:ml-8">
            <button
              onClick={onOpenModal}
              className="bg-orange-500 hover:bg-orange-600 text-white
              cursor-pointer px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors z-[80]"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] lg:hidden animate-fadeIn"
          onClick={closeMobileMenu}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white z-[110] lg:hidden
        shadow-2xl transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
          <span className="text-xl font-bold">
            <span className="text-orange-500">koop</span>
            <span className="text-slate-800">india</span>
          </span>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-[calc(100%-73px)]">
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <ul className="py-2">
              {navigationItems.map((item) => (
                <li
                  key={item.name}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {item.dropdown ? (
                    <>
                      {/* Parent with Dropdown */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name,
                          );
                        }}
                        className="w-full flex justify-between items-center px-5 py-4
                        text-gray-900 font-medium active:bg-gray-50 transition-colors"
                      >
                        <span className="text-[15px]">{item.name}</span>
                        <ChevronDown
                          size={20}
                          className={`text-gray-500 transition-transform duration-200 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Items */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openDropdown === item.name
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-orange-50/50 py-1 px-3">
                          {item.dropdown.map((sub) => (
                            <button
                              key={sub.name}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate(sub.href);
                              }}
                              className="block w-full text-left px-4 py-3 my-1 text-[14px]
                              text-gray-700 hover:bg-white hover:text-orange-600
                              rounded-lg transition-all active:scale-[0.98]"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Regular Link Item
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(item.href);
                      }}
                      className="w-full flex justify-between items-center px-5 py-4
                      text-gray-900 font-medium active:bg-gray-50 transition-colors"
                    >
                      <span className="text-[15px]">{item.name}</span>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom CTA */}
          <div className="px-5 py-4 border-t bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeMobileMenu();
                onOpenModal();
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700
              text-white font-semibold py-3.5 rounded-lg shadow-md
              transition-all active:scale-[0.98]"
            >
              Get Started
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              © 2026 KoopIndia
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
