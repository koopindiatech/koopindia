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

const CompanyRegistrationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Company Registration in India | Pvt Ltd, OPC, LLP, Partnership | Koop India
        </title>
        <meta
          name="description"
          content="Register your company in India with Koop India. Expert CA & CS support for Private Limited, OPC, LLP & Partnership firm registration. 100% online process, transparent pricing & fast approval."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/company-registration"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Company Registration in India
            </h1>
            <p className="text-gray-300 mb-6">
              Pvt. Ltd. • OPC • LLP • Partnership <br />
              Documents • Procedure • Compliance • Fees • Expert Support
            </p>
            <p className="max-w-3xl mx-auto text-gray-300 mb-2">
              Start your business the right way with <b>Koop India</b>. We provide
              end-to-end company registration services—from choosing the right
              structure to post-registration compliance—100% online,
              transparent, and expert-handled.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Register Your Company <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= TYPES ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] text-center mb-10">
              Types of <span className="text-[#F97316]">Company Registration</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Private Limited Company (Pvt. Ltd.)",
                  best: "Startups, scalable businesses, investors",
                  benefits: "Limited liability, easy funding, strong credibility",
                  points: ["2 Directors", "2 Shareholders", "No minimum paid-up capital"],
                },
                {
                  title: "One Person Company (OPC)",
                  best: "Solo founders & professionals",
                  benefits: "Single ownership + corporate structure",
                  points: ["1 Director", "1 Nominee", "No minimum paid-up capital"],
                },
                {
                  title: "Limited Liability Partnership (LLP)",
                  best: "Professional services & SMEs",
                  benefits: "Limited liability with lower compliance",
                  points: ["2 Designated Partners", "No minimum capital requirement"],
                },
                {
                  title: "Partnership Firm",
                  best: "Small & traditional businesses",
                  benefits: "Easy setup, low cost, simple management",
                  points: ["2 or more partners", "Partnership deed"],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-[#0F172A]/10 rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-[#141D32] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm mb-1">
                    <b>Best for:</b> {item.best}
                  </p>
                  <p className="text-sm mb-3">
                    <b>Key benefits:</b> {item.benefits}
                  </p>
                  <ul className="space-y-1 text-sm">
                    {item.points.map((p, idx) => (
                      <li key={idx} className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-[#F97316]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DOCUMENTS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] text-center mb-8">
              Documents <span className="text-[#F97316]">Required</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-sm">

              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold text-[#141D32] mb-3">
                  Directors / Partners
                </h4>
                {["PAN Card", "Aadhaar Card", "Passport-size photograph", "Email & Mobile"].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold text-[#141D32] mb-3">
                  Registered Office
                </h4>
                {["Electricity Bill / Rent Agreement", "NOC from owner"].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border">
                <h4 className="font-semibold text-[#141D32] mb-3">
                  Entity Specific
                </h4>
                {["MOA & AOA (Pvt / OPC)", "LLP Agreement", "Partnership Deed"].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
                <p className="text-xs text-green-600 mt-2">
                  ✅ Drafted professionally by Koop India
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Registration <span className="text-[#F97316]">Procedure</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Free Consultation & Structure Selection",
                "Name Approval (RUN / SPICe+)",
                "DSC & DIN Generation",
                "MOA / AOA / LLP Agreement Drafting",
                "Incorporation Filing with MCA",
                "Certificate of Incorporation Issued",
              ].map((step, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <div className="text-[#F97316] font-bold mb-2">
                    Step {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#F97316]" />
              Timeline: 7–12 working days (subject to MCA approval)
            </div>
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Company Registration <span className="text-[#F97316]">Fees</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {["Private Limited", "OPC", "LLP", "Partnership Firm"].map((f, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border">
                  {f}: <b>Starting at ₹ 9,999*</b>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ✔ Government fees + professional charges explained clearly <br />
              ✔ No hidden costs
            </p>
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
                "Expert CA & CS support",
                "Startup & MSME focused",
                "End-to-end online process",
                "Error-free filings",
                "Post-registration compliance support",
              ].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
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
            Get Started Today
          </h2>
          <p className="text-gray-300 mb-6">
            Launch your business with confidence.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Free Expert Consultation <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default CompanyRegistrationPage;
