"use client";

import { useState } from "react";
import Head from "next/head";
import { addEnquiry } from "@/lib/enquiryService";
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Store,
  FileText,
  Camera,
  Search,
  Package,
  Truck,
  Shield,
  Award,
  UserCheck,
  BookOpen,
  Edit3,
  Box,
  List,
  Phone,
} from "lucide-react";
import { useModal } from "@/context/ModalContext";

/* ─── JSON-LD Schema ─── */
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seller Onboarding Services — Amazon, Flipkart, JioMart, Myntra",
  description:
    "Complete marketplace seller registration and onboarding for Amazon, Flipkart, JioMart, Myntra and more. Product listing, catalog creation, GST guidance, brand registry and account management.",
  provider: { "@type": "Organization", name: "Koop India", url: "https://koopindia.com" },
  areaServed: { "@type": "Country", name: "India" },
  serviceType: [
    "Amazon Seller Registration",
    "Flipkart Seller Registration",
    "JioMart Seller Registration",
    "Myntra Seller Registration",
    "Marketplace Onboarding",
    "Product Listing Services",
    "Catalog Creation",
    "GST Guidance for Sellers",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I register as a seller on Amazon India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To register as an Amazon seller in India, you need a GST certificate, PAN card, bank account details, and a business address proof. Koop India handles the complete Amazon seller registration process online — from document collection to account activation.",
      },
    },
    {
      "@type": "Question",
      name: "What documents are required for Flipkart seller registration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flipkart seller registration requires GST Certificate, PAN Card, Cancelled Cheque, Bank Account Details, Aadhaar Card, Email ID, Mobile Number, and Business Address Proof. Brand Authorization Letter is also required for branded products.",
      },
    },
    {
      "@type": "Question",
      name: "How long does marketplace seller registration take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With Koop India's seller onboarding services, Amazon and Flipkart seller registration typically takes 3–7 working days from the time all documents are submitted. JioMart and Myntra onboarding may take 7–10 working days.",
      },
    },
  ],
};

/* ─── Sub-components ─── */
const SectionBadge = ({ children }) => (
  <span className="inline-block text-orange-500 text-[11px] font-bold tracking-widest uppercase mb-3">
    {children}
  </span>
);

export default function SellerOnboarding() {
  const { onOpenModal } = useModal();
  const [form, setForm] = useState({ name: "", mobile: "", company: "", service: "Seller Onboarding", source: "website" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      await addEnquiry(form);
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }
      setSuccessMsg("Thank you! We'll call you back shortly.");
      setForm({ name: "", mobile: "", company: "", service: "Seller Onboarding", source: "website" });
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Data ── */
  const marketplaceLogos = [
    { name: "amazon", color: "text-gray-800", accent: "text-[#FF9900]" },
    { name: "Flipkart", color: "text-[#2874F0]" },
    { name: "JioMart", color: "text-[#0066CC]" },
    { name: "Myntra", color: "text-[#FF3F6C]" },
    { name: "meesho", color: "text-[#9B3FBF]" },
    { name: "AJIO", color: "text-gray-900" },
    { name: "TATA CLiQ", color: "text-[#CC0000]" },
    { name: "snapdeal", color: "text-[#E40046]" },
  ];

  const services = [
    {
      logo: "A",
      logoBg: "bg-[#FF9900]",
      name: "Amazon",
      title: "Seller Registration",
      desc: "Complete seller registration, GST verification, catalog setup, and product listing with account activation",
      linkColor: "text-[#FF9900] hover:text-[#e68900]",
    },
    {
      logo: "f",
      logoBg: "bg-[#2874F0]",
      name: "Flipkart",
      title: "Seller Registration",
      desc: "Professional onboarding, seller account approval, shipping configuration and product optimization",
      linkColor: "text-[#2874F0] hover:text-[#1a5cc4]",
    },
    {
      logo: "J",
      logoBg: "bg-[#0066CC]",
      name: "JioMart",
      title: "Seller Registration",
      desc: "Register your business with JioMart and expand your retail reach across India",
      linkColor: "text-[#0066CC] hover:text-[#004fa3]",
    },
    {
      logo: "M",
      logoBg: "bg-[#FF3F6C]",
      name: "Myntra",
      title: "Seller Registration",
      desc: "Complete fashion marketplace onboarding including catalog approval and account activation",
      linkColor: "text-[#FF3F6C] hover:text-[#e0355e]",
    },
  ];

  const solutions = [
    { icon: <Store className="w-5 h-5" />, label: "Seller Registration" },
    { icon: <UserCheck className="w-5 h-5" />, label: "Account Setup" },
    { icon: <FileText className="w-5 h-5" />, label: "GST Guidance" },
    { icon: <Award className="w-5 h-5" />, label: "Brand Registry" },
    { icon: <Shield className="w-5 h-5" />, label: "Trademark Support" },
    { icon: <List className="w-5 h-5" />, label: "Product Listing" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Catalog Creation" },
    { icon: <Camera className="w-5 h-5" />, label: "Product Photography Guidance" },
    { icon: <Search className="w-5 h-5" />, label: "SEO Product Titles" },
    { icon: <Edit3 className="w-5 h-5" />, label: "Product Description Writing" },
    { icon: <Box className="w-5 h-5" />, label: "Inventory Setup" },
    { icon: <Truck className="w-5 h-5" />, label: "Shipping Configuration" },
  ];

  const steps = [
    { num: "01", label: "Free Consultation" },
    { num: "02", label: "Document Collection" },
    { num: "03", label: "Seller Registration" },
    { num: "04", label: "Marketplace Verification" },
    { num: "05", label: "Catalog Creation" },
    { num: "06", label: "Product Listing" },
    { num: "07", label: "Go Live" },
    { num: "08", label: "Growth Support" },
  ];

  const whyKoop = [
    "Marketplace Experts",
    "Dedicated Relationship Manager",
    "Affordable Pricing",
    "Complete Documentation Support",
    "Fast Turnaround Time",
    "PAN India Service",
    "Business Growth Experts",
    "Product Listing Experts",
  ];

  const documents = [
    "GST Certificate",
    "PAN Card",
    "Cancelled Cheque",
    "Bank Account Details",
    "Aadhaar Card",
    "Email ID",
    "Mobile Number",
    "Business Address Proof",
    "Trademark (Optional)",
    "Brand Authorization (If Applicable)",
  ];

  const packages = [
    { name: "Starter Package" },
    { name: "Professional Package" },
    { name: "Premium Package" },
  ];

  return (
    <>
      <Head>
        <title>
          Seller Onboarding Services | Amazon, Flipkart, JioMart, Myntra
          Registration | Koop India
        </title>
        <meta
          name="description"
          content="Start selling on India's top marketplaces with Koop India's complete seller onboarding services. Amazon, Flipkart, JioMart, Myntra seller registration, product listing, catalog creation & account management."
        />
        <meta
          name="keywords"
          content="Amazon seller registration, Flipkart seller registration, JioMart seller registration, Myntra seller registration, marketplace onboarding India, seller onboarding services, ecommerce seller registration, online selling India, marketplace account setup"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Koop India" />
        <link rel="canonical" href="https://koopindia.com/seller-onboarding" />
        <meta
          property="og:title"
          content="Seller Onboarding Services | Amazon, Flipkart, JioMart, Myntra | Koop India"
        />
        <meta
          property="og:description"
          content="Complete marketplace seller registration & onboarding for Amazon, Flipkart, JioMart, Myntra and more. Start selling online today with Koop India."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://koopindia.com/seller-onboarding"
        />
        <meta property="og:site_name" content="Koop India" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Seller Onboarding Services | Koop India"
        />
        <meta
          name="twitter:description"
          content="Amazon, Flipkart, JioMart & Myntra seller registration. Complete marketplace onboarding by Koop India experts."
        />
      </Head>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="font-sans text-gray-800 antialiased">
        <section
          className="relative overflow-hidden min-h-[82vh] flex flex-col justify-center px-6 pt-6 pb-8"
          style={{ background: "#0B1D3A" }}
        >
          {/* Full-background subtle dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Orange glow top-right */}
          <div
            className="absolute top-0 right-0 w-[550px] h-[550px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 65%)" }}
          />
          {/* Blue glow bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-[450px] h-[450px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(20,80,220,0.10) 0%, transparent 65%)" }}
          />

          <div className="relative max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">

              {/* ── LEFT: Heading + Text + Buttons ── */}
              <div>
                {/* Orange badge */}
                <span className="inline-flex items-center bg-orange-500 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-sm mb-6">
                  SELLER ONBOARDING SERVICES
                </span>

                <h1 className="text-4xl md:text-[2.8rem] font-black text-white leading-[1.1] tracking-tight mb-5">
                  Start Selling on India&apos;s
                  <span className="hidden md:inline"><br /></span>Top Marketplaces
                </h1>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
                  Launch your products on Amazon, Flipkart, JioMart, Myntra
                  &amp; other leading marketplaces with complete seller
                  registration, product listing, catalog creation and
                  account management.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={onOpenModal}
                    className="inline-flex items-center gap-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-md transition-all shadow-lg shadow-orange-500/30"
                  >
                    Get Free Consultation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onOpenModal}
                    className="inline-flex items-center gap-2 cursor-pointer border border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-md transition-all"
                  >
                    Talk To Expert
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── RIGHT: Dashboard mockup + Stacked marketplace badges ── */}
              <div className="relative flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-8 sm:gap-5 mt-12 lg:mt-0">

                {/* Dashboard card */}
                <div className="relative flex-shrink-0">
                  <div
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{ width: "300px", background: "#1A2744", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {/* Top bar */}
                    <div
                      className="flex items-center gap-3 px-4 py-2.5 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#13203A" }}
                    >
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400/70" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                        <div className="w-2 h-2 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex-1 bg-white/5 rounded text-center text-[8px] text-white/30 py-0.5">
                        Dashboard
                      </div>
                    </div>

                    {/* Sidebar + Content */}
                    <div className="flex" style={{ minHeight: "210px" }}>
                      {/* Sidebar */}
                      <div
                        className="w-20 border-r flex flex-col gap-0.5 py-3 px-1.5 flex-shrink-0"
                        style={{ borderColor: "rgba(255,255,255,0.05)", background: "#13203A" }}
                      >
                        {["Dashboard", "Orders", "Products", "Customers", "Reports", "Marketing"].map((item, i) => (
                          <div
                            key={item}
                            className="text-[7.5px] font-medium px-2 py-1.5 rounded"
                            style={{
                              color: i === 0 ? "white" : "rgba(255,255,255,0.4)",
                              background: i === 0 ? "rgba(255,107,0,0.28)" : "transparent",
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Main stats panel */}
                      <div className="flex-1 p-4">
                        <div className="text-[8px] text-white/40 mb-0.5">Total Sales</div>
                        <div className="text-xl font-black text-white mb-0.5">₹ 24,65,800</div>
                        <div className="text-[8px] text-green-400 font-bold mb-3">+32.6%</div>

                        {/* SVG Line chart */}
                        <div
                          className="h-14 rounded-lg mb-3 overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <svg viewBox="0 0 180 46" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGradHero" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0,42 C15,38 25,33 45,25 C65,17 80,30 98,20 C116,10 130,16 148,7 C162,2 172,4 180,1"
                              fill="none"
                              stroke="#60A5FA"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M0,42 C15,38 25,33 45,25 C65,17 80,30 98,20 C116,10 130,16 148,7 C162,2 172,4 180,1 L180,46 L0,46 Z"
                              fill="url(#chartGradHero)"
                            />
                          </svg>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 text-center">
                          <div>
                            <div className="text-[10px] font-black text-white">1,265</div>
                            <div className="text-[7px] text-white/30">Orders</div>
                          </div>
                          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                            <div className="text-[10px] font-black text-white">568</div>
                            <div className="text-[7px] text-white/30">Products</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-white">₹24.65L</div>
                            <div className="text-[7px] text-white/30">Revenue</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shopping items below dashboard */}
                  <div className="absolute -bottom-8 left-2 flex items-end gap-2 select-none pointer-events-none">
                    <span className="text-5xl drop-shadow-lg">🛒</span>
                    <span className="text-4xl drop-shadow-lg">🛍️</span>
                    <span className="text-3xl drop-shadow-lg">📦</span>
                  </div>
                </div>

                {/* Stacked marketplace badge cards — far right column */}
                <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
                  {/* Green upward arrow */}
                  <div className="flex justify-center mb-1">
                    <svg viewBox="0 0 28 44" width="24" height="38" className="opacity-90">
                      <line x1="14" y1="44" x2="14" y2="6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                      <polyline points="4,16 14,4 24,16" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>

                  {/* Amazon */}
                  <div
                    className="bg-white rounded-xl shadow-xl px-4 py-2.5 flex flex-col items-start"
                    style={{ minWidth: "128px" }}
                  >
                    <span style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: "16px", color: "#232F3E", letterSpacing: "-0.5px", lineHeight: 1 }}>
                      amazon
                    </span>
                    <svg viewBox="0 0 78 9" height="6" style={{ width: "68px", marginTop: "2px" }}>
                      <path d="M4 4.5 Q39 10 70 3.5" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <polygon points="69,1 74,4.5 69,8" fill="#FF9900" />
                    </svg>
                  </div>

                  {/* Flipkart */}
                  <div
                    className="bg-white rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-2.5"
                    style={{ minWidth: "128px" }}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: "#2874F0" }}
                    >
                      <span style={{ color: "#F4C430", fontWeight: 900, fontSize: "15px", lineHeight: 1 }}>F</span>
                    </div>
                    <span style={{ color: "#2874F0", fontWeight: 700, fontSize: "13px" }}>Flipkart</span>
                  </div>

                  {/* JioMart */}
                  <div
                    className="bg-white rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-2.5"
                    style={{ minWidth: "128px" }}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: "#003087" }}
                      >
                        <span style={{ color: "white", fontWeight: 900, fontSize: "8px" }}>Jio</span>
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: "#FF6600" }} />
                    </div>
                    <span style={{ color: "#003087", fontWeight: 700, fontSize: "13px" }}>JioMart</span>
                  </div>

                  {/* Myntra */}
                  <div
                    className="bg-white rounded-xl shadow-xl px-4 py-2.5 flex items-center gap-2.5"
                    style={{ minWidth: "128px" }}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#FF3F6C,#FF7BAB)" }}
                    >
                      <span style={{ color: "white", fontWeight: 900, fontSize: "15px", lineHeight: 1 }}>M</span>
                    </div>
                    <span style={{ color: "#FF3F6C", fontWeight: 700, fontSize: "13px" }}>Myntra</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══════════ MARKETPLACE LOGOS BAR (FLOATING) ══════════ */}
        <div className="relative z-10 max-w-[95%] xl:max-w-7xl mx-auto -mt-10 mb-12">
          <div className="bg-white rounded-[1.25rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] py-4 px-6 md:px-8 flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-0">

            {/* Amazon */}
            <div className="flex flex-col items-center justify-center mt-1">
              <span style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: "20px", color: "#000", letterSpacing: "-0.5px", lineHeight: 1 }}>amazon</span>
              <svg viewBox="0 0 90 10" height="7" style={{ width: "70px" }}>
                <path d="M5 5 Q45 12 80 4" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <polygon points="80,1 87,4.5 80,8" fill="#FF9900" />
              </svg>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* Flipkart */}
            <div className="flex items-center gap-1.5">
              <span style={{ color: "#0084FF", fontWeight: 700, fontStyle: "italic", fontSize: "16px" }}>Flipkart</span>
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#FFE11B" }}>
                <span style={{ color: "#0084FF", fontWeight: 900, fontStyle: "italic", fontSize: "14px" }}>f</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* JioMart */}
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#E31837" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: "10px" }}>Jio</span>
              </div>
              <span style={{ color: "#0055A5", fontWeight: 700, fontSize: "16px" }}>JioMart</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* Myntra */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center">
                <span style={{ background: "-webkit-linear-gradient(45deg, #F12E5F, #F48D21)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 900, fontSize: "24px", lineHeight: 1 }}>M</span>
              </div>
              <span style={{ color: "#282C3F", fontWeight: 700, fontSize: "14px" }}>Myntra</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* meesho */}
            <div className="flex items-center">
              <span style={{ color: "#F43397", fontWeight: 700, fontSize: "18px" }}>meesho</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* AJIO */}
            <div className="flex items-center">
              <span style={{ color: "#2C415C", fontWeight: 900, fontSize: "18px", letterSpacing: "1px" }}>AJIO</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* TATA CLiQ */}
            <div className="flex flex-col items-center leading-none">
              <div style={{ color: "#000", fontWeight: 700, fontSize: "7px", letterSpacing: "3px", marginBottom: "1px" }}>TATA</div>
              <div className="flex items-start">
                <span style={{ color: "#000", fontWeight: 900, fontSize: "16px", letterSpacing: "-0.5px" }}>CL</span>
                <div className="flex flex-col items-center justify-center relative">
                  <div className="w-1 h-1 bg-red-600 rounded-full absolute -top-0.5"></div>
                  <span style={{ color: "#000", fontWeight: 900, fontSize: "16px", letterSpacing: "-0.5px" }}>i</span>
                </div>
                <span style={{ color: "#000", fontWeight: 900, fontSize: "16px", letterSpacing: "-0.5px" }}>Q</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* snapdeal */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md flex items-center justify-center overflow-hidden" style={{ background: "#E40046" }}>
                <svg viewBox="0 0 100 100" width="16" height="16" fill="white">
                  <polygon points="50,15 90,35 50,55 10,35" />
                  <polygon points="10,45 50,65 90,45 90,85 50,105 10,85" />
                </svg>
              </div>
              <span style={{ color: "#000", fontWeight: 500, fontSize: "15px" }}>snapdeal</span>
            </div>

          </div>
        </div>

        {/* ══════════ WHY SELL ONLINE ══════════ */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Illustration */}
              <div className="flex justify-center">
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50 rounded-3xl" />
                  {/* Stylized store elements */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-28 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border-2 border-blue-100">
                        <span className="text-5xl">🏪</span>
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xs">$</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {["📦", "📱", "💰", "🚀"].map((emoji, i) => (
                        <div
                          key={i}
                          className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-xl border border-gray-100"
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                    {/* Graph line */}
                    <div className="w-44 h-12 bg-white rounded-xl shadow-md border border-gray-100 flex items-center px-3">
                      <svg
                        viewBox="0 0 120 30"
                        className="w-full text-green-400"
                      >
                        <polyline
                          points="0,25 20,18 40,20 60,10 80,12 100,5 120,2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <SectionBadge>WHY SELL ONLINE?</SectionBadge>
                <h2 className="text-3xl md:text-4xl font-black text-[#141D32] mb-4 leading-tight">
                  Sell Across India Without
                  <br />
                  Opening Multiple Stores
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Millions of customers shop online every day. Marketplace
                  selling allows your business to reach customers nationwide
                  while reducing infrastructure costs and accelerating growth.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "PAN India Reach",
                    "Easy Logistics",
                    "Millions of Customers",
                    "Brand Visibility",
                    "Faster Sales Growth",
                    "Inventory Management",
                    "Secure Payments",
                    "Business Expansion",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ OUR MARKETPLACE ONBOARDING SERVICES ══════════ */}
        <section className="py-16 px-5 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <SectionBadge>OUR MARKETPLACE ONBOARDING SERVICES</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-black text-[#141D32]">
                We Help You Sell on Leading Marketplaces
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <div
                  key={s.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-100 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${s.logoBg} rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-5 shadow-md`}
                  >
                    {s.logo}
                  </div>
                  <h3 className="font-black text-[#141D32] text-lg mb-0.5">
                    {s.name}
                  </h3>
                  <h4 className="font-semibold text-gray-500 text-sm mb-3">
                    {s.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-5">
                    {s.desc}
                  </p>
                  <button
                    onClick={onOpenModal}
                    className={`cursor-pointer flex items-center gap-1 text-sm font-bold ${s.linkColor} transition-all hover:gap-2`}
                  >
                    Know More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ COMPLETE END-TO-END SOLUTIONS ══════════ */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <SectionBadge>OUR MARKETPLACE INCLUDE</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-black text-[#141D32]">
                Complete End-to-End Marketplace Solutions
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {solutions.map(({ icon, label }, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center p-5 bg-gray-50 rounded-2xl border border-transparent hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-200" style={{ background: "#FF6B00" }}>
                    <span className="text-white">{icon}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ SIMPLE STEPS ══════════ */}
        <section className="py-16 px-5 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <SectionBadge>OUR ONBOARDING PROCESS</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-black text-[#141D32]">
                Simple Steps to Start Selling Online
              </h2>
            </div>

            {/* Steps row */}
            <div className="flex flex-wrap justify-center items-start gap-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex flex-col items-center text-center w-24 md:w-28">
                    <div className="w-14 h-14 bg-[#0F172A] rounded-full flex items-center justify-center text-orange-400 font-black text-sm mb-2 border-2 border-orange-500 shadow-md">
                      {step.num}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 leading-tight px-1">
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-orange-400 mt-4 mx-0.5 flex-shrink-0 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 3-COLUMN INFO: WHY KOOP / DOCUMENTS / PACKAGES ══════════ */}
        <section className="py-16 px-5 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Why Choose Koop India */}
              <div className="bg-[#0F172A] rounded-2xl p-7">
                <h3 className="text-white font-black text-lg mb-6">
                  Why Choose Koop India?
                </h3>
                <div className="space-y-3">
                  {whyKoop.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Required */}
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <h3 className="text-[#141D32] font-black text-lg mb-6">
                  Documents Required
                </h3>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Packages */}
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <h3 className="text-[#141D32] font-black text-lg mb-6">
                  Our Packages
                </h3>
                <div className="space-y-3 mb-6">
                  {packages.map(({ name }) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50/30 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="font-semibold text-gray-700 text-sm">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Illustration placeholder */}
                <div className="flex justify-center mb-5">
                  <div className="text-5xl">📋</div>
                </div>
                <button
                  onClick={onOpenModal}
                  className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  Get Free Consultation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CTA WITH FORM ══════════ */}
        <section
          className="relative overflow-hidden py-16 px-5"
          style={{
            background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 40%, #FF5500 100%)",
          }}
        >
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* White glow top-right */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)" }}
          />
          {/* Dark glow bottom-left */}
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(180,50,0,0.25) 0%, transparent 65%)" }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div>
                <span className="inline-flex items-center bg-white/20 text-white border border-white/30 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                  READY TO START?
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-4 leading-tight">
                  Ready to Start Selling Online?
                </h2>
                <p className="text-orange-100 text-base leading-relaxed mb-8">
                  Let Koop India handle your complete marketplace onboarding
                  while you focus on growing your business.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Quick Onboarding",
                    "Expert Support",
                    "Affordable Pricing",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — Contact Form */}
              <div className="bg-white rounded-2xl p-7 shadow-2xl relative z-10">
                <h3 className="font-black text-[#141D32] text-lg mb-1">
                  Get Free Consultation
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  Fill in the details and we&apos;ll call you back
                </p>

                {successMsg && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium text-center">
                    ✅ {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
                    />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
                    />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company / Business Name"
                    value={form.company}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
                  />
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="Seller Onboarding">Seller Onboarding</option>
                    <option value="Amazon Seller Registration">Amazon Seller Registration</option>
                    <option value="Flipkart Seller Registration">Flipkart Seller Registration</option>
                    <option value="JioMart Seller Registration">JioMart Seller Registration</option>
                    <option value="Myntra Seller Registration">Myntra Seller Registration</option>
                    <option value="Product Listing">Product Listing</option>
                    <option value="Catalog Creation">Catalog Creation</option>
                    <option value="Other Services">Other Services</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 mt-2"
                  >
                    {isSubmitting ? "Submitting..." : <>{"Submit Enquiry"} <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div >
    </>
  );
}
