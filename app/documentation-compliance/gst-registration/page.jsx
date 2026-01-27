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

const GSTRegistrationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          GST Registration in India | Documents, Fees & Procedure | Koop India
        </title>
        <meta
          name="description"
          content="Apply for GST Registration in India with Koop India. Get expert help with documents, filing, GSTIN issuance & compliance. Fast, affordable & 100% online."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/gst-registration"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              GST Registration: Required Documents, Procedure, Fees & Expert Support
            </h1>
            <p className="max-w-4xl mx-auto text-gray-300 mb-8">
              At <b>Koop India</b>, we make GST Registration simple, fast, and
              compliant—so you can focus on growing your business while our
              experts handle the paperwork, filings, and follow-ups.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a GST Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS GST ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What is <span className="text-[#F97316]">GST Registration?</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              GST (Goods and Services Tax) Registration is mandatory for
              businesses engaged in the supply of goods or services in India
              once they cross the prescribed turnover threshold—or if they fall
              under specific compulsory categories. A valid GSTIN allows you to:
            </p>

            {[
              "Collect GST from customers",
              "Claim Input Tax Credit (ITC)",
              "Sell across India legally",
              "List your brand on eCommerce marketplaces",
              "Build trust with distributors, dealers, and corporate buyers",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ================= WHO NEEDS GST ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Who Needs <span className="text-[#F97316]">GST Registration?</span>
            </h2>

            <p className="mb-4 font-semibold">
              GST registration is mandatory for:
            </p>

            {[
              "Businesses above threshold (₹40L goods / ₹20L services; lower for special states)",
              "Inter-state sellers and exporters/importers",
              "eCommerce sellers (Amazon, Flipkart, Meesho, etc.)",
              "Casual taxable persons & non-resident taxable persons",
              "Agents, distributors, and input service distributors",
              "Businesses liable under Reverse Charge Mechanism (RCM)",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ================= TYPES ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Types of <span className="text-[#F97316]">GST Registration</span> We Handle
            </h2>

            {[
              "Regular GST Registration",
              "Composition Scheme Registration",
              "Casual Taxable Person Registration",
              "Non-Resident Taxable Person Registration",
              "Voluntary GST Registration",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}

            <p className="mt-4 text-gray-600">
              Our experts assess your business model and recommend the right
              category to avoid future compliance issues.
            </p>
          </div>
        </section>

        {/* ================= DOCUMENTS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] text-center mb-8">
              Documents <span className="text-[#F97316]">Required</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">
                  Proprietorship / Individual
                </h4>
                {[
                  "PAN Card of proprietor",
                  "Aadhaar Card",
                  "Passport-size photograph",
                  "Business address proof",
                  "Bank account details",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">
                  Partnership / LLP / Company
                </h4>
                {[
                  "PAN of entity",
                  "Certificate of Incorporation / Partnership Deed",
                  "MOA & AOA (for companies)",
                  "PAN & Aadhaar of partners/directors",
                  "Authorized signatory details",
                  "Business address proof",
                  "Bank account proof",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-sm text-green-600 mt-4">
              📌 Don’t worry—our team verifies documents before submission to minimize rejections.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              GST Registration <span className="text-[#F97316]">Procedure</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Consultation & Eligibility Check",
                "Document Collection & Verification",
                "Online Application Filing (GST REG-01)",
                "OTP & Aadhaar Authentication",
                "Department Review & Query Handling",
                "GSTIN Issuance",
              ].map((step, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <div className="text-[#F97316] font-bold mb-2">
                    Step {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 flex justify-center gap-2">
              <Clock className="w-4 h-4 text-[#F97316]" />
              Timeline: Usually 7–10 working days
            </div>
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              GST Registration <span className="text-[#F97316]">Fees</span>
            </h2>

            <div className="bg-white p-6 rounded-2xl border text-sm">
              <p>GST Registration: Starting at ₹ 2,999*</p>
              <p>Consultation + Documentation + Filing: Included</p>
              <p>Query Handling & Follow-ups: Included</p>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              📌 Final fees may vary based on business structure and registration type.
            </p>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Choose <span className="text-[#F97316]">Koop India</span> for GST Registration?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Dedicated GST experts",
                "Error-free documentation",
                "End-to-end support till GSTIN is issued",
                "Future GST returns & compliance assistance",
                "Startup-friendly & MSME-focused approach",
              ].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
              We don’t just register your GST—we help you stay compliant and scalable.
            </p>
          </div>
        </section>

        {/* ================= POST SUPPORT ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Post-Registration <span className="text-[#F97316]">Support</span>
            </h2>

            {[
              "Monthly / Quarterly GST Returns",
              "GSTR-1, GSTR-3B & Annual Return",
              "GST Notices & Compliance Support",
              "eInvoice & eWay Bill Setup",
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
            Get Started Today
          </h2>
          <p className="text-gray-300 mb-6">
            Koop India ensures a smooth GST registration experience for startups,
            manufacturers, traders, service providers & eCommerce sellers.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Talk to a GST Expert Today <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default GSTRegistrationPage;
