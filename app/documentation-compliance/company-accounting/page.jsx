"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  BookOpen,
  BarChart2,
  Receipt,
  Briefcase,
  FileText,
  ChevronRight,
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

/* ─────────────────────────── tiny helpers ─────────────────────────── */
const OrangeDot = () => (
  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 flex-shrink-0 mt-1.5" />
);

const Tag = ({ children }) => (
  <span className="inline-block bg-orange-500/10 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/20 mb-4">
    {children}
  </span>
);

const SectionHeading = ({ tag, title, accent }) => (
  <div className="mb-10">
    {tag && <Tag>{tag}</Tag>}
    <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] leading-snug">
      {title}{" "}
      {accent && <span className="text-orange-500">{accent}</span>}
    </h2>
  </div>
);

/* ─────────────────────────── service cards ─────────────────────────── */
const serviceCards = [
  {
    icon: <BookOpen className="w-5 h-5 text-orange-500" />,
    title: "Bookkeeping & Day-to-Day Accounting",
    emoji: "📘",
    items: [
      "Sales & purchase entries",
      "Expense & bank reconciliation",
      "Cash & ledger management",
      "Accounting on Tally / Zoho / Busy / Excel",
    ],
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-orange-500" />,
    title: "Financial Statements & MIS",
    emoji: "📊",
    items: [
      "Monthly / quarterly P&L, Balance Sheet",
      "Cash flow statements",
      "Management Information System (MIS) reports",
    ],
  },
  {
    icon: <Receipt className="w-5 h-5 text-orange-500" />,
    title: "GST Accounting & Coordination",
    emoji: "🧾",
    items: [
      "GST-ready books",
      "Data preparation for GSTR-1 & GSTR-3B",
      "ITC reconciliation & compliance support",
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5 text-orange-500" />,
    title: "Payroll & TDS Accounting",
    emoji: "💼",
    items: [
      "Salary processing",
      "TDS calculation & challans",
      "Form 24Q / 26Q support",
    ],
  },
  {
    icon: <FileText className="w-5 h-5 text-orange-500" />,
    title: "Statutory & ROC Support",
    emoji: "📑",
    items: [
      "Audit coordination",
      "ROC-ready financials",
      "Year-end closing support",
    ],
    wide: true,
  },
];

const processSteps = [
  "Free Consultation & Scope Finalization",
  "Accounting System Setup / Review",
  "Regular Data Sharing (Monthly/Weekly)",
  "Bookkeeping & Reconciliation",
  "Reports, Reviews & Compliance Support",
  "Year-End Closure & Audit Assistance",
];

const whyKoop = [
  "Experienced accountants & compliance experts",
  "Startup & MSME-friendly approach",
  "Dedicated account manager",
  "Accurate, timely & compliant reporting",
  "Support beyond bookkeeping—advisory included",
];

const addOns = [
  "GST Returns Filing",
  "Income Tax Returns",
  "ROC Compliance",
  "Virtual CFO Services",
  "Budgeting & Forecasting",
];

/* ─────────────────────────── page ─────────────────────────── */
const CompanyAccountingServicesPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <Head>
        <title>
          Company Accounting Services in India | Bookkeeping & Compliance | Koop India
        </title>
        <meta
          name="description"
          content="Outsource company accounting services in India with Koop India. Accurate bookkeeping, GST & TDS compliance, MIS reporting and audit-ready financials for startups & MSMEs."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/company-accounting-services"
        />
        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </Head>

     

      <div className="overflow-x-hidden">

        {/*  HERO  */}
        <section className="relative py-14 px-5 bg-gradient-to-br from-[#0A1020] via-[#0F172A] to-[#141D32] text-white overflow-hidden hero-grid">
          {/* decorative orange glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="fade-up inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Trusted by 500+ Startups & MSMEs Across India
            </div>

            <h1 className="fade-up delay-1 serif text-4xl md:text-5xl  font-normal mb-5 leading-tight">
              Company Accounting
              <br />
              <span className="text-orange-500">Services in India</span>
            </h1>

            <p className="fade-up delay-2 text-gray-400 text-sm tracking-widest uppercase mb-6">
              Accurate &nbsp;•&nbsp; Compliant &nbsp;•&nbsp; Growth-Focused
            </p>

            <p className="fade-up delay-3 max-w-2xl mx-auto text-gray-300 text-base leading-relaxed mb-8">
              Keep your finances accurate, compliant, and audit-ready with{" "}
              <span className="text-white font-semibold">Koop India</span>. End-to-end
              accounting for startups, MSMEs, and growing businesses—so you can focus on
              scaling while our experts handle the numbers.
            </p>

            <div className="fade-up delay-3 flex flex-wrap justify-center gap-3">
              <button
                onClick={onOpenModal}
                className="bg-orange-500 hover:bg-orange-600 cursor-pointer active:scale-95 transition-all px-7 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-lg shadow-orange-500/30"
              >
                Free Accounting Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenModal}
                className="border border-white/20 hover:border-orange-500/50 cursor-pointer hover:bg-white/5 transition-all px-7 py-3 rounded-xl font-semibold text-sm"
              >
                View Pricing
              </button>
            </div>

            {/* trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
              {["Tally Certified", "GST Compliant", "ISO Process Standards", "MSME Specialists"].map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500" /> {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT IS ACCOUNTING  */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                tag="Overview"
                title="What Are Company"
                accent="Accounting Services?"
              />
              <p className="text-gray-500 leading-relaxed mb-8 text-sm">
                Company accounting covers day-to-day bookkeeping, statutory compliance,
                tax coordination, and financial reporting. Proper accounting gives your
                business the foundation to grow confidently.
              </p>
              <div className="space-y-3">
                {[
                  "Clear visibility of profits & cash flow",
                  "Timely statutory compliance (GST, TDS, IT)",
                  "Investor-ready financials",
                  "Strong controls for business growth",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* stat card cluster */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "500+", label: "Businesses Served" },
                { num: "99%", label: "Compliance Rate" },
                { num: "₹1,999", label: "Starting / Month" },
                { num: "5+", label: "Years Experience" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="bg-gradient-to-br from-[#0F172A] to-[#1E2A45] text-white rounded-2xl p-6 card-hover"
                >
                  <div className="text-2xl font-bold text-orange-500 mb-1">{num}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  SERVICES  */}
        <section className="pb-14 px-5">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              tag="What We Do"
              title="Our"
              accent="Accounting Services"
            />
            <div className="grid md:grid-cols-2 gap-5">
              {serviceCards.map(({ emoji, title, items, wide }) => (
                <div
                  key={title}
                  className={`group bg-white border border-gray-100 rounded-2xl p-7 card-hover shadow-sm hover:border-orange-200 ${wide ? "md:col-span-2" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xl">{emoji}</span>
                    <h3 className="font-semibold text-[#141D32] text-sm">{title}</h3>
                  </div>
                  <div className={`grid ${wide ? "sm:grid-cols-3" : ""} gap-2`}>
                    {items.map((s) => (
                      <div key={s} className="flex items-start gap-2 text-sm text-gray-500">
                        <ChevronRight className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  PROCESS */}
        <section className="py-14 px-5 bg-gradient-to-br from-[#0A1020] to-[#141D32] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Tag>How It Works</Tag>
              <h2 className="serif text-3xl md:text-4xl font-normal">
                Our Accounting <span className="text-orange-500">Process</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-orange-500/30 transition-all"
                >
                  <div className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-300 leading-snug">{step}</div>
                  <div className="absolute bottom-5 right-5 text-white/5 text-5xl font-black select-none">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-xs text-gray-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                Delivery: Monthly, quarterly, or customized schedules
              </div>
            </div>
          </div>
        </section>

        {/* COMPLIANCE*/}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                tag="Standards"
                title="Compliance &"
                accent="Best Practices"
              />
              <div className="space-y-4">
                {[
                  { t: "Accurate Classification", d: "Income & expenses categorized precisely per accounting standards." },
                  { t: "Timely Reconciliations", d: "Bank, GST, and TDS reconciliations done on schedule." },
                  { t: "Audit-Ready Books", d: "Always prepared for statutory audits without last-minute scrambles." },
                  { t: "Data Confidentiality", d: "Strict controls and NDA-backed data handling protocols." },
                  { t: "Cost Optimization Advisory", d: "Insights to help you reduce unnecessary expenditure." },
                ].map(({ t, d }) => (
                  <div key={t} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-[#F8F9FC]">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-[#141D32]">{t}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* quote / highlight block */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E2A45] text-white rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="text-5xl text-orange-500 font-black mb-4">"</div>
                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  We don't just maintain books—we help founders make better
                  financial decisions.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">K</div>
                  <div>
                    <div className="text-sm font-semibold">Koop India Team</div>
                    <div className="text-xs text-gray-400">Accounting & Compliance Experts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  WHY KOOP  */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <SectionHeading
                tag="Why Us"
                title="Why Choose"
                accent="Koop India?"
              />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {whyKoop.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 card-hover shadow-sm hover:border-orange-200 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA  */}
        <section className="relative py-16 px-5 bg-gradient-to-br from-[#0A1020] via-[#0F172A] to-[#141D32] text-white overflow-hidden hero-grid">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[200px] bg-orange-500/8 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Get Started Today
            </p>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl font-normal mb-4 leading-tight">
              Professional Accounting,<br />
              <span className="text-orange-500">Zero Hassle</span>
            </h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed max-w-lg mx-auto">
              Stop worrying about errors, deadlines, and compliance. Let our experts
              handle your books while you grow your business.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={onOpenModal}
                className="bg-orange-500 hover:bg-orange-600 cursor-pointer active:scale-95 transition-all px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-xl shadow-orange-500/30"
              >
                Free Accounting Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Enquiry Modal */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default CompanyAccountingServicesPage;