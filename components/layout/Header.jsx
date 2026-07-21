"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu, X, ChevronDown, ChevronRight,
  Building2, FileCheck, Briefcase, ShoppingCart,
  Globe, MonitorSmartphone, Search, Share2, Palette, PenLine, MapPin,
  TrendingUp, BarChart2, Package, Truck, Network,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ onOpenModal }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutus" },
    {
      name: "Startup Services",
      color: "from-orange-500 to-orange-600",
      light: "bg-orange-50",
      accent: "text-orange-600",
      dropdown: [
        { name: "Company Registration", href: "/documentation-compliance/company-registration-services", icon: <Building2 size={15} /> },
        { name: "Startup India Registration", href: "/documentation-compliance/startup-india-registration", icon: <FileCheck size={15} /> },
        { name: "Business Consulting", href: "/startup-consulting/business", icon: <Briefcase size={15} /> },
        { name: "Seller Onboarding", href: "/seller-onboarding", icon: <ShoppingCart size={15} /> },
      ],
    },
    {
      name: "Licenses & Compliance",
      color: "from-orange-500 to-orange-600",
      light: "bg-orange-50",
      accent: "text-orange-600",
      dropdown: [
        { name: "GST Registration & Filing", href: "/gst-registration", icon: <FileCheck size={15} /> },
        { name: "Trademark Registration", href: "/documentation-compliance/trademark-registration", icon: <FileCheck size={15} /> },
        { name: "FSSAI License", href: "/documentation-compliance/fssai-license", icon: <FileCheck size={15} /> },
        { name: "ISO Certification", href: "/documentation-compliance/iso-certification", icon: <FileCheck size={15} /> },
        { name: "Company Accounting", href: "/documentation-compliance/company-accounting", icon: <FileCheck size={15} /> },
        { name: "Tax & Compliance", href: "/documentation-compliance/tax-compliance", icon: <FileCheck size={15} /> },
      ],
    },
    {
      name: "Digital & Technology",
      color: "from-orange-500 to-orange-600",
      light: "bg-orange-50",
      accent: "text-orange-600",
      dropdown: [
        { name: "Website Development", href: "/tech-solutions/website-development", icon: <Globe size={15} /> },
        { name: "CRM Development", href: "/tech-solutions/crm-development", icon: <MonitorSmartphone size={15} /> },
        { name: "SEO Services", href: "/tech-solutions/seo", icon: <Search size={15} /> },
        { name: "Social Media Marketing", href: "/digital-marketing/social-media", icon: <Share2 size={15} /> },
        { name: "Logo & Graphic Design", href: "/digital-marketing/logo-design", icon: <Palette size={15} /> },
        { name: "Content Writing", href: "/digital-marketing/content-writing", icon: <PenLine size={15} /> },
        { name: "Google My Business", href: "/digital-marketing/gmb", icon: <MapPin size={15} /> },
      ],
    },
    {
      name: "Business Growth",
      color: "from-orange-500 to-orange-600",
      light: "bg-orange-50",
      accent: "text-orange-600",
      dropdown: [
        { name: "Market Research", href: "/startup-consulting/market-analysis", icon: <BarChart2 size={15} /> },
        { name: "Product & Margin Valuation", href: "/startup-consulting/product-valuation", icon: <Package size={15} /> },
        { name: "Distribution Consulting", href: "/startup-consulting/distribution-model", icon: <Truck size={15} /> },
        { name: "Franchise Consulting", href: "/startup-consulting/franchise-model", icon: <Network size={15} /> },
      ],
    },
    { name: "Contact Us", href: "/contactus" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
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
        <div className="flex items-center justify-between gap-2 xl:gap-4 px-4 sm:px-6 py-3.5 sm:py-4">
          {/* Logo */}
          <Link href="/" className="z-[80] flex-shrink-0 text-2xl sm:text-3xl font-extrabold">
            <span className="text-orange-500">koop</span>
            <span className="text-slate-800">india</span>
            <span className="text-orange-500">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5 text-[13.5px] font-bold text-gray-800">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button className={`flex items-center cursor-pointer gap-1 px-3 py-2 rounded-lg transition-all whitespace-nowrap font-bold
                      ${openDropdown === item.name ? "bg-gray-50 text-orange-500" : "hover:bg-gray-50 hover:text-orange-500"}`}>
                      {item.name}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === item.name ? "rotate-180 text-orange-500" : "text-gray-400"}`} />
                    </button>

                    {/* Premium Dropdown Panel */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1
                      bg-white rounded-2xl shadow-2xl border border-gray-100/80 transition-all duration-200 overflow-hidden
                      ${openDropdown === item.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                      style={{ minWidth: "260px" }}
                    >
                      {/* Colored top strip */}
                      <div className={`h-1 w-full bg-gradient-to-r ${item.color}`} />

                      {/* Header label */}
                      <div className={`px-4 py-2.5 border-b border-gray-100 ${item.light}`}>
                        <span className={`text-[11px] font-extrabold tracking-widest uppercase ${item.accent}`}>
                          {item.name}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="p-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-gray-700 font-bold hover:${item.light} hover:${item.accent} transition-all group`}
                          >
                            <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                              {sub.icon}
                            </span>
                            <span className="leading-tight">{sub.name}</span>
                            <ChevronRight size={12} className="ml-auto text-gray-300 group-hover:text-orange-400 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-orange-500 transition-colors whitespace-nowrap block font-bold"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:block flex-shrink-0">
            <button
              onClick={onOpenModal}
              className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer px-5 py-2.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap shadow-md shadow-orange-500/20"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="xl:hidden p-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors z-[80]"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* ===== MOBILE OVERLAY ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] xl:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* ===== MOBILE SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white z-[110] xl:hidden
        shadow-2xl transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
          <Link href="/" onClick={closeMobileMenu} className="text-xl font-extrabold">
            <span className="text-orange-500">koop</span>
            <span className="text-slate-800">india</span>
            <span className="text-orange-500">.</span>
          </Link>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-[calc(100%-65px)]">
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <ul className="py-2">
              {navigationItems.map((item) => (
                <li key={item.name} className="border-b border-gray-100 last:border-b-0">
                  {item.dropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === item.name ? null : item.name);
                        }}
                        className="w-full flex justify-between items-center px-5 py-4 text-gray-900 font-bold active:bg-gray-50 transition-colors"
                      >
                        <span className="text-[15px]">{item.name}</span>
                        <ChevronDown
                          size={20}
                          className={`text-gray-500 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180 text-orange-500" : ""}`}
                        />
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === item.name ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        }`}>
                        {/* Colored strip in mobile */}
                        <div className={`h-0.5 mx-4 bg-gradient-to-r ${item.color} rounded-full mb-1`} />
                        <div className="py-1 px-3">
                          {item.dropdown.map((sub) => (
                            <button
                              key={sub.name}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate(sub.href);
                              }}
                              className="flex items-center gap-3 w-full text-left px-3 py-3 my-0.5 text-[13.5px] text-gray-800 font-bold hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all active:scale-[0.98]"
                            >
                              <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                                {sub.icon}
                              </span>
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(item.href);
                      }}
                      className="w-full flex justify-between items-center px-5 py-4 font-bold active:bg-gray-50 transition-colors text-gray-900"
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
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 rounded-lg shadow-md transition-all active:scale-[0.98]"
            >
              Free Consultation
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">© 2026 KoopIndia</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
