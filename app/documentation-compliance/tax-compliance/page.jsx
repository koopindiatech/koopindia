"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const TaxComplianceServicesPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Tax & Compliance Services for Startups & MSMEs in India | Koop India
        </title>
        <meta
          name="description"
          content="Koop India offers professional tax & compliance services including GST, income tax, ROC filings, bookkeeping & regulatory compliance for startups and MSMEs."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/tax-and-compliance-services"
        />
      </Head>

      <div className="bg-white text-gray-700">

        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Tax & Compliance Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              Koop India’s Tax & Compliance Services are designed to help
              startups, MSMEs, and growing businesses stay legally compliant,
              tax-efficient, and financially organized.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Compliance Expert <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= WHAT IS TAX & COMPLIANCE ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              What is <span className="text-[#F97316]">Tax & Compliance?</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Tax & compliance refers to the complete framework of statutory
              filings, taxation, accounting, and regulatory obligations that a
              business must follow under Indian laws. This includes GST,
              income tax, TDS, ROC filings, payroll compliance, and maintenance
              of proper books of accounts.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Proper tax and compliance management ensures that businesses meet
              all legal requirements, avoid penalties, and maintain transparent
              financial records for stakeholders, investors, and authorities.
            </p>

            <p className="text-gray-600 leading-relaxed">
              At Koop India, we provide end-to-end support for statutory
              compliance, taxation, accounting, and regulatory filings so that
              business owners can focus on growth without worrying about legal
              or financial complexities.
            </p>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why Choose <span className="text-[#F97316]">Koop India</span> for Tax & Compliance?
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Managing taxes and compliance is critical for business
              sustainability and credibility. Our structured compliance
              framework helps businesses avoid penalties, reduce tax
              liabilities, and maintain transparent financial records.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We offer proactive compliance management, advisory support, and
              accurate documentation to ensure your business operates smoothly
              and remains legally secure.
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
                "Company registration and business incorporation",
                "GST registration, returns & compliance",
                "Income tax filing (individuals & businesses)",
                "TDS filing and compliance",
                "ROC filings and annual returns",
                "Accounting & bookkeeping services",
                "Payroll compliance",
                "Financial statement preparation",
                "Tax planning and advisory",
                "Regulatory compliance management",
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

        {/* ================= CTA ================= */}
        <section className="py-20 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Stay Compliant & Tax-Efficient
          </h2>

          <p className="text-gray-300 mb-8">
            📑 Simplify your tax and compliance requirements with Koop India today.
          </p>

          <button
            onClick={onOpenModal}
            className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
          >
            Get Expert Compliance Support <ArrowRight />
          </button>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default TaxComplianceServicesPage;
