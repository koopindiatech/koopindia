"use client";
import React from "react";
import Head from "next/head";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  Lightbulb,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const StartupIndiaRegistrationPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  // SEO Keywords & Schema Data
  const seoKeywords = [
    "Startup India Registration",
    "DPIIT Recognition",
    "Startup India Certificate",
    "Tax Exemption for Startups",
    "Angel Tax Exemption",
    "Government Startup Scheme",
    "Startup India Benefits",
    "DPIIT Registration Online",
    "Startup India Eligibility",
    "Koop India Startup Services",
  ].join(", ");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Startup India Registration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Startup India Registration is a recognition granted by DPIIT (Department for Promotion of Industry and Internal Trade) that helps eligible startups access tax benefits, funding opportunities, and government support.",
        },
      },
      {
        "@type": "Question",
        name: "What are the eligibility criteria?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your business must be incorporated as Pvt. Ltd./LLP/Partnership, be less than 10 years old, have annual turnover ≤ ₹100 crore, and work on innovation or improvement of products/services.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the registration take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DPIIT recognition is typically received within 7-15 working days after submission of complete documents.",
        },
      },
      {
        "@type": "Question",
        name: "What documents are required?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Certificate of Incorporation, PAN Card, Director details, innovation write-up, and optionally pitch deck, patent filing, or funding details.",
        },
      },
    ],
  };

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Startup India Registration | DPIIT Recognition & Tax Benefits | Koop India
        </title>
        <meta
          name="description"
          content="Get Startup India (DPIIT) Registration with Koop India. Unlock 3-year tax exemption, angel tax relief, government tenders & funding support. 100% online, expert-handled process with 95%+ approval rate."
        />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/documentation-compliance/startup-india-registration"
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Startup India Registration | DPIIT Recognition | Koop India" />
        <meta property="og:description" content="Unlock tax benefits, funding & government support with expert-handled DPIIT Registration. Get started today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.koopindia.com/documentation-compliance/startup-india-registration" />
        <meta property="og:image" content="https://www.koopindia.com/images/startup-india-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Startup India Registration | Koop India" />
        <meta name="twitter:description" content="Get DPIIT Recognition with tax exemptions & government benefits. Expert support, 100% online." />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Startup India Registration",
              provider: {
                "@type": "Organization",
                name: "Koop India",
                url: "https://www.koopindia.com",
              },
              areaServed: "India",
              offers: {
                "@type": "Offer",
                price: "4999",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </Head>

      <div className="bg-white text-gray-700 font-sans antialiased">

        {/* ================= HERO SECTION ================= */}
        <section className="relative py-14 px-5 bg-gradient-to-br from-[#0F172A] via-[#141D32] to-[#1a2340] text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#F97316] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>95%+ Approval Success Rate</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Startup India{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-400">
                Registration
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-3 max-w-3xl mx-auto">
              Get DPIIT Recognition & Unlock Government Benefits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <button
                onClick={onOpenModal}
                className="group bg-[#F97316] px-8 py-3 cursor-pointer rounded-xl font-semibold text-white inline-flex items-center gap-2 hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 cursor-pointer rounded-xl font-semibold border border-white/30 hover:bg-white/10 transition-colors">
                View Eligibility Criteria
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F97316]" />
                <span>Expert CA/CS Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F97316]" />
                <span>7-15 Days Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F97316]" />
                <span>No Hidden Charges</span>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* ================= WHAT IS STARTUP INDIA ================= */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-50 text-[#F97316] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Lightbulb className="w-4 h-4" />
                  Understanding DPIIT Recognition
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-6">
                  What is{" "}
                  <span className="text-[#F97316]">Startup India Registration?</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Startup India Registration is an official recognition granted by{" "}
                  <strong>DPIIT</strong> (Department for Promotion of Industry and Internal Trade) 
                  under the Government of India's flagship initiative. This recognition transforms 
                  your business into a government-acknowledged startup, unlocking a comprehensive 
                  suite of benefits designed to fuel growth and innovation.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Whether you're seeking tax exemptions, easier compliance, access to government 
                  tenders, or investor credibility – DPIIT recognition is your gateway to 
                  accelerated startup success in India.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: TrendingUp, label: "Funding Access", value: "₹10,000 Cr+" },
                    { icon: FileText, label: "Govt Tenders", value: "Exclusive" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <stat.icon className="w-6 h-6 text-[#F97316] mb-2" />
                      <div className="text-2xl font-bold text-[#141D32]">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#141D32] rounded-3xl p-8 text-white shadow-2xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#F97316]" />
                    Key Recognition Benefits
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Income tax holiday for 3 consecutive years",
                      "Exemption from Angel Tax (Section 56(2)(viib))",
                      "Self-certification under 9 labour & 3 environmental laws",
                      "Fast-track IP registration at 80% lower cost",
                      "Priority access to government procurement tenders",
                      "Easier winding up within 90 days under IBC",
                    ].map((benefit, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Decorative */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F97316]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENEFITS GRID ================= */}
        <section className=" px-5 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Benefits of{" "}
                <span className="text-[#F97316]">Startup India Registration</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Unlock powerful advantages designed to accelerate your startup's growth and reduce operational burdens
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Tax Exemptions",
                  desc: "Income tax holiday for 3 consecutive years out of first 10 years under Section 80-IAC",
                },
                {
                  icon: ShieldCheck,
                  title: "Angel Tax Relief",
                  desc: "Exemption from Section 56(2)(viib) – no tax on investments above fair market value",
                },
                {
                  icon: FileText,
                  title: "Government Tenders",
                  desc: "Priority access to central & state government tenders without prior experience requirement",
                },
                {
                  icon: Clock,
                  title: "Fast-Track IP",
                  desc: "80% rebate on patent filing & 50% on trademarks with expedited examination",
                },
                {
                  icon: Users,
                  title: "Self-Certification",
                  desc: "Compliance under 9 labour laws & 3 environmental laws via self-declaration",
                },
                {
                  icon: Star,
                  title: "Investor Credibility",
                  desc: "Enhanced trust with VCs, banks & stakeholders through government recognition",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#F97316] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F97316] transition-colors">
                    <benefit.icon className="w-6 h-6 text-[#F97316] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#141D32] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ELIGIBILITY ================= */}
        <section className="py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Eligibility Criteria for{" "}
                <span className="text-[#F97316]">DPIIT Recognition</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Check if your business qualifies for Startup India benefits
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Criteria List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-bold text-xl text-[#141D32] mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#F97316]" />
                  Your Business Must:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Be incorporated as Private Limited, LLP, or Registered Partnership",
                    "Be less than 10 years from date of incorporation",
                    "Have annual turnover not exceeding ₹100 crore in any financial year",
                    "Work towards innovation, development or improvement of products/services",
                    "Have a scalable business model with high employment or wealth generation potential",
                    "Not be formed by splitting up or reconstruction of an existing business",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={onOpenModal}
                  className="mt-8 w-full bg-[#141D32] text-white cursor-pointer hover:text-orange-500 px-6 py-4 rounded-xl font-semibold hover:bg-[#0F172A] transition-colors flex items-center justify-center gap-2"
                >
                  Get Free Eligibility Check
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Visual Card */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#141D32] rounded-3xl p-8 text-white h-full">
                  <h3 className="text-xl font-bold mb-6">💡 Pro Tips for Approval</h3>
                  <ul className="space-y-4 text-gray-200">
                    {[
                      "Clearly articulate your innovation in the application",
                      "Prepare a concise pitch deck highlighting scalability",
                      "Ensure all incorporation documents are up-to-date",
                      "Mention any IPR filings or unique technology",
                      "Highlight employment generation potential",
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[#F97316] font-bold">{i + 1}.</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
                    <p className="text-sm">
                      <strong className="text-[#F97316]">Note:</strong> Koop India experts help craft compelling 
                      innovation narratives that significantly improve approval chances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= DOCUMENTS ================= */}
        <section className="px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Documents{" "}
                <span className="text-[#F97316]">Required</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Simple documentation process – we help you prepare everything professionally
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mandatory */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg text-[#141D32]">Mandatory Documents</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Certificate of Incorporation / Registration",
                    "PAN Card of the entity",
                    "Details of Directors / Partners",
                    "Brief write-up on business innovation (we help draft)",
                    "Website URL or pitch deck (if available)",
                    "Authorized signatory details",
                  ].map((doc, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supporting */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-lg text-[#141D32]">Supporting Documents (Any One)</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Patent filing acknowledgment / Trademark certificate",
                    "Funding details or investment agreements",
                    "Recommendation letter from incubator",
                    "Award or recognition certificates",
                    "Press coverage or media mentions",
                  ].map((doc, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-sm text-orange-800 flex gap-2">
                    <span>📌</span>
                    <strong>Koop India Advantage:</strong> We professionally draft your innovation 
                    statement & business description to maximize approval chances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROCESS TIMELINE ================= */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Simple 6-Step{" "}
                <span className="text-[#F97316]">Registration Process</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end managed process with transparent tracking at every stage
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F97316]/20 via-[#F97316] to-[#F97316]/20"></div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { step: 1, title: "Free Consultation", desc: "Eligibility assessment & strategy discussion" },
                  { step: 2, title: "Document Collection", desc: "We gather & review all required documents" },
                  { step: 3, title: "Profile Creation", desc: "Startup India portal registration & profile setup" },
                  { step: 4, title: "Application Submission", desc: "DPIIT application filing with expert review" },
                  { step: 5, title: "Clarification Support", desc: "Handling queries from DPIIT team promptly" },
                  { step: 6, title: "Certificate Issued", desc: "Receive your DPIIT Recognition Certificate" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#F97316] hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 left-6 w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
                      {item.step}
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-bold text-[#141D32] mb-2 group-hover:text-[#F97316] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Note */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-full">
                <Clock className="w-5 h-5 text-[#F97316]" />
                <span className="text-gray-700">
                  <strong>Typical Timeline:</strong> Recognition received within{" "}
                  <strong className="text-[#F97316]">7–15 working days</strong> after submission
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= POST-REGISTRATION SUPPORT ================= */}
        <section className=" px-5 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-6">
                  Post-Registration{" "}
                  <span className="text-[#F97316]">Compliance & Support</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Getting recognized is just the beginning. Koop India ensures you maximize 
                  every benefit throughout your startup journey.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Annual self-declaration filing assistance",
                    "Updating business details on DPIIT portal",
                    "Tax exemption application support (Form 10BD/10BE)",
                    "Guidance on government tender participation",
                    "Linkage to startup schemes & funding programs",
                    "Compliance reminders & deadline management",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-sm text-green-800 flex gap-2">
                    <span>👉</span>
                    <strong>Pro Tip:</strong> Many startups miss post-registration benefits. 
                    Koop India's dedicated support ensures you leverage every advantage.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#141D32] rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">🎯 Maximize Your Benefits</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Tax Holiday", desc: "Apply within first 5 years for 3-year exemption" },
                      { title: "Angel Tax", desc: "Submit Form-2 with valuation report for exemption" },
                      { title: "IP Fast-Track", desc: "Use DPIIT certificate for 80% patent fee rebate" },
                      { title: "Tenders", desc: "Register on GeM portal with startup status" },
                    ].map((benefit, i) => (
                      <div key={i} className="p-4 bg-white/10 rounded-xl border border-white/20">
                        <h4 className="font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-sm text-gray-300">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE KOOP ================= */}
        <section className="py-14 px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Why Choose{" "}
                <span className="text-[#F97316]">Koop India</span>?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trusted by 500+ startups across India for DPIIT registration success
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Startup-Focused Experts",
                  desc: "Dedicated consultants who understand startup challenges & growth needs",
                },
                {
                  icon: ShieldCheck,
                  title: "95%+ Approval Rate",
                  desc: "Strategic application preparation that significantly boosts success chances",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation Story Crafting",
                  desc: "Expert help in presenting your innovation compellingly to DPIIT",
                },
                {
                  icon: Clock,
                  title: "Fast & Transparent",
                  desc: "Clear timelines, regular updates, and responsive communication throughout",
                },
                {
                  icon: TrendingUp,
                  title: "Beyond Registration",
                  desc: "Post-recognition support to help you actually utilize government benefits",
                },
                {
                  icon: Star,
                  title: "End-to-End Digital",
                  desc: "100% online process – no physical visits, complete document management",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#F97316] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#F97316] transition-colors">
                    <feature.icon className="w-7 h-7 text-[#F97316] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#141D32] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Testimonial Snippet */}
            <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 max-w-5xl mx-auto">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Koop India made our DPIIT registration seamless. Their team crafted a compelling 
                innovation narrative that got us approved in just 10 days. Highly recommended!"
              </p>
              <p className="font-semibold text-[#141D32]">– Priya Sharma, Founder @ TechNova</p>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="pb-14 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Frequently Asked{" "}
                <span className="text-[#F97316]">Questions</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  q: "How long does Startup India registration take?",
                  a: "Typically 7-15 working days after document submission. Delays may occur if DPIIT requests clarifications, which we help address promptly."
                },
                {
                  q: "Can a sole proprietorship apply?",
                  a: "No. Only entities registered as Private Limited Company, LLP, or Partnership Firm are eligible for DPIIT recognition."
                },
                {
                  q: "Is the recognition valid forever?",
                  a: "DPIIT recognition is valid for up to 10 years from incorporation or until turnover exceeds ₹100 crore, whichever is earlier."
                },
                {
                  q: "What if my application gets rejected?",
                  a: "Rejections are rare with proper preparation. If clarifications are sought, Koop India handles them at no extra cost. We also offer re-application support if needed."
                },
                {
                  q: "Can I apply for tax exemption immediately?",
                  a: "Yes, once you receive the DPIIT certificate, you can apply for income tax exemption under Section 80-IAC and angel tax relief under Section 56(2)(viib)."
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-[#141D32] pr-4">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-[#F97316] flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>


        {/* ================= ENQUIRY MODAL ================= */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default StartupIndiaRegistrationPage;