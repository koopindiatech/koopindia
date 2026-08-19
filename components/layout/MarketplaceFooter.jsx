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
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Logo + Description + Socials */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebook size={15} />, href: "https://www.facebook.com/KoopIndiaa" },
                { icon: <FaInstagram size={15} />, href: "https://www.instagram.com/koop_india/" },
                { icon: <FaLinkedin size={15} />, href: "https://www.linkedin.com/company/koop-india/" },
                { icon: <FaYoutube size={15} />, href: "https://www.youtube.com/@KoopIndia" },
              ].map(({ icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#f97316] flex items-center justify-center transition-colors text-gray-300 hover:text-white"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "All Brands", href: "/marketplace" },
                { label: "Categories", href: "/marketplace" },
                { label: "About Us", href: "/aboutus" },
                { label: "Contact Us", href: "/contactus" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-gray-400 hover:text-[#f97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                "Food & Beverages",
                "Health & Wellness",
                "Industrial & Machinery",
                "Home Care & Essentials",
                "Business Tools",
                "View All Categories",
              ].map((cat) => (
                <li key={cat}>
                  <Link href={`/marketplace?category=${encodeURIComponent(cat)}`} className="text-[13px] text-gray-400 hover:text-[#f97316] transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Branding Guide", href: "/resources/branding-guide" },
                { label: "Export Guide", href: "/resources/export-guide" },
                { label: "Business Tools", href: "/resources/business-tools" },
                { label: "Success Stories", href: "/resources/success-stories" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-gray-400 hover:text-[#f97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Support
            </h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: "Help Center", href: "/contactus" },
                { label: "FAQs", href: "/contactus" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Contact Support", href: "/contactus" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-gray-400 hover:text-[#f97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full inline-block" />
              Newsletter
            </h4>
            <p className="text-[12px] text-gray-500 mb-3 leading-relaxed">
              Subscribe to get updates on latest brands, trends and opportunities.
            </p>
            {subscribed ? (
              <p className="text-[12px] text-green-400 font-semibold">✓ Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white text-[12px] font-bold px-3 py-2 rounded-lg transition-colors flex-shrink-0"
                >
                  →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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
