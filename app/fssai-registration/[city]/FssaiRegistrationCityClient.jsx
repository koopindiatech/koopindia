"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  Building2,
  ShieldCheck,
  Clock,
  FileText,
  Award,
  PhoneCall,
  MessageCircle,
  MapPin,
  Check,
  Send,
  Utensils,
  Zap,
  Scale,
  RefreshCw,
  X,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addEnquiry } from "@/lib/enquiryService";
import { FSSAI_CITIES_LIST } from "@/lib/fssaiRegistrationCities";

export default function FssaiRegistrationCityClient({ city }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    licenseType: "Basic FSSAI (< ₹12L)",
    city: city.name,
    message: "",
  });
  const [midForm, setMidForm] = useState({
    name: "",
    phone: "",
    licenseType: "Basic FSSAI (< ₹12L)",
  });
  const [submitting, setSubmitting] = useState(false);
  const [midSubmitting, setMidSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [midSubmitted, setMidSubmitted] = useState(false);
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    phone: "",
    email: "",
    licenseType: "Basic FSSAI (< ₹12L)",
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [openFaq, setOpenFaq] = useState(null);

  const processSubmission = async (dataPayload) => {
    // 1. Save in "enquiries" collection (exact same as Popup Modal EnquiryForm)
    const id = await addEnquiry({
      name: dataPayload.name,
      phone: dataPayload.phone,
      mobile: dataPayload.phone,
      email: dataPayload.email || "",
      company: `${dataPayload.name} (${dataPayload.licenseType})`,
      city: dataPayload.city || city.name,
      state: city.state,
      service: "FSSAI License",
      category: "FSSAI License",
      requirements: `City: ${city.name} | License: ${dataPayload.licenseType} | Notes: ${dataPayload.message || "Quick FSSAI Lead"}`,
      source: `fssai_registration_${city.slug}`,
    });

    // 2. Also mirror in "leads" collection so CRM shows it in all views
    try {
      await addDoc(collection(db, "leads"), {
        profileId: id,
        name: dataPayload.name,
        displayName: dataPayload.name,
        company: `${dataPayload.name} (${dataPayload.licenseType})`,
        phone: dataPayload.phone,
        mobile: dataPayload.phone,
        email: dataPayload.email || "",
        city: dataPayload.city || city.name,
        state: city.state,
        service: "FSSAI License",
        requirements: `City: ${city.name} | License: ${dataPayload.licenseType}`,
        source: `fssai_registration_${city.slug}`,
        status: "New",
        createdAt: serverTimestamp(),
        assignedTo: null,
      });
    } catch (leadErr) {
      console.warn("Dual save to leads collection failed:", leadErr);
    }

    // 3. Fire Ad Conversion Pixel & GA4 Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", { content_name: `FSSAI Registration ${city.name}` });
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        service: "FSSAI License",
        city: city.name,
      });
    }

    return id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and mobile number.");
      return;
    }
    setSubmitting(true);
    try {
      const id = await processSubmission(formData);
      setEnquiryId(id);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting FSSAI lead:", err);
      alert("Something went wrong. Please call or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMidSubmit = async (e) => {
    e.preventDefault();
    if (!midForm.name || !midForm.phone) {
      alert("Please provide your name and mobile number.");
      return;
    }
    setMidSubmitting(true);
    try {
      const id = await processSubmission({
        ...midForm,
        city: city.name,
        email: "",
        message: "Mid-page quick FSSAI callback request",
      });
      setEnquiryId(id);
      setMidSubmitted(true);
    } catch (err) {
      console.error("Error submitting mid FSSAI lead:", err);
      alert("Something went wrong. Please call or WhatsApp us directly.");
    } finally {
      setMidSubmitting(false);
    }
  };

  const scrollToHeroForm = () => {
    const el = document.getElementById("hero-lead-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openLeadModal = (selectedLicense) => {
    if (selectedLicense) {
      setModalForm((prev) => ({ ...prev, licenseType: selectedLicense }));
      setFormData((prev) => ({ ...prev, licenseType: selectedLicense }));
    }
    setModalSubmitted(false);
    setQuickModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.phone) {
      alert("Please provide your name and mobile number.");
      return;
    }
    setModalSubmitting(true);
    try {
      const id = await processSubmission({
        ...modalForm,
        city: city.name,
        message: `Quick Modal FSSAI CTA (${modalForm.licenseType})`,
      });
      setEnquiryId(id);
      setModalSubmitted(true);
    } catch (err) {
      console.error("Error submitting FSSAI modal lead:", err);
      alert("Something went wrong. Please call us directly.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const otherCities = FSSAI_CITIES_LIST.filter((c) => c.slug !== city.slug);

  const LICENSE_PILLS = [
    "Basic FSSAI (< ₹12L)",
    "State FSSAI (₹12L–₹20Cr)",
    "Central FSSAI (> ₹20Cr)",
    "Renewal / Modify",
  ];

  return (
    <div className="bg-white text-slate-800 antialiased font-sans pb-20 md:pb-0">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A3366] text-white pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* SEO Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/documentation-compliance/fssai-license" className="hover:text-orange-400 transition-colors">
              FSSAI License India
            </Link>
            <span>/</span>
            <span className="text-orange-300 font-semibold">
              FSSAI Registration in {city.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  {city.name}, {city.state} • FoSCoS Approved Food Licensing
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-white">
                Online FSSAI Registration in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  {city.name}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Get your <strong>14-digit FSSAI Food License (Basic, State or Central)</strong> in {city.name} via FoSCoS. Essential for Cloud Kitchens, Restaurants, Zomato/Swiggy Partners, Food Manufacturers &amp; Traders — <span className="text-orange-400 font-bold">100% online processing</span> with zero office visits.
              </p>

              {/* Highlights Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% FoSCoS Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200">
                  <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Fast-Track Approval</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Zomato / Swiggy Ready</span>
                </div>
              </div>

              {/* Instant Contact Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openLeadModal("Basic FSSAI (< ₹12L)")}
                  className="inline-flex items-center gap-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:scale-105 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Get Free FSSAI Quote ➔</span>
                </button>
                <a
                  href="tel:+919599826131"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl border border-white/20 transition-all hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4 text-orange-400" />
                  <span>Call +91-9599826131</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Direct Lead Capture Form */}
            <div className="lg:col-span-5" id="hero-lead-form">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900 relative">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-lg font-black text-[#0F172A] tracking-tight">
                      Apply for FSSAI in {city.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Instant Eligibility &amp; Fee Quote • 15-Min Callback
                    </p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online
                  </span>
                </div>

                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Enquiry Received!</h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Thank you! Your reference ID is <strong className="text-orange-600">{enquiryId}</strong>.
                      Our FSSAI compliance advisor for {city.name} will call you shortly.
                    </p>
                    <a
                      href="tel:+919599826131"
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
                    >
                      <PhoneCall className="w-4 h-4 text-orange-400" />
                      <span>Urgent Filing? Call +91-9599826131</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name / Business Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name or kitchen/brand name"
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile / WhatsApp <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="owner@foodbrand.com"
                          className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select FSSAI License Type
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {LICENSE_PILLS.map((pill) => (
                          <button
                            type="button"
                            key={pill}
                            onClick={() => setFormData({ ...formData, licenseType: pill })}
                            className={`text-[11px] font-bold py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                              formData.licenseType === pill
                                ? "bg-orange-50 border-orange-500 text-orange-700 font-extrabold shadow-2xs"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {pill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-800 font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#F97316] hover:bg-orange-600 disabled:opacity-60 text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Get FSSAI Quotation &amp; Call Back</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400 pt-1">
                      🔒 100% Confidential • Zero Spam • Free FoSCoS KoB Check Included
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCAL FOOD ECOSYSTEM IN CITY ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
                Food Authority &amp; Market • {city.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                FSSAI Food Licensing Requirements in {city.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {city.overview}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {city.localCompliance.localInsight}
              </p>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-500" />
                  <span>Authority: {city.authority.name}</span>
                </div>
                <p className="text-xs text-slate-500 pl-6">
                  {city.authority.jurisdiction} &bull; {city.authority.portal} &bull; Pin Codes: {city.pincodes}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
                  Major Food &amp; HoReCa Zones in {city.name}
                </h3>
                <ul className="space-y-2 text-xs font-semibold text-slate-700">
                  {city.keyFoodHubs.map((hub, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{hub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
                  Licensed Food Sectors
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {city.topFoodCategories.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATE FEES & LOCAL REGULATORY RULES ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              {city.state} Compliance Rules
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              FSSAI Fees, Municipal Rules &amp; Lab Tests in {city.name}
            </h2>
            <p className="text-sm text-slate-600">
              Exact government FoSCoS challans and local {city.state} Food Safety Officer scrutiny checklist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-black text-sm">
                <Scale className="w-4 h-4" />
                <h3>Statutory FoSCoS Govt Fees</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {city.localCompliance.govtFeeNote}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-black text-sm">
                <Utensils className="w-4 h-4" />
                <h3>Local Municipal &amp; Trade Check</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {city.localCompliance.municipalNote}
              </p>
            </div>

            <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-orange-600 font-black text-sm">
                <FileText className="w-4 h-4" />
                <h3>Water Test &amp; Inspection Rule</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {city.localCompliance.waterTestRule}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold border-t border-orange-200/70">
                <Link href="/gst-registration" className="text-orange-600 hover:underline">
                  GST Registration →
                </Link>
                <span className="text-slate-300">|</span>
                <Link href="/trademark-registration" className="text-orange-600 hover:underline">
                  Brand Trademark →
                </Link>
                <span className="text-slate-300">|</span>
                <Link href={`/company-registration/${city.slug}`} className="text-orange-600 hover:underline">
                  Company Reg in {city.name} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 TYPES OF FSSAI LICENSES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Which One Fits Your Business?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              3 Types of FSSAI License in {city.name}
            </h2>
            <p className="text-sm text-slate-600">
              Choosing the wrong license category leads to immediate rejection on FoSCoS. Check your exact eligibility below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {/* Basic Registration */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Form A • Petty FBO
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Basic FSSAI Registration
              </h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Ideal for small food vendors, home kitchens, tiffin centers, hawkers, and new cloud kitchens in {city.name}.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 mb-7 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Annual Turnover:</strong> Up to ₹12 Lakhs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Timeline:</strong> 3 – 7 Working Days</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Accepted for Zomato / Swiggy onboarding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Minimal KYC docs (PAN, Aadhaar &amp; Photo)</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Basic FSSAI (< ₹12L)")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
              >
                Apply Basic FSSAI
              </button>
            </div>

            {/* State License */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border-2 border-orange-500 flex flex-col shadow-2xl relative md:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-md">
                Most Popular for Restaurants &amp; Units
              </span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 mt-2">
                Form B • {city.state} DO
              </span>
              <h3 className="text-2xl font-black text-white mb-2">
                State FSSAI License
              </h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Mandatory for mid-sized restaurants, cafes, caterers, wholesalers, distributors &amp; small plants operating inside {city.state}.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-7 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span><strong>Annual Turnover:</strong> ₹12 Lakhs to ₹20 Crores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span><strong>Manufacturing:</strong> Up to 2 MT/Day Capacity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>B2B Distribution, Blinkit, BigBasket ready</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Full DO scrutiny &amp; reply handling included</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("State FSSAI (₹12L–₹20Cr)")}
                className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-black text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/30 cursor-pointer"
              >
                Apply State FSSAI License ➔
              </button>
            </div>

            {/* Central License */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Form B • Central Authority
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Central FSSAI License
              </h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Compulsory for Food Importers, Exporters, Multi-State Operations, E-Commerce FBOs &amp; Large Manufacturers.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 mb-7 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Annual Turnover:</strong> Above ₹20 Crores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span><strong>Compulsory Regardless of Turnover:</strong> Importers (IEC), Exporters, Proprietary Foods &amp; Nutraceuticals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Multi-state central head-office coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Dedicated regulatory consultant assigned</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Central FSSAI (> ₹20Cr)")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
              >
                Apply Central FSSAI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE INSTANT CALLBACK STRIP ── */}
      <section className="py-12 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A3366] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
                  <Zap className="w-3.5 h-3.5" />
                  Fast-Track FoSCoS Filing in {city.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Confused Between Basic, State or Central FSSAI?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Selecting the wrong Kind of Business (KoB) or license slab causes FoSCoS rejection &amp; fee forfeiture. Get a free check from our {city.name} FSSAI team before applying.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Free KoB Verification
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <Clock className="w-4 h-4" /> Same-Day Filing
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6">
                {midSubmitted ? (
                  <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-6 text-center space-y-2">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto font-black text-lg">
                      ✓
                    </div>
                    <h4 className="text-base font-bold text-white">Callback Request Confirmed!</h4>
                    <p className="text-xs text-emerald-200">
                      Reference ID: <strong>{enquiryId}</strong>. Our FSSAI advisor for {city.name} will call you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleMidSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={midForm.name}
                        onChange={(e) => setMidForm({ ...midForm, name: e.target.value })}
                        placeholder="Your Name / Kitchen Name *"
                        className="w-full text-xs px-3.5 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-orange-400 focus:bg-white/15 text-white placeholder:text-slate-400 transition-all font-medium"
                      />
                      <input
                        type="tel"
                        required
                        value={midForm.phone}
                        onChange={(e) => setMidForm({ ...midForm, phone: e.target.value })}
                        placeholder="WhatsApp / Mobile Number *"
                        className="w-full text-xs px-3.5 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-orange-400 focus:bg-white/15 text-white placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={midForm.licenseType}
                        onChange={(e) => setMidForm({ ...midForm, licenseType: e.target.value })}
                        className="w-full sm:w-2/3 text-xs px-3.5 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-orange-400 text-white font-medium cursor-pointer"
                      >
                        <option className="text-slate-900">Basic FSSAI (&lt; ₹12L)</option>
                        <option className="text-slate-900">State FSSAI (₹12L–₹20Cr)</option>
                        <option className="text-slate-900">Central FSSAI (&gt; ₹20Cr / Import)</option>
                        <option className="text-slate-900">FSSAI Renewal / Modification</option>
                      </select>
                      <button
                        type="submit"
                        disabled={midSubmitting}
                        className="w-full sm:w-1/3 bg-[#F97316] hover:bg-orange-600 disabled:opacity-60 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        {midSubmitting ? "Submitting..." : "Get Call Back ➔"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS REQUIRED CHECKLIST ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-[#10233e] text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                FoSCoS Document Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Documents Required for FSSAI License in {city.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                100% digital submission over WhatsApp or Email.
              </p>
            </div>

            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab("basic")}
                className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "basic"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                Basic &amp; Cloud Kitchen Docs
              </button>
              <button
                onClick={() => setActiveTab("state")}
                className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "state"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                State / Central &amp; Mfg Docs
              </button>
            </div>

            {activeTab === "basic" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "PAN & Aadhaar Card", desc: "Identity & address proof of proprietor/partner" },
                  { title: "Passport Size Photo", desc: "Clear digital photograph of the Food Business Operator" },
                  { title: "Premises Address Proof", desc: "Electricity / Water bill (< 2 months old) or Rent Agreement" },
                  { title: "NOC from Property Owner", desc: "Simple signed NOC if kitchen/shop is rented or family-owned" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                      <p className="text-[11px] text-slate-300">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Form IX & Board Resolution", desc: "Nomination of responsible person (for Companies / LLPs)" },
                  { title: "Layout Plan & Machinery List", desc: "Blueprint of processing unit & machinery HP specs (for Mfg)" },
                  { title: "NABL Water Analysis Report", desc: "Chemical & bacteriological potability test from accredited lab" },
                  { title: "Food Safety Plan & IEC / GST", desc: "FSMS declaration + DGFT IEC (if Importer/Exporter) + GST/Trade License" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                      <p className="text-[11px] text-slate-300">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FAQS ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Questions About FSSAI License in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers to the most common queries from food entrepreneurs in {city.name}.
            </p>
          </div>

          <div className="space-y-3">
            {city.faqs.map((f, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  openFaq === i
                    ? "border-orange-200 bg-orange-50/30"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
                >
                  <span
                    className={`text-sm font-bold leading-snug ${
                      openFaq === i ? "text-orange-700" : "text-slate-800"
                    }`}
                  >
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-orange-100/60">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-CITY INTERNAL LINKING GRID (NOT IN HEADER / FOOTER) ── */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Pan-India Food Licensing
            </span>
            <h3 className="text-lg font-bold text-slate-800">
              FSSAI Registration Services in Other Major Cities
            </h3>
            <p className="text-xs text-slate-500">
              Looking for food license support across India? Explore our city guides or{" "}
              <Link href="/documentation-compliance/fssai-license" className="text-orange-600 font-bold hover:underline">
                Delhi / National FSSAI Hub →
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {otherCities.map((oc) => (
              <Link
                key={oc.slug}
                href={`/fssai-registration/${oc.slug}`}
                className="bg-slate-50 hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl p-3 text-center transition-all group shadow-2xs"
              >
                <div className="text-xs font-bold text-slate-700 group-hover:text-orange-600 transition-colors">
                  FSSAI in {oc.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {oc.state}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Start Your Food Business in {city.name} Legally Today!
          </h2>
          <p className="text-sm text-orange-100 max-w-2xl mx-auto">
            Avoid hefty FoSCoS penalties and Swiggy/Zomato onboarding delays. Let Koop India handle your {city.name} FSSAI certificate from start to finish.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openLeadModal("Basic FSSAI (< ₹12L)")}
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Apply for FSSAI Online Now ➔</span>
            </button>
            <a
              href="tel:+919599826131"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-orange-500" />
              <span>Call +91-9599826131</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY BOTTOM ACTION BAR (md:hidden) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2 md:hidden">
        <a
          href="tel:+919599826131"
          className="w-1/3 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
          <span>Call Expert</span>
        </a>
        <button
          type="button"
          onClick={() => openLeadModal("Basic FSSAI (< ₹12L)")}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black transition-all shadow-md shadow-orange-500/25 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Get Free FSSAI Quote ➔</span>
        </button>
      </div>

      {/* ── INSTANT FSSAI QUOTE & CALLBACK MODAL ── */}
      {quickModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
          onClick={() => setQuickModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {modalSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Enquiry Confirmed!</h4>
                <p className="text-xs text-slate-600">
                  Reference ID: <strong className="text-orange-600">{enquiryId}</strong>. Our FSSAI compliance advisor for {city.name} will call you within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setQuickModalOpen(false)}
                  className="mt-2 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    {city.name} FoSCoS Food License
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-2">
                    Get Instant FSSAI Fee Quote
                  </h4>
                  <p className="text-xs text-slate-500">
                    Selected: <strong className="text-slate-700">{modalForm.licenseType}</strong>
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name / Business Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      placeholder="Enter name or kitchen/brand name"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp Number <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={modalForm.phone}
                      onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      placeholder="owner@foodbrand.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      License Category
                    </label>
                    <select
                      value={modalForm.licenseType}
                      onChange={(e) => setModalForm({ ...modalForm, licenseType: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-slate-800 font-semibold"
                    >
                      <option>Basic FSSAI (&lt; ₹12L)</option>
                      <option>State FSSAI (₹12L–₹20Cr)</option>
                      <option>Central FSSAI (&gt; ₹20Cr)</option>
                      <option>Renewal / Modify</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="w-full bg-[#F97316] hover:bg-orange-600 disabled:opacity-60 text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{modalSubmitting ? "Submitting..." : "Submit & Get 15-Min Callback"}</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    🔒 Free FoSCoS Eligibility Check • Saved Directly to CRM
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
