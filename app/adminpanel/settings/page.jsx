"use client";
import { useState, useEffect, useRef } from "react";
import {
  Settings, Globe, Save, CheckCircle2, Image as ImageIcon,
  Upload, Loader2, Trash2, AlertCircle, Eye, Palette,
} from "lucide-react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const inputCls =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-colors";

const BG_PRESETS = [
  { label: "Sunset Orange", value: "linear-gradient(160deg,#1c0a00 0%,#7c2d12 50%,#f97316 100%)" },
  { label: "Forest Green",  value: "linear-gradient(160deg,#052e16 0%,#166534 50%,#22c55e 100%)" },
  { label: "Deep Purple",   value: "linear-gradient(160deg,#1e0a3c 0%,#4c1d95 50%,#8b5cf6 100%)" },
  { label: "Ocean Blue",    value: "linear-gradient(160deg,#0c1445 0%,#1d4ed8 50%,#60a5fa 100%)" },
  { label: "Midnight",      value: "linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#334155 100%)" },
  { label: "Rose Gold",     value: "linear-gradient(160deg,#4a0010 0%,#be123c 50%,#fb7185 100%)" },
];

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    siteName: "Koop India",
    siteUrl: "https://www.koopindia.com",
    adminEmail: "admin@koopindia.com",
    whatsapp: "+91-9891233311",
  });

  const [banner, setBanner] = useState({
    imageUrl: "",
    title: "Welcome to\nKoopIndia.",
    subtitle: "India's trusted B2B marketplace — connecting buyers and sellers across every industry.",
    bgColor: BG_PRESETS[0].value,
    imageOpacity: 1,
  });
  const [bannerLoading, setBannerLoading] = useState(true);
  const [bannerSaving, setBannerSaving] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerToast, setBannerToast] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileRef = useRef();

  const [activeTab, setActiveTab] = useState("general"); // "general" | "marketplace"

  const [marketplace, setMarketplace] = useState({
    heroTitle: "Discover Trusted Indian Buyers Under One Roof",
    heroSubtitle: "Connect with verified manufacturers, startups and MSME buyers across multiple industries.",
    statsListedBuyers: "1000+",
    statsCategories: "500+",
    statsStates: "28+",
    statsConnections: "50K+",
  });
  const [marketplaceLoading, setMarketplaceLoading] = useState(true);
  const [marketplaceSaving, setMarketplaceSaving] = useState(false);

  // Partner logos: array of { imageUrl, link }
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [logoUploading, setLogoUploading] = useState(false);
  const [newLogoLink, setNewLogoLink] = useState("");
  const logoFileRef = useRef();

  // Banners: arrays of { imageUrl, link }
  const [topBanners, setTopBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [topBannerUploading, setTopBannerUploading] = useState(false);
  const [bottomBannerUploading, setBottomBannerUploading] = useState(false);
  const [newTopBannerLink, setNewTopBannerLink] = useState("");
  const [newBottomBannerLink, setNewBottomBannerLink] = useState("");
  const topBannerFileRef = useRef();
  const bottomBannerFileRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "login_banner"));
        if (snap.exists()) {
          setBanner((b) => ({ ...b, ...snap.data() }));
        }
      } catch (e) {
        console.error("Banner load error:", e);
      } finally {
        setBannerLoading(false);
      }

      try {
        const mSnap = await getDoc(doc(db, "settings", "marketplace_page"));
        if (mSnap.exists()) {
          const data = mSnap.data();
          setMarketplace((m) => ({ ...m, ...data }));
          if (data.partnerLogos) setPartnerLogos(data.partnerLogos);
          if (data.topBanners) setTopBanners(data.topBanners);
          if (data.bottomBanners) setBottomBanners(data.bottomBanners);
        }
      } catch (e) {
        console.error("Marketplace load error:", e);
      } finally {
        setMarketplaceLoading(false);
      }
    };
    load();
  }, []);

  const showBannerToast = (type, msg) => {
    setBannerToast({ type, msg });
    setTimeout(() => setBannerToast(null), 4000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showBannerToast("error", "Image must be under 5MB.");
      return;
    }
    setBannerUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `settings/login_banner_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setBanner((b) => ({ ...b, imageUrl: url }));
      showBannerToast("success", "Image uploaded! Click 'Save Banner' to apply.");
    } catch (e) {
      console.error("Upload error:", e);
      showBannerToast("error", "Upload failed. Check Firebase Storage rules.");
    }
    setBannerUploading(false);
  };

  const handleRemoveImage = () => {
    setBanner((b) => ({ ...b, imageUrl: "" }));
    showBannerToast("success", "Image removed. Click 'Save Banner' to apply.");
  };

  const handleSaveBanner = async () => {
    setBannerSaving(true);
    try {
      await setDoc(doc(db, "settings", "login_banner"), banner, { merge: true });
      showBannerToast("success", "Login banner updated successfully!");
    } catch (e) {
      console.error("Banner save error:", e);
      showBannerToast("error", "Failed to save banner.");
    }
    setBannerSaving(false);
  };

  const handleSaveMarketplace = async () => {
    setMarketplaceSaving(true);
    try {
      // Normalize links — ensure they have https:// prefix
      const normalize = (arr) => arr.map(l => ({
        ...l,
        link: l.link && !l.link.startsWith("http") ? `https://${l.link}` : l.link,
      }));
      
      const normalizedLogos = normalize(partnerLogos);
      const normalizedTopBanners = normalize(topBanners);
      const normalizedBottomBanners = normalize(bottomBanners);
      
      await setDoc(doc(db, "settings", "marketplace_page"), { 
        ...marketplace, 
        partnerLogos: normalizedLogos,
        topBanners: normalizedTopBanners,
        bottomBanners: normalizedBottomBanners
      }, { merge: true });
      
      setPartnerLogos(normalizedLogos);
      setTopBanners(normalizedTopBanners);
      setBottomBanners(normalizedBottomBanners);
      showBannerToast("success", "Marketplace settings updated successfully!");
    } catch (e) {
      console.error("Marketplace save error:", e);
      showBannerToast("error", "Failed to save marketplace settings.");
    }
    setMarketplaceSaving(false);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      showBannerToast("error", "Logo must be under 3MB.");
      return;
    }
    setLogoUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `settings/partner_logos/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPartnerLogos((prev) => [...prev, { imageUrl: url, link: newLogoLink.trim() }]);
      setNewLogoLink("");
      showBannerToast("success", "Logo added! Click Save to apply.");
    } catch (e) {
      console.error("Logo upload error:", e);
      showBannerToast("error", "Upload failed.");
    }
    setLogoUploading(false);
    e.target.value = "";
  };

  const handleRemoveLogo = (idx) => {
    setPartnerLogos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleLogoLinkChange = (idx, val) => {
    setPartnerLogos((prev) => prev.map((l, i) => i === idx ? { ...l, link: val } : l));
  };

  const handleBannerUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showBannerToast("error", "Banner must be under 5MB.");
      return;
    }
    const isTop = type === "top";
    if (isTop) setTopBannerUploading(true); else setBottomBannerUploading(true);
    
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `settings/${type}_banners/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      if (isTop) {
        setTopBanners((prev) => [...prev, { imageUrl: url, link: newTopBannerLink.trim() }]);
        setNewTopBannerLink("");
      } else {
        setBottomBanners((prev) => [...prev, { imageUrl: url, link: newBottomBannerLink.trim() }]);
        setNewBottomBannerLink("");
      }
      showBannerToast("success", "Banner added! Click Save to apply.");
    } catch (e) {
      console.error(`${type} banner upload error:`, e);
      showBannerToast("error", "Upload failed.");
    }
    if (isTop) setTopBannerUploading(false); else setBottomBannerUploading(false);
    e.target.value = "";
  };

  const handleRemoveBanner = (idx, type) => {
    if (type === "top") setTopBanners((prev) => prev.filter((_, i) => i !== idx));
    else setBottomBanners((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleBannerLinkChange = (idx, val, type) => {
    if (type === "top") setTopBanners((prev) => prev.map((l, i) => i === idx ? { ...l, link: val } : l));
    else setBottomBanners((prev) => prev.map((l, i) => i === idx ? { ...l, link: val } : l));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 text-sm">Configure platform settings and login page appearance.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span className="text-emerald-600 text-sm font-semibold">Settings saved!</span>
        </div>
      )}

      {/* ─── TABS ─── */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "general" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          General Settings
        </button>
        <button
          onClick={() => setActiveTab("marketplace")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "marketplace" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Marketplace Page
        </button>
      </div>

      {activeTab === "general" && (
        <div className="space-y-6">
          {/* ─── LOGIN BANNER SECTION ─── */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
            <ImageIcon size={14} className="text-orange-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 font-bold text-sm">Login Page Banner</h2>
            <p className="text-gray-400 text-xs">Customize the left panel on the login page</p>
          </div>
        </div>

                {bannerToast && (
          <div className={`mx-5 mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold ${
            bannerToast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            {bannerToast.type === "success"
              ? <CheckCircle2 size={14} className="text-emerald-600" />
              : <AlertCircle size={14} className="text-red-500" />}
            {bannerToast.msg}
          </div>
        )}

        <div className="p-5 space-y-6">
          {bannerLoading ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
              <Loader2 size={16} className="animate-spin" /> Loading banner settings...
            </div>
          ) : (
            <>
                            <div>
                <label className="text-sm font-bold text-gray-800 block mb-3">
                  Banner Image
                </label>
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full max-w-[280px] h-[350px] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                    {banner.imageUrl ? (
                      <img src={banner.imageUrl} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon size={32} className="text-gray-300" />
                        <span className="text-sm text-gray-400 font-medium">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                      <p className="text-orange-800 font-bold text-sm mb-1">Recommended Size</p>
                      <ul className="text-orange-700 text-sm space-y-1 list-disc list-inside">
                        <li>Width: <strong>1000px</strong></li>
                        <li>Height: <strong>1200px</strong> (Portrait)</li>
                        <li>Max File Size: <strong>5MB</strong></li>
                      </ul>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={handleImageUpload} />
                      <button
                        onClick={() => fileRef.current?.click()}
                        disabled={bannerUploading}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-all bg-white disabled:opacity-50 shadow-sm"
                      >
                        {bannerUploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Upload Image</>}
                      </button>
                      {banner.imageUrl && (
                        <button
                          onClick={handleRemoveImage}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-red-600 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

                            <button
                onClick={handleSaveBanner}
                disabled={bannerSaving}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-500/20"
              >
                {bannerSaving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Banner</>}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ─── GENERAL SETTINGS ─── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={16} className="text-orange-500" />
          <h2 className="text-gray-900 font-bold text-sm">General Settings</h2>
        </div>
        {[
          { label: "Site Name", key: "siteName", placeholder: "Koop India" },
          { label: "Site URL", key: "siteUrl", placeholder: "https://www.koopindia.com" },
          { label: "Admin Email", key: "adminEmail", placeholder: "admin@koopindia.com" },
          { label: "WhatsApp Number", key: "whatsapp", placeholder: "+91-9891233311" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-gray-500 text-xs font-semibold block mb-1.5">{f.label}</label>
            <input
              type="text"
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className={inputCls}
            />
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-500/20"
      >
        <Save size={16} /> Save Settings
      </button>
      </div>
      )}

      {/* ─── MARKETPLACE PAGE SETTINGS ─── */}
      {activeTab === "marketplace" && (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
            <Globe size={14} className="text-orange-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 font-bold text-sm">Marketplace Page</h2>
            <p className="text-gray-400 text-xs">Customize content for the marketplace page</p>
          </div>
        </div>
        
        <div className="p-5 space-y-4">
          {marketplaceLoading ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
              <Loader2 size={16} className="animate-spin" /> Loading marketplace settings...
            </div>
          ) : (
            <>
              <div>
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Hero Title</label>
                <input
                  type="text"
                  value={marketplace.heroTitle}
                  onChange={(e) => setMarketplace({ ...marketplace, heroTitle: e.target.value })}
                  placeholder="Hero Title"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Hero Subtitle</label>
                <textarea
                  value={marketplace.heroSubtitle}
                  onChange={(e) => setMarketplace({ ...marketplace, heroSubtitle: e.target.value })}
                  placeholder="Hero Subtitle"
                  className={inputCls}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-gray-500 text-xs font-semibold block mb-1.5">Listed Buyers</label>
                  <input
                    type="text"
                    value={marketplace.statsListedBuyers}
                    onChange={(e) => setMarketplace({ ...marketplace, statsListedBuyers: e.target.value })}
                    placeholder="1000+"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-semibold block mb-1.5">Categories</label>
                  <input
                    type="text"
                    value={marketplace.statsCategories}
                    onChange={(e) => setMarketplace({ ...marketplace, statsCategories: e.target.value })}
                    placeholder="500+"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-semibold block mb-1.5">States Covered</label>
                  <input
                    type="text"
                    value={marketplace.statsStates}
                    onChange={(e) => setMarketplace({ ...marketplace, statsStates: e.target.value })}
                    placeholder="28+"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs font-semibold block mb-1.5">Connections</label>
                  <input
                    type="text"
                    value={marketplace.statsConnections}
                    onChange={(e) => setMarketplace({ ...marketplace, statsConnections: e.target.value })}
                    placeholder="50K+"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* ── Partner / Marquee Logos ── */}
              <div className="border-t border-gray-100 pt-5">
                <label className="text-gray-800 text-sm font-bold block mb-1">Partner / Marquee Logos</label>
                <p className="text-gray-400 text-xs mb-4">Upload logos with links. They will scroll (marquee) on the marketplace page and open the link in a new tab when clicked.</p>

                {/* Existing logos */}
                {partnerLogos.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {partnerLogos.map((logo, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <img src={logo.imageUrl} alt="" className="w-14 h-10 object-contain rounded-lg bg-white border border-gray-100 flex-shrink-0" />
                        <input
                          type="url"
                          value={logo.link}
                          onChange={(e) => handleLogoLinkChange(idx, e.target.value)}
                          placeholder="https://partner-website.com"
                          className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                        />
                        <button onClick={() => handleRemoveLogo(idx)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new logo */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-3">
                  <p className="text-orange-800 text-xs font-bold">Add New Logo</p>
                  <input
                    type="url"
                    value={newLogoLink}
                    onChange={(e) => setNewLogoLink(e.target.value)}
                    placeholder="https://partner-website.com (optional)"
                    className="w-full bg-white border border-orange-200 text-gray-700 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-orange-400 transition-colors"
                  />
                  <input type="file" accept="image/*" className="hidden" ref={logoFileRef} onChange={handleLogoUpload} />
                  <button
                    onClick={() => logoFileRef.current?.click()}
                    disabled={logoUploading}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-300 bg-white text-xs font-bold text-orange-700 hover:bg-orange-50 transition-all disabled:opacity-50"
                  >
                    {logoUploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload Logo Image</>}
                  </button>
                </div>
              </div>

              {/* ── Top Banners (Before Categories) ── */}
              <div className="border-t border-gray-100 pt-5">
                <label className="text-gray-800 text-sm font-bold block mb-1">Top Banners (Before Categories)</label>
                <p className="text-gray-400 text-xs mb-4">Upload up to 5 banners. They will be displayed above the categories section. Links open in a new tab.</p>

                {topBanners.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {topBanners.map((banner, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <img src={banner.imageUrl} alt="" className="w-14 h-10 object-cover rounded-lg bg-white border border-gray-100 flex-shrink-0" />
                        <input
                          type="url"
                          value={banner.link}
                          onChange={(e) => handleBannerLinkChange(idx, e.target.value, "top")}
                          placeholder="https://example.com"
                          className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                        />
                        <button onClick={() => handleRemoveBanner(idx, "top")}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {topBanners.length < 5 && (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-3">
                    <p className="text-orange-800 text-xs font-bold">Add Top Banner</p>
                    <input
                      type="url"
                      value={newTopBannerLink}
                      onChange={(e) => setNewTopBannerLink(e.target.value)}
                      placeholder="Destination Link (optional)"
                      className="w-full bg-white border border-orange-200 text-gray-700 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    <input type="file" accept="image/*" className="hidden" ref={topBannerFileRef} onChange={(e) => handleBannerUpload(e, "top")} />
                    <button
                      onClick={() => topBannerFileRef.current?.click()}
                      disabled={topBannerUploading}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-300 bg-white text-xs font-bold text-orange-700 hover:bg-orange-50 transition-all disabled:opacity-50"
                    >
                      {topBannerUploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload Banner Image</>}
                    </button>
                  </div>
                )}
              </div>

              {/* ── Bottom Banners (Before Featured Sellers) ── */}
              <div className="border-t border-gray-100 pt-5">
                <label className="text-gray-800 text-sm font-bold block mb-1">Bottom Banners (Before Sellers)</label>
                <p className="text-gray-400 text-xs mb-4">Upload up to 5 banners. They will be displayed above the featured sellers section. Links open in a new tab.</p>

                {bottomBanners.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {bottomBanners.map((banner, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <img src={banner.imageUrl} alt="" className="w-14 h-10 object-cover rounded-lg bg-white border border-gray-100 flex-shrink-0" />
                        <input
                          type="url"
                          value={banner.link}
                          onChange={(e) => handleBannerLinkChange(idx, e.target.value, "bottom")}
                          placeholder="https://example.com"
                          className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-colors"
                        />
                        <button onClick={() => handleRemoveBanner(idx, "bottom")}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {bottomBanners.length < 5 && (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-3">
                    <p className="text-orange-800 text-xs font-bold">Add Bottom Banner</p>
                    <input
                      type="url"
                      value={newBottomBannerLink}
                      onChange={(e) => setNewBottomBannerLink(e.target.value)}
                      placeholder="Destination Link (optional)"
                      className="w-full bg-white border border-orange-200 text-gray-700 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    <input type="file" accept="image/*" className="hidden" ref={bottomBannerFileRef} onChange={(e) => handleBannerUpload(e, "bottom")} />
                    <button
                      onClick={() => bottomBannerFileRef.current?.click()}
                      disabled={bottomBannerUploading}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-300 bg-white text-xs font-bold text-orange-700 hover:bg-orange-50 transition-all disabled:opacity-50"
                    >
                      {bottomBannerUploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload Banner Image</>}
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleSaveMarketplace}
                disabled={marketplaceSaving}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-500/20 mt-2 w-fit"
              >
                {marketplaceSaving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Marketplace Settings</>}
              </button>
            </>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
