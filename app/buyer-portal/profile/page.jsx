"use client";
import { useState, useEffect } from "react";
import { Loader2, MapPin, Phone, Mail, Globe, Shield, Building2, ExternalLink, Package } from "lucide-react";
import { getBuyerUser } from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Field = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  ) : null;

export default function BuyerProfilePage() {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getBuyerUser();
    if (!u?.linkedSlug) { setLoading(false); return; }
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, "buyers"), where("slug", "==", u.linkedSlug)));
        if (!snap.empty) setBuyer({ id: snap.docs[0].id, ...snap.docs[0].data() });
      } catch (e) {
        console.error("Buyer profile load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
        <Loader2 size={22} className="animate-spin" style={{ color: "#4c1d95" }} />
        <span className="text-sm font-semibold">Loading profile...</span>
      </div>
    );
  }

  if (!buyer) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-bold text-gray-700">No profile linked</p>
        <p className="text-gray-400 text-sm mt-1">Contact your admin to link your buyer profile.</p>
      </div>
    );
  }

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow";

  return (
    <div className="space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm">Your buyer listing details — managed by KoopIndia admin.</p>
        </div>
        {buyer.slug && (
          <a href={`/buyers/${buyer.slug}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all hover:shadow-sm"
            style={{ borderColor: "#4c1d95", color: "#4c1d95" }}>
            <ExternalLink size={12} /> View Live Page
          </a>
        )}
      </div>

      {/* Hero */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <div className="h-28 w-full relative" style={{ background: buyer.primaryColor ? `linear-gradient(135deg, ${buyer.primaryColor}dd, ${buyer.primaryColor}88)` : "linear-gradient(135deg, #4c1d95, #6d28d9)" }}>
          {buyer.coverImageUrl && <img src={buyer.coverImageUrl} alt="cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
        </div>
        <div className="bg-white px-6 pb-6 relative">
          <div className="flex items-end gap-4 -mt-8 mb-4">
            {buyer.logoUrl ? (
              <img src={buyer.logoUrl} alt="logo" className="w-16 h-16 rounded-2xl border-2 border-white shadow-md object-contain bg-white p-1 flex-shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-2xl border-2 border-white shadow-md flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                style={{ background: buyer.primaryColor || "#4c1d95" }}>
                {(buyer.buyerName || "B")[0].toUpperCase()}
              </div>
            )}
            <div className="pb-1">
              <h2 className="text-lg font-black text-gray-900">{buyer.buyerName || "—"}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                {buyer.category && <span className="text-xs font-semibold text-gray-500">{buyer.category}</span>}
                {buyer.city && <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={10} />{buyer.city}, {buyer.state}</span>}
                {buyer.status && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${buyer.status === "live" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {buyer.status === "live" ? "● Live" : "⏸ " + buyer.status}
                  </span>
                )}
              </div>
            </div>
          </div>
          {buyer.tagline && <p className="text-sm text-gray-500 italic">{buyer.tagline}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact */}
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Contact Information</h3>
          <div className="space-y-3">
            {buyer.contactName && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f5f3ff" }}>
                  <Building2 size={13} style={{ color: "#4c1d95" }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">Contact Person</p>
                  <p className="text-sm font-bold text-gray-800">{buyer.contactName}</p>
                </div>
              </div>
            )}
            {buyer.contactPhone && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f5f3ff" }}>
                  <Phone size={13} style={{ color: "#4c1d95" }} />
                </div>
                <a href={`tel:${buyer.contactPhone}`} className="text-sm font-bold text-gray-800 hover:underline">{buyer.contactPhone}</a>
              </div>
            )}
            {buyer.contactEmail && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f5f3ff" }}>
                  <Mail size={13} style={{ color: "#4c1d95" }} />
                </div>
                <a href={`mailto:${buyer.contactEmail}`} className="text-sm font-bold text-gray-800 hover:underline break-all">{buyer.contactEmail}</a>
              </div>
            )}
            {buyer.website && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f5f3ff" }}>
                  <Globe size={13} style={{ color: "#4c1d95" }} />
                </div>
                <a href={buyer.website} target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline break-all" style={{ color: "#4c1d95" }}>{buyer.website}</a>
              </div>
            )}
          </div>
        </div>

        {/* Business Details */}
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Business Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Business Type" value={buyer.businessType} />
            <Field label="Est. Year" value={buyer.estYear} />
            <Field label="Annual Turnover" value={buyer.annualTurnover} />
            <Field label="Outlets" value={buyer.numberOfOutlets} />
            <Field label="Buying Frequency" value={buyer.buyingFrequency} />
            <Field label="Payment Terms" value={buyer.paymentTerms} />
            <Field label="Delivery Area" value={buyer.deliveryArea} />
            <Field label="Location" value={[buyer.city, buyer.state].filter(Boolean).join(", ")} />
          </div>
        </div>
      </div>

      {/* Verifications */}
      {(buyer.gstVerified || buyer.panVerified || buyer.companyVerified) && (
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Verifications</h3>
          <div className="flex flex-wrap gap-2">
            {buyer.gstVerified && <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"><Shield size={11} /> GST Verified</span>}
            {buyer.panVerified && <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200"><Shield size={11} /> PAN Verified</span>}
            {buyer.companyVerified && <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200"><Shield size={11} /> Company Verified</span>}
          </div>
        </div>
      )}

      {/* Product Categories */}
      {buyer.productCategories?.length > 0 && (
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Product Categories</h3>
          <div className="flex flex-wrap gap-2">
            {buyer.productCategories.map((cat, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                <Package size={10} /> {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* About */}
      {buyer.about && (
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{buyer.about}</p>
        </div>
      )}

      {/* Note */}
      <div className="flex items-start gap-3 px-5 py-4 rounded-2xl border" style={{ background: "#f5f3ff", borderColor: "#ddd6fe" }}>
        <span className="text-xl">💡</span>
        <div>
          <p className="text-sm font-bold" style={{ color: "#4c1d95" }}>Want to update your profile?</p>
          <p className="text-xs mt-0.5" style={{ color: "#6d28d9" }}>Profile edits are managed by the KoopIndia admin team. Contact your admin to make changes.</p>
        </div>
      </div>
    </div>
  );
}
