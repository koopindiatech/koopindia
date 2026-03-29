"use client";
import React from "react";
import Head from "next/head";
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Code,
  Layout,
  Smartphone,
  Rocket,
  Search,
  Zap,
  Globe,
  Users,
  Star,
  ChevronDown,
  Phone,
  Mail,
  BarChart3,
  Palette,
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const WebsiteDevelopmentPage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  // SEO Keywords
  const seoKeywords = [
    "Website Development Services India",
    "Professional Web Development",
    "E-commerce Website Development",
    "Business Website Design",
    "Startup Website Development",
    "MSME Website Solutions",
    "CRM Integrated Website",
    "SEO Friendly Website",
    "Responsive Web Design",
    "Koop India Web Services",
  ].join(", ");

  // FAQ Schema for Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does website development take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timeline varies by project scope: Business websites (7-14 days), E-commerce (15-30 days), Custom solutions (30-60 days). We provide a clear timeline after requirement analysis.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide SEO with website development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! All our websites include on-page SEO optimization, fast loading structure, mobile responsiveness, and schema markup to help you rank better on search engines.",
        },
      },
      {
        "@type": "Question",
        name: "Can you integrate CRM or WhatsApp with my website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We integrate popular CRMs (HubSpot, Zoho, Salesforce), WhatsApp Business API, payment gateways, and any third-party tools you need.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide post-launch support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer comprehensive post-launch support including security updates, performance monitoring, content updates, and growth consulting.",
        },
      },
    ],
  };

  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Website Development Services India | Business & E-commerce Websites |
          Koop India
        </title>
        <meta
          name="description"
          content="Koop India builds high-performance, SEO-optimized websites for startups & MSMEs. Business sites, e-commerce, landing pages & CRM integration. Get a free consultation today!"
        />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.koopindia.com/tech-solutions/website-development"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Professional Website Development Services | Koop India"
        />
        <meta
          property="og:description"
          content="High-converting, SEO-optimized websites built for growth. Business sites, e-commerce & custom solutions."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.koopindia.com/website-development"
        />
        <meta
          property="og:image"
          content="https://www.koopindia.com/images/web-dev-og.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Website Development Services | Koop India"
        />
        <meta
          name="twitter:description"
          content="Build a powerful digital presence with conversion-focused websites. Free consultation available."
        />

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
              serviceType: "Website Development",
              provider: {
                "@type": "Organization",
                name: "Koop India",
                url: "https://www.koopindia.com",
              },
              areaServed: "India",
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "INR",
                  minPrice: "9999",
                },
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
            <div className="absolute top-20 right-10 w-72 h-72 bg-[#F97316] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            {/* Badge */}

            <h1 className="text-4xl md:text-5xl  font-bold mb-6 leading-tight">
              Professional{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-400">
                Website Development
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-3 max-w-3xl mx-auto">
              Build a Digital Presence That Drives Real Business Growth
            </p>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              High-performance websites • SEO-ready structure • CRM integrations
              • Fast loading • 100% mobile responsive
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <button
                onClick={onOpenModal}
                className="group bg-[#F97316] px-8 py-3 cursor-pointer rounded-xl font-semibold text-white inline-flex items-center gap-2 hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
              >
                Get Free Website Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 rounded-xl cursor-pointer font-semibold border border-white/30 hover:bg-white/10 transition-colors">
                View Our Portfolio
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F97316]" />
                <span>50+ Websites Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F97316]" />
                <span>98% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#F97316]" />
                <span>Post-Launch Support</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* ================= INTRO SECTION ================= */}
        <section className="py-14 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-50 text-[#F97316] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  Your Digital Growth Partner
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-6">
                  Websites Built for{" "}
                  <span className="text-[#F97316]">Growth & Conversions</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  In today's digital-first world, your website is your 24/7
                  sales representative. At <strong>Koop India</strong>, we don't
                  just build websites – we craft strategic digital assets
                  designed to attract visitors, build trust, and convert
                  interest into measurable business outcomes.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Whether you're a startup launching your first site or an
                  established business ready to scale, our development approach
                  combines stunning design, technical excellence, and conversion
                  psychology to deliver results that matter.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: Rocket,
                      label: "Avg. Launch Time",
                      value: "10-14 Days",
                    },
                    { icon: Search, label: "SEO Score", value: "90+ Google" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 p-4 rounded-xl border border-slate-200"
                    >
                      <stat.icon className="w-6 h-6 text-[#F97316] mb-2" />
                      <div className="text-2xl font-bold text-[#141D32]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#141D32] rounded-3xl p-8 text-white shadow-2xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Code className="w-6 h-6 text-[#F97316]" />
                    What You Get With Every Website
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Mobile-first, fully responsive design",
                      "Blazing-fast loading speed (Core Web Vitals optimized)",
                      "On-page SEO structure with schema markup",
                      "Secure hosting setup with SSL certificate",
                      "Lead capture forms & WhatsApp integration",
                      "User-friendly CMS for easy content updates",
                      "Google Analytics & conversion tracking setup",
                      "30-day post-launch support included",
                    ].map((feature, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
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

        {/* ================= SERVICES GRID ================= */}
        <section className=" px-5 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Our{" "}
                <span className="text-[#F97316]">
                  Website Development Services
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tailored solutions for every business stage – from startup
                launch to enterprise scale
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Layout,
                  title: "Business & Brand Websites",
                  desc: "Professional corporate sites that establish credibility and showcase your services effectively",
                },
                {
                  icon: Globe,
                  title: "E-commerce Websites",
                  desc: "Full-featured online stores with payment gateways, inventory management & seamless checkout",
                },
                {
                  icon: Rocket,
                  title: "Landing Pages",
                  desc: "High-converting single pages designed for campaigns, product launches & lead generation",
                },
                {
                  icon: Users,
                  title: "Startup & MSME Websites",
                  desc: "Budget-friendly, scalable websites built for growing businesses with growth in mind",
                },
                {
                  icon: BarChart3,
                  title: "CRM-Integrated Websites",
                  desc: "Seamless connection with HubSpot, Zoho, Salesforce for automated lead management",
                },
                {
                  icon: Smartphone,
                  title: "Distributor & Partner Portals",
                  desc: "Secure login portals for dealer networks, franchise management & B2B collaborations",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#F97316] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F97316] transition-colors">
                    <service.icon className="w-6 h-6 text-[#F97316] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#141D32] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KEY FEATURES ================= */}
        <section className="py-20 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Technical <span className="text-[#F97316]">Excellence</span>{" "}
                Built-In
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every website we build includes these powerful features at no
                extra cost
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "100% Mobile Responsive",
                  desc: "Flawless experience on all devices",
                },
                {
                  icon: Search,
                  title: "SEO-Optimized Structure",
                  desc: "Schema markup, meta tags & clean code",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast Loading",
                  desc: "Core Web Vitals optimized for speed",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure & SSL Enabled",
                  desc: "HTTPS, security headers & regular updates",
                },
                {
                  icon: Code,
                  title: "Easy Content Management",
                  desc: "User-friendly admin panel for updates",
                },
                {
                  icon: Phone,
                  title: "WhatsApp & Chat Integration",
                  desc: "Instant visitor engagement tools",
                },
                {
                  icon: BarChart3,
                  title: "Analytics Ready",
                  desc: "Google Analytics & conversion tracking",
                },
                {
                  icon: Globe,
                  title: "Multi-language Support",
                  desc: "Expand globally with localized content",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#F97316] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#F97316] transition-colors">
                    <feature.icon className="w-5 h-5 text-[#F97316] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-[#141D32] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY STRATEGY ================= */}
        <section className=" px-5 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-6">
                  Why Website{" "}
                  <span className="text-[#F97316]">Strategy Matters</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  A beautiful website alone won't grow your business. Strategy
                  transforms your site from a digital brochure into a
                  revenue-generating asset.
                </p>

                <ul className="space-y-4">
                  {[
                    "Generate qualified leads with strategic CTAs & forms",
                    "Build instant brand credibility with professional design",
                    "Amplify digital marketing ROI with conversion-optimized pages",
                    "Track sales funnel performance with integrated analytics",
                    "Scale seamlessly as your business grows & evolves",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-sm text-orange-800 flex gap-2">
                    <span>💡</span>
                    <strong>Pro Insight:</strong> Websites with clear strategy
                    see 3x higher conversion rates. We embed growth thinking
                    into every pixel.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#141D32] rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Palette className="w-6 h-6 text-[#F97316]" />
                    Our Design Philosophy
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "User-First",
                        desc: "Intuitive navigation that guides visitors to action",
                      },
                      {
                        title: "Brand-Aligned",
                        desc: "Visual identity that reinforces your unique value",
                      },
                      {
                        title: "Performance-Driven",
                        desc: "Every element optimized for speed & conversions",
                      },
                      {
                        title: "Future-Ready",
                        desc: "Scalable architecture that grows with your needs",
                      },
                    ].map((principle, i) => (
                      <div
                        key={i}
                        className="p-4 bg-white/10 rounded-xl border border-white/20"
                      >
                        <h4 className="font-semibold mb-1 text-[#F97316]">
                          {principle.title}
                        </h4>
                        <p className="text-sm text-gray-300">
                          {principle.desc}
                        </p>
                      </div>
                    ))}
                  </div>
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
                Our Proven{" "}
                <span className="text-[#F97316]">Development Process</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transparent, collaborative workflow with clear milestones and
                regular updates
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F97316]/20 via-[#F97316] to-[#F97316]/20"></div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    step: 1,
                    title: "Discovery & Strategy",
                    desc: "Understand your goals, audience & competitive landscape",
                  },
                  {
                    step: 2,
                    title: "UI/UX Design",
                    desc: "Wireframes, mockups & interactive prototypes for approval",
                  },
                  {
                    step: 3,
                    title: "Development",
                    desc: "Clean code development with content integration",
                  },
                  {
                    step: 4,
                    title: "SEO & Optimization",
                    desc: "On-page SEO, speed optimization & mobile testing",
                  },
                  {
                    step: 5,
                    title: "Quality Assurance",
                    desc: "Cross-browser testing, security checks & bug fixes",
                  },
                  {
                    step: 6,
                    title: "Launch & Support",
                    desc: "Go-live assistance + 30-day post-launch support",
                  },
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
                  <strong>Typical Timeline:</strong>{" "}
                  <strong className="text-[#F97316]">
                    Business sites: 7-14 days
                  </strong>{" "}
                  •
                  <strong className="text-[#F97316]">
                    {" "}
                    E-commerce: 15-30 days
                  </strong>{" "}
                  • Custom projects: 30-60 days
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-14 px-5 bg-gradient-to-r from-[#0F172A] to-[#141D32] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
              <Phone className="w-4 h-4 text-[#F97316]" />
              <span>Free Consultation • No Obligation</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your High-Performance Website?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Turn your digital vision into a growth-driving reality. Let's
              discuss your project requirements and create a website that works
              as hard as you do.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onOpenModal}
                className="group bg-[#F97316] px-8 py-3 cursor-pointer rounded-xl font-semibold text-white inline-flex items-center gap-2 hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30"
              >
                Start Your Website Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:+919891233311"
                className="px-8 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Talk to Our Expert
              </a>
            </div>

          </div>
        </section>

        {/* ================= WHY CHOOSE KOOP ================= */}
        <section className="py-14 px-5 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-4">
                Why Choose <span className="text-[#F97316]">Koop India</span>?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trusted by 500+ startups & MSMEs for web solutions that deliver
                real business impact
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Business-First Approach",
                  desc: "We focus on your growth goals, not just aesthetics – every design decision drives results",
                },
                {
                  icon: Search,
                  title: "SEO & Conversion Experts",
                  desc: "Built-in SEO structure + conversion psychology = websites that rank AND convert",
                },
                {
                  icon: ShieldCheck,
                  title: "Startup-Friendly Pricing",
                  desc: "Transparent packages with no hidden costs, designed for growing businesses",
                },
                {
                  icon: Clock,
                  title: "On-Time Delivery Promise",
                  desc: "Clear timelines, regular updates, and dedicated project management",
                },
                {
                  icon: Rocket,
                  title: "Growth-Oriented Support",
                  desc: "Post-launch guidance on analytics, optimizations & scaling your digital presence",
                },
                {
                  icon: Code,
                  title: "Modern Tech Stack",
                  desc: "Future-proof development using React, Next.js, headless CMS & best practices",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#F97316] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#F97316] transition-colors">
                    <feature.icon className="w-7 h-7 text-[#F97316] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#141D32] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 max-w-5xl mx-auto">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Koop India transformed our outdated site into a lead-generation
                machine. Our inquiries increased by 200% within 2 months of
                launch. Their strategic approach made all the difference!"
              </p>
              <p className="font-semibold text-[#141D32]">
                – Rohan Mehta, CEO @ GrowthLabs
              </p>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="py-14 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#141D32] mb-3">
                Frequently Asked{" "}
                <span className="text-[#F97316]">Questions</span>
              </h2>
            </div>

            <div className="space-y-2">
              {[
                {
                  q: "How long does website development take?",
                  a: "Timeline varies by project scope: Business websites typically take 7-14 days, e-commerce sites 15-30 days, and custom solutions 30-60 days. We provide a detailed timeline after our initial discovery call.",
                },
                {
                  q: "Do you provide SEO with website development?",
                  a: "Yes! Every website includes on-page SEO optimization: clean URL structure, meta tags, schema markup, mobile responsiveness, and fast loading speed – all essential for ranking well on Google.",
                },
                {
                  q: "Can you integrate my existing CRM or tools?",
                  a: "Absolutely. We seamlessly integrate popular CRMs (HubSpot, Zoho, Salesforce), payment gateways (Razorpay, Stripe), WhatsApp Business API, email marketing tools, and any third-party services you use.",
                },
                {
                  q: "Will I be able to update content myself?",
                  a: "Yes! We build user-friendly admin panels using modern CMS platforms. You'll receive training and documentation to easily update text, images, blogs, and products without technical knowledge.",
                },
                {
                  q: "What kind of post-launch support do you offer?",
                  a: "All projects include 30 days of complimentary post-launch support for bug fixes and minor updates. We also offer affordable monthly maintenance plans for security updates, backups, and growth consulting.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-[#141D32] pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#F97316] flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-4 text-gray-600">{faq.a}</div>
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

export default WebsiteDevelopmentPage;
