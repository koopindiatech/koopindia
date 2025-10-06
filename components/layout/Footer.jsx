import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import React from "react";

const Footer = ({onOpenModal}) => {
  return (
    <footer className="bg-white text-[#141d32] border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <Link href="/">
            <h1 className="text-3xl font-extrabold">
              <span className="text-[#F97316]">koop</span>
              <span className="text-[#141d32]">india</span>
              <span className="text-[#F97316]">.</span>
            </h1>
          </Link>
          <p className="text-gray-600 mt-3">
            The No.1 Distribution Partnership Platform
          </p>
        </div>

        {/* Product Section */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316]">PRODUCT</h3>
          <ul className="space-y-2">
            <li><Link href=" " className="hover:text-[#F97316]">For Products</Link></li>
            <li><Link href=" " className="hover:text-[#F97316]">For Distributors</Link></li>
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

        {/* Company Section */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316]">COMPANY</h3>
          <ul className="space-y-2">
             <li><Link href="/blog" className="hover:text-[#F97316]">Blog</Link></li>
            <li><Link href="/aboutus" className="hover:text-[#F97316]">About us</Link></li>
            <li><Link href="/privacy" className="hover:text-[#F97316]">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4 text-[#F97316]">SOCIAL</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaFacebook /> <Link href="https://www.facebook.com/KoopIndiaa" className="hover:text-[#F97316]">Facebook</Link>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaInstagram /> <Link href="https://www.instagram.com/koop_india/?hl=en" className="hover:text-[#F97316]">Instagram</Link>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaLinkedin /> <Link href="https://www.linkedin.com/company/koop-india/" className="hover:text-[#F97316]">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="text-gray-700 text-center pb-5 px-4">
        <p className="text-sm">© 2025 Koop India. All rights reserved.</p>
        <p className="text-xs mt-2">
          <Link href="/privacy" className="hover:text-[#F97316]">Privacy Policy</Link> |{" "}
          <Link href="/termsevices" className="hover:text-[#F97316]">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;