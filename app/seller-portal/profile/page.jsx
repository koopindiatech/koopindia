"use client";
import { useState, useEffect } from "react";
import { Loader2, MapPin, Phone, Mail, Globe, Shield, Star, Building2, ExternalLink } from "lucide-react";
import { getSellerUser } from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Field = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  ) : null;

export default function SellerProfilePage() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = typeof window !== "undefined" ? getSellerUser() : null;

  useEffect(() => {
    const u = getSellerUser();
    if (!u?.linkedSlug) { setLoading(false); return; }
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, "sellers"), where("slug", "==", u.linkedSlug)));
        if (!snap.empty) setSeller({ id: snap.docs[0].id, ...snap.docs[0].data() });
      } catch (e) {
        console.error("Profile load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
        <Loader2 size={22} className="animate-spin text-green-600" />
        <span className="text-sm font-semibold">Loading profile...</span>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm text-center py-20">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-bold text-gray-700">No profile linked</p>
        <p className="text-gray-400 text-sm mt-1">Contact your admin to link your seller profile.</p>
      </div>
    );
  }

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow";

  return (
    <div className="space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm">Your seller listing details — managed by KoopIndia admin.</p>
        </div>
        {seller.slug && (
          <a href={`/${seller.slug}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all hover:shadow-sm"
            style={{ borderColor: "#2d5a27", color: "#2d5a27" }}>
            <ExternalLink size={12} /> View Live Page
          </a>
        )}
      </div>

      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        {/* Cover */}
        <div className="h-28 w-full relative" style={{ background: seller.primaryColor ? `linear-gradient(135deg, ${seller.primaryColor}dd, ${seller.primaryColor}88)` : "linear-gradient(135deg, #2d5a27, #4a7c3f)" }}>
          {seller.coverImageUrl && (
            <img src={seller.coverImageUrl} alt="cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          )}
        </div>
        <div className="bg-white px-6 pb-6 relative">
          <div className="flex items-end gap-4 -mt-8 mb-4">
            {seller.logoUrl ? (
              <img src={seller.logoUrl} alt="logo" className="w-16 h-16 rounded-2xl border-2 border-white shadow-md object-contain bg-white p-1 flex-shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-2xl border-2 border-white shadow-md flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                style={{ background: seller.primaryColor || "#2d5a27" }}>
                {(seller.name || seller.companyName || "S")[0].toUpperCase()}
              </div>
            )}
            <div className="pb-1">
              <h2 className="text-lg font-black text-gray-900">{seller.name || seller.companyName || "—"}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                {seller.category && <span className="text-xs font-semibold text-gray-500">{seller.category}</span>}
                {seller.city && (
                  <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={10} />{seller.city}, {seller.state}</span>
                )}
                {seller.status && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${seller.status === "live" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {seller.status === "live" ? "● Live" : "⏸ " + seller.status}
                  </span>
                )}
              </div>
            </div>
          </div>
          {seller.tagline && <p className="text-sm text-gray-500 italic">{seller.tagline}</p>}
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact */}
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Contact Information</h3>
          <div className="space-y-3">
            {seller.contact && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f0faf0" }}>
                  <Building2 size={13} style={{ color: "#2d5a27" }} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold">Contact Person</p>
                  <p className="text-sm font-bold text-gray-800">{seller.contact}</p>
                </div>
              </div>
            )}
            {seller.phone && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f0faf0" }}>
                  <Phone size={13} style={{ color: "#2d5a27" }} />
                </div>
                <a href={`tel:${seller.phone}`} className="text-sm font-bold text-gray-800 hover:underline">{seller.phone}</a>
              </div>
            )}
            {seller.email && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f0faf0" }}>
                  <Mail size={13} style={{ color: "#2d5a27" }} />
                </div>
                <a href={`mailto:${seller.email}`} className="text-sm font-bold text-gray-800 hover:underline break-all">{seller.email}</a>
              </div>
            )}
            {seller.website && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f0faf0" }}>
                  <Globe size={13} style={{ color: "#2d5a27" }} />
                </div>
                <a href={seller.website} target="_blank" rel="noreferrer" className="text-sm font-bold text-green-700 hover:underline break-all">{seller.website}</a>
              </div>
            )}
          </div>
        </div>

        {/* Business Details */}
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Business Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company Name" value={seller.companyName} />
            <Field label="Nature of Business" value={seller.natureOfBusiness} />
            <Field label="Est. Year" value={seller.establishmentYear} />
            <Field label="Employees" value={seller.employees} />
            <Field label="GST Number" value={seller.gstNumber} />
            <Field label="FSSAI License" value={seller.fssaiLicense} />
            <Field label="Address" value={[seller.address, seller.city, seller.state, seller.pincode].filter(Boolean).join(", ")} />
          </div>
        </div>
      </div>

      {/* Verification */}
      {(seller.gstVerified || seller.fssaiVerified || seller.companyVerified) && (
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Verifications</h3>
          <div className="flex flex-wrap gap-2">
            {seller.gstVerified && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Shield size={11} /> GST Verified
              </span>
            )}
            {seller.fssaiVerified && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <Shield size={11} /> FSSAI Verified
              </span>
            )}
            {seller.companyVerified && (
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                <Shield size={11} /> Company Verified
              </span>
            )}
          </div>
        </div>
      )}

      {/* About */}
      {seller.about && (
        <div className={card}>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{seller.about}</p>
        </div>
      )}

      {/* Note */}
      <div className="flex items-start gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <span className="text-xl">💡</span>
        <div>
          <p className="text-sm font-bold text-amber-800">Want to update your profile?</p>
          <p className="text-xs text-amber-700 mt-0.5">Profile edits are managed by the KoopIndia admin team. Contact your admin to make changes.</p>
        </div>
      </div>
    </div>
  );
}
