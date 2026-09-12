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
  );
}
