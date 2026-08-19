"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc, increment, addDoc, serverTimestamp } from "firebase/firestore";

const ini = (n = "") => n.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
const SOCIAL_ICONS = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  instagram: ["M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", "M17.5 6.5h.01", "M7.5 2h9a5.5 5.5 0 0 1 5.5 5.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z"],
  linkedin: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", "M2 9h4v12H2z", "M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  youtube: ["M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z", "M9.75 15.02 15.5 12 9.75 8.98v6.04z"],
};
const NAV = ["home", "about", "products", "contact"];
const NL = { home: "Home", about: "About Us", products: "Products", contact: "Contact Us" };

export default function SellerClientPage({ initialSeller }) {
  const { slug } = useParams();
  const [seller, setSeller] = useState(initialSeller);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("home");
  const [mob, setMob] = useState(false);
  const [selProd, setSelProd] = useState(null);
  const [selCat, setSelCat] = useState("all");
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prodDropOpen, setProdDropOpen] = useState(false);
  const prodDropRef = useRef(null);

  useEffect(() => {
    if (seller && seller.id) {
      updateDoc(doc(db, "sellers", seller.id), { views: increment(1) }).catch(console.error);
    }
  }, [seller?.id]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (prodDropRef.current && !prodDropRef.current.contains(e.target)) setProdDropOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  let banners = seller?.heroBanners?.filter(b => b.url).map(b => b.url) || [];
  if (banners.length === 0 && (seller?.heroBannerUrl || seller?.bannerUrl)) {
    banners = [seller?.heroBannerUrl || seller?.bannerUrl];
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  useEffect(() => {
    if (tab !== "home" || banners.length <= 1) return;
    const int = setInterval(() => setCurrentSlide(s => (s + 1) % banners.length), 5000);
    return () => clearInterval(int);
  }, [tab, banners.length]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-600 text-sm">Loading buyer page...</p>
      </div>
    </div>
  );

  if (!seller || seller.status === "paused") return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <div className="text-5xl">🏪</div>
        <h1 className="text-xl font-black text-gray-800">Buyer Not Found</h1>
        <a href="/" className="inline-block bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm">Back to Koop India</a>
      </div>
    </div>
  );

  const pc = seller.primaryColor || "#2d5a27";
  const sc = seller.secondaryColor || "#f5a623";
  const homeBg = seller.homeBgColor || "#ffffff";
  const aboutBg = seller.aboutBgColor || "#ffffff";
  const productsBg = seller.productsBgColor || "#ffffff";
  const contactBg = seller.contactBgColor || "#ffffff";
  const homeProductsBg = seller.homeProductsBgColor || homeBg;
  const homeCertBg = seller.homeCertBgColor || homeBg;
  const homeContactBg = seller.homeContactBgColor || homeBg;
  const aboutMissionBg = seller.aboutMissionBgColor || "transparent";
  const aboutStatsBg = seller.aboutStatsBgColor || (pc + "12");
  const aboutCompanyBg = seller.aboutCompanyBgColor || "transparent";
  const aboutInfraBg = seller.aboutInfraBgColor || "transparent";
  const aboutCertBg = seller.aboutCertBgColor || "transparent";
  const navAlign = seller.navAlignment || "right";
  const hBg = seller.headerBgColor || "#ffffff";
  const hText = seller.headerTextColor || "#4b5563";
  const fBg = seller.footerBgColor || pc;
  const fText = seller.footerTextColor || "#ffffff";
  const fCopy = seller.footerText || "Managed by Koop India";
  const heroBannerBg = seller.heroBgColor || pc;
  const products = (seller.products || []).filter(p => p.name);
  const homeProd = products.filter(p => p.showOnHome);
  const stats = seller.stats || [];
  const certs = seller.certifications || [];
  const fBadges = seller.footerBadges || [];
  const cats = seller.productCategories || [];
  const social = seller.social || {};
  const infra = seller.infrastructure || [];
  const filtProd = selCat === "all" ? products : products.filter(p => p.categoryId === selCat);
  const btn1 = seller.heroBtn1Text || "View Our Products";
  const btn2 = seller.heroBtn2Text || "Distributors / Buyers Inquiry";
  const displayPhone = seller.hidePhone ? null : seller.phone;

  const compRows = [
    { label: "Company Name", value: seller.companyName || seller.name },
    { label: "Nature of Business", value: seller.natureOfBusiness },
    { label: "Establishment Year", value: seller.establishmentYear },
    { label: "No. of Employees", value: seller.employees },
    { label: "GST Number", value: seller.gstNumber },
    { label: "FSSAI License", value: seller.fssaiLicense },
    { label: "Address", value: [seller.address, seller.city, seller.state, seller.pincode].filter(Boolean).join(", ") },
  ].filter(r => r.value);

  /* ── Save contact form lead to Firestore ── */
  const onSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...contactForm,
        sellerSlug: slug,
        sellerName: seller.name,
        source: "contact_page",
        type: contactForm.subject || "General Inquiry",
        status: "New",
        createdAt: serverTimestamp(),
      });
      setContactSuccess(true);
      setContactForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Lead save error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  /* ── Save product enquiry lead to Firestore ── */
  const onEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquirySubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...enquiryForm,
        sellerSlug: slug,
        sellerName: seller.name,
        productName: selProd?.name || "",
        source: "product_page",
        subject: `Product Inquiry: ${selProd?.name || ""}`,
        type: "Product Inquiry",
        status: "New",
        createdAt: serverTimestamp(),
      });
      setEnquirySuccess(true);
      setEnquiryForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("Enquiry save error:", err);
      alert("Failed to send enquiry. Please try again.");
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const Logo = () => seller.logoUrl
    ? <img src={seller.logoUrl} alt={seller.name} className="h-10 w-auto max-w-[140px] object-contain" />
    : <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: pc }}>{ini(seller.name)}</div>;

  const ProdCard = ({ p }) => (
    <div onClick={() => { setSelProd(p); setEnquirySuccess(false); setEnquiryForm({ name: "", phone: "", email: "", message: "" }); }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group overflow-hidden flex flex-col flex-shrink-0 w-full sm:w-[260px] lg:w-[270px]">
      <div className="bg-slate-50 h-48 flex items-center justify-center p-4 relative">
        {p.imageUrl
          ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
          : <span className="text-5xl">{p.emoji || "📦"}</span>}
        {p.badge && <span className="absolute top-2 left-2 text-[10px] font-black px-2.5 py-1 rounded-full text-white shadow-sm" style={{ backgroundColor: sc }}>{p.badge}</span>}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-bold text-gray-900 text-sm leading-tight mb-1">{p.name}</p>
        {p.tagline && <p className="text-gray-500 text-xs mb-1 italic">{p.tagline}</p>}
        {p.description && <p className="text-gray-500 text-xs mb-2 line-clamp-2 leading-relaxed">{p.description}</p>}
        <div className="mt-auto">
          {p.price && <p className="font-black text-base mb-2" style={{ color: pc }}>{p.price}</p>}
          <button className="w-full text-xs font-bold py-2 rounded-xl text-white hover:opacity-90 transition shadow cursor-pointer" style={{ backgroundColor: pc }}>View Details</button>
        </div>
      </div>
    </div>
  );

  const ProdGrid = ({ list }) => (
    <div className="flex flex-wrap gap-6 justify-center">
      {list.map((p, i) => (
        <div key={i} className={list.length === 1 ? "w-full max-w-xs" : ""}>
          <ProdCard p={p} />
        </div>
      ))}
    </div>
  );

  const CertCards = ({ list }) => (
    <div className="flex flex-wrap gap-5 justify-center">
      {list.filter(c => c.name).map((cert, i) => (
        <div key={i} className="flex flex-col items-center bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: "180px" }}>
          <div className="w-full flex items-center justify-center p-4 border-b border-gray-100" style={{ height: "150px" }}>
            {cert.imageUrl
              ? <img src={cert.imageUrl} alt={cert.name} className="h-full w-full object-contain" />
              : <div className="h-full w-full bg-gray-50 rounded-xl flex items-center justify-center text-4xl">🏆</div>}
          </div>
          <div className="p-3 text-center w-full">
            <p className="font-bold text-gray-900 text-xs">{cert.name}</p>
            {cert.description && <p className="text-gray-500 text-[10px] mt-0.5 line-clamp-2">{cert.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );

  const NavItems = () => {
    const activeTab = selProd ? "products" : tab;
    return (
      <>
        {NAV.map(t => {
          if (t === "products") {
            return (
              <div key="products" className="relative" ref={prodDropRef}>
                <button
                  onClick={() => { setSelProd(null); setTab("products"); }}
                  onMouseEnter={() => products.length > 0 && setProdDropOpen(true)}
                  onMouseLeave={() => setProdDropOpen(false)}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1 ${activeTab === "products" ? "shadow-md" : ""}`}
                  style={{ backgroundColor: activeTab === "products" ? pc : "transparent", color: activeTab === "products" ? "#ffffff" : hText }}>
                  {NL["products"]}
                  {products.length > 0 && (
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="m6 9 6 6 6-6" /></svg>
                  )}
                </button>
                {prodDropOpen && products.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden" style={{ width: "260px" }}
                    onMouseEnter={() => setProdDropOpen(true)}
                    onMouseLeave={() => setProdDropOpen(false)}>
                    <div className="p-2 max-h-[360px] overflow-y-auto">
                      {products.slice(0, 8).map((p, i) => (
                        <button key={i} onClick={() => { setSelProd(p); setProdDropOpen(false); setEnquirySuccess(false); setEnquiryForm({ name: "", phone: "", email: "", message: "" }); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition text-left cursor-pointer">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                            {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" /> : <span className="text-xl">{p.emoji || "📦"}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                            {p.price && <p className="text-xs font-black" style={{ color: pc }}>{p.price}</p>}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100">
                      <button onClick={() => { setTab("products"); setProdDropOpen(false); }}
                        className="w-full text-xs font-black py-3 text-center hover:bg-gray-50 transition cursor-pointer"
                        style={{ color: pc }}>View All Products →</button>
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return (
            <button key={t} onClick={() => { setSelProd(null); setTab(t); }}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === t ? "shadow-md" : ""}`}
              style={{ backgroundColor: activeTab === t ? pc : "transparent", color: activeTab === t ? "#ffffff" : hText }}>
              {NL[t]}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"}`} style={{ backgroundColor: hBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            <button onClick={() => setTab("home")} className="flex-shrink-0 cursor-pointer"><Logo /></button>
            {navAlign === "left" && (
              <nav className="hidden md:flex items-center gap-1 flex-1 justify-start ml-6">
                <NavItems />
              </nav>
            )}
            <div className="flex items-center gap-2 ml-auto">
              {navAlign !== "left" && (
                <nav className="hidden md:flex items-center gap-1 mr-3">
                  <NavItems />
                </nav>
              )}
              <button onClick={() => setTab("contact")}
                className="hidden sm:flex text-white font-black text-xs px-4 py-2.5 rounded-xl hover:opacity-90 shadow-md transition whitespace-nowrap cursor-pointer"
                style={{ backgroundColor: pc }}>
                {btn2}
              </button>
              <button className="md:hidden p-2 rounded-xl hover:opacity-100 cursor-pointer" style={{ color: hText }} onClick={() => setMob(m => !m)}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  {mob ? <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mob && (
          <div className="md:hidden border-t border-gray-100 py-3 px-4 space-y-1 shadow-lg" style={{ backgroundColor: hBg }}>
            {NAV.map(t => (
              <button key={t} onClick={() => { setTab(t); setMob(false); }}
                className="w-full text-left px-4 py-3 rounded-xl font-semibold text-sm cursor-pointer"
                style={{ backgroundColor: tab === t ? pc : "transparent", color: tab === t ? "#ffffff" : hText }}>
                {NL[t]}
              </button>
            ))}
            <button onClick={() => { setTab("contact"); setMob(false); }}
              className="w-full text-white font-black text-sm px-4 py-3 rounded-xl cursor-pointer"
              style={{ backgroundColor: pc }}>
              {btn2}
            </button>
          </div>
        )}
      </header>

      {/* ══ HOME ══ */}
      {tab === "home" && !selProd && (
        <div>
          <div className="relative overflow-hidden flex items-end pb-12 group" style={{ backgroundColor: heroBannerBg, minHeight: "clamp(600px, 75vh, 900px)" }}>
            {banners.map((url, idx) => (
              <div key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === idx ? "opacity-100" : "opacity-0 z-0"}`}
                style={{ backgroundImage: `url("${url}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
            ))}
            {banners.length > 1 && (
              <>
                <button onClick={() => setCurrentSlide(s => (s - 1 + banners.length) % banners.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button onClick={() => setCurrentSlide(s => (s + 1) % banners.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {banners.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all shadow-sm cursor-pointer border border-black/10 ${currentSlide === idx ? "bg-white w-6" : "bg-white/60 w-2 hover:bg-white"}`} />
                  ))}
                </div>
              </>
            )}
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 w-full flex justify-center sm:justify-start">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setTab("products")}
                  className="text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg hover:opacity-95 transition cursor-pointer"
                  style={{ backgroundColor: pc }}>{btn1}</button>
                <button onClick={() => setTab("contact")}
                  className="font-bold px-6 py-3 rounded-xl text-sm border border-gray-200 bg-white hover:bg-gray-50 transition shadow-lg cursor-pointer"
                  style={{ color: pc }}>{btn2}</button>
              </div>
            </div>
          </div>

          {stats.filter(s => s.value).length > 0 && (
            <div className="border-b border-gray-100 shadow-sm" style={{ backgroundColor: homeBg }}>
              <div className={`max-w-7xl mx-auto px-5 py-8 flex flex-wrap gap-8 ${stats.filter(s => s.value).length >= 4 ? 'justify-center sm:justify-between' : 'justify-center'}`}>
                {stats.filter(s => s.value).map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className="font-black text-2xl leading-none" style={{ color: pc }}>{s.value}</p>
                      <p className="text-gray-600 text-xs font-semibold mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(seller.homeAbout || seller.about || seller.description) && (
            <div className="py-12 px-5" style={{ backgroundColor: homeBg }}>
              <div className="max-w-5xl mx-auto text-center">
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: pc }}>About Us</p>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5">{seller.name}</h2>
                <p className="text-gray-700 leading-relaxed text-base">{seller.homeAbout || seller.about || seller.description}</p>
              </div>
            </div>
          )}

          {homeProd.length > 0 && (
            <div className="py-14 px-5 sm:px-10" style={{ backgroundColor: homeProductsBg }}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Featured <span style={{ color: pc }}>Products</span></h2>
                </div>
                <ProdGrid list={homeProd} />
                <div className="text-center mt-8">
                  <button onClick={() => setTab("products")}
                    className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl border-2 transition cursor-pointer"
                    style={{ borderColor: pc, color: pc }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = pc; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = pc; }}>
                    View All Products →
                  </button>
                </div>
              </div>
            </div>
          )}

          {certs.filter(c => c.name).length > 0 && (
            <div className="py-12 px-5" style={{ backgroundColor: homeCertBg }}>
              <div className="max-w-7xl mx-auto">
                <h3 className="text-center text-xl font-black text-gray-800 mb-8">Our Certifications</h3>
                <CertCards list={certs} />
              </div>
            </div>
          )}

          {seller.showContactOnHome !== false && (
            <div className="py-10 px-5" style={{ backgroundColor: homeContactBg }}>
              <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-800 mb-2 leading-tight">Have questions? Get in touch with us!</h2>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                    {seller.homeContactDesc || "Have questions or need assistance? We're here to help! Reach out to us today, and our team will provide you with the support and information you need."}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button onClick={() => setTab("contact")}
                    className="px-8 py-3 rounded-xl font-black text-sm text-white tracking-widest uppercase shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all cursor-pointer"
                    style={{ backgroundColor: pc }}>Contact</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ ABOUT ══ */}
      {tab === "about" && !selProd && (
        <div style={{ backgroundColor: aboutBg }}>
          {(seller.about || seller.description) && (
            <div className="py-16" style={{ backgroundColor: aboutBg }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: pc }}>About Us</p>
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 leading-tight">About {seller.name}</h2>
                  <p className="text-gray-700 leading-relaxed text-base">{seller.about || seller.description}</p>
                </div>
                {seller.aboutImageUrl && <img src={seller.aboutImageUrl} alt={seller.name} className="w-full h-72 object-cover rounded-2xl shadow-lg" />}
              </div>
            </div>
          )}

          {/* Company Details Table — darker border, wider max-width */}
          {compRows.length > 0 && (
            <div className="py-16" style={{ backgroundColor: aboutCompanyBg || (pc + "10") }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <h2 className="text-2xl font-black text-gray-900 text-center mb-1">Company Details</h2>
                <div className="w-16 h-1 rounded-full mx-auto mb-8" style={{ backgroundColor: pc }} />
                <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-md border-2 border-gray-400">
                  <table className="w-full border-collapse">
                    <tbody>
                      {compRows.map((row, i) => (
                        <tr key={i} className={`border-b-2 border-gray-300 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                          <th className="w-2/5 px-6 py-4 font-bold text-gray-900 text-sm align-middle border-r-2 border-gray-300 text-left">{row.label}</th>
                          <td className="w-3/5 px-6 py-4 text-gray-700 text-sm font-medium align-middle text-left">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {(seller.mission || seller.vision || seller.values || seller.commitment) && (
            <div className="py-16" style={{ backgroundColor: aboutMissionBg || aboutBg }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: "🎯", title: seller.missionTitle || "Our Mission", body: seller.mission },
                    { icon: "👁️", title: seller.visionTitle || "Our Vision", body: seller.vision },
                    { icon: "💎", title: seller.valuesTitle || "Our Values", body: seller.values },
                    { icon: "🤝", title: seller.commitmentTitle || "Our Commitment", body: seller.commitment },
                  ].filter(c => c.body).map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-center">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mb-4 border border-gray-100 shadow-sm">{card.icon}</div>
                      <h3 className="font-black text-lg mb-2" style={{ color: pc }}>{card.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {stats.filter(s => s.value).length > 0 && (
            <div className="py-16" style={{ backgroundColor: aboutStatsBg || (pc + "18") }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className={`flex flex-wrap gap-8 ${stats.filter(s => s.value).length >= 4 ? 'justify-center sm:justify-around' : 'justify-center'}`}>
                  {stats.filter(s => s.value).map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-black text-3xl sm:text-4xl" style={{ color: pc }}>{s.value}</p>
                      <p className="text-gray-700 text-xs font-semibold mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {infra.filter(i => i.title).length > 0 && (
            <div className="py-16" style={{ backgroundColor: aboutInfraBg || aboutBg }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <h2 className="text-2xl font-black text-gray-900 text-center mb-1">{seller.infrastructureTitle || "Our Infrastructure"}</h2>
                <div className="w-16 h-1 rounded-full mx-auto mb-8" style={{ backgroundColor: pc }} />
                {seller.infrastructureDesc && <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">{seller.infrastructureDesc}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {infra.filter(i => i.title).map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                        {item.description && <p className="text-gray-500 text-xs">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {certs.filter(c => c.name).length > 0 && (
            <div className="py-16" style={{ backgroundColor: aboutCertBg || aboutBg }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <h2 className="text-2xl font-black text-gray-900 text-center mb-1">Our Certifications</h2>
                <div className="w-16 h-1 rounded-full mx-auto mb-8" style={{ backgroundColor: pc }} />
                <CertCards list={certs} />
              </div>
            </div>
          )}

          {products.length > 0 && (
            <div className="py-16" style={{ backgroundColor: aboutBg }}>
              <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="text-center mb-8">
                  <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: pc }}>Our Products</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">What We Offer</h2>
                </div>
                <ProdGrid list={products.slice(0, 6)} />
                {products.length > 6 && (
                  <div className="text-center mt-6">
                    <button onClick={() => setTab("products")}
                      className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl border-2 transition cursor-pointer"
                      style={{ borderColor: pc, color: pc }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = pc; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = pc; }}>
                      View All Products →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ PRODUCTS ══ */}
      {tab === "products" && !selProd && (
        <div className="py-20 px-5 sm:px-8" style={{ backgroundColor: productsBg }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: pc }}>Our Products</p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">A wide range of pure and authentic products</h2>
            </div>
            {cats.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <button onClick={() => setSelCat("all")} className="text-xs font-black px-5 py-2.5 rounded-xl transition cursor-pointer" style={selCat === "all" ? { backgroundColor: pc, color: "#fff" } : { backgroundColor: "#fff", color: "#374151", border: "1px solid #e5e7eb" }}>All Products</button>
                {cats.filter(c => c.id !== "all").map(cat => (
                  <button key={cat.id} onClick={() => setSelCat(cat.id)} className="text-xs font-black px-5 py-2.5 rounded-xl transition cursor-pointer" style={selCat === cat.id ? { backgroundColor: pc, color: "#fff" } : { backgroundColor: "#fff", color: "#374151", border: "1px solid #e5e7eb" }}>{cat.name}</button>
                ))}
              </div>
            )}
            {filtProd.length > 0
              ? <ProdGrid list={filtProd} />
              : <div className="text-center py-16 text-gray-500"><p className="text-4xl mb-3">📦</p><p className="font-semibold">No products found</p></div>
            }
          </div>
        </div>
      )}

      {/* ══ CONTACT ══ */}
      {tab === "contact" && !selProd && (
        <div>
          {/* Contact Banner — taller, bold visual */}
          {seller.contactBannerUrl && (
            <div className="w-full overflow-hidden shadow-lg" style={{ maxHeight: "480px" }}>
              <img src={seller.contactBannerUrl} alt="Contact Banner" className="w-full object-cover" style={{ height: "480px", objectPosition: "center" }} />
            </div>
          )}
          <div className="min-h-screen" style={{ backgroundColor: contactBg }}>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
              <div className="text-center mb-14">
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: pc }}>Get In Touch</p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">We'd love to hear from you</h2>
                <p className="text-gray-500 text-base max-w-xl mx-auto">Reach out to us for any inquiries, partnerships, or distributor opportunities.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <div className="lg:col-span-2 p-10 flex flex-col justify-between" style={{ backgroundColor: pc }}>
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2">Contact Information</h3>
                    <p className="text-white/70 text-sm mb-10">Fill out the form or reach us directly through the options below.</p>
                    <div className="space-y-8">
                      {[seller.address, seller.city, seller.state, seller.pincode].filter(Boolean).length > 0 && (
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">📍</div>
                          <div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-0.5">Address</p>
                            <p className="text-white font-semibold text-sm leading-relaxed">{[seller.address, seller.city, seller.state, seller.pincode].filter(Boolean).join(", ")}</p>
                          </div>
                        </div>
                      )}
                      {displayPhone && (
                        <a href={`tel:${displayPhone}`} className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-white/25 transition">📞</div>
                          <div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-0.5">Call Us</p>
                            <p className="text-white font-bold text-sm group-hover:underline">{displayPhone}</p>
                          </div>
                        </a>
                      )}
                      {seller.email && (
                        <a href={`mailto:${seller.email}`} className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-white/25 transition">✉️</div>
                          <div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-0.5">Email Us</p>
                            <p className="text-white font-bold text-sm group-hover:underline break-all">{seller.email}</p>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                  {Object.values(social).some(Boolean) && (
                    <div className="mt-10 pt-8 border-t border-white/20">
                      <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">Follow Us</p>
                      <div className="flex gap-3">
                        {Object.entries(social).filter(([, v]) => v).map(([key, url]) => {
                          const paths = SOCIAL_ICONS[key]; if (!paths) return null;
                          return (
                            <a key={key} href={url} target="_blank" rel="noreferrer"
                              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 hover:bg-white/30 text-white shadow transition-all hover:scale-110 cursor-pointer">
                              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                {Array.isArray(paths) ? paths.map((p, i) => <path key={i} d={p} />) : <path d={paths} />}
                              </svg>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-3 bg-white p-10">
                  <h3 className="font-black text-gray-900 text-2xl mb-1">Send Us a Message</h3>
                  <p className="text-gray-400 text-sm mb-8">We'll get back to you within 24 hours.</p>

                  {contactSuccess ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="text-5xl mb-4">✅</div>
                      <h4 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h4>
                      <p className="text-gray-500 text-sm mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                      <button onClick={() => setContactSuccess(false)} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white cursor-pointer" style={{ backgroundColor: pc }}>Send Another</button>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Your Name *</label>
                          <input type="text" required placeholder="e.g. Rahul Sharma" value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                            onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Phone *</label>
                          <input type="tel" required placeholder="+91 98765 43210" value={contactForm.phone} onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                            onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email Address</label>
                        <input type="email" placeholder="you@example.com" value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                          onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Inquiry Type *</label>
                        <select required value={contactForm.subject} onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition text-gray-700 bg-gray-50 cursor-pointer font-medium"
                          onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'}>
                          <option value="" disabled>Select inquiry type...</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Inquiry">Product Inquiry</option>
                          <option value="Apply for Distributor / Buyer">Apply for Distributor / Buyer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Your Message *</label>
                        <textarea rows={5} required placeholder="Write your message here..." value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none resize-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                          onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                      </div>
                      <button type="submit" disabled={contactSubmitting}
                        className="w-full text-white font-black py-4 rounded-xl shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-sm cursor-pointer tracking-wide disabled:opacity-60"
                        style={{ backgroundColor: pc }}>
                        {contactSubmitting ? "Sending..." : "Send Message →"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {seller.mapEmbedUrl && (
                <div className="mt-10 rounded-2xl overflow-hidden shadow-md border border-gray-200" style={{ height: "350px" }}>
                  <iframe src={seller.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ PRODUCT DETAIL PAGE ══ */}
      {selProd && (
        <div className="min-h-[80vh]" style={{ backgroundColor: productsBg || "#f8fafc" }}>
          <div className="border-b border-gray-200 bg-white px-4 sm:px-8 py-3 flex items-center gap-4">
            <button onClick={() => setSelProd(null)}
              className="flex items-center gap-2 text-sm font-black px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer shadow-sm"
              style={{ color: pc }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="m15 18-6-6 6-6" /></svg>
              Back
            </button>
            <nav className="text-xs text-gray-400 font-semibold flex items-center gap-1">
              <button onClick={() => { setSelProd(null); setTab("products"); }} className="hover:text-gray-700 cursor-pointer transition">Products</button>
              <span>/</span>
              <span className="text-gray-700">{selProd.name}</span>
            </nav>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
            {/* Section 1: Hero — 5-col grid, image smaller, details wider */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mb-16">
              {/* LEFT — Image (2 of 5) */}
              <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
                <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl overflow-hidden relative group">
                  {selProd.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-xs font-black px-3 py-1.5 rounded-full text-white shadow-lg" style={{ backgroundColor: sc }}>{selProd.badge}</span>
                    </div>
                  )}
                  <div className="aspect-square flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                    {selProd.imageUrl
                      ? <img src={selProd.imageUrl} alt={selProd.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      : <span className="text-8xl">{selProd.emoji || "📦"}</span>}
                  </div>
                </div>

                {/* Gallery thumbnails */}
                <div className="flex gap-2 flex-wrap">
                  {selProd.galleryImages?.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-14 h-14 rounded-xl border-2 border-gray-200 object-contain bg-white cursor-pointer hover:shadow-md transition" style={{ borderColor: pc }} />
                  ))}
                </div>

                {/* Quick contact info card */}
                {(displayPhone || seller.email) && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Direct Contact</p>
                    {displayPhone && (
                      <a href={`tel:${displayPhone}`} className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0" style={{ backgroundColor: pc }}>📞</div>
                        <span className="text-sm font-bold text-gray-700 group-hover:underline">{displayPhone}</span>
                      </a>
                    )}
                    {seller.email && (
                      <a href={`mailto:${seller.email}`} className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0" style={{ backgroundColor: pc }}>✉️</div>
                        <span className="text-sm font-bold text-gray-700 group-hover:underline break-all">{seller.email}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT — Details (3 of 5) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  {selProd.category && (
                    <span className="text-xs font-black px-3 py-1 rounded-full border" style={{ color: pc, borderColor: pc + "40", backgroundColor: pc + "10" }}>{selProd.category}</span>
                  )}
                  {selProd.badge && (
                    <span className="text-xs font-black px-3 py-1.5 rounded-full text-white shadow" style={{ backgroundColor: sc }}>{selProd.badge}</span>
                  )}
                </div>

                {/* Title & Price */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-1">{selProd.name}</h1>
                  {selProd.tagline && <p className="text-base text-gray-500 italic font-medium">{selProd.tagline}</p>}
                  {selProd.price && (
                    <div className="mt-3 inline-flex items-baseline gap-1">
                      <span className="text-2xl font-black" style={{ color: pc }}>{selProd.price}</span>
                    </div>
                  )}
                </div>

                {/* Section 2: Overview */}
                {selProd.description && (
                  <div className="rounded-2xl p-4 border-l-4" style={{ backgroundColor: pc + "08", borderLeftColor: pc }}>
                    <p className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: pc }}>Overview</p>
                    <p className="text-gray-700 leading-relaxed text-sm">{selProd.description}</p>
                  </div>
                )}

                {selProd.keyHighlights && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Highlights</p>
                    <ul className="space-y-2">
                      {selProd.keyHighlights.split("\n").filter(Boolean).map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5" style={{ backgroundColor: pc }}>✓</span>
                          <span className="font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selProd.suitableFor && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">👥</span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">Suitable For</p>
                      <p className="text-sm text-gray-700 font-semibold">{selProd.suitableFor}</p>
                    </div>
                  </div>
                )}

                {selProd.availableVariants && (
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Available Variants</p>
                    <div className="flex flex-wrap gap-2">
                      {selProd.availableVariants.split(",").map((v, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl border-2 text-xs font-black text-gray-700 bg-white hover:shadow-md transition" style={{ borderColor: pc + "60" }}>{v.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                {/* CTA Buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => { setContactForm(p => ({ ...p, subject: `Product Inquiry: ${selProd.name}` })); setTab("contact"); setSelProd(null); }}
                    className="w-full font-black text-sm py-4 rounded-2xl text-white shadow-xl hover:opacity-90 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ backgroundColor: pc }}>
                    ✉️ Send Inquiry
                  </button>
                  {displayPhone && (
                    <a href={`tel:${displayPhone}`}
                      className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-2xl border-2 transition cursor-pointer hover:shadow-md"
                      style={{ borderColor: pc, color: pc }}>
                      📞 Call Now
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Features */}
            {selProd.features && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: pc }}>3</span>
                  Product Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selProd.features.split("\n").filter(Boolean).map((f, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0" style={{ backgroundColor: pc + "20", color: pc }}>
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed font-medium">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Ingredients */}
            {(selProd.ingredientsList || selProd.ingredients) && (
              <div className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">🌿</span> Ingredients / Composition
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">{selProd.ingredientsList || selProd.ingredients}</p>
                {(selProd.isNatural || selProd.isOrganic || selProd.isPreservativeFree) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selProd.isNatural && <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-black border border-green-200">🌱 Natural</span>}
                    {selProd.isOrganic && <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-200">🌾 Organic</span>}
                    {selProd.isPreservativeFree && <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black border border-teal-200">✅ Preservative-Free</span>}
                  </div>
                )}
              </div>
            )}

            {/* Section 5: Specifications */}
            {(selProd.productType || selProd.netWeight || selProd.shelfLife || selProd.storageInstructions || selProd.packagingType || selProd.countryOfOrigin || selProd.fssaiNumber || selProd.skuCode || selProd.specifications) && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">📋</span> Specifications
                </h2>
                <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full">
                    <tbody>
                      {[
                        { label: "Product Type", value: selProd.productType },
                        { label: "Buyer", value: selProd.buyer || seller.name },
                        { label: "Net Weight", value: selProd.netWeight },
                        { label: "Shelf Life", value: selProd.shelfLife },
                        { label: "Storage Instructions", value: selProd.storageInstructions },
                        { label: "Packaging Type", value: selProd.packagingType || selProd.packaging },
                        { label: "Country of Origin", value: selProd.countryOfOrigin },
                        { label: "FSSAI Number", value: selProd.fssaiNumber },
                        { label: "SKU / Product Code", value: selProd.skuCode },
                        { label: "Specifications", value: selProd.specifications },
                      ].filter(r => r.value).map((row, i) => (
                        <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                          <td className="px-5 py-3.5 text-xs font-black text-gray-500 uppercase tracking-wider w-1/3 bg-gray-50 border-r border-gray-100">{row.label}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{row.value}</td>
                        </tr>
                      ))}
                      {selProd.isVegetarian && (
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <td className="px-5 py-3.5 text-xs font-black text-gray-500 uppercase tracking-wider bg-gray-50 border-r border-gray-100">Vegetarian</td>
                          <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                            <span className="inline-flex items-center gap-1 text-green-700 font-black">🟢 Yes, Vegetarian</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Section 6: Available Packaging */}
            {selProd.availablePackaging && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">📦</span> Available Packaging
                </h2>
                <div className="flex flex-wrap gap-3">
                  {selProd.availablePackaging.split(",").map((pkg, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 bg-white font-bold text-sm text-gray-700" style={{ borderColor: pc + "40" }}>
                      <span style={{ color: pc }}>📦</span> {pkg.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 7: Benefits */}
            {selProd.benefits && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">⭐</span> Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selProd.benefits.split("\n").filter(Boolean).map((b, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <span className="text-xl flex-shrink-0">✨</span>
                      <p className="text-gray-700 text-sm font-semibold">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 8: Usage Instructions */}
            {selProd.usageInstructions && (
              <div className="mb-12 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-2xl">📖</span> Usage Instructions
                </h2>
                <div className="prose prose-sm text-gray-700 max-w-none">
                  {selProd.usageInstructions.split("\n").filter(Boolean).map((line, i) => (
                    <p key={i} className="mb-2 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Section 9: Nutritional Information */}
            {(selProd.nutritionEnergy || selProd.nutritionProtein || selProd.nutritionCarbs || selProd.nutritionFat) && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🥗</span> Nutritional Information
                  <span className="text-xs font-medium text-gray-400">(per 100g)</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Energy", value: selProd.nutritionEnergy, unit: "kcal", icon: "⚡" },
                    { label: "Protein", value: selProd.nutritionProtein, unit: "g", icon: "💪" },
                    { label: "Carbs", value: selProd.nutritionCarbs, unit: "g", icon: "🌾" },
                    { label: "Sugar", value: selProd.nutritionSugar, unit: "g", icon: "🍬" },
                    { label: "Fat", value: selProd.nutritionFat, unit: "g", icon: "🫙" },
                    { label: "Sodium", value: selProd.nutritionSodium, unit: "mg", icon: "🧂" },
                  ].filter(n => n.value).map((n, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-sm">
                      <div className="text-2xl mb-1">{n.icon}</div>
                      <p className="font-black text-lg text-gray-900">{n.value}<span className="text-xs font-medium text-gray-400 ml-0.5">{n.unit}</span></p>
                      <p className="text-xs text-gray-500 font-semibold">{n.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 10: Quality Assurance */}
            {(selProd.isISOCertified || selProd.isFSSAIApproved || selProd.isGMPCertified || selProd.isLabTested || selProd.isQualityChecked) && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🏅</span> Quality Assurance
                </h2>
                <div className="flex flex-wrap gap-3">
                  {selProd.isISOCertified && <span className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm font-black">✅ ISO Certified</span>}
                  {selProd.isFSSAIApproved && <span className="px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-black">✅ FSSAI Approved</span>}
                  {selProd.isGMPCertified && <span className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-sm font-black">✅ GMP Certified</span>}
                  {selProd.isLabTested && <span className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-black">✅ Lab Tested</span>}
                  {selProd.isQualityChecked && <span className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm font-black">✅ Quality Checked</span>}
                </div>
              </div>
            )}

            {/* Section 11: Why Choose */}
            {selProd.whyChoose && (
              <div className="mb-12" style={{ backgroundColor: pc + "08" }}>
                <div className="rounded-2xl p-6 border" style={{ borderColor: pc + "30" }}>
                  <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <span className="text-2xl">🌟</span> Why Choose This Product?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selProd.whyChoose.split("\n").filter(Boolean).map((w, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5" style={{ backgroundColor: pc }}>★</span>
                        <p className="text-gray-700 text-sm font-semibold">{w}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section 12: Industries / Applications */}
            {selProd.industriesApplications && (
              <div className="mb-12">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🏭</span> Industries / Applications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selProd.industriesApplications.split(",").map((ind, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl border text-sm font-bold text-gray-700 bg-white hover:shadow-md transition" style={{ borderColor: pc + "50" }}>
                      {ind.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enquiry Form — premium dark-border design */}
            <div className="mt-14 rounded-3xl overflow-hidden shadow-2xl border-2" style={{ borderColor: pc + "60" }}>
              {/* Form Header Band */}
              <div className="px-8 py-5 flex items-center gap-4" style={{ backgroundColor: pc }}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl flex-shrink-0">📩</div>
                <div>
                  <h2 className="text-xl font-black text-white">Send Enquiry for <span className="underline underline-offset-4 decoration-white/50">{selProd.name}</span></h2>
                  <p className="text-white/70 text-xs mt-0.5">We'll get back to you within 24 hours</p>
                </div>
              </div>
              <div className="bg-white p-8">

              {enquirySuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">Enquiry Sent!</h4>
                  <p className="text-gray-500 text-sm mb-6">Thank you! We'll contact you soon regarding <strong>{selProd.name}</strong>.</p>
                  <button onClick={() => setEnquirySuccess(false)} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white cursor-pointer" style={{ backgroundColor: pc }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={onEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Your Name *</label>
                      <input type="text" required placeholder="e.g. Rahul Sharma" value={enquiryForm.name} onChange={e => setEnquiryForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                        onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Phone *</label>
                      <input type="tel" required placeholder="+91 98765 43210" value={enquiryForm.phone} onChange={e => setEnquiryForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                        onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email</label>
                    <input type="email" placeholder="you@example.com" value={enquiryForm.email} onChange={e => setEnquiryForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                      onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea rows={4} placeholder="Tell us more about your requirement..." value={enquiryForm.message} onChange={e => setEnquiryForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none resize-none transition bg-gray-50 placeholder:text-gray-400 font-medium"
                      onFocus={e => e.target.style.borderColor = pc} onBlur={e => e.target.style.borderColor = '#f3f4f6'} />
                  </div>
                  <button type="submit" disabled={enquirySubmitting}
                    className="w-full text-white font-black py-4 rounded-xl shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-sm cursor-pointer tracking-wide disabled:opacity-60"
                    style={{ backgroundColor: pc }}>
                    {enquirySubmitting ? "Sending..." : "📩 Send Enquiry →"}
                  </button>
                </form>
              )}
              </div>
            </div>

            {/* Related products */}
            {products.filter(p => p.name && p !== selProd).length > 0 && (
              <div className="pt-12 mt-8 border-t border-gray-200">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Other Products</p>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                  {products.filter(p => p.name && p !== selProd).slice(0, 8).map((p, i) => (
                    <button key={i} onClick={() => { setSelProd(p); setEnquirySuccess(false); setEnquiryForm({ name: "", phone: "", email: "", message: "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="flex-shrink-0 w-20 flex flex-col items-center gap-1.5 group cursor-pointer">
                      <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden group-hover:shadow-md transition">
                        {p.imageUrl
                          ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition" />
                          : <span className="text-2xl">{p.emoji || "📦"}</span>}
                        </div>
                      <p className="text-[10px] font-bold text-gray-600 text-center line-clamp-2 leading-tight group-hover:text-gray-900 transition">{p.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ FOOTER ══ */}
      <footer className="pt-20 pb-8 mt-12" style={{ backgroundColor: fBg, color: fText }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 border-b pb-12" style={{ borderColor: fText + "15" }}>
            <div>
              <div className="bg-white inline-flex p-3 rounded-2xl mb-6 shadow-sm">
                {seller.logoUrl ? <img src={seller.logoUrl} alt="Logo" className="h-12 w-auto object-contain" /> : <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-black text-gray-400">{ini(seller.name)}</div>}
              </div>
              <h3 className="text-xl font-black mb-3">{seller.name}</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-6 max-w-sm">{seller.aboutText ? seller.aboutText.slice(0, 120) + "..." : "Providing quality products with exceptional service."}</p>
              {Object.values(social).some(Boolean) && (
                <div className="flex gap-3 pt-2">
                  {Object.entries(social).filter(([, v]) => v).map(([key, url]) => {
                    const paths = SOCIAL_ICONS[key]; if (!paths) return null;
                    return (
                      <a key={key} href={url} target="_blank" rel="noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all hover:scale-110 cursor-pointer shadow-sm"
                        style={{ backgroundColor: fText + "10", color: fText }} title={key}>
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          {Array.isArray(paths) ? paths.map((p, i) => <path key={i} d={p} fill="currentColor" stroke="none" />) : <path d={paths} fill="currentColor" stroke="none" />}
                        </svg>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-6 opacity-70">Quick Links</h4>
                <ul className="space-y-3 text-sm font-semibold opacity-80">
                  {NAV.map(t => (
                    <li key={t}>
                      <button onClick={() => { setSelProd(null); setTab(t); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:opacity-100 transition cursor-pointer">{NL[t]}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-6 opacity-70">Top Products</h4>
                <ul className="space-y-3 text-sm font-semibold opacity-80">
                  {products.slice(0, 5).map((p, i) => (
                    <li key={i}>
                      <button onClick={() => { setSelProd(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:opacity-100 transition cursor-pointer text-left line-clamp-1">{p.name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-black text-xs uppercase tracking-widest mb-6 opacity-70">Contact Us</h4>
              <div className="space-y-4 text-sm opacity-80">
                {displayPhone && <p className="flex items-start gap-3"><span>📞</span> <a href={`tel:${displayPhone}`} className="hover:opacity-100 transition">{displayPhone}</a></p>}
                {seller.email && <p className="flex items-start gap-3"><span>✉️</span> <a href={`mailto:${seller.email}`} className="hover:opacity-100 transition break-all">{seller.email}</a></p>}
                {[seller.city, seller.state].filter(Boolean).length > 0 && <p className="flex items-start gap-3"><span>📍</span> <span>{[seller.city, seller.state].filter(Boolean).join(", ")}</span></p>}
              </div>

              {/* Footer Quality Badges */}
              {fBadges.filter(b => b.label).length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {fBadges.filter(b => b.label).map((badge, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full opacity-80" style={{ backgroundColor: fText + "15" }}>
                      {badge.icon} {badge.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t mt-8" style={{ borderColor: fText + "15" }}>
            <div className="text-[11px] opacity-70 font-medium mb-4 md:mb-0">
              © {new Date().getFullYear()} {seller.name}. All rights reserved.
            </div>
            <div className="text-[11px] font-bold">
              <a href="/" className="opacity-70 hover:opacity-100 transition px-3 py-1.5 rounded-lg bg-black/5">{fCopy}</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
