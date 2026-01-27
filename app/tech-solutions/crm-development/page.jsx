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

const CRMDevelopmentPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          CRM Development Services in India | Custom CRM Solutions | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers custom CRM development services to manage leads, sales pipelines, customer data & automation for startups, brands & growing businesses."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/crm-development"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              CRM Development
            </h1>
            <p className="text-gray-300 mb-4">
              Custom CRM Solutions to Manage Leads, Sales & Growth
            </p>
            <p className="max-w-4xl mx-auto text-gray-300 mb-8">
              <b>Koop India</b> develops customized CRM systems that help
              startups, brands, and sales teams manage leads, track follow-ups,
              and streamline business operations.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Get a Free CRM Consultation <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              CRM Systems Built for <span className="text-[#F97316]">Sales Efficiency</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              A CRM (Customer Relationship Management) system is the backbone of
              any sales-driven business. It helps organize leads, manage
              customer interactions, track follow-ups, and measure sales
              performance.
            </p>

            <p className="text-gray-600 leading-relaxed">
              At Koop India, we build CRM platforms that are simple to use,
              powerful in functionality, and aligned with your sales and
              business workflows.
            </p>
          </div>
        </section>

        {/* ================= CRM SOLUTIONS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Our <span className="text-[#F97316]">CRM Solutions Include</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              {[
                "Lead management system",
                "Sales pipeline tracking",
                "Customer database management",
                "Automated follow-ups",
                "Task & reminder management",
                "Team performance tracking",
                "Email & WhatsApp integration",
                "Analytics & reporting dashboard",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10 text-center">
              Key <span className="text-[#F97316]">Benefits</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Improved lead conversion rates",
                "Organized sales workflow",
                "Better customer engagement",
                "Reduced manual effort",
                "Real-time business insights",
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-2xl border flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  {benefit}
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-600 text-center">
              Our CRM tools are built for scalability—whether you have <b>1 sales
              executive or 50</b>.
            </p>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-10">
              CRM <span className="text-[#F97316]">Development Process</span>
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Business & Sales Process Understanding",
                "CRM Feature & Workflow Design",
                "Custom CRM Development",
                "Integration with Email, WhatsApp & Tools",
                "Testing & User Training",
                "Go-Live & Ongoing Support",
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
              Timelines depend on CRM complexity & integrations
            </div>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-8">
              Why Choose <span className="text-[#F97316]">Koop India</span> for CRM Development?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              {[
                "Fully customized CRM solutions",
                "Sales & business-oriented workflows",
                "Easy-to-use interface",
                "Scalable for growing teams",
                "Post-launch support & enhancements",
              ].map((p, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                  <ShieldCheck className="w-6 h-6 text-[#F97316] mb-2 mx-auto" />
                  {p}
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
              We don’t just build CRM software—we help businesses close more
              deals and manage growth efficiently.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Build Your Custom CRM with Koop India
          </h2>
          <p className="text-gray-300 mb-8">
            Take control of your leads, sales pipeline, and customer data.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Start CRM Development <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default CRMDevelopmentPage;
