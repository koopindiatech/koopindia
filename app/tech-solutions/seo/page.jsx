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

const SEOServicesPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          SEO Services in India | Search Engine Optimization for Business Growth | Koop India
        </title>
        <meta
          name="description"
          content="Koop India provides result-driven SEO services to improve website visibility, organic traffic & high-intent leads. Website SEO, Local SEO & content optimization."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/seo-services"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              SEO Services
            </h1>
            <p className="text-gray-300 mb-4">
              Get Found. Get Leads. Get Growth.
            </p>
            <p className="max-w-4xl mx-auto text-gray-300 mb-8">
              <b>Koop India’s SEO services</b> are designed to increase your
              website visibility, organic traffic, and high-intent business
              leads—so your brand shows up when customers are searching.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Get a Free SEO Consultation <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              SEO That Drives <span className="text-[#F97316]">Real Business Results</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Search Engine Optimization (SEO) is not just about rankings—it’s
              about visibility, trust, and consistent lead generation. A
              well-executed SEO strategy helps your business attract customers
              who are actively searching for your products or services.
            </p>

            <p className="text-gray-600 leading-relaxed">
              At Koop India, we focus on ranking your business for keywords that
              actually convert into inquiries—not just vanity traffic.
            </p>
          </div>
        </section>

        {/* ================= SEO OFFERINGS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Our <span className="text-[#F97316]">SEO Offerings</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {[
                "Website SEO audit",
                "Keyword research",
                "On-page SEO",
                "Technical SEO",
                "Local SEO",
                "Content optimization",
                "Blog & article SEO",
                "Backlink building",
                "Google Business Profile optimization",
              ].map((service, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY SEO WORKS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Why Our <span className="text-[#F97316]">SEO Works</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Industry-focused keyword strategy",
                "Lead-driven optimization approach",
                "White-hat SEO practices",
                "Monthly performance reports",
                "Continuous improvement model",
              ].map((point, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-2xl border flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {point}
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-600 text-center">
              Our SEO strategies are designed for long-term growth, stable
              rankings, and consistent lead flow—not short-term spikes.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Our SEO <span className="text-[#F97316]">Process</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Website & Competitor Analysis",
                "Keyword Research & Strategy",
                "On-page & Technical Optimization",
                "Content & Local SEO Implementation",
                "Link Building & Authority Growth",
                "Tracking, Reporting & Optimization",
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
                  <div className="text-[#F97316] font-bold mb-2">
                    Step {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#F97316]" />
              SEO is a continuous process with monthly improvements
            </div>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Choose <span className="text-[#F97316]">Koop India</span> for SEO?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Business & lead-focused SEO strategy",
                "Transparent monthly reporting",
                "Ethical & Google-compliant methods",
                "Experience with startups & MSMEs",
                "SEO aligned with sales & growth goals",
              ].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
              We don’t chase rankings—we focus on traffic that converts into
              business.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Grow Your Business with SEO
          </h2>
          <p className="text-gray-300 mb-8">
            Let Koop India help you rank, convert, and scale organically.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start SEO with Koop India <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default SEOServicesPage;
