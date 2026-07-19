"use client";
import React from "react";
import {
  Rocket,
  Target,
  Zap,
  CheckCircle,
  Star,
  Share2,
  Database,
} from "lucide-react";
import Link from "next/link";
import Footer from "../layout/Footer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = ({ onOpenModal }) => {
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const services = [
    {
      img: "/services/bussiness-consulting1.jpeg",
      link: "/startup-consulting/business",
      alt: "Business Consulting Services",
      isISI: true,
    },
    {
      img: "/services/company-registration.jpeg",
      link: "/documentation-compliance/company-registration-services",
      alt: "Company Registration Services",
    },
    {
      img: "/services/fssai-registration.jpeg",
      link: "/documentation-compliance/fssai-license",
      alt: "FSSAI License Services",
    },
    {
      img: "/services/gst-registration.jpeg",
      link: "/documentation-compliance/gst-registration",
      alt: "GST Registration Services",
    },
    {
      img: "/services/startupindia-registration.jpeg",
      link: "/documentation-compliance/startup-india-registration",
      alt: "Startup India Registration Services",
    },
    {
      img: "/services/trademark-registration.jpeg",
      link: "/documentation-compliance/trademark-registration",
      alt: "Trademark Registration Services",
    },
    {
      img: "/services/socialmedia-marketing.jpeg",
      link: "/digital-marketing/social-media",
      alt: "Social Media Marketing Services",
    },
    {
      img: "/services/seo-optmization.jpeg",
      link: "/tech-solutions/seo",
      alt: "SEO Optimization Services",
    },
    {
      img: "/services/crm-development.jpeg",
      link: "/tech-solutions/crm-development",
      alt: "CRM Development Services",
    },
    {
      img: "/services/website-design.jpeg",
      link: "/tech-solutions/website-development",
      alt: "Website Development Services",
    },
    {
      img: "/services/iso-certificate.jpeg",
      link: "/documentation-compliance/iso-certification",
      alt: "ISO Certification Services",
    },
    {
      img: "/services/graphics-design.jpeg",
      link: "/digital-marketing/logo-design",

      alt: "Logo Design Services",
    },
  ];

  // const Services = showAllServices ? servicesData : servicesData.slice(0, 4);
  // const doubledServices = [...services, ...services];

  const reviews = [
    {
      name: "Tayyiba Naturals",
      role: "Founder",
      company: "Health & Wellness",
      content:
        "As a startup founder, working with Koop India was a great decision. They simplified registrations, GST, and compliance, allowing us to focus on growth. Clear communication and timely delivery.",
      rating: 5,
    },
    {
      name: "Rishikesh Herbs Natural",
      role: "Client",
      company: "Natural Products",
      content:
        "I connected with koop india through fb ads, koop india did all documents related work for my company. Best supporting team, on time delivery, anyone can trust on it.",
      rating: 5,
    },
    {
      name: "Gaurav ZRB",
      role: "Client",
      company: "Small Business",
      content:
        "Koop india bahut achha kaam karte hain. Maine GST Register karaya tha jo ki bahut jaldi kar diya. Paise bhi sahi liye. Mai koop india ko refer karta hoon.",
      rating: 5,
    },
    {
      name: "Umair Misbah",
      role: "Founder & CEO",
      company: "EZDoors India Pvt Ltd",
      content:
        "One stop solution for the Startup. From business registration to digital marketing, their approach saved us months of effort.",
      rating: 5,
    },
    {
      name: "Sarikha",
      role: "Founder & CEO",
      company: "Kiro Elvi Foods Pvt Ltd",
      content:
        "The strategic guidance and branding solutions provided by Koop India accelerated our market entry significantly.",
      rating: 5,
    },
    {
      name: "Amir Quadri",
      role: "Founder & CEO",
      company: "Foodista Spices",
      content:
        "Excellent service and deep industry knowledge. Their team handled our compliance and marketing with utmost professionalism.",
      rating: 5,
    },
  ];

  const handleNavigation = (href) => {
    router.push(href);
    setIsOpen(false);
  };

  const slides = [
    {
      title: "Empowering Businesses to",
      highlight: "Start, Grow & Succeed",
      desc: "Koop India helps GST Registration, Trademark, FSSAI & Complete Business Solutions — all in one place.",
      img: "/dash-image2.png",
      bg: "/bg-image1.png",
      icons: [
        { label: "Launch", icon: <Rocket size={20} /> },
        { label: "Grow", icon: <Target size={20} /> },
        { label: "Scale", icon: <Zap size={20} /> },
      ],
    },
    {
      title: "Custom Solutions for",
      highlight: "Website & CRM Development",
      desc: "Automate your sales and operations with our custom CRM tools and high-performance business websites.",
      img: "/website-banner.png", // CRM specific image
      bg: "/bg-image1.png",
      icons: [
        { label: "Design", icon: <Share2 size={20} /> },
        { label: "Develop", icon: <Database size={20} /> },
        { label: "Automate", icon: <Zap size={20} /> },
      ],
    },
    {
      title: "Scale Your Brand with",
      highlight: "Social Media Marketing",
      desc: "Get more leads and better reach with targeted Meta Ads, Google Ads, and creative content strategies.",
      img: "/dash-image4.png", // Marketing specific image
      bg: "/bg-image1.png",
      icons: [
        { label: "Viral", icon: <Rocket size={20} /> },
        { label: "Ads", icon: <Target size={20} /> },
        { label: "Leads", icon: <Zap size={20} /> },
      ],
    },
  ];

  // Auto-scroll logic (Har 5 second mein change hoga)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const allReviews = [...reviews, ...reviews];

  return (
    <div className="bg-[#141d32] text-white">
      {/* ------- Hero Section ------- */}

      {/* <section
        className="pt-16 px-6 sm:px-6 md:px-10 lg:px-15 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-8 md:gap-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg-image1.png')",
        }}
      >
        <div>
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-6">
            Empowering Businesses to Start ,
            <span className="text-[#F97316] text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
              Grow & Succeed
            </span>
          </h1>

          <p className="text-lg sm:text-lg mb-8 sm:mb-6">
            Koop India helps GST Registration, Trademark Registration, FSSAI
            License, Website Development & Complete Business Solutions — all in
            one place.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-10 mb-8 sm:mb-8">
            <button
              className="w-full sm:w-auto bg-[#F97316] text-white px-8 sm:px-6 py-4 sm:py-3 text-lg sm:text-base rounded-lg  font-semibold cursor-pointer"
              onClick={() => onOpenModal && onOpenModal()}
            >
              Talk To Experts →
            </button>

            <button
              className="w-full sm:w-auto border border-[#F97316] text-[#F97316] hover:bg-[#4e4037] px-8 sm:px-6 py-4 sm:py-3 text-lg sm:text-base rounded-lg  font-semibold cursor-pointer"
              onClick={() => onOpenModal && onOpenModal()}
            >
              Get Started →
            </button>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-3 md:gap-4 mb-10 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-3 sm:gap-2 bg-white text-[#141d32] px-6 sm:px-4 md:px-6 py-4 sm:py-2.5 md:py-3 rounded-xl shadow hover:bg-gray-100 border border-[#F97316]">
              <Rocket size={20} className="sm:w-5 sm:h-5" />

              <span className="font-semibold text-lg sm:text-base">Launch</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-2 bg-white text-[#141d32] px-6 sm:px-4 md:px-6 py-4 sm:py-2.5 md:py-3 rounded-xl shadow hover:bg-gray-100 border border-[#F97316]">
              <Target size={20} className="sm:w-5 sm:h-5" />

              <span className="font-semibold text-lg sm:text-base">Grow</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-2 bg-white text-[#141d32] px-6 sm:px-4 md:px-6 py-4 sm:py-2.5 md:py-3 rounded-xl shadow hover:bg-gray-100 border border-[#F97316]">
              <Zap size={20} className="sm:w-5 sm:h-5" />

              <span className="font-semibold text-lg sm:text-base">Scale</span>
            </div>
          </div>


          <div className="bg-white/5 p-6 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl shadow-lg border border-white/10">
            <h3 className="text-xl sm:text-xl font-semibold text-[#F97316] mb-6 sm:mb-4">
              Trusted by Innovators & Founders
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4 md:gap-6 text-white/80 sm:text-white/70">
              <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
                50+ Startups Guided
              </div>

              <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
                99% Client Satisfaction
              </div>

              <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
                24x7 Founder Support
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block -mt-20">
          <img
            src="dash-image2.png"
            alt="Dashboard Preview"
            className=" w-full h-auto"
          />
        </div>
      </section> */}

      <div className="relative overflow-hidden bg-[#0a1128]">
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            // Smooth Background Fade Effect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="px-6 md:px-10 lg:px-16 py-0 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-0 min-h-[600px] bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${slides[activeTab].bg})`,
            }}
          >
            {/* Left Content Animation */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="animate-fadeIn z-10 py-10"
            >
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#F97316] animate-pulse"></span>
                <span className="text-xs font-medium text-gray-200 tracking-wider uppercase">
                  {activeTab === 0
                    ? "Global Certification Partner"
                    : activeTab === 1
                      ? "Next-Gen Tech Solutions"
                      : "Digital Growth Experts"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                {slides[activeTab].title} <br />
                <span className="text-[#F97316]">
                  {slides[activeTab].highlight}
                </span>
              </h1>

              <p className="text-lg text-gray-200 mb-8 max-w-2xl leading-relaxed opacity-90">
                {slides[activeTab].desc}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                {/* Talk To Experts Button */}
                <button
                  className="bg-[#F97316] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-all cursor-pointer"
                  onClick={onOpenModal} // Direct call karein
                >
                  Talk To Experts →
                </button>

                {/* Start Now Button */}
                <button
                  className="border border-white/40 text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#0a1128] transition-all cursor-pointer"
                  onClick={onOpenModal} // Direct call karein
                >
                  Start Now
                </button>
              </div>

              {/* Action Cards */}
              <div className="flex flex-wrap gap-3">
                {slides[activeTab].icons.map((item, i) => (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    key={i}
                    className="flex items-center gap-2.5 bg-white text-[#141d32] px-5 py-3 rounded-xl shadow-2xl font-bold border-b-4 border-[#F97316]"
                  >
                    <span className="text-[#F97316]">{item.icon}</span>
                    <span className="text-sm font-bold tracking-tight">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image Animation */}
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden md:flex justify-end items-center relative h-full"
            >
              <img
                src={slides[activeTab].img}
                alt="Service Preview"
                className={`
            w-[120%] max-w-none h-auto object-contain drop-shadow-2xl ml-[-10%] lg:ml-[-25%]
            ${activeTab === 1 ? "mt-1" : "mt-0"}
          `}
              />
            </motion.div>
          </motion.section>
        </AnimatePresence>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeTab === i
                  ? "w-12 bg-[#F97316]"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
      {/* About Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Column */}
            <div>
              <h2 className="text-4xl font-bold text-[#141d32] mb-6">
                Your Complete Business Growth Partner
              </h2>
              <p className="text-xl text-gray-600 mb-6 font-medium">
                Koop India is your one-stop solution to start, manage, and grow
                your business with ease.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We don’t just offer services—we build businesses. From company
                registration and legal compliance to website development and
                digital growth, we provide everything you need under one roof.
                Whether you're a startup or an established brand, our
                expert-driven solutions help you move faster and scale smarter.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-[#141d32] mb-3 flex items-center">
                    <span className="text-[#F97316] mr-2">💼</span> What We Do
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Business Registration (GST, Trademark, FSSAI)</li>
                    <li>• Website & E-commerce Development</li>
                    <li>• Branding & Digital Marketing</li>
                    <li>• Growth Strategy & Consulting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#141d32] mb-3 flex items-center">
                    <span className="text-[#F97316] mr-2">🎯</span> Why Choose
                    Us?
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• End-to-End Solutions</li>
                    <li>• Affordable & Transparent Pricing</li>
                    <li>• Expert Guidance at Every Step</li>
                    <li>• Fast & Hassle-Free Process</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#F97316]/10 to-transparent rounded-2xl">
                <div className="relative">
                  <img
                    src="/about-image1.jpeg"
                    alt="Koop India Business Growth"
                    className="rounded-xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------- SME Overview Section ------- */}
      <section className="w-full py-12 px-4 md:px-8" style={{ background: "#0F1F3D" }}>
        <div className="max-w-6xl mx-auto">

          {/* Wrapper: cards + connector columns */}
          <div className="hidden lg:grid items-center" style={{ gridTemplateColumns: "1fr 48px 320px 48px 1fr" }}>

            {/* ── LEFT CARD ── */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ minHeight: "380px" }}>
              <div className="bg-orange-500 px-5 pt-5 pb-6 flex flex-col gap-3">
                <div className="bg-white rounded-full flex items-center gap-2 px-3 py-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="text-gray-400 text-sm">Search Services</span>
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xl leading-tight">Business Setup</h3>
                  <p className="text-orange-100 text-xs mt-1 leading-snug">All your essential business services<br />under one roof.</p>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {[
                    { icon: "📄", label: "GST\nRegistration" },
                    { icon: "🏢", label: "Company\nRegistration" },
                    { icon: "®️", label: "Trademark\nRegistration" },
                    { icon: "📋", label: "FSSAI\nRegistration" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">{icon}</div>
                      <span className="text-white text-[9px] leading-tight whitespace-pre-line">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-white px-5 py-4 flex flex-col justify-between gap-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Quick Start</p>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "✅", text: "100% Online Process" },
                    { icon: "⚡", text: "Same Day Registration" },
                    { icon: "🔒", text: "Govt. Certified Experts" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-1.5">
                      <span className="text-sm">{icon}</span>
                      <span className="text-xs font-bold text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CONNECTOR LEFT → CENTER ── */}
            <div className="flex items-center justify-center w-full h-full">
              <svg width="48" height="16" viewBox="0 0 48 16" preserveAspectRatio="none" className="w-full">
                <line x1="6" y1="8" x2="42" y2="8" stroke="#F97316" strokeWidth="2" strokeDasharray="5 4"/>
                <circle cx="6" cy="8" r="5" fill="#F97316"/>
                <circle cx="42" cy="8" r="5" fill="#F97316"/>
              </svg>
            </div>

            {/* ── CENTER CARD (taller / elevated) ── */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col py-7 px-6" style={{ minHeight: "420px", marginTop: "-20px", marginBottom: "-20px" }}>
              <div className="flex flex-col items-start mb-3">
                <div className="flex items-center mb-1">
                  <span className="text-[26px] font-extrabold tracking-tight">
                    <span className="text-orange-500">koop</span>
                    <span className="text-[#1E3A5F]">india</span>
                    <span className="text-orange-500">.</span>
                  </span>
                </div>
                <p className="text-orange-500 font-bold text-sm tracking-wide">Launch. Scale. Lead.</p>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {[
                  { icon: "🏛️", color: "#1E3A5F", label: "Business Registration & Compliance" },
                  { icon: "📢", color: "#F97316", label: "Branding & Digital Marketing" },
                  { icon: "💻", color: "#1E3A5F", label: "Website & Software Development" },
                  { icon: "🧑‍💼", color: "#F97316", label: "Startup & Business Consulting" },
                  { icon: "📈", color: "#1E3A5F", label: "End-to-End Growth Solutions" },
                ].map(({ icon, color, label }) => (
                  <div key={label} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base" style={{ background: color }}>
                      {icon}
                    </div>
                    <span className="font-semibold text-[#1E3A5F] text-sm leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CONNECTOR CENTER → RIGHT ── */}
            <div className="flex items-center justify-center w-full h-full">
              <svg width="48" height="16" viewBox="0 0 48 16" preserveAspectRatio="none" className="w-full">
                <line x1="6" y1="8" x2="42" y2="8" stroke="#F97316" strokeWidth="2" strokeDasharray="5 4"/>
                <circle cx="6" cy="8" r="5" fill="#F97316"/>
                <circle cx="42" cy="8" r="5" fill="#F97316"/>
              </svg>
            </div>

            {/* ── RIGHT CARD ── */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ minHeight: "380px" }}>
              <div className="bg-orange-500 px-5 pt-5 pb-4 flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute right-3 top-3 flex flex-col items-end gap-1 opacity-80">
                  <div className="flex gap-1.5">
                    <span className="text-white/70 text-lg">🎯</span>
                    <span className="text-white/70 text-lg">📊</span>
                  </div>
                  <span className="text-3xl">🚀</span>
                  <span className="text-white/60 text-sm">🌐</span>
                </div>
                <div className="bg-white rounded-full flex items-center gap-2 px-3 py-2 w-4/5">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="text-gray-400 text-sm">Search Solutions</span>
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xl leading-tight">Digital Growth</h3>
                  <p className="text-orange-100 text-xs mt-1 leading-snug w-3/5">Powerful solutions to grow your business online.</p>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {[
                    { icon: "🖥️", label: "Website\nDevelopment" },
                    { icon: "🔍", label: "SEO\nServices" },
                    { icon: "👍", label: "Social Media\nMarketing" },
                    { icon: "⚙️", label: "CRM\nSoftware" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">{icon}</div>
                      <span className="text-white text-[9px] leading-tight whitespace-pre-line">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-white px-5 py-4 flex flex-col justify-between gap-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Results We Deliver</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "500+", label: "Websites Built" },
                    { value: "10x", label: "Avg. ROI" },
                    { value: "24/7", label: "Support" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center bg-orange-50 rounded-xl py-2 px-1">
                      <span className="text-orange-500 font-extrabold text-base leading-tight">{value}</span>
                      <span className="text-[9px] text-gray-500 font-semibold text-center leading-tight mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Mobile: stacked vertically */}
          <div className="flex lg:hidden flex-col gap-6">
            {/* Left card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-orange-500 px-5 pt-5 pb-6 flex flex-col gap-3">
                <div className="bg-white rounded-full flex items-center gap-2 px-3 py-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="text-gray-400 text-sm">Search Services</span>
                </div>
                <h3 className="text-white font-extrabold text-xl">Business Setup</h3>
                <p className="text-orange-100 text-xs">All your essential business services under one roof.</p>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { icon: "📄", label: "GST\nRegistration" },
                    { icon: "🏢", label: "Company\nRegistration" },
                    { icon: "®️", label: "Trademark\nRegistration" },
                    { icon: "📋", label: "FSSAI\nRegistration" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">{icon}</div>
                      <span className="text-white text-[9px] leading-tight whitespace-pre-line">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white px-5 py-4 flex flex-col gap-2">
                <div className="h-2 bg-gray-100 rounded-full w-4/5" />
                <div className="h-2 bg-gray-100 rounded-full w-3/5" />
              </div>
            </div>
            {/* Center card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl px-6 py-7">
              <div className="flex items-center gap-2 mb-1">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                  <text x="1" y="28" fontSize="27" fontWeight="900" fill="#1E3A5F">k</text>
                  <path d="M17 19 L27 7" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round"/>
                  <polygon points="27,7 21,9 26,14" fill="#F97316"/>
                </svg>
                <span style={{ fontWeight: 900, fontSize: "20px", color: "#1E3A5F" }}>
                  koopindia<span style={{ color: "#F97316" }}>.</span>
                </span>
              </div>
              <p className="text-orange-500 font-bold text-sm mb-4">Launch. Scale. Lead.</p>
              <div className="flex flex-col gap-1">
                {[
                  { icon: "🏛️", color: "#1E3A5F", label: "Business Registration & Compliance" },
                  { icon: "📢", color: "#F97316", label: "Branding & Digital Marketing" },
                  { icon: "💻", color: "#1E3A5F", label: "Website & Software Development" },
                  { icon: "🧑‍💼", color: "#F97316", label: "Startup & Business Consulting" },
                  { icon: "📈", color: "#1E3A5F", label: "End-to-End Growth Solutions" },
                ].map(({ icon, color, label }) => (
                  <div key={label} className="flex items-center gap-3 py-2 px-2 rounded-xl">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: color }}>{icon}</div>
                    <span className="font-semibold text-[#1E3A5F] text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-orange-500 px-5 pt-5 pb-4 flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute right-3 top-3 opacity-70">
                  <span className="text-3xl">🚀</span>
                </div>
                <div className="bg-white rounded-full flex items-center gap-2 px-3 py-2 w-4/5">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></svg>
                  <span className="text-gray-400 text-sm">Search Solutions</span>
                </div>
                <h3 className="text-white font-extrabold text-xl">Digital Growth</h3>
                <p className="text-orange-100 text-xs">Powerful solutions to grow your business online.</p>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { icon: "🖥️", label: "Website\nDevelopment" },
                    { icon: "🔍", label: "SEO\nServices" },
                    { icon: "👍", label: "Social Media\nMarketing" },
                    { icon: "⚙️", label: "CRM\nSoftware" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-1">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">{icon}</div>
                      <span className="text-white text-[9px] leading-tight whitespace-pre-line">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white px-5 py-4 flex flex-col gap-2">
                <div className="h-2 bg-gray-100 rounded-full w-4/5" />
                <div className="h-2 bg-gray-100 rounded-full w-3/5" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------- Solutions Section ------- */}
      <section id="solution" className="py-16 px-4 md:px-8 scroll-mt-24" style={{ background: "#F8F9FF" }}>
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-500/10 text-orange-500 font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border border-orange-500/20 mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl font-extrabold text-[#141d32] tracking-tight">
              Our Core <span className="text-orange-500">Solutions</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Everything your business needs to launch, grow and scale — under one roof.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Card 1 — Strategic Business */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 rounded-l-2xl" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-2xl shadow-md shadow-orange-200 flex-shrink-0">
                  ♟️
                </div>
                <h3 className="text-lg font-bold text-[#141d32] leading-snug">Strategic Business Solutions</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Market insights & strategies designed for sustainable business growth.
              </p>
              <ul className="space-y-2">
                {["Business Consulting", "Market Research & Analysis", "Product & Margin Valuation", "Distribution & Franchise Consultancy"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#141d32]">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 — Creative & Branding */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#141d32] rounded-l-2xl" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#141d32] flex items-center justify-center text-2xl shadow-md shadow-slate-200 flex-shrink-0">
                  💡
                </div>
                <h3 className="text-lg font-bold text-[#141d32] leading-snug">Creative & Branding Solutions</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Build a strong brand identity with compelling designs & creative assets.
              </p>
              <ul className="space-y-2">
                {["Logo & Brand Identity Design", "Product Packaging Design", "Marketing Collaterals", "Social Media Creative Designs"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#141d32]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#141d32] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 — Digital Growth */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#141d32] rounded-l-2xl" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#141d32] flex items-center justify-center text-2xl shadow-md shadow-slate-200 flex-shrink-0">
                  📈
                </div>
                <h3 className="text-lg font-bold text-[#141d32] leading-snug">Digital Growth Solutions</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Drive performance & generate quality leads with digital marketing.
              </p>
              <ul className="space-y-2">
                {["Social Media Marketing", "Search Engine Optimization (SEO)", "Google & Meta Ads Management", "Website Design & Development"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#141d32]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#141d32] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4 — Tech & Automation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 rounded-l-2xl" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-2xl shadow-md shadow-orange-200 flex-shrink-0">
                  ⚙️
                </div>
                <h3 className="text-lg font-bold text-[#141d32] leading-snug">Tech & Automation Solutions</h3>
              </div>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Automate workflows & improve efficiency with smart tech solutions.
              </p>
              <ul className="space-y-2">
                {["CRM Software Development", "ERP for Business Automation", "E-commerce Store Setup", "Data Analytics & Reporting Tools"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#141d32]">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ------- Services Section ------- */}

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold text-center text-black mb-12">
            OUR SERVICES
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="
                group
                relative
                rounded-2xl
                bg-white
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-1
               shadow-[4px_4px_0px_rgba(255,140,0,0.25)]
               hover:shadow-[8px_8px_0px_rgba(255,140,0,0.35)]"
              >
                <div className="relative w-full h-[160px] sm:h-[170px] md:h-[190px]">
                  <Image
                    src={service.img}
                    alt={service.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                  <span className="bg-[#F97316] text-white text-sm font-semibold px-4 py-2 rounded-md shadow">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1128] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-orange-400">
            Success stories from entrepreneurs who built their brand with us
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="flex">
          <div className="animate-scroll flex gap-8">
            {allReviews.map((testimonial, index) => (
              <div
                key={index}
                className="w-[350px] bg-white text-gray-800 p-8 rounded-2xl relative pt-16 shadow-2xl flex-shrink-0"
              >
                {/* Google Logo */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                  <img
                    src="google-image.png"
                    alt="Google"
                    className="w-16 h-16"
                  />
                </div>

                {/* Review Content */}
                <p className="text-gray-600 mb-8 text-md italic leading-relaxed min-h-[100px]">
                  "{testimonial.content}"
                </p>

                {/* Client Info */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-start">
                    <div className="max-w-[180px]">
                      <div className="font-black text-lg uppercase leading-tight">
                        {testimonial.name}
                      </div>
                      <div className="text-[#F97316] text-xs font-bold uppercase mt-1">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-400 text-[10px] font-semibold mt-1 uppercase">
                        {testimonial.company}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex space-x-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#F97316] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------- Section -------- */}
      <div>
        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-[#F97316] to-[#e5650d] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 100+ successful entrepreneurs who chose Koop India as their
              growth partner. Get started with a free consultation today.
            </p>

            <div className=" sm:flex-row gap-4 justify-center items-center">
              <button
                className="bg-white text-[#F97316] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onOpenModal && onOpenModal()}
              >
                Schedule Free Consultation
              </button>
            </div>

            <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-white/80">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Free Consultation
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                No Hidden Charges
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                24/7 Support
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
