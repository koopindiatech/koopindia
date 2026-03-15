"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ArrowRight, Clock, Shield, FileText, Users, Building2, Briefcase, Star, Phone, Mail, MapPin, BadgeCheck, Zap, TrendingUp, Lock } from "lucide-react";

// ✅ Apna existing EnquiryModal aur useModal import karo
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
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-orange-200 bg-orange-50/40" : "border-slate-200 bg-white"
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
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-orange-500" : "text-slate-400"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function CompanyRegistration() {
  // ✅ Sirf yahi chahiye — koi local modalOpen state nahi
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  return (
    <div className="font-sans text-slate-700 bg-white antialiased">

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
                Start Your Business<br />
                in India —{" "}
                <span className="text-orange-400">The Right Way</span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
                Private Limited · OPC · LLP · Partnership Firm. End-to-end expert support by real CA &amp; CS professionals. 100% online, no office visits, no hidden charges.
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
                Company Registration in India — <span className="text-orange-500">Explained Simply</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Registering a company in India means officially incorporating your business as a separate legal entity under the Ministry of Corporate Affairs (MCA). Once registered, your company can open bank accounts, sign contracts, hire employees, raise funds, and operate legally.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                India recognises several business structures — Private Limited Company, One Person Company, Limited Liability Partnership, and Partnership Firm — each with different ownership rules, compliance requirements, and tax implications. Choosing the right structure is the most important first decision.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                At <strong className="text-[#0F172A]">Koop India</strong>, we walk you through this choice with a free expert consultation, then handle every step of the process — from name approval and document preparation to MCA filing and delivery of your Certificate of Incorporation.
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
              { q: "Which structure is best for a startup looking to raise funding?", a: "A Private Limited Company is the only structure that allows equity investment from VCs, angel investors, and institutional funds. If raising money is part of your plan — even 2–3 years from now — Pvt Ltd is the right choice. It also qualifies for DPIIT Startup India recognition, giving you tax exemptions and easier compliance." },
              { q: "Can I register a company using my home address?", a: "Absolutely. Your home address is perfectly valid as a registered office address. You'll need to provide an electricity bill or bank statement for the property and a No-Objection Certificate if you don't own it. Many founders start with a home address and change it after they get an office." },
              { q: "Do I need to be physically present anywhere during registration?", a: "No. The entire process is 100% online. You'll need to e-sign some documents using your Aadhaar-linked OTP or DSC — which we'll set up for you. No notary visits, no government office trips, nothing physical required." },
              { q: "What is the minimum capital I need to register a company?", a: "There is no statutory minimum paid-up capital for Private Limited, OPC, or LLP under current Indian law. You can register with even ₹1 in authorised capital, though ₹1 lakh is common in practice. Note that authorised capital affects stamp duty in some states, which is why we advise you before choosing it." },
              { q: "How do I know if I need GST registration after incorporating?", a: "GST registration is compulsory if your business: (1) has annual turnover above ₹20 lakhs (₹10 lakhs in special category states), (2) makes inter-state supplies, (3) sells on e-commerce platforms, or (4) exports goods or services. If you're below the threshold, it's optional — but many businesses register voluntarily for input tax credit benefits." },
              { q: "Can a Non-Resident Indian or foreign national be a director?", a: "Yes. NRIs and foreign nationals can be directors or shareholders of Indian companies. However, at least one director must be a Resident Indian (someone who has stayed in India for at least 182 days in the previous financial year). Foreign directors need notarised and apostilled copies of their passport and address proof." },
              { q: "What happens if MCA rejects my company name?", a: "Name rejections happen occasionally — usually because the name is too similar to an existing trademark or company, or contains restricted words. We do a thorough availability check before filing to minimise this risk. If a rejection does occur, we provide alternate name suggestions and re-file at no extra charge." },
              { q: "What ongoing compliance is required after registration?", a: "For a Private Limited Company: annual ROC filings (AOC-4 and MGT-7), statutory audit, minimum 4 board meetings, ITR filing, GST returns if applicable, and Director KYC (DIR-3). For LLP: Form 11 and Form 8 annually, plus ITR. Koop India offers annual compliance packages that cover all of these under a single fixed fee." },
              { q: "How soon can I open a bank account after getting my incorporation certificate?", a: "Immediately. Most banks process current account applications for new companies within 2–5 working days once you submit the Certificate of Incorporation, MOA/AOA, PAN, and KYC of directors. We'll guide you through exactly what each bank needs." },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-orange-500/8 blur-[100px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <span className="inline-block bg-orange-500/15 border border-orange-500/25 text-orange-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Get Started Today
          </span>
          <h2 className="text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
            Ready to Make Your Business<br />
            <span className="text-orange-400">Officially Official?</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            Book a free 15-minute consultation with our CA/CS team. No commitments, no sales pressure — just honest advice on the best structure for your business and a clear quote.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
           
            {/* ✅ onOpenModal */}
            <button
              onClick={onOpenModal}
              className="inline-flex items-center cursor-pointer justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-lg shadow-orange-500/30"
            >
              Book Free Call <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs">
            {["No spam — ever", "Free, zero-obligation advice", "Response within 2 hours"].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
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