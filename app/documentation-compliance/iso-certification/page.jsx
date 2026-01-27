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

const ISOCertificationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          ISO Certification in India | ISO 9001, 14001, 22000, 45001 | Koop India
        </title>
        <meta
          name="description"
          content="Get ISO Certification in India with Koop India. ISO 9001, ISO 14001, ISO 22000, ISO 45001 & more. Expert consultants, fast approval & 100% online process."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/iso-certification"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ISO Certification in India
            </h1>
            <p className="text-gray-300 mb-4">
              ISO 9001 • ISO 14001 • ISO 22000 • ISO 45001 & More
            </p>
            <p className="text-gray-300 mb-6">
              Documents • Procedure • Compliance • Fees • Expert Support
            </p>
            <p className="max-w-3xl mx-auto text-gray-300 ">
              Build trust, quality, and global credibility for your business
              with <b>Koop India</b>. We offer end-to-end ISO Certification
              services—from standard selection to final certificate—handled by
              experienced professionals, 100% online.
            </p>
            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Apply for ISO Certification <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS ISO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What is <span className="text-[#F97316]">ISO Certification?</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              ISO (International Organization for Standardization) Certification
              is an internationally recognized standard that proves your
              business follows quality, safety, efficiency, and compliance
              systems.
            </p>

            <p className="font-semibold mb-3">
              ISO certification helps businesses:
            </p>

            {[
              "Improve internal processes & quality",
              "Win government & corporate tenders",
              "Increase customer & distributor trust",
              "Expand nationally & internationally",
              "Strengthen brand credibility",
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
              Types of <span className="text-[#F97316]">ISO Certifications</span> We Offer
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">

              {[
                {
                  title: "ISO 9001: Quality Management System",
                  best: "All businesses",
                  desc: "Focuses on consistent quality, customer satisfaction & process control.",
                },
                {
                  title: "ISO 14001: Environmental Management System",
                  best: "Manufacturing & industrial units",
                  desc: "Ensures environmental responsibility & legal compliance.",
                },
                {
                  title: "ISO 22000: Food Safety Management System",
                  best: "Food manufacturers, processors & exporters",
                  desc: "Mandatory for many food tenders & exports.",
                },
                {
                  title: "ISO 45001: Occupational Health & Safety",
                  best: "Factories & high-risk industries",
                  desc: "Improves workplace safety & reduces accidents.",
                },
              ].map((iso, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
                  <h3 className="font-semibold mb-2">{iso.title}</h3>
                  <p><b>Best for:</b> {iso.best}</p>
                  <p className="mt-2">{iso.desc}</p>
                </div>
              ))}

              <div className="bg-white p-6 rounded-2xl border md:col-span-2">
                <h3 className="font-semibold mb-2">Other ISO Standards</h3>
                {[
                  "ISO 27001 – Information Security",
                  "ISO 50001 – Energy Management",
                  "ISO 13485 – Medical Devices",
                ].map((item, i) => (
                  <p key={i} className="flex gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {item}
                  </p>
                ))}
                <button
                  onClick={onOpenModal}
                  className="mt-4 bg-[#141D32] text-white px-6 py-3 rounded-lg hover:bg-black"
                >
                  Free ISO Consultation
                </button>
              </div>

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
                <h4 className="font-semibold mb-3">Basic Documents</h4>
                {[
                  "PAN Card of business",
                  "Aadhaar Card of authorized signatory",
                  "Business registration proof",
                  "Address proof of business",
                  "Scope of business activities",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border">
                <h4 className="font-semibold mb-3">Additional (If Applicable)</h4>
                {[
                  "Quality policy / process details",
                  "Product or service details",
                  "Previous certifications (if any)",
                ].map((d, i) => (
                  <p key={i} className="flex gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> {d}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-sm text-green-600 mt-4">
              📌 Koop India prepares documentation & formats as per ISO standards.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              ISO Certification <span className="text-[#F97316]">Procedure</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Free Consultation & ISO Selection",
                "Gap Analysis & Documentation Support",
                "Application Filing with Certification Body",
                "Audit / Verification (Online or Onsite)",
                "Non-Conformity Closure (if any)",
                "ISO Certificate Issued",
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
              Certification usually completed within 7–15 working days
            </div>
          </div>
        </section>

        {/* ================= COMPLIANCE ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              ISO Compliance & <span className="text-[#F97316]">Validity</span>
            </h2>

            {[
              "ISO certificate is valid for 3 years",
              "Annual surveillance audit required",
              "Continuous process & quality improvement recommended",
            ].map((item, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {item}
              </p>
            ))}

            <p className="mt-3 text-sm text-gray-600">
              👉 Koop India also supports renewal & surveillance audits.
            </p>
          </div>
        </section>

        {/* ================= FEES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              ISO Certification <span className="text-[#F97316]">Fees</span>
            </h2>

            <p className="mb-4">
              💰 <b>Affordable & Transparent Pricing</b>
            </p>

            <div className="bg-white p-6 rounded-2xl border text-sm">
              <p>ISO Certification: Starting at ₹ 2,999*</p>
              <p className="mt-2 font-semibold">Pricing depends on:</p>
              <p>• Type of ISO standard</p>
              <p>• Number of employees</p>
              <p>• Business size & scope</p>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ✔ Government-recognized certification bodies <br />
              ✔ No hidden charges
            </p>

            <button
              onClick={onOpenModal}
              className="mt-6 bg-[#F97316] px-6 py-3 rounded-lg text-white font-semibold hover:bg-orange-600"
            >
              Get Exact ISO Cost
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
                "Experienced ISO consultants",
                "Government & tender-compliant certification",
                "Fast approval & simple process",
                "Startup & MSME-friendly pricing",
                "Post-certification compliance support",
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
              Post-Certification <span className="text-[#F97316]">Support</span>
            </h2>

            {[
              "ISO renewal",
              "Surveillance audit support",
              "Documentation updates",
              "Tender & compliance guidance",
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
            Get ISO Certified Today
          </h2>
          <p className="text-gray-300 mb-6">
            Whether you’re a startup, manufacturer, exporter, food business, or
            service provider, ISO certification gives you a competitive edge.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Apply for ISO Certification Now <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default ISOCertificationPage;
