"use client";
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "@/context/ModalContext";
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
  Phone,
  Mail,
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
  UtensilsCrossed,
  Rocket,
  BookOpen,
  CheckCircle2,
  XCircle,

} from "lucide-react";

/* ─── FAQ DATA ─── */
const faqs = [
  {
    q: "What is GST Registration and who needs it?",
    a: "GST Registration is a mandatory process for businesses dealing in goods or services in India once their aggregate turnover crosses ₹40 lakhs (goods) or ₹20 lakhs (services). It's also mandatory for e-commerce operators, inter-state sellers, casual taxable persons, and those liable under RCM regardless of turnover.",
  },
  {
    q: "What is the GST registration threshold limit in India?",
    a: "The threshold limit is ₹40 lakhs for businesses dealing in goods and ₹20 lakhs for service providers. For special category states (North-Eastern states, Himachal Pradesh, Uttarakhand), the limits are ₹20 lakhs (goods) and ₹10 lakhs (services).",
  },
  {
    q: "How long does GST registration take?",
    a: "With complete and correct documents, GST registration typically takes 7–10 working days. Koop India's expert team ensures error-free submission, which significantly reduces the chances of delays or queries from the department.",
  },
  {
    q: "What is a GSTIN and what does it look like?",
    a: "GSTIN (Goods and Services Tax Identification Number) is a unique 15-digit alphanumeric identifier assigned to every registered taxpayer. The first 2 digits represent the state code, the next 10 are your PAN, followed by an entity number, a default 'Z', and a check digit.",
  },
  {
    q: "Is GST registration free of cost from the government?",
    a: "Yes, applying for GST registration on the government portal (www.gst.gov.in) is free. However, professional service fees like those charged by Koop India cover expert consultation, documentation, error-free filing, query handling, and follow-ups—saving you time, errors, and potential penalties.",
  },
  {
    q: "Can I cancel my GST registration if my business closes?",
    a: "Yes. GST registration can be surrendered or cancelled. If a business's turnover drops below the threshold or if operations cease, you can apply for cancellation. Koop India assists with GST cancellation and ensures all pending returns are filed before closure.",
  },
  {
    q: "What happens if I don't register for GST?",
    a: "Operating without mandatory GST registration is a criminal offence under GST law. Penalties include 100% of tax evaded or ₹10,000 (whichever is higher), and the business may face prosecution. It also disqualifies you from collecting GST or claiming Input Tax Credit (ITC).",
  },
  {
    q: "What is the Composition Scheme under GST?",
    a: "The Composition Scheme is a simplified tax scheme for small businesses with annual turnover below ₹1.5 crore (₹75 lakhs for some states). Taxpayers pay a fixed percentage of turnover (1–5% depending on business type), file returns quarterly, and cannot collect GST from customers or claim ITC.",
  },
  {
    q: "Do e-commerce sellers need GST registration?",
    a: "Yes. All sellers on e-commerce platforms like Amazon, Flipkart, Meesho, Myntra, etc., are mandatorily required to register for GST regardless of turnover. The e-commerce operator may also withhold TCS (Tax Collected at Source) from payments made to sellers.",
  },
  {
    q: "What is Input Tax Credit (ITC) and how does GST registration help?",
    a: "ITC allows businesses to deduct the tax already paid on purchases (inputs) from their GST liability on sales (outputs). Only GST-registered businesses can claim ITC, which significantly reduces overall tax burden and improves cash flow.",
  },
];

const features = [
  {
    icon: Users,
    title: "Dedicated GST Experts",
    desc: "CA-supervised professionals with deep knowledge of CGST, SGST, and IGST regulations.",
    color: "from-orange-500 to-amber-400",
    bg: "from-orange-50 to-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "Error-Free Documentation",
    desc: "Every document verified before submission — 98%+ first-time approval rate.",
    color: "from-emerald-500 to-teal-400",
    bg: "from-emerald-50 to-teal-50",
  },
  {
    icon: Clock,
    title: "End-to-End Support",
    desc: "From consultation to GSTIN delivery — we handle everything including queries.",
    color: "from-blue-500 to-cyan-400",
    bg: "from-blue-50 to-cyan-50",
  },
  {
    icon: TrendingUp,
    title: "Post-Registration Compliance",
    desc: "Monthly/quarterly return filing, notice handling, and ongoing compliance support.",
    color: "from-violet-500 to-purple-400",
    bg: "from-violet-50 to-purple-50",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "Most registrations completed in 7–10 working days. Expedited processing available.",
    color: "from-yellow-500 to-orange-400",
    bg: "from-yellow-50 to-orange-50",
  },
  {
    icon: Award,
    title: "MSME & Startup Focused",
    desc: "Affordable, startup-friendly pricing tailored for small business needs.",
    color: "from-pink-500 to-rose-400",
    bg: "from-pink-50 to-rose-50",
  },
  {
    icon: Globe,
    title: "Pan-India Service",
    desc: "GST registrations across all Indian states including special category states.",
    color: "from-sky-500 to-blue-400",
    bg: "from-sky-50 to-blue-50",
  },
  {
    icon: Lock,
    title: "100% Secure & Confidential",
    desc: "Your data is handled with complete privacy and strict security protocols.",
    color: "from-slate-600 to-slate-500",
    bg: "from-slate-50 to-gray-100",
  },
];

const services = [
  {
    name: "Company Registration",
    href: "/documentation-compliance/company-registration",
    icon: Building2,
    color: "from-blue-500 to-cyan-400",
    lightBg: "#eff6ff",
    tag: "Popular",
  },
  {
    name: "Trademark Registration",
    href: "/documentation-compliance/trademark-registration",
    icon: BadgeCheck,
    color: "from-violet-500 to-purple-400",
    lightBg: "#f5f3ff",
    tag: null,
  },
  {
    name: "FSSAI License",
    href: "/documentation-compliance/fssai-license",
    icon: UtensilsCrossed,
    color: "from-emerald-500 to-teal-400",
    lightBg: "#f0fdf4",
    tag: null,
  },
  {
    name: "ISO Certification",
    href: "/documentation-compliance/iso-certification",
    icon: Award,
    color: "from-amber-500 to-yellow-400",
    lightBg: "#fffbeb",
    tag: null,
  },
  {
    name: "Startup India Registration",
    href: "/documentation-compliance/startup-india-registration",
    icon: Rocket,
    color: "from-pink-500 to-rose-400",
    lightBg: "#fff1f2",
    tag: "New",
  },
  {
    name: "Company Accounting",
    href: "/documentation-compliance/company-accounting",
    icon: BookOpen,
    color: "from-sky-500 to-blue-400",
    lightBg: "#f0f9ff",
    tag: null,
  },
  {
    name: "Tax & Compliance Services",
    href: "/documentation-compliance/tax-compliance",
    icon: FileText,
    color: "from-orange-500 to-amber-400",
    lightBg: "#fff7ed",
    tag: null,
  },
];


const whoNeedsData = [
  {
    icon: BarChart3,
    title: "Turnover-Based Registration",
    desc: "Businesses with aggregate turnover above ₹40L (goods) or ₹20L (services) must register. Special category states have lower thresholds.",
    tag: "Most Common",
    tagStyle: { background: "#dcfce7", color: "#16a34a" },
    color: "from-emerald-500 to-teal-400",
    lightBg: "#f0fdf4",
  },
  {
    icon: Globe,
    title: "Inter-State Suppliers",
    desc: "Any business supplying goods or services outside their home state must register regardless of turnover amount.",
    tag: "Mandatory",
    tagStyle: { background: "#fee2e2", color: "#dc2626" },
    color: "from-rose-500 to-pink-400",
    lightBg: "#fff1f2",
  },
  {
    icon: Building,
    title: "E-Commerce Sellers",
    desc: "All sellers on Amazon, Flipkart, Meesho, Myntra, Swiggy, Zomato etc. must be GST registered before listing products.",
    tag: "Mandatory",
    tagStyle: { background: "#fee2e2", color: "#dc2626" },
    color: "from-orange-500 to-amber-400",
    lightBg: "#fff7ed",
  },
  {
    icon: Users,
    title: "Casual Taxable Persons",
    desc: "Individuals who occasionally supply goods/services in a taxable territory where they have no fixed place of business.",
    tag: "Mandatory",
    tagStyle: { background: "#fee2e2", color: "#dc2626" },
    color: "from-violet-500 to-purple-400",
    lightBg: "#f5f3ff",
  },
  {
    icon: TrendingUp,
    title: "RCM Liable Businesses",
    desc: "Businesses receiving supplies on which Reverse Charge Mechanism (RCM) applies must register, regardless of turnover.",
    tag: "Mandatory",
    tagStyle: { background: "#fee2e2", color: "#dc2626" },
    color: "from-blue-500 to-cyan-400",
    lightBg: "#eff6ff",
  },
  {
    icon: FileText,
    title: "Voluntary Registration",
    desc: "Businesses below the threshold can voluntarily register to claim ITC, build credibility, and access inter-state markets.",
    tag: "Optional",
    tagStyle: { background: "#dbeafe", color: "#2563eb" },
    color: "from-sky-500 to-blue-400",
    lightBg: "#f0f9ff",
  },
];

const typesData = [
  {
    type: "Regular GST Registration",
    who: "Businesses above threshold & inter-state sellers",
    returns: "GSTR-1, GSTR-3B, GSTR-9",
    itc: true,
    collect: true,
    highlight: true,
    badge: "Most Common",
    color: "#F97316",
    gradientBorder: "linear-gradient(135deg, #F97316, #f59e0b)",
  },
  {
    type: "Composition Scheme",
    who: "Small businesses with turnover < ₹1.5 Cr",
    returns: "CMP-08 (Quarterly), GSTR-4 (Annual)",
    itc: false,
    collect: false,
    note: "Fixed % tax · No ITC",
    color: "#8b5cf6",
  },
  {
    type: "Casual Taxable Person",
    who: "Trade fairs, exhibitions, temporary setups",
    returns: "GSTR-1 & GSTR-3B",
    itc: true,
    collect: true,
    note: "Valid 90 Days",
    color: "#0ea5e9",
  },
  {
    type: "Non-Resident Taxable Person",
    who: "Foreign businesses supplying in India",
    returns: "GSTR-5 (Monthly)",
    itc: false,
    collect: true,
    color: "#10b981",
  },
  {
    type: "Input Service Distributor (ISD)",
    who: "Companies distributing ITC to branches",
    returns: "GSTR-6 (Monthly)",
    itc: true,
    collect: false,
    color: "#ec4899",
  },
  {
    type: "Voluntary GST Registration",
    who: "Below threshold but want GST benefits",
    returns: "GSTR-1 & GSTR-3B",
    itc: true,
    collect: true,
    color: "#f59e0b",
  },
];

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3 transition-all duration-300 hover:border-orange-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-orange-50 transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 font-semibold text-[#141D32] text-sm md:text-base">
          <span className="w-7 h-7 rounded-full bg-orange-100 text-[#F97316] text-xs font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#F97316] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

const GSTRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("proprietorship");
  const { onOpenModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "GST Registration Service",
    provider: {
      "@type": "Organization",
      name: "Koop India",
      url: "https://www.koopindia.com",
    },
    serviceType: "GST Registration",
    areaServed: "IN",
    description:
      "Professional GST Registration service in India. Expert help with documents, filing, GSTIN issuance & compliance. Fast, affordable & 100% online.",
    offers: {
      "@type": "Offer",
      price: "2999",
      priceCurrency: "INR",
    },
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

  return (
    <>
      <Head>
        <title>
          GST Registration in India 2025 | Documents, Fees, Procedure &amp;
          Online Application | Koop India
        </title>
        <meta
          name="description"
          content="Apply for GST Registration online in India with Koop India. ✓ 7–10 Days GSTIN ✓ Expert Guided ✓ Starting ₹2,999. Get help with documents, filing, query handling & post-registration compliance."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="GST registration, GST registration online, GSTIN, how to register for GST, GST registration documents, GST registration fees, GST registration procedure, GST registration India 2025"
        />
        <link
          rel="canonical"
          href="https://www.koopindia.com/gst-registration"
        />
        <meta
          property="og:title"
          content="GST Registration in India | Koop India"
        />
        <meta
          property="og:description"
          content="Fast, expert-guided GST Registration starting at ₹2,999. Documents, procedure, fees & GSTIN issuance — all handled by Koop India."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.koopindia.com/gst-registration"
        />
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
        {/* ══════════════════ WHAT IS GST ══════════════════ */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2 mb-5">
                  What is{" "}
                  <span className="text-[#F97316]">GST Registration?</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  <strong>GST (Goods and Services Tax)</strong> is India's
                  unified indirect tax that replaced multiple central and state
                  taxes like VAT, Service Tax, and Central Excise. GST
                  Registration is the process by which a business gets
                  registered under GST law and receives a unique 15-digit{" "}
                  <strong>GSTIN (GST Identification Number)</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Registration becomes <strong>mandatory</strong> once aggregate
                  turnover crosses the prescribed threshold—or immediately for
                  specific categories. Without a GSTIN, you cannot legally
                  collect GST, claim input tax credit, or sell on major
                  e-commerce platforms.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: CreditCard,
                      text: "Collect GST from customers legally",
                    },
                    { icon: TrendingUp, text: "Claim Input Tax Credit (ITC)" },
                    { icon: Globe, text: "Sell across all Indian states" },
                    { icon: Building, text: "List on Amazon, Flipkart & more" },
                    { icon: Users, text: "Build B2B credibility" },
                    { icon: Lock, text: "Avoid tax penalties" },
                  ].map(({ icon: Icon, text }, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl p-3 text-sm text-[#141D32]"
                    >
                      <Icon className="w-4 h-4 text-[#F97316] shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-8 text-white">
                <h3 className="text-lg font-bold mb-6 text-orange-400">
                  Quick GST Registration Facts
                </h3>
                {[
                  ["Governing Law", "CGST Act, 2017"],
                  ["Threshold (Goods)", "₹40 Lakhs (₹20L for special states)"],
                  [
                    "Threshold (Services)",
                    "₹20 Lakhs (₹10L for special states)",
                  ],
                  ["Application Form", "GST REG-01"],
                  ["Processing Time", "7–10 Working Days"],
                  ["GSTIN Length", "15 Digits (State + PAN based)"],
                  ["Penalty for Non-Compliance", "₹10,000 or 100% tax evaded"],
                  ["Returns (Regular)", "GSTR-1, GSTR-3B, GSTR-9"],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start border-b border-white/10 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0 text-sm"
                  >
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-semibold text-right max-w-[55%]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-20 px-5 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #fafafa 0%, #fff7ed 55%, #fafafa 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle, #F97316 0%, transparent 70%)",
              transform: "translate(-40%, -40%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-10"
            style={{
              background:
                "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
              transform: "translate(30%, 30%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{
                  background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                  color: "#F97316",
                  border: "1px solid #fed7aa",
                }}
              >
                Applicability
              </span>
              <h2
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: "#141D32" }}
              >
                Who Needs{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F97316, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  GST Registration?
                </span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                GST registration is mandatory for the following categories
                irrespective of turnover in some cases.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whoNeedsData.map(
                (
                  { icon: Icon, title, desc, tag, tagStyle, color, lightBg },
                  i,
                ) => (
                  <div
                    key={i}
                    className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                    style={{
                      border: "1px solid #f3f4f6",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#fed7aa";
                      e.currentTarget.style.background = lightBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#f3f4f6";
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    {/* Tag */}
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={tagStyle}
                    >
                      {tag}
                    </span>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    <h3 className="font-bold text-[#141D32] mb-2 text-sm">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {desc}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ══ TYPES OF GST ══ */}
        <section
          className="py-20 px-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 15%, #fed7aa 0%, transparent 35%), radial-gradient(circle at 5% 85%, #dbeafe 0%, transparent 35%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{
                  background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                  color: "#F97316",
                  border: "1px solid #fed7aa",
                }}
              >
                Registration Types
              </span>
              <h2
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: "#141D32" }}
              >
                Types of{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F97316, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  GST Registration
                </span>{" "}
                We Handle
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Choose the right GST category based on your business size,
                turnover, and operational structure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {typesData.map(
                (
                  {
                    type,
                    who,
                    returns,
                    itc,
                    collect,
                    note,
                    highlight,
                    badge,
                    color,
                  },
                  i,
                ) => (
                  <div
                    key={i}
                    className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      border: highlight
                        ? `2px solid ${color}`
                        : "1px solid #f3f4f6",
                      boxShadow: highlight
                        ? `0 4px 20px ${color}22`
                        : "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Highlight badge */}
                    {badge && (
                      <span
                        className="absolute -top-3 right-5 text-xs font-bold px-3 py-1 rounded-full shadow-md text-white"
                        style={{
                          background: `linear-gradient(135deg, ${color}, #f59e0b)`,
                        }}
                      >
                        {badge}
                      </span>
                    )}

                    {/* Color dot + title */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{
                          background: color,
                          boxShadow: `0 0 8px ${color}66`,
                        }}
                      />
                      <div>
                        <h3 className="font-bold text-[#141D32] text-sm leading-snug">
                          {type}
                        </h3>
                        {note && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                            style={{ background: `${color}18`, color }}
                          >
                            {note}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Suitable For */}
                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                        Suitable For
                      </p>
                      <p className="text-xs text-gray-700 font-medium leading-relaxed">
                        {who}
                      </p>
                    </div>

                    {/* Returns */}
                    <div className="mb-5">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                        Returns Required
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {returns}
                      </p>
                    </div>

                    {/* ITC / Collect */}
                    <div
                      className="flex justify-between pt-4 mt-auto"
                      style={{ borderTop: "1px solid #f3f4f6" }}
                    >
                      <div
                        className={`flex items-center gap-1.5 text-xs font-semibold ${itc ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {itc ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        ITC Claim
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-xs font-semibold ${collect ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {collect ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        Collect GST
                      </div>
                    </div>

                    {/* Bottom accent on hover */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════ DOCUMENTS REQUIRED ══════════════════ */}
        <section id="documents" className="pb-16 px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Documentation
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Documents Required for{" "}
                <span className="text-[#F97316]">GST Registration</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Keep these documents ready to ensure a smooth, fast, and
                rejection-free GST registration process.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Proprietor */}
              <div className="bg-white rounded-2xl border border-slate-400 p-6 hover:shadow-xl transition">
                <div className="w-12 h-12 bg-orange-100 text-[#F97316] rounded-xl flex items-center justify-center mb-4">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#141D32] mb-4">
                  Proprietorship / Individual
                </h3>

                {[
                  "PAN Card of Proprietor",
                  "Aadhaar Card",
                  "Passport-size Photograph",
                  "Business Address Proof",
                  "Bank Account Proof",
                ].map((doc, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600 mb-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5" />
                    {doc}
                  </p>
                ))}
              </div>

              {/* Partnership / LLP */}
              <div className="bg-white rounded-2xl border border-slate-400 p-6 hover:shadow-xl transition">
                <div className="w-12 h-12 bg-orange-100 text-[#F97316] rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#141D32] mb-4">
                  Partnership / LLP
                </h3>

                {[
                  "PAN Card of Firm / LLP",
                  "Partnership Deed / LLP Agreement",
                  "PAN & Aadhaar of Partners / Designated Partners",
                  "Authorized Signatory Proof",
                  "Registered Office Address Proof",
                  "Bank Account Proof",
                ].map((doc, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600 mb-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5" />
                    {doc}
                  </p>
                ))}
              </div>

              {/* Company */}
              <div className="bg-white rounded-2xl border border-slate-400 p-6 hover:shadow-xl transition">
                <div className="w-12 h-12 bg-orange-100 text-[#F97316] rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#141D32] mb-4">
                  Private Limited / Public Company
                </h3>

                {[
                  "PAN Card of Company",
                  "Certificate of Incorporation",
                  "MOA & AOA",
                  "PAN & Aadhaar of Directors",
                  "Board Resolution / Authorization Letter",
                  "Registered Office Address Proof",
                  "Company Bank Account Proof",
                ].map((doc, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600 mb-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5" />
                    {doc}
                  </p>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-6 py-3 text-sm text-[#141D32] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                All documents are verified by GST experts before submission to
                avoid rejections or delays.
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ PROCESS ══════════════════ */}
        <section id="process" className="pb-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Step-by-Step
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                GST Registration{" "}
                <span className="text-[#F97316]">Procedure</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Our streamlined 6-step process ensures your GST registration is
                completed accurately and quickly
              </p>
            </div>

            <div className="relative">
              {/* connecting line */}
              <div className="hidden lg:block absolute top-8 left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {[
                  {
                    step: "01",
                    title: "Free Consultation",
                    desc: "Our expert assesses your business type, turnover, and recommends the right GST category.",
                    icon: MessageSquare,
                  },
                  {
                    step: "02",
                    title: "Document Collection",
                    desc: "We share a checklist and verify your documents for accuracy before filing.",
                    icon: FileText,
                  },
                  {
                    step: "03",
                    title: "Application Filing",
                    desc: "We file GST REG-01 on the GST portal with verified documents.",
                    icon: Globe,
                  },
                  {
                    step: "04",
                    title: "OTP Authentication",
                    desc: "Aadhaar-based OTP authentication and e-sign of the application.",
                    icon: Lock,
                  },
                  {
                    step: "05",
                    title: "Query Handling",
                    desc: "If the department raises queries (GST REG-03), our team responds promptly.",
                    icon: AlertCircle,
                  },
                  {
                    step: "06",
                    title: "GSTIN Issued",
                    desc: "GST registration certificate issued with your unique GSTIN. You're ready to operate!",
                    icon: Award,
                  },
                ].map(({ step, title, desc, icon: Icon }, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white font-extrabold text-sm mb-4 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {step}
                    </div>
                    <Icon className="w-5 h-5 text-[#F97316] mb-2" />
                    <h3 className="font-bold text-[#141D32] text-sm mb-1">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-6 py-3 text-sm text-[#141D32] font-semibold">
                  <Clock className="w-4 h-4 text-[#F97316]" />
                  Total Timeline:{" "}
                  <span className="text-[#F97316]">7–10 Working Days</span>{" "}
                  (subject to department processing)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GST REGISTRATION CTA ================= */}
        <section className="py-16 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Get Your <span className="text-[#F97316]">GST Registration</span>{" "}
            Done Fast & Hassle-Free
          </h2>

          <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
            Register your business under GST with expert assistance from Koop
            India. From document verification to GSTIN issuance—we handle
            everything, so you stay compliant and ready to grow.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 cursor-pointer rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-800 transition"
          >
            Apply for GST Registration <ArrowRight />
          </button>

          <p className="text-xs text-gray-400 mt-4">
            ✔ 100% Online Process • ✔ Expert-Assisted Filing • ✔ GSTIN in 7–10
            Working Days*
          </p>
        </section>

        {/* ══════════════════ WHY KOOP ══════════════════ */}
        <section
          className="relative py-20 px-5 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #fafafa 0%, #fff7ed 50%, #fafafa 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #F97316 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #F97316 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{
                  background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                  color: "#F97316",
                  border: "1px solid #fed7aa",
                }}
              >
                Why Choose Us
              </span>
              <h2
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: "#141D32" }}
              >
                Why{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F97316, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Koop India
                </span>{" "}
                for Your
                <br className="hidden md:block" /> GST Registration?
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Trusted by 10,000+ businesses across India for seamless,
                accurate, and affordable GST compliance.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "white",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#fed7aa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f3f4f6";
                  }}
                >
                  {/* Number badge */}
                  <span
                    className="absolute top-4 right-4 text-xs font-bold tabular-nums"
                    style={{ color: "#e5e7eb" }}
                  >
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${bg} transition-all duration-300 group-hover:scale-110`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  <h3
                    className="font-bold text-sm mb-2 leading-snug"
                    style={{ color: "#141D32" }}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {desc}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ POST-REGISTRATION SUPPORT ══════════════════ */}
        <section className="py-16 px-5 bg-[#0F172A] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                  Beyond Registration
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-5">
                  Post-Registration{" "}
                  <span className="text-[#F97316]">Compliance Support</span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Getting your GSTIN is just the beginning. Staying compliant
                  requires timely return filing, proper record-keeping, and
                  responding to notices. Koop India provides comprehensive
                  post-registration support so you're always compliant.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: "GSTR-1 Filing",
                      desc: "Monthly/Quarterly outward supply statement",
                    },
                    {
                      title: "GSTR-3B Filing",
                      desc: "Monthly self-assessed tax payment return",
                    },
                    {
                      title: "GSTR-9 Annual Return",
                      desc: "Yearly reconciliation and annual filing",
                    },
                    {
                      title: "GST Notices & Audit Support",
                      desc: "Expert handling of departmental queries",
                    },
                    {
                      title: "eInvoice Setup",
                      desc: "Mandatory for businesses with turnover > ₹5 Cr",
                    },
                    {
                      title: "eWay Bill Management",
                      desc: "For goods movement above ₹50,000 value",
                    },
                    {
                      title: "ITC Reconciliation",
                      desc: "GSTR-2A/2B matching and credit optimization",
                    },
                    {
                      title: "GST Cancellation",
                      desc: "Surrender GSTIN when business closes or threshold not met",
                    },
                  ].map(({ title, desc }, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-b border-white/10 pb-3 last:border-0"
                    >
                      <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-white font-semibold text-sm">
                          {title}
                        </span>
                        <span className="text-gray-400 text-xs"> — {desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-orange-400 mb-6">
                  GST Return Filing Calendar
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      form: "GSTR-1",
                      freq: "Monthly (11th) / Quarterly (13th)",
                      type: "Outward Supplies",
                    },
                    {
                      form: "GSTR-3B",
                      freq: "Monthly (20th) / Quarterly (22nd/24th)",
                      type: "Summary Return",
                    },
                    {
                      form: "CMP-08",
                      freq: "Quarterly (18th)",
                      type: "Composition Dealers",
                    },
                    {
                      form: "GSTR-4",
                      freq: "Annual (30th April)",
                      type: "Composition Annual",
                    },
                    {
                      form: "GSTR-9",
                      freq: "Annual (31st December)",
                      type: "Regular Annual",
                    },
                    {
                      form: "GSTR-9C",
                      freq: "Annual (31st December)",
                      type: "Reconciliation (>₹5Cr)",
                    },
                  ].map(({ form, freq, type }, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[#F97316] font-bold text-sm">
                            {form}
                          </span>
                          <p className="text-gray-400 text-xs mt-0.5">{type}</p>
                        </div>
                        <span className="text-gray-300 text-xs text-right max-w-[50%]">
                          {freq}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative py-20 px-5 overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #f8fafc 0%, #fff7ed 60%, #f8fafc 100%)",
          }}
        >
          {/* Decorative background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, #fed7aa 0%, transparent 40%), radial-gradient(circle at 10% 80%, #dbeafe 0%, transparent 40%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4"
                style={{
                  background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                  color: "#F97316",
                  border: "1px solid #fed7aa",
                }}
              >
                Explore More
              </span>
              <h2
                className="text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: "#141D32" }}
              >
                Documentation &{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F97316, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Compliance Services
                </span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                End-to-end business documentation, registrations, and compliance
                services under one roof.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {services.map(
                ({ name, href, icon: Icon, color, lightBg, tag }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="group relative rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: "white",
                      border: "1px solid #f3f4f6",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#fed7aa";
                      e.currentTarget.style.background = lightBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#f3f4f6";
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    {/* Tag badge */}
                    {tag && (
                      <span
                        className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: tag === "New" ? "#dcfce7" : "#fff7ed",
                          color: tag === "New" ? "#16a34a" : "#F97316",
                        }}
                      >
                        {tag}
                      </span>
                    )}

                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>

                    {/* Text */}
                    <span
                      className="font-semibold text-sm leading-snug flex-1 transition-colors duration-200"
                      style={{ color: "#141D32" }}
                      onMouseEnter={(e) => (e.target.style.color = "#F97316")}
                      onMouseLeave={(e) => (e.target.style.color = "#141D32")}
                    >
                      {name}
                    </span>

                    {/* Arrow */}
                    <ArrowRight
                      className="w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: "#d1d5db" }}
                    />
                  </a>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════ FAQ ══════════════════ */}
        <section className="pb-16 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Common Questions
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Frequently Asked{" "}
                <span className="text-[#F97316]">Questions</span>
              </h2>
              <p className="text-gray-500 mt-3">
                Everything you need to know about GST Registration in India
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

export default GSTRegistrationPage;
