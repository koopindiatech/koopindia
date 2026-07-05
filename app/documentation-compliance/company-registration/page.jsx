"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ArrowRight, Clock, Shield, FileText, Users, Building2, Briefcase, Star, Phone, Mail, MapPin, BadgeCheck, Zap, TrendingUp, Lock } from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const Tag = ({ children }) => (
  <span className="inline-block bg-orange-50 text-orange-600 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-orange-100">
    {children}
  </span>
);

const Check = ({ children, subtle }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${subtle ? "text-orange-300" : "text-orange-500"}`} />
    <span className={`text-sm leading-relaxed ${subtle ? "text-slate-400" : "text-slate-600"}`}>{children}</span>
  </li>
);

const Dot = () => (
  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
);

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${open ? "border-orange-200 bg-orange-50/40" : "border-slate-200 bg-white"
        }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-sm font-semibold leading-snug ${open ? "text-orange-700" : "text-slate-800"}`}>
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-orange-500" : "text-slate-400"
            }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function CompanyRegistration() {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Koop India - Company Registration Consultant",
    "description": "Best Company Registration Consultant in India offering Online Private Limited Company Registration, GST, and Business Compliance Services.",
    "areaServed": ["Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Bengaluru", "Mumbai", "Pune", "Hyderabad", "Bhubaneswar", "India"],
    "serviceType": ["Private Limited Company Registration Online", "Company Registration with GST", "Company Registration and Trademark Services", "Company Registration for Startups", "ROC Compliance Services", "Annual Compliance Services"],
    "provider": {
      "@type": "Organization",
      "name": "Koop India"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which structure is best for a startup looking to raise funding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Private Limited Company is the only structure that allows equity investment from VCs, angel investors, and institutional funds. If raising money is part of your plan, Private Limited Company Registration Online is the right choice. It also qualifies for DPIIT Startup India recognition."
        }
      },
      {
        "@type": "Question",
        "name": "Can I register a company using my home address?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your home address is perfectly valid as a registered office address. You'll need to provide an electricity bill or bank statement for the property. As the best company registration consultant in Noida and Delhi NCR, we guide you through this process seamlessly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum capital I need to register a company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is no statutory minimum paid-up capital for Private Limited, OPC, or LLP under current Indian law. We offer affordable company registration services in India regardless of your capital size."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if MCA rejects my company name?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Name rejections happen occasionally due to trademark similarities. We offer combined company registration and trademark services to ensure your brand is protected and name approval goes smoothly."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://koopindia.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Documentation & Compliance",
        "item": "https://koopindia.com/documentation-compliance"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Company Registration Consultant",
        "item": "https://koopindia.com/documentation-compliance/company-registration"
      }
    ]
  };

  return (
    <div className="font-sans text-slate-700 bg-white antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative bg-[#0F172A] overflow-hidden">

        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-400/6 blur-[100px] pointer-events-none" />

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">

          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 text-orange-300 text-xs font-medium px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              India's Most Trusted Registration Partner
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                Top <span className="text-orange-400">Company Registration</span><br />
                Consultant in India
              </h1>
              <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
                Looking for the best company registration consultant in Noida or Delhi NCR? We offer 100% online private limited company registration, OPC, LLP, and startup compliance services with no hidden charges.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {/* ✅ onOpenModal */}
                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-2 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-500/30"
                >
                  Start Registration <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white text-sm font-medium px-7 py-3.5 rounded-xl transition-all duration-200"
                >
                  See How It Works
                </a>
              </div>

              <div className="flex flex-wrap gap-5">
                {[
                  { icon: <BadgeCheck className="w-4 h-4" />, label: "MCA Approved Filings" },
                  { icon: <Zap className="w-4 h-4" />, label: "7–12 Day Turnaround" },
                  { icon: <Lock className="w-4 h-4" />, label: "No Hidden Charges" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-400 text-xs">
                    <span className="text-orange-400">{t.icon}</span>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "5,000+", label: "Companies Registered", sub: "Across India" },
                { num: "₹9,999", label: "Starting Price", sub: "All-inclusive" },
                { num: "100%", label: "Online Process", sub: "No office visits" },
                { num: "4.9 ★", label: "Client Rating", sub: "Verified reviews" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/8 rounded-2xl p-5 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-orange-400 font-mono mb-1">{s.num}</div>
                  <div className="text-white text-xs font-semibold mb-0.5">{s.label}</div>
                  <div className="text-slate-500 text-xs">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <Tag>What Is This?</Tag>
              <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-5 leading-tight tracking-tight">
                Online Company Registration Services — <span className="text-orange-500">Explained Simply</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Registering a company in India means officially incorporating your business as a separate legal entity under the Ministry of Corporate Affairs (MCA). As a leading online company registration consultant, we ensure your business is legally ready to open bank accounts, sign contracts, and raise funds.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                India recognises several business structures — Private Limited Company, One Person Company, Limited Liability Partnership, and Partnership Firm — each with different ownership rules, compliance requirements, and tax implications. We specialize in company registration for startups, helping you choose the right structure as your first crucial decision.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                At <strong className="text-[#0F172A]">Koop India</strong>, we walk you through this choice with a free expert consultation, then handle every step of the process — from name approval and document preparation to MCA compliance services and delivery of your Certificate of Incorporation.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Shield className="w-5 h-5 text-orange-500" />, title: "Legal Protection", body: "Your personal assets stay protected. Company liabilities don't affect you personally once properly incorporated." },
                { icon: <TrendingUp className="w-5 h-5 text-orange-500" />, title: "Funding & Growth Ready", body: "Only registered entities can accept equity investment, get bank loans, or apply for government startup schemes." },
                { icon: <BadgeCheck className="w-5 h-5 text-orange-500" />, title: "Credibility with Clients", body: "Registered companies appear on MCA's public registry — giving vendors, clients, and partners confidence in your business." },
                { icon: <FileText className="w-5 h-5 text-orange-500" />, title: "Tax Advantages", body: "Corporate tax rates, startup exemptions, and deductions are only available to properly registered entities." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A] mb-1">{item.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Tag>Entity Types</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              Which Structure Is <span className="text-orange-500">Right for You?</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Each business structure has its own rules, advantages, and compliance levels. Here's an honest breakdown to help you decide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="relative border-2 border-orange-200 bg-gradient-to-br from-orange-50/60 to-white rounded-2xl p-7 overflow-hidden">
              <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Most Popular</span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base">Private Limited Company</h3>
                  <p className="text-xs text-orange-600 font-medium">Best for startups &amp; scaling businesses</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                The gold standard for any serious business. Pvt Ltd is trusted by investors, banks, and enterprise clients. It gives you a separate legal identity, limited liability for shareholders, and the ability to raise equity funding.
              </p>
              <ul className="space-y-2 mb-6">
                <Check>Minimum 2 Directors &amp; 2 Shareholders</Check>
                <Check>No minimum paid-up capital required</Check>
                <Check>Can accept VC / Angel investment</Check>
                <Check>Eligible for Startup India recognition</Check>
                <Check>Strong brand credibility &amp; legal standing</Check>
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-orange-100">
                <div><div className="text-xs text-slate-400 mb-0.5">Registration time</div><div className="text-sm font-semibold text-slate-700">7–10 working days</div></div>
                <div><div className="text-xs text-slate-400 mb-0.5">Compliance level</div><div className="text-sm font-semibold text-slate-700">Moderate–High</div></div>
              </div>
            </div>

            <div className="border border-slate-200 bg-white rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base">One Person Company (OPC)</h3>
                  <p className="text-xs text-slate-500 font-medium">Best for solo founders &amp; freelancers</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                A corporate structure for a single entrepreneur. You get all the benefits of a Private Limited — limited liability, separate legal identity, bank accounts — without needing a second person. Perfect for consultants, creators, and solo professionals.
              </p>
              <ul className="space-y-2 mb-6">
                <Check>Only 1 Director &amp; 1 Shareholder required</Check>
                <Check>1 Nominee must be appointed</Check>
                <Check>No minimum capital requirement</Check>
                <Check>Easy conversion to Pvt Ltd as you scale</Check>
                <Check>Full corporate benefits for one person</Check>
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div><div className="text-xs text-slate-400 mb-0.5">Registration time</div><div className="text-sm font-semibold text-slate-700">7–10 working days</div></div>
                <div><div className="text-xs text-slate-400 mb-0.5">Compliance level</div><div className="text-sm font-semibold text-slate-700">Low–Moderate</div></div>
              </div>
            </div>

            <div className="border border-slate-200 bg-white rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base">Limited Liability Partnership</h3>
                  <p className="text-xs text-slate-500 font-medium">Best for professionals &amp; service firms</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                An LLP gives you the flexibility of a partnership with the limited liability of a company. Popular with CA firms, law firms, architects, and consultants. Lower compliance burden than Pvt Ltd with flexible profit-sharing.
              </p>
              <ul className="space-y-2 mb-6">
                <Check>Minimum 2 Designated Partners</Check>
                <Check>No minimum capital requirement</Check>
                <Check>Partners' personal assets protected</Check>
                <Check>Lower annual compliance than Pvt Ltd</Check>
                <Check>Flexible internal management structure</Check>
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div><div className="text-xs text-slate-400 mb-0.5">Registration time</div><div className="text-sm font-semibold text-slate-700">10–12 working days</div></div>
                <div><div className="text-xs text-slate-400 mb-0.5">Compliance level</div><div className="text-sm font-semibold text-slate-700">Low</div></div>
              </div>
            </div>

            <div className="border border-slate-200 bg-white rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base">Partnership Firm</h3>
                  <p className="text-xs text-slate-500 font-medium">Best for small &amp; family businesses</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                The simplest and cheapest business structure — just a Partnership Deed and registration with the Registrar of Firms. No MCA involvement. No corporate tax rates. Ideal for traditional small businesses and family enterprises that don't plan to scale significantly.
              </p>
              <ul className="space-y-2 mb-6">
                <Check>Minimum 2 partners required</Check>
                <Check>Simple Partnership Deed needed</Check>
                <Check>No minimum capital requirement</Check>
                <Check>Minimal compliance burden</Check>
                <Check>Very low cost to set up</Check>
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div><div className="text-xs text-slate-400 mb-0.5">Registration time</div><div className="text-sm font-semibold text-slate-700">3–5 working days</div></div>
                <div><div className="text-xs text-slate-400 mb-0.5">Compliance level</div><div className="text-sm font-semibold text-slate-700">Very Low</div></div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#0F172A] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 justify-between">
            <div>
              <p className="text-white font-semibold text-sm mb-1">Not sure which one to pick?</p>
              <p className="text-slate-400 text-xs leading-relaxed">Our CA/CS expert will analyse your business model, growth plans, and tax situation — and give you a clear recommendation in 15 minutes.</p>
            </div>
            {/* ✅ onOpenModal */}
            <button
              onClick={onOpenModal}
              className="flex-shrink-0 inline-flex items-center gap-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Get Free Advice <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="process" className="pb-14 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Tag>How It Works</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              6 Steps to Your <span className="text-orange-500">Certificate of Incorporation</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              We handle 90% of the work. You only need to share your documents and sign where required.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

            <div className="grid md:grid-cols-6 gap-6">
              {[
                { n: "01", title: "Free Consultation", body: "Our CA/CS calls you, understands your business, and recommends the best structure for your goals and budget." },
                { n: "02", title: "Name Reservation", body: "We check name availability on MCA and file for name approval via RUN or SPICe+ — usually approved in 1–2 days." },
                { n: "03", title: "DSC & DIN", body: "Digital Signature Certificates for e-filing and Director Identification Numbers are generated for all directors." },
                { n: "04", title: "Document Drafting", body: "Our experts draft your MOA, AOA, LLP Agreement, or Partnership Deed tailored to your business activity." },
                { n: "05", title: "MCA Filing", body: "Incorporation application submitted to Ministry of Corporate Affairs with all supporting documents. We track it daily." },
                { n: "06", title: "You're Incorporated!", body: "Certificate of Incorporation delivered digitally. Company PAN and TAN applications filed simultaneously." },
              ].map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-orange-500 font-bold text-lg font-mono">{step.n}</span>
                  </div>
                  <h4 className="text-[#0F172A] text-xs font-bold mb-2 leading-tight">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>Total turnaround: <strong className="text-slate-700">7–12 working days</strong> (subject to MCA processing speed)</span>
          </div>
        </div>
      </section>

      <section className="pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Tag>Documents Required</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              What Do You <span className="text-orange-500">Need to Provide?</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              The checklist is simpler than you think. Most documents you already have. We'll tell you exactly what format is needed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-500" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm">For Each Director / Partner</h4>
              </div>
              <ul className="space-y-3">
                <Check>PAN Card <span className="text-orange-500 font-medium">(mandatory)</span></Check>
                <Check>Aadhaar Card</Check>
                <Check>Passport-size photograph (recent)</Check>
                <Check>Active personal email address</Check>
                <Check>Mobile number linked to Aadhaar</Check>
                <Check>Passport copy — for foreign nationals or NRIs</Check>
              </ul>
              <div className="mt-5 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-xs text-amber-700 leading-relaxed">
                  📌 For foreign directors: notarised and apostilled copies of passport and address proof are required.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm">Registered Office Proof</h4>
              </div>
              <ul className="space-y-3">
                <Check>Recent electricity or water bill</Check>
                <Check>Rent Agreement (if rented premises)</Check>
                <Check>No-Objection Certificate from owner</Check>
                <Check>Property tax receipt (if self-owned)</Check>
              </ul>
              <div className="mt-5 p-3 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-xs text-green-700 leading-relaxed">
                  ✅ You can use your home address as the registered office — perfectly legal and very common for new companies.
                </p>
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed">
                  💡 Virtual office addresses are also accepted. We can help you get one if needed.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-4 h-4 text-orange-500" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm">Entity-Specific Documents</h4>
              </div>
              <ul className="space-y-3">
                <Check>Memorandum of Association — MOA <span className="text-slate-400">(Pvt Ltd / OPC)</span></Check>
                <Check>Articles of Association — AOA <span className="text-slate-400">(Pvt Ltd / OPC)</span></Check>
                <Check>LLP Agreement <span className="text-slate-400">(for LLP)</span></Check>
                <Check>Partnership Deed <span className="text-slate-400">(for Partnership)</span></Check>
                <Check>Nominee details &amp; consent <span className="text-slate-400">(OPC only)</span></Check>
              </ul>
              <div className="mt-5 p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <p className="text-xs text-orange-700 leading-relaxed">
                  ✨ All legal documents — MOA, AOA, LLP Agreement — are drafted professionally by Koop India's CA/CS team. You don't need to arrange these.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange-500/15 border border-orange-500/25 text-orange-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
              Transparent Pricing
            </span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-3 tracking-tight">
              Simple, Honest Fees — <span className="text-orange-400">No Surprises</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Our pricing covers government fees + professional charges in a single transparent quote. We explain every line item before you pay.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {[
              { type: "Private Limited", price: "₹9,999", note: "Most popular" },
              { type: "One Person Company", price: "₹9,999", note: "Solo founders" },
              { type: "LLP", price: "₹9,999", note: "Professionals" },
              { type: "Partnership Firm", price: "₹4,999", note: "Quick setup" },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-orange-500/8 hover:border-orange-500/25 transition-all duration-200"
              >
                <div className="text-slate-400 text-xs mb-2 font-medium">{p.type}</div>
                <div className="text-orange-400 text-3xl font-bold font-mono mb-1">{p.price}<span className="text-lg">*</span></div>
                <div className="text-slate-500 text-xs">{p.note}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/8 rounded-2xl p-8">
            <h4 className="text-white font-semibold text-sm mb-6">Everything included in your package:</h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "DSC (Digital Signature Certificate) for all directors",
                "DIN (Director Identification Number)",
                "Name approval filing with MCA",
                "MOA / AOA / LLP Agreement drafting",
                "SPICe+ incorporation form filing",
                "Certificate of Incorporation (digital)",
                "Company PAN Card application",
                "Company TAN application",
                "Post-incorporation advisory call",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400 text-xs leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-slate-600 text-xs">
              * Indicative starting price. Final cost depends on authorised share capital and applicable state stamp duty. We'll give you an exact quote after a 15-minute consultation — no obligations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Tag>After Incorporation</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              Annual Compliance — <span className="text-orange-500">What Comes Next</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              Registration is just the beginning. Staying compliant keeps your company active and avoids penalties. Koop India can manage all of this for you with an annual compliance package.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Immediately After Registration",
                icon: <Zap className="w-4 h-4 text-orange-500" />,
                items: [
                  "Open a current bank account in company name",
                  "File INC-20A (Commencement of Business declaration)",
                  "Issue share certificates to all shareholders",
                  "Apply for GST registration (if turnover > ₹20L)",
                  "Register for MSME / Udyam if eligible",
                  "Set up statutory registers and minute books",
                ],
              },
              {
                title: "Private Limited Company — Annual",
                icon: <Building2 className="w-4 h-4 text-orange-500" />,
                items: [
                  "Statutory audit by Chartered Accountant",
                  "Annual ROC filing — AOC-4 (financials) & MGT-7 (annual return)",
                  "Minimum 4 Board meetings per year",
                  "Income Tax Return filing",
                  "GST monthly/quarterly returns (if registered)",
                  "Director KYC filing (Form DIR-3 KYC)",
                ],
              },
              {
                title: "LLP — Annual Obligations",
                icon: <FileText className="w-4 h-4 text-orange-500" />,
                items: [
                  "Annual Return filing — Form 11 (by 30 May)",
                  "Statement of Accounts — Form 8 (by 30 Oct)",
                  "Income Tax Return filing",
                  "Statutory audit required if turnover exceeds ₹40 lakhs",
                  "GST returns if registered",
                  "Partner KYC update if any changes",
                ],
              },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-sm leading-tight">{card.title}</h4>
                </div>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Dot />
                      <span className="text-xs text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-orange-500 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 justify-between">
            <div>
              <p className="text-white font-semibold text-sm mb-1">Don't want to worry about compliance deadlines?</p>
              <p className="text-orange-100 text-xs leading-relaxed">Our annual compliance packages cover all ROC filings, ITR, GST returns, and advisory — fixed price, no surprises.</p>
            </div>
            {/* ✅ onOpenModal */}
            <button
              onClick={onOpenModal}
              className="flex-shrink-0 inline-flex items-center gap-2 cursor-pointer bg-white text-orange-600 hover:bg-orange-50 text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Ask About Compliance Packages <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Tag>Why Koop India</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              We're Not Just a Portal — <span className="text-orange-500">We're Your Partners</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Over 5,000 founders, freelancers, and growing businesses have trusted Koop India. Here's why they keep coming back.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: <Users className="w-6 h-6 text-orange-500" />, title: "Real CA & CS Professionals", body: "Every file is handled by a licensed Chartered Accountant or Company Secretary — not a chatbot or automated system. You get a dedicated expert who knows your case." },
              { icon: <Shield className="w-6 h-6 text-orange-500" />, title: "Zero Rejection Guarantee", body: "Our multi-step review catches errors before filing. We back this with a re-filing commitment at no extra cost if MCA rejects for any reason attributable to our work." },
              { icon: <Clock className="w-6 h-6 text-orange-500" />, title: "Fastest Turnaround", body: "We proactively follow up with MCA and resolve queries immediately. Most clients receive their Certificate of Incorporation within 7–10 working days." },
              { icon: <Lock className="w-6 h-6 text-orange-500" />, title: "100% Transparent Pricing", body: "We itemise every charge — government fee, stamp duty, professional fee — before you pay. What's quoted is what you pay. Always." },
              { icon: <TrendingUp className="w-6 h-6 text-orange-500" />, title: "Startup & MSME Specialists", body: "We understand the startup ecosystem, DPIIT recognition, Startup India benefits, and MSME schemes — and help you access these from day one." },
              { icon: <FileText className="w-6 h-6 text-orange-500" />, title: "Long-Term Support Partner", body: "We don't disappear after incorporation. GST, ITR, compliance, bookkeeping — we're your one-stop financial and legal partner as your business grows." },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm mb-2">{card.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Tag>Client Stories</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              What Founders Say <span className="text-orange-500">About Koop India</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I registered my Pvt Ltd in 9 days flat. The CA called me within 2 hours of signing up, explained everything patiently, and handled all the paperwork. I literally just sent scanned copies of my PAN and Aadhaar and got my incorporation certificate a week later.", name: "Rahul Kumar", role: "Founder, TechStack Solutions", initials: "RK", company: "Private Limited Co." },
              { quote: "I was confused between LLP and Pvt Ltd for months. The Koop India team gave me a 20-minute call, understood my consulting business, and clearly explained why LLP made more sense for my situation. Super honest advice — they could've pushed the pricier option.", name: "Priya Sharma", role: "Director, Sharma & Co LLP", initials: "PS", company: "LLP" },
              { quote: "Set up an OPC as a solo designer. The pricing was completely transparent — I knew every rupee I was paying and why. They also helped me with GST registration and my first ITR. Will definitely use Koop for annual compliance going forward.", name: "Ananya Mehta", role: "Freelance Designer & OPC Owner", initials: "AM", company: "One Person Company" },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <blockquote className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">"{t.quote}"</blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold flex-shrink-0">{t.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F172A]">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                  <span className="ml-auto text-[10px] bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full font-medium">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW BUSINESS COMPLIANCE SECTION --- */}
      <section className="py-16 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
            <div>
              <Tag>Business Compliance</Tag>
              <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-5 leading-tight tracking-tight">
                Running A Business Is Hard. <br /><span className="text-orange-500">Compliance Shouldn’t Be.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                India’s Complete Business Compliance Solution — GST, TDS, PF, ESIC, ROC, Audit Support, Accounting & ITR. All in One Place. Outsource Your Business Compliance. Stay Focused on Growth.
              </p>

              <ul className="space-y-3 mb-8">
                <Check>Trusted by 10,000+ Businesses</Check>
                <Check>4.5 Star Rating on Google</Check>
                <Check>Fast. Affordable. Reliable.</Check>
              </ul>
              <button onClick={onOpenModal} className="inline-flex items-center gap-2 bg-[#0F172A] cursor-pointer text-white hover:bg-slate-800 text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200">
                Talk to Our Expert <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <img src="/images/business_compliance.png" alt="Business Compliance Services" className="rounded-2xl shadow-2xl w-full" />
            </div>
          </div>

          {/* Vendors vs Us */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-16 border border-slate-100">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Still Managing Compliance with Multiple Vendors?</h3>
              <p className="text-slate-500 text-sm">One for GST, Another for TDS, Someone else for PF/ESIC = Missed deadlines & Heavy penalties.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative hidden md:block">
                <img src="/images/online_process.png" alt="Company Registration with GST" className="rounded-2xl shadow-xl w-full max-w-sm mx-auto" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#0F172A] mb-5">With Koop India, you get:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "GST Filing", "TDS Returns", "PF & ESIC Compliance", "ROC Filings",
                    "ITR Filing", "Accounting", "Legal Support (ODR)", "Audit Support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-12">
            <Tag>Transparent Pricing</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">Professional Services <span className="text-orange-500">Plans</span></h2>
            <p className="text-slate-500 text-xs">* Excluding Govt. fees</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Starter Plan */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-orange-200 transition-colors">
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Starter Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-orange-500">₹2,999</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <Check>Business Compliance</Check>
                <Check>ITR (1/year)</Check>
                <Check>Accounting</Check>
                <Check>Dedicated Manager</Check>
              </ul>
              <button onClick={onOpenModal} className="w-full bg-slate-50 cursor-pointer hover:bg-slate-100 text-slate-800 font-semibold py-3 rounded-xl transition-colors border border-slate-200">Contact Now</button>
            </div>

            {/* Growth Plan */}
            <div className="bg-[#0F172A] rounded-3xl p-8 relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Growth Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-orange-400">₹4,999</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["GST Filing (monthly)", "ITR (business + director)", "ROC Compliance", "TDS Filing", "Audit Support", "PF & ESIC", "Dedicated Manager", "Accounting"].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={onOpenModal} className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">Contact Now</button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-orange-200 transition-colors">
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Pro Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-orange-500">₹7,999</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <Check>Everything in Growth</Check>
                <Check>Tax Planning</Check>
                <Check>Notice Handling</Check>
                <Check>Dedicated Manager</Check>
                <Check>Priority Support</Check>
              </ul>
              <button onClick={onOpenModal} className="w-full cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3 rounded-xl transition-colors border border-slate-200">Contact Now</button>
            </div>
          </div>

          {/* Advantage */}
          <div className="grid md:grid-cols-4 gap-6 text-center border-t border-slate-100 pt-16">
            {[
              { title: "English & Hindi", sub: "Customer Support Available" },
              { title: "Experienced Team", sub: "Handling your accounts" },
              { title: "Free Compliance", sub: "Annual Drafting" },
              { title: "Statutory Audit", sub: "With Audit Fees Included" }
            ].map((item, i) => (
              <div key={i}>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="w-5 h-5 text-orange-500" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <Tag>FAQ</Tag>
            <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-3 tracking-tight">
              Questions We Get <span className="text-orange-500">All the Time</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Answers to the most common questions from founders before they register.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { q: "Which structure is best for a startup looking to raise funding?", a: "A Private Limited Company is the only structure that allows equity investment from VCs, angel investors, and institutional funds. If raising money is part of your plan, Private Limited Company Registration Online is the right choice. It also qualifies for DPIIT Startup India recognition." },
              { q: "Can I register a company using my home address?", a: "Absolutely. Your home address is perfectly valid as a registered office address. You'll need to provide an electricity bill or bank statement for the property. As the best company registration consultant in Noida and Delhi NCR, we guide you through this process seamlessly." },
              { q: "Do I need to be physically present anywhere during registration?", a: "No. The entire process is 100% online. As an online company registration consultant, we handle everything digitally. You'll need to e-sign some documents using your Aadhaar-linked OTP or DSC." },
              { q: "What is the minimum capital I need to register a company?", a: "There is no statutory minimum paid-up capital for Private Limited, OPC, or LLP under current Indian law. We offer affordable company registration services in India regardless of your capital size." },
              { q: "How do I know if I need GST registration after incorporating?", a: "GST registration is compulsory if your business turnover crosses threshold limits or if you sell online. We provide company registration with GST as a bundled service for a seamless start." },
              { q: "Can a Non-Resident Indian or foreign national be a director?", a: "Yes. NRIs and foreign nationals can be directors or shareholders of Indian companies. However, at least one director must be a Resident Indian." },
              { q: "What happens if MCA rejects my company name?", a: "Name rejections happen occasionally due to trademark similarities. We offer combined company registration and trademark services to ensure your brand is protected and name approval goes smoothly." },
              { q: "What ongoing compliance is required after registration?", a: "For a Private Limited Company: annual ROC filings, statutory audit, ITR, and GST. As your dedicated corporate compliance consultant, Koop India offers annual compliance services that cover all of these under a single fixed fee." },
              { q: "How soon can I open a bank account after getting my incorporation certificate?", a: "Immediately. Most banks process current account applications for new companies within 2–5 working days once you submit the Certificate of Incorporation." },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- SEO KEYWORDS SECTION --- */}
      <section className="py-12 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-[#0F172A]">Our Specialised Services & Consulting Locations</h3>
            <p className="text-sm text-slate-500 mt-2">Trusted business compliance and registration consultants across India.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Company Registration Consultant in India",
              "Best Company Registration Consultant in Noida",
              "Private Limited Company Registration Online",
              "Register Private Limited Company in India",
              "Company Registration with GST",
              "Company Registration and Trademark Services",
              "Company Registration for Startups",
              "Online Company Registration Consultant",
              "Affordable Company Registration Services India",
              "Company Registration Consultant Near Me",
              "Company Registration Consultant in Noida",
              "Company Registration Consultant in Delhi",
              "Company Registration Consultant in Gurugram",
              "Company Registration Consultant in Ghaziabad",
              "Company Registration Consultant in Faridabad",
              "Company Registration Consultant in Bengaluru",
              "Company Registration Consultant in Mumbai",
              "Company Registration Consultant in Pune",
              "Company Registration Consultant in Hyderabad",
              "Company Registration Consultant in Bhubaneswar",
              "Company Registration Consultant",
              "Company Compliance Consultant",
              "Business Compliance Services",
              "Online Company Registration",
              "ROC Compliance Services",
              "Annual Compliance Services",
              "Corporate Compliance Consultant",
              "Startup Compliance Consultant",
              "Company Registration Services",
              "MCA Compliance Consultant"
            ].map((kw, i) => (
              <span key={i} className="text-[11px] text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-orange-300 hover:text-orange-600 transition-colors cursor-default">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-orange-800/20 blur-[60px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "30px 30px" }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 border border-white/30 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Get Started Today
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            Ready to Make Your Business<br />
            <span className="text-[#0F172A]">Officially Official?</span>
          </h2>
          <p className="text-orange-100 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 15-minute consultation with our CA/CS team. No commitments, no sales pressure — just honest advice on the best structure for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center cursor-pointer justify-center gap-2 bg-[#0F172A] hover:bg-slate-900 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all duration-200 whitespace-nowrap shadow-xl"
            >
              Book Free Call <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenModal}
              className="inline-flex items-center cursor-pointer justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Talk to Expert
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-xs">
            {["No spam — ever", "Free, zero-obligation advice", "Response within 2 hours"].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Yahan bas tumhara existing EnquiryModal — koi naya modal nahi */}
      <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

    </div>
  );
}