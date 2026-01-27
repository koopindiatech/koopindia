"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const ContentWritingPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Content Writing Services for Websites & SEO | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers SEO-friendly content writing services for websites, blogs, ads & social media to build authority & drive conversions."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/content-writing-services"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Content Writing Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Content Writing services help brands communicate
              effectively, build authority, and convert visitors into customers.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Content Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We create SEO-friendly, engaging, and conversion-optimized content
              tailored to your business goals.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our writing solutions strengthen your digital communication
              strategy, improve search visibility, and enhance online
              credibility across platforms.
            </p>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why Choose <span className="text-[#F97316]">Koop India</span> for Content Writing?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our content is crafted to improve search rankings, build trust,
              and drive customer action. Every piece of content is written with
              a clear objective—visibility, engagement, or conversion.
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
                "Website content writing",
                "SEO blog writing",
                "Product descriptions",
                "Ad copy and landing page content",
                "Social media captions",
                "Email marketing content",
                "Press releases and brand stories",
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
              Content That Builds <span className="text-[#F97316]">Authority & Conversions</span>
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Our content strategy focuses on clarity, SEO performance, and
              persuasive messaging—helping your brand educate, engage, and
              convert the right audience.
            </p>
          </div>
        </section>

        {/* ================= WHO IS IT FOR ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Who Should Use <span className="text-[#F97316]">Content Writing Services</span>?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                "Startups & new businesses",
                "MSMEs & growing brands",
                "E-commerce & D2C brands",
                "Service providers & consultants",
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
            Build Authority with Powerful Content
          </h2>

          <p className="text-gray-300 mb-8">
            ✍️ Start your content strategy with Koop India today.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start Content Writing <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default ContentWritingPage;
