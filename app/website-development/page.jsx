"use client";

import { useState, useEffect } from "react";
import { addEnquiry } from "@/lib/enquiryService";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Sparkles,
  Code2,
  Layout,
  Smartphone,
  Zap,
  ShieldCheck,
  Clock,
  ChevronDown,
  Phone,
  Mail,
  ExternalLink,
  Send,
  Layers,
  Globe,
  Laptop,
  ShoppingBag,
  Check,
  HelpCircle,
  BarChart3,
  Flame,
  Monitor,
  Database,
  Server,
  Palette,
  Users,
  X,
  Menu,
} from "lucide-react";

const PHONE_NUMBER = "+91 95998 26131";
const RAW_PHONE = "919599826131";
const WHATSAPP_LINK = `https://wa.me/${RAW_PHONE}?text=Hi%20Koop%20India,%20I%20am%20interested%20in%20Website%20Development.%20Please%20share%20details%20and%20project%20scope.`;

export default function WebsiteDevelopmentLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Clear any existing hash from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Smooth scroll to section without modifying or appending hash to URL
  const scrollToSection = (e, sectionId) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    serviceType: "Corporate Business Website",
    projectScope: "New Website from Scratch",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Live Scope & Timeline Estimator State (Zero Pricing)
  const [calcType, setCalcType] = useState("business"); // landing, business, ecommerce, webapp
  const [calcPages, setCalcPages] = useState("5-8");
  const [calcSpeed, setCalcSpeed] = useState(true);
  const [calcSeo, setCalcSeo] = useState(true);
  const [calcWhatsApp, setCalcWhatsApp] = useState(true);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Lead to Firestore CRM (uses shared addEnquiry)
  const handleSubmitLead = async (e, sourceName = "google_ads_website_development") => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError("Please enter your name and phone number.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");

    try {
      await addEnquiry({
        name: formData.name.trim(),
        displayName: formData.name.trim(),
        company: formData.company.trim() || formData.name.trim(),
        displayCompany: formData.company.trim() || formData.name.trim(),
        phone: formData.phone.trim(),
        mobile: formData.phone.trim(),
        displayPhone: formData.phone.trim(),
        email: formData.email.trim() || "",
        displayEmail: formData.email.trim() || "",
        service: "Website Development",
        category: "Website Development",
        displayCategory: "Website Development",
        serviceType: formData.serviceType,
        projectScope: formData.projectScope,
        requirements: `Type: ${formData.serviceType} | Scope: ${formData.projectScope} | Notes: ${formData.details || "Google Ads Lead"}`,
        message: `Type: ${formData.serviceType} | Scope: ${formData.projectScope} | Notes: ${formData.details || "Google Ads Lead"}`,
        source: sourceName,
        status: "New",
      });

      // Track FB pixel if available
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Website Development Google Ads",
          value: 1,
        });
      }

      setSubmitSuccess(true);
      setSubmitting(false);
    } catch (err) {
      console.error("Failed to submit lead:", err);
      setSubmitError("Something went wrong. Please call or WhatsApp us directly.");
      setSubmitting(false);
    }
  };

  // Calculate estimated turnaround time & architecture deliverables (NO PRICING)
  const getEstimation = () => {
    let days = "5-7 Business Days";
    let stack = "Next.js 14 + Tailwind CSS + Vercel Cloud";
    let highlights = [
      "Sub-second load times (< 1.2s)",
      "100% Mobile & Tablet Responsive",
      "Lead Capture & WhatsApp Routing",
    ];

    if (calcType === "landing") {
      days = "3-5 Business Days";
      stack = "Next.js / HTML5 + Tailwind + High-Converting PPC Copy";
      highlights = [
        "Laser-focused conversion layout",
        "A/B test ready structure",
        "Google Ads Quality Score 9+/10",
      ];
    } else if (calcType === "business") {
      days = "5-8 Business Days";
      stack = "Next.js + Tailwind CSS + Headless CMS Integration";
      highlights = [
        "Comprehensive multi-page architecture",
        "Dynamic content management",
        "Full SEO Schema & Meta Tags",
      ];
    } else if (calcType === "ecommerce") {
      days = "10-14 Business Days";
      stack = "Shopify / Next.js Commerce + Razorpay / Stripe";
      highlights = [
        "Full product catalog & cart system",
        "Automated payment & invoice gateway",
        "Order management & stock alerts",
      ];
    } else if (calcType === "webapp") {
      days = "15-22 Business Days";
      stack = "React / Next.js + Node.js + PostgreSQL / Firebase";
      highlights = [
        "Custom database & user authentication",
        "Role-based client / admin dashboard",
        "Custom API integrations & automated workflows",
      ];
    }

    if (calcPages === "10+") {
      highlights.push("Expanded multi-tier navigation");
    }
    if (calcSpeed) {
      highlights.push("Speed & Core Web Vitals Optimization");
    }
    if (calcSeo) {
      highlights.push("Complete Technical & On-Page SEO");
    }
    if (calcWhatsApp) {
      highlights.push("Instant WhatsApp & CRM Lead Sync");
    }

    return {
      days,
      stack,
      highlights,
    };
  };

  const est = getEstimation();

  // Core 6 Services (Strictly Commercial Web Development, NO Government Services)
  const services = [
    {
      id: "corporate",
      title: "Corporate & Business Websites",
      category: "BRAND VISIBILITY",
      desc: "Modern, responsive multi-page websites engineered to establish authority, present your company's offerings cleanly, and generate qualified commercial leads.",
      features: [
        "Custom responsive UI/UX designed in Figma",
        "Interactive enquiry forms with instant lead routing",
        "Dynamic CMS for easy team content updates",
        "Domain, SSL & corporate email setup",
      ],
      icon: Layout,
    },
    {
      id: "landing-pages",
      title: "Google Ads & PPC Landing Pages",
      category: "HIGH CONVERSION",
      desc: "Single-minded, hyper-focused landing pages built to convert paid traffic into paying customers. Maximum speed, zero distractions, proven conversion psychology.",
      features: [
        "Sub-second load times for 9+/10 Quality Score",
        "Direct WhatsApp click-to-chat & phone CTAs",
        "Clean form validation with instant lead alerts",
        "UTM parameter tracking & Google Ads Tag setup",
      ],
      icon: Zap,
    },
    {
      id: "ecommerce",
      title: "E-Commerce Stores & Catalogs",
      category: "ONLINE SALES",
      desc: "High-speed online storefronts built on Shopify, WooCommerce, or custom Next.js Commerce. Engineered for smooth checkouts and zero cart abandonment.",
      features: [
        "Automated Razorpay, Cashfree & UPI gateway setup",
        "Fast mobile-first checkout & product filtering",
        "Automated WhatsApp order confirmation alerts",
        "Inventory tracking & shipping integration",
      ],
      icon: ShoppingBag,
    },
    {
      id: "web-apps",
      title: "Custom Web Applications & Portals",
      category: "SCALABLE TECH",
      desc: "Bespoke client portals, custom business dashboards, and web applications built with modern React, Next.js, and secure databases.",
      features: [
        "Secure user authentication & role management",
        "Interactive analytics dashboards & data visualization",
        "Third-party REST API & webhook integrations",
        "Automated background workflows & notifications",
      ],
      icon: Code2,
    },
    {
      id: "redesign-speed",
      title: "Website Redesign & Speed 90+",
      category: "PERFORMANCE",
      desc: "Transform outdated, slow-loading websites into fast, modern digital powerhouses. Optimized for high Google PageSpeed scores, fast mobile rendering, and modern visual design.",
      features: [
        "Full code overhaul & legacy cleanup",
        "Modern glassmorphism / dark / luxury UI refresh",
        "Image optimization (WebP/AVIF) & edge CDN caching",
        "Preserve existing SEO rankings with 301 redirects",
      ],
      icon: Flame,
    },
    {
      id: "cloud-hosting",
      title: "Cloud Deployment & Maintenance",
      category: "RELIABILITY",
      desc: "Reliable cloud hosting on Vercel, AWS, or Cloudflare with secure SSL encryption, regular backups, and dedicated technical maintenance.",
      features: [
        "Automated Git deployment & regular system updates",
        "Global edge network with multi-region CDN",
        "Daily automated database & file backups",
        "Dedicated monthly engineer support hours",
      ],
      icon: ShieldCheck,
    },
  ];

  // The 6 High-Conversion Web Architecture Pillars
  const architecturePillars = [
    {
      id: "speed",
      title: "Sub-Second Speed Architecture",
      badge: "CORE PERFORMANCE",
      tagline: "Sub-Second Load Speed • Core Web Vitals Optimized",
      desc: "53% of mobile visitors abandon websites that take more than 3 seconds to load. We engineer pages with modern Next.js architecture, optimized WebP/AVIF images, and edge CDN caching for rapid delivery.",
      metrics: [
        { label: "PageSpeed Target", val: "90+" },
        { label: "Load Time", val: "0.8s" },
        { label: "Bounce Reduction", val: "-58%" },
      ],
      features: [
        "Server-side rendering (SSR) & static pre-generation for instant page delivery",
        "Edge caching on global CDN nodes close to your customers across India",
        "Zero bulky WordPress plugins or blocking render scripts",
        "Verified Core Web Vitals (LCP, FID, CLS) strictly in the green zone",
      ],
      icon: Zap,
    },
    {
      id: "lead-engine",
      title: "High-Intent Lead & WhatsApp Engine",
      badge: "CONVERSION PSYCHOLOGY",
      tagline: "Direct WhatsApp Click-to-Chat • Instant CRM Lead Sync",
      desc: "Websites shouldn't just be digital brochures—they must be active sales machines. We integrate friction-free lead capture forms, 1-click WhatsApp routing, and mobile sticky action drawers to maximize conversion rates.",
      metrics: [
        { label: "Lead Inquiries Lift", val: "+240%" },
        { label: "WhatsApp Routing", val: "Instant" },
        { label: "Form Drop-off", val: "-45%" },
      ],
      features: [
        "Pre-filled WhatsApp click-to-chat links with specific inquiry details",
        "Smart form validation with zero clutter and instant feedback",
        "Sticky mobile quick-action drawer (Call, WhatsApp, Request Quote)",
        "Automated sync to Koop India Admin CRM with real-time lead alerts",
      ],
      icon: Flame,
    },
    {
      id: "mobile-ux",
      title: "100% Fluid Mobile-First Experience",
      badge: "RESPONSIVE MASTERY",
      tagline: "Engineered for 85%+ Mobile Ad Traffic Across India",
      desc: "Over 85% of paid Google Ads traffic in India comes from mobile devices. We design specifically for the smartphone thumb-zone, ensuring rapid taps, frictionless scrolling, and zero awkward horizontal scaling.",
      metrics: [
        { label: "Mobile Traffic Share", val: "88%" },
        { label: "Touch Experience", val: "Fluid" },
        { label: "Mobile Usability", val: "100%" },
      ],
      features: [
        "Custom Figma UI designed mobile-first from the ground up",
        "Native app-like touch responsiveness and smooth drawer navigation",
        "Optimized tap targets and zero misplaced input fields",
        "Seamless cross-device consistency on iOS, Android, and tablets",
      ],
      icon: Smartphone,
    },
    {
      id: "google-ads",
      title: "Google Ads & PPC Optimization",
      badge: "LOWER AD SPEND",
      tagline: "High Quality Score Focus • Higher Ad Rank • Lower Cost Per Click",
      desc: "Slow or irrelevant landing pages drain your ad budget. We build tightly themed, ultra-fast landing pages with semantic copy matching your Google Ads keywords, directly boosting Quality Scores and lowering cost-per-lead.",
      metrics: [
        { label: "Quality Score Focus", val: "High" },
        { label: "CPC Reduction", val: "-35%" },
        { label: "Conversion Lift", val: "+65%" },
      ],
      features: [
        "Keyword-focused headlines matching exact user search intent",
        "UTM parameter tracking passing source and campaign data to CRM",
        "Google Ads Tag, Meta Pixel, and Google Tag Manager ready",
        "No distracting external links—100% focused on lead conversion",
      ],
      icon: BarChart3,
    },
    {
      id: "seo-schema",
      title: "Technical SEO & Rich Snippet Schema",
      badge: "ORGANIC VISIBILITY",
      tagline: "JSON-LD Structured Data • OpenGraph • Google Search Ready",
      desc: "Built-in technical SEO that helps Google understand and index your business immediately. Every page includes clean semantic HTML5, canonical URLs, automated XML sitemaps, and rich snippet schemas.",
      metrics: [
        { label: "SEO Audit Target", val: "Top Tier" },
        { label: "Search Console", val: "Setup" },
        { label: "Rich Snippets", val: "Enabled" },
      ],
      features: [
        "Structured JSON-LD schema for Local Business, Organization, and FAQ",
        "Custom OpenGraph cards for WhatsApp, LinkedIn, and Twitter shares",
        "Automatic XML sitemap and robots.txt generation",
        "Clean, human-readable SEO friendly URL structures",
      ],
      icon: Globe,
    },
    {
      id: "security-code",
      title: "Enterprise Security & Full Code Ownership",
      badge: "ZERO LOCK-IN",
      tagline: "100% Source Code Delivery • Free SSL • Reliable Cloud Hosting",
      desc: "You own everything we build. Upon delivery, we transfer full source code, design assets, and cloud deployment access. No recurring proprietary CMS fees, no hostage websites, and zero vendor lock-in.",
      metrics: [
        { label: "Code Ownership", val: "100%" },
        { label: "Cloud Hosting", val: "Vercel/AWS" },
        { label: "SSL Encryption", val: "256-Bit" },
      ],
      features: [
        "Complete source code repository transfer to your private GitHub",
        "High-availability cloud hosting on Vercel Edge / AWS infrastructure",
        "Free SSL certificate setup and secure hosting configuration",
        "Full documentation and 30-day developer warranty included",
      ],
      icon: ShieldCheck,
    },
  ];

  // FAQs
  const faqs = [
    {
      q: "How fast can you deliver my website?",
      a: "For Google Ads landing pages, we deliver in 3 to 5 business days. For full corporate business websites, turnaround is typically 5 to 8 business days. E-commerce portals and custom web applications take 10 to 18 days depending on the scope.",
    },
    {
      q: "How do you ensure my website loads fast on mobile and desktop?",
      a: "We build on Next.js with modern image compression (WebP/AVIF), lightweight semantic code, and edge CDN delivery. This avoids bulky bloated plugins and ensures your Core Web Vitals stay green for maximum ad conversion.",
    },
    {
      q: "Where do customer leads go when someone submits a form?",
      a: "Leads are instantly routed to your Koop India CRM dashboard, saved in your secure database, and can be configured to send instant WhatsApp and email notifications to your sales team.",
    },
    {
      q: "Will I have full ownership of my website and source code?",
      a: "Yes, absolutely. Once your project is completed, you own 100% of the intellectual property, source code, design assets, and content. There are zero proprietary lock-ins.",
    },
    {
      q: "Can I easily update content, text, and images later?",
      a: "Yes. We integrate easy-to-use content management systems (CMS) so your team can effortlessly edit text, add blog articles, update banners, and manage products without needing a developer.",
    },
    {
      q: "What post-launch support and maintenance do you offer?",
      a: "Every project includes complimentary post-launch developer support, bug fixing, and staff walkthrough training. We also provide ongoing maintenance for daily backups, security updates, and performance monitoring.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-gray-100 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* ============================================================== */}
      {/* 1. TOP STICKY HEADER (Official Koop India Logo + Dark Theme)  */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090C]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* Main Header Koop India Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="z-[80] flex-shrink-0 text-2xl sm:text-3xl font-extrabold flex items-center tracking-tight cursor-pointer"
            aria-label="Koop India"
          >
            <span className="text-orange-500">koop</span>
            <span className="text-white">india</span>
            <span className="text-orange-500">.</span>
          </button>

          {/* Desktop Nav Links (No Hash in URL) */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-gray-300">
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "services")}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "architecture")}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Blueprint
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "estimator")}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Scope Estimator
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "solutions")}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "process")}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Process
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "faqs")}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${RAW_PHONE}`}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
            >
              <Phone size={13} className="text-orange-400" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer (No Hash in URL) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0B10] border-b border-white/10 px-5 py-6 space-y-4">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-gray-300">
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, "services");
                }}
                className="py-1 text-left hover:text-orange-400 cursor-pointer"
              >
                Services
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, "architecture");
                }}
                className="py-1 text-left hover:text-orange-400 cursor-pointer"
              >
                Web Blueprint
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, "estimator");
                }}
                className="py-1 text-left hover:text-orange-400 cursor-pointer"
              >
                Scope Estimator
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, "solutions");
                }}
                className="py-1 text-left hover:text-orange-400 cursor-pointer"
              >
                Solutions
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, "process");
                }}
                className="py-1 text-left hover:text-orange-400 cursor-pointer"
              >
                Process
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, "faqs");
                }}
                className="py-1 text-left hover:text-orange-400 cursor-pointer"
              >
                FAQs
              </button>
            </nav>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={`tel:${RAW_PHONE}`}
                className="w-full py-2.5 text-center rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-orange-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full py-2.5 text-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-500/20"
              >
                Start Your Project ↗
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 2. FIRST SECTION (HERO): Dedicated to Website Development      */}
      {/* ============================================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Ambient Dark-Orange Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] sm:h-[550px] bg-gradient-to-b from-orange-500/20 via-orange-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Studio Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-orange-400">
                  HIGH-PERFORMANCE WEB ENGINEERING
                </span>
              </div>

              {/* Main Headline for Website Development */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-white tracking-tight leading-[1.15]">
                Custom Websites <br className="hidden sm:block" />
                Engineered for <br className="hidden sm:block" />
                Higher Conversions &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 drop-shadow-[0_4px_24px_rgba(249,115,22,0.35)]">
                  Real Growth.
                </span>
              </h1>

              {/* Subtitle Tailored to Commercial Web Development */}
              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                We design, develop, and scale bespoke business websites, high-converting Google Ads landing pages, and fast e-commerce portals. Engineered for sub-second load times, high PageSpeed performance, and built-in lead generation—tailored for ambitious Indian brands.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Start Your Web Project</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, "architecture")}
                  className="px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Web Blueprint</span>
                  <ArrowRight size={15} className="text-gray-400" />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-orange-400" />
                  <span>5-7 Day Delivery Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-orange-400" />
                  <span>Speed & Core Web Vitals Focused</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-orange-400" />
                  <span>100% Full Code Ownership</span>
                </div>
              </div>
            </div>

            {/* Right Showcase Column (Laptop + Floating Mobile Device Mockup) */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
              {/* Outer decorative ambient backlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-3xl blur-2xl transform scale-95" />

              {/* Laptop Mockup Wrapper */}
              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#0F1117] border border-white/15 p-2 shadow-2xl shadow-black/80">
                {/* Laptop Top Chrome Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#0B0D12] rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>koopindia.com/web-development</span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Laptop Screen Content (Live Web UI Preview) */}
                <div className="bg-[#08090E] p-4 sm:p-5 rounded-b-xl space-y-4">
                  {/* Inside Laptop Top Hero */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center font-black text-xs text-white">
                        K
                      </div>
                      <span className="text-xs font-bold text-white tracking-wider">
                        Koop India
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      Verified Next.js Build
                    </span>
                  </div>

                  {/* Inside Mockup Headline */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                      Conversion-Engineered Architecture
                    </p>
                    <p className="text-lg sm:text-xl font-black text-white leading-tight">
                      Engineered for Conversions. <br />
                      Built to Scale Ambitious Brands.
                    </p>
                    <p className="text-[11px] text-gray-400 leading-relaxed max-w-sm">
                      Zero slow templates. Hand-crafted responsive code with sub-second page loads, integrated lead forms, and seamless analytics.
                    </p>
                  </div>

                  {/* Inside Mockup CTA & Badges */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <span className="px-3 py-1.5 rounded-full bg-orange-500 text-white font-bold text-[10px]">
                      Explore Scope ↗
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-semibold text-[10px]">
                      View Live Demos
                    </span>
                  </div>

                  {/* Inside Mockup Mini Stats Strip */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-sm font-extrabold text-orange-400">90+</p>
                      <p className="text-[9px] text-gray-400 font-medium">Core Web Vitals</p>
                    </div>
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-sm font-extrabold text-white">+240%</p>
                      <p className="text-[9px] text-gray-400 font-medium">Lead Inquiries</p>
                    </div>
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-sm font-extrabold text-emerald-400">&lt; 1.0s</p>
                      <p className="text-[9px] text-gray-400 font-medium">Load Time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Phone Mockup */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 w-44 sm:w-48 rounded-[28px] bg-[#0E1017] border-2 border-white/20 p-2 shadow-2xl shadow-black">
                {/* Dynamic Island / Notch */}
                <div className="w-16 h-3 bg-black rounded-full mx-auto mb-2" />
                {/* Mobile Screen */}
                <div className="bg-[#090A0F] rounded-[20px] p-3 space-y-2 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-orange-400">
                      KOOP INDIA
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs font-black text-white leading-tight">
                    Custom Web Solutions
                  </p>
                  <p className="text-[9px] text-gray-400">
                    Fast mobile-first experiences built for higher ad ROI.
                  </p>
                  <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center">
                    <span className="text-[9px] font-bold text-orange-400">
                      Get Proposal ↗
                    </span>
                  </div>
                  <div className="flex justify-end pt-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] shadow-md">
                      💬
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. FOUR CORE STATS STRIP                                        */}
          {/* ============================================================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-24">
            {/* Stat 1 */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-orange-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Users size={22} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  100+
                </p>
                <p className="text-xs font-semibold text-gray-400">Projects Delivered</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-orange-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Layout size={22} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  6
                </p>
                <p className="text-xs font-semibold text-gray-400">Core Web Services</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-orange-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  100%
                </p>
                <p className="text-xs font-semibold text-gray-400">In-House Engineers</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-orange-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Direct
                </p>
                <p className="text-xs font-semibold text-gray-400">Priority Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SIX CORE SERVICES (Strictly Commercial Web Development)      */}
      {/* ============================================================== */}
      <section id="services" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase">
              End-to-End Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Commercial Web Solutions Built for Real Results
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Every website we build is crafted to convert visitors into inquiries, scale effortlessly with your traffic, and reinforce your brand's market leadership.
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-orange-500/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-black/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400">
                        {srv.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {srv.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="pt-2 space-y-2 border-t border-white/5">
                      {srv.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setFormData((p) => ({ ...p, serviceType: srv.title }));
                        setModalOpen(true);
                      }}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Request Custom Scope</span>
                      <ArrowRight size={13} />
                    </button>
                    <span className="text-[11px] font-mono text-gray-500">
                      In-House
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. INTERACTIVE PROJECT SCOPE & TIMELINE ESTIMATOR (NO PRICING)   */}
      {/* ============================================================== */}
      <section id="estimator" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0A0B10]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase">
              Project Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Project Scope & Timeline Estimator
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Select your requirements to see estimated turnaround time, recommended architecture stack, and technical deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            {/* Options selection */}
            <div className="lg:col-span-7 space-y-6">
              {/* Type selection */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2.5 uppercase tracking-wider">
                  1. Select Website Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "landing", label: "Ads Landing Page", sub: "PPC Conversion" },
                    { id: "business", label: "Business Website", sub: "Multi-page Corporate" },
                    { id: "ecommerce", label: "E-Commerce Store", sub: "Online Storefront" },
                    { id: "webapp", label: "Custom Web App", sub: "Portal & Dashboard" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCalcType(t.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        calcType === t.id
                          ? "bg-orange-500/10 border-orange-500 text-white shadow-md shadow-orange-500/10"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{t.label}</p>
                      <p className="text-[10px] text-gray-400">{t.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page count */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2.5 uppercase tracking-wider">
                  2. Number of Custom Pages
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "1-4", label: "1 to 4 Pages" },
                    { id: "5-8", label: "5 to 8 Pages" },
                    { id: "10+", label: "10+ Pages" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCalcPages(p.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        calcPages === p.id
                          ? "bg-orange-500/10 border-orange-500 text-white font-bold"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 text-xs"
                      }`}
                    >
                      <span className="text-xs font-semibold">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Addon features */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2.5 uppercase tracking-wider">
                  3. Key Technical Deliverables Included
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                    <input
                      type="checkbox"
                      checked={calcSpeed}
                      onChange={(e) => setCalcSpeed(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 border-gray-600 focus:ring-0 bg-transparent"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">Speed & Core Web Vitals Optimization</p>
                      <p className="text-[10px] text-gray-400">Sub-second loading, image WebP compression & edge caching</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                    <input
                      type="checkbox"
                      checked={calcSeo}
                      onChange={(e) => setCalcSeo(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 border-gray-600 focus:ring-0 bg-transparent"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">Technical & Local On-Page SEO</p>
                      <p className="text-[10px] text-gray-400">Meta tags, OpenGraph, JSON-LD Schema & XML sitemap generation</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                    <input
                      type="checkbox"
                      checked={calcWhatsApp}
                      onChange={(e) => setCalcWhatsApp(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-500 border-gray-600 focus:ring-0 bg-transparent"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white">Instant WhatsApp & CRM Lead Sync</p>
                      <p className="text-[10px] text-gray-400">Direct lead notifications and automated WhatsApp routing</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Scope Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#12141C] to-[#0A0B10] border border-orange-500/25 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Turnaround Timeline
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold flex items-center gap-1">
                    <Clock size={12} /> {est.days}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Recommended Architecture
                  </p>
                  <p className="text-sm font-bold text-orange-400 font-mono">
                    {est.stack}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Included in Your Scope:
                  </p>
                  {est.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check size={13} className="text-orange-400 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      serviceType:
                        calcType === "landing"
                          ? "PPC Landing Page"
                          : calcType === "business"
                          ? "Corporate Business Website"
                          : calcType === "ecommerce"
                          ? "E-Commerce Storefront"
                          : "Custom Web Application",
                      projectScope: `${calcPages} pages, ${est.days} estimated timeline`,
                    }));
                    setModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Custom Proposal ↗</span>
                </button>
                <p className="text-[11px] text-center text-gray-500">
                  Prompt consultation & customized scope delivered by our web team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. HIGH-CONVERSION WEB BLUEPRINT                              */}
      {/* ============================================================== */}
      <section id="architecture" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090A0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase">
              Engineered For Real Conversions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              The High-Conversion Web Blueprint
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Why Koop India websites outperform standard generic templates. Explore our 6 architectural pillars engineered to turn paid Google ad clicks into real, qualified business inquiries.
            </p>
          </div>

          {/* Interactive 6-Pillar Tab Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-white/[0.02] border border-white/10">
            {architecturePillars.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(idx)}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-b from-orange-500/20 to-orange-500/5 border border-orange-500 text-white shadow-lg shadow-orange-500/10"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-bold leading-tight">
                    {p.title.split(" ")[0]} {p.title.split(" ")[1] || ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep-Dive Display Card */}
          {(() => {
            const current = architecturePillars[activePillar] || architecturePillars[0];
            const Icon = current.icon;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl">
                {/* Glow accent */}
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left Details */}
                <div className="lg:col-span-7 space-y-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {current.badge}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        Pillar 0{activePillar + 1} of 06
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-3">
                      <Icon className="text-orange-400 flex-shrink-0" size={24} />
                      <span>{current.title}</span>
                    </h3>

                    <p className="text-xs font-semibold text-orange-400/90 font-mono">
                      {current.tagline}
                    </p>

                    <p className="text-sm text-gray-300 leading-relaxed pt-1">
                      {current.desc}
                    </p>
                  </div>

                  {/* Feature checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Technical Implementation:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-orange-400 flex-shrink-0 mt-0.5"
                          />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setFormData((p) => ({
                          ...p,
                          details: `Interested in Web Architecture: ${current.title}`,
                        }));
                        setModalOpen(true);
                      }}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Request This Blueprint for Your Business</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Metrics & Live Benchmark Card */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#0E1017] border border-white/10 rounded-2xl p-6 sm:p-7 relative z-10 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Verified Benchmark
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {current.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center space-y-1"
                        >
                          <p className="text-lg sm:text-xl font-black text-orange-400">
                            {m.val}
                          </p>
                          <p className="text-[10px] text-gray-400 font-semibold leading-tight">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Comparison Mini Box */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Standard Template vs Koop Platform:
                      </p>
                      <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <span className="text-gray-400">Standard Templates:</span>
                        <span className="text-red-400 font-bold">Failed / Bloated</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1">
                        <span className="text-white font-semibold">Koop India Build:</span>
                        <span className="text-emerald-400 font-bold">100% Optimized</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                    <p className="text-xs font-bold text-orange-400">
                      Standard in Every Koop India Build
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Zero generic templates. Zero recurring platform licensing fees.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Side-by-Side Visual Transformation: Template vs Koop India Platform */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* The Old Way / Generic Templates */}
            <div className="rounded-2xl bg-white/[0.01] border border-red-500/20 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black uppercase tracking-wider">
                  THE COMMON PITFALL
                </span>
                <span className="text-xs font-mono text-red-400">68% Drop-off</span>
              </div>
              <h4 className="text-xl font-bold text-white">
                Generic Templates & Bloated Builders
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Most businesses use slow WordPress themes, heavy page builders, or cheap freelance templates that waste their Google Ads investment.
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-400">
                <div className="flex items-center gap-2 text-red-400">
                  <span>✕</span>
                  <span>5.8s - 8.2s average mobile load time</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <span>✕</span>
                  <span>40+ bloated plugin scripts and CSS overhead</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <span>✕</span>
                  <span>Generic forms that send inquiries into spam folders</span>
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <span>✕</span>
                  <span>Poor Google Quality Scores leading to higher cost-per-click</span>
                </div>
              </div>
            </div>

            {/* The Koop India High-Performance Way */}
            <div className="rounded-2xl bg-gradient-to-b from-orange-500/10 to-[#10121A] border-2 border-orange-500/50 p-6 sm:p-7 space-y-4 relative shadow-xl shadow-orange-500/10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider">
                  THE KOOP ADVANTAGE
                </span>
                <span className="text-xs font-mono text-emerald-400">+240% Lift</span>
              </div>
              <h4 className="text-xl font-bold text-white">
                Koop India Custom Web Engineering
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Handcrafted with Next.js 14, Tailwind CSS, and edge caching for sub-second page loads, instant WhatsApp routing, and higher ad ROI.
              </p>
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-gray-200">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check size={14} />
                  <span>Fast sub-second loading with high PageSpeed score focus</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check size={14} />
                  <span>Direct 1-click WhatsApp & instant CRM lead synchronization</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check size={14} />
                  <span>High semantic relevancy boosting Google Ads Quality Scores</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check size={14} />
                  <span>100% full source code and intellectual property ownership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TAILORED WEB SOLUTIONS (NO PRICING - Fully Custom Quotes)   */}
      {/* ============================================================== */}
      <section id="solutions" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090A0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase">
              Project Delivery Tiers
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Tailored Solutions for Ambitious Brands
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Every build includes 100% custom UI/UX design, mobile responsiveness, fast cloud hosting setup, and dedicated engineer support.
            </p>
          </div>

          {/* 3 Solution Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                  TIER 01 • HIGH CONVERSION
                </span>
                <h3 className="text-2xl font-black text-white">
                  PPC & Ads Landing Page
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Engineered specifically for Google Ads and paid campaigns. Laser-focused on lead capture, sub-second speed, and high quality score.
                </p>

                <div className="py-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300">
                  <span>Turnaround Time:</span>
                  <span className="text-orange-400 font-bold">3 - 5 Business Days</span>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Single-Page Conversion Layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Direct WhatsApp & Phone Click Routing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Google Ads Tag & UTM Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Speed & Core Web Vitals Optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>14 Days Post-Launch Support</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData((p) => ({ ...p, serviceType: "PPC & Ads Landing Page" }));
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Request Landing Page Scope ↗
              </button>
            </div>

            {/* Tier 2 (Highlighted) */}
            <div className="rounded-2xl bg-gradient-to-b from-orange-500/10 via-[#12141D] to-[#0A0B10] border-2 border-orange-500 p-7 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-orange-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                MOST POPULAR
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-orange-400">
                  TIER 02 • FULL SUITE
                </span>
                <h3 className="text-2xl font-black text-white">
                  Corporate Business Website
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Full-fledged multi-page company website designed in Figma, built with Next.js, and structured to establish market authority and generate B2B/B2C inquiries.
                </p>

                <div className="py-2 px-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between text-xs font-semibold text-gray-200">
                  <span>Turnaround Time:</span>
                  <span className="text-orange-400 font-bold">5 - 8 Business Days</span>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-gray-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>5 to 8 Custom Responsive Pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>CMS Integration for Easy Content Edits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Full SEO Schema & Meta Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Interactive Contact & Quote Forms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Domain, SSL & Corporate Email Setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>30 Days Post-Launch Maintenance</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData((p) => ({ ...p, serviceType: "Corporate Business Website" }));
                  setModalOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 transition-all cursor-pointer"
              >
                Request Corporate Scope ↗
              </button>
            </div>

            {/* Tier 3 */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                  TIER 03 • ENTERPRISE & SALES
                </span>
                <h3 className="text-2xl font-black text-white">
                  E-Commerce & Custom App
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Complete online store or bespoke web application. Payment gateway integrations, inventory, user accounts, and high-volume scalability.
                </p>

                <div className="py-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300">
                  <span>Turnaround Time:</span>
                  <span className="text-orange-400 font-bold">10 - 15 Business Days</span>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-white/5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Comprehensive Product Catalog & Custom Filters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Razorpay / Cashfree / Stripe Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Automated WhatsApp Invoicing Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>User Auth & Order History Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-orange-400 flex-shrink-0" />
                    <span>Dedicated Developer Support</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData((p) => ({ ...p, serviceType: "E-Commerce & Custom App" }));
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Request E-Commerce Scope ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. COMPARISON MATRIX (Koop India vs Freelancers vs Agencies)   */}
      {/* ============================================================== */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why Ambitious Brands Choose Koop India
            </h2>
            <p className="text-gray-400 text-sm">
              See how our engineering-first team compares to traditional agencies and unreliable freelancers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Feature / Standard</th>
                  <th className="py-4 px-4 text-orange-400 bg-orange-500/10 rounded-t-xl font-extrabold">
                    KOOP INDIA
                  </th>
                  <th className="py-4 px-4 text-gray-400">Freelancers</th>
                  <th className="py-4 px-4 text-gray-400">Traditional Agencies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Core Web Vitals & Speed Focus</td>
                  <td className="py-3.5 px-4 text-orange-400 bg-orange-500/5 font-bold">90+ High Speed Target</td>
                  <td className="py-3.5 px-4 text-gray-500">Often &lt; 50 (Slow)</td>
                  <td className="py-3.5 px-4 text-gray-400">60-80 Average</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Turnaround Delivery Speed</td>
                  <td className="py-3.5 px-4 text-orange-400 bg-orange-500/5 font-bold">3 - 7 Business Days</td>
                  <td className="py-3.5 px-4 text-gray-500">Unpredictable delays</td>
                  <td className="py-3.5 px-4 text-gray-400">4 to 8 Weeks</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Code & Asset Ownership</td>
                  <td className="py-3.5 px-4 text-orange-400 bg-orange-500/5 font-bold">100% Client Ownership</td>
                  <td className="py-3.5 px-4 text-gray-400">Partial / Unclear</td>
                  <td className="py-3.5 px-4 text-gray-500">Locked to agency servers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Direct WhatsApp / CRM Lead Routing</td>
                  <td className="py-3.5 px-4 text-orange-400 bg-orange-500/5 font-bold">Built-In Standard</td>
                  <td className="py-3.5 px-4 text-gray-500">Requires extra cost</td>
                  <td className="py-3.5 px-4 text-gray-400">Basic email forms only</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Post-Launch Developer Support</td>
                  <td className="py-3.5 px-4 text-orange-400 bg-orange-500/5 font-bold">Dedicated Direct Support (Mon - Sat)</td>
                  <td className="py-3.5 px-4 text-gray-500">Ghosting after payment</td>
                  <td className="py-3.5 px-4 text-gray-400">Costly retainers required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. 4-STEP AGILE DELIVERY PROCESS                               */}
      {/* ============================================================== */}
      <section id="process" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0A0B10]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase">
              How We Deliver
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              From Concept to Launch in 4 Steps
            </h2>
            <p className="text-gray-400 text-sm">
              A streamlined, transparent development sprint designed to launch fast without compromising code quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Blueprint",
                desc: "We analyze your business goals, target audience, and competition to architect an optimized sitemap and wireframe.",
              },
              {
                step: "02",
                title: "Conversion UI/UX Design",
                desc: "We craft custom, high-fidelity UI designs in Figma tailored to your brand identity, emphasizing high visual trust.",
              },
              {
                step: "03",
                title: "Modern Web Engineering",
                desc: "We develop your site using Next.js and Tailwind CSS with sub-second speeds, mobile responsiveness, and clean semantic code.",
              },
              {
                step: "04",
                title: "Testing, SEO & Launch",
                desc: "Rigorous PageSpeed optimization, lead form testing, domain DNS mapping, and Google Search Console indexing.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all space-y-3 relative overflow-hidden"
              >
                <span className="text-3xl font-black text-white/10 font-mono">
                  {p.step}
                </span>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. FAST LEAD CAPTURE FORM SECTION (Direct to CRM & Firestore) */}
      {/* ============================================================== */}
      <section id="contact" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 text-center max-w-xl mx-auto mb-8">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider">
                Direct Engineering Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ready to Build Your Website?
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Speak directly with our web engineering team. Get a detailed technical scope and proposal tailored to your business.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Project Inquiry Received!</h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  Thank you, <span className="text-orange-400 font-bold">{formData.name}</span>. Our senior web architect will review your requirements and connect with you shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmitLead(e, "google_ads_website_development")} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm placeholder:text-gray-400 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm placeholder:text-gray-400 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Business or Brand Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter company or business name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm placeholder:text-gray-400 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm placeholder:text-gray-400 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Website Service Needed
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm outline-none transition"
                    >
                      <option value="Corporate Business Website">Corporate Business Website</option>
                      <option value="Google Ads / PPC Landing Page">Google Ads / PPC Landing Page</option>
                      <option value="E-Commerce Store">E-Commerce Store</option>
                      <option value="Custom Web Application">Custom Web Application / Portal</option>
                      <option value="Website Redesign & Speed Optimization">Website Redesign & Speed 90+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                      Project Scope & Timeline
                    </label>
                    <select
                      name="projectScope"
                      value={formData.projectScope}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm outline-none transition"
                    >
                      <option value="New Website from Scratch">New Website from Scratch</option>
                      <option value="Existing Website Redesign">Existing Website Redesign</option>
                      <option value="Urgent Launch (Within 5 Days)">Urgent Launch (Within 5 Days)</option>
                      <option value="Standard Launch (Within 2 Weeks)">Standard Launch (Within 2 Weeks)</option>
                      <option value="Custom Long-Term Web Platform">Custom Long-Term Web Platform</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                    Project Requirements / Reference Websites
                  </label>
                  <textarea
                    name="details"
                    rows={3}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe your requirements, preferred timeline, or paste reference links..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs sm:text-sm placeholder:text-gray-400 outline-none transition resize-none"
                  />
                </div>

                {submitError && (
                  <p className="text-red-400 text-xs font-bold">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Your Requirements...</span>
                  ) : (
                    <>
                      <span>Get Free Project Scope & Consultation ↗</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500 pt-1">
                  🔒 Strictly Confidential. No spam, ever. Leads stored directly in Koop India CRM.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FAQ ACCORDION                                              */}
      {/* ============================================================== */}
      <section id="faqs" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0A0B10]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm">
              Clear answers to the most common questions regarding our web development process.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-orange-400 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-gray-400 ${
                      openFaq === i ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. BOTTOM CTA BANNER                                          */}
      {/* ============================================================== */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent blur-3xl -z-10" />
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Stop Losing Ad Clicks to Slow, Outdated Websites.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Talk directly with our web engineering team. Get a comprehensive technical scope, clear turnaround timeline, and tailored strategy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get Your Custom Web Proposal</span>
              <ArrowRight size={15} />
            </button>
            <a
              href={`tel:${RAW_PHONE}`}
              className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2"
            >
              <Phone size={15} className="text-orange-400" />
              <span>Call {PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 13. FOOTER (Official Koop India Logo + Dark Theme)             */}
      {/* ============================================================== */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#060709] text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Main Header Koop India Logo */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight cursor-pointer"
              aria-label="Koop India"
            >
              <span className="text-orange-500">koop</span>
              <span className="text-white">india</span>
              <span className="text-orange-500">.</span>
            </button>
            <p className="text-gray-400 text-center sm:text-left">
              High-Performance Web Development • Koop India
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "services")}
              className="hover:text-white transition cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "architecture")}
              className="hover:text-white transition cursor-pointer"
            >
              Blueprint
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "estimator")}
              className="hover:text-white transition cursor-pointer"
            >
              Estimator
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "solutions")}
              className="hover:text-white transition cursor-pointer"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={(e) => scrollToSection(e, "faqs")}
              className="hover:text-white transition cursor-pointer"
            >
              FAQs
            </button>
            <a href={`tel:${RAW_PHONE}`} className="text-orange-400 hover:underline">
              {PHONE_NUMBER}
            </a>
          </div>

          <p className="text-gray-600">
            © {new Date().getFullYear()} Koop India. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 14. MOBILE STICKY CONTACT BAR                                   */}
      {/* ============================================================== */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0B10]/95 backdrop-blur-lg border-t border-white/10 p-2.5 flex items-center gap-2">
        <a
          href={`tel:${RAW_PHONE}`}
          className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <Phone size={13} className="text-orange-400" />
          <span>Call Now</span>
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30"
        >
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => setModalOpen(true)}
          className="flex-[1.4] py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs shadow-md shadow-orange-500/30 flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Quote ↗</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 15. QUICK QUOTE POPUP MODAL (Zero Pricing, Direct to CRM)      */}
      {/* ============================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0E1017] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            {/* Close Button */}
            <button
              onClick={() => {
                setModalOpen(false);
                setSubmitSuccess(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="space-y-1.5 pr-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                Direct Web Architect Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Request a Custom Website Proposal
              </h3>
              <p className="text-xs text-gray-400">
                Share your requirements. We will review your goals and deliver a detailed technical scope promptly.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
                <p className="text-gray-300 text-xs">
                  Your inquiry has been recorded. Our web team will contact you shortly during business hours.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-orange-500 text-white font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmitLead(e, "google_ads_webdev_popup")} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs placeholder:text-gray-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs placeholder:text-gray-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs placeholder:text-gray-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                      Project Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141722] border border-white/15 focus:border-orange-500 text-white text-xs outline-none"
                    >
                      <option value="Corporate Business Website">Corporate Business Website</option>
                      <option value="Google Ads / PPC Landing Page">PPC Landing Page</option>
                      <option value="E-Commerce Store">E-Commerce Store</option>
                      <option value="Custom Web App">Custom Web App</option>
                      <option value="Website Redesign">Website Redesign</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                      Target Scope
                    </label>
                    <select
                      name="projectScope"
                      value={formData.projectScope}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141722] border border-white/15 focus:border-orange-500 text-white text-xs outline-none"
                    >
                      <option value="New Website from Scratch">New Website from Scratch</option>
                      <option value="Existing Website Redesign">Existing Redesign</option>
                      <option value="Urgent Launch (Within 5 Days)">Urgent (Within 5 Days)</option>
                      <option value="Standard Launch (Within 2 Weeks)">Standard (Within 2 Weeks)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1 uppercase tracking-wider">
                    Project Notes / Preferred Launch Date
                  </label>
                  <textarea
                    name="details"
                    rows={2}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe your requirements, preferred timeline, or reference links..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 text-white text-xs placeholder:text-gray-400 outline-none resize-none"
                  />
                </div>

                {submitError && (
                  <p className="text-red-400 text-xs font-semibold">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Project Scope ↗"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
