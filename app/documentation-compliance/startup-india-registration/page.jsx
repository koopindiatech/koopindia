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

const StartupIndiaRegistrationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Startup India Registration | DPIIT Recognition & Tax Benefits | Koop India
        </title>
        <meta
          name="description"
          content="Get Startup India (DPIIT) Registration with Koop India. Unlock tax exemptions, government benefits & funding support. 100% online, expert-handled & fast approval."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/startup-india-registration"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Startup India Registration
            </h1>
            <p className="text-gray-300 mb-4">
              DPIIT Recognition • Tax Benefits • Government Support
            </p>
            <p className="text-gray-300 mb-6">
              Documents • Procedure • Compliance • Fees • Expert Support
            </p>
            <p className="max-w-3xl mx-auto text-gray-300 mb-2">
              Get officially recognized as a startup and unlock government
              benefits, funding support, and tax exemptions with{" "}
              <b>Koop India</b>. We provide end-to-end Startup India (DPIIT)
              Registration—from eligibility check to final recognition—100%
              online and expert-handled.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Apply for Startup India Registration <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS STARTUP INDIA ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What is <span className="text-[#F97316]">Startup India Registration?</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Startup India Registration is a recognition granted by DPIIT
              (Department for Promotion of Industry and Internal Trade) under the
              Government of India. It helps eligible startups access tax
              benefits, funding opportunities, easier compliance, and
              government tenders.
            </p>
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Benefits of <span className="text-[#F97316]">Startup India Registration</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {[
                "Income tax exemption for up to 3 consecutive years",
                "Exemption from Angel Tax (Section 56)",
                "Easy access to government tenders",
                "Faster IP (Trademark/Patent) registration at subsidized cost",
                "Self-certification under labour & environmental laws",
                "Improved credibility with investors & banks",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ELIGIBILITY ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Who is Eligible for <span className="text-[#F97316]">Startup India Registration?</span>
            </h2>

            <p className="font-semibold mb-3">Your business must:</p>

            {[
              "Be incorporated as Pvt. Ltd., LLP, or Partnership",
              "Be less than 10 years old",
              "Have annual turnover ≤ ₹100 crore",
              "Work on innovation, development, or improvement of products/services",
              "Not be formed by splitting an existing business",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}

            <button
              onClick={onOpenModal}
              className="mt-6 bg-[#141D32] text-white px-6 py-3 rounded-lg hover:bg-black"
            >
              Free Eligibility Check
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
                <h4 className="font-semibold mb-3">Mandatory Documents</h4>
                {[
                  "Certificate of Incorporation / Registration",
                  "PAN Card of entity",
                  "Director / Partner details",
                  "Brief write-up on business innovation",
                  "Website or pitch deck (if available)",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">
                  Supporting Documents (Any One)
                </h4>
                {[
                  "Patent filing / trademark (optional)",
                  "Funding details (if any)",
                  "Recommendation / recognition (if available)",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-sm text-green-600 mt-4">
              📌 Koop India helps draft the innovation & business description professionally.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Startup India Registration <span className="text-[#F97316]">Procedure</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Free Consultation & Eligibility Check",
                "Document Collection & Review",
                "Startup India Profile Creation",
                "DPIIT Application Submission",
                "Clarification Handling (if required)",
                "Startup India (DPIIT) Recognition Certificate Issued",
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
              Recognition usually received within 7–15 working days
            </div>
          </div>
        </section>

        {/* ================= POST REG SUPPORT ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Post-Registration <span className="text-[#F97316]">Compliance & Support</span>
            </h2>

            {[
              "Annual self-declaration",
              "Updating business details (if required)",
              "Assistance in tax exemption application",
              "Support for government tenders & schemes",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}

            <p className="mt-3 text-sm text-gray-600">
              👉 Koop India ensures you fully utilize Startup India benefits, not just get registered.
            </p>
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Startup India Registration <span className="text-[#F97316]">Fees</span>
            </h2>

            <p className="mb-4">
              💰 <b>Transparent & Startup-Friendly Pricing</b>
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border text-sm">
              <p>Startup India Registration: Starting at ₹ 4,999*</p>
              <p className="mt-2">
                Consultation + documentation + filing included
              </p>
              <p>No hidden charges</p>
            </div>

            <button
              onClick={onOpenModal}
              className="mt-6 bg-[#F97316] px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600"
            >
              Get Exact Pricing
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
                "Startup-focused consultants",
                "High approval success rate",
                "Proper innovation & eligibility presentation",
                "End-to-end online process",
                "Post-recognition guidance",
              ].map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-16 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Register Under Startup India Today
          </h2>
          <p className="text-gray-300 mb-6">
            If you’re building something innovative and scalable, don’t miss out on government benefits.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Apply for Startup India Registration Now <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default StartupIndiaRegistrationPage;
