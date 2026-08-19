"use client";
import { useState, useEffect } from "react";
import {
  Building2, Plus, Search, Globe, Edit2, Trash2, PauseCircle, PlayCircle, X,
  Phone, ExternalLink, MoreVertical, Check, Palette, FileText, Rocket,
  Image as ImageIcon, Loader2, MapPin, Shield, Camera, Save, ArrowLeft,
  Star, Users, TrendingUp, CheckCircle, AlertCircle, Mail,
} from "lucide-react";
import { db, storage } from "../../../lib/firebase";
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc,
  serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/* ─── helpers ─── */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ini = (n = "") => n.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
const getImg = (url) => (url && typeof url === "string" && url.startsWith("http") && url.includes("firebase") ? `/api/img?url=${encodeURIComponent(url)}` : url);

const BUYER_COLORS = [
  { name: "Forest Green", hex: "#16a34a" }, { name: "Koop Orange", hex: "#f97316" },
  { name: "Navy", hex: "#1e40af" }, { name: "Crimson", hex: "#dc2626" },
  { name: "Violet", hex: "#7c3aed" }, { name: "Teal", hex: "#0d9488" },
  { name: "Amber", hex: "#d97706" }, { name: "Slate", hex: "#475569" },
];

const PRODUCT_CATEGORY_ICONS = [
  { label: "Fruits & Vegetables", icon: "🥦" }, { label: "Dairy Products", icon: "🥛" },
  { label: "Packaged Foods", icon: "📦" }, { label: "Beverages", icon: "🥤" },
  { label: "Snacks & Namkeen", icon: "🍿" }, { label: "Bakery", icon: "🍞" },
  { label: "Household Essentials", icon: "🧹" }, { label: "Personal Care", icon: "🧴" },
  { label: "Health & Wellness", icon: "💊" }, { label: "Frozen Foods", icon: "❄️" },
  { label: "Pulses & Grains", icon: "🌾" }, { label: "Dry Fruits & Nuts", icon: "🥜" },
  { label: "Spices & Masalas", icon: "🌶️" }, { label: "Tea & Coffee", icon: "☕" },
  { label: "Organic Products", icon: "🌿" }, { label: "Edible Oils", icon: "🫙" },
];

const statusCfg = {
  live: { label: "Live", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  paused: { label: "Paused", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  draft: { label: "Draft", dot: "bg-gray-300", badge: "bg-gray-100 text-gray-500 border-gray-200" },
};

/* ─── DEFAULT DATA MODEL ─── */
const blank = () => ({
  buyerName: "", tagline: "", category: "", businessType: "Manufacturer",
  estYear: "", city: "", state: "", address: "",
  // Contact
  contactName: "", contactRole: "", contactPhone: "", contactEmail: "", contactPhotoUrl: "",
  phone: "", email: "", website: "", whatsapp: "",
  // Verification
  gstVerified: false, panVerified: false, companyVerified: false,
  gstNumber: "", panNumber: "",
  // Rating
  rating: "4.5", reviewCount: "0",
  // Visuals
  logoUrl: "", coverImageUrl: "",
  primaryColor: "#16a34a",
  // About
  about: "",
  // Product categories displayed on page
  productCategories: [],
  // Buyers they work with (logo list)
  buyersWeWorkWith: [{ id: uid(), name: "", logoUrl: "" }],
  // Why supply / requirements / preferred states
  whyUs: ["Pan India presence", "Timely payments", "Quality products"],
  requirements: ["Standard packaging", "Competitive pricing", "Timely delivery"],
  preferredStates: ["Delhi NCR", "Maharashtra", "Gujarat"],
  // Stats
  stats: [
    { id: uid(), icon: "", value: "", label: "Outlets" },
    { id: uid(), icon: "", value: "", label: "Cities" },
    { id: uid(), icon: "", value: "", label: "Products Listed" },
    { id: uid(), icon: "", value: "", label: "Happy Customers" },
    { id: uid(), icon: "", value: "", label: "Annual Turnover" },
    { id: uid(), icon: "", value: "", label: "Years in Business" },
  ],
  // Business details sidebar
  annualTurnover: "", numberOfOutlets: "", presence: "",
  buyingFrequency: "", paymentTerms: "", deliveryArea: "",
  // Map
  mapEmbedUrl: "",
  // Status
  status: "draft",
});

const inp = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-orange-400/25 focus:border-orange-400 placeholder:text-gray-400 transition-all duration-150 shadow-sm hover:border-gray-300";
const inp_sm = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 outline-none focus:ring-2 focus:ring-orange-400/25 focus:border-orange-400 placeholder:text-gray-400 transition-all duration-150 shadow-sm";
const ta = `${inp} resize-none`;
const addBtn = "inline-flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 hover:bg-orange-100 px-4 py-2 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md";
const delBtn = "w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all duration-150 cursor-pointer border border-red-100 hover:border-red-200";
const sectionCard = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 hover:shadow-md transition-shadow duration-200";
const fieldLabel = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2";

const UploadBox = ({ field, label, value, onPick, small = false }) => {
  const inputId = `buyer-upload-${field}`;
  return (
    <div className="relative">
      {label && <p className="block text-sm font-bold text-gray-700 mb-2">{label}</p>}
      <label htmlFor={inputId} className="cursor-pointer block">
        {value ? (
          <div className="relative group">
            <img src={getImg(value)} alt="" className={`rounded-2xl object-cover border border-gray-200 ${small ? "h-24 w-24" : "h-40 w-full"}`} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition">
              <Camera className="text-white" size={22} />
            </div>
          </div>
        ) : (
          <div className={`rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-orange-300 hover:text-orange-400 transition ${small ? "h-24 w-24" : "h-32 w-full"}`}>
            <Camera size={small ? 18 : 22} />
            <span className="text-[10px] font-semibold">Click to Upload</span>
          </div>
        )}
      </label>
      <input id={inputId} type="file" accept="image/*" className="sr-only" onChange={onPick} onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

const ProgPill = ({ field, uploadStatus, uploadProgress }) =>
  uploadStatus?.[field] === "uploading"
    ? <span className="text-[10px] text-orange-500 font-bold">{uploadProgress?.[field] || 0}% uploading...</span>
    : uploadStatus?.[field] === "done"
      ? <span className="text-[10px] text-emerald-500 font-bold">✓ Uploaded</span>
      : uploadStatus?.[field] === "error"
        ? <span className="text-[10px] text-red-500 font-bold">⚠️ Upload failed</span>
        : null;

/* ══════════════════════════════════════════════════════════ */
export default function BuyersAdminPage() {
  const [buyers, setBuyers] = useState([]);
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
  const isUploading = Object.values(uploadStatus).some((s) => s === "uploading");

  /* ── Load from Firestore ── */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, "buyers"), orderBy("createdAt", "desc")));
        setBuyers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setDbLoading(false); }
    };
    load();
  }, []);

  const uploadToStorage = (file, path, uiKey) => new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    task.on("state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setUploadProgress((p) => ({ ...p, [uiKey]: pct }));
      },
      (err) => reject(err),
      async () => { const url = await getDownloadURL(task.snapshot.ref); resolve(url); }
    );
  });

  const setUploading = (key) => setUploadStatus((s) => ({ ...s, [key]: "uploading" }));
  const setDone = (key) => setUploadStatus((s) => ({ ...s, [key]: "done" }));
  const setError = (key) => setUploadStatus((s) => ({ ...s, [key]: "error" }));

  const handleImagePick = async (e, field) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(field);
    const formKey = `${field}Url`;
    try {
      const folder = slugify(form.buyerName || "buyer");
      const ext = file.name.split(".").pop() || "jpg";
      const path = `buyers/${folder}/${field}_${Date.now()}.${ext}`;
      const url = await uploadToStorage(file, path, field);
      setForm((p) => ({ ...p, [formKey]: url }));
      setDone(field);
    } catch { setError(field); }
  };

  const handleArrayImagePick = async (e, arrayKey, index) => {
    const file = e.target.files?.[0]; if (!file) return;
    const uiKey = `${arrayKey}_${index}`;
    setUploading(uiKey);
    try {
      const folder = slugify(form.buyerName || "buyer");
      const ext = file.name.split(".").pop() || "jpg";
      const path = `buyers/${folder}/${arrayKey}_${index}_${Date.now()}.${ext}`;
      const url = await uploadToStorage(file, path, uiKey);
      setArr(arrayKey, index, "logoUrl", url);
      setDone(uiKey);
    } catch { setError(uiKey); }
  };

  const cleanPayload = (val) => {
    if (typeof val === "string") {
      const s = val.trim();
      if (s.startsWith("data:") || s.startsWith("blob:") || val.length > 50000) return "";
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

  const handleSave = async (asDraft = false) => {
    if (!form.buyerName.trim()) return;
    setSaving(true);
    try {
      const clean = cleanPayload({ ...form });
      const slug = slugify(clean.buyerName || "buyer");
      const payload = { ...clean, slug, status: asDraft ? "draft" : "live" };
      if (editing) {
        await updateDoc(doc(db, "buyers", editing.id), { ...payload, updatedAt: serverTimestamp() });
        setBuyers((p) => p.map((b) => b.id === editing.id ? { ...b, ...payload } : b));
      } else {
        const docRef = await addDoc(collection(db, "buyers"), { ...payload, views: 0, createdAt: serverTimestamp() });
        setBuyers((p) => [{ id: docRef.id, ...payload, views: 0 }, ...p]);
      }
      setFormOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("Save failed: " + (err?.message || "Unknown error"));
    } finally { setSaving(false); }
  };

  const toggleStatus = async (id, current) => {
    const next = current === "live" ? "paused" : "live";
    await updateDoc(doc(db, "buyers", id), { status: next });
    setBuyers((p) => p.map((b) => b.id === id ? { ...b, status: next } : b));
    setMenuId(null);
  };

  const handleDelete = async () => {
    if (!delId) return;
    await deleteDoc(doc(db, "buyers", delId));
    setBuyers((p) => p.filter((b) => b.id !== delId));
    setDelId(null);
  };

  const setArr = (key, i, k, v) => setForm((p) => { const a = [...(p[key] || [])]; a[i] = { ...a[i], [k]: v }; return { ...p, [key]: a }; });
  const addArr = (key, def) => setForm((p) => ({ ...p, [key]: [...(p[key] || []), def] }));
  const delArr = (key, i) => setForm((p) => ({ ...p, [key]: (p[key] || []).filter((_, j) => j !== i) }));
  const sf = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const setListItem = (key, i, v) => setForm((p) => { const a = [...(p[key] || [])]; a[i] = v; return { ...p, [key]: a }; });
  const addListItem = (key, def = "") => setForm((p) => ({ ...p, [key]: [...(p[key] || []), def] }));
  const delListItem = (key, i) => setForm((p) => ({ ...p, [key]: (p[key] || []).filter((_, j) => j !== i) }));

  const filtered = buyers.filter((b) => {
    const q = search.toLowerCase();
    return !q || b.buyerName?.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q) || b.slug?.includes(q);
  });

  const openForm = (b = null) => {
    setEditing(b);
    setForm(b ? { ...blank(), ...b } : blank());
    setStep(0);
    setFormOpen(true);
    setUploadProgress({});
    setUploadStatus({});
  };

  const pc = form.primaryColor || "#16a34a";
  const STEPS = [
    { id: 0, icon: "🏢", label: "Buyer Identity", desc: "Name, type, location" },
    { id: 1, icon: "🎨", label: "Visuals & Colors", desc: "Logo, cover, palette" },
    { id: 2, icon: "📝", label: "About & Details", desc: "Description, business info" },
    { id: 3, icon: "📦", label: "Categories & Partners", desc: "Products, buyers" },
    { id: 4, icon: "📊", label: "Why Us & Stats", desc: "Highlights, metrics" },
    { id: 5, icon: "👤", label: "Contact & Docs", desc: "Person, address, map" },
  ];

  /* ══════════════════════════════════════════════════ RENDER */
  return (
    <div className="min-h-screen bg-[#f4f6fb]" style={{ fontFamily: "'Inter',sans-serif" }}>
      {!formOpen && (
        <>
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
                <Building2 className="text-white" size={18} />
              </div>
              <div>
                <h1 className="font-black text-gray-900 text-base leading-none">Buyer Listings</h1>
                <p className="text-gray-400 text-[11px] mt-0.5 font-medium">{buyers.length} buyers listed</p>
              </div>
            </div>
            <button onClick={() => openForm()}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-orange-200 transition-all hover:scale-105">
              <Plus size={16} /> Add Buyer
            </button>
          </div>

          {/* Filter bar */}
          <div className="px-6 pt-5 pb-4 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search buyers..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition" />
            </div>
          </div>

          {/* Loading / Empty */}
          {dbLoading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 size={32} className="animate-spin text-orange-400" />
              <p className="text-sm font-semibold">Loading buyers...</p>
            </div>
          )}
          {!dbLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
              <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center"><Building2 size={28} /></div>
              <p className="font-bold text-base text-gray-500">{search ? "No buyers match your search" : "No buyers yet"}</p>
              {!search && <button onClick={() => openForm()} className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm">Add First Buyer</button>}
            </div>
          )}

          {/* Buyer Cards */}
          <div className="px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((b) => {
              const cfg = statusCfg[b.status] || statusCfg.draft;
              const color = b.primaryColor || "#f97316";
              return (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                  <div className="p-5 flex-1 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      {b.logoUrl
                        ? <img src={getImg(b.logoUrl)} alt="" className="w-12 h-12 rounded-xl object-contain border border-gray-100 flex-shrink-0" />
                        : <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0" style={{ backgroundColor: color }}>{ini(b.buyerName)}</div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-gray-900 text-sm truncate">{b.buyerName}</p>
                        <p className="text-gray-400 text-[11px] font-medium truncate">{b.category || "—"}</p>
                      </div>
                      <div className="relative flex-shrink-0">
                        <button onClick={() => setMenuId(menuId === b.id ? null : b.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition"><MoreVertical size={14} /></button>
                        {menuId === b.id && (
                          <div className="absolute right-0 top-8 z-30 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 overflow-hidden">
                            <button onClick={() => { openForm(b); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left"><Edit2 size={13} /> Edit</button>
                            <button onClick={() => toggleStatus(b.id, b.status)} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left">
                              {b.status === "live" ? <><PauseCircle size={13} /> Pause</> : <><PlayCircle size={13} /> Activate</>}
                            </button>
                            <button onClick={() => { window.open(`/buyers/${b.slug}`, "_blank"); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left"><ExternalLink size={13} /> View Page</button>
                            <div className="border-t border-gray-100 my-1" />
                            <button onClick={() => { setDelId(b.id); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 text-left"><Trash2 size={13} /> Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
                      </span>
                      <span className="text-gray-300 text-[10px]">·</span>
                      <span className="text-gray-400 text-[10px] font-semibold">{b.businessType || "Buyer"}</span>
                    </div>

                    <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-2">
                      <Globe size={11} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] text-orange-600 font-semibold truncate">/buyers/{b.slug}</span>
                    </div>

                    <div className="flex gap-2 pt-1 mt-auto">
                      <button onClick={() => openForm(b)} className="flex-1 text-xs font-bold py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition flex items-center justify-center gap-1.5"><Edit2 size={11} /> Edit</button>
                      <a href={`/buyers/${b.slug}`} target="_blank" rel="noreferrer" className="flex-1 text-xs font-bold py-2 rounded-xl text-white flex items-center justify-center gap-1.5 transition" style={{ backgroundColor: color }}>
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
        <div className="w-full flex flex-col" style={{ minHeight: "100vh", background: "#f1f5f9" }}>
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
                    : <span className="text-white font-black text-sm">{ini(form.buyerName || "BR")}</span>}
                </div>
                <div>
                  <h1 className="font-black text-gray-900 text-base leading-tight">{editing ? (form.buyerName || "Edit Buyer") : "New Buyer Studio"}</h1>
                  {form.buyerName && <p className="text-orange-600 text-[11px] font-bold mt-0.5">/buyers/{slugify(form.buyerName)}</p>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => handleSave(true)} disabled={saving || isUploading || !form.buyerName.trim()}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all disabled:opacity-40 cursor-pointer">
                <Save size={14} /> Save Draft
              </button>
              <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.buyerName.trim()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-lg shadow-orange-200 disabled:opacity-40 cursor-pointer">
                <Rocket size={14} /> {saving ? "Publishing..." : isUploading ? "Uploading..." : "Publish Live"}
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-white border-r border-gray-100 pt-6 pb-10 px-4 gap-1 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3">Sections</p>
              {STEPS.map((t) => (
                <button key={t.id} type="button" onClick={() => setStep(t.id)}
                  className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-150 group ${step === t.id ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "hover:bg-gray-50 text-gray-700"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-base">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${step === t.id ? "text-white" : "text-gray-800"}`}>{t.label}</p>
                      <p className={`text-[10px] truncate mt-0.5 ${step === t.id ? "text-orange-200" : "text-gray-400"}`}>{t.desc}</p>
                    </div>
                    {step === t.id && <Check size={14} className="text-orange-200 flex-shrink-0" />}
                  </div>
                </button>
              ))}
              <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
                <button type="button" onClick={() => handleSave(true)} disabled={saving || isUploading || !form.buyerName.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all disabled:opacity-40 cursor-pointer">
                  <Save size={13} /> {isUploading ? "Wait for upload..." : "Save as Draft"}
                </button>
                <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.buyerName.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md disabled:opacity-40 cursor-pointer">
                  <Rocket size={13} /> {saving ? "Publishing..." : isUploading ? "Uploading..." : "Publish Live"}
                </button>
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="flex lg:hidden border-b border-gray-100 bg-white overflow-x-auto sticky top-[57px] z-20 w-full flex-shrink-0">
              {STEPS.map((t) => (
                <button key={t.id} type="button" onClick={() => setStep(t.id)}
                  className={`flex-shrink-0 px-4 py-3.5 text-left border-b-2 transition-all ${step === t.id ? "border-orange-500 bg-white" : "border-transparent hover:bg-gray-50"}`}>
                  <p className={`text-xs font-black ${step === t.id ? "text-orange-600" : "text-gray-500"}`}>{t.icon} {t.label}</p>
                </button>
              ))}
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto p-5 sm:p-8 space-y-6">

                {/* ══ STEP 0: BUYER IDENTITY ══ */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Buyer Identity</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={fieldLabel}>Buyer Name *</label>
                            <input type="text" value={form.buyerName} onChange={(e) => sf("buyerName", e.target.value)} placeholder="e.g. FreshMart Supermarket" className={inp} />
                          </div>
                          <div>
                            <label className={fieldLabel}>Category / Industry</label>
                            <input type="text" value={form.category} onChange={(e) => sf("category", e.target.value)} placeholder="e.g. Supermarket Chain" className={inp} />
                          </div>
                        </div>
                        <div>
                          <label className={fieldLabel}>Tagline</label>
                          <input type="text" value={form.tagline} onChange={(e) => sf("tagline", e.target.value)} placeholder="e.g. Fresh Choices. Better Living." className={inp} />
                        </div>
                        <div>
                          <label className={fieldLabel}>Business Type</label>
                          <div className="flex flex-wrap gap-2">
                            {["Manufacturer", "Distributor", "Retailer", "Wholesaler", "Supermarket Chain", "Buyer", "Importer / Exporter"].map((t) => (
                              <button key={t} type="button" onClick={() => sf("businessType", t)}
                                className={`px-4 py-2 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer ${form.businessType === t ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Location & Basic Info</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className={fieldLabel}>City</label><input value={form.city} onChange={(e) => sf("city", e.target.value)} placeholder="e.g. Bangalore" className={inp} /></div>
                        <div><label className={fieldLabel}>State</label><input value={form.state} onChange={(e) => sf("state", e.target.value)} placeholder="e.g. Karnataka" className={inp} /></div>
                        <div><label className={fieldLabel}>Establishment Year</label><input value={form.estYear} onChange={(e) => sf("estYear", e.target.value)} placeholder="e.g. 2014" className={inp} /></div>
                        <div><label className={fieldLabel}>Delivery / Presence Area</label><input value={form.deliveryArea} onChange={(e) => sf("deliveryArea", e.target.value)} placeholder="e.g. All Over India" className={inp} /></div>
                      </div>
                      <div><label className={fieldLabel}>Full Address</label><textarea value={form.address} onChange={(e) => sf("address", e.target.value)} placeholder="Full company address..." className={ta} rows={2} /></div>
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Verification Status</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { key: "gstVerified", label: "GST Verified", icon: "✅" },
                          { key: "panVerified", label: "PAN Verified", icon: "✅" },
                          { key: "companyVerified", label: "Company Verified", icon: "✅" },
                        ].map((v) => (
                          <button key={v.key} type="button" onClick={() => sf(v.key, !form[v.key])}
                            className={`flex items-center gap-2 p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${form[v.key] ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-400 hover:border-gray-300"}`}>
                            <span>{form[v.key] ? "✅" : "⬜"}</span> {v.label}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div><label className={fieldLabel}>GST Number</label><input value={form.gstNumber} onChange={(e) => sf("gstNumber", e.target.value)} placeholder="29ABCDE1234F1Z5" className={inp} /></div>
                        <div><label className={fieldLabel}>PAN Number</label><input value={form.panNumber} onChange={(e) => sf("panNumber", e.target.value)} placeholder="ABCDE1234F" className={inp} /></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ STEP 1: VISUALS ══ */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Logo & Cover Image</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className={fieldLabel}>Buyer Logo</label>
                          <UploadBox field="logo" value={form.logoUrl} onPick={(e) => handleImagePick(e, "logo")} small />
                          {ProgPill({ field: "logo", uploadStatus, uploadProgress })}
                        </div>
                        <div>
                          <label className={fieldLabel}>Cover / Banner Image</label>
                          <UploadBox field="coverImage" value={form.coverImageUrl} onPick={(e) => handleImagePick(e, "coverImage")} />
                          {ProgPill({ field: "coverImage", uploadStatus, uploadProgress })}
                        </div>
                      </div>
                    </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Buyer Color</h3>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 rounded-xl shadow-md flex-shrink-0 border-2 border-white" style={{ backgroundColor: form.primaryColor }} />
                        <div className="flex gap-1.5 flex-wrap">
                          {BUYER_COLORS.map((c) => (
                            <button key={c.hex} type="button" onClick={() => sf("primaryColor", c.hex)}
                              className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer ${form.primaryColor === c.hex ? "border-gray-700 scale-110 shadow-sm" : "border-transparent"}`}
                              style={{ backgroundColor: c.hex }} title={c.name} />
                          ))}
                          <input type="color" value={form.primaryColor} onChange={(e) => sf("primaryColor", e.target.value)} className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200" />
                        </div>
                      </div>
                    </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Rating</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className={fieldLabel}>Rating (out of 5)</label><input value={form.rating} onChange={(e) => sf("rating", e.target.value)} placeholder="4.8" className={inp} /></div>
                        <div><label className={fieldLabel}>Review Count</label><input value={form.reviewCount} onChange={(e) => sf("reviewCount", e.target.value)} placeholder="45" className={inp} /></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ STEP 2: ABOUT & DETAILS ══ */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">About Company</h3>
                      <textarea value={form.about} onChange={(e) => sf("about", e.target.value)} placeholder="Describe the company, its history, what it does..." className={ta} rows={5} />
                    </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Business Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className={fieldLabel}>Annual Turnover</label><input value={form.annualTurnover} onChange={(e) => sf("annualTurnover", e.target.value)} placeholder="e.g. ₹ 250 Cr+" className={inp} /></div>
                        <div><label className={fieldLabel}>Number of Outlets</label><input value={form.numberOfOutlets} onChange={(e) => sf("numberOfOutlets", e.target.value)} placeholder="e.g. 28+" className={inp} /></div>
                        <div><label className={fieldLabel}>State / City Presence</label><input value={form.presence} onChange={(e) => sf("presence", e.target.value)} placeholder="e.g. 4 States | 18 Cities" className={inp} /></div>
                        <div><label className={fieldLabel}>Buying Frequency</label><input value={form.buyingFrequency} onChange={(e) => sf("buyingFrequency", e.target.value)} placeholder="e.g. Weekly / Monthly" className={inp} /></div>
                        <div><label className={fieldLabel}>Payment Terms</label><input value={form.paymentTerms} onChange={(e) => sf("paymentTerms", e.target.value)} placeholder="e.g. 30 – 45 Days" className={inp} /></div>
                        <div><label className={fieldLabel}>Phone</label><input value={form.phone} onChange={(e) => sf("phone", e.target.value)} placeholder="+91 98765 43210" className={inp} /></div>
                        <div><label className={fieldLabel}>Email</label><input value={form.email} onChange={(e) => sf("email", e.target.value)} placeholder="info@buyer.com" className={inp} /></div>
                        <div><label className={fieldLabel}>WhatsApp</label><input value={form.whatsapp} onChange={(e) => sf("whatsapp", e.target.value)} placeholder="+91 98765 43210" className={inp} /></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ STEP 3: CATEGORIES & PARTNERS ══ */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Product Categories We Purchase / Deal In</h3>
                      <p className="text-xs text-gray-400 -mt-2">Click to toggle categories shown on the profile page</p>
                      <div className="flex flex-wrap gap-2">
                        {PRODUCT_CATEGORY_ICONS.map((cat) => {
                          const selected = (form.productCategories || []).includes(cat.label);
                          return (
                            <button key={cat.label} type="button"
                              onClick={() => {
                                const curr = form.productCategories || [];
                                sf("productCategories", selected ? curr.filter((c) => c !== cat.label) : [...curr, cat.label]);
                              }}
                              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${selected ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                              {cat.icon} {cat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <h3 className="text-sm font-black text-gray-900">Buyers We Work With</h3>
                        <button type="button" onClick={() => addArr("buyersWeWorkWith", { id: uid(), name: "", logoUrl: "" })} className={addBtn}><Plus size={12} /> Add Buyer</button>
                      </div>
                      <div className="space-y-3">
                        {(form.buyersWeWorkWith || []).map((bw, i) => (
                          <div key={bw.id || i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex-shrink-0">
                              <label htmlFor={`bw-logo-${i}`} className="cursor-pointer">
                                {bw.logoUrl
                                  ? <img src={getImg(bw.logoUrl)} alt="" className="w-12 h-12 rounded-lg object-contain border border-gray-200" />
                                  : <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-300 transition"><Camera size={16} /></div>
                                }
                              </label>
                              <input id={`bw-logo-${i}`} type="file" accept="image/*" className="sr-only" onChange={(e) => handleArrayImagePick(e, "buyersWeWorkWith", i)} />
                              {ProgPill({ field: `buyersWeWorkWith_${i}`, uploadStatus, uploadProgress })}
                            </div>
                            <input value={bw.name} onChange={(e) => setArr("buyersWeWorkWith", i, "name", e.target.value)} placeholder="Buyer name (e.g. Amul)" className={`flex-1 ${inp_sm}`} />
                            <button type="button" onClick={() => delArr("buyersWeWorkWith", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Preferred Business States</h3>
                      <div className="space-y-2">
                        {(form.preferredStates || []).map((s, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input value={s} onChange={(e) => setListItem("preferredStates", i, e.target.value)} placeholder="e.g. Maharashtra" className={`flex-1 ${inp_sm}`} />
                            <button type="button" onClick={() => delListItem("preferredStates", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addListItem("preferredStates", "")} className={addBtn}><Plus size={12} /> Add State</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ STEP 4: WHY US & STATS ══ */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <h3 className="text-sm font-black text-gray-900">Why Supply to Us</h3>
                        <button type="button" onClick={() => addListItem("whyUs", "")} className={addBtn}><Plus size={12} /> Add Point</button>
                      </div>
                      <div className="space-y-2">
                        {(form.whyUs || []).map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-emerald-500 text-sm">✓</span>
                            <input value={item} onChange={(e) => setListItem("whyUs", i, e.target.value)} placeholder="e.g. Pan India retail presence" className={`flex-1 ${inp_sm}`} />
                            <button type="button" onClick={() => delListItem("whyUs", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <h3 className="text-sm font-black text-gray-900">Our Requirements</h3>
                        <button type="button" onClick={() => addListItem("requirements", "")} className={addBtn}><Plus size={12} /> Add Requirement</button>
                      </div>
                      <div className="space-y-2">
                        {(form.requirements || []).map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-orange-500 text-sm">→</span>
                            <input value={item} onChange={(e) => setListItem("requirements", i, e.target.value)} placeholder="e.g. Quality products with standard packaging" className={`flex-1 ${inp_sm}`} />
                            <button type="button" onClick={() => delListItem("requirements", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Key Stats (Bottom Strip)</h3>
                      <div className="space-y-3">
                        {(form.stats || []).map((stat, i) => (
                          <div key={stat.id || i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <input value={stat.icon} onChange={(e) => setArr("stats", i, "icon", e.target.value)} placeholder="🏪" className="w-12 text-center text-lg border border-gray-200 rounded-lg px-2 py-1.5 outline-none" />
                            <input value={stat.value} onChange={(e) => setArr("stats", i, "value", e.target.value)} placeholder="28+" className={`w-24 ${inp_sm}`} />
                            <input value={stat.label} onChange={(e) => setArr("stats", i, "label", e.target.value)} placeholder="Outlets" className={`flex-1 ${inp_sm}`} />
                            <button type="button" onClick={() => delArr("stats", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addArr("stats", { id: uid(), icon: "⭐", value: "", label: "" })} className={addBtn}><Plus size={12} /> Add Stat</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ══ STEP 5: CONTACT & DOCS ══ */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Key Contact Person</h3>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <UploadBox field="contactPhoto" value={form.contactPhotoUrl} onPick={(e) => handleImagePick(e, "contactPhoto")} small />
                          {ProgPill({ field: "contactPhoto", uploadStatus, uploadProgress })}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div><label className={fieldLabel}>Name</label><input value={form.contactName} onChange={(e) => sf("contactName", e.target.value)} placeholder="e.g. Mr. Arvind Sharma" className={inp} /></div>
                          <div><label className={fieldLabel}>Role / Designation</label><input value={form.contactRole} onChange={(e) => sf("contactRole", e.target.value)} placeholder="e.g. Head - Procurement" className={inp} /></div>
                          <div><label className={fieldLabel}>Phone</label><input value={form.contactPhone} onChange={(e) => sf("contactPhone", e.target.value)} placeholder="+91 98765 43210" className={inp} /></div>
                          <div><label className={fieldLabel}>Email</label><input value={form.contactEmail} onChange={(e) => sf("contactEmail", e.target.value)} placeholder="person@company.com" className={inp} /></div>
                        </div>
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Google Map Embed URL</h3>
                      <textarea value={form.mapEmbedUrl} onChange={(e) => sf("mapEmbedUrl", e.target.value)} placeholder="Paste Google Maps embed URL (from Share > Embed a map)..." className={ta} rows={3} />
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Publish Settings</h3>
                      <div className="flex gap-3">
                        {["draft", "live", "paused"].map((s) => (
                          <button key={s} type="button" onClick={() => sf("status", s)}
                            className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-sm capitalize transition-all cursor-pointer ${form.status === s ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {delId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 className="text-red-500" size={24} /></div>
            <h3 className="font-black text-gray-900 text-lg mb-1">Delete Buyer?</h3>
            <p className="text-gray-500 text-sm mb-5">This will permanently remove this buyer listing.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
