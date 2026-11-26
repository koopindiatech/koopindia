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
  Users,
  Award,
  PhoneCall,
  MessageCircle,
  MapPin,
  Check,
  Send,
  Sparkles,
  HelpCircle,
  Briefcase,
  Layers,
  ArrowRight,
  Zap,
  X,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addEnquiry } from "@/lib/enquiryService";
import { CITIES_LIST } from "@/lib/companyRegistrationCities";

export default function CompanyRegistrationCityClient({ city }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    companyType: "Private Limited Company (Pvt Ltd)",
    city: city.name,
    message: "",
  });
  const [midForm, setMidForm] = useState({
    name: "",
    phone: "",
    companyType: "Private Limited Company (Pvt Ltd)",
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
    companyType: "Private Limited Company (Pvt Ltd)",
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [activeTab, setActiveTab] = useState("directors");
  const [openFaq, setOpenFaq] = useState(null);

  const processSubmission = async (dataPayload) => {
    // 1. Save in "enquiries" collection (exact same as Popup Modal EnquiryForm)
    const id = await addEnquiry({
      name: dataPayload.name,
      phone: dataPayload.phone,
      mobile: dataPayload.phone,
      email: dataPayload.email || "",
      company: `${dataPayload.name}'s ${dataPayload.companyType}`,
      city: dataPayload.city || city.name,
      state: city.state,
      service: "Company Registration",
      category: "Company Registration",
      requirements: `City: ${city.name} | Type: ${dataPayload.companyType} | Notes: ${dataPayload.message || "Quick Lead"}`,
      source: `company_registration_${city.slug}`,
    });

    // 2. Also save to "leads" collection so CRM shows it in all views
    try {
      await addDoc(collection(db, "leads"), {
        profileId: id,
        name: dataPayload.name,
        displayName: dataPayload.name,
        company: `${dataPayload.name}'s ${dataPayload.companyType}`,
        phone: dataPayload.phone,
        mobile: dataPayload.phone,
        email: dataPayload.email || "",
        city: dataPayload.city || city.name,
        state: city.state,
        service: "Company Registration",
        requirements: `City: ${city.name} | Type: ${dataPayload.companyType}`,
        source: `company_registration_${city.slug}`,
        status: "New",
        createdAt: serverTimestamp(),
        assignedTo: null,
      });
    } catch (leadErr) {
      console.warn("Dual save to leads collection failed:", leadErr);
    }

    // 3. Fire Pixel & Analytics
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", { content_name: `Company Registration ${city.name}` });
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        service: "Company Registration",
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
      console.error("Error submitting lead:", err);
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
        message: "Mid-page quick callback request",
      });
      setEnquiryId(id);
      setMidSubmitted(true);
    } catch (err) {
      console.error("Error submitting mid lead:", err);
      alert("Something went wrong. Please call or WhatsApp us directly.");
    } finally {
      setMidSubmitting(false);
    }
  };

  const scrollToHeroForm = () => {
    const el = document.getElementById("hero-lead-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openLeadModal = (selectedType) => {
    if (selectedType) {
      setModalForm((prev) => ({ ...prev, companyType: selectedType }));
      setFormData((prev) => ({ ...prev, companyType: selectedType }));
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
        message: `Quick Modal CTA (${modalForm.companyType})`,
      });
      setEnquiryId(id);
      setModalSubmitted(true);
    } catch (err) {
      console.error("Error submitting modal lead:", err);
      alert("Something went wrong. Please call us directly.");
    } finally {
      setModalSubmitting(false);
    }
  };

  const otherCities = CITIES_LIST.filter((c) => c.slug !== city.slug);

  const COMPANY_TYPES = [
    "Private Limited (Pvt Ltd)",
    "One Person Company (OPC)",
    "Limited Liability (LLP)",
    "Partnership / Sole Prop",
  ];

  return (
    <div className="bg-white text-slate-800 antialiased font-sans pb-20 md:pb-0">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A3366] text-white pt-24 pb-16 md:pt-28 md:pb-24">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* SEO Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/documentation-compliance/company-registration-services" className="hover:text-orange-400 transition-colors">
              Company Registration Services
            </Link>
            <span>/</span>
            <span className="text-orange-300 font-semibold">
              Company Registration in {city.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  {city.name}, {city.state} • MCA &amp; ROC Approved
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-white">
                Online Company Registration in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  {city.name}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Register your <strong>Private Limited Company, OPC or LLP</strong> in {city.name} in just{" "}
                <span className="text-orange-400 font-bold">{city.timeline}</span>. 100% online MCA filing, DSC, DIN,
                SPICe+, PAN/TAN &amp; Bank Account with zero office visits. Supervised by experienced CA/CS professionals.
              </p>

              {/* Highlights Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% MCA Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200">
                  <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>COI in {city.timeline}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>500+ Startups Served</span>
                </div>
              </div>

              {/* Instant Contact Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openLeadModal("Private Limited Company (Pvt Ltd)")}
                  className="inline-flex items-center gap-2.5 bg-[#F97316] hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:scale-105 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Get Free CA Consultation ➔</span>
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
                      Get Free CA Consultation
                    </p>
                    <p className="text-xs text-slate-500">
                      Instant Callback &amp; MCA Quotation for {city.name}
                    </p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live Callback
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
                      Our CA/CS compliance advisor for {city.name} will call you within 15 minutes.
                    </p>
                    <a
                      href="tel:+919599826131"
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
                    >
                      <PhoneCall className="w-4 h-4 text-orange-400" />
                      <span>Urgent Query? Call +91-9599826131</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
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
                          Business Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select Company Structure
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {COMPANY_TYPES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setFormData({ ...formData, companyType: t })}
                            className={`text-[11px] font-bold py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                              formData.companyType.includes(t.split(" ")[0])
                                ? "bg-orange-50 border-orange-500 text-orange-700 font-extrabold shadow-2xs"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {t}
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
                          <span>Get Free Quotation &amp; Call Back</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400 pt-1">
                      🔒 100% Confidential • Zero Spam • Free CA Advisory Included
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCAL BUSINESS ECOSYSTEM IN CITY ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
                Local Ecosystem &bull; {city.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Incorporate Your Business in {city.name}?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {city.overview}
              </p>
              {city.localAdvantage && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {city.localAdvantage}
                </p>
              )}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-500" />
                  <span>ROC Jurisdiction: {city.roc.name} ({city.roc.jurisdiction})</span>
                </div>
                <p className="text-xs text-slate-500 pl-6">
                  {city.roc.address} &bull; Pin Codes Covered: {city.pincodes}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
                  Key Commercial Hubs in {city.name}
                </h3>
                <ul className="space-y-2 text-xs font-semibold text-slate-700">
                  {city.keyHubs.map((hub, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{hub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
                  Top Growing Industries
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {city.topIndustries.map((ind, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATE STAMP DUTY & LOCAL COMPLIANCE IN CITY ── */}
      {city.stampDuty && (
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
                {city.state} ROC &amp; Fee Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Company Registration Stamp Duty &amp; Compliance in {city.name}
              </h2>
              <p className="text-sm text-slate-600">
                State-specific MCA SPICe+ e-stamping, Professional Tax rules, and post-incorporation requirements applicable under {city.roc.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-black text-slate-900">
                  {city.state} e-MoA &amp; e-AoA Stamp Duty
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>e-MoA:</strong> {city.stampDuty.moaDuty}
                  <br />
                  <strong>e-AoA:</strong> {city.stampDuty.aoaDuty}
                </p>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  {city.stampDuty.rocFeeNote}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-black text-slate-900">
                  Professional Tax &amp; Shop Act ({city.name})
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Professional Tax:</strong> {city.stampDuty.professionalTax}
                </p>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  <strong>Shop Act Portal:</strong> {city.stampDuty.shopActPortal}
                </p>
              </div>

              <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-5 space-y-2 md:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-black text-slate-900">
                  State Startup Policy &amp; Subsidies
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {city.stampDuty.startupPolicy}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold">
                  <Link href="/gst-registration" className="text-orange-600 hover:underline">
                    GST Registration →
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/trademark-registration" className="text-orange-600 hover:underline">
                    Trademark →
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/startup-india-registration" className="text-orange-600 hover:underline">
                    DPIIT Startup India →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4 TYPES OF COMPANY STRUCTURES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Legal Business Entities
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Choose the Best Company Structure in {city.name}
            </h2>
            <p className="text-sm text-slate-600">
              Not sure which entity fits your business model? Here is a breakdown of the 4 most popular company registrations under the Ministry of Corporate Affairs (MCA).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pvt Ltd */}
            <div className="bg-slate-50 hover:bg-orange-50/40 transition-all rounded-3xl p-6 border-2 border-orange-500/30 hover:border-orange-500 flex flex-col relative shadow-sm">
              <span className="absolute -top-3 right-6 bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                Most Popular
              </span>
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                Private Limited (Pvt Ltd)
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Ideal for startups, high-growth ventures, and founders seeking venture capital, angel investment, or ESOPs.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Min 2 Directors &amp; 2 Shareholders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Limited Liability Protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Eligible for 100% Foreign FDI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>High credibility with Banks &amp; MNCs</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Private Limited (Pvt Ltd)")}
                className="w-full text-center bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Incorporate Pvt Ltd
              </button>
            </div>

            {/* OPC */}
            <div className="bg-slate-50 hover:bg-slate-100/70 transition-all rounded-3xl p-6 border border-slate-200 flex flex-col shadow-xs">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                One Person Company (OPC)
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Designed for single entrepreneurs who want full control with limited liability protection.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Single Founder / Director</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Requires 1 Nominee Director</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Separate Legal Entity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Convertible to Pvt Ltd later</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("One Person Company (OPC)")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Incorporate OPC
              </button>
            </div>

            {/* LLP */}
            <div className="bg-slate-50 hover:bg-slate-100/70 transition-all rounded-3xl p-6 border border-slate-200 flex flex-col shadow-xs">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                Limited Liability (LLP)
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Best for consulting firms, legal practices, marketing agencies, and small partners with lower compliance.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Min 2 Designated Partners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>No Mandatory Statutory Audit up to 40L</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Governed by LLP Agreement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Lower Annual ROC Compliances</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Limited Liability (LLP)")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Incorporate LLP
              </button>
            </div>

            {/* Section 8 / Partnership */}
            <div className="bg-slate-50 hover:bg-slate-100/70 transition-all rounded-3xl p-6 border border-slate-200 flex flex-col shadow-xs">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                Section 8 &amp; Others
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Non-Profit foundations, charitable institutions, and traditional registered partnerships.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6 flex-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Eligible for 12A / 80G Tax Exemption</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>CSR Grant Eligibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Central Govt MCA License</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Zero Share Capital requirement</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Partnership / Sole Prop")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Inquire Section 8
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6-STEP INCORPORATION PROCESS ── */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Step-By-Step Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our 6-Step Company Registration Process in {city.name}
            </h2>
            <p className="text-sm text-slate-600">
              Complete peace of mind. We handle every government submission digitally on the MCA V3 portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Name Availability & RUN Approval",
                desc: `We check the MCA database and Trade Marks registry to ensure your desired company name is 100% unique and compliant with ${city.name} ROC guidelines.`,
              },
              {
                step: "02",
                title: "Digital Signature Certificates (DSC)",
                desc: "Class-3 Digital Signatures with encrypted USB tokens or paperless e-sign are issued for all proposed directors.",
              },
              {
                step: "03",
                title: "SPICe+ Part A & Part B Filing",
                desc: "We prepare and submit the integrated SPICe+ web form on MCA v3 including DIN allocation, EPFO, ESIC, Professional Tax, and bank integration.",
              },
              {
                step: "04",
                title: "Drafting e-MOA & e-AOA",
                desc: "Our corporate lawyers draft customized Memorandum of Association (MOA) and Articles of Association (AOA) tailored to your industry objectives.",
              },
              {
                step: "05",
                title: "Certificate of Incorporation (COI)",
                desc: `The Registrar of Companies issues your digital Certificate of Incorporation with Corporate Identification Number (CIN), Company PAN, and TAN.`,
              },
              {
                step: "06",
                title: "Bank Account & GST Activation",
                desc: `Priority corporate current account opening with zero balance assistance, Haryana/UP/State GSTIN, and MSME Udyam registration in ${city.name}.`,
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-orange-500">{s.step}</span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold">
                    ✓
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE INSTANT CALLBACK & QUOTE STRIP ── */}
      <section className="py-12 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A3366] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
                  <Zap className="w-3.5 h-3.5" />
                  Fast-Track Callback in {city.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Check Name Availability &amp; Get an Instant CA Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Confused between Pvt Ltd, OPC, or LLP? Our corporate CA experts will review your {city.name} business requirements and advise the most tax-efficient structure.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Zero Consultation Fee
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <Clock className="w-4 h-4" /> 15-Minute Response
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
                      Enquiry ID: <strong>{enquiryId}</strong>. Our senior CA advisor for {city.name} will call you shortly.
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
                        placeholder="Your Full Name *"
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
                        value={midForm.companyType}
                        onChange={(e) => setMidForm({ ...midForm, companyType: e.target.value })}
                        className="w-full sm:w-2/3 text-xs px-3.5 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-orange-400 text-white font-medium cursor-pointer"
                      >
                        <option className="text-slate-900">Private Limited Company (Pvt Ltd)</option>
                        <option className="text-slate-900">One Person Company (OPC)</option>
                        <option className="text-slate-900">Limited Liability Partnership (LLP)</option>
                        <option className="text-slate-900">Partnership Firm / Sole Prop</option>
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
                Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Documents Required for {city.name} Incorporation
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                100% digital submission. No hard copies or physical notarization needed.
              </p>
            </div>

            {/* Tab switch */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab("directors")}
                className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "directors"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                For Directors &amp; Shareholders
              </button>
              <button
                onClick={() => setActiveTab("office")}
                className={`text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "office"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                For Registered Office in {city.name}
              </button>
            </div>

            {activeTab === "directors" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "PAN Card", desc: "Mandatory for all Indian directors & shareholders" },
                  { title: "Identity Proof", desc: "Aadhaar Card, Passport, or Voter ID" },
                  { title: "Address Proof", desc: "Bank Statement, Electricity, or Mobile bill (< 2 months old)" },
                  { title: "Passport Photograph", desc: "Clear digital color photograph for DSC" },
                  { title: "Valid Email & Mobile", desc: "Required for Aadhaar OTP & MCA verification" },
                  { title: "Specimen Signature", desc: "Signed on a blank white sheet" },
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
                  { title: "Electricity / Water Bill", desc: "Latest utility bill of the premises (< 2 months old)" },
                  { title: "NOC from Property Owner", desc: "No Objection Certificate from the landlord/owner" },
                  { title: "Rent Agreement / Ownership Deed", desc: "Commercial or residential rent agreement" },
                  { title: "Virtual Office Address (Optional)", desc: `Accepted in ${city.name} if proper NOC & agreement is provided` },
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

      {/* ── ALL-INCLUSIVE PACKAGES ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              All-Inclusive Incorporation Packages in {city.name}
            </h2>
            <p className="text-sm text-slate-600">
              Clear government fee breakdowns, zero surprise add-ons, and post-incorporation compliance guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Starter Package */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Basic Setup
              </span>
              <h3 className="text-xl font-black text-slate-900">LLP / OPC Package</h3>
              <p className="text-xs text-slate-500 mb-6">
                Best for solo founders, freelance consultants, and low-scale partnerships in {city.name}.
              </p>
              <ul className="space-y-3 text-xs text-slate-600 mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>2 Digital Signatures (DSC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Director Identification Number (DIN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Name Approval Filing (RUN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>LLP Agreement / MOA &amp; AOA Drafting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Certificate of Incorporation</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("LLP / OPC Starter Package")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
              >
                Inquire Starter Plan
              </button>
            </div>

            {/* Standard Pvt Ltd (Highlighted) */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border-2 border-orange-500 flex flex-col shadow-2xl relative md:-translate-y-3">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[11px] font-black uppercase px-4 py-1 rounded-full shadow-md">
                Recommended for Startups
              </span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 mt-2">
                Full Incorporation
              </span>
              <h3 className="text-2xl font-black text-white">Private Limited Company</h3>
              <p className="text-xs text-slate-300 mb-6">
                Complete MCA incorporation package with PAN, TAN, and bank account setup for {city.name} businesses.
              </p>
              <ul className="space-y-3 text-xs text-slate-200 mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>2 Class-3 Digital Signatures (DSC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>2 Director Identification Numbers (DIN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>Name Search &amp; Part A Reservation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>SPICe+ Part B MCA Incorporation Filing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>e-MOA and e-AOA Drafting &amp; Stamping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>Company PAN &amp; TAN Allotment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>EPFO &amp; ESIC Registration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>Corporate Current Account Opening Assistance</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Private Limited Company (Pvt Ltd)")}
                className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-black text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/30 cursor-pointer"
              >
                Incorporate Pvt Ltd Today ➔
              </button>
            </div>

            {/* Premium Growth Package */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                All-In-One Launch
              </span>
              <h3 className="text-xl font-black text-slate-900">Startup Launchpad</h3>
              <p className="text-xs text-slate-500 mb-6">
                Includes Company Incorporation + GST Registration + Trademark Filing in {city.name}.
              </p>
              <ul className="space-y-3 text-xs text-slate-600 mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Everything in Pvt Ltd Package</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{city.state} GSTIN Registration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Brand Name / Trademark (TM) Filing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>MSME Udyam Registration Certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>DPIIT Startup India Eligibility Assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Dedicated Senior CA/CS Relationship Manager</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openLeadModal("Startup Launchpad (Company + GST + TM)")}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
              >
                Inquire Launchpad Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FAQS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Questions About Company Registration in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers to the most common queries from founders and business owners.
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
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Pan-India Locations
            </span>
            <h3 className="text-lg font-bold text-slate-800">
              Company Registration Services in Other Major Cities
            </h3>
            <p className="text-xs text-slate-500">
              Koop India provides online MCA company incorporation services across India’s primary startup and corporate hubs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {otherCities.map((oc) => (
              <Link
                key={oc.slug}
                href={`/company-registration/${oc.slug}`}
                className="bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl p-3 text-center transition-all group shadow-2xs"
              >
                <div className="text-xs font-bold text-slate-700 group-hover:text-orange-600 transition-colors">
                  {oc.name}
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
            Ready to Incorporate Your Company in {city.name}?
          </h2>
          <p className="text-sm text-orange-100 max-w-2xl mx-auto">
            Join 500+ startups and established enterprises that registered their business with Koop India. Zero office visits, 100% online, guaranteed compliance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openLeadModal("Private Limited Company (Pvt Ltd)")}
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Book Free CA Consultation Now ➔</span>
            </button>
            <a
              href="tel:+919599826131"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-orange-500" />
              <span>Call Us: +91-9599826131</span>
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
          <span>Call CA</span>
        </a>
        <button
          type="button"
          onClick={() => openLeadModal("Private Limited Company (Pvt Ltd)")}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black transition-all shadow-md shadow-orange-500/25 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Get Free Quote &amp; Callback ➔</span>
        </button>
      </div>

      {/* ── INSTANT QUOTE & CALLBACK MODAL ── */}
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
                  Reference ID: <strong className="text-orange-600">{enquiryId}</strong>. Our CA/CS advisor for {city.name} will call you within 15 minutes with the complete fee breakup.
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
                    {city.name} CA Consultation
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-2">
                    Get Instant Company Registration Quote
                  </h4>
                  <p className="text-xs text-slate-500">
                    Selected: <strong className="text-slate-700">{modalForm.companyType}</strong>
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      placeholder="Enter your name"
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
                      Business Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      placeholder="founder@company.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Structure / Package
                    </label>
                    <select
                      value={modalForm.companyType}
                      onChange={(e) => setModalForm({ ...modalForm, companyType: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-slate-800 font-semibold"
                    >
                      <option>Private Limited Company (Pvt Ltd)</option>
                      <option>Private Limited (Pvt Ltd)</option>
                      <option>One Person Company (OPC)</option>
                      <option>Limited Liability (LLP)</option>
                      <option>LLP / OPC Starter Package</option>
                      <option>Startup Launchpad (Company + GST + TM)</option>
                      <option>Partnership / Sole Prop</option>
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
                    🔒 Free CA Consultation • Zero Spam • Direct CRM Priority Queue
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
