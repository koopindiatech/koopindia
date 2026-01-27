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

const TrademarkRegistrationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Trademark Registration in India | Online Trademark Filing | Koop India
        </title>
        <meta
          name="description"
          content="Protect your brand with trademark registration in India. Koop India provides end-to-end trademark services including search, filing, objection handling & certification. 100% online & expert-handled."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/trademark-registration"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Trademark Registration in India
            </h1>
            <p className="text-gray-300 mb-4">
              Protect Your Brand Name • Logo • Tagline
            </p>
            <p className="text-gray-300 mb-6">
              Documents • Procedure • Compliance • Fees • Expert Support
            </p>
            <p className="max-w-3xl mx-auto text-gray-300 mb-2">
              Secure your brand identity with <b>Koop India</b>. We provide
              end-to-end trademark registration services—from search and filing
              to objection handling and certification—so your brand stays
              legally protected.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Apply for Trademark Registration <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS TRADEMARK ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What Is a <span className="text-[#F97316]">Trademark?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A Trademark is a unique brand identifier such as a name, logo,
              symbol, tagline, or packaging style that distinguishes your
              products or services. Registering a trademark gives you exclusive
              legal rights and prevents others from misusing your brand.
            </p>
          </div>
        </section>

        {/* ================= IMPORTANCE ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Trademark Registration Is{" "}
              <span className="text-[#F97316]">Important</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {[
                "Exclusive rights over your brand name/logo",
                "Legal protection against infringement",
                "Builds trust and brand credibility",
                "Required for franchise & distributor expansion",
                "Creates a valuable intellectual property asset",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHAT CAN BE TRADEMARKED ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What Can Be <span className="text-[#F97316]">Trademarked?</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
              {[
                "Brand Name",
                "Logo",
                "Tagline / Slogan",
                "Product Packaging",
                "Brand Label",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={onOpenModal}
              className="bg-[#141D32] text-white px-6 py-3 rounded-lg hover:bg-black"
            >
              Free Trademark Consultation
            </button>
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
                  Individual / Proprietor
                </h4>
                {[
                  "PAN Card",
                  "Aadhaar Card",
                  "Brand name / logo",
                  "Signed authorization (TM-48)",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">
                  Company / LLP / Partnership
                </h4>
                {[
                  "Entity PAN",
                  "Certificate of Incorporation / Partnership Deed",
                  "Brand logo (if applicable)",
                  "Authorized signatory details",
                  "Signed TM-48",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-sm text-green-600 mt-4">
              📌 Our experts verify documents before filing to avoid rejection.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Trademark Registration{" "}
              <span className="text-[#F97316]">Procedure</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                "Trademark Search & Feasibility Check",
                "Class Selection (Goods / Services)",
                "Application Filing (TM-A)",
                "Acknowledgement & ™ Symbol Usage",
                "Examination by Trademark Office",
                "Objection / Hearing (if any)",
                "Publication in Trademark Journal",
                "Trademark Registration Certificate Issued",
              ].map((step, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <div className="text-[#F97316] font-bold mb-2">
                    Step {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 space-y-1">
              <div className="flex justify-center gap-2">
                <Clock className="w-4 h-4 text-[#F97316]" />
                Application filing: 1–2 working days
              </div>
              <div>Registration: 6–12 months (subject to objections)</div>
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Trademark Compliance &{" "}
              <span className="text-[#F97316]">Validity</span>
            </h2>

            {[
              "Valid for 10 years from filing date",
              "Renewable every 10 years",
              "Proper usage & monitoring required",
              "Legal action possible against infringement",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}

            <p className="mt-3 text-sm text-gray-600">
              👉 Koop India also assists in renewals, opposition &
              infringement cases.
            </p>
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Trademark Registration{" "}
              <span className="text-[#F97316]">Fees</span>
            </h2>

            <p className="mb-4">
              💰 <b>Transparent & Affordable Pricing</b>
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border text-sm">
              <p>Trademark Filing: Starting at ₹ ___</p>
              <p>Government fees + professional charges included</p>
              <p>Objection handling support available (if required)</p>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              📌 No hidden charges. Clear pricing.
            </p>

            <button
              onClick={onOpenModal}
              className="mt-6 bg-[#F97316] px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600"
            >
              Get Exact Trademark Cost
            </button>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Choose <span className="text-[#F97316]">Koop India</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Experienced trademark professionals",
                "End-to-end brand protection support",
                "Proper class & risk analysis",
                "Objection & hearing assistance",
                "Startup & MSME-friendly pricing",
              ].map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= POST SUPPORT ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Post-Registration <span className="text-[#F97316]">Support</span>
            </h2>

            {[
              "Trademark renewal",
              "Trademark opposition & rectification",
              "Infringement notice drafting",
              "Brand monitoring support",
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
            Register Your Trademark Today
          </h2>
          <p className="text-gray-300 mb-6">
            Don’t let someone else claim your brand.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Apply for Trademark Registration <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default TrademarkRegistrationPage;
