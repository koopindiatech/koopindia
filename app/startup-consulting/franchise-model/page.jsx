"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const FranchiseModulePage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Franchise Development & Expansion Services in India | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers end-to-end franchise development services to help brands build, launch & scale profitable franchise models across India."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/franchise-module"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Franchise Module
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Franchise Module helps brands convert their business
              model into a scalable, profitable, and legally compliant franchise
              system.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Speak to a Franchise Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We design structured franchise strategies that allow businesses to
              expand rapidly without heavy capital investment while maintaining
              brand consistency, operational control, and profitability.
            </p>

            <p className="text-gray-600 leading-relaxed">
              From franchise model design to documentation, pricing, and rollout
              strategy—Koop India manages the entire franchise development
              lifecycle.
            </p>
          </div>
        </section>

        {/* ================= WHY FRANCHISING ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why <span className="text-[#F97316]">Franchising</span> Works for Growing Brands
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Franchising allows brands to scale faster using partner capital
              while leveraging local market knowledge and entrepreneurial
              commitment of franchise owners.
            </p>

            <p className="text-gray-600 leading-relaxed">
              With the right franchise structure, brands can achieve rapid
              geographic expansion while minimizing operational and financial
              risk.
            </p>
          </div>
        </section>

        {/* ================= KEY DELIVERABLES ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Key <span className="text-[#F97316]">Deliverables</span>
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Franchise business model design",
                "Franchise fee & royalty structure",
                "Unit economics & profitability analysis",
                "Franchise agreement framework",
                "Standard Operating Procedures (SOPs)",
                "Franchise rollout & expansion strategy",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-2xl border flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VALUE ADD ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Franchise Systems Built for <span className="text-[#F97316]">Scale & Control</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our franchise modules are designed to balance aggressive expansion
              with operational discipline—ensuring franchisees succeed while
              protecting brand value and margins.
            </p>
          </div>
        </section>

        {/* ================= WHO IS IT FOR ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Who Should Use the <span className="text-[#F97316]">Franchise Module</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Retail & consumer brands",
                "Food & beverage businesses",
                "Service-based businesses",
                "Education & training institutes",
                "Healthcare & wellness brands",
                "D2C brands looking for offline expansion",
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Build a Profitable Franchise Network
          </h2>

          <p className="text-gray-300 mb-8">
            🚀 Launch your franchise expansion strategy with Koop India.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start Franchise Planning <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default FranchiseModulePage;
