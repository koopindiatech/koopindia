"use client";
import { useState, useEffect } from "react";
import {
  Store, Plus, Search, Globe, Edit2, Trash2, PauseCircle, PlayCircle, X,
  Phone, Package, ExternalLink, MoreVertical, Check, Building2, Palette,
  FileText, Rocket, Star, Image as ImageIcon, Loader2, MapPin, Shield,
  Camera, Save, ArrowLeft, ArrowRight, AlertCircle, Mail,
} from "lucide-react";
import { db, storage } from "../../../lib/firebase";
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/* ─── helpers ─── */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ini = (n = "") => n.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();

const BUYER_COLORS = [
  { name: "Forest Green", hex: "#2d5a27" }, { name: "Flame", hex: "#F97316" },
  { name: "Navy", hex: "#1e40af" }, { name: "Crimson", hex: "#dc2626" },
  { name: "Violet", hex: "#7c3aed" }, { name: "Teal", hex: "#0d9488" },
  { name: "Amber", hex: "#d97706" }, { name: "Slate", hex: "#475569" },
];

const statusCfg = {
  live: { label: "Live", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  paused: { label: "Paused", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  draft: { label: "Draft", dot: "bg-gray-300", badge: "bg-gray-100 text-gray-500 border-gray-200" },
};

/* ─── DEFAULT DATA MODEL ─── */
const blank = () => ({
  type: "product",
  name: "", category: "", contact: "", phone: "", email: "",
  address: "", city: "", state: "", pincode: "",
  // Company Details Table
  companyName: "", natureOfBusiness: "", establishmentYear: "",
  employees: "", gstNumber: "", fssaiLicense: "",
  // Buyering & Nav
  logoUrl: "", primaryColor: "#2d5a27", secondaryColor: "#f5a623",
  homeBgColor: "#ffffff", aboutBgColor: "#ffffff", productsBgColor: "#ffffff", contactBgColor: "#ffffff",
  homeProductsBgColor: "", homeCertBgColor: "", homeContactBgColor: "",
  aboutMissionBgColor: "", aboutStatsBgColor: "", aboutCompanyBgColor: "", aboutInfraBgColor: "", aboutCertBgColor: "",
  navAlignment: "right",
  headerBgColor: "#ffffff", headerTextColor: "#4b5563",
  footerBgColor: "", footerTextColor: "#ffffff", footerText: "",
  // Hero
  heroBtn1Text: "View Our Products", heroBtn2Text: "Distributors / Buyers Inquiry",
  heroBanners: [{ id: uid(), url: "" }],
  // About
  about: "", aboutImageUrl: "",
  missionTitle: "Our Mission", mission: "",
  visionTitle: "Our Vision", vision: "",
  valuesTitle: "Our Values", values: "",
  commitmentTitle: "Our Commitment", commitment: "",
  // Products
  productCategories: [{ id: "all", name: "All Products" }],
  products: [{ id: uid(), name: "", categoryId: "all", price: "", description: "", imageUrl: "", badge: "", emoji: "📦", showOnHome: false,
    tagline: "", keyHighlights: "", suitableFor: "", availableVariants: "",
    features: "", ingredientsList: "", isNatural: false, isOrganic: false, isPreservativeFree: false,
    productType: "", netWeight: "", shelfLife: "", storageInstructions: "", packagingType: "", countryOfOrigin: "", fssaiNumber: "", isVegetarian: false, skuCode: "",
    availablePackaging: "", benefits: "", usageInstructions: "",
    nutritionEnergy: "", nutritionProtein: "", nutritionCarbs: "", nutritionSugar: "", nutritionFat: "", nutritionSodium: "",
    isISOCertified: false, isFSSAIApproved: false, isGMPCertified: false, isLabTested: false, isQualityChecked: false,
    whyChoose: "", industriesApplications: "",
    specifications: "", ingredients: "", packaging: "" }],
  // Home Page configuration
  showContactOnHome: true,
  // Stats
  stats: [
    { id: uid(), icon: "📦", value: "25+", label: "Products" },
    { id: uid(), icon: "😊", value: "500+", label: "Happy Clients" },
    { id: uid(), icon: "⏳", value: "15+", label: "Years of Experience" },
    { id: uid(), icon: "📍", value: "20+", label: "States Presence" },
    { id: uid(), icon: "🌍", value: "10+", label: "Countries Export" },
  ],
  // Infrastructure
  infrastructureTitle: "Our Infrastructure",
  infrastructureDesc: "We have a state-of-the-art processing unit equipped with modern machinery and advanced technology.",
  infrastructure: [{ id: uid(), title: "", description: "", imageUrl: "" }],
  // Certifications
  certifications: [{ id: uid(), name: "", imageUrl: "", description: "" }],
  // Contact & Social
  contactBannerUrl: "", whatsapp: "", hidePhone: false, mapEmbedUrl: "",
  social: { facebook: "", instagram: "", linkedin: "", youtube: "" },
  // Footer
  footerBadges: [
    { id: uid(), icon: "✅", label: "FSSAI Approved" },
    { id: uid(), icon: "🏆", label: "ISO 22000:2018 Certified" },
    { id: uid(), icon: "⚗️", label: "GMP Compliant" },
    { id: uid(), icon: "🌍", label: "Export Quality" },
  ],
});

const SECTIONS = [
  { id: "identity", label: "Identity", icon: Building2, desc: "Business type, name & contact" },
  { id: "buyering", label: "Buyering", icon: Palette, desc: "Logo & buyer colors" },
  { id: "hero", label: "Hero Section", icon: ImageIcon, desc: "Banner, headline & product images" },
  { id: "about", label: "About & Vision", icon: FileText, desc: "Story, mission & values" },
  { id: "products", label: "Products", icon: Package, desc: "Categories & product catalog" },
  { id: "stats", label: "Stats", icon: Star, desc: "Key business statistics" },
  { id: "infrastructure", label: "Infrastructure", icon: Building2, desc: "Factory & facility images" },
  { id: "certifications", label: "Certifications", icon: Shield, desc: "Quality certificates" },
  { id: "contact", label: "Contact & Social", icon: Phone, desc: "Address, contact & social" },
  { id: "publish", label: "Publish", icon: Rocket, desc: "Footer badges" },
];

/* ─── Tailwind helpers ─── */
const inp = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 placeholder:text-gray-400 transition-all duration-150 shadow-sm hover:border-gray-300";
const inp_sm = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 placeholder:text-gray-400 transition-all duration-150 shadow-sm";
const ta = `${inp} resize-none`;
const addBtn = "inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md";
const delBtn = "w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all duration-150 cursor-pointer border border-red-100 hover:border-red-200";
const sectionCard = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 hover:shadow-md transition-shadow duration-200";
const fieldLabel = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5";
/* ─── PROXY HELPER to ensure images display clearly without ad-blocker or CORS interruptions ─── */
const getImg = (url) => (url && typeof url === "string" && url.startsWith("http") && url.includes("firebase") ? `/api/img?url=${encodeURIComponent(url)}` : url);

/* ─── UPLOAD BOX helper (input is NOT nested inside label to prevent Chrome repaint bug) ─── */
const UploadBox = ({ field, label, value, onPick, small = false }) => {
  const inputId = `upload-input-${field}`;
  return (
    <div className="relative">
      {label && <p className="block text-sm font-bold text-gray-700 mb-2">{label}</p>}
      {/* Visual clickable area — htmlFor links to the input below */}
      <label
        htmlFor={inputId}
        className="cursor-pointer block"
        style={{ display: "block" }}
      >
        {value ? (
          <div className="relative group">
            <img src={getImg(value)} alt="" className={`rounded-2xl object-cover border border-gray-200 ${small ? "h-24 w-24" : "h-40 w-full"}`} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition">
              <Camera className="text-white" size={22} />
            </div>
          </div>
        ) : (
          <div className={`rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-violet-300 hover:text-violet-400 transition ${small ? "h-24 w-24" : "h-32 w-full"}`}>
            <Camera size={small ? 18 : 22} />
            <span className="text-[10px] font-semibold">Click to Upload</span>
          </div>
        )}
      </label>
      {/* Input is a SIBLING of label, NOT nested inside it */}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onPick}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

/* ─── PROGRESS PILL helper (outside component to prevent re-mount) ─── */
const ProgPill = ({ field, uploadStatus, uploadProgress }) =>
  uploadStatus?.[field] === "uploading"
    ? <span className="text-[10px] text-violet-500 font-bold">{uploadProgress?.[field] || 0}% uploading...</span>
    : uploadStatus?.[field] === "done"
      ? <span className="text-[10px] text-emerald-500 font-bold">✓ Uploaded</span>
      : uploadStatus?.[field] === "error"
        ? <span className="text-[10px] text-red-500 font-bold">⚠️ Upload failed — check Firebase Storage rules</span>
        : null;

/* ══════════════════════════════════════════════════════════ */
export default function SellersPage() {
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");
  const [dbLoading, setDbLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(null);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [delId, setDelId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  /* true while ANY image is currently uploading — prevents saving with empty URL */
  const isUploading = Object.values(uploadStatus).some((s) => s === "uploading");

  /* ── Load from Firestore ── */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, "sellers"), orderBy("createdAt", "desc")));
        setSellers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setDbLoading(false); }
    };
    load();
  }, []);

  /* ─── Upload file to Firebase Storage → return permanent URL ─── */
  const uploadToStorage = (file, path, uiKey) => new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setUploadProgress((p) => ({ ...p, [uiKey]: pct }));
      },
      (err) => {
        console.error("Storage upload error:", err.code, err.message);
        reject(err);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });

  /* ─── Upload state per UI key ─── */
  const setUploading = (key) => setUploadStatus((s) => ({ ...s, [key]: "uploading" }));
  const setDone = (key) => setUploadStatus((s) => ({ ...s, [key]: "done" }));
  const setError = (key) => setUploadStatus((s) => ({ ...s, [key]: "error" }));

  /* ─── Generic: upload a File → Storage → update form field ─── */
  const handleImagePick = async (e, field) => {
    const file = e.target.files?.[0]; if (!file) return;
    const uiKey = field;
    setUploading(uiKey);
    const formKey = `${field}Url`;
    try {
      const folder = slugify(form.name || "seller");
      const ext = file.name.split(".").pop() || "jpg";
      const path = `sellers/${folder}/${field}_${Date.now()}.${ext}`;
      const url = await uploadToStorage(file, path, uiKey);
      setForm((p) => {
        const next = { ...p, [formKey]: url };
        if (field === "heroBanner") next.bannerUrl = url;
        return next;
      });
      setDone(uiKey);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(uiKey);
    }
  };

  /* ─── Array item image upload (products, infrastructure, certifications) ─── */
  const handleArrayImagePick = async (e, arrayKey, index, imgField = "imageUrl") => {
    const file = e.target.files?.[0]; if (!file) return;
    const uiKey = `${arrayKey}_${index}`;
    setUploading(uiKey);
    try {
      const folder = slugify(form.name || "seller");
      const ext = file.name.split(".").pop() || "jpg";
      const path = `sellers/${folder}/${arrayKey}_${index}_${Date.now()}.${ext}`;
      const url = await uploadToStorage(file, path, uiKey);
      setArr(arrayKey, index, imgField, url);
      setDone(uiKey);
    } catch (err) {
      console.error("Array upload failed:", err);
      setError(uiKey);
    }
  };

  /* ─── Strip any accidental Base64 blobs or oversized data from payload before Firestore write ─── */
  const cleanPayload = (val) => {
    if (typeof val === "string") {
      const s = val.trim();
      if (s.startsWith("data:") || s.startsWith("blob:") || val.length > 50000) {
        console.warn("Stripped large base64/oversized data from Firestore save to prevent size limit error.");
        return "";
      }
      return val;
    }
    if (Array.isArray(val)) return val.map(cleanPayload);
    if (val && typeof val === "object") {
      const out = {};
      for (const [k, v] of Object.entries(val)) {
        if (k === "undefined" || typeof v === "function") continue;
        out[k] = cleanPayload(v);
      }
      return out;
    }
    return val;
  };

  /* ─── Save full form to Firestore ─── */
  const handleSave = async (asDraft = false) => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const clean = cleanPayload({ ...form });
      const slug = slugify(clean.name || "buyer");
      const payload = {
        ...clean,
        slug,
        heroBannerUrl: clean.heroBannerUrl || clean.bannerUrl || "",
        bannerUrl: clean.heroBannerUrl || clean.bannerUrl || "",
        status: asDraft ? "draft" : "live",
      };
      if (editing) {
        await updateDoc(doc(db, "sellers", editing.id), { ...payload, updatedAt: serverTimestamp() });
        setSellers((p) => p.map((s) => s.id === editing.id ? { ...s, ...payload } : s));
      } else {
        const docRef = await addDoc(collection(db, "sellers"), { ...payload, views: 0, createdAt: serverTimestamp() });
        setSellers((p) => [{ id: docRef.id, ...payload, views: 0 }, ...p]);
      }
      setFormOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed: " + (err?.message || "Unknown error"));
    }
    finally { setSaving(false); }
  };

  const toggleStatus = async (id, current) => {
    const next = current === "live" ? "paused" : "live";
    await updateDoc(doc(db, "sellers", id), { status: next });
    setSellers((p) => p.map((s) => s.id === id ? { ...s, status: next } : s));
    setMenuId(null);
  };

  const handleDelete = async () => {
    if (!delId) return;
    await deleteDoc(doc(db, "sellers", delId));
    setSellers((p) => p.filter((s) => s.id !== delId));
    setDelId(null);
  };

  /* ── Array helpers ── */
  const setArr = (key, i, k, v) => setForm((p) => { const a = [...p[key]]; a[i] = { ...a[i], [k]: v }; return { ...p, [key]: a }; });
  const addArr = (key, def) => setForm((p) => ({ ...p, [key]: [...p[key], def] }));
  const delArr = (key, i) => setForm((p) => ({ ...p, [key]: p[key].filter((_, j) => j !== i) }));
  const sf = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const sfSocial = (k, v) => setForm((p) => ({ ...p, social: { ...p.social, [k]: v } }));

  const filtered = sellers.filter((s) => {
    const q = search.toLowerCase();
    return !q || s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q) || s.slug?.includes(q);
  });

  const openForm = (s = null) => {
    setEditing(s);
    setForm(s ? { ...blank(), ...s } : blank());
    setStep(0);
    setFormOpen(true);
    setUploadProgress({});
    setUploadStatus({});
  };

  const pc = form.primaryColor || "#2d5a27";

  /* ══════════════════════════════════════════════════ RENDER */
  return (
    <div className="min-h-screen bg-[#f4f6fb]" style={{ fontFamily: "'Inter',sans-serif" }}>
      {!formOpen && (
        <>
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <Store className="text-white" size={18} />
              </div>
              <div>
                <h1 className="font-black text-gray-900 text-base leading-none">Buyer Portals</h1>
                <p className="text-gray-400 text-[11px] mt-0.5 font-medium">{sellers.length} sellers listed</p>
              </div>
            </div>
            <button onClick={() => openForm()}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-violet-200 transition-all hover:scale-105">
              <Plus size={16} /> Add Seller
            </button>
          </div>

          {/* ── Filter bar ── */}
          <div className="px-6 pt-5 pb-4 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sellers..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition" />
            </div>
          </div>

          {/* ── Loading / Empty ── */}
          {dbLoading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 size={32} className="animate-spin text-violet-400" />
              <p className="text-sm font-semibold">Loading sellers...</p>
            </div>
          )}
          {!dbLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
              <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center"><Store size={28} /></div>
              <p className="font-bold text-base text-gray-500">{search ? "No sellers match your search" : "No sellers yet"}</p>
              {!search && <button onClick={() => openForm()} className="bg-violet-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm">Add First Seller</button>}
            </div>
          )}

          {/* ── Seller Cards ── */}
          <div className="px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((s) => {
              const cfg = statusCfg[s.status] || statusCfg.draft;
              const color = s.primaryColor || "#7c3aed";
              return (
                <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Card header band */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                  <div className="p-5 flex-1 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      {s.logoUrl
                        ? <img src={getImg(s.logoUrl)} alt="" className="w-12 h-12 rounded-xl object-contain border border-gray-100 flex-shrink-0" />
                        : <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0" style={{ backgroundColor: color }}>{ini(s.name)}</div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-gray-900 text-sm truncate">{s.name}</p>
                        <p className="text-gray-400 text-[11px] font-medium truncate">{s.category || "—"}</p>
                      </div>
                      <div className="relative flex-shrink-0">
                        <button onClick={() => setMenuId(menuId === s.id ? null : s.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition"><MoreVertical size={14} /></button>
                        {menuId === s.id && (
                          <div className="absolute right-0 top-8 z-30 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 overflow-hidden">
                            <button onClick={() => { openForm(s); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left"><Edit2 size={13} /> Edit</button>
                            <button onClick={() => toggleStatus(s.id, s.status)} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left">
                              {s.status === "live" ? <><PauseCircle size={13} /> Pause</> : <><PlayCircle size={13} /> Activate</>}
                            </button>
                            <button onClick={() => { window.open(`/${s.slug}`, "_blank"); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left"><ExternalLink size={13} /> View Site</button>
                            <div className="border-t border-gray-100 my-1" />
                            <button onClick={() => { setDelId(s.id); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 text-left"><Trash2 size={13} /> Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
                      </span>
                      <span className="text-gray-300 text-[10px]">·</span>
                      <span className="text-gray-400 text-[10px] font-semibold">{s.type === "product" ? "🛒 Product" : "🏢 Service"}</span>
                    </div>

                    <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-2">
                      <Globe size={11} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] text-violet-600 font-semibold truncate">/{s.slug}</span>
                    </div>

                    <div className="flex gap-2 pt-1 mt-auto">
                      <button onClick={() => openForm(s)} className="flex-1 text-xs font-bold py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition flex items-center justify-center gap-1.5"><Edit2 size={11} /> Edit</button>
                      <a href={`/${s.slug}`} target="_blank" rel="noreferrer" className="flex-1 text-xs font-bold py-2 rounded-xl text-white flex items-center justify-center gap-1.5 transition" style={{ backgroundColor: color }}>
                        <ExternalLink size={11} /> View
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ═══════════════ BUYER STUDIO ═══════════════ */}
      {formOpen && (
        <div className="w-full flex flex-col" style={{ minHeight: '100vh', background: '#f1f5f9' }}>
          {/* Studio Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between gap-4 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setFormOpen(false)} className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all cursor-pointer">
                <ArrowLeft size={16} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: pc }}>
                  {form.logoUrl
                    ? <img src={getImg(form.logoUrl)} alt="" className="w-10 h-10 rounded-2xl object-contain" />
                    : <span className="text-white font-black text-sm">{ini(form.name || "BR")}</span>}
                </div>
                <div>
                  <h1 className="font-black text-gray-900 text-base leading-tight">{editing ? (form.name || "Edit Buyer") : "New Buyer Studio"}</h1>
                  {form.name && <p className="text-indigo-600 text-[11px] font-bold mt-0.5">/{slugify(form.name)}</p>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => handleSave(true)} disabled={saving || isUploading || !form.name.trim()}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all disabled:opacity-40 cursor-pointer">
                <Save size={14} /> Save Draft
              </button>
              <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.name.trim()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-200 disabled:opacity-40 cursor-pointer">
                <Rocket size={14} /> {saving ? "Publishing..." : isUploading ? "Uploading..." : "Publish Live"}
              </button>
            </div>
          </div>

          {/* Studio Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Nav */}
            <div className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-white border-r border-gray-100 pt-6 pb-10 px-4 gap-1 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3">Sections</p>
              {[
                { id: 0, icon: "🏠", label: "Buyer Identity", desc: "Name, colors, logo" },
                { id: 1, icon: "ℹ️", label: "About & Vision", desc: "Story, mission, team" },
                { id: 2, icon: "📦", label: "Products", desc: "Catalog & categories" },
                { id: 3, icon: "📞", label: "Contact & Social", desc: "Contact info, links" },
              ].map(t => (
                <button key={t.id} type="button" onClick={() => setStep(t.id)}
                  className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-150 group ${step === t.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "hover:bg-gray-50 text-gray-700"
                    }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-base">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${step === t.id ? "text-white" : "text-gray-800"}`}>{t.label}</p>
                      <p className={`text-[10px] truncate mt-0.5 ${step === t.id ? "text-indigo-200" : "text-gray-400"}`}>{t.desc}</p>
                    </div>
                    {step === t.id && <Check size={14} className="text-indigo-200 flex-shrink-0" />}
                  </div>
                </button>
              ))}

              <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
                <button type="button" onClick={() => handleSave(true)} disabled={saving || isUploading || !form.name.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all disabled:opacity-40 cursor-pointer">
                  <Save size={13} /> {isUploading ? "Wait for upload..." : "Save as Draft"}
                </button>
                <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.name.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md disabled:opacity-40 cursor-pointer">
                  <Rocket size={13} /> {saving ? "Publishing..." : isUploading ? "Uploading..." : "Publish Live"}
                </button>
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="flex lg:hidden border-b border-gray-100 bg-white overflow-x-auto sticky top-[57px] z-20 w-full flex-shrink-0">
              {[
                { id: 0, icon: "🏠", label: "Identity" },
                { id: 1, icon: "ℹ️", label: "About" },
                { id: 2, icon: "📦", label: "Products" },
                { id: 3, icon: "📞", label: "Contact" },
              ].map(t => (
                <button key={t.id} type="button" onClick={() => setStep(t.id)}
                  className={`flex-shrink-0 px-5 py-3.5 text-left border-b-2 transition-all ${step === t.id ? "border-indigo-600 bg-white" : "border-transparent hover:bg-gray-50"
                    }`}>
                  <p className={`text-xs font-black ${step === t.id ? "text-indigo-700" : "text-gray-500"}`}>{t.label}</p>
                </button>
              ))}
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto p-5 sm:p-8 space-y-6">

                {/* ══ BUYER IDENTITY TAB ══ */}
                {step === 0 && (
                  <div className="space-y-6">
                    {/* Basic Buyer Info */}
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div>
                          <h3 className="text-sm font-black text-gray-900">Buyer Identity</h3>
                          <p className="text-[11px] text-gray-400 font-medium">Core details about your business</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={fieldLabel}>Buyer / Business Name *</label>
                            <input type="text" value={form.name} onChange={e => sf("name", e.target.value)} placeholder="e.g. Nayana Masala" className={inp} />
                          </div>
                          <div>
                            <label className={fieldLabel}>Category / Industry</label>
                            <input type="text" value={form.category} onChange={e => sf("category", e.target.value)} placeholder="e.g. Spices & Masala" className={inp} />
                          </div>
                        </div>
                        <div>
                          <label className={fieldLabel}>Business Type</label>
                          <div className="flex gap-3">
                            {[{ v: "product", label: "🛒 Product Buyer" }, { v: "service", label: "🏢 Service Buyer" }].map(o => (
                              <button key={o.v} type="button" onClick={() => sf("type", o.v)}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all duration-150 cursor-pointer ${form.type === o.v ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                                  }`}>{o.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buyering Colors */}
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div>
                          <h3 className="text-sm font-black text-gray-900">Buyering Colors & Logo</h3>
                          <p className="text-[11px] text-gray-400 font-medium">Set your buyer palette and visual identity</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className={fieldLabel}>Primary Buyer Color</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="w-10 h-10 rounded-xl shadow-md flex-shrink-0 border-2 border-white" style={{ backgroundColor: form.primaryColor }} />
                              <div className="flex gap-1.5 flex-wrap">
                                {BUYER_COLORS.map(c => (
                                  <button key={c.hex} type="button" onClick={() => sf("primaryColor", c.hex)}
                                    className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer ${form.primaryColor === c.hex ? "border-gray-700 scale-110 shadow-sm" : "border-transparent"
                                      }`}
                                    style={{ backgroundColor: c.hex }} title={c.name} />
                                ))}
                                <input type="color" value={form.primaryColor} onChange={e => sf("primaryColor", e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className={fieldLabel}>Secondary Buyer Color</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="w-10 h-10 rounded-xl shadow-md flex-shrink-0 border-2 border-white" style={{ backgroundColor: form.secondaryColor || '#f5a623' }} />
                              <div className="flex gap-1.5 flex-wrap">
                                {BUYER_COLORS.map(c => (
                                  <button key={c.hex} type="button" onClick={() => sf("secondaryColor", c.hex)}
                                    className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer ${form.secondaryColor === c.hex ? "border-gray-700 scale-110 shadow-sm" : "border-transparent"
                                      }`}
                                    style={{ backgroundColor: c.hex }} title={c.name} />
                                ))}
                                <input type="color" value={form.secondaryColor || "#f5a623"} onChange={e => sf("secondaryColor", e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={fieldLabel}>Home Page BG</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <input type="color" value={form.homeBgColor || "#ffffff"} onChange={e => sf("homeBgColor", e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" />
                              <span className="text-xs text-gray-500 font-medium">Background color for Home</span>
                            </div>
                          </div>
                          <div>
                            <label className={fieldLabel}>About Page BG</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <input type="color" value={form.aboutBgColor || "#ffffff"} onChange={e => sf("aboutBgColor", e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" />
                              <span className="text-xs text-gray-500 font-medium">Background color for About</span>
                            </div>
                          </div>
                          <div>
                            <label className={fieldLabel}>Products Page BG</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <input type="color" value={form.productsBgColor || "#ffffff"} onChange={e => sf("productsBgColor", e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" />
                              <span className="text-xs text-gray-500 font-medium">Background color for Products</span>
                            </div>
                          </div>
                          <div>
                            <label className={fieldLabel}>Contact Page BG</label>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <input type="color" value={form.contactBgColor || "#ffffff"} onChange={e => sf("contactBgColor", e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200" />
                              <span className="text-xs text-gray-500 font-medium">Background color for Contact</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-4">Specific Section Backgrounds</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <label className={fieldLabel}>Home Products BG</label>
                              <input type="color" value={form.homeProductsBgColor || "#ffffff"} onChange={e => sf("homeProductsBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>Home Certs BG</label>
                              <input type="color" value={form.homeCertBgColor || "#ffffff"} onChange={e => sf("homeCertBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>Home Contact BG</label>
                              <input type="color" value={form.homeContactBgColor || "#ffffff"} onChange={e => sf("homeContactBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>About Mission BG</label>
                              <input type="color" value={form.aboutMissionBgColor || "#ffffff"} onChange={e => sf("aboutMissionBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>About Stats BG</label>
                              <input type="color" value={form.aboutStatsBgColor || "#ffffff"} onChange={e => sf("aboutStatsBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>About Company BG</label>
                              <input type="color" value={form.aboutCompanyBgColor || "#ffffff"} onChange={e => sf("aboutCompanyBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>About Infra BG</label>
                              <input type="color" value={form.aboutInfraBgColor || "#ffffff"} onChange={e => sf("aboutInfraBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                            <div>
                              <label className={fieldLabel}>About Certs BG</label>
                              <input type="color" value={form.aboutCertBgColor || "#ffffff"} onChange={e => sf("aboutCertBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={fieldLabel}>Nav Alignment</label>
                            <div className="flex gap-2">
                              {[{ v: "left", label: "◀ Left" }, { v: "right", label: "Right ▶" }].map(o => (
                                <button key={o.v} type="button" onClick={() => sf("navAlignment", o.v)}
                                  className={`flex-1 py-2 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer ${form.navAlignment === o.v ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                    }`}>{o.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className={fieldLabel}>Company Logo</label>
                            <UploadBox field="logo" value={form.logoUrl} onPick={e => handleImagePick(e, "logo")} small />
                            {ProgPill({field:"logo",uploadStatus,uploadProgress})}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Header & Footer */}
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div>
                          <h3 className="text-sm font-black text-gray-900">Header & Footer</h3>
                          <p className="text-[11px] text-gray-400 font-medium">Header background, text & footer settings</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <label className={fieldLabel}>Header BG</label>
                            <input type="color" value={form.headerBgColor || "#ffffff"} onChange={e => sf("headerBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                          </div>
                          <div>
                            <label className={fieldLabel}>Header Text</label>
                            <input type="color" value={form.headerTextColor || "#4b5563"} onChange={e => sf("headerTextColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                          </div>
                          <div>
                            <label className={fieldLabel}>Footer BG</label>
                            <input type="color" value={form.footerBgColor || form.primaryColor || "#2d5a27"} onChange={e => sf("footerBgColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                          </div>
                          <div>
                            <label className={fieldLabel}>Footer Text</label>
                            <input type="color" value={form.footerTextColor || "#ffffff"} onChange={e => sf("footerTextColor", e.target.value)} className="w-full h-10 rounded-xl cursor-pointer border border-gray-200" />
                          </div>
                        </div>
                        <div>
                          <label className={fieldLabel}>Footer Copyright Text</label>
                          <input type="text" value={form.footerText || ""} onChange={e => sf("footerText", e.target.value)} placeholder="e.g. Managed by Koop India" className={inp} />
                        </div>
                      </div>
                    </div>

                    {/* Hero Banner */}
                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="text-sm font-black text-gray-900">Hero Banners</h3>
                            <p className="text-[11px] text-gray-400 font-medium">Auto-rotating banner slider</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => addArr("heroBanners", { id: uid(), url: "" })} className={addBtn}><Plus size={14} /> Add Banner</button>
                      </div>
                      <div className="space-y-3">
                        {(form.heroBanners || []).map((banner, i) => (
                          <div key={banner.id || i} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 items-center">
                            <div className="flex-1">
                              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Banner {i + 1}</label>
                              <UploadBox field={`heroBanners_${i}`} value={banner.url || banner.imageUrl} onPick={e => handleArrayImagePick(e, "heroBanners", i, "url")} small />
                              {ProgPill({field:`heroBanners_${i}`,uploadStatus,uploadProgress})}
                            </div>
                            <button type="button" onClick={() => delArr("heroBanners", i)} className={delBtn}><X size={14} /></button>
                          </div>
                        ))}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className={fieldLabel}>Button 1 Text</label>
                            <input type="text" value={form.heroBtn1Text || ""} onChange={e => sf("heroBtn1Text", e.target.value)} placeholder="View Our Products" className={inp} />
                          </div>
                          <div>
                            <label className={fieldLabel}>Button 2 Text</label>
                            <input type="text" value={form.heroBtn2Text || ""} onChange={e => sf("heroBtn2Text", e.target.value)} placeholder="Distributors / Buyers Inquiry" className={inp} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Home Config */}
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div>
                          <h3 className="text-sm font-black text-gray-900">Home Page Content</h3>
                          <p className="text-[11px] text-gray-400 font-medium">Short about text & display settings</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className={fieldLabel}>Short About Text (shown on Home)</label>
                          <textarea rows={4} value={form.homeAbout || ""} onChange={e => sf("homeAbout", e.target.value)} placeholder="Brief company introduction shown centred on the home page..." className={ta} />
                        </div>
                        <label className="flex items-center gap-3 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors">
                          <input type="checkbox" checked={form.showContactOnHome !== false} onChange={e => sf("showContactOnHome", e.target.checked)} className="w-5 h-5 text-indigo-600 rounded cursor-pointer accent-indigo-600" />
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Show Contact block on Home Page</p>
                            <p className="text-gray-500 text-xs mt-0.5">Displays contact section on the Home tab.</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="text-sm font-black text-gray-900">Stats Bar</h3>
                            <p className="text-[11px] text-gray-400 font-medium">Key business metrics</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => addArr("stats", { id: uid(), icon: "📦", value: "", label: "" })} className={addBtn}><Plus size={14} /> Add Stat</button>
                      </div>
                      <div className="space-y-2">
                        {form.stats.map((s, i) => (
                          <div key={s.id || i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
                            <input type="text" value={s.icon} onChange={e => setArr("stats", i, "icon", e.target.value)} placeholder="📦" className="w-12 text-center bg-white rounded-lg border border-gray-200 text-sm outline-none" style={{ padding: "8px 4px" }} />
                            <input type="text" value={s.value} onChange={e => setArr("stats", i, "value", e.target.value)} placeholder="25+" className="w-20 bg-white rounded-lg border border-gray-200 text-sm font-bold outline-none" style={{ padding: "8px 10px" }} />
                            <input type="text" value={s.label} onChange={e => setArr("stats", i, "label", e.target.value)} placeholder="Products" className={inp + " flex-1"} />
                            <button type="button" onClick={() => delArr("stats", i)} className={delBtn}><X size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="text-sm font-black text-gray-900">Certifications</h3>
                            <p className="text-[11px] text-gray-400 font-medium">Quality certificates & awards</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => addArr("certifications", { id: uid(), name: "", imageUrl: "", description: "" })} className={addBtn}><Plus size={14} /> Add Certificate</button>
                      </div>
                      <div className="space-y-3">
                        {form.certifications.map((cert, i) => (
                          <div key={cert.id || i} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex-shrink-0">
                              <UploadBox field={`cert_${i}`} value={cert.imageUrl} onPick={e => handleArrayImagePick(e, "certifications", i)} small />
                              {ProgPill({field:`certifications_${i}`,uploadStatus,uploadProgress})}
                            </div>
                            <div className="flex-1 space-y-2">
                              <input type="text" value={cert.name} onChange={e => setArr("certifications", i, "name", e.target.value)} placeholder="e.g. FSSAI Approved" className={inp} />
                              <input type="text" value={cert.description} onChange={e => setArr("certifications", i, "description", e.target.value)} placeholder="Short description" className={inp} />
                            </div>
                            <button type="button" onClick={() => delArr("certifications", i)} className={delBtn}><X size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ ABOUT TAB ══ */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div><h3 className="text-sm font-black text-gray-900">About the Buyer</h3><p className="text-[11px] text-gray-400 font-medium">Story and buyer introduction</p></div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className={fieldLabel}>About / Description</label>
                          <textarea rows={5} value={form.about} onChange={e => sf("about", e.target.value)} placeholder="Established in 2010, we are a trusted name in the spice industry..." className={ta} />
                        </div>
                        <div>
                          <label className={fieldLabel}>About Image (shown on right)</label>
                          <UploadBox field="aboutImage" value={form.aboutImageUrl} onPick={e => handleImagePick(e, "aboutImage")} />
                          {ProgPill({field:"aboutImage",uploadStatus,uploadProgress})}
                        </div>
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div><h3 className="text-sm font-black text-gray-900">Mission, Vision, Values & Commitment</h3><p className="text-[11px] text-gray-400 font-medium">Core pillars of your buyer</p></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { icon: "🎯", titleKey: "missionTitle", bodyKey: "mission", ph: "To deliver pure and high-quality products..." },
                          { icon: "👁️", titleKey: "visionTitle", bodyKey: "vision", ph: "To be a globally recognised buyer..." },
                          { icon: "💎", titleKey: "valuesTitle", bodyKey: "values", ph: "Quality, integrity, innovation..." },
                          { icon: "🤝", titleKey: "commitmentTitle", bodyKey: "commitment", ph: "To maintain highest standards in quality..." },
                        ].map(({ icon, titleKey, bodyKey, ph }) => (
                          <div key={bodyKey} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xl">{icon}</span>
                              <input type="text" value={form[titleKey]} onChange={e => sf(titleKey, e.target.value)} className="flex-1 font-black text-gray-800 text-xs bg-transparent outline-none border-b border-gray-200 pb-1 focus:border-indigo-400" placeholder="Section title" />
                            </div>
                            <textarea rows={3} value={form[bodyKey]} onChange={e => sf(bodyKey, e.target.value)} placeholder={ph} className={ta + " text-xs"} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div><h3 className="text-sm font-black text-gray-900">Company Details Table</h3><p className="text-[11px] text-gray-400 font-medium">Legal & business details</p></div>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div><label className={fieldLabel}>Company / Legal Name</label><input type="text" value={form.companyName} onChange={e => sf("companyName", e.target.value)} placeholder="e.g. Vasudevhari Foods Pvt Ltd" className={inp} /></div>
                          <div><label className={fieldLabel}>Nature of Business</label><input type="text" value={form.natureOfBusiness} onChange={e => sf("natureOfBusiness", e.target.value)} placeholder="e.g. Manufacturer, Packaging" className={inp} /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div><label className={fieldLabel}>Established Year</label><input type="text" value={form.establishmentYear} onChange={e => sf("establishmentYear", e.target.value)} placeholder="e.g. 2010" className={inp} /></div>
                          <div><label className={fieldLabel}>No. of Employees</label><input type="text" value={form.employees} onChange={e => sf("employees", e.target.value)} placeholder="e.g. 50" className={inp} /></div>
                          <div><label className={fieldLabel}>GST Number</label><input type="text" value={form.gstNumber} onChange={e => sf("gstNumber", e.target.value)} placeholder="e.g. 24AAJCV..." className={inp} /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div><label className={fieldLabel}>FSSAI License</label><input type="text" value={form.fssaiLicense} onChange={e => sf("fssaiLicense", e.target.value)} placeholder="e.g. 10723998000196" className={inp} /></div>
                          <div><label className={fieldLabel}>Full Address</label><input type="text" value={form.address} onChange={e => sf("address", e.target.value)} placeholder="Plot No., Street, Area" className={inp} /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div><label className={fieldLabel}>City</label><input type="text" value={form.city} onChange={e => sf("city", e.target.value)} placeholder="City" className={inp} /></div>
                          <div><label className={fieldLabel}>State</label><input type="text" value={form.state} onChange={e => sf("state", e.target.value)} placeholder="State" className={inp} /></div>
                          <div><label className={fieldLabel}>PIN Code</label><input type="text" value={form.pincode} onChange={e => sf("pincode", e.target.value)} placeholder="641035" className={inp} /></div>
                        </div>
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <div><h3 className="text-sm font-black text-gray-900">Infrastructure / Facility</h3><p className="text-[11px] text-gray-400 font-medium">Factory & facility images</p></div>
                        </div>
                        <button type="button" onClick={() => addArr("infrastructure", { id: uid(), title: "", description: "", imageUrl: "" })} className={addBtn}><Plus size={14} /> Add Facility</button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {form.infrastructure.map((item, i) => (
                          <div key={item.id || i} className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2 relative">
                            <button type="button" onClick={() => delArr("infrastructure", i)} className="absolute top-2 right-2 w-6 h-6 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg flex items-center justify-center cursor-pointer"><X size={12} /></button>
                            <UploadBox field={`infra_${i}`} value={item.imageUrl} onPick={e => handleArrayImagePick(e, "infrastructure", i)} />
                            {ProgPill({field:`infrastructure_${i}`,uploadStatus,uploadProgress})}
                            <input type="text" value={item.title} onChange={e => setArr("infrastructure", i, "title", e.target.value)} placeholder="Facility name" className={inp_sm} />
                            <input type="text" value={item.description} onChange={e => setArr("infrastructure", i, "description", e.target.value)} placeholder="Short description" className={inp_sm} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ PRODUCTS TAB ══ */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <div><h3 className="text-sm font-black text-gray-900">Product Categories</h3><p className="text-[11px] text-gray-400 font-medium">Organize products by category</p></div>
                        </div>
                        <button type="button" onClick={() => addArr("productCategories", { id: uid(), name: "" })} className={addBtn}><Plus size={14} /> Add Category</button>
                      </div>
                      <div className="space-y-2">
                        {form.productCategories.map((cat, i) => (
                          <div key={cat.id || i} className="flex items-center gap-2">
                            <input type="text" value={cat.name} onChange={e => setArr("productCategories", i, "name", e.target.value)} placeholder="Category name" className={inp + " flex-1"} disabled={cat.id === "all"} />
                            {cat.id !== "all" && <button type="button" onClick={() => delArr("productCategories", i)} className={delBtn}><X size={14} /></button>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          <div><h3 className="text-sm font-black text-gray-900">Products</h3><p className="text-[11px] text-gray-400 font-medium">Your full product catalog</p></div>
                        </div>
                        <button type="button" onClick={() => addArr("products", { id: uid(), name: "", categoryId: "all", price: "", description: "", imageUrl: "", badge: "", emoji: "📦", showOnHome: false, tagline: "", keyHighlights: "", suitableFor: "", availableVariants: "", features: "", ingredientsList: "", isNatural: false, isOrganic: false, isPreservativeFree: false, productType: "", netWeight: "", shelfLife: "", storageInstructions: "", packagingType: "", countryOfOrigin: "", fssaiNumber: "", isVegetarian: false, skuCode: "", availablePackaging: "", benefits: "", usageInstructions: "", nutritionEnergy: "", nutritionProtein: "", nutritionCarbs: "", nutritionSugar: "", nutritionFat: "", nutritionSodium: "", isISOCertified: false, isFSSAIApproved: false, isGMPCertified: false, isLabTested: false, isQualityChecked: false, whyChoose: "", industriesApplications: "", specifications: "", ingredients: "", packaging: "" })} className={addBtn}><Plus size={14} /> Add Product</button>
                      </div>
                      <div className="space-y-4">
                        {form.products.map((prod, i) => (
                          <div key={prod.id || i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 space-y-1">
                                <UploadBox field={`prod_${i}`} value={prod.imageUrl} onPick={e => handleArrayImagePick(e, "products", i)} small />
                                {ProgPill({field:`products_${i}`,uploadStatus,uploadProgress})}
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <input type="text" value={prod.name} onChange={e => setArr("products", i, "name", e.target.value)} placeholder="Product name *" className={inp + " flex-1"} />
                                  <label className="flex items-center gap-1.5 flex-shrink-0 cursor-pointer bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 hover:bg-amber-100 transition">
                                    <input type="checkbox" checked={!!prod.showOnHome} onChange={e => setArr("products", i, "showOnHome", e.target.checked)} className="w-3.5 h-3.5 accent-amber-500" />
                                    <span className="text-[10px] font-black text-amber-700 whitespace-nowrap">🏠 Home</span>
                                  </label>
                                  <button type="button" onClick={() => delArr("products", i)} className={delBtn}><X size={14} /></button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  <div>
                                    <label className={fieldLabel}>Category</label>
                                    <select value={prod.categoryId} onChange={e => setArr("products", i, "categoryId", e.target.value)} className={inp_sm}>
                                      {form.productCategories.map((cat, idx) => <option key={cat.id || idx} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                  </div>
                                  <div>
                                    <label className={fieldLabel}>Price / MOQ</label>
                                    <input type="text" value={prod.price} onChange={e => setArr("products", i, "price", e.target.value)} placeholder="₹200/kg" className={inp_sm} />
                                  </div>
                                  <div>
                                    <label className={fieldLabel}>Badge</label>
                                    <input type="text" value={prod.badge} onChange={e => setArr("products", i, "badge", e.target.value)} placeholder="e.g. Bestseller" className={inp_sm} />
                                  </div>
                                </div>
                                <div>
                                  <label className={fieldLabel}>Short Description</label>
                                  <textarea rows={2} value={prod.description} onChange={e => setArr("products", i, "description", e.target.value)} placeholder="Product description..." className={ta + " text-xs"} />
                                </div>
                                <div>
                                  <label className={fieldLabel}>Tagline</label>
                                  <input type="text" value={prod.tagline || ""} onChange={e => setArr("products", i, "tagline", e.target.value)} placeholder="e.g. Pure. Authentic. Premium." className={inp_sm} />
                                </div>
                                <div>
                                  <label className={fieldLabel}>Key Highlights (one per line)</label>
                                  <textarea rows={3} value={prod.keyHighlights || ""} onChange={e => setArr("products", i, "keyHighlights", e.target.value)} placeholder="100% Natural\nNo Preservatives\nRich Aroma" className={ta + " text-xs"} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div><label className={fieldLabel}>Suitable For</label><input type="text" value={prod.suitableFor || ""} onChange={e => setArr("products", i, "suitableFor", e.target.value)} placeholder="e.g. All age groups" className={inp_sm} /></div>
                                  <div><label className={fieldLabel}>Available Variants (comma sep.)</label><input type="text" value={prod.availableVariants || ""} onChange={e => setArr("products", i, "availableVariants", e.target.value)} placeholder="e.g. 100g, 500g, 1kg" className={inp_sm} /></div>
                                </div>

                                {/* Features */}
                                <div className="pt-2 border-t border-gray-100">
                                  <label className={fieldLabel}>Product Features (one per line, up to 4)</label>
                                  <textarea rows={4} value={prod.features || ""} onChange={e => setArr("products", i, "features", e.target.value)} placeholder="Feature 1\nFeature 2\nFeature 3\nFeature 4" className={ta + " text-xs"} />
                                </div>

                                {/* Ingredients */}
                                <div className="pt-2 border-t border-gray-100">
                                  <label className={fieldLabel}>Ingredients / Composition</label>
                                  <textarea rows={2} value={prod.ingredientsList || prod.ingredients || ""} onChange={e => setArr("products", i, "ingredientsList", e.target.value)} placeholder="e.g. Red Chili, Salt, Turmeric" className={ta + " text-xs"} />
                                  <div className="flex gap-4 mt-2 flex-wrap">
                                    {[["isNatural", "🌱 Natural"], ["isOrganic", "🌾 Organic"], ["isPreservativeFree", "✅ Preservative-Free"]].map(([key, label]) => (
                                      <label key={key} className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-600">
                                        <input type="checkbox" checked={!!prod[key]} onChange={e => setArr("products", i, key, e.target.checked)} className="accent-indigo-600" />
                                        {label}
                                      </label>
                                    ))}
                                  </div>
                                </div>

                                {/* Specifications */}
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Specifications</p>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    <div><label className={fieldLabel}>Product Type</label><input type="text" value={prod.productType || ""} onChange={e => setArr("products", i, "productType", e.target.value)} placeholder="e.g. Spice" className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>Net Weight</label><input type="text" value={prod.netWeight || ""} onChange={e => setArr("products", i, "netWeight", e.target.value)} placeholder="e.g. 100g" className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>Shelf Life</label><input type="text" value={prod.shelfLife || ""} onChange={e => setArr("products", i, "shelfLife", e.target.value)} placeholder="e.g. 12 months" className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>Storage</label><input type="text" value={prod.storageInstructions || ""} onChange={e => setArr("products", i, "storageInstructions", e.target.value)} placeholder="e.g. Cool dry place" className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>Packaging Type</label><input type="text" value={prod.packagingType || prod.packaging || ""} onChange={e => setArr("products", i, "packagingType", e.target.value)} placeholder="e.g. Pouch" className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>Country of Origin</label><input type="text" value={prod.countryOfOrigin || ""} onChange={e => setArr("products", i, "countryOfOrigin", e.target.value)} placeholder="India" className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>FSSAI Number</label><input type="text" value={prod.fssaiNumber || ""} onChange={e => setArr("products", i, "fssaiNumber", e.target.value)} placeholder="e.g. 1072399..." className={inp_sm} /></div>
                                    <div><label className={fieldLabel}>SKU / Product Code</label><input type="text" value={prod.skuCode || ""} onChange={e => setArr("products", i, "skuCode", e.target.value)} placeholder="e.g. KI-MC-001" className={inp_sm} /></div>
                                  </div>
                                  <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs font-bold text-gray-600">
                                    <input type="checkbox" checked={!!prod.isVegetarian} onChange={e => setArr("products", i, "isVegetarian", e.target.checked)} className="accent-green-600" />
                                    🟢 Vegetarian Product
                                  </label>
                                </div>

                                {/* Available Packaging */}
                                <div>
                                  <label className={fieldLabel}>Available Packaging (comma sep.)</label>
                                  <input type="text" value={prod.availablePackaging || ""} onChange={e => setArr("products", i, "availablePackaging", e.target.value)} placeholder="50g, 100g, 200g, 500g, 1kg, Bulk" className={inp_sm} />
                                </div>

                                {/* Benefits */}
                                <div>
                                  <label className={fieldLabel}>Benefits (one per line)</label>
                                  <textarea rows={3} value={prod.benefits || ""} onChange={e => setArr("products", i, "benefits", e.target.value)} placeholder="Authentic Taste\nPremium Ingredients\nNo Artificial Colours" className={ta + " text-xs"} />
                                </div>

                                {/* Usage Instructions */}
                                <div>
                                  <label className={fieldLabel}>Usage Instructions</label>
                                  <textarea rows={3} value={prod.usageInstructions || ""} onChange={e => setArr("products", i, "usageInstructions", e.target.value)} placeholder="Add 1 tsp to your recipe..." className={ta + " text-xs"} />
                                </div>

                                {/* Nutrition */}
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Nutritional Info (per 100g)</p>
                                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {[["nutritionEnergy","Energy (kcal)"],["nutritionProtein","Protein (g)"],["nutritionCarbs","Carbs (g)"],["nutritionSugar","Sugar (g)"],["nutritionFat","Fat (g)"],["nutritionSodium","Sodium (mg)"]].map(([key, label]) => (
                                      <div key={key}><label className={fieldLabel}>{label}</label><input type="text" value={prod[key] || ""} onChange={e => setArr("products", i, key, e.target.value)} placeholder="0" className={inp_sm} /></div>
                                    ))}
                                  </div>
                                </div>

                                {/* Quality Assurance */}
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Quality Assurance</p>
                                  <div className="flex flex-wrap gap-4">
                                    {[["isISOCertified","ISO Certified"],["isFSSAIApproved","FSSAI Approved"],["isGMPCertified","GMP Certified"],["isLabTested","Lab Tested"],["isQualityChecked","Quality Checked"]].map(([key, label]) => (
                                      <label key={key} className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-600">
                                        <input type="checkbox" checked={!!prod[key]} onChange={e => setArr("products", i, key, e.target.checked)} className="accent-indigo-600" />
                                        ✅ {label}
                                      </label>
                                    ))}
                                  </div>
                                </div>

                                {/* Why Choose */}
                                <div>
                                  <label className={fieldLabel}>Why Choose (one point per line)</label>
                                  <textarea rows={3} value={prod.whyChoose || ""} onChange={e => setArr("products", i, "whyChoose", e.target.value)} placeholder="Premium Raw Materials\nTraditional Recipe\nExport Quality" className={ta + " text-xs"} />
                                </div>

                                {/* Industries */}
                                <div>
                                  <label className={fieldLabel}>Industries / Applications (comma sep.)</label>
                                  <input type="text" value={prod.industriesApplications || ""} onChange={e => setArr("products", i, "industriesApplications", e.target.value)} placeholder="Food Industry, Restaurants, Hotels" className={inp_sm} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ CONTACT TAB ══ */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div><h3 className="text-sm font-black text-gray-900">Contact Information</h3><p className="text-[11px] text-gray-400 font-medium">Phone, email & address</p></div>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={fieldLabel}>Contact Person Name</label>
                            <input type="text" value={form.contact} onChange={e => sf("contact", e.target.value)} placeholder="e.g. Rajesh Kumar" className={inp} />
                          </div>
                          <div>
                            <label className={fieldLabel}>Phone Number</label>
                            <input type="tel" value={form.phone} onChange={e => sf("phone", e.target.value)} placeholder="+91 98765 43210" className={inp} />
                          </div>
                        </div>
                        <label className="flex items-center gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={form.hidePhone} onChange={e => sf("hidePhone", e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">Hide Phone Number on Buyer Page</p>
                            <p className="text-xs text-gray-500 mt-0.5">Phone number will be completely hidden from visitors.</p>
                          </div>
                        </label>
                        <div>
                          <label className={fieldLabel}>Email Address</label>
                          <input type="email" value={form.email} onChange={e => sf("email", e.target.value)} placeholder="info@yourbuyer.com" className={inp} />
                        </div>
                      </div>
                    </div>

                    {/* Contact Page Optional Banner */}
                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div><h3 className="text-sm font-black text-gray-900">Contact Page Banner <span className="text-gray-400 font-medium">(Optional)</span></h3><p className="text-[11px] text-gray-400 font-medium">Wide banner image shown at the top of the Contact Us page</p></div>
                      </div>
                      <div className="space-y-2">
                        <UploadBox
                          field="contactBanner"
                          label=""
                          value={form.contactBannerUrl}
                          onPick={(e) => handleImagePick(e, "contactBanner")}
                        />
                        <ProgPill field="contactBanner" uploadStatus={uploadStatus} uploadProgress={uploadProgress} />
                        {form.contactBannerUrl && (
                          <button type="button" onClick={() => setForm(p => ({ ...p, contactBannerUrl: "" }))}
                            className="text-xs text-red-500 font-bold hover:underline cursor-pointer">
                            ✕ Remove Banner
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                        <div><h3 className="text-sm font-black text-gray-900">Social Media Links</h3><p className="text-[11px] text-gray-400 font-medium">Connect your social profiles</p></div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { key: "facebook", icon: "📘", label: "Facebook", ph: "https://facebook.com/yourbuyer" },
                          { key: "instagram", icon: "📸", label: "Instagram", ph: "https://instagram.com/yourbuyer" },
                          { key: "linkedin", icon: "💼", label: "LinkedIn", ph: "https://linkedin.com/company/yourbuyer" },
                          { key: "youtube", icon: "📺", label: "YouTube", ph: "https://youtube.com/@yourbuyer" },
                        ].map(({ key, icon, label, ph }) => (
                          <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-xl w-8 text-center">{icon}</span>
                            <div className="flex-1">
                              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">{label}</label>
                              <input type="url" value={form.social[key] || ""} onChange={e => sfSocial(key, e.target.value)} placeholder={ph} className={inp} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>{/* end max-w-3xl inner */}
            </div>{/* end flex-1 overflow-y-auto */}
          </div>{/* end flex layout */}

          {/* Mobile Action Bar */}
          <div className="lg:hidden px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition cursor-pointer">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              {step < 3 && (
                <button type="button" onClick={() => setStep(s => s + 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md cursor-pointer">
                  Next <ArrowRight size={14} />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleSave(true)} disabled={saving || isUploading || !form.name.trim()}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer">
                <Save size={13} /> {isUploading ? "Uploading..." : "Draft"}
              </button>
              <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.name.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md disabled:opacity-50 cursor-pointer">
                <Rocket size={13} /> {saving ? "Saving..." : isUploading ? "Uploading..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {delId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 className="text-red-500" size={24} /></div>
            <h3 className="font-black text-gray-900 text-lg mb-1">Delete Seller?</h3>
            <p className="text-gray-500 text-sm mb-5">This will permanently remove the listing and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      {menuId && <div className="fixed inset-0 z-20" onClick={() => setMenuId(null)} />}
    </div>
  );
}
