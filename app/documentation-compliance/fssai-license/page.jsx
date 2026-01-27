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

const FSSAILicensePage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          FSSAI License Registration in India | Basic, State & Central | Koop India
        </title>
        <meta
          name="description"
          content="Apply for FSSAI License Registration in India with Koop India. Get Basic, State or Central FSSAI License online with expert support, transparent fees & fast approval."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/fssai-license"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              FSSAI License Registration in India
            </h1>
            <p className="text-gray-300 mb-4">
              Basic Registration • State License • Central License
            </p>
            <p className="text-gray-300 mb-6">
              Documents • Procedure • Compliance • Fees • Expert Support
            </p>
            <p className="max-w-3xl mx-auto text-gray-300 ">
              Ensure your food business is 100% legal, safe, and trusted with{" "}
              <b>Koop India</b>. We provide end-to-end FSSAI registration &
              licensing—from choosing the right license to post-approval
              compliance—completely online and expert-handled.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Apply for FSSAI License <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS FSSAI ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What is an <span className="text-[#F97316]">FSSAI License?</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              The FSSAI (Food Safety and Standards Authority of India) License is
              mandatory for any Food Business Operator (FBO) involved in
              manufacturing, processing, packaging, storage, distribution, or
              sale of food products in India.
            </p>

            <p className="font-semibold mb-3">
              Holding a valid FSSAI license helps you:
            </p>

            {[
              "Operate legally across India",
              "Build consumer trust & brand credibility",
              "Sell on eCommerce & modern trade platforms",
              "Appoint distributors, dealers & franchises",
              "Avoid penalties and business disruption",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ================= TYPES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Types of <span className="text-[#F97316]">FSSAI Licenses</span> We Offer
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-sm">

              {/* BASIC */}
              <div className="bg-white p-6 rounded-2xl border">
                <h3 className="font-semibold mb-2">FSSAI Basic Registration</h3>
                <p><b>Best for:</b> Small food businesses & startups</p>
                <p><b>Turnover:</b> Up to ₹12 lakh annually</p>
                <p className="mt-2 font-semibold">Examples</p>
                {[
                  "Home-based food businesses",
                  "Small retailers & petty food manufacturers",
                  "Food stalls, hawkers, small caterers",
                ].map((e, i) => (
                  <p key={i} className="flex gap-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {e}
                  </p>
                ))}
              </div>

              {/* STATE */}
              <div className="bg-white p-6 rounded-2xl border">
                <h3 className="font-semibold mb-2">FSSAI State License</h3>
                <p><b>Best for:</b> Businesses operating within one state</p>
                <p><b>Turnover:</b> ₹12 lakh to ₹20 crore</p>
                <p className="mt-2 font-semibold">Examples</p>
                {[
                  "Medium manufacturers & processors",
                  "Restaurants, hotels, cloud kitchens",
                  "Distributors & marketers in one state",
                ].map((e, i) => (
                  <p key={i} className="flex gap-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {e}
                  </p>
                ))}
              </div>

              {/* CENTRAL */}
              <div className="bg-white p-6 rounded-2xl border">
                <h3 className="font-semibold mb-2">FSSAI Central License</h3>
                <p><b>Best for:</b> Large & multi-state businesses</p>
                <p><b>Turnover:</b> Above ₹20 crore / mandatory categories</p>
                <p className="mt-2 font-semibold">Examples</p>
                {[
                  "Large manufacturers",
                  "Importers & exporters",
                  "eCommerce food sellers",
                  "Multi-state operations",
                ].map((e, i) => (
                  <p key={i} className="flex gap-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {e}
                  </p>
                ))}
              </div>

            </div>

            <div className="text-center mt-8">
              <button
                onClick={onOpenModal}
                className="bg-[#141D32] text-white px-6 py-3 rounded-lg hover:bg-black"
              >
                Free Eligibility Check
              </button>
            </div>
          </div>
        </section>

        {/* ================= DOCUMENTS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] text-center mb-8">
              Documents <span className="text-[#F97316]">Required</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">Common Documents</h4>
                {[
                  "PAN Card of applicant / entity",
                  "Aadhaar Card",
                  "Passport-size photograph",
                  "Email ID & mobile number",
                  "Business address proof",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">
                  Additional Documents (Based on License)
                </h4>
                {[
                  "Certificate of Incorporation / Partnership Deed",
                  "Food safety management plan (FSMS)",
                  "List of food products",
                  "Water test report (for manufacturers)",
                  "Rent agreement / NOC (if rented)",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-sm text-green-600 mt-4">
              ✅ Koop India verifies & prepares documents to avoid rejection or delays.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              FSSAI Registration <span className="text-[#F97316]">Procedure</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Free Consultation & License Selection",
                "Document Collection & Verification",
                "Online Application Filing on FoSCoS Portal",
                "Department Review / Inspection (if applicable)",
                "Query Resolution by Our Experts",
                "FSSAI License Issued",
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
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
                Basic Registration: 3–7 working days
              </div>
              <div>
                State / Central License: 7–20 working days (subject to approval)
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              FSSAI <span className="text-[#F97316]">Compliance</span> Requirements
            </h2>

            {[
              "Display FSSAI license number on food packaging",
              "Follow food safety & hygiene standards",
              "Annual / periodic returns (as applicable)",
              "Timely license renewal",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}

            <p className="mt-3 text-sm text-gray-600">
              📌 Koop India provides ongoing compliance & renewal support so you stay worry-free.
            </p>
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              FSSAI License <span className="text-[#F97316]">Fees</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-xl border">
                Basic Registration: <b>Starting at ₹ 2,999*</b>
              </div>
              <div className="bg-white p-4 rounded-xl border">
                State License: <b>Starting at ₹ 4,999*</b>
              </div>
              <div className="bg-white p-4 rounded-xl border">
                Central License: <b>Starting at ₹ 7,999*</b>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ✔ Government fees + professional charges explained clearly <br />
              ✔ No hidden costs
            </p>

            <button
              onClick={onOpenModal}
              className="mt-6 bg-[#F97316] px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600"
            >
              Get Exact FSSAI Cost
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
                "Food compliance specialists",
                "Startup & MSME-friendly process",
                "Correct license selection (avoid penalties)",
                "End-to-end online handling",
                "Post-license compliance & renewal support",
              ].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= POST SUPPORT ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Post-License <span className="text-[#F97316]">Support</span>
            </h2>

            {[
              "FSSAI renewal",
              "Modification (address, products, turnover)",
              "Annual returns filing",
              "Inspection & notice handling",
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
            Get Your FSSAI License Today
          </h2>
          <p className="text-gray-300 mb-6">
            Whether you are a manufacturer, restaurant owner, food startup, or
            eCommerce seller, Koop India ensures a smooth, fast, and compliant
            FSSAI registration.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Apply for FSSAI License Now <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default FSSAILicensePage;
