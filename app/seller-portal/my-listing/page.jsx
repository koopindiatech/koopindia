"use client";
import { useState, useEffect, useRef } from "react";
import {
  Save, Upload, Loader2, CheckCircle2, AlertCircle,
  Globe, Phone, Mail, MapPin, Tag, FileText, Image as ImageIcon,
  Plus, Trash2, Edit3, Package,
} from "lucide-react";
import { getSellerUser } from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
      <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
        <Icon size={14} className="text-green-700" />
      </div>
      <h2 className="text-sm font-black text-gray-900">{title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, required, children }) => (
  <div>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 transition-colors";

export default function SellerMyListingPage() {
  const [user, setUser] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }
  const [newProduct, setNewProduct] = useState({ name: "", price: "", unit: "" });
  const logoInputRef = useRef();

  useEffect(() => {
    const u = getSellerUser();
    setUser(u);
    if (!u?.linkedSlug) { setLoading(false); return; }

    const load = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "sellers"), where("slug", "==", u.linkedSlug))
        );
        if (!snap.empty) {
          const d = snap.docs[0];
          setSellerId(d.id);
          const data = d.data();
          setForm({
            name: data.name || "",
            tagline: data.tagline || "",
            description: data.description || "",
            category: data.category || "",
            city: data.city || "",
            state: data.state || "",
            phone: data.phone || "",
            email: data.email || "",
            website: data.website || "",
            logoUrl: data.logoUrl || "",
            bannerUrl: data.bannerUrl || "",
            products: data.products || [],
            gstNo: data.gstNo || "",
            yearEstablished: data.yearEstablished || "",
          });
        }
      } catch (e) {
        console.error("Load listing error:", e);
        showToast("error", "Failed to load listing data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    if (!sellerId) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "sellers", sellerId), {
        ...form,
        updatedAt: new Date(),
        updatedByPortal: true,
      });
      showToast("success", "Listing updated successfully!");
    } catch (e) {
      console.error("Save error:", e);
      showToast("error", "Failed to save. Please try again.");
    }
    setSaving(false);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "Image must be under 2MB.");
      return;
    }
    setUploadingLogo(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `sellers/${user.linkedSlug}/logo_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setForm((f) => ({ ...f, logoUrl: url }));
      showToast("success", "Logo uploaded!");
    } catch (e) {
      console.error("Logo upload error:", e);
      showToast("error", "Upload failed. Check Firebase Storage rules.");
    }
    setUploadingLogo(false);
  };

  const addProduct = () => {
    if (!newProduct.name.trim()) return;
    setForm((f) => ({
      ...f,
      products: [...(f.products || []), { ...newProduct, id: Date.now().toString() }],
    }));
    setNewProduct({ name: "", price: "", unit: "" });
  };

  const removeProduct = (id) =>
    setForm((f) => ({ ...f, products: f.products.filter((p) => p.id !== id) }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3 text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Loader2 size={22} className="animate-spin text-green-600" />
        <span className="text-sm font-semibold">Loading your listing...</span>
      </div>
    );
  }

  if (!user?.linkedSlug || !form) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Edit3 size={28} className="text-gray-400" />
        </div>
        <div>
          <p className="font-bold text-gray-700">No listing linked</p>
          <p className="text-gray-400 text-sm mt-1">Your account is not linked to any listing. Contact admin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} className="text-green-600" />
          ) : (
            <AlertCircle size={16} className="text-red-500" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">My Listing</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Edit your public listing content — changes go live immediately after saving.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-60 shadow-lg"
          style={{
            background: saving ? "#4a7c3f" : "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)",
            boxShadow: "0 4px 14px rgba(45,90,39,0.3)",
          }}
        >
          {saving ? (
            <><Loader2 size={15} className="animate-spin" /> Saving...</>
          ) : (
            <><Save size={15} /> Save Changes</>
          )}
        </button>
      </div>

      {/* Logo */}
      <Section title="Logo & Branding" icon={ImageIcon}>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            {form.logoUrl ? (
              <img src={form.logoUrl} alt="logo" className="w-full h-full object-contain p-1" />
            ) : (
              <ImageIcon size={24} className="text-gray-300" />
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={logoInputRef}
              onChange={handleLogoUpload}
            />
            <button
              onClick={() => logoInputRef.current?.click()}
              disabled={uploadingLogo}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:border-green-400 hover:text-green-700 transition-all bg-white disabled:opacity-50"
            >
              {uploadingLogo ? (
                <><Loader2 size={14} className="animate-spin" /> Uploading...</>
              ) : (
                <><Upload size={14} /> Upload Logo</>
              )}
            </button>
            <p className="text-gray-400 text-xs mt-2">PNG, JPG up to 2MB. Recommended: 400×400px</p>
            {form.logoUrl && (
              <input
                type="text"
                value={form.logoUrl}
                onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
                placeholder="Or paste image URL"
                className={`${inputCls} mt-2 text-xs`}
              />
            )}
          </div>
        </div>
        {!form.logoUrl && (
          <div className="mt-3">
            <Field label="Or paste logo URL">
              <input
                type="url"
                value={form.logoUrl}
                onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
                placeholder="https://example.com/logo.png"
                className={inputCls}
              />
            </Field>
          </div>
        )}
      </Section>

      {/* Basic Info */}
      <Section title="Basic Information" icon={FileText}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Business / Listing Name" required>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. ABC Traders"
                className={inputCls}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Tagline">
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                placeholder="Short one-liner describing your business"
                className={inputCls}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe your business, products, and services in detail..."
                className={`${inputCls} resize-none`}
              />
            </Field>
          </div>
          <Field label="Category">
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="e.g. Manufacturing, IT Services"
              className={inputCls}
            />
          </Field>
          <Field label="Year Established">
            <input
              type="number"
              value={form.yearEstablished}
              onChange={(e) => setForm((f) => ({ ...f, yearEstablished: e.target.value }))}
              placeholder="e.g. 2010"
              className={inputCls}
            />
          </Field>
          <Field label="GST Number">
            <input
              type="text"
              value={form.gstNo}
              onChange={(e) => setForm((f) => ({ ...f, gstNo: e.target.value }))}
              placeholder="22AAAAA0000A1Z5"
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      {/* Location */}
      <Section title="Location" icon={MapPin}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City">
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              placeholder="Mumbai"
              className={inputCls}
            />
          </Field>
          <Field label="State">
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              placeholder="Maharashtra"
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact Information" icon={Phone}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Phone Number">
            <div className="relative">
              <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className={`${inputCls} pl-9`}
              />
            </div>
          </Field>
          <Field label="Email Address">
            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="contact@business.com"
                className={`${inputCls} pl-9`}
              />
            </div>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Website URL">
              <div className="relative">
                <Globe size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  placeholder="https://www.yourbusiness.com"
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
          </div>
        </div>
      </Section>

      {/* Products/Services */}
      <Section title="Products / Services" icon={Package}>
        <div className="space-y-3">
          {(form.products || []).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No products added yet. Add your first product below.</p>
          ) : (
            <div className="space-y-2">
              {form.products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Package size={12} className="text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-xs font-bold truncate">{p.name}</p>
                    {(p.price || p.unit) && (
                      <p className="text-gray-400 text-[10px]">
                        {p.price && `₹${p.price}`}{p.price && p.unit && " / "}{p.unit}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Product */}
          <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Add Product / Service</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                placeholder="Product / Service name"
                className={inputCls}
              />
              <input
                type="text"
                value={newProduct.price}
                onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
                placeholder="Price (optional)"
                className={inputCls}
              />
              <input
                type="text"
                value={newProduct.unit}
                onChange={(e) => setNewProduct((p) => ({ ...p, unit: e.target.value }))}
                placeholder="Unit (kg, piece, etc.)"
                className={inputCls}
              />
            </div>
            <button
              onClick={addProduct}
              disabled={!newProduct.name.trim()}
              className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-40 transition-all"
              style={{ background: "linear-gradient(135deg, #2d5a27, #4a7c3f)" }}
            >
              <Plus size={13} /> Add Product
            </button>
          </div>
        </div>
      </Section>

      {/* Save Bottom */}
      <div className="flex justify-end pb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all disabled:opacity-60 shadow-lg text-sm"
          style={{
            background: "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)",
            boxShadow: "0 4px 14px rgba(45,90,39,0.3)",
          }}
        >
          {saving ? (
            <><Loader2 size={15} className="animate-spin" /> Saving...</>
          ) : (
            <><Save size={15} /> Save All Changes</>
          )}
        </button>
      </div>
    </div>
  );
}
