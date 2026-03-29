"use client";
import React, { useState } from "react";
import Head from "next/head";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  FileText,
  Users,
  Globe,
  Zap,
  TrendingUp,
  BadgeCheck,
  Building2,
  Cpu,
  Leaf,
  HeartPulse,
  Lock,
  Flame,
  Stethoscope,
  Phone,
  MessageSquare,
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const faqs = [
  {
    q: "What is ISO Certification and why does my business need it?",
    a: "ISO Certification is an internationally recognized mark that proves your business adheres to globally accepted standards for quality, safety, efficiency, and compliance. It helps you win government tenders, build customer trust, qualify for export markets, and demonstrate operational excellence to partners and investors.",
  },
  {
    q: "How long does it take to get ISO Certified?",
    a: "With Koop India, the typical turnaround is 7–15 working days depending on the ISO standard, your business size, and document readiness. Our consultants fast-track the process by handling documentation and liaison with the certification body on your behalf.",
  },
  {
    q: "What is the cost of ISO Certification in India?",
    a: "ISO Certification starts at ₹2,999* with Koop India. Final pricing depends on the type of ISO standard (9001, 14001, 22000, 45001, etc.), number of employees, and scope of your business activities. We offer transparent, no-hidden-charge pricing. Contact us for an exact quote.",
  },
  {
    q: "Is ISO Certification mandatory in India?",
    a: "ISO Certification is not mandatory for all businesses, but it is often required to bid for government and corporate tenders, export goods internationally, or partner with large enterprises. Certain industries like food (ISO 22000) and medical devices (ISO 13485) have sector-specific requirements.",
  },
  {
    q: "What is the validity of an ISO Certificate?",
    a: "An ISO certificate is valid for 3 years. During this period, annual surveillance audits are conducted to ensure ongoing compliance. Koop India supports you through every surveillance audit and handles renewal when the 3-year term expires.",
  },
  {
    q: "Which ISO certification is best for small businesses and startups?",
    a: "ISO 9001 (Quality Management System) is the most universally applicable and is ideal for startups, SMEs, and service businesses. It demonstrates commitment to quality and is accepted across all industries. Our consultants can help you choose the right standard based on your goals.",
  },
  {
    q: "Can I get ISO Certified online?",
    a: "Yes! Koop India offers a 100% online ISO Certification process. From document collection and gap analysis to application filing and certificate delivery, everything is handled digitally. You don't need to visit any office.",
  },
  {
    q: "What documents are required for ISO Certification?",
    a: "Core documents include: PAN Card of the business, Aadhaar of the authorized signatory, business registration proof, address proof, and scope of business activities. Additional documents like quality policies or product details may be needed depending on the standard. Koop India assists in preparing all required documentation.",
  },
  {
    q: "Does ISO Certification help in winning government tenders?",
    a: "Absolutely. ISO 9001 certification is a mandatory or preferred requirement in most government and PSU tenders in India. Having a valid ISO certificate significantly improves your eligibility and scoring in tender evaluations.",
  },
  {
    q: "What is the difference between ISO 9001 and ISO 14001?",
    a: "ISO 9001 focuses on Quality Management Systems—ensuring consistent products/services and customer satisfaction. ISO 14001 focuses on Environmental Management Systems—helping businesses minimize environmental impact and comply with environmental regulations. Many manufacturing companies obtain both.",
  },
  {
    q: "Will Koop India help with post-certification compliance?",
    a: "Yes. Koop India provides complete post-certification support including annual surveillance audit preparation, documentation updates, renewal assistance, and guidance on maintaining compliance with ISO standards throughout the certificate lifecycle.",
  },
  {
    q: "Is the ISO certificate issued by Koop India government recognized?",
    a: "Yes. We work exclusively with accredited certification bodies recognized under international accreditation standards. The certificates issued are accepted by government departments, PSUs, corporate buyers, and international trade partners.",
  },
];

const isoStandards = [
  {
    icon: <BadgeCheck className="w-8 h-8" />,
    code: "ISO 9001",
    title: "Quality Management System",
    best: "All industries & businesses",
    desc: "The world's most widely adopted ISO standard. Ensures consistent quality, customer satisfaction, and continuous improvement across all processes.",
    color: "from-orange-500 to-orange-600",
    popular: true,
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    code: "ISO 14001",
    title: "Environmental Management",
    best: "Manufacturing & industrial units",
    desc: "Demonstrates environmental responsibility, reduces waste, ensures legal compliance, and supports sustainable business practices.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: <Flame className="w-8 h-8" />,
    code: "ISO 22000",
    title: "Food Safety Management",
    best: "Food manufacturers, processors, exporters",
    desc: "Essential for food businesses. Covers the entire food supply chain and is mandatory for many food export tenders and certifications.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: <HeartPulse className="w-8 h-8" />,
    code: "ISO 45001",
    title: "Occupational Health & Safety",
    best: "Factories & high-risk industries",
    desc: "Reduces workplace accidents and illnesses, demonstrates worker safety commitment, and helps meet legal health and safety obligations.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    code: "ISO 27001",
    title: "Information Security Management",
    best: "IT, fintech, data-driven businesses",
    desc: "Protects sensitive information, prevents data breaches, and builds digital trust with clients, regulators, and enterprise partners.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    code: "ISO 50001",
    title: "Energy Management System",
    best: "Energy-intensive industries",
    desc: "Optimizes energy use, reduces costs, and demonstrates environmental commitment by systematically managing energy performance.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    code: "ISO 13485",
    title: "Medical Devices QMS",
    best: "Medical device manufacturers",
    desc: "Required for medical device exports and regulatory approvals. Ensures device safety, quality, and compliance throughout the lifecycle.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    code: "ISO/IEC 20000",
    title: "IT Service Management",
    best: "IT service providers",
    desc: "Establishes best practices for IT service delivery, aligns with ITIL, and demonstrates service quality to enterprise clients.",
    color: "from-indigo-500 to-indigo-600",
  },
];

const stats = [
  {
    value: "5000+",
    label: "Businesses Certified",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    value: "15+",
    label: "ISO Standards Covered",
    icon: <Award className="w-5 h-5" />,
  },
  {
    value: "7–15",
    label: "Days to Certificate",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    value: "100%",
    label: "Online Process",
    icon: <Globe className="w-5 h-5" />,
  },
];

/* ─────────────────────────────────────────
   WHY KOOP
───────────────────────────────────────── */
const whyKoop = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Experienced Consultants",
    desc: "ISO specialists with 10+ years of experience across all major industries and standards.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Turnaround",
    desc: "Certificate in 7–15 working days. Fastest legal process available in India.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Documentation Support",
    desc: "We prepare, review, and format all documents per ISO requirements—no stress for you.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "100% Online Process",
    desc: "Apply, submit, track, and receive your certificate—entirely from your phone or laptop.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "MSME & Startup Friendly",
    desc: "Special packages for small businesses and startups.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Post-Cert Compliance",
    desc: "Ongoing surveillance audit support, renewal, and tender compliance guidance included.",
  },
];

/* ─────────────────────────────────────────
   PROCESS STEPS
───────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Free Consultation & ISO Selection",
    desc: "Our experts assess your business needs and recommend the right ISO standard(s) for your goals—whether for tenders, exports, or operational quality.",
  },
  {
    num: "02",
    title: "Gap Analysis & Documentation",
    desc: "We perform a thorough gap analysis against ISO requirements and prepare / format all necessary documentation, policies, and procedures.",
  },
  {
    num: "03",
    title: "Application Filing",
    desc: "We file your application with an accredited certification body, managing all correspondence and submissions on your behalf.",
  },
  {
    num: "04",
    title: "Audit / Verification",
    desc: "A Stage 1 document review and Stage 2 audit (online or onsite) is conducted by the certification body. We prepare you thoroughly.",
  },
  {
    num: "05",
    title: "Non-Conformity Closure",
    desc: "If any gaps are found during the audit, we help you prepare corrective action plans and close all non-conformities quickly.",
  },
  {
    num: "06",
    title: "ISO Certificate Issued",
    desc: "Your ISO certificate is issued, valid for 3 years. Koop India delivers the hard copy and digital copy and supports all future audits.",
  },
];

/* ─────────────────────────────────────────
   FAQ ACCORDION ITEM
───────────────────────────────────────── */
const FAQItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border border-gray-100 rounded-2xl overflow-hidden mb-3 shadow-sm">
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-4 px-6 py-5 bg-white hover:bg-orange-50 transition-colors text-left"
    >
      <span className="font-semibold text-[#141D32] text-sm leading-snug">
        {q}
      </span>
      <span className="flex-shrink-0 mt-0.5">
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#F97316]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </span>
    </button>
    {isOpen && (
      <div className="px-6 pb-5 bg-white text-sm text-gray-600 leading-relaxed border-t border-gray-50">
        <div className="pt-3">{a}</div>
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const ISOCertificationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (i) => setOpenFAQ(openFAQ === i ? null : i);

  return (
    <>
      {/* ─── SEO META ─── */}
      <Head>
        <title>
          ISO Certification in India | ISO 9001, 14001, 22000, 45001 | Koop
          India
        </title>
        <meta
          name="description"
          content="Get ISO Certification in India with Koop India. ISO 9001, ISO 14001, ISO 22000, ISO 45001 & more. Expert consultants, fast 7–15 day approval, 100% online. Starting ₹2,999."
        />
        <meta
          name="keywords"
          content="ISO certification India, ISO 9001 certification, ISO 14001, ISO 22000, ISO 45001, ISO certificate online, ISO consultant India, ISO certification for MSME, ISO certification cost India, ISO certification for tender"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="ISO Certification in India | Koop India"
        />
        <meta
          property="og:description"
          content="Get ISO Certified in 7–15 days. ISO 9001, 14001, 22000, 45001 & more. 100% online, starting ₹2,999."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/documentation-compliance/iso-certification"
        />
      </Head>

      <div className="bg-white text-gray-700 font-[Outfit,sans-serif]">
        {/* ─── HERO ─── */}
        <section className="relative py-14 px-5 bg-gradient-to-br from-[#0A1020] via-[#0F172A] to-[#141D32] text-white overflow-hidden">
          {/* background texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #F97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F97316 0%, transparent 40%)",
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                {/* badge */}
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
                  <Star className="w-3.5 h-3.5 text-[#F97316]" />
                  <span className="text-xs text-orange-300 font-medium tracking-wide uppercase">
                    India's Trusted ISO Consultant
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl  font-extrabold mb-5 leading-tight tracking-tight">
                  ISO Certification
                  <br />
                  <span className="text-[#F97316]">in India</span>
                </h1>

                <p className="text-gray-300 text-lg mb-2 font-medium">
                  ISO 9001 • ISO 14001 • ISO 22000 • ISO 45001 & More
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  Documents • Procedure • Compliance • Fees • Expert Support
                </p>

                <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Build global trust and credibility for your business with{" "}
                  <strong className="text-white">Koop India</strong>. End-to-end
                  ISO certification services — from standard selection to final
                  certificate — handled by experts, 100% online.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={onOpenModal}
                    className="bg-[#F97316] px-8 py-3.5 cursor-pointer rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/30 text-sm"
                  >
                    Apply for ISO Certification{" "}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onOpenModal}
                    className="border border-white/20 px-8 py-3.5 cursor-pointer rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" /> Talk to an Expert
                  </button>
                </div>
              </div>

              {/* Hero stats card */}
              <div className="flex-shrink-0 w-full lg:w-80">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((s, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-2xl p-4 text-center"
                      >
                        <div className="text-[#F97316] flex justify-center mb-1">
                          {s.icon}
                        </div>
                        <div className="text-2xl font-extrabold text-white">
                          {s.value}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 leading-tight">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                    <p className="text-orange-300 text-sm font-medium">
                      Starting at
                    </p>
                    <p className="text-3xl font-extrabold text-white mt-0.5">
                      ₹2,999
                      <span className="text-base font-normal text-gray-400">
                        *
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      No hidden charges
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST BAR ─── */}
        <div className="bg-[#F97316] py-3 px-5">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-1 text-white text-xs font-medium">
            {[
              "✔ Government-Recognized Certification Bodies",
              "✔ Accredited & Globally Accepted Certificates",
              "✔ 5000+ Businesses Certified",
              "✔ 100% Online Process",
              "✔ MSME & Startup Friendly",
            ].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>

        {/* ─── WHAT IS ISO ─── */}
        <section className="py-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide">
                  Overview
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mb-5 leading-tight">
                  What is{" "}
                  <span className="text-[#F97316]">ISO Certification?</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  <strong>ISO</strong> (International Organization for
                  Standardization) Certification is a globally recognized
                  standard that certifies your business follows internationally
                  accepted systems for quality, safety, environmental
                  management, and operational efficiency.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  With over 1,000,000 organizations certified worldwide, ISO
                  standards are the benchmark for credibility in B2B,
                  government, and international markets. In India, ISO
                  certification is increasingly required for tenders, exports,
                  and enterprise procurement.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <p className="text-sm font-semibold text-[#141D32] mb-1">
                  ISO Certification helps your business:
                </p>
                {[
                  {
                    icon: <TrendingUp className="w-4 h-4" />,
                    text: "Improve internal processes & quality control",
                  },
                  {
                    icon: <FileText className="w-4 h-4" />,
                    text: "Win government, PSU & corporate tenders",
                  },
                  {
                    icon: <Users className="w-4 h-4" />,
                    text: "Increase customer, investor & distributor trust",
                  },
                  {
                    icon: <Globe className="w-4 h-4" />,
                    text: "Expand nationally & access international markets",
                  },
                  {
                    icon: <Award className="w-4 h-4" />,
                    text: "Strengthen brand credibility & market positioning",
                  },
                  {
                    icon: <ShieldCheck className="w-4 h-4" />,
                    text: "Meet legal and regulatory compliance requirements",
                  },
                  {
                    icon: <Building2 className="w-4 h-4" />,
                    text: "Qualify for export incentives & foreign partnerships",
                  },
                  {
                    icon: <Star className="w-4 h-4" />,
                    text: "Attract larger clients and premium contracts",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 text-sm text-gray-700 border border-gray-100"
                  >
                    <span className="text-[#F97316] flex-shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ISO TYPES ─── */}
        <section className="py-14 px-5 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide text-orange-300">
                Standards
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Types of{" "}
                <span className="text-[#F97316]">ISO Certifications</span> We
                Offer
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                Koop India covers all major ISO standards. Our consultants help
                you identify the right standard(s) based on your industry,
                goals, and compliance requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {isoStandards.map((iso, i) => (
                <div
                  key={i}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-orange-500/30 transition-all group"
                >
                  {iso.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iso.color} flex items-center justify-center text-white mb-4`}
                  >
                    {iso.icon}
                  </div>
                  <div className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-1">
                    {iso.code}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2 leading-snug">
                    {iso.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3">
                    {iso.desc}
                  </p>
                  <div className="text-[10px] text-gray-500 bg-white/5 rounded-lg px-2 py-1.5">
                    <span className="text-gray-400 font-medium">Best for:</span>{" "}
                    {iso.best}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DOCUMENTS ─── */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide">
                Checklist
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mb-3">
                Documents <span className="text-[#F97316]">Required</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">
                Minimal paperwork, maximum support. Koop India prepares and
                formats all documents as per ISO standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <h4 className="font-bold text-[#141D32]">Basic Documents</h4>
                </div>
                {[
                  "PAN Card of the business entity",
                  "Aadhaar Card of the authorized signatory",
                  "Business registration proof (GST, ROC, etc.)",
                  "Address proof of business premises",
                  "Scope of business activities description",
                  "Letterhead of the company",
                ].map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-3 text-sm text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />{" "}
                    {d}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <h4 className="font-bold text-[#141D32]">
                    Additional Documents (If Applicable)
                  </h4>
                </div>
                {[
                  "Quality policy / process documents",
                  "Product catalogue or service list",
                  "Organizational chart & key personnel details",
                  "Previous ISO or quality certifications (if any)",
                  "Manufacturing process / service delivery flowchart",
                  "Customer feedback / complaint records",
                ].map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-3 text-sm text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />{" "}
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📌</span>
              <p className="text-sm text-green-800">
                <strong>Koop India handles the heavy lifting.</strong> Our
                consultants prepare, review, and format all documentation as per
                ISO standards. Even if you don't have all documents ready, we
                guide you step-by-step.
              </p>
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="py-14 px-5 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide text-orange-300">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                ISO Certification{" "}
                <span className="text-[#F97316]">Process</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Simple. Fast. Fully managed by our experts.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 hover:bg-white/8 transition-all"
                >
                  <div className="text-[#F97316] text-3xl font-black mb-3 opacity-60">
                    {step.num}
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Clock className="w-4 h-4 text-[#F97316]" />
                Certification usually completed within{" "}
                <strong className="text-white">7–15 working days</strong>
              </div>
              <button
                onClick={onOpenModal}
                className="bg-[#F97316] px-6 py-3 cursor-pointer rounded-xl font-semibold text-white hover:bg-orange-600 transition-all text-sm inline-flex items-center gap-2"
              >
                Start Your Application <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ─── COMPLIANCE & VALIDITY ─── */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide">
                  Compliance
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mb-5">
                  ISO Compliance &{" "}
                  <span className="text-[#F97316]">Validity</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Getting certified is just the beginning. Maintaining
                  compliance is what keeps your ISO status valid and your
                  business credibility intact.
                </p>

                {[
                  {
                    title: "3-Year Certificate Validity",
                    desc: "Your ISO certificate remains valid for 3 years from the date of issue.",
                  },
                  {
                    title: "Annual Surveillance Audits",
                    desc: "Each year, a surveillance audit is conducted to verify ongoing compliance with ISO standards.",
                  },
                  {
                    title: "Continuous Improvement",
                    desc: "ISO requires regular internal reviews and process improvements to maintain certification.",
                  },
                  {
                    title: "Recertification Audit",
                    desc: "At the end of 3 years, a recertification audit is conducted to renew the certificate.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 mb-5">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#141D32] text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#0F172A] to-[#141D32] rounded-3xl p-8 text-white">
                <h3 className="text-lg font-bold mb-5">
                  Post-Certification Support by Koop India
                </h3>
                {[
                  "ISO certificate renewal assistance",
                  "Annual surveillance audit preparation",
                  "Documentation update & review",
                  "Corrective action plan support",
                  "Tender & compliance guidance",
                  "Process improvement consulting",
                  "Multi-site extension support",
                  "New standard integration support",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-3 text-sm text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />{" "}
                    {item}
                  </div>
                ))}
                <button
                  onClick={onOpenModal}
                  className="mt-4 w-full bg-[#F97316] cursor-pointer px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all text-sm"
                >
                  Get Post-Certification Support
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY KOOP ─── */}
        <section className="pb-14 px-5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide">
              Why Us
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mb-3">
              Why Choose <span className="text-[#F97316]">Koop India</span>?
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-10">
              We've helped 5,000+ businesses across India get ISO certified.
              Here's what sets us apart.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyKoop.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-gray-100 rounded-2xl p-6 text-left hover:border-orange-200 hover:bg-orange-50/30 transition-all"
                >
                  <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-[#F97316] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#141D32] text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INDUSTRIES ─── */}
        <section className="py-14 px-5 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide text-orange-300">
              Industries
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Who Can Get <span className="text-[#F97316]">ISO Certified?</span>
            </h2>
            <p className="text-gray-400 text-sm mb-10">
              ISO certification is applicable across virtually all industries
              and business sizes.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Manufacturing",
                "Food & Beverage",
                "IT & Software",
                "Healthcare",
                "Construction",
                "Logistics & Supply Chain",
                "Education",
                "Hospitality",
                "Retail & E-commerce",
                "Pharmaceuticals",
                "Automotive",
                "Textile & Garments",
                "Engineering & Fabrication",
                "Export Businesses",
                "Startups & MSMEs",
                "Government Contractors",
              ].map((industry, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-gray-300 text-xs hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-300 transition-all"
                >
                  {industry}
                </div>
              ))}
            </div>

            <button
              onClick={onOpenModal}
              className="mt-10 bg-[#F97316] px-8 cursor-pointer py-3.5 rounded-xl font-semibold text-white hover:bg-orange-600 transition-all text-sm inline-flex items-center gap-2"
            >
              Check Eligibility for Your Business{" "}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-14 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide">
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mb-3">
                Frequently Asked{" "}
                <span className="text-[#F97316]">Questions</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Everything you need to know about ISO Certification in India.
                Can't find your answer?{" "}
                <button
                  onClick={onOpenModal}
                  className="text-[#F97316] underline font-medium"
                >
                  Talk to our experts.
                </button>
              </p>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFAQ === i}
                  onToggle={() => toggleFAQ(i)}
                />
              ))}
            </div>

            {/* Schema.org FAQ JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.a,
                    },
                  })),
                }),
              }}
            />
          </div>
        </section>

        {/* ─── ENQUIRY MODAL ─── */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default ISOCertificationPage;
