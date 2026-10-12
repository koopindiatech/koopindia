"use client";

import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

const MarketplaceFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0d1b2e] text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 justify-between">

          {/* Logo + Description + Socials */}
          <div className="lg:col-span-5">
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <div>
                <div className="font-black text-[16px] leading-none text-white">
                  KOOP <span className="text-[#f97316]">INDIA</span>
                </div>
                <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-0.5">
                  Grow Brands. Grow India
                </div>
              </div>
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed mb-5">
              Empowering Indian Brands by connecting them with the right business opportunities across India and beyond.
            </p>
                        <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebook size={15} />, href: "https://www.facebook.com/KoopIndiaa" },
                { icon: <FaInstagram size={15} />, href: "https://www.instagram.com/koop_india/?hl=en" },
                { icon: <FaLinkedin size={15} />, href: "https://www.linkedin.com/company/koop-india/" },
                { icon: <FaYoutube size={15} />, href: "https://www.youtube.com/@KoopIndia" },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#f97316] flex items-center justify-center transition-colors text-gray-300 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Quick Links
            </h4>
            <ul className="text-[13px] text-gray-400 space-y-2.5">
              <li>
                <Link href="/marketplace" className="hover:text-[#f97316] transition-colors inline-flex items-center gap-2">
                  <span className="text-[#f97316]/70 text-xs">›</span> Home Page
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="hover:text-[#f97316] transition-colors inline-flex items-center gap-2">
                  <span className="text-[#f97316]/70 text-xs">›</span> Sellers
                </Link>
              </li>
              <li>
                <Link href="/buyers" className="hover:text-[#f97316] transition-colors inline-flex items-center gap-2">
                  <span className="text-[#f97316]/70 text-xs">›</span> Buyers
                </Link>
              </li>
              <li>
                <Link href="/seller-buyer-registration?tab=seller" className="hover:text-[#f97316] transition-colors inline-flex items-center gap-2">
                  <span className="text-[#f97316]/70 text-xs">›</span> Register as a Seller
                </Link>
              </li>
              <li>
                <Link href="/seller-buyer-registration?tab=buyer" className="hover:text-[#f97316] transition-colors inline-flex items-center gap-2">
                  <span className="text-[#f97316]/70 text-xs">›</span> Register as a Buyer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Contact Us
            </h4>
            <div className="text-[13px] text-gray-400 space-y-3">
              <p className="flex items-center gap-2">
                <span className="text-[#f97316]">✉️</span>
                <a href="mailto:koopindiadl@gmail.com" className="hover:text-white transition-colors">koopindiadl@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#f97316]">📞</span>
                <a href="tel:+919599826131" className="hover:text-white transition-colors">+91 95998 26131</a>
              </p>
              <div className="pt-2 border-t border-white/5 space-y-3">
                <p className="flex items-start gap-2">
                  <span className="text-[#f97316] mt-0.5">📍</span>
                  <span className="leading-relaxed">
                    <span className="block text-gray-300 font-semibold">Registered Office:</span>
                    D-455, Pul Prahladpur<br/>New Delhi 110044
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#f97316] mt-0.5">📍</span>
                  <span className="leading-relaxed">
                    <span className="block text-gray-300 font-semibold">Corporate Office:</span>
                    C-3 Third Floor Sector 6 Noida,<br/>Uttar Pradesh 201301 India
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

            <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-gray-500">© 2026 Koop India. All Rights Reserved.</p>
          <p className="text-[12px] text-gray-500">
            Made with <span className="text-[#f97316]">♥</span> for Indian Brands
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
