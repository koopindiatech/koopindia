"use client";
import { useState } from "react";
import { Settings, Globe, Bell, Lock, Palette, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    siteName: "Koop India",
    siteUrl: "https://www.koopindia.com",
    adminEmail: "admin@koopindia.com",
    whatsapp: "+91-9891233311",
    gscKey: "",
    emailNotifs: true,
    whatsappNotifs: true,
    newLeadAlert: true,
    buyerAlert: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 text-sm">Configure platform and notification preferences.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span className="text-emerald-600 text-sm font-semibold">Settings saved successfully!</span>
        </div>
      )}

      {/* General */}
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
          { label: "Google Site Kit / GA Key", key: "gscKey", placeholder: "G-XXXXXXXXXX" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-gray-500 text-xs font-semibold block mb-1.5">{f.label}</label>
            <input
              type="text"
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Bell size={16} className="text-orange-500" />
          <h2 className="text-gray-900 font-bold text-sm">Notification Preferences</h2>
        </div>
        {[
          { label: "Email Notifications", key: "emailNotifs", desc: "Receive lead alerts via email" },
          { label: "WhatsApp Notifications", key: "whatsappNotifs", desc: "Receive instant WhatsApp alerts" },
          { label: "New Lead Alert", key: "newLeadAlert", desc: "Alert on every new inquiry" },
          { label: "Buyer Listing Alert", key: "buyerAlert", desc: "Alert when a buyer is listed" },
        ].map((f) => (
          <div key={f.key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-gray-900 text-sm font-semibold">{f.label}</p>
              <p className="text-gray-400 text-xs">{f.desc}</p>
            </div>
            <button
              onClick={() => setForm({ ...form, [f.key]: !form[f.key] })}
              className={`w-11 h-6 rounded-full transition-all ${form[f.key] ? "bg-orange-500" : "bg-gray-200"} relative`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${form[f.key] ? "left-6" : "left-1"}`} />
            </button>
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
