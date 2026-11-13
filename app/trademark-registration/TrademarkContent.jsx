"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronDown,
  Star,
  FileText,
  Users,
  TrendingUp,
  Building,
  CreditCard,
  AlertCircle,
  Award,
  Zap,
  Globe,
  BarChart3,
  Lock,
  MessageSquare,
  User,
  Building2,
  BadgeCheck,
  Rocket,
  BookOpen,
  CheckCircle2,
  XCircle,
  Fingerprint,
  Palette,
  Tag,
  Package,
  Type,
  Image,
  RefreshCw,
  Search,
  PenTool,
  Send,
  Eye,
  Megaphone,
  Shield,
  MapPin,
} from "lucide-react";

// FAQ Data
export const faqs = [
  {
    q: "What is Trademark Registration and who should apply?",
    a: "Trademark Registration is the legal process of protecting your brand name, logo, tagline, or any unique identifier under the Trade Marks Act, 1999 in India. Any individual, startup, company, LLP, or partnership firm that wants exclusive legal rights over their brand identity should apply. It's especially critical for businesses planning to scale, franchise, or expand into new markets.",
  },
  {
    q: "What is the difference between ™ and ® symbols?",
    a: "™ (TM) symbol can be used as soon as you file your trademark application—it indicates a pending trademark. ® (Registered) symbol can only be used after your trademark is officially registered and a registration certificate is issued. Misusing ® before registration is a legal offence in India.",
  },
  {
    q: "How long does Trademark Registration take in India?",
    a: "The application can be filed within 1–2 working days. However, complete registration (getting the ® certificate) typically takes 18–24 months, subject to examination, objections, opposition, and journal publication. If there are no objections, it may be faster. You can legally use the ™ symbol from the filing date.",
  },
  {
    q: "What are Trademark Classes and how do I choose the right one?",
    a: "Trademarks are registered under 45 classes—Classes 1–34 cover goods and Classes 35–45 cover services. Choosing the correct class is critical because protection is class-specific. For example, a food brand should file under Class 30 or 43. Koop India's experts analyze your business and recommend the most appropriate classes to maximize protection.",
  },
  {
    q: "What happens if my Trademark Application gets an Objection?",
    a: "After examination, the Trademark Office may issue an Examination Report raising objections. You must file a reply (TM-O) within 30 days. If the objection is not resolved, a hearing is scheduled. Koop India's team drafts strong legal replies and represents you in hearings to ensure the best possible outcome.",
  },
  {
    q: "Can two businesses have the same Trademark?",
    a: "Generally, no. The Trademark Office checks for similarity with existing marks in the same class. However, identical marks may coexist if they are in completely different classes and there's no likelihood of confusion. For famous marks, protection extends beyond the registered class.",
  },
  {
    q: "Is Trademark Registration valid across all of India?",
    a: "Yes. A trademark registered in India gives nationwide protection under The Trade Marks Act, 1999. For international protection, you need to file under the Madrid Protocol, which Koop India can also assist with.",
  },
  {
    q: "What is Trademark Opposition and how do I handle it?",
    a: "After publication in the Trademark Journal, third parties have 4 months to oppose your mark by filing TM-O. If opposed, you must file a counter-statement (TM-O) within 2 months. Our legal team handles opposition proceedings, files counter-statements, and represents you before the Hearing Officer.",
  },
  {
    q: "How long is a Trademark valid and how do I renew it?",
    a: "A registered trademark is valid for 10 years from the date of filing. It can be renewed indefinitely every 10 years by filing Form TM-R and paying the renewal fee. If renewal is missed, there's a 6-month grace period with a surcharge. Koop India sends renewal reminders and handles the renewal process.",
  },
  {
    q: "Can I trademark a name that is already in use but not registered?",
    a: "It is risky. If someone is using an unregistered mark as a prior user, they can oppose your application or file a passing-off action. A thorough trademark search before filing is essential. Koop India conducts comprehensive searches—including common law searches—to assess conflicts before you apply.",
  },
];

const trademarkTypes = [
  {
    type: "Word Mark",
    desc: "Protects brand names, business names, product names in standard text form.",
    who: "Brand names like 'Koop', 'Tata', 'Zomato'",
    icon: Type,
    color: "#F97316",
    itcLabel: "Broadest Protection",
    itcOk: true,
    tag: "Most Common",
  },
  {
    type: "Device Mark (Logo)",
    desc: "Protects visual logos, designs, stylized typography, or graphical representations.",
    who: "Logos with unique color, font, or graphical style",
    icon: Palette,
    color: "#0284c7",
    itcLabel: "Visual Identity",
    itcOk: true,
    tag: "Visual Brand",
  },
  {
    type: "Composite Mark",
    desc: "Combines both name and logo in a single application for comprehensive protection.",
    who: "Businesses wanting both word and design registered together",
    icon: Tag,
    color: "#16a34a",
    itcLabel: "Name + Logo Combo",
    itcOk: true,
    tag: "Complete Package",
  },
  {
    type: "Tagline / Slogan",
    desc: "Protects distinctive catchphrases, marketing slogans, and marketing taglines.",
    who: "Memorable lines like 'Just Do It', 'Connecting People'",
    icon: Megaphone,
    color: "#7c3aed",
    itcLabel: "Marketing Asset",
    itcOk: false,
    tag: "Taglines & Slogans",
  },
  {
    type: "Sound Mark",
    desc: "Protects distinctive musical jingles, audio branding, or sonic logos.",
    who: "Audio cues like the Netflix 'ta-dum', Britannia chime",
    icon: Zap,
    color: "#db2777",
    itcLabel: "Audio Branding",
    itcOk: false,
    tag: "Specialized",
  },
  {
    type: "3D / Shape Mark",
    desc: "Protects distinctive 3D product shapes, packaging, or bottle silhouettes.",
    who: "Iconic shapes like the Coca-Cola bottle contour",
    icon: Package,
    color: "#ea580c",
    itcLabel: "Packaging & Form",
    itcOk: false,
    tag: "Physical Shape",
  },
];

const classesData = [
  { classNum: "Class 05", name: "Pharmaceuticals & Healthcare", type: "Goods", desc: "Medicines, baby food, dietary supplements, medical preparations." },
  { classNum: "Class 09", name: "Electronics, Software & AI", type: "Goods", desc: "Computers, software, apps, electronic hardware, eyewear." },
  { classNum: "Class 25", name: "Clothing, Footwear & Apparel", type: "Goods", desc: "Garments, fashion apparel, footwear, headwear, uniforms." },
  { classNum: "Class 29", name: "Meat, Dairy & Edible Oils", type: "Goods", desc: "Processed foods, dairy products, edible oils, dry fruits, jams." },
  { classNum: "Class 30", name: "Coffee, Tea, Spices & Bakery", type: "Goods", desc: "Staples, flour, bakery items, spices, snacks, confectionery." },
  { classNum: "Class 32", name: "Beverages, Water & Juices", type: "Goods", desc: "Mineral water, aerated drinks, fruit juices, non-alcoholic drinks." },
  { classNum: "Class 35", name: "Advertising, Business & Retail", type: "Services", desc: "E-commerce stores, retail outlets, business management, marketing." },
  { classNum: "Class 36", name: "Finance, Real Estate & Fintech", type: "Services", desc: "Banking, lending apps, insurance, real estate agencies." },
  { classNum: "Class 41", name: "Education, Training & Media", type: "Services", desc: "Schools, EdTech, coaching centers, publishing, entertainment." },
  { classNum: "Class 42", name: "IT, Software & SaaS", type: "Services", desc: "Software development, SaaS platforms, cloud hosting, tech consulting." },
  { classNum: "Class 43", name: "Restaurants, Hotels & Cafes", type: "Services", desc: "Food delivery, cloud kitchens, hotels, catering, bars, cafes." },
  { classNum: "Class 44", name: "Medical, Beauty & Wellness", type: "Services", desc: "Clinics, hospitals, salons, spas, wellness centers, diagnostics." },
];

const processSteps = [
  {
    step: "01",
    title: "Comprehensive TM Search",
    duration: "Day 1",
    desc: "Our IP attorneys conduct an in-depth phonetic, visual, and well-known trademark search on the official IP India registry to assess registrability and flag potential conflicts before filing.",
    icon: Search,
  },
  {
    step: "02",
    title: "Class Selection & Strategy",
    duration: "Day 1–2",
    desc: "We analyze your business activities to identify the correct class(es) under the NICE classification (1–45). Proper class selection is critical to ensure broad, enforceable protection without paying for redundant classes.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Form TM-A Drafting & Filing",
    duration: "Day 2",
    desc: "We draft and file your Trademark Application (Form TM-A) directly on the IP India portal. You receive an official Application Number with an acknowledgment receipt on the same day.",
    icon: Send,
  },
  {
    step: "04",
    title: "Start Using ™ Symbol",
    duration: "Immediate",
    desc: "From the moment Form TM-A is submitted and the application number is generated, you can legally affix the ™ symbol next to your brand name, logo, or tagline.",
    icon: Award,
  },
  {
    step: "05",
    title: "Examination & Objection Handling",
    duration: "Months 1–3",
    desc: "The Trademark Examiner reviews the application. If an objection is raised under Section 9 or 11, our legal team drafts and submits a formal legal reply (TM-O) within the mandatory 30-day window.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Journal Publication & Opposition",
    duration: "Months 4–8",
    desc: "Once accepted, the trademark is published in the official Trademark Journal for 4 months to allow public opposition. If opposed, our attorneys handle counter-statements and represent you at hearings.",
    icon: Eye,
  },
  {
    step: "07",
    title: "Registration & ® Certificate",
    duration: "Month 8+",
    desc: "If no opposition is filed (or once resolved in your favor), the Registrar issues the official Trademark Registration Certificate. You can now proudly use the ® symbol for the next 10 years.",
    icon: CheckCircle2,
  },
];

const docsReq = [
  {
    entity: "Individual / Proprietorship",
    docs: [
      "PAN Card & Aadhaar Card of Applicant",
      "Brand Name, Logo, or Tagline in high resolution",
      "Signed Form TM-48 (Power of Attorney)",
      "Address Proof (Passport, Voter ID, or Utility Bill)",
      "User Affidavit with documentary proof if claiming prior use",
    ],
    tag: "Simplest Documentation",
  },
  {
    entity: "Startups (DPIIT Recognized)",
    docs: [
      "DPIIT Recognition Certificate (50% Govt. Fee Rebate)",
      "PAN Card of the Entity / Directors",
      "Certificate of Incorporation / Partnership Deed",
      "Signed Form TM-48 (Power of Attorney)",
      "Brand Logo / Word Mark Details",
      "User Affidavit with earliest proof of use",
    ],
    tag: "50% Govt Fee Rebate",
  },
  {
    entity: "Pvt Ltd / LLP / OPC",
    docs: [
      "Certificate of Incorporation & MOA/AOA / LLP Agreement",
      "Company / LLP PAN Card",
      "PAN & Aadhaar Cards of Authorized Director / Partner",
      "Signed Board Resolution or Authorization Letter",
      "Signed Form TM-48 (Power of Attorney)",
      "MSME / Udyam Registration (for 50% Govt Fee Rebate)",
    ],
    tag: "MSME Discount Available",
  },
  {
    entity: "Trust / Society / Partnership",
    docs: [
      "Partnership Deed / Trust Deed / Society Registration",
      "PAN Card of the Firm / Trust / Society",
      "Identity Proof of all Partners / Trustees",
      "Authorization Letter signed by all Partners",
      "Signed Form TM-48 (Power of Attorney)",
      "Proof of brand usage (invoices, marketing collateral)",
    ],
    tag: "Multi-Partner Entities",
  },
];

const comparisonData = [
  { feature: "Official Govt. Filing Fee", startup: "50% Rebate with MSME / DPIIT", regular: "Standard Government Fee", diff: "Official Ministry Subsidy" },
  { feature: "Time to File Form TM-A", startup: "24–48 Hours", regular: "24–48 Hours", diff: "Fast track filing by Koop India" },
  { feature: "Legal Right to use ™", startup: "Day 1 (from filing)", regular: "Day 1 (from filing)", diff: "Instant brand signaling" },
  { feature: "Free Pre-Filing TM Search", startup: "Included (Full Report)", regular: "Included (Full Report)", diff: "Prevents wasted govt fees" },
  { feature: "Examination Report Monitoring", startup: "Active tracking", regular: "Active tracking", diff: "Zero missed deadlines" },
  { feature: "Objection Reply Drafting", startup: "Attorney drafted", regular: "Attorney drafted", diff: "Section 9 & 11 legal replies" },
  { feature: "Opposition Defense Support", startup: "Available", regular: "Available", diff: "Hearing representation" },
  { feature: "Validity Period", startup: "10 Years (Renewable)", regular: "10 Years (Renewable)", diff: "Indefinite renewal rights" },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-orange-100 rounded-2xl mb-3 overflow-hidden shadow-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
        style={{ background: open ? "#fff7ed" : "white" }}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 font-semibold text-[#141D32] text-sm md:text-base">
          <span
            className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
            style={{ background: "#ffedd5", color: "#F97316" }}
          >
            {index + 1}
          </span>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: "#F97316" }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-orange-100 pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function TrademarkContent() {
  const [activeClass, setActiveClass] = useState(0);

  let onOpenModal = () => {};
  try {
    const { useModal } = require("@/context/ModalContext");
    ({ onOpenModal } = useModal());
  } catch (_) {}

  return (
    <div className="bg-white text-gray-700 font-sans">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 px-5"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1e293b 60%, #0F172A 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#F97316 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-xs font-semibold uppercase tracking-wider mb-5">
                <Shield className="w-3.5 h-3.5" />
                <span>The Trade Marks Act, 1999 • Online Filing Across India</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Protect Your Brand with{" "}
                <span className="text-[#F97316]">Trademark Registration</span> in India
              </h1>
              <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed">
                Secure exclusive legal rights over your company name, logo, and slogan. File Form TM-A online in 24 hours and start using the <strong className="text-white">™</strong> symbol from Day 1. End-to-end IP assistance from comprehensive search to final <strong className="text-white">®</strong> registration certificate.
              </p>

              {/* Key Trust Signals */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "™ Symbol on Day 1", sub: "Use instantly upon filing" },
                  { label: "10-Year Protection", sub: "Renewable indefinitely" },
                  { label: "50% Govt. Fee Rebate", sub: "For MSME & Startups" },
                  { label: "Free Trademark Search", sub: "Before submitting TM-A" },
                  { label: "All 45 Classes", sub: "Goods & Services covered" },
                  { label: "Objection Support", sub: "Section 9 & 11 legal reply" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                    <CheckCircle className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-xs font-bold">{item.label}</p>
                      <p className="text-gray-400 text-[10px]">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={onOpenModal}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#F97316] hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all duration-200 cursor-pointer text-sm"
                >
                  Start Trademark Registration <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenModal}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-gray-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 cursor-pointer text-sm"
                >
                  <Search className="w-4 h-4 text-[#F97316]" /> Free TM Availability Search
                </button>
              </div>
            </div>

            {/* Hero Quick Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                  <div>
                    <h3 className="font-extrabold text-[#141D32] text-lg">Check Brand Availability</h3>
                    <p className="text-gray-400 text-xs">Verify your mark against 15M+ registered trademarks</p>
                  </div>
                  <span className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-[#F97316]">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Brand / Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Koop India, FreshMart"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Nature / Category</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition text-gray-600">
                      <option>Select Industry / Class</option>
                      <option>E-commerce & Retail (Class 35)</option>
                      <option>Food & Beverages (Class 29, 30, 32)</option>
                      <option>Software, SaaS & Tech (Class 9, 42)</option>
                      <option>Clothing & Apparel (Class 25)</option>
                      <option>Pharma & Healthcare (Class 5, 44)</option>
                      <option>Education & Training (Class 41)</option>
                      <option>Other / Not Sure (Our team will classify)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#F97316] bg-gray-50 focus:bg-white transition"
                    />
                  </div>

                  <button
                    onClick={onOpenModal}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-[#F97316] hover:bg-orange-600 shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm mt-2"
                  >
                    Get Free TM Search Report <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-gray-400">
                      🔒 100% confidential. No spam. Instant consultation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trademark Types Section */}
      <section className="py-20 px-5 bg-gray-50/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Mark Categories</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
              Types of Trademarks You Can{" "}
              <span className="text-[#F97316]">Register in India</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">
              The Trade Marks Act, 1999 allows protection of various distinct brand identifiers under 45 classification systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trademarkTypes.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${item.color}10`,
                          color: item.color,
                          borderColor: `${item.color}30`,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#141D32] mb-1.5">{item.type}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.desc}</p>
                    <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 text-xs text-gray-600">
                      <strong className="text-gray-700">Example:</strong> {item.who}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{item.itcLabel}</span>
                    <button
                      onClick={onOpenModal}
                      className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Apply Now <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">End-to-End Workflow</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
              7-Step Trademark Registration{" "}
              <span className="text-[#F97316]">Process</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">
              From the initial availability search to the final registration certificate—our legal team manages every single stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 relative group hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200"
                >
                  <span className="text-4xl font-extrabold text-orange-200/80 absolute top-4 right-4">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-[#F97316] flex items-center justify-center mb-4">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full bg-white border border-gray-200 text-[10px] font-bold text-gray-600 mb-2">
                    {step.duration}
                  </div>
                  <h3 className="font-bold text-[#141D32] text-base mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trademark Classes Explorer */}
      <section className="py-20 px-5 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">NICE Classification</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              Explore Popular <span className="text-[#F97316]">Trademark Classes</span>
            </h2>
            <p className="text-slate-400 mt-3 text-sm">
              Trademarks are categorized into 45 classes (1–34 for Goods, 35–45 for Services). Here are the most frequently filed classes in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classesData.map((cls, idx) => (
              <div
                key={idx}
                className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#F97316] uppercase tracking-wider">{cls.classNum}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {cls.type}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1.5">{cls.name}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{cls.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-xs mb-4">
              Need assistance determining your exact class and avoiding duplicate government fees?
            </p>
            <button
              onClick={onOpenModal}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition shadow-lg shadow-orange-500/20"
            >
              Get Expert Class Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Document Checklist</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
              Documents Required for{" "}
              <span className="text-[#F97316]">Trademark Registration</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Keep these ready for same-day Form TM-A submission. We guide you through digital signing and affidavit drafting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {docsReq.map((d, i) => (
              <div key={i} className="bg-orange-50/40 border border-orange-100 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-orange-100 text-[#F97316] text-[10px] font-bold uppercase tracking-wider mb-3">
                    {d.tag}
                  </span>
                  <h3 className="font-bold text-[#141D32] text-base mb-4">{d.entity}</h3>
                  <ul className="space-y-2.5">
                    {d.docs.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={onOpenModal}
                  className="mt-6 w-full py-2.5 bg-white border border-orange-200 text-[#F97316] hover:bg-orange-50 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Verify Documents
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Trademark Search CTA Banner */}
      <section
        className="py-14 px-5 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #ea580c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
            Don't Let Someone Else Own Your Brand Name
          </h2>
          <p className="text-orange-100 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Search before you invest. Check whether your brand name or logo is legally available for trademark registration across all 45 classes in India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onOpenModal}
              className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition cursor-pointer shadow-lg"
            >
              Request Free Search Report
            </button>
            <button
              onClick={onOpenModal}
              className="px-8 py-3.5 bg-white text-[#F97316] rounded-xl font-bold text-sm hover:bg-orange-50 transition cursor-pointer shadow-md"
            >
              Talk to Trademark Attorney
            </button>
          </div>
        </div>
      </section>

      {/* Govt Fee & Savings Comparison Table */}
      <section className="py-20 px-5 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
              Fee Structure & Legal Rights
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-3">
              Government Fees & <span className="text-[#F97316]">50% MSME Rebate</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Under Trade Marks Rules, startups and MSMEs enjoy a 50% government fee reduction on Form TM-A filings.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Feature / Legal Scope</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs text-orange-400 bg-slate-800/80">
                    Individual / MSME / Startup
                  </th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs text-gray-300">
                    Other Companies / Entities
                  </th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs text-gray-300">
                    Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{row.feature}</td>
                    <td className="py-3.5 px-6 font-extrabold text-emerald-700 bg-orange-50/20">{row.startup}</td>
                    <td className="py-3.5 px-6 text-slate-600">{row.regular}</td>
                    <td className="py-3.5 px-6 text-slate-500 font-medium">{row.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regional IP Jurisdiction & Interlinking Strip */}
      <section className="py-14 px-5 bg-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 mb-2">
                <MapPin size={15} />
                <span>Delhi NCR Jurisdiction Authority</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Trade Marks Registry, Dwarka, New Delhi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Applications filed through Koop India for Delhi NCR fall under the jurisdiction of the <strong>Trade Marks Registry, Plot No. 32, Sector 14, Dwarka, New Delhi - 110078</strong> covering Delhi, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Chandigarh, Uttar Pradesh & Uttarakhand.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Explore Related Legal & Tech Services</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <Link
                  href="/gst-registration"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>GST Registration</span>
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/website-development"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>Website Development</span>
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/documentation-compliance/company-registration-services"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>Company Incorporation</span>
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/documentation-compliance/fssai-license"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>FSSAI Food License</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section
        className="py-20 px-5"
        style={{ background: "linear-gradient(160deg, #f8fafc 0%, #fff7ed 50%, #f8fafc 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
              Frequently Asked <span className="text-[#F97316]">Questions</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Everything you need to know about Trademark Registration in India
            </p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

