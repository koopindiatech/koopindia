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

        {/* ══════════════════ WHO NEEDS GST ══════════════════ */}
        <section className="px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Applicability
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Who Needs{" "}
                <span className="text-[#F97316]">GST Registration?</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                GST registration is mandatory for the following categories
                irrespective of turnover in some cases
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: BarChart3,
                  title: "Turnover-Based Registration",
                  desc: "Businesses with aggregate turnover above ₹40L (goods) or ₹20L (services) must register. Special category states have lower thresholds.",
                  tag: "Most Common",
                },
                {
                  icon: Globe,
                  title: "Inter-State Suppliers",
                  desc: "Any business supplying goods or services outside their home state must register regardless of turnover amount.",
                  tag: "Mandatory",
                },
                {
                  icon: Building,
                  title: "E-Commerce Sellers",
                  desc: "All sellers on Amazon, Flipkart, Meesho, Myntra, Swiggy, Zomato etc. must be GST registered before listing products.",
                  tag: "Mandatory",
                },
                {
                  icon: Users,
                  title: "Casual Taxable Persons",
                  desc: "Individuals who occasionally supply goods/services in a taxable territory where they have no fixed place of business.",
                  tag: "Mandatory",
                },
                {
                  icon: TrendingUp,
                  title: "RCM Liable Businesses",
                  desc: "Businesses receiving supplies on which Reverse Charge Mechanism (RCM) applies must register, regardless of turnover.",
                  tag: "Mandatory",
                },
                {
                  icon: FileText,
                  title: "Voluntary Registration",
                  desc: "Businesses below the threshold can voluntarily register to claim ITC, build credibility, and access inter-state markets.",
                  tag: "Optional",
                },
              ].map(({ icon: Icon, title, desc, tag }, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span
                    className={`absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full ${tag === "Mandatory" ? "bg-red-100 text-red-600" : tag === "Optional" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                  >
                    {tag}
                  </span>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                    <Icon className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <h3 className="font-bold text-[#141D32] mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ TYPES OF GST ══════════════════ */}
        <section className="py-16 px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Registration Types
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-3">
                Types of{" "}
                <span className="text-[#F97316]">GST Registration</span> We
                Handle
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Choose the right GST category based on your business size,
                turnover, and operational structure.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[
                {
                  type: "Regular GST Registration",
                  who: "Businesses above threshold & inter-state sellers",
                  returns: "GSTR-1, GSTR-3B, GSTR-9",
                  itc: true,
                  collect: true,
                  highlight: true,
                },
                {
                  type: "Composition Scheme",
                  who: "Small businesses with turnover < ₹1.5 Cr",
                  returns: "CMP-08 (Quarterly), GSTR-4 (Annual)",
                  itc: false,
                  collect: false,
                  note: "Fixed % tax, No ITC",
                },
                {
                  type: "Casual Taxable Person",
                  who: "Trade fairs, exhibitions, temporary setups",
                  returns: "GSTR-1 & GSTR-3B",
                  itc: true,
                  collect: true,
                  note: "Valid 90 Days",
                },
                {
                  type: "Non-Resident Taxable Person",
                  who: "Foreign businesses supplying in India",
                  returns: "GSTR-5 (Monthly)",
                  itc: false,
                  collect: true,
                },
                {
                  type: "Input Service Distributor (ISD)",
                  who: "Companies distributing ITC to branches",
                  returns: "GSTR-6 (Monthly)",
                  itc: true,
                  collect: false,
                },
                {
                  type: "Voluntary GST Registration",
                  who: "Below threshold but want GST benefits",
                  returns: "GSTR-1 & GSTR-3B",
                  itc: true,
                  collect: true,
                },
              ].map(
                ({ type, who, returns, itc, collect, note, highlight }, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl border bg-white p-6 transition-all duration-300 
          hover:shadow-2xl hover:-translate-y-1 
          ${highlight ? "border-[#F97316] shadow-lg" : "border-gray-200"}`}
                  >
                    {highlight && (
                      <span className="absolute -top-3 right-5 bg-[#F97316] text-white text-xs px-3 py-1 rounded-full shadow-md">
                        Most Common
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="font-bold text-[#141D32] text-base mb-1">
                      {type}
                    </h3>
                    {note && (
                      <p className="text-xs text-[#F97316] font-medium mb-3">
                        {note}
                      </p>
                    )}

                    {/* Who */}
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Suitable For
                      </p>
                      <p className="text-sm text-gray-700 font-medium mt-1">
                        {who}
                      </p>
                    </div>

                    {/* Returns */}
                    <div className="mb-5">
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Returns Required
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{returns}</p>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-between pt-4 border-t border-gray-100">
                      <div
                        className={`flex items-center gap-2 text-xs font-semibold ${
                          itc ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            itc ? "bg-green-500" : "bg-red-400"
                          }`}
                        />
                        ITC Claim
                      </div>

                      <div
                        className={`flex items-center gap-2 text-xs font-semibold ${
                          collect ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            collect ? "bg-green-500" : "bg-red-400"
                          }`}
                        />
                        Collect GST
                      </div>
                    </div>
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition">
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition">
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition">
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
        <section className="py-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Why <span className="text-[#F97316]">Koop India</span> for Your
                GST Registration?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Users,
                  title: "Dedicated GST Experts",
                  desc: "Our team consists of CA-supervised GST professionals with deep knowledge of CGST, SGST, and IGST regulations.",
                },
                {
                  icon: ShieldCheck,
                  title: "Error-Free Documentation",
                  desc: "We verify every document before submission, achieving a 98%+ first-time approval rate.",
                },
                {
                  icon: Clock,
                  title: "End-to-End Support",
                  desc: "From consultation to GSTIN delivery—we handle everything including departmental queries.",
                },
                {
                  icon: TrendingUp,
                  title: "Post-Registration Compliance",
                  desc: "Monthly/quarterly return filing, notice handling, and ongoing compliance support available.",
                },
                {
                  icon: Zap,
                  title: "Fast Turnaround",
                  desc: "Most registrations completed in 7–10 working days. Expedited processing available.",
                },
                {
                  icon: Award,
                  title: "MSME & Startup Focused",
                  desc: "Affordable, startup-friendly pricing. We understand the unique needs of small businesses.",
                },
                {
                  icon: Globe,
                  title: "Pan-India Service",
                  desc: "We handle GST registrations across all Indian states including special category states.",
                },
                {
                  icon: Lock,
                  title: "100% Secure & Confidential",
                  desc: "Your data and documents are handled with complete privacy and data security protocols.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-orange-50 group-hover:bg-orange-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <h3 className="font-bold text-[#141D32] text-sm mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {desc}
                  </p>
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

        {/* ══════════════════ RELATED DOCUMENTATION & COMPLIANCE SERVICES ══════════════════ */}
        <section className="py-16 px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mt-2">
                Documentation &{" "}
                <span className="text-[#F97316]">Compliance Services</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                End-to-end business documentation, registrations, and compliance
                services under one roof.
              </p>
            </div>

            {/* Buttons Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[
                {
                  name: "Company Registration",
                  href: "/documentation-compliance/company-registration",
                },
                {
                  name: "Trademark Registration",
                  href: "/documentation-compliance/trademark-registration",
                },
                {
                  name: "FSSAI License",
                  href: "/documentation-compliance/fssai-license",
                },
                {
                  name: "ISO Certification",
                  href: "/documentation-compliance/iso-certification",
                },
                {
                  name: "Startup India Registration",
                  href: "/documentation-compliance/startup-india-registration",
                },
                {
                  name: "Company Accounting",
                  href: "/documentation-compliance/company-accounting",
                },
                {
                  name: "Tax & Compliance Services",
                  href: "/documentation-compliance/tax-compliance",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="group bg-white border border-gray-200 rounded-2xl p-5 
          flex items-center justify-between hover:border-orange-300 
          hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-semibold text-[#141D32] text-sm group-hover:text-[#F97316]">
                    {item.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#F97316] transition" />
                </a>
              ))}
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
