"use client";
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
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
} from "lucide-react";

/* ─── FAQ DATA ─── */
const faqs = [
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
    type: "Logo / Device Mark",
    desc: "Protects stylized logos, symbols, artistic designs used as brand identifiers.",
    who: "Logos, icons, and unique graphic symbols",
    icon: Image,
    color: "#8b5cf6",
    itcLabel: "Visual Identity",
    itcOk: true,
    tag: null,
  },
  {
    type: "Composite Mark",
    desc: "Protects a combination of words and logos together as a single mark.",
    who: "Word + Logo combined branding",
    icon: Palette,
    color: "#0ea5e9",
    itcLabel: "Combined Rights",
    itcOk: true,
    tag: "Popular",
  },
  {
    type: "Tagline / Slogan",
    desc: "Protects distinctive slogans and advertising phrases tied to your brand.",
    who: "'Just Do It', 'Connecting India' style phrases",
    icon: Megaphone,
    color: "#10b981",
    itcLabel: "Phrase Protection",
    itcOk: true,
    tag: null,
  },
  {
    type: "Series Mark",
    desc: "Multiple related marks filed together. Cost-effective for brand families.",
    who: "Product lines with similar naming patterns",
    icon: Tag,
    color: "#ec4899",
    itcLabel: "Multiple Marks",
    itcOk: true,
    tag: null,
  },
  {
    type: "Collective Mark",
    desc: "Used by members of an association to indicate membership or origin.",
    who: "Trade associations, cooperatives, guilds",
    icon: Users,
    color: "#f59e0b",
    itcLabel: "Group Identity",
    itcOk: false,
    tag: null,
  },
];

const whyRegisterData = [
  {
    icon: Shield,
    title: "Exclusive Legal Rights",
    desc: "Gain exclusive nationwide rights to use your mark. Stop copycats legally under Trade Marks Act, 1999.",
    color: "from-orange-500 to-amber-400",
    lightBg: "#fff7ed",
    tag: "Core Benefit",
    tagStyle: { background: "#dcfce7", color: "#16a34a" },
  },
  {
    icon: TrendingUp,
    title: "Brand Asset Creation",
    desc: "A registered trademark is a valuable IP asset that can be sold, licensed, or franchised to generate revenue.",
    color: "from-violet-500 to-purple-400",
    lightBg: "#f5f3ff",
    tag: "Business Value",
    tagStyle: { background: "#dbeafe", color: "#2563eb" },
  },
  {
    icon: Globe,
    title: "E-Commerce Ready",
    desc: "Mandatory for Amazon Brand Registry, Flipkart Brand Store, and other platform brand protections.",
    color: "from-emerald-500 to-teal-400",
    lightBg: "#f0fdf4",
    tag: "Mandatory",
    tagStyle: { background: "#fee2e2", color: "#dc2626" },
  },
  {
    icon: Building,
    title: "Franchise & Expansion",
    desc: "Essential for franchise agreements and expanding into new states or markets legally.",
    color: "from-blue-500 to-cyan-400",
    lightBg: "#eff6ff",
    tag: "Growth",
    tagStyle: { background: "#fff7ed", color: "#F97316" },
  },
  {
    icon: BadgeCheck,
    title: "Consumer Trust",
    desc: "The ® symbol builds credibility, signals authenticity, and differentiates from unregistered competitors.",
    color: "from-pink-500 to-rose-400",
    lightBg: "#fff1f2",
    tag: "Credibility",
    tagStyle: { background: "#dbeafe", color: "#2563eb" },
  },
  {
    icon: Lock,
    title: "Legal Infringement Action",
    desc: "Sue infringers for damages, seek injunctions, and take customs action against counterfeit goods.",
    color: "from-slate-600 to-slate-500",
    lightBg: "#f8fafc",
    tag: "Legal Power",
    tagStyle: { background: "#dcfce7", color: "#16a34a" },
  },
];

const whyCantBeTrademarks = [
  "Generic or common names (e.g., 'Bread Bakery')",
  "Descriptive terms without secondary meaning",
  "Geographical names used descriptively",
  "Deceptive marks that mislead consumers",
  "Marks that are identical to registered marks in same class",
  "Names of living persons without their consent",
  "National emblems, flags, government symbols",
  "Obscene or offensive marks",
];

const whoCanApply = [
  { icon: User, label: "Individual / Sole Proprietor", color: "from-orange-500 to-amber-400" },
  { icon: Users, label: "Partnership Firm", color: "from-violet-500 to-purple-400" },
  { icon: Building2, label: "Private / Public Limited Company", color: "from-emerald-500 to-teal-400" },
  { icon: Building, label: "LLP", color: "from-blue-500 to-cyan-400" },
  { icon: Globe, label: "Trust / Society / NGO", color: "from-pink-500 to-rose-400" },
  { icon: Rocket, label: "Startup / DPIIT Recognized Entity", color: "from-amber-500 to-yellow-400" },
];

const processSteps = [
  {
    step: "01",
    title: "Trademark Search",
    desc: "Comprehensive search on the IP India database to check for conflicting marks in your chosen class.",
    icon: Search,
    time: "Same Day",
  },
  {
    step: "02",
    title: "Feasibility Analysis",
    desc: "Our experts assess distinctiveness, registrability, and risk level of your mark before filing.",
    icon: Eye,
    time: "1 Day",
  },
  {
    step: "03",
    title: "Class Selection",
    desc: "We recommend the right trademark classes based on your goods/services to ensure maximum protection.",
    icon: Tag,
    time: "1 Day",
  },
  {
    step: "04",
    title: "Document Collection",
    desc: "You share the required documents. We verify everything for accuracy before filing.",
    icon: FileText,
    time: "1-2 Days",
  },
  {
    step: "05",
    title: "Application Filing (TM-A)",
    desc: "We file Form TM-A on the IP India portal. You receive an acknowledgement and can use ™ immediately.",
    icon: Send,
    time: "1-2 Days",
  },
  {
    step: "06",
    title: "Examination Response",
    desc: "If an examination report is raised, our team drafts and files a comprehensive reply within deadlines.",
    icon: PenTool,
    time: "Within 30 Days",
  },
  {
    step: "07",
    title: "Journal Publication",
    desc: "Your mark is advertised in the Trademark Journal for 4 months. Third parties may oppose during this period.",
    icon: Megaphone,
    time: "4 Month Window",
  },
  {
    step: "08",
    title: "Registration Certificate",
    desc: "Once all stages clear, the Trademark Registration Certificate is issued and you can use ® officially.",
    icon: Award,
    time: "12–24 Months (Depending on Examination & Opposition)",
  },
];

const features = [
  {
    icon: Users,
    title: "Expert Trademark Attorneys",
    desc: "IP professionals with deep expertise in TM Act 1999, examination reports, and opposition proceedings.",
    color: "from-orange-500 to-amber-400",
    bg: "from-orange-50 to-amber-50",
  },
  {
    icon: Search,
    title: "Comprehensive TM Search",
    desc: "Thorough search across IP India database, common law marks, and similar phonetic/visual marks.",
    color: "from-emerald-500 to-teal-400",
    bg: "from-emerald-50 to-teal-50",
  },
  {
    icon: ShieldCheck,
    title: "Objection & Opposition Handling",
    desc: "Expert drafting of TM-O replies and hearing representation. Strong legal arguments to protect your mark.",
    color: "from-blue-500 to-cyan-400",
    bg: "from-blue-50 to-cyan-50",
  },
  {
    icon: RefreshCw,
    title: "Renewal & Portfolio Management",
    desc: "Timely renewal reminders, TM-R filing, and management of your complete trademark portfolio.",
    color: "from-violet-500 to-purple-400",
    bg: "from-violet-50 to-purple-50",
  },
  {
    icon: Zap,
    title: "Fast Application Filing",
    desc: "Application filed in 1–2 working days. Immediate ™ usage rights from the filing date.",
    color: "from-yellow-500 to-orange-400",
    bg: "from-yellow-50 to-orange-50",
  },
  {
    icon: Globe,
    title: "International TM Filing",
    desc: "Madrid Protocol filings for protection in 130+ countries. Expand your brand globally.",
    color: "from-pink-500 to-rose-400",
    bg: "from-pink-50 to-rose-50",
  },
];

const trademarkClasses = [
  { range: "Class 1–5", category: "Chemicals, Pharma, Cosmetics", color: "#F97316" },
  { range: "Class 6–11", category: "Metals, Machinery, Hardware", color: "#8b5cf6" },
  { range: "Class 12–22", category: "Vehicles, Textiles, Ropes", color: "#0ea5e9" },
  { range: "Class 23–34", category: "Yarn, Rubber, Tobacco", color: "#10b981" },
  { range: "Class 35–42", category: "Business, IT, Science Services", color: "#ec4899" },
  { range: "Class 43–45", category: "Hotels, Legal, Security Services", color: "#f59e0b" },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden mb-3 transition-all duration-300"
      style={{ borderColor: open ? "#F97316" : "#e5e7eb" }}
    >
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

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Trademark Registration Service India",
  provider: {
    "@type": "Organization",
    name: "Koop India",
    url: "https://www.koopindia.com",
  },
  serviceType: "Trademark Registration",
  areaServed: "IN",
  description:
    "Professional Trademark Registration in India. Expert help with search, filing TM-A, objection handling, opposition, and registration certificate. End-to-end brand protection.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const TrademarkRegistrationPage = () => {
  const [activeClass, setActiveClass] = useState(0);

  // Dynamically import useModal if available; otherwise mock
  let onOpenModal = () => {};
  try {
    // eslint-disable-next-line
    const { useModal } = require("@/context/ModalContext");
    // eslint-disable-next-line
    ({ onOpenModal } = useModal());
  } catch (_) {}

  return (
    <>
      <Head>
        <title>
          Trademark Registration in India 2025 | Online TM Filing, Objection
          Handling &amp; Certificate | Koop India
        </title>
        <meta
          name="description"
          content="Register your Trademark in India with Koop India. ✓ Trademark Search ✓ TM-A Filing ✓ Objection Handling ✓ Registration Certificate. Protect your brand name, logo & tagline. Expert IP attorneys."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="trademark registration India, trademark registration online, trademark filing, TM registration, brand registration India, trademark search India, trademark objection, trademark certificate, IP registration India 2025"
        />
        <link
          rel="canonical"
          href="https://www.koopindia.com/trademark-registration"
        />
        <meta
          property="og:title"
          content="Trademark Registration in India | Koop India"
        />
        <meta
          property="og:description"
          content="End-to-end Trademark Registration in India. Expert search, filing, objection handling & certification. Protect your brand legally."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="bg-white text-gray-700 font-sans">

        {/* ══════════════ HERO ══════════════ */}
        <section
          className="relative py-20 px-5 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #141D32 60%, #1a1f3a 100%)" }}
        >
          {/* Decorative shield shape */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-5"
            style={{
              background: "radial-gradient(ellipse at 80% 50%, #F97316 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute left-10 top-10 w-32 h-32 rounded-full pointer-events-none opacity-10"
            style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }}
          />

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ background: "rgba(249,115,22,0.15)", color: "#F97316", border: "1px solid rgba(249,115,22,0.3)" }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Intellectual Property Protection
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                  Trademark{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #F97316, #f59e0b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Registration
                  </span>
                  <br /> in India
                </h1>

                <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">
                  Protect your brand name, logo, tagline & packaging with a legally registered trademark. 
                  End-to-end filing, objection handling & certification by Koop India's IP experts.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {["™ Symbol from Day 1", "18–24 Month Full Registration", "45 Trademark Classes", "10 Year Validity + Renewable"].map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)", color: "#d1d5db", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-2 px-8 py-4 cursor-pointer rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}
                >
                  Apply for Trademark Registration <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-gray-500 text-xs mt-3">
                  ✔ Free Trademark Search Included • ✔ Expert-Guided Process
                </p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Trademark Classes", value: "45", sub: "Goods & Services", color: "#F97316" },
                  { label: "Validity Period", value: "10 Yrs", sub: "Renewable Forever", color: "#8b5cf6" },
                  { label: "Filing Timeline", value: "1–2", sub: "Working Days", color: "#10b981" },
                  { label: "Protection Scope", value: "Pan-India", sub: "+ International", color: "#0ea5e9" },
                ].map(({ label, value, sub, color }, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-2xl font-extrabold mb-1" style={{ color }}>{value}</div>
                    <div className="text-white font-semibold text-sm">{label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
                  </div>
                ))}

                {/* Quick facts */}
                <div
                  className="col-span-2 rounded-2xl p-5"
                  style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-[#F97316]" />
                    <span className="text-[#F97316] font-bold text-sm">Did You Know?</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    An unregistered brand can be legally copied by competitors. Trademark registration gives you 
                    the exclusive right to use your mark and take legal action against infringers anywhere in India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ WHAT IS TRADEMARK ══════════════ */}
        <section className="py-20 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                  Understanding Trademarks
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2 mb-5">
                  What is a{" "}
                  <span className="text-[#F97316]">Trademark?</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  A <strong>Trademark</strong> is any unique sign, symbol, word, phrase, logo, design, 
                  packaging shape, or combination thereof that distinguishes your goods or services from 
                  those of competitors. It is the cornerstone of your brand identity.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Under the <strong>Trade Marks Act, 1999</strong>, once registered with the Trade Marks 
                  Registry (under the Controller General of Patents, Designs & Trade Marks), your mark 
                  enjoys nationwide legal protection. You can use the <strong>® symbol</strong>, sue 
                  infringers, and prevent others from using deceptively similar marks in the same class.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-[#141D32] mb-4 text-sm">Trademark Quick Facts</h3>
                  {[
                    ["Governing Law", "Trade Marks Act, 1999"],
                    ["Governing Authority", "Office of the Controller General of Patents, Designs & Trade Marks"],
                    ["Application Form", "Form TM-A"],
                    ["Validity", "10 Years (Renewable)"],
                    ["Classes", "45 (1–34 Goods, 35–45 Services)"],
                    ["Penalty for Infringement", "6 Months – 3 Years Imprisonment + ₹50,000 – ₹2,00,000 Fine"],
                    ["International Filing", "Madrid Protocol (130+ countries)"],
                  ].map(([label, value], i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start border-b border-slate-200 pb-2 mb-2 last:border-0 last:mb-0 last:pb-0 text-xs"
                    >
                      <span className="text-gray-500">{label}</span>
                      <span className="text-[#141D32] font-semibold text-right max-w-[55%]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What can be trademarked */}
              <div>
                <h3 className="text-xl font-bold text-[#141D32] mb-6">
                  What Can Be <span className="text-[#F97316]">Trademarked?</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Type, label: "Brand Name", desc: "Your company or product name" },
                    { icon: Image, label: "Logo / Device", desc: "Artistic symbols and icons" },
                    { icon: Megaphone, label: "Tagline / Slogan", desc: "Distinctive phrases" },
                    { icon: Package, label: "Product Packaging", desc: "Unique shape/trade dress" },
                    { icon: Palette, label: "Brand Label", desc: "Labels with artistic work" },
                    { icon: Fingerprint, label: "Sound Mark", desc: "Distinctive audio jingles" },
                  ].map(({ icon: Icon, label, desc }, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default"
                      style={{ background: "white", border: "1px solid #f3f4f6" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fed7aa"; e.currentTarget.style.background = "#fff7ed"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f3f4f6"; e.currentTarget.style.background = "white"; }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                        style={{ background: "#fff7ed" }}
                      >
                        <Icon className="w-5 h-5 text-[#F97316]" />
                      </div>
                      <div className="font-bold text-[#141D32] text-sm">{label}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                    </div>
                  ))}
                </div>

                {/* Cannot be trademarked */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-red-700 text-sm">What CANNOT Be Trademarked</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {whyCantBeTrademarks.slice(0, 5).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-red-700">
                        <span className="mt-0.5">✗</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ WHY REGISTER ══════════════ */}
        <section
          className="py-20 px-5 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #fafafa 0%, #fff7ed 55%, #fafafa 100%)" }}
        >
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
            style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", color: "#F97316", border: "1px solid #fed7aa" }}
              >
                Importance
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] leading-tight">
                Why Trademark Registration{" "}
                <span
                  style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  Matters
                </span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
                Your brand is your most valuable business asset. Protect it before someone else does.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyRegisterData.map(({ icon: Icon, title, desc, color, lightBg, tag, tagStyle }, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                  style={{ border: "1px solid #f3f4f6", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fed7aa"; e.currentTarget.style.background = lightBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f3f4f6"; e.currentTarget.style.background = "white"; }}
                >
                  <span
                    className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={tagStyle}
                  >
                    {tag}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-[#141D32] mb-2 text-sm">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ WHO CAN APPLY ══════════════ */}
        <section className="py-10 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Eligibility</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Who Can <span className="text-[#F97316]">Apply?</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {whoCanApply.map(({ icon: Icon, label, color }, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{ background: "white", border: "1px solid #f3f4f6" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fed7aa"; e.currentTarget.style.background = "#fff7ed"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f3f4f6"; e.currentTarget.style.background = "white"; }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-[#141D32] leading-snug">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              💡 Foreign nationals and companies can also apply for trademark registration in India.
            </p>
          </div>
        </section>

        {/* ══════════════ TYPES OF TRADEMARK ══════════════ */}
        <section
          className="py-20 px-5 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{ backgroundImage: "radial-gradient(circle at 85% 15%, #fed7aa 0%, transparent 35%), radial-gradient(circle at 5% 85%, #dbeafe 0%, transparent 35%)" }}
          />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", color: "#F97316", border: "1px solid #fed7aa" }}
              >
                TM Types
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32]">
                Types of{" "}
                <span style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Trademark Registration
                </span>{" "}
                We Handle
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {trademarkTypes.map(({ type, desc, who, icon: Icon, color, itcLabel, itcOk, tag }, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: "1px solid #f3f4f6", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                >
                  {tag && (
                    <span
                      className="absolute -top-3 right-5 text-xs font-bold px-3 py-1 rounded-full shadow-md text-white"
                      style={{ background: `linear-gradient(135deg, ${color}, #f59e0b)` }}
                    >
                      {tag}
                    </span>
                  )}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}18` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#141D32] text-sm">{type}</h3>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ background: `${color}18`, color }}
                      >
                        {itcLabel}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed">{desc}</p>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Examples</p>
                    <p className="text-xs text-gray-500">{who}</p>
                  </div>
                  <div
                    className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ DOCUMENTS ══════════════ */}
        <section id="documents" className="py-16 px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Documentation</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Documents Required for{" "}
                <span className="text-[#F97316]">Trademark Registration</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Keep these documents ready to ensure a smooth and error-free trademark filing process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Individual */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition hover:border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-[#F97316]" />
                </div>
                <h3 className="font-bold text-[#141D32] mb-4">Individual / Proprietor</h3>
                {["PAN Card of Applicant", "Aadhaar Card", "Passport-size Photograph", "Brand Name / Logo File (JPEG)", "Signed TM-48 Authorization"].map((doc, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" /> {doc}
                  </p>
                ))}
                <div className="mt-4 rounded-xl p-3 bg-orange-50 text-xs text-orange-700">
                  <strong>MSME/Startup:</strong> Certificate for reduced government fees (50% discount).
                </div>
              </div>

              {/* Partnership / LLP */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition hover:border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#F97316]" />
                </div>
                <h3 className="font-bold text-[#141D32] mb-4">Partnership / LLP</h3>
                {["Firm / LLP PAN Card", "Partnership Deed / LLP Agreement", "PAN & Aadhaar of Partners", "Brand Logo (High-res JPEG)", "Authorization Letter / TM-48", "MSME Certificate (if applicable)"].map((doc, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" /> {doc}
                  </p>
                ))}
              </div>

              {/* Company */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition hover:border-orange-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-[#F97316]" />
                </div>
                <h3 className="font-bold text-[#141D32] mb-4">Private / Public Company</h3>
                {["Company PAN Card", "Certificate of Incorporation", "MOA & AOA", "PAN & Aadhaar of Directors", "Board Resolution / PoA", "Brand Logo (JPEG format)", "Signed TM-48 by Authorized Signatory"].map((doc, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" /> {doc}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#141D32]"
                style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
              >
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                All documents are reviewed by our IP experts before submission to avoid objections.
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ PROCESS ══════════════ */}
        <section id="process" className="pb-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Step-by-Step</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Trademark Registration{" "}
                <span className="text-[#F97316]">Procedure</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Our proven 8-step process ensures your trademark is filed correctly, monitored actively, 
                and registered without unnecessary delays.
              </p>
            </div>

            <div className="relative">
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {processSteps.map(({ step, title, desc, icon: Icon, time }, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ background: i % 2 === 0 ? "white" : "#fafafa", border: "1px solid #f3f4f6" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fed7aa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f3f4f6"; }}
                  >
                    {/* Step badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-sm mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}
                    >
                      {step}
                    </div>
                    <Icon className="w-5 h-5 text-[#F97316] mb-2" />
                    <h3 className="font-bold text-[#141D32] text-sm mb-1">{title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{desc}</p>
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{ background: "#fff7ed", color: "#F97316" }}
                    >
                      ⏱ {time}
                    </span>
                    <div
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, transparent, #F97316, transparent)" }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#141D32]"
                  style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
                >
                  <Clock className="w-4 h-4 text-[#F97316]" />
                  Application Filing: <span className="text-[#F97316] ml-1">1–2 Working Days</span>
                  &nbsp;|&nbsp; Full Registration:{" "}
                  <span className="text-[#F97316] ml-1">18–24 Months</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ CTA ══════════════ */}
        <section
          className="py-16 px-5 text-white text-center"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #141D32 60%, #1a1f3a 100%)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Secure Your Brand with{" "}
            <span className="text-[#F97316]">Trademark Registration</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't let a competitor claim your brand name. Get expert trademark filing done in 1–2 days. 
            Use ™ immediately and get full ® protection after registration.
          </p>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 cursor-pointer px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}
          >
            Apply for Trademark Registration <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-gray-400 mt-4">
            ✔ Free TM Search • ✔ Expert-Assisted Filing • ✔ Objection Handling Included
          </p>
        </section>

        {/* ══════════════ WHY KOOP ══════════════ */}
        <section
          className="relative py-20 px-5 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fafafa 0%, #fff7ed 50%, #fafafa 100%)" }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
          />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", color: "#F97316", border: "1px solid #fed7aa" }}
              >
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32]">
                Why{" "}
                <span style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Koop India
                </span>{" "}
                for Trademark Registration?
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
                Trusted by 10,000+ businesses across India for brand protection.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "white", border: "1px solid #f3f4f6", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fed7aa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f3f4f6"; }}
                >
                  <span className="absolute top-4 right-4 text-xs font-bold tabular-nums" style={{ color: "#e5e7eb" }}>0{i + 1}</span>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${bg} transition-all duration-300 group-hover:scale-110`}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-[#141D32] mb-2 leading-snug">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ COMPLIANCE ══════════════ */}
        <section className="py-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Validity & Compliance</span>
                <h2 className="text-3xl font-extrabold text-[#141D32] mt-2 mb-5">
                  Trademark <span className="text-[#F97316]">Compliance</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  A registered trademark requires proper use and maintenance to stay valid. 
                  Non-use for 5 consecutive years can lead to cancellation through rectification proceedings.
                </p>
                {[
                  "Use ® only after registration certificate is issued",
                  "™ can be used from application date",
                  "Proper use in commerce required to maintain registration",
                  "Non-use for 5+ years = vulnerable to cancellation",
                  "Renewal mandatory every 10 years",
                  "File TM-R at least 6 months before expiry",
                  "Inform Koop India of any changes in ownership or address",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div>
                <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Government Fees</span>
                <h2 className="text-3xl font-extrabold text-[#141D32] mt-2 mb-5">
                  Trademark <span className="text-[#F97316]">Fee Structure</span>
                </h2>
                <div className="space-y-3">
                  {[
                    { type: "Individual / Startup / MSME", per: "₹4,500 per class (online)", note: "50% discount vs regular" },
                    { type: "Company / LLP / Partnership", per: "₹9,000 per class (online)", note: "Standard government fee" },
                    { type: "Renewal (All Entities)", per: "₹9,000–₹10,000 per class", note: "Within validity period" },
                    { type: "Late Renewal (with surcharge)", per: "Additional 25% surcharge", note: "Within 6-month grace period" },
                  ].map(({ type, per, note }, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 border"
                      style={{ background: "#fff7ed", borderColor: "#fed7aa" }}
                    >
                      <div className="font-bold text-[#141D32] text-sm mb-1">{type}</div>
                      <div className="text-[#F97316] font-semibold text-sm">{per}</div>
                      <div className="text-gray-500 text-xs mt-1">{note}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  📌 Above are government fees only. Koop India's professional fees are separate. 
                  Contact us for a complete transparent quote.
                </p>
              
              </div>
            </div>
          </div>
        </section>

         {/* ══════════════ FINAL CTA ══════════════ */}
        <section
          className="py-16 px-5 text-white text-center"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #141D32 100%)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Register Your Trademark Today
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-sm">
            Your brand is your identity. Protect it legally before a competitor does. 
            Get expert trademark registration done with Koop India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-8 py-4 cursor-pointer rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #F97316, #f59e0b)", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}
            >
              Apply for Trademark Registration <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-8 py-4 cursor-pointer rounded-2xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Free Trademark Search <Search className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section
          className="py-20 px-5"
          style={{ background: "linear-gradient(160deg, #f8fafc 0%, #fff7ed 50%, #f8fafc 100%)" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Frequently Asked{" "}
                <span className="text-[#F97316]">Questions</span>
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
    </>
  );
};

export default TrademarkRegistrationPage;