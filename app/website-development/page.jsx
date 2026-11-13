"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  CheckCircle2,
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
  Server,
  Layers,
  Database,
  Lock,
  Building2,
  Briefcase,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Award,
  Factory,
  Flame,
  Check,
  X,
  MapPin,
  FileCheck
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

export default function WebsiteDevelopmentPage() {
  const { isOpen, onOpenModal, onCloseModal } = useModal();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const services = [
    {
      icon: Layout,
      title: "Business & Corporate Websites",
      desc: "Authority-building websites designed for startups, SMEs, and corporate enterprises. Clean hierarchy, high-speed page delivery, and lead-focused architecture.",
      badge: "Core Service",
      features: ["Figma Custom UI/UX", "Executive Team & Service Pages", "Mobile Responsive", "Instant Lead Form"],
    },
    {
      icon: ShoppingBag,
      title: "E-Commerce Web Portals",
      desc: "High-converting online storefronts powered by Next.js or Shopify. Friction-free checkout, payment gateway integrations, and automatic WhatsApp order alerts.",
      badge: "High ROI",
      features: ["Razorpay & UPI Checkout", "Product Catalog Filters", "Cart Drawer UI", "Order Management"],
    },
    {
      icon: Rocket,
      title: "High-Conversion Landing Pages",
      desc: "Engineered specifically for Google Ads, Facebook Ads, and marketing campaigns. Zero fluff, sub-second load times, and psychological conversion triggers.",
      badge: "PPC Ready",
      features: ["Sub-second Speed", "Frictionless Forms", "WhatsApp Click-to-Chat", "A/B Testing Structure"],
    },
    {
      icon: Users,
      title: "Startup Launchpad Websites",
      desc: "Budget-friendly, high-velocity websites designed for early-stage founders to pitch investors, recruit talent, and acquire initial customers.",
      badge: "Startup Friendly",
      features: ["7-Day Launch", "Investor Deck Sections", "Growth Analytics Setup", "Scalable Tech Stack"],
    },
    {
      icon: BarChart3,
      title: "CRM & WhatsApp Integrated Portals",
      desc: "Automate your sales pipeline by connecting every website inquiry directly to Zoho, HubSpot, Salesforce, or your custom Koop India CRM dashboard.",
      badge: "Automation",
      features: ["Instant Lead Routing", "WhatsApp Business API", "Automated Email Followups", "No Data Loss"],
    },
    {
      icon: Factory,
      title: "B2B & Manufacturer Portals",
      desc: "Specialized platforms for manufacturers, exporters, and wholesale distributors featuring catalog downloads, RFQ quoting systems, and dealer networks.",
      badge: "Industrial B2B",
      features: ["Product Specs & Catalogs", "Bulk Quote Request (RFQ)", "Dealer Login Area", "Pan-India Reach"],
    },
  ];

  const packages = [
    {
      name: "Startup Starter",
      tagline: "Perfect for local businesses, consultants, and new startups.",
      pricingType: "Custom Quote",
      delivery: "5–7 Days",
      popular: false,
      features: [
        "Up to 5 Custom Responsive Pages",
        "Next.js / Modern React Architecture",
        "Mobile-First & 100% Responsive Design",
        "WhatsApp Click-to-Chat Integration",
        "Instant Lead Capture Forms",
        "Free SSL Certificate & Setup",
        "Basic On-Page SEO & Schema",
        "30 Days Post-Launch Support",
      ],
      buttonText: "Request Quote",
    },
    {
      name: "E-Commerce Growth",
      tagline: "Designed for D2C brands, retailers, and product catalogs.",
      pricingType: "Custom Quote",
      delivery: "10–14 Days",
      popular: true,
      features: [
        "Up to 25 Product Listings Included",
        "Razorpay, Cashfree & UPI Checkout",
        "Dynamic Product Filters & Search",
        "Interactive Cart & Sticky Checkout",
        "Automated WhatsApp Order Alerts",
        "Admin Dashboard for Products/Orders",
        "Google Analytics 4 & Meta Pixel Setup",
        "60 Days Post-Launch Support",
      ],
      buttonText: "Request Quote",
    },
    {
      name: "Custom Enterprise Portal",
      tagline: "Tailored for scaling companies needing custom logic and CRM sync.",
      pricingType: "Custom Quote",
      delivery: "15–21 Days",
      popular: false,
      features: [
        "Unlimited Custom Pages & Modular UI",
        "Full-Stack Next.js 15 & Node/Firebase",
        "Bi-Directional CRM & WhatsApp Sync",
        "Role-Based Access & Customer Login",
        "High-Volume RFQ & B2B Quoting Engine",
        "Core Web Vitals 90+ Score Guarantee",
        "100% Source Code & Git IP Ownership",
        "Dedicated Technical Account Manager",
      ],
      buttonText: "Discuss Project",
    },
  ];

  const comparisonRows = [
    {
      metric: "Mobile PageSpeed Score",
      koop: "95–100 (Google Green Zone)",
      wordpress: "35–55 (Slow due to bloated plugins)",
      wix: "45–60 (Script heavy)",
    },
    {
      metric: "Source Code & IP Ownership",
      koop: "100% Full Ownership (No Lock-In)",
      wordpress: "Self-hosted, but complex theme locks",
      wix: "Zero ownership (Platform locked)",
    },
    {
      metric: "Monthly Recurring Plugin Fees",
      koop: "Included (Zero recurring plugin costs)",
      wordpress: "High recurring fees for pro plugins",
      wix: "Mandatory monthly subscriptions",
    },
    {
      metric: "Google Core Web Vitals (LCP/CLS)",
      koop: "Strictly Passed (< 1.0s LCP)",
      wordpress: "Frequently Fails without caching plugins",
      wix: "Inconsistent across mobile networks",
    },
    {
      metric: "Security & Vulnerabilities",
      koop: "Static Edge Generation (Zero SQLi)",
      wordpress: "High risk (Outdated plugins & themes)",
      wix: "Closed environment (Limited customization)",
    },
    {
      metric: "CRM & WhatsApp Instant Sync",
      koop: "Native API Direct Hookups",
      wordpress: "Requires third-party zapier/plugins",
      wix: "Restricted to internal marketplace",
    },
  ];

  const regionalHubs = [
    {
      city: "Delhi Commercial Hubs",
      areas: ["Connaught Place", "Nehru Place", "Okhla Industrial Area", "Netaji Subhash Place", "Pitampura", "Laxmi Nagar", "Kirti Nagar"],
    },
    {
      city: "Noida & Greater Noida",
      areas: ["Sector 62 (IT Hub)", "Sector 18", "Sector 63", "Sector 132 (Expressway)", "Pari Chowk", "Knowledge Park"],
    },
    {
      city: "Gurugram Business Centers",
      areas: ["Cyber City (DLF)", "Udyog Vihar", "Golf Course Road", "Sohna Road", "Manesar Industrial Zone"],
    },
    {
      city: "Pan-India Expansion",
      areas: ["Mumbai", "Bengaluru", "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Lucknow", "Kolkata"],
    },
  ];

  const faqs = [
    {
      q: "How is website development pricing decided at Koop India?",
      a: "At Koop India, website development solutions are customized transparently based on your specific business requirements, design scope, integrations, and deliverables. There are zero hidden fees, and you receive 100% source code ownership. Contact us for a free technical consultation and customized proposal!",
    },
    {
      q: "Why is a custom Next.js website better than a WordPress template?",
      a: "Custom Next.js websites load up to 4x faster than WordPress, achieve 90+ Google PageSpeed scores, don't require expensive monthly paid plugins, and are virtually hack-proof because they do not rely on vulnerable PHP backends. Fast speed directly improves your Google rankings and ad conversions.",
    },
    {
      q: "How long does it take to develop and launch our website?",
      a: "Standard business websites are designed, developed, and deployed within 5 to 7 business days. E-commerce portals typically take 10 to 14 days, while custom enterprise applications take 15 to 21 days with comprehensive staging and QA review.",
    },
    {
      q: "Will my website be search engine friendly (SEO-ready)?",
      a: "Yes, 100%! Every website built by Koop India comes pre-configured with on-page SEO best practices: semantic HTML5 tags (H1–H4), structured JSON-LD schemas (Service, LocalBusiness, FAQ), fast Core Web Vitals, XML sitemaps, robots.txt, and canonical tags ready for Google indexation.",
    },
    {
      q: "Do I get full ownership of the website design and source code?",
      a: "Yes. Once the project is completed and handed over, you own 100% of the intellectual property, design assets, database, and repository source code. There are zero vendor lock-ins.",
    },
    {
      q: "Can you integrate our website with our CRM or WhatsApp?",
      a: "Absolutely. We specialize in automated lead funnels. Every lead submitted through your website forms can instantly trigger WhatsApp notifications to your sales team and sync in real time with Zoho, HubSpot, Salesforce, or your custom Koop India dashboard.",
    },
    {
      q: "Can non-technical team members update content and products later?",
      a: "Yes. We integrate clean, user-friendly CMS options (Headless CMS or visual admin panels) so your team can easily modify text, publish new blog articles, add products, or update banners without writing any code.",
    },
    {
      q: "What post-launch support and warranty do you provide?",
      a: "All web projects include complimentary 30 to 60 days of post-launch developer support covering bug fixes, minor design tweaks, and hands-on staff walkthrough training. We also offer affordable monthly maintenance plans.",
    },
  ];

  return (
    <div className="bg-white text-gray-700 font-sans antialiased">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative py-16 md:py-24 px-5 bg-gradient-to-br from-[#0F172A] via-[#141D32] to-[#1a2340] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#F97316] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-orange-400 mb-6 shadow-sm">
            <Sparkles size={14} className="text-orange-400 animate-pulse" />
            <span>Top-Rated Website Development Company in Delhi NCR • Pan-India</span>
          </div>

          <h1 className="text-5xl  font-black mb-6 leading-tight tracking-tight text-white">
            High-Performance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-orange-400 to-amber-300">
              Website Development
            </span>
            <br />
            Built for Google Top Rankings & Sales
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-4 max-w-3xl mx-auto font-medium leading-relaxed">
            Fast Next.js 15 Architecture • 90+ Google Core Web Vitals • 100% Source Code Ownership • Direct WhatsApp & CRM Lead Sync
          </p>

          <p className="text-sm sm:text-base text-gray-400 mb-10 max-w-2xl mx-auto">
            Trusted by 500+ startups, MSMEs & established enterprises across Delhi, Noida, Gurugram and pan-India to turn visitors into high-paying customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Get Free Website Proposal & Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+919599826131"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-base rounded-2xl border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-orange-400" />
              <span>Talk to Tech Architect: +91 95998 26131</span>
            </a>
          </div>

          {/* Trust Metrics Pill Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-orange-400">500+</div>
              <div className="text-xs text-gray-300 mt-1">Websites Delivered</div>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-orange-400">4.9 / 5.0</div>
              <div className="text-xs text-gray-300 mt-1">Client Satisfaction (640+ Reviews)</div>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-orange-400">90+</div>
              <div className="text-xs text-gray-300 mt-1">Google PageSpeed Guaranteed</div>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-black text-orange-400">5–7 Days</div>
              <div className="text-xs text-gray-300 mt-1">Average Turnaround Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. TRUST & CREDENTIALS BANNER ================= */}
      <section className="bg-slate-900 border-y border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-gray-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-orange-500 w-5 h-5 shrink-0" />
            <span>100% Source Code Ownership</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-orange-500 w-5 h-5 shrink-0" />
            <span>Zero Proprietary Lock-In</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="text-orange-500 w-5 h-5 shrink-0" />
            <span>SSL 256-Bit Bank Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="text-orange-500 w-5 h-5 shrink-0" />
            <span>ISO 9001:2015 Quality Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="text-orange-500 w-5 h-5 shrink-0" />
            <span>Global Edge CDN Deployment</span>
          </div>
        </div>
      </section>

      {/* ================= 3. SERVICES GRID ================= */}
      <section className="py-20 px-5 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#F97316] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Full Spectrum Web Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D32] mb-4 tracking-tight">
              Comprehensive <span className="text-[#F97316]">Website Solutions</span> for Every Stage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              From early-stage MVP websites to complex B2B distributor portals and high-volume e-commerce storefronts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-[#F97316] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#F97316] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#141D32] mb-3 group-hover:text-[#F97316] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    <div className="border-t border-slate-100 pt-4 mb-6 space-y-2">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenModal}
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#141D32] group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inquire About {item.title}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. COMPARISON TABLE (SEO AUTHORITY BOOSTER) ================= */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-3">
              Performance Benchmark
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D32] mb-4">
              Why Next.js by Koop India Outperforms <span className="text-orange-500">WordPress & Templates</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Google rewards websites that load under 1.5 seconds and pass all Core Web Vitals. See how our tech stack compares.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-lg">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider">Evaluation Feature</th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-orange-400 bg-slate-800/80">
                    Koop India (Next.js 15)
                  </th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-300">
                    WordPress + Plugins
                  </th>
                  <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-300">
                    Wix / Template Builders
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="py-4 px-6 font-bold text-slate-800">{row.metric}</td>
                    <td className="py-4 px-6 font-extrabold text-emerald-700 bg-orange-50/30 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>{row.koop}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{row.wordpress}</td>
                    <td className="py-4 px-6 text-slate-600">{row.wix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= 5. TRANSPARENT PACKAGES & PRICING ================= */}
      <section className="py-20 px-5 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-3">
              Clear & Upfront Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D32] mb-4">
              Transparent <span className="text-[#F97316]">Website Development</span> Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              No hidden charges. Full source code ownership. Free domain & SSL setup with every package.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? "bg-slate-900 text-white shadow-2xl scale-105 border-2 border-orange-500"
                    : "bg-white text-slate-800 border border-slate-200 shadow-md hover:shadow-xl"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className={`text-2xl font-black mb-2 ${pkg.popular ? "text-white" : "text-slate-900"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mb-6 ${pkg.popular ? "text-gray-300" : "text-gray-500"}`}>
                    {pkg.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-gray-200/20">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl sm:text-3xl font-black ${pkg.popular ? "text-orange-400" : "text-orange-600"}`}>
                        {pkg.pricingType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 font-semibold">
                      <Clock size={13} className="text-orange-500" />
                      <span>Estimated Timeline: {pkg.delivery}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className={pkg.popular ? "text-gray-200" : "text-slate-700"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenModal}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    pkg.popular
                      ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30"
                      : "bg-slate-900 hover:bg-orange-600 text-white"
                  }`}
                >
                  <span>{pkg.buttonText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. 6-STAGE PROVEN PROCESS ================= */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-3">
              Transparent Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D32] mb-4">
              Our 6-Stage <span className="text-orange-500">Development Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              From requirement gathering to live Google Search Console submission, we keep you updated at every milestone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                desc: "We analyze your target market, competitor benchmarks, conversion goals, and technical requirements.",
              },
              {
                step: "02",
                title: "UI/UX Figma Architecture",
                desc: "Creation of modern, conversion-focused interactive wireframes and mobile-first prototypes for your sign-off.",
              },
              {
                step: "03",
                title: "Full-Stack Development",
                desc: "Clean code development using Next.js 15, Tailwind CSS, and optimized database hookups with zero bloat.",
              },
              {
                step: "04",
                title: "On-Page SEO & Schema",
                desc: "Implementation of structured JSON-LD schemas, meta tags, OpenGraph previews, and image AVIF/WebP compression.",
              },
              {
                step: "05",
                title: "Cross-Device QA & Auditing",
                desc: "Rigorous testing across iOS, Android, macOS, and Windows to verify 90+ Core Web Vitals speed.",
              },
              {
                step: "06",
                title: "Go-Live & Post-Launch Support",
                desc: "Domain pointing, SSL activation, Google Search Console indexing, and 30-day developer support.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 relative hover:border-orange-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
                  {p.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. TECH STACK BLUEPRINT ================= */}
      <section className="py-16 px-5 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">
              Modern <span className="text-orange-400">Technology Stack</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              We build on world-class developer tools to guarantee long-term stability and unmatched performance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { name: "Next.js 15", sub: "React Framework", icon: Code },
              { name: "Tailwind CSS", sub: "Modern Styling", icon: Palette },
              { name: "Node.js", sub: "Backend Engine", icon: Server },
              { name: "Firebase / SQL", sub: "Cloud Database", icon: Database },
              { name: "Vercel / Cloudflare", sub: "Global Edge CDN", icon: Globe },
              { name: "Razorpay / UPI", sub: "Payment Gateways", icon: Lock },
            ].map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                  <Icon className="w-6 h-6 text-orange-400 mb-2" />
                  <div className="font-bold text-sm text-white">{tech.name}</div>
                  <div className="text-[10px] text-gray-400">{tech.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 8. LOCALIZED REGIONAL HUBS (DELHI NCR SEO) ================= */}
      <section className="py-20 px-5 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-3">
              Local Authority
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D32] mb-4">
              Website Development Across <span className="text-orange-500">Delhi NCR & Major Business Hubs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Providing localized technical consulting, in-person discovery meetings, and fast turnarounds for businesses across key commercial zones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalHubs.map((hub, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4 font-bold text-slate-900 text-base">
                  <MapPin size={18} className="text-orange-500 shrink-0" />
                  <h4>{hub.city}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hub.areas.map((area, aIdx) => (
                    <span
                      key={aIdx}
                      className="inline-block px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg text-xs font-medium text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9. INTERNAL CROSS-LINKING ECOSYSTEM ================= */}
      <section className="py-14 px-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black mb-2">Explore Related Business Growth Services</h3>
            <p className="text-white/90 text-sm max-w-2xl mx-auto">
              Koop India is your 360° launchpad: from business incorporation and legal compliance to digital presence.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <Link
              href="/gst-registration"
              className="bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 p-3.5 rounded-2xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-1.5 font-bold text-xs"
            >
              <FileCheck size={18} />
              <span>GST Registration</span>
            </Link>
            <Link
              href="/trademark-registration"
              className="bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 p-3.5 rounded-2xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-1.5 font-bold text-xs"
            >
              <ShieldCheck size={18} />
              <span>Trademark Registration</span>
            </Link>
            <Link
              href="/tech-solutions/crm-development"
              className="bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 p-3.5 rounded-2xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-1.5 font-bold text-xs"
            >
              <Database size={18} />
              <span>Custom CRM Systems</span>
            </Link>
            <Link
              href="/tech-solutions/seo"
              className="bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 p-3.5 rounded-2xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-1.5 font-bold text-xs"
            >
              <Search size={18} />
              <span>SEO & Organic Growth</span>
            </Link>
            <Link
              href="/custom-website-development"
              className="bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 p-3.5 rounded-2xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-1.5 font-bold text-xs"
            >
              <Flame size={18} />
              <span>PPC Google Ads Landing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 10. FAQS (SCHEMA MATCHED) ================= */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-3">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D32] mb-4">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Clear answers to the most common questions about website development, costs, timelines, and technology.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-orange-500 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 11. FINAL CTA BANNER ================= */}
      <section className="py-20 px-5 bg-gradient-to-br from-[#0F172A] via-[#141D32] to-[#1a2340] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-orange-400 mb-6 border border-white/10">
            <Clock size={13} />
            <span>Fast Turnaround • Free Architecture Audit</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
            Ready to Build a Website That Dominates Google Top 5?
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free technical strategy call with our lead architect. We'll analyze your current site, review competitor strategies, and deliver a custom roadmap.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Start Your Website Project Today
              <ArrowRight size={18} />
            </button>
            <a
              href="tel:+919599826131"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-base rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone size={18} className="text-orange-400" />
              <span>Call Us: +91 95998 26131</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 12. ENQUIRY MODAL ================= */}
      <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
    </div>
  );
}
