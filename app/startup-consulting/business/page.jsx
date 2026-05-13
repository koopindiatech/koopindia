"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const BusinessConsultingPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Business Consulting Services for Startups & MSMEs in India | Koop
          India
        </title>
        <meta
          name="description"
          content="Koop India offers expert business consulting services for startups and MSMEs in India. Strategy, growth planning, operations optimization & expansion support."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/business-consulting"
        />
      </Head>

      <div className="bg-white text-gray-700">
        {/* ================= HERO ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Business Consulting Services
            </h1>

            <p className="max-w-4xl mx-auto text-gray-300 mb-8 leading-relaxed">
              At <b>Koop India</b>, we provide end-to-end Business Consulting
              services to help startups, MSMEs, and growing brands build a
              strong foundation and scale sustainably. Our consulting solutions
              are designed to solve real business challenges and create
              long-term growth opportunities.
            </p>

            {/* <button
              onClick={onOpenModal}
              className="bg-[#F97316] px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-600"
            >
              Talk to a Business Consultant <ArrowRight />
            </button> */}
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="py-16 px-5">
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              We work closely with founders and leadership teams to understand
              their business vision, market position, and operational gaps.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Based on deep market intelligence and practical industry
              experience, we create customized strategies that improve
              profitability, streamline operations, and accelerate expansion.
            </p>
          </div>
        </section>

        {/* ================= WHY KOOP ================= */}
        <section className="pb-16 px-5 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#141D32] mb-6">
              Why Choose <span className="text-[#F97316]">Koop India</span> for
              Business Consulting?
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our consulting approach blends strategic planning, financial
              analysis, market insights, and execution support.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you are launching a new venture or expanding an existing
              business, Koop India acts as your strategic growth partner.
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
                "Business model evaluation and refinement",
                "Growth and market entry strategy",
                "Revenue and profitability improvement roadmap",
                "Operational process optimization",
                "Go-to-market planning",
                "Strategic advisory for startups and MSMEs",
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
<section className="py-16 px-5 bg-[#F97316] relative overflow-hidden">
  {/* Optional: Subtle decorative circle for texture */}
  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
  
  <div className="max-w-6xl mx-auto text-center relative z-10">
    <h2 className="text-3xl font-extrabold text-white mb-6">
      Consulting Focused on{" "}
      <span className="text-[#141D32]">Execution & Results</span>
    </h2>

    <p className="text-white/90 text-lg  max-w-3xl mx-auto leading-relaxed font-medium">
      Our goal is not just to create strategies—but to help businesses
      implement them successfully. We work alongside founders to convert
      plans into action and action into measurable growth.
    </p>
    
    {/* Decorative line */}
    <div className="w-24 h-1 bg-[#141D32] mx-auto mt-8 rounded-full"></div>
  </div>
</section>

        {/* ================= CTA ================= */}
        <section className="py-16 px-5 bg-white border-y border-gray-100 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl  font-bold mb-6 text-[#141D32]">
              Start Your Business Growth Journey with Koop India
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to scale? Contact our experts today for a free,
              no-obligation consultation and turn your business idea into
              reality.
            </p>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={onOpenModal}
                className="bg-[#F97316] text-white cursor-pointer px-10 py-4 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-[#ea580c] transition-all shadow-lg hover:shadow-orange-200/50 transform hover:-translate-y-1"
              >
                Get Free Business Consultation <ArrowRight size={20} />
              </button>

              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <span className="text-[#F97316]">📞</span> Or call us directly
                to speak with an advisor
              </p>
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default BusinessConsultingPage;
