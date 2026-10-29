"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import MarketplaceHeader from "@/components/layout/MarketplaceHeader";
import MarketplaceFooter from "@/components/layout/MarketplaceFooter";
import {
  collection, query, where, getDocs, getDoc, addDoc, serverTimestamp, increment, updateDoc, doc,
} from "firebase/firestore";
import { getCurrentUser } from "../../adminpanel/lib/auth";
import { checkSellerToBuyerAccess, KOOP_SUPPORT_PHONE } from "../../../lib/categoryAccess";

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

const displayStatLabel = (lbl = "") => {
  if (!lbl) return "Investment";
  if (typeof lbl === "string" && lbl.toLowerCase().includes("turnover")) return "Investment";
  return lbl;
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
  const [currentUser, setCurrentUser] = useState(null);
  const [userListing, setUserListing] = useState(null);
  const [requestingAccess, setRequestingAccess] = useState(false);
  const [accessRequested, setAccessRequested] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    setCurrentUser(u);
    if (!u) return;

    if (u.role === "seller") {
      const fetchSellerListing = async () => {
        try {
          let sellerDoc = null;
          if (u.linkedId) {
            try {
              const s = await getDoc(doc(db, "sellers", u.linkedId));
              if (s.exists()) sellerDoc = { id: s.id, ...s.data() };
            } catch (_) {}
          }
          if (!sellerDoc && u.linkedSlug) {
            try {
              const q = query(collection(db, "sellers"), where("slug", "==", u.linkedSlug));
              const snap = await getDocs(q);
              if (!snap.empty) sellerDoc = { id: snap.docs[0].id, ...snap.docs[0].data() };
            } catch (_) {}
          }
          if (!sellerDoc && u.email) {
            try {
              const q = query(collection(db, "sellers"), where("email", "==", u.email.toLowerCase()));
              const snap = await getDocs(q);
              if (!snap.empty) sellerDoc = { id: snap.docs[0].id, ...snap.docs[0].data() };
            } catch (_) {}
          }
          setUserListing(sellerDoc);
        } catch (err) {
          console.error("Error fetching seller listing for category access:", err);
        }
      };
      fetchSellerListing();
    }
  }, []);

  const accessCheck = checkSellerToBuyerAccess({ currentUser, userListing, buyer });
  const hasDirectContactAccess = accessCheck.hasAccess;
  const koopPhone = KOOP_SUPPORT_PHONE;

  // Dynamically fetch and unlock buyer contact details only when verified access is granted
  useEffect(() => {
    if (!hasDirectContactAccess || !buyer?.id) return;
    let isCancelled = false;

    const loadUnlockedContactDetails = async () => {
      try {
        const snap = await getDoc(doc(db, "buyers", buyer.id));
        if (snap.exists() && !isCancelled) {
          const d = snap.data();
          const proxy = (u) =>
            u && typeof u === "string" && u.startsWith("http") && u.includes("firebase")
              ? `/api/img?url=${encodeURIComponent(u)}`
              : u;

          setBuyer((prev) => ({
            ...prev,
            contactPhone: d.contactPhone || d.phone || "",
            phone: d.phone || d.contactPhone || "",
            contactEmail: d.contactEmail || d.email || "",
            email: d.email || d.contactEmail || "",
            whatsapp: d.whatsapp || d.contactPhone || d.phone || "",
            contactName: d.contactName || prev?.contactName || d.buyerName || "",
            contactRole: d.contactRole || prev?.contactRole || "",
            contactPhotoUrl: proxy(d.contactPhotoUrl) || prev?.contactPhotoUrl || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching unlocked buyer contact details:", err);
      }
    };

    loadUnlockedContactDetails();
    return () => {
      isCancelled = true;
    };
  }, [hasDirectContactAccess, buyer?.id]);

  // Public / non-authorized: Koop India helpline phone, NO email
  // Authorized (Admin, Category-matched Live Seller, Assigned Seller, or Owner): Real buyer phone and email
  const displayPhone = hasDirectContactAccess
    ? (buyer?.contactPhone || buyer?.phone || koopPhone)
    : koopPhone;

  const displayEmail = hasDirectContactAccess
    ? (buyer?.contactEmail || buyer?.email || "")
    : "";

  const handleRequestContactAccess = async () => {
    if (!currentUser) {
      alert("Please login to your verified Seller Account to request direct contact access.");
      window.location.href = `/adminpanel/login?redirect=/buyers/${slug}`;
      return;
    }
    setRequestingAccess(true);
    try {
      await addDoc(collection(db, "leads"), {
        name: currentUser.name || "Seller User",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        sellerSlug: currentUser.linkedSlug || "",
        sellerId: currentUser.linkedId || "",
        buyerSlug: slug,
        buyerName: buyer?.buyerName || "",
        source: "buyer_page_access_request",
        type: "Contact Access Request",
        message: `Seller "${currentUser.name || currentUser.linkedSlug}" has requested direct contact access to Buyer "${buyer?.buyerName}".`,
        status: "New",
        createdAt: serverTimestamp(),
      });
      setAccessRequested(true);
      alert("✓ Direct contact access request sent to Koop India Admin! Once approved, full contact details will be unlocked for your account.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit access request. Please try again or contact Koop India.");
    } finally {
      setRequestingAccess(false);
    }
  };

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
      <MarketplaceHeader />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Loading buyer profile...</p>
        </div>
      </div>
      <MarketplaceFooter />
    </>
  );

  if (!buyer || buyer.status === "paused" || buyer.status === "draft") return (
    <>
      <MarketplaceHeader />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="text-5xl">🏢</div>
          <h1 className="text-xl font-black text-gray-800">Buyer Not Found</h1>
          <p className="text-gray-500 text-sm">This buyer listing is not available.</p>
          <a href="/buyers" className="inline-block bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm">Browse Buyers</a>
        </div>
      </div>
      <MarketplaceFooter />
    </>
  );

  const pc = buyer.primaryColor || "#16a34a";
  // Filter out investment and turnover from bottom stats strip so they only appear in the left sidebar
  const stats = (buyer.stats || []).filter(
    (s) =>
      s.value &&
      !s.label?.toLowerCase().includes("turnover") &&
      !s.label?.toLowerCase().includes("investment") &&
      s.icon !== "💰"
  );

  const statInvestment = (buyer.stats || []).find(
    (s) => s.value && (s.label?.toLowerCase().includes("investment") || s.icon === "💰")
  )?.value;

  const statTurnover = (buyer.stats || []).find(
    (s) => s.value && s.label?.toLowerCase().includes("turnover") && s.icon !== "💰"
  )?.value;

  const rawInvest = buyer.investment || buyer.totalInvestmentCapacity;
  const rawTurnover = buyer.annualTurnover;

  let investmentDisplay = rawInvest || statInvestment || "";
  let turnoverDisplay = rawTurnover || statTurnover || "";

  if (rawTurnover && rawInvest && rawTurnover === rawInvest && statInvestment && statInvestment !== rawInvest) {
    investmentDisplay = statInvestment;
  }
  const rating = parseFloat(buyer.rating) || 4.5;
  const whyUs = buyer.whyUs || [];
  const requirements = buyer.requirements || [];
  const preferredStates = Array.isArray(buyer.preferredStates)
    ? buyer.preferredStates
    : typeof buyer.preferredStates === "string" && buyer.preferredStates.trim()
      ? buyer.preferredStates.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean)
      : [];
  const productCategories = buyer.productCategories || [];
  const buyersWeWorkWith = (buyer.buyersWeWorkWith || []).filter((b) => b.name || b.logoUrl);
  const initials = (buyer.buyerName || "").split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
  const cleanAbout = buyer.about ? buyer.about.replace(/&nbsp;|\u00A0/g, " ").trim() : "";

  const rawContactPerson = buyer.contactName || buyer.contactPerson || buyer.name || "";
  let cleanContactName = rawContactPerson;
  let cleanContactRole = buyer.contactRole || buyer.designation || "";

  if (cleanContactName && cleanContactName.includes(",")) {
    const parts = cleanContactName.split(",");
    cleanContactName = parts[0].trim();
    if (!cleanContactRole && parts[1]) {
      cleanContactRole = parts[1].trim();
    }
  }

  if (!cleanContactName) {
    cleanContactName = buyer.buyerName || "Buyer Representative";
  }

  if (!cleanContactRole) {
    cleanContactRole = buyer.businessType ? `${buyer.businessType} Representative` : "Authorized Buyer";
  }

  return (
    <>
      <MarketplaceHeader />
      <div className="min-h-screen pt-16 bg-gray-50" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
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
          <div className="space-y-5 min-w-0">

            {/* ── HERO HEADER CARD ── */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className={`relative overflow-hidden ${buyer.coverImageUrl ? 'h-56 sm:h-72' : 'h-24 sm:h-32'}`} style={{ backgroundColor: pc + "22" }}>
                {buyer.coverImageUrl ? (
                  <img src={buyer.coverImageUrl} alt={buyer.buyerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${pc}33, ${pc}11)` }}>
                  </div>
                )}
                <button onClick={handleShare}
                  className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-700 font-bold text-xs px-3 py-1.5 rounded-full shadow hover:bg-white transition">
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
                  {copied ? "Copied!" : "Share Profile"}
                </button>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0" style={{ backgroundColor: buyer.logoUrl ? "#fff" : pc }}>
                    {buyer.logoUrl
                      ? <img src={buyer.logoUrl} alt={buyer.buyerName} className="w-full h-full object-contain p-1" />
                      : <span className="text-white font-black text-xl">{initials}</span>}
                  </div>
                  <div className="flex-1 pt-8 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="min-w-0">
                        {(buyer.gstVerified || buyer.panVerified || buyer.companyVerified) && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-[10px] font-black px-3 py-1 rounded-full text-white tracking-wide" style={{ backgroundColor: "#16a34a" }}>✓ VERIFIED {buyer.businessType?.toUpperCase() || "BUYER"}</span>
                          </div>
                        )}
                        <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight break-words">{buyer.buyerName}</h1>
                        {buyer.tagline && <p className="text-gray-500 text-sm mt-0.5 break-words">{buyer.tagline}</p>}
                        <div className="flex items-center gap-2 mt-1.5">
                          <StarRating rating={rating} />
                          <span className="text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
                          {buyer.reviewCount && <span className="text-gray-400 text-xs">({buyer.reviewCount} Reviews)</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 min-w-0">
              <div className="space-y-3 min-w-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 overflow-hidden">
                  <div className="space-y-3">
                    {[
                      { label: "Business Type", value: buyer.businessType },
                      { label: "Contact Person", value: cleanContactName !== buyer.buyerName ? cleanContactName : null },
                      { label: "Designation", value: cleanContactRole },
                      { label: "Year of Establishment", value: buyer.estYear },
                      { label: "Number of Outlets", value: buyer.numberOfOutlets },
                      { label: "Presence", value: buyer.presence },
                      { label: "Investment", value: investmentDisplay },
                      { label: "Annual Turnover", value: turnoverDisplay },
                      { label: "Buying Frequency", value: buyer.buyingFrequency },
                      { label: "Payment Terms", value: buyer.paymentTerms },
                    ].filter((r) => r.value).map((row, i) => (
                      <div key={i} className="border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{row.label}</p>
                        <p className="text-sm font-bold text-gray-800 break-words">{row.value}</p>
                      </div>
                    ))}
                    {buyer.gstNumber && (
                      <div className="border-b border-gray-50 pb-2.5">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">GST No.</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-gray-800 break-all">{buyer.gstNumber}</p>
                          {buyer.gstVerified && <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">Verified</span>}
                        </div>
                      </div>
                    )}
                    {buyer.panNumber && (
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">PAN No.</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-gray-800 break-all">{buyer.panNumber}</p>
                          {buyer.panVerified && <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">Verified</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-5 min-w-0">
                {cleanAbout && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pc + "20" }}>
                        <span className="text-xs">ℹ️</span>
                      </div>
                      <h2 className="text-sm font-black text-gray-900">About {buyer.buyerName}</h2>
                    </div>
                    {cleanAbout.includes("<") ? (
                      <div 
                        className="prose max-w-none text-gray-600 text-sm leading-relaxed break-words overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: cleanAbout }}
                      />
                    ) : (
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line break-words">
                        {cleanAbout}
                      </p>
                    )}
                  </div>
                )}

                {productCategories.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pc + "20" }}>
                        <span className="text-xs">📦</span>
                      </div>
                      <h2 className="text-sm font-black text-gray-900">Product Categories We Deal In</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight break-words">{cat}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {buyersWeWorkWith.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pc + "20" }}>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                    {whyUs.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">✅</span>
                          <h2 className="text-sm font-black text-gray-900">Why Supply to Us?</h2>
                        </div>
                        <ul className="space-y-2">
                          {whyUs.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                              <span className="break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {requirements.length > 0 && (
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">📋</span>
                          <h2 className="text-sm font-black text-gray-900">Our Requirements</h2>
                        </div>
                        <ul className="space-y-2">
                          {requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                              <span className="font-black flex-shrink-0 mt-0.5" style={{ color: pc }}>→</span>
                              <span className="break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {preferredStates.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-base">🗺️</span>
                      <h2 className="text-sm font-black text-gray-900">We Prefer Suppliers From</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {preferredStates.map((state, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pc }} />
                          <span className="break-words">{state}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── BOTTOM STATS STRIP ── */}
            {stats.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 overflow-hidden">
                <div className="flex flex-wrap gap-8 sm:gap-14 justify-start items-center">
                  {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-start text-left min-w-[90px]">
                      <span className="text-2xl mb-1">{s.icon}</span>
                      <p className="text-xl font-black leading-none" style={{ color: pc }}>{s.value}</p>
                      <p className="text-[11px] text-gray-500 font-semibold mt-1">{displayStatLabel(s.label)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-5 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5">
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
                  {hasDirectContactAccess && (buyer.whatsapp || buyer.phone) ? (
                    <a href={`https://wa.me/${(buyer.whatsapp || buyer.phone).replace(/\D/g, "")}?text=Hi, I am interested in doing business with ${buyer.buyerName}`}
                      target="_blank" rel="noreferrer"
                      className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition text-emerald-800">
                      <span className="text-base">💬</span> Chat on WhatsApp (Direct)
                    </a>
                  ) : (
                    <a href={`https://wa.me/919599826131?text=Hi Koop India, I want to connect with buyer: ${buyer.buyerName} (${slug})`}
                      target="_blank" rel="noreferrer"
                      className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition text-gray-700">
                      <span className="text-base">💬</span> Connect via Koop India Desk
                    </a>
                  )}
                </form>
              )}
            </div>

            {/* Direct Contact Card (Access Controlled) */}
            {hasDirectContactAccess ? (
              <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <h3 className="text-xs font-black text-emerald-800 uppercase tracking-wider">Direct Buyer Contact</h3>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {accessCheck.reason === "category_match" ? "✓ Category Match (Unlocked)" : "✓ Verified Access"}
                  </span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  {buyer.contactPhotoUrl
                    ? <img src={buyer.contactPhotoUrl} alt={cleanContactName} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-emerald-200" />
                    : <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black flex-shrink-0 bg-emerald-600">
                        {cleanContactName.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase()}
                      </div>
                  }
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-gray-900 text-sm">{cleanContactName}</p>
                    {cleanContactRole && <p className="text-gray-500 text-xs mt-0.5">{cleanContactRole}</p>}
                    
                    {displayPhone && (
                      <a href={`tel:${displayPhone}`} className="flex items-center gap-1.5 text-xs font-bold mt-2 text-emerald-700 hover:underline">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        {displayPhone}
                      </a>
                    )}
                    
                    {displayEmail && (
                      <a href={`mailto:${displayEmail}`} className="flex items-center gap-1.5 text-xs font-medium mt-1 text-gray-600 hover:underline break-all">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        {displayEmail}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black">🔒</span>
                    <div>
                      <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">Buyer Contact Protected</h3>
                      <p className="text-[10px] text-gray-500 font-medium">Verified partners only</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    Private
                  </span>
                </div>

                {/* Buyer Contact Person & Designation (Always Visible) */}
                <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                  {buyer.contactPhotoUrl ? (
                    <img
                      src={buyer.contactPhotoUrl}
                      alt={cleanContactName}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 border-orange-200"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 bg-[#1e3a5f] shadow-xs">
                      {cleanContactName.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-gray-900 text-sm leading-tight truncate">
                      {cleanContactName}
                    </p>
                    {cleanContactRole && (
                      <p className="text-gray-500 text-xs font-medium mt-0.5 truncate">
                        {cleanContactRole}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
                      <span>✓</span> Verified Representative
                    </span>
                  </div>
                </div>

                {/* Koop India Desk Helpline (Original buyer contact number & mail are hidden, Koop India desk shown) */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Connect via Koop India Desk</div>
                  <a href={`tel:${koopPhone}`} className="flex items-center gap-2 text-sm font-black text-gray-900 hover:text-orange-600 transition">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    {koopPhone}
                  </a>
                </div>

                {/* CTA Action */}
                {!currentUser ? (
                  <div className="pt-1">
                    <a
                      href="/seller-buyer-registration"
                      className="w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 text-center"
                    >
                      <span>Contact Distributor Now</span>
                      <span>→</span>
                    </a>
                  </div>
                ) : currentUser?.role === "seller" ? (
                  <div className="pt-1">
                    {accessCheck.reason === "not_listed" ? (
                      <a
                        href="/seller-buyer-registration"
                        className="w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 text-center"
                      >
                        <span>Contact Distributor Now</span>
                        <span>→</span>
                      </a>
                    ) : accessCheck.reason === "listing_not_live" ? (
                      <div className="text-center p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800 font-semibold">
                        ⏳ Listing Verification Pending (Status: {userListing?.status || "Pending"})
                      </div>
                    ) : (
                      <button
                        onClick={handleRequestContactAccess}
                        disabled={requestingAccess || accessRequested}
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow hover:opacity-95 transition disabled:opacity-60"
                      >
                        {accessRequested ? "✓ Access Requested (Under Review)" : requestingAccess ? "Submitting Request..." : "Request Direct Contact Access"}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="pt-1">
                    <a
                      href="/seller-buyer-registration"
                      className="w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow transition text-center"
                    >
                      <span>Contact Distributor Now</span>
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            )}

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
      <MarketplaceFooter />
    </>
  );
}
