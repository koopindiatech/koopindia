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

const WebsiteDevelopmentPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Website Development Services in India | Business & E-commerce Websites | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers professional website development services including business websites, eCommerce, landing pages & CRM-integrated websites for startups & MSMEs."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/website-development"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-15 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Website Development
            </h1>
            <p className="text-gray-300 mb-4">
              High-Performance Websites That Drive Business Growth
            </p>
            <p className="max-w-4xl mx-auto text-gray-300 mb-8">
              Your website is your digital storefront. <b>Koop India</b> builds
              professional, conversion-focused websites that reflect your brand
              identity and support your sales objectives.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Get a Free Website Consultation <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Websites Built for <span className="text-[#F97316]">Growth & Conversions</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              A website is more than just an online presence—it is a business
              tool. At Koop India, we design and develop websites that are
              visually appealing, technically strong, and strategically built
              to generate leads and sales.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our websites are optimized for performance, SEO, user experience,
              and scalability, ensuring they support your business today and as
              it grows.
            </p>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Our <span className="text-[#F97316]">Website Development Services</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {[
                "Business & brand websites",
                "E-commerce websites",
                "Landing pages for lead generation",
                "Startup & MSME websites",
                "Corporate websites",
                "Distributor inquiry portals",
                "CRM-integrated websites",
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

        {/* ================= FEATURES ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Key <span className="text-[#F97316]">Features</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Mobile-responsive design",
                "SEO-friendly structure",
                "Fast loading speed",
                "Secure hosting setup & SSL",
                "Lead capture forms",
                "WhatsApp & CRM integration",
                "User-friendly admin panel",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-2xl border flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY STRATEGY ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why Website <span className="text-[#F97316]">Strategy Matters</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              A good-looking website is not enough. Your website must guide
              visitors, communicate trust, and convert interest into inquiries
              or sales.
            </p>

            {[
              "Generate qualified leads",
              "Improve brand credibility",
              "Support digital marketing campaigns",
              "Enable sales & inquiry tracking",
              "Scale with your business growth",
            ].map((point, i) => (
              <p key={i} className="flex gap-3 mb-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#F97316]" />
                {point}
              </p>
            ))}
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              Our Development <span className="text-[#F97316]">Process</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Requirement & Business Understanding",
                "UI/UX Design & Wireframing",
                "Website Development & Content Integration",
                "SEO & Performance Optimization",
                "Testing, Security & Speed Checks",
                "Website Launch & Post-Launch Support",
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
              Timelines depend on project scope & complexity
            </div>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Choose <span className="text-[#F97316]">Koop India</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Business-oriented website strategy",
                "SEO & conversion-focused development",
                "Startup & MSME-friendly pricing",
                "Transparent process & timelines",
                "Post-launch technical & growth support",
              ].map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
              We don’t just design websites—we build growth tools that generate
              leads and support your sales pipeline.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Build Your Website with Koop India
          </h2>
          <p className="text-gray-300 mb-8">
            Turn your website into a powerful business asset.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start Your Website Project <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default WebsiteDevelopmentPage;
