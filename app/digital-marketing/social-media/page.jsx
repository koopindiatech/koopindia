"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const SocialMediaMarketingPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Social Media Marketing Services for Startups & Brands | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers result-driven social media marketing services to build brand visibility, engagement & lead generation on Facebook, Instagram & LinkedIn."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/social-media-marketing"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Social Media Marketing Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Social Media Marketing services help startups, MSMEs,
              and growing brands build a strong digital presence, engage their
              audience, and generate high-quality business leads.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Social Media Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We create data-driven social media strategies that combine content
              creation, community management, and paid advertising.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our focus is on increasing brand visibility, building trust, and
              converting followers into customers across platforms like
              Facebook, Instagram, LinkedIn, and YouTube.
            </p>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why Choose <span className="text-[#F97316]">Koop India</span> for Social Media Marketing?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our social media framework is designed to deliver measurable
              growth and consistent engagement. We align content strategy with
              your business goals and target audience.
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
                "Social media strategy and content planning",
                "Profile setup and optimization",
                "Monthly content calendar",
                "Post creatives and captions",
                "Community management and engagement",
                "Lead generation campaigns",
                "Paid ad management (Meta & LinkedIn Ads)",
                "Performance tracking and monthly reporting",
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
              Social Media Strategies Built for <span className="text-[#F97316]">Growth & Conversions</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our approach goes beyond posting content. We design social media
              systems that consistently engage audiences, generate inquiries,
              and support your sales pipeline.
            </p>
          </div>
        </section>

        {/* ================= PLATFORMS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Platforms We <span className="text-[#F97316]">Work On</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Grow Your Brand on Social Media
          </h2>

          <p className="text-gray-300 mb-8">
            📲 Start your social media growth journey with Koop India today.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start Social Media Marketing <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default SocialMediaMarketingPage;
