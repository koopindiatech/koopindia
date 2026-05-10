"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronDown,
  Phone,
  Award,
  TrendingUp,
  Users,
  Zap,
  Lock,
  RefreshCw,
  Star,
  MapPin,
  BadgeCheck,
  FileText,
  Briefcase,
  Building2,
  ChevronRight,
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

/* ─── Fade-in on scroll hook ─── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useFadeIn();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else setCount(start);
    }, 20);
    return () => clearInterval(id);
  }, [visible, end]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── FAQ accordion ─── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left bg-transparent border-0 cursor-pointer group"
      >
        <span
          className={`text-sm font-semibold pr-4 transition-colors duration-200 ${open ? "text-orange-500" : "text-slate-800"}`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-orange-500 rotate-180" : "bg-orange-50"}`}
        >
          <ChevronDown
            size={14}
            className={open ? "text-white" : "text-orange-500"}
          />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="text-sm text-slate-500 leading-relaxed pb-5 pr-8">{a}</p>
      </div>
    </div>
  );
}

/* ─── Scroll-triggered fade wrapper ─── */
function Fade({ children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-orange-500 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full mb-3">
      {children}
    </span>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ children, light = false }) {
  return (
    <h2
      className={`font-extrabold leading-tight mb-3 ${light ? "text-white" : "text-slate-900"}`}
      style={{ fontSize: "clamp(20px, 2.8vw, 30px)" }}
    >
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════ */
const FSSAILicensePage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const stats = [
    { value: 5000, suffix: "+", label: "Licenses Processed" },
    { value: 98, suffix: "%", label: "Approval Rate" },
    { value: 7, suffix: " Days", label: "Avg. Basic TAT" },
    { value: 500, suffix: "+", label: "Happy Clients" },
  ];

  const licenseTypes = [
    {
      tag: "Starter",
      title: "Basic Registration",
      turnover: "Up to ₹12 Lakh / year",
      color: "#10b981",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      items: [
        "Home-based food businesses",
        "Small retailers & petty manufacturers",
        "Food stalls, hawkers, small caterers",
        "Temporary / seasonal food sellers",
      ],
    },
    {
      tag: "Most Popular",
      title: "State License",
      featured: true,
      turnover: "₹12 Lakh – ₹20 Crore / year",
      color: "#F97316",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      items: [
        "Restaurants, hotels, cloud kitchens",
        "Medium-scale manufacturers",
        "Distributors within one state",
        "Catering businesses & canteens",
      ],
    },
    {
      tag: "Enterprise",
      title: "Central License",
      turnover: "Above ₹20 Crore / Mandatory",
      color: "#6366f1",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      items: [
        "Large-scale food manufacturers",
        "Importers & exporters of food",
        "eCommerce food businesses",
        "Multi-state & all-India operations",
      ],
    },
  ];

  const docSections = [
    {
      title: "Common Documents",
      icon: FileText,
      color: "text-orange-500",
      bg: "bg-orange-50",
      docs: [
        "PAN Card of applicant / entity",
        "Aadhaar Card of proprietor / director",
        "Passport-size photograph",
        "Valid email ID & mobile number",
        "Business address proof (utility bill / rent deed)",
      ],
    },
    {
      title: "Business Entity Documents",
      icon: Briefcase,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      docs: [
        "Certificate of Incorporation (Pvt Ltd / LLP)",
        "Partnership Deed (if applicable)",
        "GST Registration Certificate",
        "Shop & Establishment Certificate",
        "Board Resolution (for companies)",
      ],
    },
    {
      title: "Premises & Product Docs",
      icon: Building2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      docs: [
        "Rent agreement / NOC from owner",
        "List of food products to be manufactured",
        "Water test report (for manufacturers)",
        "Layout plan of food premises",
        "Food Safety Management System (FSMS) plan",
      ],
    },
  ];

  const steps = [
    {
      title: "Free Consultation",
      desc: "Understand your business type, turnover & operations to select the correct license category.",
    },
    {
      title: "Document Collection",
      desc: "Our team collects, verifies, and prepares all required documents to avoid delays or rejections.",
    },
    {
      title: "Application Filing",
      desc: "Online application submitted on the official FoSCoS portal with accurate business details.",
    },
    {
      title: "Review & Scrutiny",
      desc: "Department reviews your application. We handle all queries and respond promptly on your behalf.",
    },
    {
      title: "Inspection (If Needed)",
      desc: "For State & Central licenses, physical inspection of premises may be conducted by FSSAI officers.",
    },
    {
      title: "License Issued",
      desc: "FSSAI License certificate issued and delivered. You are now legally compliant to operate.",
    },
  ];

  const faqs = [
    {
      q: "Is FSSAI registration mandatory for all food businesses in Delhi?",
      a: "Yes, every Food Business Operator (FBO) in Delhi involved in manufacturing, processing, storage, distribution, or sale of food must obtain FSSAI registration or license before commencing operations. This applies to restaurants, home bakers, cloud kitchens, retailers, and manufacturers alike.",
    },
    {
      q: "How do I find the best FSSAI registration consultant in Delhi?",
      a: "Look for consultants with a proven track record, high approval rates, expertise on the FoSCoS portal, and end-to-end documentation support. Koop India is a trusted FSSAI registration consultant in Delhi with 5000+ licenses processed and a 98% approval rate.",
    },
    {
      q: "What is the difference between FSSAI registration and license in Delhi?",
      a: "FSSAI Basic Registration is for very small businesses (turnover up to ₹12 lakh). State & Central Licenses are for medium and large-scale businesses. The type depends on your turnover, scale of operations, and nature of business.",
    },
    {
      q: "How long does FSSAI registration take in Delhi?",
      a: "Basic Registration typically takes 3–7 working days. State License takes 7–30 days and Central License may take 30–60 days depending on government processing and inspection schedules.",
    },
    {
      q: "Can I sell food online without FSSAI license?",
      a: "No. Any food business selling online (via Swiggy, Zomato, Amazon, your own website) must hold a valid FSSAI license. eCommerce food sellers typically require a Central License.",
    },
    {
      q: "What is the validity of an FSSAI license?",
      a: "FSSAI licenses can be obtained for 1 to 5 years. You can choose the validity at the time of application. Renewal should be done before expiry to avoid penalties.",
    },
    {
      q: "What are the penalties for operating without FSSAI license?",
      a: "Operating without FSSAI registration can attract penalties up to ₹5 lakh and imprisonment up to 6 months under the Food Safety and Standards Act, 2006.",
    },
    {
      q: "Do I need a separate FSSAI license for each state?",
      a: "If you manufacture or process food in multiple states, you may need a Central License. However, storage and distribution from a common warehouse in one state can be covered under a State License for that state.",
    },
    {
      q: "Can I modify my FSSAI license after it is issued?",
      a: "Yes. You can apply for modification to update business name, address, food products, or other details. Koop India provides full post-license modification support.",
    },
    {
      q: "Where can I get FSSAI food license registration near me in Delhi?",
      a: "Koop India offers 100% online FSSAI food license registration across all Delhi NCR areas including Connaught Place, Karol Bagh, Lajpat Nagar, Dwarka, Rohini, Saket, Noida, and Gurugram. No physical visit needed — everything is handled online.",
    },
  ];

  const whyKoop = [
    {
      icon: Award,
      title: "Food Compliance Specialists",
      desc: "Dedicated team with in-depth FSSAI knowledge since the FoSCoS portal migration.",
    },
    {
      icon: Zap,
      title: "Fast & Hassle-free Process",
      desc: "We handle everything end-to-end — you just focus on your business.",
    },
    {
      icon: Users,
      title: "MSME & Startup Friendly",
      desc: "Affordable packages designed for small food businesses and first-time applicants.",
    },
    {
      icon: TrendingUp,
      title: "Correct License Selection",
      desc: "Wrong license type leads to penalties. We ensure you apply for the right one.",
    },
    {
      icon: Lock,
      title: "100% Secure & Confidential",
      desc: "Your business data is protected and never shared with any third party.",
    },
    {
      icon: RefreshCw,
      title: "Renewal & Compliance Support",
      desc: "We remind you before expiry and handle annual returns, modifications & more.",
    },
  ];

  const delhiAreas = [
    "Connaught Place",
    "Karol Bagh",
    "Lajpat Nagar",
    "Saket",
    "Dwarka",
    "Rohini",
    "Pitampura",
    "Janakpuri",
    "Nehru Place",
    "Noida",
    "Gurugram",
    "Faridabad",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .fp { font-family: 'DM Sans', sans-serif; color: #374151; line-height: 1.6; background: #fff; }
        .fp h1, .fp h2, .fp h3, .fp h4 { font-family: 'Sora', sans-serif; margin: 0; }
        .fp p { margin: 0; }
        @keyframes fp-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,.4)} 55%{box-shadow:0 0 0 10px rgba(249,115,22,0)} }
        .fp-pulse { animation: fp-pulse 2.8s infinite; }
        .fp-card { transition: transform .22s ease, box-shadow .22s ease; }
        .fp-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.09); }
        .fp-obtn { transition: background .2s, color .2s, border-color .2s; }
        .fp-obtn:hover { background: #F97316 !important; color: #fff !important; border-color: #F97316 !important; }
        .hero-grid { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0); background-size: 36px 36px; }
        .gradient-text { background: linear-gradient(135deg, #F97316 0%, #fb923c 50%, #fbbf24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .step-connector::after { content: ''; position: absolute; right: -10px; top: 50%; transform: translateY(-50%); width: 20px; height: 2px; background: linear-gradient(90deg, #e2e8f0, #f97316); }
        .area-pill { transition: all .2s; cursor: default; }
        .area-pill:hover { background: #F97316; color: #fff; border-color: #F97316; transform: scale(1.04); }
      `}</style>

      <div className="fp">
        {/* ══ HERO ══ */}
        <section
          className="relative overflow-hidden hero-grid"
          style={{
            background:
              "linear-gradient(135deg,#0F172A 0%,#1a2744 55%,#0F172A 100%)",
            padding: "80px 24px",
          }}
        >
          {/* Decorative orbs */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(ellipse, rgba(249,115,22,0.4) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 border border-orange-500/20 px-4 py-1.5 mb-5">
                <MapPin size={11} className="text-orange-400" />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-orange-400">
                  #1 FSSAI Registration Consultant in Delhi
                </span>
              </div>

              {/* H1 — keyword-rich */}
              <h1
                className="mb-4 font-extrabold leading-[1.1] text-white"
                style={{ fontSize: "clamp(24px,4vw,46px)" }}
              >
                FSSAI License Registration in{" "}
                <span className="gradient-text">Delhi</span> & Food License
                Consultant
              </h1>

              {/* Categories */}
              <p className="mb-2 text-sm font-semibold text-slate-400">
                Basic FSSAI Registration &nbsp;•&nbsp; State Food License
                &nbsp;•&nbsp; Central FSSAI License
              </p>

              {/* Description with SEO keywords naturally embedded */}
              <p
                className="mx-auto p-6 mb-8 max-w-[1260px] text-sm leading-relaxed text-slate-300"
                style={{ fontSize: "clamp(13px,1.5vw,15px)" }}
              >
                Koop India is Delhi's most trusted{" "}
                <strong className="text-white">
                  FSSAI registration consultant
                </strong>{" "}
                offering expert guidance on{" "}
                <strong className="text-white">
                  food license registration in Delhi
                </strong>{" "}
                via the FoSCoS portal. Whether you need a{" "}
                <strong className="text-white">
                  FSSAI certificate in Delhi
                </strong>{" "}
                for your restaurant, cloud kitchen, home bakery, or food
                manufacturing unit — we handle everything end-to-end with 100%
                compliance and fast delivery.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                <button
                  onClick={onOpenModal}
                  className="fp-pulse group flex items-center cursor-pointer gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_-5px_rgba(249,115,22,0.45)] transition-all hover:bg-orange-600 active:scale-95"
                >
                  Apply for Food License in Delhi
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={onOpenModal}
                  className="rounded-xl border cursor-pointer border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
                >
                  Free FSSAI Eligibility Check
                </button>
              </div>

              {/* Trust Signals */}
              <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
                {[
                  "✓ 100% Online FoSCoS Process",
                  "✓ Fast FSSAI Certificate Delivery",
                  "✓ Renewal & Modification Support",
                  "✓ Delhi NCR Service Coverage",
                ].map((text) => (
                  <span
                    key={text}
                    className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {text}
                  </span>
                ))}
              </div>

              {/* Rating */}
              <div className="mt-7 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-amber-400"
                      fill="#fbbf24"
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  4.9/5 · 500+ Delhi clients
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <section
          className="bg-white border-b border-slate-100"
          style={{ padding: "32px 24px" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center relative">
                  {i < stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-slate-100" />
                  )}
                  <p
                    className="text-3xl font-extrabold text-slate-900 leading-none"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    <Counter end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHAT IS FSSAI ══ */}
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div>
                  <SectionLabel>Overview</SectionLabel>
                  <SectionHeading>What is an FSSAI License?</SectionHeading>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    The{" "}
                    <strong className="text-slate-700">
                      FSSAI (Food Safety and Standards Authority of India)
                    </strong>{" "}
                    license is a mandatory legal requirement for every Food
                    Business Operator (FBO) in India involved in manufacturing,
                    processing, packaging, storage, transportation,
                    distribution, or retail of food products.
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Governed by the{" "}
                    <strong className="text-slate-700">
                      Food Safety and Standards Act, 2006
                    </strong>
                    , FSSAI ensures all food sold in India meets defined safety
                    and quality standards. As Delhi's leading{" "}
                    <strong className="text-slate-700">
                      food license consultant
                    </strong>
                    , Koop India ensures your{" "}
                    <strong className="text-slate-700">
                      FSSAI food license registration in Delhi
                    </strong>{" "}
                    is accurate, compliant, and approved at the first attempt.
                  </p>

                  {/* Delhi-specific highlight */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 mb-2">
                    <MapPin
                      size={16}
                      className="text-orange-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-slate-600">
                      Serving all food businesses across{" "}
                      <strong className="text-slate-800">
                        India, Delhi, NCR, Noida & Gurugram
                      </strong>{" "}
                      — online FSSAI registration from the comfort of your home
                      or office.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-7">
                  <p className="font-bold text-sm text-slate-800 mb-5 flex items-center gap-2">
                    <BadgeCheck size={15} className="text-orange-500" />
                    Why FSSAI license is essential for your food business:
                  </p>
                  {[
                    "Operate legally and avoid government penalties up to ₹5 lakh",
                    "Build consumer trust & brand credibility in the market",
                    "Sell on Swiggy, Zomato, Amazon, Flipkart & modern trade",
                    "Appoint distributors, dealers & franchise partners",
                    "Required for Shop & Establishment and GST registration",
                    "Mandatory for bank loans & investor due diligence",
                    "Display FSSAI number on packaging — legal requirement",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3">
                      <CheckCircle
                        size={13}
                        className="text-orange-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ DELHI COVERAGE ══ */}
        <section className="py-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-7xl mx-auto text-center">
            <Fade>
              <p className="text-white font-bold text-base mb-2">
                FSSAI Registration Services Across Delhi NCR{" "}
              </p>
              <p className="text-orange-100 text-sm py-4 mb-6">
                Trusted <strong>FSSAI registration consultant in Delhi</strong>{" "}
                serving every neighbourhood
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {delhiAreas.map((area, i) => (
                  <span
                    key={i}
                    className="area-pill text-xs font-semibold bg-white/15 border border-white/25 text-white px-3 py-1.5 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ LICENSE TYPES ══ */}
        <section className="py-14 px-6 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="text-center mb-12">
                <SectionLabel>License Categories</SectionLabel>
                <SectionHeading>Types of FSSAI Licenses </SectionHeading>
                <p className="text-sm text-slate-500 max-w-7xl mx-auto">
                  As an experienced{" "}
                  <strong className="text-slate-600">
                    FSSAI license consultant in Delhi
                  </strong>
                  , we help you choose the right category based on your
                  turnover, scale, and nature of food business.
                </p>
              </div>
            </Fade>

            <div className="grid md:grid-cols-3 gap-6">
              {licenseTypes.map((lt, i) => (
                <Fade key={i} delay={i * 80}>
                  <div
                    className={`fp-card bg-white rounded-2xl border-2 ${lt.featured ? "border-orange-400 shadow-[0_8px_40px_rgba(249,115,22,0.15)]" : "border-slate-200"} p-7 h-full flex flex-col relative overflow-hidden`}
                  >
                    {lt.featured && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{ background: lt.color + "18", color: lt.color }}
                      >
                        {lt.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {lt.title}
                    </h3>
                    <p
                      className="text-xs font-semibold mb-5"
                      style={{ color: lt.color }}
                    >
                      {lt.turnover}
                    </p>
                    <div className="flex-1">
                      {lt.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2.5 mb-3">
                          <CheckCircle
                            size={13}
                            style={{ color: lt.color }}
                            className="mt-0.5 flex-shrink-0"
                          />
                          <span className="text-sm text-slate-500">{item}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={onOpenModal}
                      className="fp-obtn mt-6 w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
                      style={{
                        background: lt.featured ? lt.color : "transparent",
                        color: lt.featured ? "#fff" : lt.color,
                        borderColor: lt.color,
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={200}>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 text-center">
                <span className="text-sm text-amber-800">
                  <strong>
                    Not sure which FSSAI license suits your Delhi food business?
                  </strong>{" "}
                  — Our experts will guide you for free.{" "}
                  <button
                    onClick={onOpenModal}
                    className="text-orange-500 font-bold underline bg-transparent border-0 cursor-pointer text-sm"
                    style={{ fontFamily: "inherit" }}
                  >
                    Get free guidance →
                  </button>
                </span>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ DOCUMENTS ══ */}
        <section className="py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="text-center mb-12">
                <SectionLabel>Checklist</SectionLabel>
                <SectionHeading>
                  Documents Required for FSSAI License
                </SectionHeading>
                <p className="text-sm max-w-7xl text-slate-500">
                  Koop India verifies & prepares all documents — zero rejection
                  guarantee for{" "}
                  <strong className="text-slate-600">
                    FSSAI food license registration in Delhi
                  </strong>
                  .
                </p>
              </div>
            </Fade>

            <div className="grid md:grid-cols-3 gap-6">
              {docSections.map((sec, i) => (
                <Fade key={i} delay={i * 70}>
                  <div className="fp-card bg-white border border-slate-200 rounded-2xl p-6 h-full">
                    <div
                      className={`w-10 h-10 ${sec.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <sec.icon size={18} className={sec.color} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-4">
                      {sec.title}
                    </h4>
                    {sec.docs.map((d, j) => (
                      <div key={j} className="flex items-start gap-2.5 mb-3">
                        <CheckCircle
                          size={13}
                          className="text-orange-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm text-slate-500">{d}</span>
                      </div>
                    ))}
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={180}>
              <p className="text-sm text-emerald-600 mt-5 flex items-center gap-2">
                <CheckCircle
                  size={14}
                  className="text-emerald-500 flex-shrink-0"
                />
                Koop India verifies & prepares documents to avoid rejection or
                delays — end-to-end handled for all Delhi clients.
              </p>
            </Fade>
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section className="py-14 px-6 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="text-center mb-12">
                <SectionLabel>How It Works</SectionLabel>
                <SectionHeading>FSSAI Registration Procedure</SectionHeading>
                <p className="text-sm text-slate-500">
                  Simple 6-step online process — entirely managed by Koop
                  India's expert FSSAI team.
                </p>
              </div>
            </Fade>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((s, i) => (
                <Fade key={i} delay={i * 70}>
                  <div className="fp-card bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden group">
                    {/* Step number watermark */}
                    <span
                      className="absolute -right-2 -top-4 text-7xl font-black text-slate-50 select-none transition-colors group-hover:text-orange-50"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {i + 1}
                    </span>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800">
                          {s.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={250}>
              <div className="mt-8 flex flex-wrap gap-5 justify-center">
                {[
                  {
                    icon: Clock,
                    text: "Basic Registration: 3–7 working days",
                    color: "text-emerald-500",
                  },
                  {
                    icon: Clock,
                    text: "State License: 7–30 working days",
                    color: "text-orange-500",
                  },
                  {
                    icon: Clock,
                    text: "Central License: 30–60 working days",
                    color: "text-indigo-500",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-500"
                  >
                    <t.icon size={13} className={t.color} />
                    {t.text}
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ WHY KOOP ══ */}
        <section className="py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="text-center mb-12">
                <SectionLabel>Why Us</SectionLabel>
                <SectionHeading>
                  Why Koop India is Delhi's Best FSSAI Consultant
                </SectionHeading>
                <p className="text-sm text-slate-500 max-w-7xl mx-auto">
                  Trusted by 500+ food businesses in Delhi NCR for accurate,
                  fast, and compliant FSSAI license registration.
                </p>
              </div>
            </Fade>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyKoop.map(({ icon: Icon, title, desc }, i) => (
                <Fade key={i} delay={i * 70}>
                  <div className="fp-card bg-white border border-slate-200 rounded-2xl p-6 flex gap-4">
                    <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={19} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPLIANCE ══ */}
        <section className="py-14 px-6 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div>
                  <SectionLabel>Compliance</SectionLabel>
                  <SectionHeading>
                    FSSAI Compliance & Annual Requirements
                  </SectionHeading>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    Getting your{" "}
                    <strong className="text-slate-700">
                      FSSAI food license in Delhi
                    </strong>{" "}
                    is just the beginning. Every food business must adhere to
                    ongoing compliance requirements to remain legally
                    operational and avoid penalties.
                  </p>
                  {[
                    "Display FSSAI license number on all food products & packaging",
                    "Maintain food safety & hygiene standards at all times",
                    "File annual returns (Form D1 for Central, Form D2 for State)",
                    "Renew license before expiry to avoid penalties & disruption",
                    "Maintain records of food recall, complaints, and testing",
                    "Cooperate fully with FSSAI inspection officers",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3">
                      <ShieldCheck
                        size={13}
                        className="text-orange-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-8"
                  style={{
                    background: "linear-gradient(135deg,#0F172A,#1e2d4a)",
                  }}
                >
                  <h4 className="text-white font-bold text-sm mb-5 flex items-center gap-2">
                    <BadgeCheck size={15} className="text-orange-400" />
                    Post-License Support by Koop India
                  </h4>
                  {[
                    "FSSAI license renewal — before expiry",
                    "Annual returns filing (Form D1 / D2)",
                    "Modification of license (address, products, turnover)",
                    "Inspection preparation & response support",
                    "FSSAI notices & query resolution",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3.5">
                      <CheckCircle
                        size={13}
                        className="text-orange-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                  <button
                    onClick={onOpenModal}
                    className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white border-0 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
                    style={{ fontFamily: "inherit" }}
                  >
                    Know More About Compliance →
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-5xl mx-auto">
              <Fade>
                <div className="text-center mb-12">
                  <SectionLabel>FAQ</SectionLabel>
                  <SectionHeading>Frequently Asked Questions</SectionHeading>
                  <p className="text-sm text-slate-500">
                    Everything you need to know about{" "}
                    <strong className="text-slate-600">
                      FSSAI license registration in Delhi
                    </strong>
                    .
                  </p>
                </div>
              </Fade>

              <Fade delay={100}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 pt-2 pb-2">
                  {faqs.map((f, i) => (
                    <FAQ key={i} q={f.q} a={f.a} />
                  ))}
                </div>
              </Fade>

              {/* Schema FAQ (hidden, SEO) */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  }),
                }}
              />

              {/* ══ REVIEW SCHEMA ══ */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Koop India",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500"
      }
    }),
  }}
/>

{/* ══ BREADCRUMB SCHEMA ══ */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.koopindia.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "FSSAI Registration Consultant Delhi",
          "item": "https://www.koopindia.com/documentation-compliance/fssai-license"
        }
      ]
    }),
  }}
/>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section
          className="relative overflow-hidden text-center"
          style={{
            background: "linear-gradient(135deg,#0F172A,#1a2744)",
            padding: "80px 24px",
          }}
        >
          <div
            className="pointer-events-none absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            }}
          />

          <Fade>
            <div className="max-w-2xl mx-auto relative">
              <span className="inline-block bg-orange-500/15 text-orange-400 text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 border border-orange-500/20">
                Start Today
              </span>
              <h2
                className="text-white font-extrabold leading-tight mb-4"
                style={{ fontSize: "clamp(20px,3.2vw,32px)" }}
              >
                Get Your FSSAI License in
                <span className="gradient-text">Fast, Easy & 100% Online</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-5xl mx-auto">
                Whether you are a home baker, restaurant owner, food
                manufacturer, importer, or eCommerce seller in Delhi — Koop
                India ensures a smooth, compliant{" "}
                <strong className="text-slate-300">FSSAI registration</strong>{" "}
                from day one.
              </p>
              <div className="flex flex-wrap gap-3 p-5 justify-center">
                <button
                  onClick={onOpenModal}
                  className="fp-pulse flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white border-0 px-8 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-colors"
                  style={{ fontFamily: "inherit" }}
                >
                  Apply for FSSAI License Now <ArrowRight size={16} />
                </button>
                <button
                  onClick={onOpenModal}
                  className="flex items-center gap-2 bg-transparent text-slate-300 border border-white/20 px-7 py-3.5 rounded-xl font-medium text-sm cursor-pointer hover:bg-white/5 transition-colors"
                  style={{ fontFamily: "inherit" }}
                >
                  <Phone size={14} /> Talk to an FSSAI Expert
                </button>
              </div>
              <p className="text-slate-600 text-xs mt-6">
                ✓ Free consultation &nbsp;•&nbsp; ✓ No upfront payment
                &nbsp;•&nbsp; ✓ Expert-handled end-to-end
              </p>
            </div>
          </Fade>
        </section>

        {/* ══ LOCAL BUSINESS SCHEMA ══ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Koop India - FSSAI Registration Consultant Delhi",
              description:
                "FSSAI Registration Consultant in Delhi offering Basic, State & Central Food License registration services.",
              url: "https://www.koopindia.com/documentation-compliance/fssai-license",
              areaServed: [
                "Delhi",
                "New Delhi",
                "Noida",
                "Gurugram",
                "Faridabad",
                "Ghaziabad",
              ],
              serviceType: "FSSAI License Registration",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "FSSAI License Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "FSSAI Basic Registration Delhi",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "FSSAI State License Delhi",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "FSSAI Central License Delhi",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* ══ ENQUIRY MODAL ══ */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default FSSAILicensePage;
