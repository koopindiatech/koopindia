"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const LogoGraphicDesignPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Logo Design & Graphic Design Services | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers professional logo design & graphic design services to build strong brand identity & marketing creatives."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/logo-graphic-design"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Logo & Graphic Design Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Logo & Graphic Design services help brands create a
              strong visual identity that builds trust, recognition, and brand
              recall.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Design Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We design professional, modern, and scalable brand assets that
              reflect your business vision and market positioning.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our creative solutions enhance brand consistency across digital
              platforms, print media, packaging, and offline marketing
              touchpoints.
            </p>
          </div>
        </section>

        {/* ================= WHY BRANDING ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why <span className="text-[#F97316]">Visual Branding</span> Matters
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Strong visual identity improves brand credibility, customer
              trust, and marketing effectiveness. Consistent branding helps
              customers recognize your business instantly and builds long-term
              brand recall.
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
                "Logo design and brand identity creation",
                "Social media creatives",
                "Marketing collaterals (brochures, flyers, banners)",
                "Website graphics and UI elements",
                "Product packaging designs",
                "Ad creatives",
                "Brand guideline documentation",
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
              Design That Builds <span className="text-[#F97316]">Recognition & Trust</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our design approach focuses on clarity, consistency, and
              scalability—ensuring your brand looks professional across every
              platform and marketing channel.
            </p>
          </div>
        </section>

        {/* ================= WHO IS IT FOR ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Who Should Use <span className="text-[#F97316]">Our Design Services</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                "Startups & new brands",
                "Growing businesses & MSMEs",
                "E-commerce & D2C brands",
                "Manufacturers & service providers",
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
            Create a Powerful Brand Identity
          </h2>

          <p className="text-gray-300 mb-8">
            🎨 Get your logo and creatives designed by Koop India.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start Brand Design <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default LogoGraphicDesignPage;
