"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import {
  CheckCircle, ArrowRight, ShieldCheck, Clock, ChevronDown,
  Phone, Award, TrendingUp, Users, Zap, Lock, RefreshCw, Star
} from "lucide-react";

import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

/* ─── Fade-in on scroll hook ─── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useFadeIn();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(start);
    }, 20);
    return () => clearInterval(id);
  }, [visible, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── FAQ accordion ─── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f1f5f9" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "16px 0", textAlign: "left",
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13.5, fontWeight: 600, color: open ? "#F97316" : "#1e293b",
          fontFamily: "inherit", transition: "color .2s",
        }}
      >
        {q}
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0, marginLeft: 12, color: "#F97316",
            transition: "transform .3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div style={{ overflow: "hidden", transition: "max-height .3s ease", maxHeight: open ? "240px" : "0px" }}>
        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.75, paddingBottom: 16 }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Scroll-triggered fade wrapper ─── */
function Fade({ children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .5s ease ${delay}ms, transform .5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════ */
const FSSAILicensePage = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const stats = [
    { value: 5000, suffix: "+",     label: "Licenses Processed" },
    { value: 98,   suffix: "%",     label: "Approval Rate"      },
    { value: 7,    suffix: " Days", label: "Avg. Basic TAT"     },
    { value: 500,  suffix: "+",     label: "Happy Clients"      },
  ];

  const licenseTypes = [
    {
      tag: "Starter", title: "Basic Registration",
      turnover: "Up to ₹12 Lakh / year", color: "#10b981",
      items: ["Home-based food businesses", "Small retailers & petty manufacturers", "Food stalls, hawkers, small caterers", "Temporary / seasonal food sellers"],
    },
    {
      tag: "Most Popular", title: "State License", featured: true,
      turnover: "₹12 Lakh – ₹20 Crore / year", color: "#F97316",
      items: ["Restaurants, hotels, cloud kitchens", "Medium-scale manufacturers", "Distributors within one state", "Catering businesses & canteens"],
    },
    {
      tag: "Enterprise", title: "Central License",
      turnover: "Above ₹20 Crore / Mandatory", color: "#6366f1",
      items: ["Large-scale food manufacturers", "Importers & exporters of food", "eCommerce food businesses", "Multi-state & all-India operations"],
    },
  ];

  const docSections = [
    {
      title: "Common Documents",
      docs: ["PAN Card of applicant / entity", "Aadhaar Card of proprietor / director", "Passport-size photograph", "Valid email ID & mobile number", "Business address proof (utility bill / rent deed)"],
    },
    {
      title: "Business Entity Documents",
      docs: ["Certificate of Incorporation (Pvt Ltd / LLP)", "Partnership Deed (if applicable)", "GST Registration Certificate", "Shop & Establishment Certificate", "Board Resolution (for companies)"],
    },
    {
      title: "Premises & Product Docs",
      docs: ["Rent agreement / NOC from owner", "List of food products to be manufactured", "Water test report (for manufacturers)", "Layout plan of food premises", "Food Safety Management System (FSMS) plan"],
    },
  ];

  const steps = [
    { title: "Free Consultation",      desc: "Understand your business type, turnover & operations to select the correct license category." },
    { title: "Document Collection",    desc: "Our team collects, verifies, and prepares all required documents to avoid delays or rejections." },
    { title: "Application Filing",     desc: "Online application submitted on the official FoSCoS portal with accurate business details." },
    { title: "Review & Scrutiny",      desc: "Department reviews your application. We handle all queries and respond promptly on your behalf." },
    { title: "Inspection (If Needed)", desc: "For State & Central licenses, physical inspection of premises may be conducted by FSSAI officers." },
    { title: "License Issued",         desc: "FSSAI License certificate issued and delivered. You are now legally compliant to operate." },
  ];

  const faqs = [
    { q: "Is FSSAI registration mandatory for all food businesses?",       a: "Yes, every Food Business Operator (FBO) involved in manufacturing, processing, storage, distribution, or sale of food in India must obtain FSSAI registration or license before commencing operations." },
    { q: "What is the difference between FSSAI registration and license?", a: "FSSAI Basic Registration is for very small businesses (turnover up to ₹12 lakh). State & Central Licenses are for medium and large-scale businesses. The type depends on your turnover, scale of operations, and nature of business." },
    { q: "How long does FSSAI registration take?",                          a: "Basic Registration typically takes 3–7 working days. State License takes 7–30 days and Central License may take 30–60 days depending on government processing and inspection schedules." },
    { q: "Can I sell food online without FSSAI license?",                   a: "No. Any food business selling online (via Swiggy, Zomato, Amazon, your own website) must hold a valid FSSAI license. eCommerce food sellers typically require a Central License." },
    { q: "What is the validity of an FSSAI license?",                       a: "FSSAI licenses can be obtained for 1 to 5 years. You can choose the validity at the time of application. Renewal should be done before expiry to avoid penalties." },
    { q: "What are the penalties for operating without FSSAI license?",     a: "Operating without FSSAI registration can attract penalties up to ₹5 lakh and imprisonment up to 6 months under the Food Safety and Standards Act, 2006." },
    { q: "Do I need a separate FSSAI license for each state?",              a: "If you manufacture or process food in multiple states, you may need a Central License. However, storage and distribution from a common warehouse in one state can be covered under a State License for that state." },
    { q: "Can I modify my FSSAI license after it is issued?",               a: "Yes. You can apply for modification to update business name, address, food products, or other details. Koop India provides full post-license modification support." },
  ];

  const whyKoop = [
    { icon: Award,      title: "Food Compliance Specialists",  desc: "Dedicated team with in-depth FSSAI knowledge since the FoSCoS portal migration." },
    { icon: Zap,        title: "Fast & Hassle-free Process",   desc: "We handle everything end-to-end — you just focus on your business." },
    { icon: Users,      title: "MSME & Startup Friendly",      desc: "Affordable packages designed for small food businesses and first-time applicants." },
    { icon: TrendingUp, title: "Correct License Selection",    desc: "Wrong license type leads to penalties. We ensure you apply for the right one." },
    { icon: Lock,       title: "100% Secure & Confidential",   desc: "Your business data is protected and never shared with any third party." },
    { icon: RefreshCw,  title: "Renewal & Compliance Support", desc: "We remind you before expiry and handle annual returns, modifications & more." },
  ];

  return (
    <>
      {/* ── SEO ── */}
      <Head>
        <title>FSSAI License Registration in India | Basic, State & Central | Koop India</title>
        <meta name="description" content="Apply for FSSAI License Registration in India with Koop India. Get Basic, State or Central FSSAI License online with expert support, transparent fees & fast approval." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.koopindia.com/fssai-license" />
      </Head>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .fp * { box-sizing: border-box; }
        .fp { font-family: 'DM Sans', sans-serif; color: #374151; line-height: 1.6; background: #fff; }
        .fp h1,.fp h2,.fp h3,.fp h4 { font-family: 'Sora', sans-serif; margin: 0; }
        .fp p { margin: 0; }
        .fp-wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @keyframes fp-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,.35)} 50%{box-shadow:0 0 0 9px rgba(249,115,22,0)} }
        .fp-pulse { animation: fp-pulse 2.6s infinite; }
        .fp-card { transition: transform .22s, box-shadow .22s; }
        .fp-card:hover { transform: translateY(-3px); box-shadow: 0 14px 32px rgba(0,0,0,.07); }
        .fp-obtn { transition: background .2s, color .2s; }
        .fp-obtn:hover { background: #F97316 !important; color: #fff !important; border-color: #F97316 !important; }
      `}</style>

      <div className="fp">

        {/* ══ HERO ══ */}
        <section style={{ background: "linear-gradient(135deg,#0F172A 0%,#1a2744 55%,#0F172A 100%)", padding: "76px 24px 68px", position: "relative", overflow: "hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:380, height:380, borderRadius:"50%", background:"rgba(249,115,22,.055)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:260, height:260, borderRadius:"50%", background:"rgba(99,102,241,.055)", pointerEvents:"none" }} />
          <div className="fp-wrap" style={{ textAlign:"center", position:"relative" }}>
            <span style={{ display:"inline-block", background:"rgba(249,115,22,.15)", color:"#F97316", fontSize:10.5, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", padding:"5px 14px", borderRadius:20, marginBottom:18 }}>
              Trusted by 5,000+ Food Businesses Across India
            </span>
            <h1 style={{ color:"#fff", fontSize:"clamp(22px,3.8vw,38px)", fontWeight:800, lineHeight:1.22, marginBottom:14 }}>
              FSSAI License Registration in India
            </h1>
            <p style={{ color:"#94a3b8", fontSize:13, marginBottom:6 }}>
              Basic Registration &nbsp;•&nbsp; State License &nbsp;•&nbsp; Central License
            </p>
            <p style={{ color:"#94a3b8", fontSize:13, maxWidth:580, margin:"0 auto 30px" }}>
              End-to-end FSSAI registration handled by food compliance experts — document preparation, FoSCoS filing, inspection support & post-license compliance.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
              <button
                onClick={onOpenModal}
                className="fp-pulse"
                style={{ background:"#F97316", color:"#fff", border:"none", padding:"13px 30px", borderRadius:10, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}
              >
                Apply for FSSAI License <ArrowRight size={16} />
              </button>
              <button
                onClick={onOpenModal}
                style={{ background:"transparent", color:"#e2e8f0", border:"1px solid rgba(255,255,255,.2)", padding:"13px 26px", borderRadius:10, fontWeight:500, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}
              >
                Free Eligibility Check
              </button>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px 24px", justifyContent:"center", marginTop:32 }}>
              {["✅ 100% Online Process","⚡ 3–7 Day Delivery","🔒 No Hidden Charges","📞 Expert Guidance"].map(t => (
                <span key={t} style={{ color:"#64748b", fontSize:12 }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <section style={{ background:"#fff", borderBottom:"1px solid #f1f5f9", padding:"28px 24px" }}>
          <div className="fp-wrap" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"20px 56px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <p style={{ fontSize:28, fontWeight:800, color:"#0F172A", fontFamily:"Sora,sans-serif", lineHeight:1 }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontSize:12, color:"#94a3b8", marginTop:4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHAT IS FSSAI ══ */}
        <section style={{ padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:48, alignItems:"center" }}>
                <div>
                  <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>Overview</span>
                  <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 14px" }}>
                    What is an FSSAI License?
                  </h2>
                  <p style={{ fontSize:13.5, color:"#6b7280", lineHeight:1.8, marginBottom:14 }}>
                    The <strong style={{ color:"#374151" }}>FSSAI (Food Safety and Standards Authority of India)</strong> license is a mandatory legal requirement for every Food Business Operator (FBO) in India involved in manufacturing, processing, packaging, storage, transportation, distribution, or retail of food products.
                  </p>
                  <p style={{ fontSize:13.5, color:"#6b7280", lineHeight:1.8 }}>
                    Governed by the <strong style={{ color:"#374151" }}>Food Safety and Standards Act, 2006</strong>, FSSAI ensures all food sold in India meets defined safety and quality standards. Operating without a valid license exposes your business to penalties, raids, and closure orders.
                  </p>
                </div>
                <div style={{ background:"#f8fafc", borderRadius:18, padding:"26px 22px", border:"1px solid #e2e8f0" }}>
                  <p style={{ fontWeight:700, fontSize:13, color:"#0F172A", marginBottom:16 }}>Why FSSAI license is essential for your food business:</p>
                  {[
                    "Operate legally and avoid government penalties up to ₹5 lakh",
                    "Build consumer trust & brand credibility in the market",
                    "Sell on Swiggy, Zomato, Amazon, Flipkart & modern trade",
                    "Appoint distributors, dealers & franchise partners",
                    "Required for Shop & Establishment and GST registration",
                    "Mandatory for bank loans & investor due diligence",
                    "Display FSSAI number on packaging — legal requirement",
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:11 }}>
                      <CheckCircle size={13} style={{ color:"#F97316", marginTop:3, flexShrink:0 }} />
                      <span style={{ fontSize:13, color:"#374151" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ LICENSE TYPES ══ */}
        <section style={{ background:"#f8fafc", borderTop:"1px solid #e2e8f0", borderBottom:"1px solid #e2e8f0", padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>License Categories</span>
                <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 10px" }}>
                  Types of FSSAI Licenses We Offer
                </h2>
                <p style={{ fontSize:13.5, color:"#6b7280", maxWidth:520, margin:"0 auto" }}>
                  The right license depends on your annual turnover, scale of operations, and nature of food business.
                </p>
              </div>
            </Fade>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
              {licenseTypes.map((lt, i) => (
                <Fade key={i} delay={i * 80}>
                  <div className="fp-card" style={{
                    background:"#fff", borderRadius:18,
                    border: lt.featured ? `2px solid ${lt.color}` : "1px solid #e2e8f0",
                    padding:"26px 22px", height:"100%",
                    boxShadow: lt.featured ? `0 8px 32px rgba(249,115,22,.13)` : "none",
                  }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                      <span style={{ background:lt.color+"1a", color:lt.color, fontSize:10, fontWeight:700, padding:"3px 12px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.08em" }}>{lt.tag}</span>
                      {lt.featured && <Star size={14} style={{ color:lt.color }} fill={lt.color} />}
                    </div>
                    <h3 style={{ fontSize:15, fontWeight:700, color:"#0F172A", marginBottom:4 }}>{lt.title}</h3>
                    <p style={{ fontSize:12, color:lt.color, fontWeight:600, marginBottom:18 }}>{lt.turnover}</p>
                    {lt.items.map((item, j) => (
                      <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:9 }}>
                        <CheckCircle size={13} style={{ color:lt.color, marginTop:2, flexShrink:0 }} />
                        <span style={{ fontSize:13, color:"#6b7280" }}>{item}</span>
                      </div>
                    ))}
                    <button
                      onClick={onOpenModal}
                      className="fp-obtn"
                      style={{
                        marginTop:20, width:"100%",
                        background: lt.featured ? lt.color : "transparent",
                        color: lt.featured ? "#fff" : lt.color,
                        border:`1.5px solid ${lt.color}`,
                        padding:"10px 0", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit",
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </Fade>
              ))}
            </div>
            <Fade delay={200}>
              <div style={{ background:"#fff8f3", border:"1px solid #fed7aa", borderRadius:12, padding:"14px 20px", marginTop:22, textAlign:"center" }}>
                <span style={{ fontSize:13, color:"#c2410c" }}>
                  🎯 <strong>Not sure which license suits your business?</strong> — Our experts will guide you for free.{" "}
                  <button onClick={onOpenModal} style={{ background:"none", border:"none", color:"#F97316", fontWeight:700, cursor:"pointer", textDecoration:"underline", fontSize:13, fontFamily:"inherit" }}>
                    Get free guidance →
                  </button>
                </span>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ DOCUMENTS ══ */}
        <section style={{ padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ textAlign:"center", marginBottom:36 }}>
                <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>Checklist</span>
                <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 10px" }}>Documents Required for FSSAI License</h2>
                <p style={{ fontSize:13.5, color:"#6b7280" }}>Koop India verifies & prepares all documents — zero rejection guarantee.</p>
              </div>
            </Fade>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
              {docSections.map((sec, i) => (
                <Fade key={i} delay={i * 70}>
                  <div className="fp-card" style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:16, padding:"22px 20px", height:"100%" }}>
                    <h4 style={{ fontSize:13.5, fontWeight:700, color:"#0F172A", marginBottom:16 }}>{sec.title}</h4>
                    {sec.docs.map((d, j) => (
                      <div key={j} style={{ display:"flex", gap:9, marginBottom:11 }}>
                        <CheckCircle size={13} style={{ color:"#F97316", marginTop:2, flexShrink:0 }} />
                        <span style={{ fontSize:13, color:"#6b7280" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </Fade>
              ))}
            </div>
            <Fade delay={180}>
              <p style={{ fontSize:13, color:"#16a34a", marginTop:18, display:"flex", alignItems:"center", gap:6 }}>
                <CheckCircle size={14} style={{ color:"#16a34a", flexShrink:0 }} />
                Koop India verifies & prepares documents to avoid rejection or delays — end-to-end handled.
              </p>
            </Fade>
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section style={{ background:"#f8fafc", borderTop:"1px solid #e2e8f0", borderBottom:"1px solid #e2e8f0", padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ textAlign:"center", marginBottom:40 }}>
                <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>How It Works</span>
                <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 10px" }}>FSSAI Registration Procedure</h2>
                <p style={{ fontSize:13.5, color:"#6b7280" }}>Simple 6-step process — entirely managed by Koop India's expert team.</p>
              </div>
            </Fade>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
              {steps.map((s, i) => (
                <Fade key={i} delay={i * 70}>
                  <div className="fp-card" style={{ background:"#fff", borderRadius:16, border:"1px solid #e2e8f0", padding:"22px 20px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <span style={{ background:"#F97316", color:"#fff", width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>{i + 1}</span>
                      <h4 style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>{s.title}</h4>
                    </div>
                    <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.7 }}>{s.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
            <Fade delay={250}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 28px", justifyContent:"center", marginTop:26 }}>
                {["Basic Registration: 3–7 working days", "State License: 7–30 working days", "Central License: 30–60 working days"].map((t, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#6b7280" }}>
                    <Clock size={13} style={{ color:"#F97316" }} /> {t}
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ FEES ══ */}
        <section style={{ padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ textAlign:"center", marginBottom:36 }}>
                <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>Pricing</span>
                <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 10px" }}>FSSAI License Fees</h2>
                <p style={{ fontSize:13.5, color:"#6b7280" }}>Transparent pricing — government fees + professional charges, no hidden costs.</p>
              </div>
            </Fade>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20, maxWidth:900, margin:"0 auto" }}>
              {[
                { name:"Basic Registration", price:"₹2,999", note:"Includes govt. fee",  color:"#10b981" },
                { name:"State License",      price:"₹4,999", note:"Most popular",         color:"#F97316", featured:true },
                { name:"Central License",    price:"₹7,999", note:"For large businesses", color:"#6366f1" },
              ].map((p, i) => (
                <Fade key={i} delay={i * 80}>
                  <div className="fp-card" style={{
                    background: p.featured ? "linear-gradient(135deg,#fff8f3,#fff)" : "#f8fafc",
                    border: p.featured ? `2px solid ${p.color}` : "1px solid #e2e8f0",
                    borderRadius:16, padding:"28px 22px", textAlign:"center",
                    boxShadow: p.featured ? `0 8px 28px rgba(249,115,22,.12)` : "none",
                  }}>
                    <p style={{ fontSize:12.5, color:p.color, fontWeight:700, marginBottom:10 }}>{p.name}</p>
                    <p style={{ fontSize:32, fontWeight:800, color:"#0F172A", fontFamily:"Sora,sans-serif", lineHeight:1 }}>{p.price}</p>
                    <p style={{ fontSize:11, color:"#9ca3af", marginTop:4 }}>starting at*</p>
                    <p style={{ fontSize:12.5, color:p.color, marginTop:8, fontWeight:500 }}>{p.note}</p>
                    <button
                      onClick={onOpenModal}
                      className="fp-obtn"
                      style={{ marginTop:18, width:"100%", background: p.featured ? p.color : "transparent", color: p.featured ? "#fff" : p.color, border:`1.5px solid ${p.color}`, padding:"9px 0", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}
                    >
                      Get Exact Quote
                    </button>
                  </div>
                </Fade>
              ))}
            </div>
            <Fade delay={200}>
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"13px 18px", marginTop:22, textAlign:"center", maxWidth:700, margin:"22px auto 0" }}>
                <p style={{ fontSize:13, color:"#166534" }}>✔ Government fees included &nbsp;•&nbsp; ✔ Expert professional charges &nbsp;•&nbsp; ✔ No surprise billing ever</p>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ WHY KOOP ══ */}
        <section style={{ background:"#f8fafc", borderTop:"1px solid #e2e8f0", borderBottom:"1px solid #e2e8f0", padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ textAlign:"center", marginBottom:36 }}>
                <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>Why Us</span>
                <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 10px" }}>Why Choose Koop India?</h2>
              </div>
            </Fade>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
              {whyKoop.map(({ icon: Icon, title, desc }, i) => (
                <Fade key={i} delay={i * 70}>
                  <div className="fp-card" style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:16, padding:"22px 20px" }}>
                    <div style={{ width:40, height:40, background:"#fff8f3", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                      <Icon size={18} style={{ color:"#F97316" }} />
                    </div>
                    <h4 style={{ fontSize:14, fontWeight:700, color:"#0F172A", marginBottom:6 }}>{title}</h4>
                    <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.7 }}>{desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPLIANCE ══ */}
        <section style={{ padding:"68px 24px" }}>
          <div className="fp-wrap">
            <Fade>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:48, alignItems:"center" }}>
                <div>
                  <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>Compliance</span>
                  <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 14px" }}>
                    FSSAI Compliance & Annual Requirements
                  </h2>
                  <p style={{ fontSize:13.5, color:"#6b7280", lineHeight:1.8, marginBottom:16 }}>
                    Getting your FSSAI license is just the beginning. Every food business must adhere to ongoing compliance requirements to remain legally operational and avoid penalties.
                  </p>
                  {[
                    "Display FSSAI license number on all food products & packaging",
                    "Maintain food safety & hygiene standards at all times",
                    "File annual returns (Form D1 for Central, Form D2 for State)",
                    "Renew license before expiry to avoid penalties & disruption",
                    "Maintain records of food recall, complaints, and testing",
                    "Cooperate fully with FSSAI inspection officers",
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", gap:10, marginBottom:11 }}>
                      <ShieldCheck size={13} style={{ color:"#F97316", marginTop:3, flexShrink:0 }} />
                      <span style={{ fontSize:13, color:"#374151" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:"linear-gradient(135deg,#0F172A,#1e2d4a)", borderRadius:18, padding:"30px 26px" }}>
                  <h4 style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:18 }}>Post-License Support by Koop India</h4>
                  {[
                    "FSSAI license renewal — before expiry",
                    "Annual returns filing (Form D1 / D2)",
                    "Modification of license (address, products, turnover)",
                    "Inspection preparation & response support",
                    "FSSAI notices & query resolution",
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", gap:10, marginBottom:12 }}>
                      <CheckCircle size={13} style={{ color:"#F97316", marginTop:2, flexShrink:0 }} />
                      <span style={{ fontSize:13, color:"#cbd5e1" }}>{item}</span>
                    </div>
                  ))}
                  <button
                    onClick={onOpenModal}
                    style={{ marginTop:18, background:"#F97316", color:"#fff", border:"none", padding:"11px 20px", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"inherit" }}
                  >
                    Know More About Compliance
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section style={{ background:"#f8fafc", borderTop:"1px solid #e2e8f0", borderBottom:"1px solid #e2e8f0", padding:"68px 24px" }}>
          <div className="fp-wrap" style={{ maxWidth:820 }}>
            <Fade>
              <div style={{ textAlign:"center", marginBottom:36 }}>
                <span style={{ color:"#F97316", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em" }}>FAQ</span>
                <h2 style={{ fontSize:"clamp(18px,2.6vw,26px)", fontWeight:800, color:"#0F172A", margin:"8px 0 10px" }}>Frequently Asked Questions</h2>
                <p style={{ fontSize:13.5, color:"#6b7280" }}>Everything you need to know about FSSAI license registration in India.</p>
              </div>
            </Fade>
            <Fade delay={100}>
              <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e2e8f0", padding:"4px 24px 8px" }}>
                {faqs.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
              </div>
            </Fade>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ background:"linear-gradient(135deg,#0F172A,#1a2744)", padding:"72px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"rgba(249,115,22,.055)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-80, left:-80, width:300, height:300, borderRadius:"50%", background:"rgba(99,102,241,.055)", pointerEvents:"none" }} />
          <Fade>
            <div className="fp-wrap" style={{ maxWidth:660, position:"relative" }}>
              <span style={{ display:"inline-block", background:"rgba(249,115,22,.15)", color:"#F97316", fontSize:10.5, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", padding:"5px 14px", borderRadius:20, marginBottom:18 }}>
                Start Today
              </span>
              <h2 style={{ color:"#fff", fontSize:"clamp(18px,3vw,28px)", fontWeight:800, lineHeight:1.3, marginBottom:12 }}>
                Get Your FSSAI License — Fast, Easy & 100% Online
              </h2>
              <p style={{ color:"#94a3b8", fontSize:13.5, marginBottom:30, lineHeight:1.8 }}>
                Whether you are a home baker, restaurant owner, food manufacturer, importer, or eCommerce seller — Koop India ensures a smooth, compliant FSSAI registration from day one.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
                <button
                  onClick={onOpenModal}
                  className="fp-pulse"
                  style={{ background:"#F97316", color:"#fff", border:"none", padding:"14px 32px", borderRadius:10, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"inherit" }}
                >
                  Apply for FSSAI License Now <ArrowRight size={16} />
                </button>
                <button
                  onClick={onOpenModal}
                  style={{ background:"transparent", color:"#e2e8f0", border:"1px solid rgba(255,255,255,.2)", padding:"14px 26px", borderRadius:10, fontWeight:500, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}
                >
                  <Phone size={14} /> Talk to an Expert
                </button>
              </div>
              <p style={{ color:"#475569", fontSize:12, marginTop:20 }}>
                ✅ Free consultation &nbsp;•&nbsp; ✅ No upfront payment &nbsp;•&nbsp; ✅ Expert-handled end-to-end
              </p>
            </div>
          </Fade>
        </section>

        {/* ══ ORIGINAL ENQUIRY MODAL ══ */}
        <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />

      </div>
    </>
  );
};

export default FSSAILicensePage;