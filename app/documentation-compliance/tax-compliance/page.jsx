"use client";
import React from "react";
import Head from "next/head";
import { CheckCircle, ArrowRight, ShieldCheck, Scale, FileText, PieChart } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const TaxComplianceServicesPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const services = [
    "Company Registration & Incorporation",
    "GST Registration & Monthly Returns",
    "Income Tax Filing (ITR 1-7)",
    "TDS Filing & Compliance",
    "ROC Filings & Annual Returns",
    "Professional Bookkeeping Services",
    "Payroll & Statutory Compliance",
    "Financial Statement Preparation",
    "Tax Planning & Strategic Advisory",
    "Regulatory Compliance Audit",
  ];

  return (
    <>
      <Head>
        <title>Tax & Compliance Services | India's Trusted Partner | Koop India</title>
        <meta name="description" content="Expert GST, Income Tax, ROC, and Bookkeeping services for Indian Startups & MSMEs." />
      </Head>

      <div className="bg-white">
        {/* ================= HERO SECTION ================= */}
        <section className="relative py-20 px-6 bg-[#141D32] text-white overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F97316] rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <span className="bg-[#F97316]/10 text-[#F97316] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block border border-[#F97316]/20">
              Statutory & Financial Excellence
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Tax & <span className="text-[#F97316]">Compliance</span> Simplified
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-10 leading-relaxed">
              We handle the complex legal framework—GST, Income Tax, and ROC—so you can focus 
              entirely on scaling your business without the fear of penalties.
            </p>
            <button
              onClick={onOpenModal}
              className="bg-[#F97316] text-white px-10 py-3.5 cursor-pointer rounded-xl font-bold inline-flex items-center gap-2 hover:bg-[#ea580c] transition-all shadow-xl hover:shadow-orange-500/20 transform hover:-translate-y-1"
            >
              Talk to a Compliance Expert <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* ================= DEFINITION SECTION ================= */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-6">
                Navigate Indian Regulations <br />
                <span className="text-[#F97316]">With Confidence</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Tax & compliance isn't just about filing forms; it's about building a 
                  <strong> foundation of trust</strong> for your investors and stakeholders.
                </p>
                <p>
                  From GST and TDS to maintenance of proper books of accounts, Koop India 
                  ensures your business meets every statutory obligation under Indian law.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <ShieldCheck className="text-[#F97316] mb-3" size={32} />
                <h4 className="font-bold text-[#141D32]">Zero Penalties</h4>
                <p className="text-xs text-gray-500">Never miss a deadline with our proactive alerts.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 mt-6">
                <Scale className="text-[#F97316] mb-3" size={32} />
                <h4 className="font-bold text-[#141D32]">100% Legal</h4>
                <p className="text-xs text-gray-500">Compliant with the latest MCA and Finance Act norms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US (ORANGE BG) ================= */}
        <section className="py-20 px-6 bg-[#F97316]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141D32] mb-8">
              Why Partner With Koop India?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Expert Guidance", desc: "Consulting from seasoned CAs and CS professionals.", icon: <FileText /> },
                { title: "Transparent Pricing", desc: "No hidden costs. Affordable packages for startups.", icon: <PieChart /> },
                { title: "Growth Focused", desc: "Tax planning strategies that save you money legally.", icon: <CheckCircle /> },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg">
                  <div className="bg-[#F97316]/10 w-12 h-12 rounded-xl flex items-center justify-center text-[#F97316] mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#141D32] mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY DELIVERABLES ================= */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Our Compliance <span className="text-[#F97316]">Ecosystem</span>
              </h3>
              <p className="text-gray-500">Comprehensive support for every financial stage of your business.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#F97316] hover:shadow-md transition-all cursor-default"
                >
                  <div className="bg-slate-50 group-hover:bg-[#F97316]/10 p-2 rounded-lg transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA (DARK BG) ================= */}
       <section className="py-20 px-6 bg-[#F97316] text-center relative overflow-hidden">
  {/* Subtle White Grid Pattern for texture */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
  </div>
  
  <div className="relative z-10">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#141D32] mb-6">
      Don't Let Compliance Be a Roadblock
    </h2>
    
    <p className="text-white text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
      Secure your business today. Join 100+ startups that trust Koop India 
      for hassle-free tax management and growth.
    </p>
    
    <button
      onClick={onOpenModal}
      className="bg-[#141D32] text-white cursor-pointer px-12 py-3 rounded-xl font-bold text-lg hover:bg-[#0F172A] transition-all shadow-2xl hover:shadow-black/20 transform hover:-translate-y-1"
    >
      Get Free Consultation Today
    </button>

    <div className="mt-8 flex justify-center items-center gap-2 text-[#141D32] font-semibold text-sm tracking-wide uppercase">
      <span className="w-8 h-[2px] bg-[#141D32]"></span>
      Trusted by Experts
      <span className="w-8 h-[2px] bg-[#141D32]"></span>
    </div>
  </div>
</section>

        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default TaxComplianceServicesPage;