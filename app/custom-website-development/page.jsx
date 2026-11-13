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
  Briefcase,
  Building2,
  Factory,
  RefreshCw,
  Store,
  X,
  Menu,
  AlertCircle,
} from "lucide-react";

const PHONE_NUMBER = "+91 95998 26131";
const RAW_PHONE = "919599826131";
const WHATSAPP_LINK = `https://wa.me/${RAW_PHONE}?text=Hi%20Koop%20India,%20I%20am%20interested%20in%20Website%20Development.%20Please%20share%20details%20and%20project%20scope.`;

export default function CustomWebsiteDevelopmentLanding() {
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
    serviceType: "Business Websites",
    projectScope: "New Website from Scratch",
    details: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Live Scope & Timeline Estimator State (Zero Pricing)
  const [calcType, setCalcType] = useState("business");
  const [calcPages, setCalcPages] = useState("5-8");
  const [calcSpeed, setCalcSpeed] = useState(true);
  const [calcSeo, setCalcSeo] = useState(true);
  const [calcWhatsApp, setCalcWhatsApp] = useState(true);

  // Helper to extract clean 10-digit Indian phone number
  const getCleanPhone = (phoneStr) => {
    if (!phoneStr) return "";
    let cleaned = phoneStr.replace(/\D/g, "");
    if (cleaned.startsWith("91") && cleaned.length > 10) {
      cleaned = cleaned.slice(2);
    }
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.replace(/^0+/, "");
    }
    return cleaned;
  };

  const isValidPhone = (phoneStr) => {
    const cleaned = getCleanPhone(phoneStr);
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const isValidEmail = (emailStr) => {
    if (!emailStr || !emailStr.trim()) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailStr.trim());
  };

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  // Dedicated phone input change handler allowing numbers, +, space, hyphen
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^\d+\s()-]/g, "");
    setFormData((prev) => ({ ...prev, phone: val }));
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: "" }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const handlePhoneBlur = () => {
    if (!formData.phone.trim()) return;
    if (!isValidPhone(formData.phone)) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit mobile number.",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleEmailBlur = () => {
    if (!formData.email.trim()) return;
    if (!isValidEmail(formData.email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address (e.g. rahul@company.com).",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Submit Lead to Firestore CRM (uses shared addEnquiry)
  const handleSubmitLead = async (e, sourceName = "google_ads_website_development") => {
    if (e) e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    const cleanedPhone = getCleanPhone(formData.phone);
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (!isValidEmail(emailTrimmed)) {
      newErrors.email = "Enter a valid email address (e.g. rahul@company.com).";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      setSubmitError("Please fill in a valid 10-digit mobile number and email address to proceed.");
      return;
    }

    setFormErrors({ name: "", phone: "", email: "" });
    setSubmitting(true);
    setSubmitError("");

    try {
      await addEnquiry({
        name: formData.name.trim(),
        displayName: formData.name.trim(),
        company: formData.company.trim() || formData.name.trim(),
        displayCompany: formData.company.trim() || formData.name.trim(),
        phone: cleanedPhone,
        mobile: cleanedPhone,
        displayPhone: cleanedPhone,
        email: emailTrimmed,
        displayEmail: emailTrimmed,
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

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Website Development Google Ads",
          value: 1,
        });
      }

      setSubmitSuccess(true);
      setSubmitting(false);
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        serviceType: "Business Websites",
        projectScope: "New Website from Scratch",
        details: "",
      });
    } catch (err) {
      console.error("Failed to submit lead:", err);
      setSubmitError("Something went wrong. Please call or WhatsApp us directly.");
      setSubmitting(false);
    }
  };

  const getEstimation = () => {
    let days = "5-7 Business Days";
    let stack = "Next.js 14 + Tailwind CSS + Vercel Cloud";
    let highlights = [
      "Sub-second load times (< 1.2s)",
      "100% Mobile & Tablet Responsive",
      "Lead Capture & WhatsApp Routing",
    ];

    if (calcType === "business") {
      days = "5-7 Business Days";
      stack = "Next.js 14 + Tailwind CSS + CMS Integration";
      highlights = [
        "Polished online presence for startups",
        "Direct lead inquiry routing to CRM",
        "100% Mobile & Tablet Responsive",
      ];
    } else if (calcType === "ecommerce") {
      days = "10-14 Business Days";
      stack = "Shopify / Next.js Commerce + Razorpay / UPI";
      highlights = [
        "Product catalogues & custom category filters",
        "Shopping cart & payment-ready checkout",
        "Automated WhatsApp order notifications",
      ];
    } else if (calcType === "corporate") {
      days = "7-10 Business Days";
      stack = "Next.js + Tailwind CSS + Headless CMS";
      highlights = [
        "Corporate company profile & leadership hierarchy",
        "Compliance & investor documentation pages",
        "Domain, SSL & corporate email setup",
      ];
    } else if (calcType === "manufacturing") {
      days = "8-12 Business Days";
      stack = "Next.js + Tailwind CSS + B2B Product Catalog";
      highlights = [
        "Showcase products, specs & certifications",
        "Direct RFQ & buyer/distributor inquiry routing",
        "Downloadable product catalog & technical spec sheets",
      ];
    } else if (calcType === "landing") {
      days = "3-5 Business Days";
      stack = "Next.js / HTML5 + Tailwind + High-Converting Copy";
      highlights = [
        "Focused, campaign-ready page for Google Ads",
        "Sub-second load times & Core Web Vitals optimized",
        "1-click WhatsApp & instant CRM lead sync",
      ];
    } else if (calcType === "redesign") {
      days = "4-7 Business Days";
      stack = "Modern Next.js 14 Overhaul + Edge CDN";
      highlights = [
        "Modern visual elegance & layout restructuring",
        "Speed overhaul replacing slow bloated code",
        "Preserve existing Google SEO with 301 redirects",
      ];
    } else if (calcType === "shopify") {
      days = "5-8 Business Days";
      stack = "Shopify OS 2.0 + Liquid + Razorpay / UPI";
      highlights = [
        "Custom Shopify theme & conversion layout",
        "Payment gateway & automated shipping setup",
        "Inventory tracking & WhatsApp order sync",
      ];
    } else if (calcType === "wordpress") {
      days = "4-7 Business Days";
      stack = "WordPress + Custom Theme + LiteSpeed Cache";
      highlights = [
        "Easy drag-and-drop CMS management",
        "Lightweight speed optimization & security",
        "Full on-page SEO & contact enquiry forms",
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

    return { days, stack, highlights };
  };

  const est = getEstimation();

  const services = [
    {
      num: "01",
      id: "business",
      title: "Business Websites",
      category: "GROWTH & STARTUPS",
      desc: "A polished online presence for startups, consultants and growing businesses.",
      features: [
        "Custom responsive UI designed in Figma",
        "Clear service offerings & authority positioning",
        "Direct WhatsApp & instant lead inquiry forms",
        "Fast mobile loading & standard SSL setup",
      ],
      icon: Briefcase,
    },
    {
      num: "02",
      id: "ecommerce",
      title: "E-commerce Websites",
      category: "ONLINE SALES",
      desc: "Product catalogues, shopping carts and payment-ready storefront experiences.",
      features: [
        "Razorpay, Cashfree & UPI instant checkout",
        "Product catalog with custom filters & categories",
        "Mobile-first friction-free shopping cart",
        "Automated WhatsApp order confirmation alerts",
      ],
      icon: ShoppingBag,
    },
    {
      num: "03",
      id: "corporate",
      title: "Corporate Websites",
      category: "ENTERPRISE & TRUST",
      desc: "Build credibility with a clear company profile, services and business information.",
      features: [
        "Multi-page corporate architecture & leadership profile",
        "Investor, governance & compliance documentation sections",
        "Integrated CMS for effortless internal updates",
        "Custom domain, SSL & corporate email setup",
      ],
      icon: Building2,
    },
    {
      num: "04",
      id: "manufacturing",
      title: "Manufacturing Websites",
      category: "B2B & INDUSTRIAL",
      desc: "Showcase products, capabilities and certifications to reach buyers and distributors.",
      features: [
        "Machinery specs, factory capacity & ISO/ISI badge display",
        "Bulk quote (RFQ) & distributor enquiry routing",
        "Downloadable product spec sheets & PDF catalogs",
        "Geographic distributor & buyer network mapping",
      ],
      icon: Factory,
    },
    {
      num: "05",
      id: "landing-pages",
      title: "Landing Pages",
      category: "GOOGLE ADS & PPC",
      desc: "Focused, campaign-ready pages designed to turn visitors into enquiries.",
      features: [
        "Single-minded conversion layout matching ad keywords",
        "Sub-second load times for higher Google Ad Quality Score",
        "1-click WhatsApp & call action drawers",
        "UTM parameter tracking & Google Ads conversion tags",
      ],
      icon: Zap,
    },
    {
      num: "06",
      id: "website-redesign",
      title: "Website Redesign",
      category: "PERFORMANCE & UX",
      desc: "Give an outdated website a modern look, better structure and improved usability.",
      features: [
        "Full UI/UX refresh with modern design standards",
        "Code overhaul replacing slow, bloated legacy plugins",
        "Preserve existing Google SEO rankings with 301 redirects",
        "Core Web Vitals & mobile responsiveness upgrade",
      ],
      icon: RefreshCw,
      highlight: true,
    },
    {
      num: "07",
      id: "shopify-websites",
      title: "Shopify Websites",
      category: "D2C & STOREFRONTS",
      desc: "Custom high-converting Shopify stores with theme development, app integrations, and fast checkouts.",
      features: [
        "Bespoke Shopify theme design & conversion UX",
        "Razorpay, Cashfree & UPI instant payment gateway",
        "Product variants, inventory & shipping rate setup",
        "Abandoned cart recovery & WhatsApp order sync",
      ],
      icon: Store,
    },
    {
      num: "08",
      id: "wordpress-websites",
      title: "WordPress Websites",
      category: "DYNAMIC CMS",
      desc: "Fast, flexible WordPress and WooCommerce websites with custom themes, zero bloat, and easy team editing.",
      features: [
        "Intuitive drag-and-drop CMS for effortless updates",
        "Custom lightweight theme with high-speed caching",
        "WooCommerce catalog & secure enquiry forms",
        "Full on-page SEO & security firewall setup",
      ],
      icon: Globe,
    },
  ];

  const sampleProjects = [
    {
      id: "jayfinsolimf",
      title: "Jay Finsol IMF",
      category: "CORPORATE & FINANCE",
      url: "https://jayfinsolimf.com/",
      domain: "jayfinsolimf.com",
      badge: "Financial & Insurance Portal",
      line1: "Corporate insurance & financial advisory portal for comparing Life, Health, and Mutual Fund plans.",
      line2: "Features streamlined POSP agent onboarding, advisor consultations, and direct inquiry capture.",
      tags: ["Corporate Portal", "Lead Routing", "POSP Onboarding", "Responsive UI"],
      icon: Building2,
    },
    {
      id: "trayojack",
      title: "Trayojack Connections",
      category: "MANUFACTURING & B2B",
      url: "https://trayojack.com/",
      domain: "trayojack.com",
      badge: "CCTV & Network Hardware",
      line1: "Specialized B2B industrial manufacturing platform for CCTV cables, fiber optics, and server racks.",
      line2: "Engineered with technical product specs, downloadable catalogs, and nationwide distributor RFQ routing.",
      tags: ["B2B Catalog", "Distributor RFQ", "Product Specs", "Fast Edge Delivery"],
      icon: Factory,
    },
    {
      id: "rishikeshherbs",
      title: "Rishikesh Herbs Natural",
      category: "E-COMMERCE & WELLNESS",
      url: "https://rishikeshherbsnatural.com/",
      domain: "rishikeshherbsnatural.com",
      badge: "D2C Ayurvedic Storefront",
      line1: "Direct-to-consumer (D2C) Ayurvedic wellness and joint pain relief e-commerce storefront.",
      line2: "Built with mobile-friendly product catalogs, GMP certification trust markers, and fast checkout flow.",
      tags: ["E-Commerce Store", "Payment Gateway", "WhatsApp Sync", "Mobile Optimized"],
      icon: ShoppingBag,
    },
    {
      id: "ezdoors",
      title: "EZDOORS",
      category: "ARCHITECTURAL & WOOD",
      url: "https://ezdoors.in/",
      domain: "ezdoors.in",
      badge: "Teak Wood Door Manufacturer",
      line1: "Premium architectural manufacturing website showcasing handcrafted Teak Wood and designer doors.",
      line2: "High-resolution design galleries, custom sizing inquiries, and digital catalogs for builders & homeowners.",
      tags: ["Architectural Showcase", "Custom Sizing RFQ", "High-Res Gallery", "Fast CDN"],
      icon: Layout,
    },
    {
      id: "katakirrmasale",
      title: "Katakirr Masale",
      category: "FMCG & FOOD BRAND",
      url: "https://katakirrmasale.com/",
      domain: "katakirrmasale.com",
      badge: "Authentic Spices & Blends",
      line1: "Authentic FMCG food brand platform presenting traditional Kolhapuri spices and blended powders.",
      line2: "Engineered to build customer brand trust while driving bulk distributor, dealer, and wholesale inquiries.",
      tags: ["Brand Identity", "Wholesale Inquiries", "Product Range", "WhatsApp Sync"],
      icon: Flame,
    },
  ];

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
      {/* 1. TOP STICKY HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090C]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
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

          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-gray-300">
            <button type="button" onClick={(e) => scrollToSection(e, "services")} className="hover:text-orange-400 transition-colors cursor-pointer">Services</button>
            <button type="button" onClick={(e) => scrollToSection(e, "projects")} className="hover:text-orange-400 transition-colors cursor-pointer">Live Work</button>
            <button type="button" onClick={(e) => scrollToSection(e, "architecture")} className="hover:text-orange-400 transition-colors cursor-pointer">Blueprint</button>
            <button type="button" onClick={(e) => scrollToSection(e, "estimator")} className="hover:text-orange-400 transition-colors cursor-pointer">Scope Estimator</button>
            <button type="button" onClick={(e) => scrollToSection(e, "solutions")} className="hover:text-orange-400 transition-colors cursor-pointer">Solutions</button>
            <button type="button" onClick={(e) => scrollToSection(e, "process")} className="hover:text-orange-400 transition-colors cursor-pointer">Process</button>
            <button type="button" onClick={(e) => scrollToSection(e, "faqs")} className="hover:text-orange-400 transition-colors cursor-pointer">FAQs</button>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a href={`tel:${RAW_PHONE}`} className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all">
              <Phone size={13} className="text-orange-400" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <button onClick={() => setModalOpen(true)} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Start Your Project</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen((p) => !p)} className="lg:hidden p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0B10] border-b border-white/10 px-5 py-6 space-y-4">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-gray-300">
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "services"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">Services</button>
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "projects"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">Live Work</button>
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "architecture"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">Web Blueprint</button>
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "estimator"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">Scope Estimator</button>
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "solutions"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">Solutions</button>
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "process"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">Process</button>
              <button type="button" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, "faqs"); }} className="py-1 text-left hover:text-orange-400 cursor-pointer">FAQs</button>
            </nav>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a href={`tel:${RAW_PHONE}`} className="w-full py-2.5 text-center rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2">
                <Phone size={14} className="text-orange-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
              <button onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }} className="w-full py-2.5 text-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-500/20">
                Start Your Project ↗
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] sm:h-[550px] bg-gradient-to-b from-orange-500/20 via-orange-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-orange-400">
                  HIGH-PERFORMANCE WEB ENGINEERING
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-white tracking-tight leading-[1.15]">
                Custom Websites <br className="hidden sm:block" />
                Engineered for <br className="hidden sm:block" />
                Higher Conversions &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 drop-shadow-[0_4px_24px_rgba(249,115,22,0.35)]">
                  Real Growth.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                We design, develop, and scale bespoke business websites, high-converting Google Ads landing pages, and fast e-commerce portals. Engineered for sub-second load times, high PageSpeed performance, and built-in lead generation.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button onClick={() => setModalOpen(true)} className="px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:scale-[1.02] transition-all flex items-center gap-2.5 cursor-pointer">
                  <span>Start Your Web Project</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </button>
                <button type="button" onClick={(e) => scrollToSection(e, "architecture")} className="px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer">
                  <span>Explore Web Blueprint</span>
                  <ArrowRight size={15} className="text-gray-400" />
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-gray-400">
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-orange-400" /><span>5-7 Day Delivery</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-orange-400" /><span>Speed & Core Web Vitals</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-orange-400" /><span>100% Code Ownership</span></div>
              </div>
            </div>

            {/* Laptop Mockup */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#0F1117] border border-white/15 p-2 shadow-2xl shadow-black/80">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#0B0D12] rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>koopindia.com/custom-website-development</span>
                  </div>
                  <div className="w-10" />
                </div>

                <div className="bg-[#08090E] p-4 sm:p-5 rounded-b-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center font-black text-xs text-white">K</div>
                      <span className="text-xs font-bold text-white tracking-wider">Koop India</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">Next.js + Shopify + WP</span>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Conversion Architecture</p>
                    <p className="text-lg sm:text-xl font-black text-white leading-tight">Engineered for Conversions. <br />Built to Scale Brands.</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed max-w-sm">Hand-crafted responsive code with sub-second page loads, integrated lead forms, and seamless analytics.</p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <span className="px-3 py-1.5 rounded-full bg-orange-500 text-white font-bold text-[10px]">Explore Scope ↗</span>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-semibold text-[10px]">View Live Demos</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-sm font-extrabold text-orange-400">90+</p>
                      <p className="text-[9px] text-gray-400">Web Vitals</p>
                    </div>
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-sm font-extrabold text-white">+240%</p>
                      <p className="text-[9px] text-gray-400">Leads</p>
                    </div>
                    <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-sm font-extrabold text-emerald-400">&lt; 1.0s</p>
                      <p className="text-[9px] text-gray-400">Load Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services, Projects, Estimator, Architecture, Solutions, Comparison, Process, Contact, FAQ Sections */}
      {/* 3. FOUR CORE STATS STRIP */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0A0B10]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0"><Users size={22} /></div>
            <div><p className="text-2xl font-black text-white">100+</p><p className="text-xs text-gray-400">Projects Delivered</p></div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0"><Layout size={22} /></div>
            <div><p className="text-2xl font-black text-white">8</p><p className="text-xs text-gray-400">Website Stacks</p></div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0"><ShieldCheck size={22} /></div>
            <div><p className="text-2xl font-black text-white">100%</p><p className="text-xs text-gray-400">Code Ownership</p></div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0"><Clock size={22} /></div>
            <div><p className="text-2xl font-black text-white">3-5 Days</p><p className="text-xs text-gray-400">Fast Delivery</p></div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase">Website Specializations</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">Types of Websites We Build</h2>
            <p className="text-gray-400 text-sm">Shopify D2C stores, WordPress CMS, manufacturing catalogs, corporate portals, and PPC landing pages.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div key={srv.id} className="rounded-2xl p-6 bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-gray-500">{srv.num}</span>
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center"><Icon size={20} /></div>
                    </div>
                    <div><h3 className="text-lg font-bold text-white">{srv.title}</h3><p className="text-xs text-gray-300 mt-1">{srv.desc}</p></div>
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {srv.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-gray-300"><CheckCircle2 size={12} className="text-orange-400 mt-0.5" /><span>{f}</span></div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => { setFormData(p => ({ ...p, serviceType: srv.title })); setModalOpen(true); }} className="mt-5 text-xs font-bold text-orange-400 hover:underline flex items-center gap-1 cursor-pointer">
                    Discuss this service <ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Work */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090A0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase">Recent Client Deliveries</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Live Client Deliveries</h2>
            <p className="text-gray-400 text-sm">Explore live websites built by our team across different industries.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleProjects.map((proj) => (
              <div key={proj.id} className="rounded-2xl p-6 bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400">● LIVE SITE</span>
                    <span className="text-xs font-mono text-gray-400">{proj.domain}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{proj.line1}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{proj.line2}</p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-400 hover:underline flex items-center gap-1">
                    Visit Site <ExternalLink size={12} />
                  </a>
                  <button onClick={() => { setFormData(p => ({ ...p, details: `Similar to ${proj.title}` })); setModalOpen(true); }} className="text-xs text-gray-400 hover:text-white cursor-pointer">
                    Get Similar Build ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase">Direct Consultation</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Get a Custom Website Proposal</h2>
            <p className="text-gray-400 text-xs sm:text-sm">Speak with our web engineering team and get an exact scope and quote.</p>
          </div>

          {submitSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
              <p className="text-gray-300 text-xs">Our team will contact you shortly.</p>
              <button onClick={() => setSubmitSuccess(false)} className="px-5 py-2 rounded-full bg-orange-500 text-white font-bold text-xs mt-2 cursor-pointer">
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmitLead(e, "google_ads_website_development")} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Rahul Sharma" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                  {formErrors.name && <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Phone Number (WhatsApp) *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handlePhoneChange} onBlur={handlePhoneBlur} maxLength={14} placeholder="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                  {formErrors.phone && <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Company / Brand Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your Brand Name" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} placeholder="rahul@company.com" className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                  {formErrors.email && <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Service Type</label>
                  <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-[#141722] border border-white/15 text-white text-xs outline-none">
                    <option value="Business Websites">Business Websites</option>
                    <option value="E-commerce Websites">E-commerce Websites</option>
                    <option value="Corporate Websites">Corporate Websites</option>
                    <option value="Manufacturing Websites">Manufacturing Websites</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Shopify Websites">Shopify Websites / Stores</option>
                    <option value="WordPress Websites">WordPress Websites / CMS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Project Scope</label>
                  <select name="projectScope" value={formData.projectScope} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl bg-[#141722] border border-white/15 text-white text-xs outline-none">
                    <option value="New Website from Scratch">New Website from Scratch</option>
                    <option value="Existing Website Redesign">Existing Redesign</option>
                    <option value="Urgent Launch (Within 5 Days)">Urgent (Within 5 Days)</option>
                    <option value="Standard Launch (Within 2 Weeks)">Standard (Within 2 Weeks)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Project Notes / Requirements</label>
                <textarea name="details" rows={2} value={formData.details} onChange={handleChange} placeholder="Briefly describe what you need..." className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none resize-none" />
              </div>

              {submitError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{submitError}</div>
              )}

              <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                {submitting ? "Submitting..." : "Get Free Project Scope & Quote ↗"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0A0B10]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm">Clear answers about our development process, code ownership, and timelines.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-sm text-white hover:text-orange-400 cursor-pointer">
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openFaq === i ? "rotate-180 text-orange-400" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-2">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/10 bg-[#060709] text-xs text-gray-500 text-center">
        <p>© {new Date().getFullYear()} Koop India. Custom Website Development & Google Ads Solutions.</p>
      </footer>

      {/* Popup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0E1017] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button onClick={() => { setModalOpen(false); setSubmitSuccess(false); setSubmitError(""); setFormErrors({ name: "", phone: "", email: "" }); }} className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white cursor-pointer" aria-label="Close modal">
              <X size={18} />
            </button>
            <div>
              <h3 className="text-xl font-black text-white">Start Your Project</h3>
              <p className="text-xs text-gray-400 mt-1">Get custom quote & turnaround timeline in 24 hours.</p>
            </div>
            {submitSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-gray-400">Our web architect will connect with you shortly.</p>
                <button onClick={() => { setSubmitSuccess(false); setModalOpen(false); }} className="px-5 py-2 rounded-full bg-orange-500 text-white font-bold text-xs mt-2 cursor-pointer">Close</button>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmitLead(e, "google_ads_webdev_popup")} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Rahul Sharma" className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                  {formErrors.name && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.name}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1">Phone *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handlePhoneChange} onBlur={handlePhoneBlur} maxLength={14} placeholder="+91 98765 43210" className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                    {formErrors.phone && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} placeholder="rahul@company.com" className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs outline-none focus:border-orange-500" />
                    {formErrors.email && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1">Type</label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/15 text-white text-xs outline-none">
                      <option value="Business Websites">Business Websites</option>
                      <option value="E-commerce Websites">E-commerce</option>
                      <option value="Shopify Websites">Shopify</option>
                      <option value="WordPress Websites">WordPress</option>
                      <option value="Landing Pages">Landing Page</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 mb-1">Timeline</label>
                    <select name="projectScope" value={formData.projectScope} onChange={handleChange} className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/15 text-white text-xs outline-none">
                      <option value="Urgent Launch (Within 5 Days)">Within 5 Days</option>
                      <option value="Standard Launch (Within 2 Weeks)">Within 2 Weeks</option>
                      <option value="New Website from Scratch">From Scratch</option>
                    </select>
                  </div>
                </div>
                {submitError && <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{submitError}</div>}
                <button type="submit" disabled={submitting} className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-500/25 cursor-pointer">
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
