"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const ProductMarginValuationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Product Pricing & Margin Valuation Services | Koop India
        </title>
        <meta
          name="description"
          content="Koop India helps brands with product pricing, cost analysis, distributor margins, profitability forecasting & ROI optimization."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/product-margin-valuation"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Product & Margin Valuation Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Product & Margin Valuation services are designed to
              help brands achieve sustainable profitability while remaining
              competitive in the market.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Pricing Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We analyze your product costing, manufacturing expenses,
              logistics, distributor margins, retailer margins, and promotional
              costs to design a balanced and profitable pricing model.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our pricing frameworks ensure your products are competitively
              priced while delivering healthy margins across the entire supply
              chain.
            </p>
          </div>
        </section>

        {/* ================= WHY VALUATION MATTERS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why Product & Margin <span className="text-[#F97316]">Valuation Matters</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Incorrect pricing can reduce profitability and distributor
              interest. Without a structured margin strategy, businesses often
              struggle with channel conflicts, low repeat orders, and cash flow
              issues.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our valuation framework ensures your pricing structure attracts
              channel partners while maintaining strong margins and long-term
              business sustainability.
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
                "Product cost structure analysis",
                "Optimal pricing strategy formulation",
                "Distributor and retailer margin planning",
                "Profitability forecasting",
                "Break-even analysis",
                "ROI modeling and cost optimization",
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
              Pricing Strategies Built for <span className="text-[#F97316]">Growth & Scalability</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our pricing and margin models are designed not only to improve
              current profitability but also to support expansion into new
              regions, channels, and product lines without eroding margins.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Optimize Your Product Pricing & Profits
          </h2>

          <p className="text-gray-300 mb-8">
            💰 Schedule a pricing strategy session with Koop India.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Book Pricing Consultation <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default ProductMarginValuationPage;
