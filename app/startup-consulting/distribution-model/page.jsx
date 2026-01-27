"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const DistributionModulePage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Distribution Strategy & Channel Development Services | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers structured distribution modules to help brands build, manage & scale distributor and dealer networks across India."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/distribution-module"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Distribution Module
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Distribution Module is a structured framework that
              helps brands build and scale their distributor, dealer, and
              channel partner network efficiently.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Speak to a Distribution Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We design customized distribution strategies based on your product
              category, pricing, geography, and business goals.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our module ensures smooth onboarding of distributors, clearly
              defined commercial terms, and scalable operational workflows that
              support long-term growth.
            </p>
          </div>
        </section>

        {/* ================= STRATEGY FRAMEWORK ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Our <span className="text-[#F97316]">Distribution Strategy Framework</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              We help brands expand faster while reducing channel conflict,
              improving distributor motivation, and eliminating operational
              inefficiencies across the supply chain.
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
                "Distribution strategy and channel design",
                "Distributor profiling and onboarding process",
                "Territory mapping and allocation",
                "Commercial terms and policy formulation",
                "Channel conflict management",
                "Distributor performance tracking",
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
              Distribution Built for <span className="text-[#F97316]">Scale & Control</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our distribution modules are designed to balance aggressive
              expansion with structured controls—so brands can grow across
              regions without losing visibility, pricing discipline, or channel
              harmony.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Build a Scalable Distribution Network
          </h2>

          <p className="text-gray-300 mb-8">
            📍 Launch your distribution strategy with Koop India.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start Distribution Planning <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default DistributionModulePage;
