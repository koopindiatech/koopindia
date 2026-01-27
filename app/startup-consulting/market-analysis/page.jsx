"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const MarketAnalysisPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Market Analysis & Research Services in India | Koop India
        </title>
        <meta
          name="description"
          content="Koop India provides data-driven market analysis services to identify growth opportunities, customer insights, competitor trends & expansion feasibility."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/market-analysis-services"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Market Analysis Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Market Analysis services help brands make informed
              decisions by providing actionable insights into industry trends,
              customer behavior, and competitive dynamics.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Market Research Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              Our structured research framework evaluates demand potential,
              pricing trends, customer segments, and regional opportunities.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We help businesses validate new product ideas, enter new markets,
              and build scalable expansion strategies based on real market data
              rather than assumptions.
            </p>
          </div>
        </section>

        {/* ================= WHAT WE COVER ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What Our <span className="text-[#F97316]">Market Analysis Covers</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              We conduct in-depth research to minimize risks and uncover
              profitable growth opportunities for your business.
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
                "Industry and sector analysis",
                "Target customer profiling",
                "Competitor benchmarking",
                "Pricing and demand trends",
                "Regional market opportunity mapping",
                "Market entry feasibility studies",
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
              Data-Driven Insights for <span className="text-[#F97316]">Confident Decisions</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our market analysis reports are designed to support strategic
              decision-making by providing clear insights, risk assessment, and
              actionable recommendations that guide long-term business growth.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Discover Your Market Potential
          </h2>

          <p className="text-gray-300 mb-8">
            📊 Get a detailed market analysis report from Koop India.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Request Market Analysis <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default MarketAnalysisPage;
