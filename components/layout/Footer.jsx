import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Lightbulb } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Footer = ({ onOpenModal }) => {
  const servicesRef = useRef(null);
  const scrollRef = useRef(0);

  // SMOOTH AUTO SCROLL
  useEffect(() => {
    const el = servicesRef.current;
    if (!el) return;

    let animationFrameId;

    const smoothScroll = () => {
      scrollRef.current += 0.25;
      el.scrollTop = scrollRef.current;

      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        scrollRef.current = 0;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <footer className="bg-white text-[#141d32] border-t border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="text-center md:text-left">
          <Link href="/">
            <h1 className="text-3xl font-extrabold">
              <span className="text-[#F97316]">koop</span>
              <span className="text-[#141d32]">india</span>
              <span className="text-[#F97316]">.</span>
            </h1>
          </Link>
          <p className="text-gray-600 mt-3">
            Koop India is a business launchpad for startups and entrepreneurs,
            providing expert consultation and end-to-end support for
            registration, compliance, and growth.
          </p>
        </div>

        {/* Product */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316]">PRODUCT</h3>
          <ul className="space-y-2">
            <li>
              <Link href=" " className="hover:text-[#F97316]">
                For Products
              </Link>
            </li>
            <li>
              <Link href=" " className="hover:text-[#F97316]">
                For Distributors
              </Link>
            </li>
            <li>
              <button
                onClick={onOpenModal}
                className="hover:text-[#F97316] cursor-pointer"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316]">COMPANY</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="hover:text-[#F97316]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-[#F97316]">
                About us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#F97316]">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* SERVICES – SMOOTH AUTO SCROLL */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316] flex items-center gap-2 justify-center md:justify-start">
            <Lightbulb size={18} /> OUR SERVICES
          </h3>

          <div
            ref={servicesRef}
            className="h-40 pr-2 overflow-y-scroll no-scrollbar"
          >
            <ul className="space-y-2">
              <li>
                <Link href="/solutions/brands" className="hover:text-[#F97316]">
                  Startups / Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/distributors"
                  className="hover:text-[#F97316]"
                >
                  Buyers / Distributors
                </Link>
              </li>
              <li>
                <Link
                  href="/tech-solutions/website-development"
                  className="hover:text-[#F97316]"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="/tech-solutions/crm-development"
                  className="hover:text-[#F97316]"
                >
                  CRM Development
                </Link>
              </li>
              <li>
                <Link
                  href="/tech-solutions/seo"
                  className="hover:text-[#F97316]"
                >
                  SEO Services
                </Link>
              </li>
              <li>
                <Link
                  href="/startup-consulting/business"
                  className="hover:text-[#F97316]"
                >
                  Business Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/startup-consulting/market-analysis"
                  className="hover:text-[#F97316]"
                >
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/startup-consulting/product-valuation"
                  className="hover:text-[#F97316]"
                >
                  Product & Margin Valuation
                </Link>
              </li>
              <li>
                <Link
                  href="/startup-consulting/distribution-model"
                  className="hover:text-[#F97316]"
                >
                  Distribution Module
                </Link>
              </li>
              <li>
                <Link
                  href="/startup-consulting/franchise-model"
                  className="hover:text-[#F97316]"
                >
                  Franchise Module
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation-compliance/gst-registration"
                  className="hover:text-[#F97316]"
                >
                  GST Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation-compliance/company-registration"
                  className="hover:text-[#F97316]"
                >
                  Company Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation-compliance/trademark-registration"
                  className="hover:text-[#F97316]"
                >
                  Trademark Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation-compliance/fssai-license"
                  className="hover:text-[#F97316]"
                >
                  FSSAI License
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation-compliance/iso-certification"
                  className="hover:text-[#F97316]"
                >
                  ISO Certification
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-marketing/social-media"
                  className="hover:text-[#F97316]"
                >
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-marketing/gmb"
                  className="hover:text-[#F97316]"
                >
                  Google My Business
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-marketing/logo-design"
                  className="hover:text-[#F97316]"
                >
                  Logo & Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-marketing/content-writing"
                  className="hover:text-[#F97316]"
                >
                  Content Writing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316]">SOCIAL</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 justify-center hover:text-[#F97316] md:justify-start">
              <FaFacebook className="mt-[1px]" />
              <Link href="https://www.facebook.com/KoopIndiaa">Facebook</Link>
            </li>
            <li className="flex items-center gap-2 justify-center hover:text-[#F97316] md:justify-start">
              <FaInstagram className="mt-[1px]" />
              <Link href="https://www.instagram.com/koop_india/?hl=en">
                Instagram
              </Link>
            </li>
            <li className="flex items-center gap-2 justify-center hover:text-[#F97316] md:justify-start">
              <FaLinkedin className="mt-[1px]" />
              <Link href="https://www.linkedin.com/company/koop-india/">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-gray-700 text-center pb-5 px-4">
        <p className="text-sm">© 2026 Koop India. All rights reserved.</p>
        <p className="text-xs mt-2">
          <Link href="/privacy" className="hover:text-[#F97316]">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/term-services" className="hover:text-[#F97316]">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
