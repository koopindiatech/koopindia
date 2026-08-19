"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import {
  collection, query, where, getDocs, addDoc, serverTimestamp, increment, updateDoc, doc,
} from "firebase/firestore";

const getImg = (url) =>
  url && typeof url === "string" && url.startsWith("http") && url.includes("firebase")
    ? `/api/img?url=${encodeURIComponent(url)}`
    : url;

const StarRating = ({ rating }) => {
  const r = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill={i <= Math.round(r) ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={2}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi NCR", "Jammu & Kashmir", "Ladakh", "Chandigarh",
];

export default function BuyerClientPage({ initialBuyer }) {
  const { slug } = useParams();
  const [buyer, setBuyer] = useState(initialBuyer);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", companyName: "", email: "", phone: "", productCategory: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (buyer && buyer.id) {
      updateDoc(doc(db, "buyers", buyer.id), { views: increment(1) }).catch(() => {});
    }
  }, [buyer?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        buyerSlug: slug,
        buyerName: buyer?.buyerName || "",
        source: "buyer_page",
        type: "Buyer Inquiry",
        status: "New",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({ name: "", companyName: "", email: "", phone: "", productCategory: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send. Please try again.");
    } finally { setSubmitting(false); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Loading buyer profile...</p>
        </div>
      </div>
      <Footer />
    </>
  );

  if (!buyer || buyer.status === "paused" || buyer.status === "draft") return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="text-5xl">🏢</div>
          <h1 className="text-xl font-black text-gray-800">Buyer Not Found</h1>
          <p className="text-gray-500 text-sm">This buyer listing is not available.</p>
          <a href="/buyers" className="inline-block bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm">Browse Buyers</a>
        </div>
      </div>
      <Footer />
    </>
  );

  const pc = buyer.primaryColor || "#16a34a";
  const stats = (buyer.stats || []).filter((s) => s.value);
  const rating = parseFloat(buyer.rating) || 4.5;
  const whyUs = buyer.whyUs || [];
  const requirements = buyer.requirements || [];
  const preferredStates = buyer.preferredStates || [];
  const productCategories = buyer.productCategories || [];
  const buyersWeWorkWith = (buyer.buyersWeWorkWith || []).filter((b) => b.name || b.logoUrl);
  const initials = (buyer.buyerName || "").split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500 font-medium">
          <a href="/" className="hover:text-orange-500 transition">Home</a>
          <span>›</span>
          <a href="/buyers" className="hover:text-orange-500 transition">Buyers / Distributors</a>
          <span>›</span>
          <span className="text-gray-800 font-semibold">{buyer.buyerName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="space-y-5">

            {/* ── HERO HEADER CARD ── */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {/* Cover image */}
              <div className="relative h-56 sm:h-72 overflow-hidden" style={{ backgroundColor: pc + "22" }}>
                {buyer.coverImageUrl ? (
                  <img src={buyer.coverImageUrl} alt={buyer.buyerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${pc}33, ${pc}11)` }}>
                    <span className="text-6xl font-black opacity-20" style={{ color: pc }}>{initials}</span>
                  </div>
                )}
                {/* Share button */}
                <button onClick={handleShare}
                  className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-700 font-bold text-xs px-3 py-1.5 rounded-full shadow hover:bg-white transition">
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
                  {copied ? "Copied!" : "Share Profile"}
                </button>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  {/* Logo */}
                  <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: buyer.logoUrl ? "#fff" : pc }}>
                    {buyer.logoUrl
                      ? <img src={buyer.logoUrl} alt={buyer.buyerName} className="w-full h-full object-contain p-1" />
                      : <span className="text-white font-black text-xl">{initials}</span>}
                  </div>
                  <div className="flex-1 pt-8">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        {(buyer.gstVerified || buyer.panVerified || buyer.companyVerified) && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-[10px] font-black px-3 py-1 rounded-full text-white tracking-wide" style={{ backgroundColor: "#16a34a" }}>✓ VERIFIED {buyer.businessType?.toUpperCase() || "BUYER"}</span>
                          </div>
                        )}
                        <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">{buyer.buyerName}</h1>
                        {buyer.tagline && <p className="text-gray-500 text-sm mt-0.5">{buyer.tagline}</p>}
                        <div className="flex items-center gap-2 mt-1.5">
                          <StarRating rating={rating} />
                          <span className="text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
                          {buyer.reviewCount && <span className="text-gray-400 text-xs">({buyer.reviewCount} Reviews)</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info bar */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 border-t border-gray-100">
                  {buyer.businessType && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                      {buyer.businessType}
                    </div>
                  )}
                  {buyer.estYear && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      Since {buyer.estYear}
                    </div>
                  )}
                  {buyer.gstVerified && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-[9px]">✓</span> GST Verified
                    </div>
                  )}
                  {buyer.panVerified && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-[9px]">✓</span> PAN Verified
                    </div>
                  )}
                  {(buyer.city || buyer.state) && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {[buyer.city, buyer.state].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {buyer.deliveryArea && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                      {buyer.deliveryArea}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── TWO COLUMN: SIDEBAR INFO + MAIN CONTENT ── */}
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
              {/* Left info sidebar */}
              <div className="space-y-3">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="space-y-3">
                    {[
                      { label: "Business Type", value: buyer.businessType },
                      { label: "Year of Establishment", value: buyer.estYear },
                      { label: "Number of Outlets", value: buyer.numberOfOutlets },
                      { label: "Presence", value: buyer.presence },
                      { label: "Annual Turnover", value: buyer.annualTurnover },
                      { label: "Buying Frequency", value: buyer.buyingFrequency },
                      { label: "Payment Terms", value: buyer.paymentTerms },
                    ].filter((r) => r.value).map((row, i) => (
                      <div key={i} className="border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                        <p className="text-sm font-bold text-gray-800">{row.value}</p>
                      </div>
                    ))}
                    {buyer.gstNumber && (
                      <div className="border-b border-gray-50 pb-2.5">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">GST No.</p>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-gray-800">{buyer.gstNumber}</p>
                          {buyer.gstVerified && <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">Verified</span>}
                        </div>
                      </div>
                    )}
                    {buyer.panNumber && (
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">PAN No.</p>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-gray-800">{buyer.panNumber}</p>
                          {buyer.panVerified && <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">Verified</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main content area */}
              <div className="space-y-5">
                {/* About */}
                {buyer.about && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: pc + "20" }}>
                        <span className="text-xs">ℹ️</span>
                      </div>
                      <h2 className="text-sm font-black text-gray-900">About {buyer.buyerName}</h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{buyer.about}</p>
                  </div>
                )}

                {/* Product Categories */}
                {productCategories.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: pc + "20" }}>
                        <span className="text-xs">📦</span>
                      </div>
                      <h2 className="text-sm font-black text-gray-900">Product Categories We Deal In</h2>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {productCategories.map((cat, i) => {
                        const iconMap = {
                          "Fruits & Vegetables": "🥦", "Dairy Products": "🥛", "Packaged Foods": "📦",
                          "Beverages": "🥤", "Snacks & Namkeen": "🍿", "Bakery": "🍞",
                          "Household Essentials": "🧹", "Personal Care": "🧴", "Health & Wellness": "💊",
                          "Frozen Foods": "❄️", "Pulses & Grains": "🌾", "Dry Fruits & Nuts": "🥜",
                          "Spices & Masalas": "🌶️", "Tea & Coffee": "☕", "Organic Products": "🌿", "Edible Oils": "🫙",
                        };
                        return (
                          <div key={i} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors border border-gray-100">
                            <span className="text-2xl">{iconMap[cat] || "📦"}</span>
                            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">{cat}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Buyers we work with */}
                {buyersWeWorkWith.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: pc + "20" }}>
                        <span className="text-xs">🤝</span>
                      </div>
                      <h2 className="text-sm font-black text-gray-900">Buyers We Work With</h2>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      {buyersWeWorkWith.slice(0, 8).map((b, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 hover:border-gray-200 transition">
                          {b.logoUrl
                            ? <img src={b.logoUrl} alt={b.name} className="h-8 w-auto max-w-[70px] object-contain" />
                            : <span className="text-xs font-black text-gray-700">{b.name}</span>}
                        </div>
                      ))}
                      {buyersWeWorkWith.length > 8 && (
                        <div className="flex items-center justify-center bg-gray-100 rounded-xl px-3 py-2 text-xs font-black text-gray-500">
                          +{buyersWeWorkWith.length - 8} More
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Why Us + Requirements — side by side */}
                {(whyUs.length > 0 || requirements.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {whyUs.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">✅</span>
                          <h2 className="text-sm font-black text-gray-900">Why Supply to Us?</h2>
                        </div>
                        <ul className="space-y-2">
                          {whyUs.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {requirements.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">📋</span>
                          <h2 className="text-sm font-black text-gray-900">Our Requirements</h2>
                        </div>
                        <ul className="space-y-2">
                          {requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                              <span className="font-black flex-shrink-0 mt-0.5" style={{ color: pc }}>→</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Preferred States */}
                {preferredStates.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-base">🗺️</span>
                      <h2 className="text-sm font-black text-gray-900">We Prefer Suppliers From</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {preferredStates.map((state, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pc }} />
                          {state}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── BOTTOM STATS STRIP ── */}
            {stats.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
                <div className={`flex flex-wrap gap-6 ${stats.length >= 4 ? "justify-between" : "justify-center"}`}>
                  {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center text-center min-w-[80px]">
                      <span className="text-2xl mb-1">{s.icon}</span>
                      <p className="text-xl font-black leading-none" style={{ color: pc }}>{s.value}</p>
                      <p className="text-[11px] text-gray-500 font-semibold mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-5">
            {/* Connect Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 sticky top-4">
              <h3 className="font-black text-gray-900 text-base mb-1">
                Connect with this {buyer.businessType || "Buyer"}
              </h3>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                Interested in doing business with <strong>{buyer.buyerName}</strong>?
                Fill the form below and our team will connect with you.
              </p>

              {success ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">✅</div>
                  <h4 className="font-black text-gray-900 mb-1">Inquiry Sent!</h4>
                  <p className="text-gray-500 text-xs mb-4">We'll get back to you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="text-xs font-bold px-4 py-2 rounded-xl text-white" style={{ backgroundColor: pc }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" required placeholder="Your Name" value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400 font-medium transition" />
                  <input type="text" placeholder="Company Name" value={formData.companyName}
                    onChange={(e) => setFormData((p) => ({ ...p, companyName: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400 font-medium transition" />
                  <input type="email" placeholder="Email Address" value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400 font-medium transition" />
                  <input type="tel" required placeholder="Phone Number" value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400 font-medium transition" />
                  <input type="text" placeholder="Product Category" value={formData.productCategory}
                    onChange={(e) => setFormData((p) => ({ ...p, productCategory: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400 font-medium transition" />
                  <textarea placeholder="Write your message..." value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-gray-400 font-medium transition resize-none" />
                  <button type="submit" disabled={submitting}
                    className="w-full py-3 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: pc }}>
                    {submitting ? "Sending..." : " Send Business Proposal"}
                  </button>
                  {buyer.whatsapp && (
                    <a href={`https://wa.me/${buyer.whatsapp.replace(/\D/g, "")}?text=Hi, I am interested in doing business with ${buyer.buyerName}`}
                      target="_blank" rel="noreferrer"
                      className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition text-gray-700">
                      <span className="text-base"></span> Chat on WhatsApp
                    </a>
                  )}
                </form>
              )}
            </div>

            {/* Key Contact Person */}
            {buyer.contactName && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Key Contact Person</h3>
                </div>
                <div className="flex items-start gap-3">
                  {buyer.contactPhotoUrl
                    ? <img src={buyer.contactPhotoUrl} alt={buyer.contactName} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-gray-100" />
                    : <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black flex-shrink-0" style={{ backgroundColor: pc }}>
                        {buyer.contactName.split(" ").map((w) => w[0] || "").join("").slice(0, 2).toUpperCase()}
                      </div>
                  }
                  <div>
                    <p className="font-black text-gray-900 text-sm">{buyer.contactName}</p>
                    {buyer.contactRole && <p className="text-gray-500 text-xs mt-0.5">{buyer.contactRole}</p>}
                    {buyer.contactPhone && (
                      <a href={`tel:${buyer.contactPhone}`} className="flex items-center gap-1 text-xs font-semibold mt-1.5 hover:underline" style={{ color: pc }}>
                        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        {buyer.contactPhone}
                      </a>
                    )}
                    {buyer.contactEmail && (
                      <a href={`mailto:${buyer.contactEmail}`} className="flex items-center gap-1 text-xs font-semibold mt-1 text-gray-500 hover:underline break-all">
                        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        {buyer.contactEmail}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Company Address */}
            {buyer.address && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Company Address</h3>
                </div>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed">{buyer.buyerName}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{buyer.address}</p>
                {(buyer.city || buyer.state) && <p className="text-xs text-gray-500">{[buyer.city, buyer.state].filter(Boolean).join(", ")}</p>}
                {buyer.mapEmbedUrl && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200" style={{ height: "140px" }}>
                    <iframe src={buyer.mapEmbedUrl} width="100%" height="140" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Company Location" />
                  </div>
                )}
                {buyer.mapEmbedUrl && (
                  <a href={buyer.mapEmbedUrl} target="_blank" rel="noreferrer"
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border font-bold text-xs text-gray-700 hover:bg-gray-50 transition">
                    🗺️ View on Map
                  </a>
                )}
              </div>
            )}

            {/* Documents Verified */}
            {(buyer.gstVerified || buyer.panVerified || buyer.companyVerified) && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={pc} strokeWidth={2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider">Documents Verified</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {buyer.gstVerified && <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ GST Verified</span>}
                  {buyer.panVerified && <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ PAN Verified</span>}
                  {buyer.companyVerified && <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ Company Verified</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
