"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const GMBServicesPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Google My Business Optimization Services | Koop India
        </title>
        <meta
          name="description"
          content="Koop India provides Google My Business optimization services to improve local SEO rankings, visibility on Google Maps & customer inquiries."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/google-my-business-services"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Google My Business Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Google My Business services help businesses improve
              their local search visibility and attract nearby customers through
              Google Search and Google Maps.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Local SEO Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We optimize and manage your GMB profile to ensure accurate
              business information, improved local SEO rankings, and increased
              calls, visits, and customer inquiries.
            </p>

            <p className="text-gray-600 leading-relaxed">
              A strong Google My Business presence helps local customers find,
              trust, and contact your business easily.
            </p>
          </div>
        </section>

        {/* ================= WHY GMB ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why <span className="text-[#F97316]">GMB Optimization</span> Matters
            </h2>

            <p className="text-gray-600 leading-relaxed">
              A well-optimized Google My Business profile increases your chances
              of appearing in local search results and Google Maps listings. It
              also builds online credibility through customer reviews, regular
              updates, and accurate business information.
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
                "GMB profile creation and verification",
                "Business information optimization",
                "Category and keyword optimization",
                "Image and video uploads",
                "Weekly posts and updates",
                "Review generation and management",
                "Insights tracking and reporting",
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
              Local Visibility That <span className="text-[#F97316]">Drives Footfall & Leads</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our GMB optimization strategy is designed to improve map rankings,
              increase phone calls, drive store visits, and convert local
              searches into real business opportunities.
            </p>
          </div>
        </section>

        {/* ================= WHO SHOULD USE ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Who Should Use <span className="text-[#F97316]">GMB Services</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                "Local service providers",
                "Retail stores & showrooms",
                "Restaurants & cafes",
                "Clinics & professional services",
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
            Boost Your Local Search Visibility
          </h2>

          <p className="text-gray-300 mb-8">
            📍 Optimize your Google My Business profile with Koop India.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start GMB Optimization <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default GMBServicesPage;
