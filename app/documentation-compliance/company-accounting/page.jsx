"use client";
import React from "react";
import Head from "next/head";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const CompanyAccountingServicesPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
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
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Company Accounting Services in India
            </h1>
            <p className="text-gray-300 mb-4">
              Accurate • Compliant • Growth-Focused
            </p>
            <p className="text-gray-300 mb-6">
              Scope • Process • Compliance • Fees • Expert Support
            </p>
            <p className="max-w-3xl mx-auto text-gray-300 mb-2">
              Keep your finances accurate, compliant, and audit-ready with{" "}
              <b>Koop India</b>. We provide end-to-end company accounting services
              for startups, MSMEs, and growing businesses—so you can focus on
              scaling while our experts handle the numbers.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Outsource Your Company Accounting <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS ACCOUNTING ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What Are <span className="text-[#F97316]">Company Accounting Services?</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Company accounting covers day-to-day bookkeeping, statutory
              compliance, tax coordination, and financial reporting. Proper
              accounting ensures:
            </p>

            {[
              "Clear visibility of profits & cash flow",
              "Timely statutory compliance (GST, TDS, IT)",
              "Investor-ready financials",
              "Strong controls for business growth",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ================= WHO NEEDS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Who Needs <span className="text-[#F97316]">Professional Accounting?</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {[
                "Startups & early-stage companies",
                "Pvt. Ltd., OPC, LLP & Partnership firms",
                "Manufacturers, traders & service providers",
                "eCommerce & D2C brands",
                "Businesses seeking funding, audits, or scale",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Our <span className="text-[#F97316]">Accounting Services</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">

              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h3 className="font-semibold mb-3">📘 Bookkeeping & Day-to-Day Accounting</h3>
                {[
                  "Sales & purchase entries",
                  "Expense & bank reconciliation",
                  "Cash & ledger management",
                  "Accounting on Tally / Zoho / Busy / Excel",
                ].map((s, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {s}
                  </p>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h3 className="font-semibold mb-3">📊 Financial Statements & MIS</h3>
                {[
                  "Monthly / quarterly P&L, Balance Sheet",
                  "Cash flow statements",
                  "Management Information System (MIS) reports",
                ].map((s, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {s}
                  </p>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h3 className="font-semibold mb-3">🧾 GST Accounting & Coordination</h3>
                {[
                  "GST-ready books",
                  "Data preparation for GSTR-1 & GSTR-3B",
                  "ITC reconciliation & compliance support",
                ].map((s, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {s}
                  </p>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h3 className="font-semibold mb-3">💼 Payroll & TDS Accounting</h3>
                {[
                  "Salary processing",
                  "TDS calculation & challans",
                  "Form 24Q / 26Q support",
                ].map((s, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {s}
                  </p>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border md:col-span-2">
                <h3 className="font-semibold mb-3">📑 Statutory & ROC Support</h3>
                {[
                  "Audit coordination",
                  "ROC-ready financials",
                  "Year-end closing support",
                ].map((s, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {s}
                  </p>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Accounting <span className="text-[#F97316]">Process</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Free Consultation & Scope Finalization",
                "Accounting System Setup / Review",
                "Regular Data Sharing (Monthly/Weekly)",
                "Bookkeeping & Reconciliation",
                "Reports, Reviews & Compliance Support",
                "Year-End Closure & Audit Assistance",
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
                  <div className="text-[#F97316] font-bold mb-2">
                    Step {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 flex justify-center gap-2">
              <Clock className="w-4 h-4 text-[#F97316]" />
              Delivery: Monthly, quarterly, or customized schedules
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Compliance & <span className="text-[#F97316]">Best Practices</span>
            </h2>

            {[
              "Accurate classification of income & expenses",
              "Timely reconciliations (Bank, GST, TDS)",
              "Audit-ready books",
              "Data confidentiality & controls",
              "Advisory for cost optimization",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Company Accounting <span className="text-[#F97316]">Fees</span>
            </h2>

            <div className="bg-white p-6 rounded-2xl border text-sm">
              <p>Monthly Accounting: Starting at ₹ 1,999* / month</p>
              <p className="mt-2 font-semibold">Pricing depends on:</p>
              <p>• Business size & transaction volume</p>
              <p>• Compliance requirements</p>
              <p>• Reporting frequency</p>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ✔ No hidden charges <br />
              ✔ Scalable plans as your business grows
            </p>

            <button
              onClick={onOpenModal}
              className="mt-6 bg-[#F97316] px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600"
            >
              Get a Custom Quote
            </button>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Choose <span className="text-[#F97316]">Koop India</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Experienced accountants & compliance experts",
                "Startup & MSME-friendly approach",
                "Dedicated account manager",
                "Accurate, timely & compliant reporting",
                "Support beyond bookkeeping—advisory included",
              ].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
              We don’t just maintain books—we help founders make better financial decisions.
            </p>
          </div>
        </section>

        {/* ================= ADD ONS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Optional <span className="text-[#F97316]">Add-On Services</span>
            </h2>

            {[
              "GST Returns Filing",
              "Income Tax Returns",
              "ROC Compliance",
              "Virtual CFO Services",
              "Budgeting & Forecasting",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-16 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get Started with Professional Accounting
          </h2>
          <p className="text-gray-300 mb-6">
            Stop worrying about errors, deadlines, and compliance.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Free Accounting Consultation <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default CompanyAccountingServicesPage;
