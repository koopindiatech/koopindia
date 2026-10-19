"use client";
import { useState, useEffect, useRef } from "react";
import {
  Building2, Plus, Search, Globe, Edit2, Trash2, PauseCircle, PlayCircle, X,
  Phone, ExternalLink, MoreVertical, Check, Palette, FileText, Rocket,
  Image as ImageIcon, Loader2, MapPin, Shield, Camera, Save, ArrowLeft,
  Star, Users, TrendingUp, CheckCircle, AlertCircle, Mail, ArrowRightLeft,
  Upload, Download, TableProperties, ChevronRight, RefreshCw,
} from "lucide-react";
import { db, storage } from "../../../lib/firebase";
import {
  collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc,
  serverTimestamp, query, orderBy, where, getCountFromServer
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getCurrentUser } from "../lib/auth";
import imageCompression from 'browser-image-compression';
import dynamic from 'next/dynamic';
import * as XLSX from 'xlsx';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
// Helper utilities
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
  { label: "Food & Beverage", icon: "🍱" },
  { label: "Health & Beauty", icon: "💄" },
  { label: "Pharmaceuticals", icon: "💊" },
  { label: "Apparel & Fashion", icon: "👗" },
  { label: "Chemicals", icon: "🧪" },
  { label: "Home Supplies", icon: "🧹" },
  { label: "Construction & Real Estate", icon: "🏗️" },
  { label: "Electronics & Electrical Supplies", icon: "⚡" },
  { label: "Agriculture", icon: "🌾" },
  { label: "Automobile", icon: "🚗" },
  { label: "Packaging & Paper", icon: "📦" },
  { label: "Hospital & Medical Supplies", icon: "🏥" },
  { label: "Gifts & Crafts", icon: "🎁" },
  { label: "Consumer Electronics", icon: "📱" },
  { label: "Pipes, Tubes & Fittings", icon: "🔧" },
  { label: "Industrial Supplies", icon: "🏭" },
  { label: "Computer Hardware & Software", icon: "💻" },
  { label: "Energy & Power", icon: "🔋" },
  { label: "Furniture", icon: "🪑" },
  { label: "Home Textiles & Furnishings", icon: "🛋️" },
  { label: "Hotel Supplies & Equipment", icon: "🏨" },
  { label: "Jewelry & Gemstones", icon: "💎" },
  { label: "Leather & Leather Products", icon: "👞" },
  { label: "Machinery", icon: "⚙️" },
  { label: "Mineral & Metals", icon: "⛏️" },
  { label: "Plastics & Products", icon: "🛞" },
  { label: "Printing & Publishing", icon: "🖨️" },
  { label: "Security & Protection", icon: "🛡️" },
  { label: "Sports & Entertainment", icon: "⚽" },
  { label: "Telecommunications", icon: "📡" },
  { label: "Textiles & Fabrics", icon: "🧵" },
  { label: "Toys", icon: "🧸" },
  { label: "Transportation", icon: "🚚" },
  { label: "Brass Hardware & Components", icon: "🔩" },
  { label: "Environment & Pollution", icon: "🌱" },
  { label: "Office & School Supplies", icon: "✏️" },
  { label: "Scientific & Laboratory Instruments", icon: "🔬" },
  { label: "Business Services", icon: "💼" },
];

const statusCfg = {
  live: { label: "Live", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  paused: { label: "Paused", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  draft: { label: "Draft", dot: "bg-gray-300", badge: "bg-gray-100 text-gray-500 border-gray-200" },
};

// Default buyer data model
const blank = () => ({
  buyerName: "", tagline: "", category: "", businessType: "Manufacturer",
  estYear: "", city: "", state: "", address: "",
  contactName: "", contactRole: "", contactPhone: "", contactEmail: "", contactPhotoUrl: "",
  phone: "", email: "", password: "", website: "", whatsapp: "",
  hideContact: false, hidePhone: false,
  gstNumber: "", panNumber: "",
  rating: "4.5", reviewCount: "0",
  logoUrl: "", coverImageUrl: "",
  primaryColor: "#16a34a",
  about: "",
  productCategories: [],
  // Buyers they work with (logo list)
  buyersWeWorkWith: [{ id: uid(), name: "", logoUrl: "" }],
  // Why supply / requirements / preferred states
  whyUs: ["Pan India presence", "Timely payments", "Quality products"],
  requirements: ["Standard packaging", "Competitive pricing", "Timely delivery"],
  preferredStates: [],
  stats: [
    { id: uid(), icon: "", value: "", label: "Outlets" },
    { id: uid(), icon: "", value: "", label: "Cities" },
    { id: uid(), icon: "", value: "", label: "Products Listed" },
    { id: uid(), icon: "", value: "", label: "Happy Customers" },
    { id: uid(), icon: "", value: "", label: "Annual Turnover" },
    { id: uid(), icon: "", value: "", label: "Years in Business" },
  ],
  annualTurnover: "", numberOfOutlets: "", presence: "",
  buyingFrequency: "", paymentTerms: "", deliveryArea: "",
  mapEmbedUrl: "",
  status: "draft",
});

const inp = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-orange-400/25 focus:border-orange-400 placeholder:text-gray-400 transition-all duration-150 shadow-sm hover:border-gray-300";
const inp_sm = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-800 outline-none focus:ring-2 focus:ring-orange-400/25 focus:border-orange-400 placeholder:text-gray-400 transition-all duration-150 shadow-sm";
const ta = `${inp} resize-none`;
const addBtn = "inline-flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 hover:bg-orange-100 px-4 py-2 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md";
const delBtn = "w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all duration-150 cursor-pointer border border-red-100 hover:border-red-200";
const sectionCard = "bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 space-y-5 hover:shadow-md transition-shadow duration-200";
const fieldLabel = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2";

const INDIA_ZONES = [
  {
    zone: "North Zone", color: "blue",
    states: ["Delhi NCR", "Jammu & Kashmir", "Himachal Pradesh", "Punjab", "Chandigarh", "Uttarakhand", "Haryana", "Delhi", "Uttar Pradesh"],
  },
  {
    zone: "West Zone", color: "orange",
    states: ["Rajasthan", "Madhya Pradesh", "Gujarat", "Daman & Diu", "Dadra & Nagar Haveli", "Maharashtra", "Goa"],
  },
  {
    zone: "South Zone", color: "emerald",
    states: ["Andhra Pradesh", "Karnataka", "Lakshadweep", "Kerala", "Tamil Nadu", "Telangana", "Puducherry", "Andaman & Nicobar"],
  },
  {
    zone: "East Zone", color: "violet",
    states: ["Bihar", "Sikkim", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura", "Meghalaya", "Assam", "West Bengal", "Jharkhand", "Odisha", "Chhattisgarh"],
  },
];

const ZONE_COLORS = {
  blue: { badge: "bg-blue-50 text-blue-700 border-blue-200", check: "accent-blue-600", toggle: "text-blue-700 hover:bg-blue-50 border-blue-100" },
  orange: { badge: "bg-orange-50 text-orange-700 border-orange-200", check: "accent-orange-500", toggle: "text-orange-700 hover:bg-orange-50 border-orange-100" },
  emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", check: "accent-emerald-600", toggle: "text-emerald-700 hover:bg-emerald-50 border-emerald-100" },
  violet: { badge: "bg-violet-50 text-violet-700 border-violet-200", check: "accent-violet-600", toggle: "text-violet-700 hover:bg-violet-50 border-violet-100" },
};

const ZoneStateSelector = ({ selected = [], onChange }) => {
  const toggle = (state) => {
    onChange(selected.includes(state) ? selected.filter(s => s !== state) : [...selected, state]);
  };
  const toggleAll = (states) => {
    const allSelected = states.every(s => selected.includes(s));
    if (allSelected) onChange(selected.filter(s => !states.includes(s)));
    else onChange([...new Set([...selected, ...states])]);
  };
  return (
    <div className="space-y-4">
      {INDIA_ZONES.map(({ zone, color, states }) => {
        const c = ZONE_COLORS[color];
        const allSel = states.every(s => selected.includes(s));
        const someSel = states.some(s => selected.includes(s));
        return (
          <div key={zone} className={`rounded-xl border p-4 ${c.badge} border-opacity-60`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${c.badge}`}>{zone}</span>
              <button
                type="button"
                onClick={() => toggleAll(states)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${c.toggle}`}
              >
                {allSel ? "Deselect All" : someSel ? "Select All" : "Toggle All"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {states.map(state => (
                <label key={state} className="flex items-center gap-1.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selected.includes(state)}
                    onChange={() => toggle(state)}
                    className={`${c.check} w-3.5 h-3.5 rounded cursor-pointer`}
                  />
                  <span className={`text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors`}>{state}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider self-center">Selected:</span>
          {selected.map(s => (
            <span key={s} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{s}</span>
          ))}
        </div>
      )}
    </div>
  );
};

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
        ? <span className="inline-flex items-center gap-1 text-[10px] text-red-600 font-semibold"><AlertCircle size={11} /> Upload failed — verify storage permissions</span>
        : null;

// ─── Excel Import Column Map ────────────────────────────────────────────────
// Maps Excel column headers → Firestore buyer fields
// Matches the user's updated Excel sheet structure
const EXCEL_COLUMN_MAP = {
  // Identity
  "Name / Company Name":          "buyerName",
  "Company Name":                  "buyerName",
  "Buyer Name":                    "buyerName",
  "Business Type":                 "businessType",
  "Year of Establishment":         "estYear",
  "Industry Category":             "category",
  "State":                         "state",
  "District":                      "district",
  "City":                          "city",
  "Address":                       "address",

  // About
  "Company About":                 "about",
  "About Company":                 "about",
  "About":                         "about",

  // Scale & Operations
  "Total Investment Capacity":     "totalInvestmentCapacity",
  "Total Investment Budget":       "totalInvestmentCapacity",
  "Investment Capacity":           "totalInvestmentCapacity",
  "Investment Budget":             "totalInvestmentCapacity",
  "Investment":                    "totalInvestmentCapacity",
  "Annual Turnover":               "annualTurnover",
  "Turnover":                      "annualTurnover",
  "Annual Capacity / Volume (MT)": "annualTurnover",
  "Total Capacity / Volume (MT)":  "annualTurnover",

  // Compliance / Legal
  "GST No. (Registration No.)":    "gstNumber",
  "G&T No. (Registration No.)":    "gstNumber",
  "CIN No. (Verification)":        "cinNumber",
  "GSTIN No. (Verification)":      "gstinNumber",
  "PAN No.":                       "panNumber",
  "PAN Number":                    "panNumber",

  // Business Info
  "Business Partners / Associated Brand": "businessPartners",
  "Product Categories":            "productCategoryText",

  // Contact
  "Contact Person / Person Designation": "contactName",
  "Contact Name":                  "contactName",
  "Contact Role":                  "contactRole",
  "Contact Phone":                 "contactPhone",
  "Contact Email":                 "contactEmail",
  "Phone":                         "phone",
  "Email":                         "email",
  "Password":                      "password",
  "WhatsApp":                      "whatsapp",

  // Status & Verification
  "Profile Status":                "profileStatusNote",
  "Verified Distributor":          "verifiedDistributor",
  "Feedback Rating":               "rating",

  // Legacy / alternate keys
  "Tagline":                       "tagline",
  "Number of Outlets":             "numberOfOutlets",
  "Presence":                      "presence",
  "Buying Frequency":              "buyingFrequency",
  "Payment Terms":                 "paymentTerms",
  "Delivery Area":                 "deliveryArea",
};

// Template column order — matches user's exact requirements
const EXCEL_TEMPLATE_HEADERS = [
  "Name / Company Name",
  "Business Type",
  "Year of Establishment",
  "Industry Category",
  "State",
  "District",
  "Address",
  "Company About",
  "Total Investment Capacity",
  "Annual Turnover",
  "GST No. (Registration No.)",
  "CIN No. (Verification)",
  "GSTIN No. (Verification)",
  "PAN No.",
  "Business Partners / Associated Brand",
  "Product Categories",
  "Contact Person / Person Designation",
  "Profile Status",
  "Verified Distributor",
  "Feedback Rating",
  // Extra fields for portal login
  "Email",
  "Phone",
  "WhatsApp",
  "Password",
];

// De-duplicate headers
const UNIQUE_TEMPLATE_HEADERS = [...new Set(EXCEL_TEMPLATE_HEADERS)];

function downloadBuyerTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([
    UNIQUE_TEMPLATE_HEADERS,
    // Sample row
    [
      "Fresh Mart Distributors",   // Name / Company Name
      "Distributor",               // Business Type
      "2015",                      // Year of Establishment
      "Food & Beverage",           // Industry Category
      "Maharashtra",               // State
      "Mumbai",                    // District
      "123 Trade Zone, Andheri East, Mumbai", // Address
      "Fresh Mart Distributors is one of Maharashtra's leading wholesale distributors specializing in premium FMCG and food products.", // Company About
      "5 Cr+",                     // Total Investment Capacity
      "10 Cr+",                    // Annual Turnover
      "GT7023/13887",              // GST No. (Registration No.)
      "A227877",                   // CIN No.
      "22333000",                  // GSTIN No.
      "PAN027371",                 // PAN No.
      "Nestle, HUL, ITC",          // Business Partners / Associated Brand
      "Packaged Food, Beverages",  // Product Categories
      "Rajesh Kumar, Managing Director", // Contact Person / Designation
      "Active",                    // Profile Status
      "Yes",                       // Verified Distributor
      "4.5",                       // Feedback Rating
      "rajesh@freshmart.com",      // Email
      "9876543210",                // Phone
      "9876543210",                // WhatsApp
      "Pass@1234",                 // Password
    ],
  ]);
  const colWidths = UNIQUE_TEMPLATE_HEADERS.map((h) => ({ wch: Math.max(h.length + 4, 22) }));
  ws["!cols"] = colWidths;
  // Style header row bold (xlsx supports limited styling)
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Buyer Import");
  XLSX.writeFile(wb, "koop_buyer_import_template.xlsx");
}

// ─── Send Buyer Credentials Email Helper ────────────────────────────────────
async function sendBuyerCredentialsEmail({ to, name, companyName, password, profileId }) {
  if (!to || !password) return { success: false, error: "Missing email or password" };
  try {
    const loginUrl = typeof window !== "undefined" ? `${window.location.origin}/adminpanel/login` : "https://koopindia.com/adminpanel/login";
    const res = await fetch("/api/email/send-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: to.toLowerCase().trim(),
        name: name || "Partner",
        companyName: companyName || "",
        password,
        role: "buyer",
        profileId: profileId || "",
        loginUrl,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn("Failed to dispatch credentials email:", e);
    return { success: false, error: e.message };
  }
}

// ─── Excel Import Modal ──────────────────────────────────────────────────────
function ExcelImportModal({ onClose, onSuccess }) {
  const fileRef = useRef();
  const [rows, setRows] = useState([]);
  const [parsed, setParsed] = useState(false);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState(null); // { success, skipped, errors }
  const [progress, setProgress] = useState(0);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = new Uint8Array(ev.target.result);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(ws, { defval: "" });
        // Map column headers to buyer fields
        const mapped = raw.map((row) => {
          const buyer = {};
          for (const [colHeader, fieldKey] of Object.entries(EXCEL_COLUMN_MAP)) {
            if (row[colHeader] !== undefined && row[colHeader] !== "") {
              buyer[fieldKey] = String(row[colHeader]).trim();
            }
          }
          return buyer;
        }).filter(b => b.buyerName); // must have a name
        setRows(mapped);
        setParsed(true);
      } catch (err) {
        alert("Could not parse Excel file. Please use the template provided.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = async () => {
    if (!rows.length) return;
    setImporting(true);
    const success = [];
    const errors = [];
    const skipped = [];

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      setProgress(Math.round(((i + 1) / rows.length) * 100));
      try {
        // Check if buyer with same email already exists
        const emailToUse = (r.contactEmail || r.email || "").toLowerCase().trim();
        if (emailToUse) {
          const existing = await getDocs(query(collection(db, "buyer_users"), where("email", "==", emailToUse)));
          if (!existing.empty) {
            skipped.push({ name: r.buyerName, reason: `Email already registered: ${emailToUse}` });
            continue;
          }
        }

        const countSnap = await getCountFromServer(collection(db, "buyers"));
        const profileId = `KIB${String(countSnap.data().count + 1).padStart(5, "0")}`;
        const slug = slugify(r.buyerName || "buyer");

        const cityToUse = r.city || r.district || "";
        const phoneToUse = r.contactPhone || r.phone || "";
        const gstToUse = r.gstNumber || r.gstinNumber || "";
        const investmentVal = r.totalInvestmentCapacity || r.investment || "";

        // Parse Categories into Array for toggle buttons in Step 4
        const parsedCategories = typeof r.productCategoryText === "string" && r.productCategoryText.trim()
          ? r.productCategoryText.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean)
          : [];

        // Parse Associated Brands into Array of objects for Step 4
        const parsedBrands = typeof r.businessPartners === "string" && r.businessPartners.trim()
          ? r.businessPartners.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean).map(name => ({
              id: uid(),
              name,
              logoUrl: "",
            }))
          : [{ id: uid(), name: "", logoUrl: "" }];

        // Parse Contact Person Name & Role
        let contactPersonName = r.contactName || r.buyerName || "";
        let contactRole = r.contactRole || "";
        if (contactPersonName.includes(",")) {
          const parts = contactPersonName.split(",");
          contactPersonName = parts[0].trim();
          if (!contactRole && parts[1]) contactRole = parts[1].trim();
        }

        const newBuyerPayload = {
          ...r,
          buyerName: r.buyerName || "",
          city: cityToUse,
          district: r.district || cityToUse,
          state: r.state || "",
          address: r.address || "",
          businessType: r.businessType || "Distributor",
          estYear: r.estYear || "",
          category: r.category || "",
          about: r.about || "",
          investment: investmentVal,
          totalInvestmentCapacity: investmentVal,
          annualTurnover: r.annualTurnover || investmentVal,
          annualCapacityMT: r.annualCapacityMT || "",
          totalCapacityMT: r.totalCapacityMT || "",
          currencySector: r.currencySector || "INR",
          gstNumber: gstToUse,
          gstinNumber: r.gstinNumber || gstToUse,
          cinNumber: r.cinNumber || "",
          panNumber: r.panNumber || "",
          contactName: contactPersonName,
          contactRole: contactRole,
          contactEmail: emailToUse,
          email: emailToUse,
          contactPhone: phoneToUse,
          phone: phoneToUse,
          whatsapp: r.whatsapp || phoneToUse,
          password: r.password || "",
          productCategories: parsedCategories,
          buyersWeWorkWith: parsedBrands,
          slug,
          profileId,
          status: "live",  // Automatically live on Excel import
          source: "excel_import",
          views: 0,
          stats: [
            { id: uid(), icon: "🏪", value: "", label: "Outlets" },
            { id: uid(), icon: "📍", value: "", label: "Cities" },
            { id: uid(), icon: "📦", value: "", label: "Products Listed" },
            { id: uid(), icon: "🤝", value: "", label: "Happy Customers" },
            { id: uid(), icon: "💰", value: investmentVal, label: "Annual Turnover" },
            { id: uid(), icon: "⏳", value: r.estYear ? `${new Date().getFullYear() - (parseInt(r.estYear) || new Date().getFullYear())} Yrs` : "", label: "Years in Business" },
          ],
          whyUs: ["Pan India presence", "Timely payments", "Quality products"],
          requirements: ["Standard packaging", "Competitive pricing", "Timely delivery"],
          preferredStates: [],
          primaryColor: "#f97316",
          rating: r.rating || "4.5",
          reviewCount: r.reviewCount || "0",
          hideContact: false,
          hidePhone: false,
          createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "buyers"), newBuyerPayload);

        // Create buyer_users credential — active immediately
        if (emailToUse && r.password) {
          await addDoc(collection(db, "buyer_users"), {
            name: contactPersonName,
            email: emailToUse,
            password: r.password,
            status: "active",
            linkedId: docRef.id,
            linkedSlug: slug,
            role: "buyer",
            createdAt: serverTimestamp(),
          });

          // Automatically send credentials to buyer's email
          sendBuyerCredentialsEmail({
            to: emailToUse,
            name: contactPersonName,
            companyName: r.buyerName || "",
            password: r.password,
            profileId: profileId,
          });
        }

        // Auto-generate lead
        await addDoc(collection(db, "leads"), {
          profileId,
          name: r.contactName || r.buyerName || "Unknown",
          company: r.buyerName || "",
          email: emailToUse,
          phone: r.contactPhone || r.phone || "",
          location: `${r.city || ""} ${r.state || ""}`.trim(),
          service: r.category || "Buyer Listing",
          requirements: "",
          source: "excel_import",
          status: "New",
          createdAt: serverTimestamp(),
          buyerId: docRef.id,
          buyerSlug: slug,
          buyerName: r.buyerName,
          assignedToBuyerSlug: slug,
          assignedToBuyerName: r.buyerName,
          assignedTo: null,
        });

        success.push({ name: r.buyerName, id: docRef.id });
      } catch (err) {
        console.error("Import row error:", err);
        errors.push({ name: rows[i].buyerName, reason: err.message });
      }
    }

    setImporting(false);
    setResults({ success, skipped, errors });
    if (success.length > 0) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center">
              <TableProperties size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg">Bulk Import Buyers</h3>
              <p className="text-gray-500 text-xs mt-0.5">Upload Excel sheet — imported listings and credentials will be Live automatically</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Template Download */}
          {!parsed && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Download size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-900">Download the Import Template first</p>
                <p className="text-xs text-blue-700 mt-1">Fill in buyer details in the template, then upload the file below. All imported listings and login credentials will automatically be set to <strong>Live & Active</strong>.</p>
                <button
                  onClick={downloadBuyerTemplate}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition shadow-sm"
                >
                  <Download size={12} /> Download Template (.xlsx)
                </button>
              </div>
            </div>
          )}

          {/* File Upload Area */}
          {!parsed && (
            <div>
              <label
                htmlFor="excel-upload"
                className="flex flex-col items-center justify-center gap-3 h-36 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 cursor-pointer hover:bg-orange-100 hover:border-orange-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                  <Upload size={20} className="text-orange-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-orange-700">Click to upload Excel file</p>
                  <p className="text-xs text-orange-500 mt-1">.xlsx or .xls — use the template above for correct columns</p>
                </div>
              </label>
              <input
                id="excel-upload"
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls"
                className="sr-only"
                onChange={handleFile}
              />
            </div>
          )}

          {/* Parsed Preview */}
          {parsed && !results && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-900">
                  <span className="text-orange-600">{rows.length}</span> buyers found in file
                </p>
                <button
                  onClick={() => { setParsed(false); setRows([]); if (fileRef.current) fileRef.current.value = ""; }}
                  className="text-xs font-bold text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
                >
                  <X size={12} /> Clear
                </button>
              </div>
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto max-h-64">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {["#", "Buyer Name", "Category", "City", "State", "Email", "Phone", "Password"].map(h => (
                          <th key={h} className="px-3 py-2.5 text-left font-bold text-gray-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-2.5 text-gray-400 font-mono">{i + 1}</td>
                          <td className="px-3 py-2.5 font-semibold text-gray-900 whitespace-nowrap max-w-[160px] truncate">{r.buyerName || "—"}</td>
                          <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{r.category || "—"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.city || "—"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.state || "—"}</td>
                          <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap max-w-[140px] truncate">{r.contactEmail || r.email || "—"}</td>
                          <td className="px-3 py-2.5 text-gray-600">{r.contactPhone || r.phone || "—"}</td>
                          <td className="px-3 py-2.5">
                            {(r.password) ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1"><Check size={10} /> Set</span>
                            ) : (
                              <span className="text-amber-500 font-bold">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Import Progress */}
              {importing && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-700">Importing... {progress}%</p>
                    <Loader2 size={14} className="animate-spin text-orange-500" />
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-emerald-600">{results.success.length}</p>
                  <p className="text-xs font-bold text-emerald-700 mt-1">Imported</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-amber-600">{results.skipped.length}</p>
                  <p className="text-xs font-bold text-amber-700 mt-1">Skipped</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-red-600">{results.errors.length}</p>
                  <p className="text-xs font-bold text-red-700 mt-1">Errors</p>
                </div>
              </div>

              {results.success.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">✓ Successfully Imported ({results.success.length})</p>
                  <p className="text-xs text-emerald-700">All listings are now <strong>Live</strong> and buyer portal credentials are active!</p>
                  <p className="text-xs text-emerald-800 font-semibold mt-1">📧 Login credentials (ID & password) have been automatically dispatched to their registered email addresses.</p>
                </div>
              )}
              {results.skipped.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1">
                  <p className="text-xs font-black text-amber-800 uppercase tracking-wider mb-2">⚠ Skipped</p>
                  {results.skipped.map((s, i) => (
                    <p key={i} className="text-xs text-amber-700"><strong>{s.name}</strong>: {s.reason}</p>
                  ))}
                </div>
              )}
              {results.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-1">
                  <p className="text-xs font-black text-red-800 uppercase tracking-wider mb-2">✗ Errors</p>
                  {results.errors.map((s, i) => (
                    <p key={i} className="text-xs text-red-700"><strong>{s.name}</strong>: {s.reason}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          {!results ? (
            <>
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition">Cancel</button>
              <button
                onClick={handleImport}
                disabled={!parsed || importing || rows.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition shadow-md shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {importing ? <><Loader2 size={14} className="animate-spin" /> Importing...</> : <><Upload size={14} /> Import {rows.length > 0 ? `${rows.length} Buyers` : ""}</>}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition shadow-md"
            >
              Done — View Buyer Listings
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Buyer Listings Management Component
export default function BuyersAdminPage() {
  const [user, setUser] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
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
  const [activeSection, setActiveSection] = useState("section-identity");
  const [showImportModal, setShowImportModal] = useState(false);
  const isUploading = Object.values(uploadStatus).some((s) => s === "uploading");

  /* ── Load from Firestore ── */
  useEffect(() => {
    const load = async () => {
      try {
        const u = getCurrentUser();
        setUser(u);
        if (u?.role === "buyer") {
          let buyerData = null;
          if (u.linkedId) {
            try {
              const byId = await getDoc(doc(db, "buyers", u.linkedId));
              if (byId.exists()) {
                buyerData = { id: byId.id, ...byId.data() };
              }
            } catch (err) {
              console.error("Buyer lookup by linkedId error:", err);
            }
          }
          if (!buyerData && u.linkedSlug) {
            try {
              const snap = await getDocs(query(collection(db, "buyers"), where("slug", "==", u.linkedSlug)));
              if (!snap.empty) {
                buyerData = { id: snap.docs[0].id, ...snap.docs[0].data() };
              }
            } catch (err) {
              console.error("Buyer lookup by linkedSlug error:", err);
            }
          }
          if (buyerData) {
            setBuyers([buyerData]);
            openForm(buyerData);
          } else {
            setBuyers([]);
            openForm({ slug: u.linkedSlug || "", buyerName: u.name || "", contactEmail: u.email || "" });
          }
        } else {
          const snap = await getDocs(query(collection(db, "buyers"), orderBy("createdAt", "desc")));
          setBuyers(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
        }
      } catch (e) { console.error("Error loading buyers:", e); }
      finally { setDbLoading(false); }
    };
    load();
  }, []);

  const uploadToStorage = async (file, path, uiKey) => {
    let fileToUpload = file;
    // Compress image if it's an image file
    if (file.type.startsWith("image/")) {
      const options = {
        maxSizeMB: 0.5, // High compression
        maxWidthOrHeight: 1200, // Reasonable max dimension
        useWebWorker: true,
        fileType: "image/webp" // Convert to WebP for modern optimization
      };
      try {
        fileToUpload = await imageCompression(file, options);
        // adjust extension in path to webp since we compress to webp
        path = path.replace(/\.[^/.]+$/, ".webp");
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }

    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, fileToUpload);
      task.on("state_changed",
        (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setUploadProgress((p) => ({ ...p, [uiKey]: pct }));
        },
        (err) => reject(err),
        async () => { const url = await getDownloadURL(task.snapshot.ref); resolve(url); }
      );
    });
  };

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
      return val.replace(/&nbsp;|\u00A0/g, " ");
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
      const slug = clean.slug || slugify(clean.buyerName || "buyer");
      const payload = {
        ...clean,
        slug,
        hideContact: !!(form.hideContact || form.hidePhone),
        hidePhone: !!(form.hideContact || form.hidePhone),
        status: asDraft ? "draft" : "live"
      };
      const emailToUse = (payload.contactEmail || payload.email || "").toLowerCase().trim();

      if (editing) {
        await updateDoc(doc(db, "buyers", editing.id), { ...payload, updatedAt: serverTimestamp() });
        setBuyers((p) => p.map((b) => b.id === editing.id ? { ...b, ...payload } : b));

        // Sync or Create buyer_users credential
        if (emailToUse) {
          const userStatus = payload.status === "live" ? "active" : "paused";
          try {
            let userDoc = null;
            const byId = await getDocs(query(collection(db, "buyer_users"), where("linkedId", "==", editing.id)));
            if (!byId.empty) {
              userDoc = byId.docs[0];
            } else {
              const bySlug = await getDocs(query(collection(db, "buyer_users"), where("linkedSlug", "==", editing.slug || slug)));
              if (!bySlug.empty) userDoc = bySlug.docs[0];
            }

            if (userDoc) {
              const updateData = {
                name: payload.contactName || payload.buyerName,
                email: emailToUse,
                linkedId: editing.id,
                linkedSlug: slug,
                status: userStatus,
                updatedAt: serverTimestamp(),
              };
              if (payload.password) updateData.password = payload.password;
              await updateDoc(doc(db, "buyer_users", userDoc.id), updateData);
              if (payload.password) {
                sendBuyerCredentialsEmail({
                  to: emailToUse,
                  name: payload.contactName || payload.buyerName,
                  companyName: payload.buyerName || "",
                  password: payload.password,
                  profileId: editing.profileId || "",
                });
              }
            } else if (payload.password) {
              await addDoc(collection(db, "buyer_users"), {
                name: payload.contactName || payload.buyerName,
                email: emailToUse,
                password: payload.password,
                status: userStatus,
                linkedId: editing.id,
                linkedSlug: slug,
                role: "buyer",
                createdAt: serverTimestamp(),
              });
              sendBuyerCredentialsEmail({
                to: emailToUse,
                name: payload.contactName || payload.buyerName,
                companyName: payload.buyerName || "",
                password: payload.password,
                profileId: editing.profileId || "",
              });
            }
          } catch (userSyncErr) {
            console.error("Failed to sync buyer_users:", userSyncErr);
          }
        }
      } else {
        const count = buyers.length + 1;
        const profileId = `KIB${String(count).padStart(5, '0')}`;
        const newPayload = { ...payload, profileId, views: 0, createdAt: serverTimestamp() };

        const docRef = await addDoc(collection(db, "buyers"), newPayload);
        setBuyers((p) => [{ ...newPayload, id: docRef.id }, ...p]);

        // Auto-generate a Lead from this Buyer
        await addDoc(collection(db, "leads"), {
          profileId: profileId,
          name: newPayload.contactName || newPayload.buyerName || "Unknown",
          company: newPayload.buyerName || "",
          email: newPayload.contactEmail || newPayload.email || "",
          phone: newPayload.contactPhone || newPayload.phone || "",
          location: `${newPayload.city || ''} ${newPayload.state || ''}`.trim(),
          service: newPayload.category || "Buyer Listing",
          requirements: Array.isArray(newPayload.requirements) ? newPayload.requirements.join(", ") : (newPayload.requirements || ""),
          source: "buyer_listing",
          status: "New",
          createdAt: serverTimestamp(),
          buyerId: docRef.id,
          buyerSlug: slug,
          buyerName: newPayload.buyerName,
          assignedToBuyerSlug: slug,
          assignedToBuyerName: newPayload.buyerName,
          assignedTo: null
        });

        // Create User Credential
        if (emailToUse && newPayload.password) {
          const userStatus = payload.status === "live" ? "active" : "paused";
          await addDoc(collection(db, "buyer_users"), {
            name: newPayload.contactName || newPayload.buyerName,
            email: emailToUse,
            password: newPayload.password,
            status: userStatus,
            linkedId: docRef.id,
            linkedSlug: slug,
            role: "buyer",
            createdAt: serverTimestamp()
          });

          // Automatically send credentials to buyer's email
          sendBuyerCredentialsEmail({
            to: emailToUse,
            name: newPayload.contactName || newPayload.buyerName,
            companyName: newPayload.buyerName || "",
            password: newPayload.password,
            profileId: profileId,
          });
        }
      }
      if (user?.role === "buyer") {
        alert("Profile updated successfully!");
        setFormOpen(true);
      } else {
        setFormOpen(false);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save profile: " + (err?.message || "An unexpected error occurred."));
    } finally { setSaving(false); }
  };

  const toggleStatus = async (id, current) => {
    if (!id) return;
    const next = current === "live" ? "paused" : "live";
    try {
      await updateDoc(doc(db, "buyers", id), { status: next, updatedAt: serverTimestamp() });
      setBuyers((p) => p.map((b) => b.id === id ? { ...b, status: next } : b));
    } catch (err) {
      console.error("Failed to update buyer listing status:", err);
      alert("Failed to update status: " + (err?.message || "Error occurred"));
      return;
    }

    // Sync linked buyer_users status
    try {
      const userStatus = next === "live" ? "active" : "paused";
      const cleanId = String(id).trim();
      const byId = await getDocs(query(collection(db, "buyer_users"), where("linkedId", "==", cleanId)));
      if (!byId.empty) {
        for (const d of byId.docs) {
          await updateDoc(doc(db, "buyer_users", d.id), { status: userStatus, updatedAt: serverTimestamp() });
        }
      } else {
        const buyerItem = buyers.find((b) => b.id === id);
        if (buyerItem?.slug) {
          const bySlug = await getDocs(query(collection(db, "buyer_users"), where("linkedSlug", "==", buyerItem.slug)));
          for (const d of bySlug.docs) {
            await updateDoc(doc(db, "buyer_users", d.id), { status: userStatus, linkedId: cleanId, updatedAt: serverTimestamp() });
          }
        }
      }
    } catch (userErr) {
      console.warn("Notice syncing buyer portal user status on toggle:", userErr);
    }

    setMenuId(null);
  };

  const toggleFeatured = async (id, current) => {
    const next = !current;
    await updateDoc(doc(db, "buyers", id), { isFeatured: next });
    setBuyers((p) => p.map((b) => b.id === id ? { ...b, isFeatured: next } : b));
    setMenuId(null);
  };

  const handleDelete = async () => {
    if (!delId) return;
    await deleteDoc(doc(db, "buyers", delId));
    setBuyers((p) => p.filter((b) => b.id !== delId));
    setDelId(null);
  };

  const handleResendCredentials = async (buyer) => {
    const emailToUse = (buyer.contactEmail || buyer.email || "").toLowerCase().trim();
    if (!emailToUse) {
      alert("This buyer does not have an email address listed.");
      return;
    }

    try {
      // Find credential in buyer_users
      let userDoc = null;
      const byId = await getDocs(query(collection(db, "buyer_users"), where("linkedId", "==", buyer.id)));
      if (!byId.empty) {
        userDoc = byId.docs[0].data();
      } else if (buyer.slug) {
        const bySlug = await getDocs(query(collection(db, "buyer_users"), where("linkedSlug", "==", buyer.slug)));
        if (!bySlug.empty) userDoc = bySlug.docs[0].data();
      }

      let passwordToSend = userDoc?.password;

      if (!passwordToSend) {
        const enteredPass = prompt(`Enter or set login password for ${buyer.buyerName} (${emailToUse}):`, "Pass@1234");
        if (!enteredPass) return;
        passwordToSend = enteredPass;
        // Save to buyer_users
        await addDoc(collection(db, "buyer_users"), {
          name: buyer.contactName || buyer.buyerName,
          email: emailToUse,
          password: enteredPass,
          status: buyer.status === "live" ? "active" : "paused",
          linkedId: buyer.id,
          linkedSlug: buyer.slug || slugify(buyer.buyerName),
          role: "buyer",
          createdAt: serverTimestamp(),
        });
      }

      const res = await sendBuyerCredentialsEmail({
        to: emailToUse,
        name: buyer.contactName || buyer.buyerName,
        companyName: buyer.buyerName || "",
        password: passwordToSend,
        profileId: buyer.profileId || "",
      });

      if (res?.success) {
        alert(`✓ Login credentials successfully sent to ${emailToUse}!`);
      } else if (res?.notConfigured) {
        alert(`⚠ Credentials saved, but email could not be delivered:\n${res.message}\n\nPlease add SMTP_USER & SMTP_PASS in your .env file.`);
      } else {
        alert(`Failed to send email: ${res?.error || "Unknown error"}. Please check your SMTP settings in .env.`);
      }
    } catch (err) {
      console.error("Error sending credentials:", err);
      alert("Failed to send credentials: " + err.message);
    }
  };

  const handleTransferToSeller = async (buyerId) => {
    const confirmTransfer = confirm("Are you sure you want to transfer this listing to Sellers?");
    if (!confirmTransfer) return;
    const buyerToTransfer = buyers.find(b => b.id === buyerId);
    if (!buyerToTransfer) return;
    try {
      const newSellerData = { ...buyerToTransfer, name: buyerToTransfer.buyerName || buyerToTransfer.companyName || "" };
      delete newSellerData.id;
      delete newSellerData.buyerName;
      await addDoc(collection(db, "sellers"), newSellerData);
      await deleteDoc(doc(db, "buyers", buyerId));
      setBuyers((p) => p.filter((b) => b.id !== buyerId));
      setMenuId(null);
      alert("Successfully transferred to Sellers section.");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Failed to transfer profile. Please try again.");
    }
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedBuyers = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openForm = (b = null) => {
    setEditing(b);
    
    let nextForm = blank();
    if (b) {
      nextForm = { ...nextForm, ...b };
      
      // Auto-populate fallbacks so nothing is blank
      if (!nextForm.city && b.district) nextForm.city = b.district;
      if (!nextForm.annualTurnover && (b.totalInvestmentCapacity || b.investment)) {
        nextForm.annualTurnover = b.totalInvestmentCapacity || b.investment;
      }
      if (!nextForm.about && b.about) nextForm.about = b.about;
      if (!nextForm.contactEmail && b.email) nextForm.contactEmail = b.email;
      if (!nextForm.email && b.contactEmail) nextForm.email = b.contactEmail;
      if (!nextForm.contactPhone && b.phone) nextForm.contactPhone = b.phone;
      if (!nextForm.phone && b.contactPhone) nextForm.phone = b.contactPhone;

      // Fix type collisions or missing arrays
      if (!Array.isArray(nextForm.requirements) || nextForm.requirements.length === 0) {
        nextForm.requirements = Array.isArray(b.requirements) && b.requirements.length > 0 ? b.requirements : blank().requirements;
      }
      if (!Array.isArray(nextForm.preferredStates)) {
        nextForm.preferredStates = blank().preferredStates;
      }
      if (!Array.isArray(nextForm.stats) || nextForm.stats.length === 0) {
        nextForm.stats = blank().stats;
      }
      if (!Array.isArray(nextForm.buyersWeWorkWith) || nextForm.buyersWeWorkWith.length === 0) {
        nextForm.buyersWeWorkWith = blank().buyersWeWorkWith;
      }
      if (!Array.isArray(nextForm.productCategories)) {
        nextForm.productCategories = [];
      }
      nextForm.hideContact = !!(b.hideContact || b.hidePhone);
      nextForm.hidePhone = !!(b.hideContact || b.hidePhone);
    }
    
    setForm(nextForm);
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

  // Render view
  return (
    <div className="min-h-screen bg-[#f4f6fb]" style={{ fontFamily: "'Inter',sans-serif" }}>
      {!formOpen && (
        <>
                    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
                <Building2 className="text-white" size={18} />
              </div>
              <div>
                <h1 className="font-black text-gray-900 text-base leading-none">Buyer Listings</h1>
                {user?.role === "admin" ? (
                  <p className="text-gray-400 text-[11px] mt-0.5 font-medium">{buyers.length} buyers listed</p>
                ) : (
                  <p className="text-gray-400 text-[11px] mt-0.5 font-medium">Manage buyer profile</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user?.role === "admin" && (
                <button
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-bold text-sm px-4 py-2.5 rounded-xl transition-all"
                >
                  <TableProperties size={15} /> Import Excel
                </button>
              )}
              <button onClick={() => openForm()}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-orange-200 transition-all hover:scale-105">
                <Plus size={16} /> Add Buyer
              </button>
            </div>
          </div>

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

                    <div className="px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedBuyers.map((b) => {
              const cfg = statusCfg[b.status] || statusCfg.draft;
              const color = b.primaryColor || "#f97316";
              return (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                  <div className="h-1.5 w-full rounded-t-2xl" style={{ backgroundColor: color }} />
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
                            <button onClick={() => toggleFeatured(b.id, b.isFeatured)} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left">
                              <Star size={13} className={b.isFeatured ? "text-orange-500 fill-orange-500" : ""} /> {b.isFeatured ? "Unfeature" : "Feature on Marketplace"}
                            </button>
                            <button onClick={() => { window.open(`/buyers/${b.slug}`, "_blank"); setMenuId(null); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-left"><ExternalLink size={13} /> View Page</button>
                            <div className="border-t border-gray-100 my-1" />
                            <button onClick={() => { setMenuId(null); handleResendCredentials(b); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 text-left"><Mail size={13} /> Send Login Email</button>
                            <button onClick={() => { handleTransferToSeller(b.id); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 text-left"><ArrowRightLeft size={13} /> Transfer to Seller</button>
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
                      {b.isFeatured && (
                        <>
                          <span className="text-gray-300 text-[10px]">·</span>
                          <span className="text-orange-500 text-[10px] font-bold flex items-center gap-1"><Star size={10} className="fill-orange-500"/> Featured</span>
                        </>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-2">
                      <Globe size={11} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] text-orange-600 font-semibold truncate">koopindia.com/buyers/{b.slug}</span>
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

          {totalPages > 1 && (
            <div className="px-6 pb-10 flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} buyers
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => (
                    <span key={p} className="flex items-center">
                      {i > 0 && p - arr[i - 1] > 1 && <span className="px-2 text-gray-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 rounded-xl text-sm font-bold transition flex items-center justify-center ${
                          currentPage === p ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    </span>
                  ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Buyer Management Studio */}
      {formOpen && (
        <div className="w-full flex flex-col" style={{ minHeight: "100vh", background: "#f1f5f9" }}>
                    <div className="px-3 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              {user?.role !== "buyer" && (
                <button type="button" onClick={() => setFormOpen(false)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all cursor-pointer flex-shrink-0">
                  <ArrowLeft size={16} />
                </button>
              )}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden" style={{ backgroundColor: pc }}>
                  {form.logoUrl
                    ? <img src={getImg(form.logoUrl)} alt="" className="w-full h-full object-contain" />
                    : <span className="text-white font-black text-xs sm:text-sm">{ini(form.buyerName || "BR")}</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="font-black text-gray-900 text-xs sm:text-base leading-tight truncate">{editing ? (form.buyerName || "Edit Buyer") : "New Buyer Studio"}</h1>
                  {form.buyerName && (
                    <a
                      href={`/buyers/${form.slug || slugify(form.buyerName)}`}
                      target="_blank"
                      rel="noreferrer"
                      title={`koopindia.com/buyers/${form.slug || slugify(form.buyerName)}`}
                      className="text-orange-600 hover:text-orange-800 hover:underline text-[10px] sm:text-[11px] font-bold mt-0.5 block truncate"
                    >
                      koopindia.com/buyers/{form.slug || slugify(form.buyerName)}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {user?.role === "buyer" ? (
                <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.buyerName.trim()}
                  className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md sm:shadow-lg shadow-orange-200 disabled:opacity-40 cursor-pointer whitespace-nowrap">
                  <Save size={14} /> {saving ? "Saving..." : isUploading ? "Uploading..." : "Save Updates"}
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => handleSave(true)} disabled={saving || isUploading || !form.buyerName.trim()}
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap">
                    <Save size={14} /> Save Draft
                  </button>
                  <button type="button" onClick={() => handleSave(false)} disabled={saving || isUploading || !form.buyerName.trim()}
                    className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-md sm:shadow-lg shadow-orange-200 disabled:opacity-40 cursor-pointer whitespace-nowrap">
                    <Rocket size={14} /> {saving ? "Publishing..." : isUploading ? "Uploading..." : "Publish Live"}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto" onScroll={(e) => {
              const sections = ["section-identity", "section-visuals", "section-about", "section-categories", "section-stats", "section-contact"];
              const scrollPos = e.target.scrollTop;
              for (const id of [...sections].reverse()) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos + 150) {
                  setActiveSection(id);
                  break;
                }
              }
            }}>
              {/* ── Sticky Top Section Nav (horizontal) ── */}
              <div className="bg-white border-b border-gray-100 sticky top-0 z-20 flex-shrink-0 shadow-sm">
                <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8">
                  <div className="flex items-center gap-1 py-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {[
                      { id: "section-identity", icon: "🏠", label: "Identity & Basic Info" },
                      { id: "section-visuals", icon: "🎨", label: "Visuals & Branding" },
                      { id: "section-about", icon: "ℹ️", label: "About & Details" },
                      { id: "section-categories", icon: "📦", label: "Categories & Partners" },
                      { id: "section-stats", icon: "📈", label: "Why Us & Stats" },
                      { id: "section-contact", icon: "📞", label: "Contact & Settings" },
                    ].map((t) => (
                      <button key={t.id} type="button"
                        onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                          activeSection === t.id
                            ? "bg-orange-500 text-white shadow-md"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        }`}>
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                        {activeSection === t.id && <Check size={12} className="text-orange-200" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-8 pb-32 space-y-8 relative">

                {/* Step 1: Buyer Identity */}
                <div className="space-y-6 pt-6" id="section-identity">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 rounded-2xl shadow-sm">
                    <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl text-white font-black text-xl tracking-wider shadow-inner">01</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Basic Information</h3>
                      <p className="text-orange-100 text-sm font-medium mt-1">Provide primary details about the buyer.</p>
                    </div>
                  </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Buyer Identity</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={fieldLabel}>Company Name *</label>
                            <input type="text" value={form.buyerName} disabled={user?.role === "buyer"} onChange={e => sf("buyerName", e.target.value)} placeholder="Enter company name" className={`${inp} ${user?.role === "buyer" ? "bg-gray-50 cursor-not-allowed" : ""}`} />
                            {user?.role === "buyer" && <p className="text-[10px] text-gray-400 mt-1">Contact admin to change Company Name.</p>}
                            {form.buyerName?.trim() && (
                              <p className="text-[11px] text-orange-600 font-semibold mt-1.5 flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded-lg w-max">
                                <span>🌐</span> Public URL: <span className="font-bold underline">koopindia.com/buyers/{form.slug || slugify(form.buyerName)}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={fieldLabel}>Category / Industry</label>
                            <input type="text" list="category-list" value={form.category} onChange={(e) => sf("category", e.target.value)} placeholder="Enter category" className={inp} />
                          </div>
                        </div>
                        <div>
                          <label className={fieldLabel}>Tagline</label>
                          <input type="text" value={form.tagline} onChange={(e) => sf("tagline", e.target.value)} placeholder="Enter tagline" className={inp} />
                        </div>
                        <div>
                          <label className={fieldLabel}>Business Type</label>
                          <input type="text" list="business-type-list" value={form.businessType || ""} onChange={(e) => sf("businessType", e.target.value)} placeholder="Select or enter business type" className={inp} />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {["Manufacturer", "Distributor", "Retailer", "Wholesaler", "Supermarket Chain", "Buyer", "Importer / Exporter"].map((t) => (
                              <button key={t} type="button" onClick={() => sf("businessType", t)}
                                className={`px-4 py-2 rounded-xl border-2 font-bold text-[10px] transition-all cursor-pointer ${form.businessType === t ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
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
                        <div><label className={fieldLabel}>City</label><input list="city-list" value={form.city} onChange={(e) => sf("city", e.target.value)} placeholder="Enter city" className={inp} /></div>
                        <div><label className={fieldLabel}>State</label><input list="state-list" value={form.state} onChange={(e) => sf("state", e.target.value)} placeholder="Enter state" className={inp} /></div>
                        <div><label className={fieldLabel}>Establishment Year</label><input value={form.estYear} onChange={(e) => sf("estYear", e.target.value)} placeholder="Enter establishment year" className={inp} /></div>
                        <div><label className={fieldLabel}>Delivery / Presence Area</label><input value={form.deliveryArea} onChange={(e) => sf("deliveryArea", e.target.value)} placeholder="Enter delivery area" className={inp} /></div>
                      </div>
                      <div><label className={fieldLabel}>Full Address</label><textarea value={form.address} onChange={(e) => sf("address", e.target.value)} placeholder="Enter full address" className={ta} rows={2} /></div>
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
                        <div><label className={fieldLabel}>GST Number</label><input value={form.gstNumber} onChange={(e) => sf("gstNumber", e.target.value)} placeholder="Enter GST number" className={inp} /></div>
                        <div><label className={fieldLabel}>PAN Number</label><input value={form.panNumber} onChange={(e) => sf("panNumber", e.target.value)} placeholder="Enter PAN number" className={inp} /></div>
                      </div>
                    </div>
                  </div>

                {/* Step 2: Visuals & Branding */}
                <div className="space-y-6 pt-10" id="section-visuals">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 rounded-2xl shadow-sm">
                    <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl text-white font-black text-xl tracking-wider shadow-inner">02</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Visuals & Branding</h3>
                      <p className="text-orange-100 text-sm font-medium mt-1">Logo, cover image, and theme color.</p>
                    </div>
                  </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Buyer Logo</h3>
                      <div className="gap-6">
                        <div>
                          <label className={fieldLabel}>Buyer Logo</label>
                          <UploadBox field="logo" value={form.logoUrl} onPick={(e) => handleImagePick(e, "logo")} small />
                          {ProgPill({ field: "logo", uploadStatus, uploadProgress })}
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className={fieldLabel}>Rating (out of 5)</label><input value={form.rating} onChange={(e) => sf("rating", e.target.value)} placeholder="Enter rating" className={inp} /></div>
                        <div><label className={fieldLabel}>Review Count</label><input value={form.reviewCount} onChange={(e) => sf("reviewCount", e.target.value)} placeholder="Enter review count" className={inp} /></div>
                      </div>
                    </div>
                  </div>

                {/* Step 3: About & Details */}
                <div className="space-y-6 pt-10" id="section-about">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 rounded-2xl shadow-sm">
                    <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl text-white font-black text-xl tracking-wider shadow-inner">03</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">About & Details</h3>
                      <p className="text-orange-100 text-sm font-medium mt-1">Company overview and business details.</p>
                    </div>
                  </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">About Company</h3>
                      <div className="bg-white">
                        <ReactQuill 
                          theme="snow" 
                          value={form.about} 
                          onChange={(val) => sf("about", val)} 
                          placeholder="Enter about company details..."
                        />
                      </div>
                    </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Business Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className={fieldLabel}>Annual Turnover</label><input value={form.annualTurnover} onChange={(e) => sf("annualTurnover", e.target.value)} placeholder="Enter annual turnover" className={inp} /></div>
                        <div><label className={fieldLabel}>Number of Outlets</label><input value={form.numberOfOutlets} onChange={(e) => sf("numberOfOutlets", e.target.value)} placeholder="Enter number of outlets" className={inp} /></div>
                        <div><label className={fieldLabel}>State / City Presence</label><input value={form.presence} onChange={(e) => sf("presence", e.target.value)} placeholder="Enter presence area" className={inp} /></div>
                        <div><label className={fieldLabel}>Buying Frequency</label><input value={form.buyingFrequency} onChange={(e) => sf("buyingFrequency", e.target.value)} placeholder="Enter buying frequency" className={inp} /></div>
                        <div><label className={fieldLabel}>Payment Terms</label><input value={form.paymentTerms} onChange={(e) => sf("paymentTerms", e.target.value)} placeholder="Enter payment terms" className={inp} /></div>
                        <div><label className={fieldLabel}>Phone</label><input value={form.phone} onChange={(e) => sf("phone", e.target.value)} placeholder="Enter phone number" className={inp} /></div>
                        <div><label className={fieldLabel}>Portal Login Email</label><input value={form.email} onChange={(e) => sf("email", e.target.value)} placeholder="contact@company.com" className={inp} /></div>
                        <div><label className={fieldLabel}>Portal Login Password</label><input type="text" value={form.password || ""} onChange={(e) => sf("password", e.target.value)} placeholder="Minimum 6 characters" className={inp} /></div>
                        <div><label className={fieldLabel}>WhatsApp</label><input value={form.whatsapp} onChange={(e) => sf("whatsapp", e.target.value)} placeholder="Enter phone number" className={inp} /></div>
                          <label className="col-span-1 sm:col-span-2 md:col-span-3 flex items-center gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors mt-2">
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={!!(form.hideContact || form.hidePhone)} onChange={e => setForm(p => ({ ...p, hideContact: e.target.checked, hidePhone: e.target.checked }))} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">Hide Contact Details on Public Page</p>
                              <p className="text-xs text-gray-500 mt-0.5">Buyer's phone &amp; email will be hidden. Koop India's phone (+91 95998 26131) will be shown instead.</p>
                            </div>
                          </label>
                      </div>
                    </div>
                  </div>

                {/* Step 4: Categories & Partners */}
                <div className="space-y-6 pt-10" id="section-categories">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 rounded-2xl shadow-sm">
                    <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl text-white font-black text-xl tracking-wider shadow-inner">04</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Categories & Partners</h3>
                      <p className="text-orange-100 text-sm font-medium mt-1">Products purchased and buyers network.</p>
                    </div>
                  </div>
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
                        <h3 className="text-sm font-black text-gray-900">Brands We Work With</h3>
                        <button type="button" onClick={() => addArr("buyersWeWorkWith", { id: uid(), name: "", logoUrl: "" })} className={addBtn}><Plus size={12} /> Add Brand</button>
                      </div>
                      <div className="space-y-3">
                        {(form.buyersWeWorkWith || []).map((bw, i) => (
                          <div key={bw.id || i} className="flex items-center gap-2.5 sm:gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
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
                            <input value={bw.name} onChange={(e) => setArr("buyersWeWorkWith", i, "name", e.target.value)} placeholder="Enter brand name" className={`flex-1 min-w-0 ${inp_sm}`} />
                            <button type="button" onClick={() => delArr("buyersWeWorkWith", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <div>
                          <h3 className="text-sm font-black text-gray-900">We Prefer Suppliers From (Preferred Locations)</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Select zone-wise or type comma-separated states/territories</p>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg border border-orange-200">
                          {(form.preferredStates || []).length} Selected
                        </span>
                      </div>

                      {/* Quick Comma-separated input for easy admin panel additions */}
                      <div className="bg-orange-50/50 rounded-xl p-3 border border-orange-100 space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                          Add / Paste States (comma separated)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="quick-add-states-input"
                            placeholder="e.g. Delhi NCR, Maharashtra, Gujarat, Punjab"
                            className={inp_sm}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const val = e.currentTarget.value.trim();
                                if (val) {
                                  const newItems = val.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
                                  const combined = [...new Set([...(form.preferredStates || []), ...newItems])];
                                  sf("preferredStates", combined);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.getElementById("quick-add-states-input");
                              if (el && el.value.trim()) {
                                const newItems = el.value.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
                                const combined = [...new Set([...(form.preferredStates || []), ...newItems])];
                                sf("preferredStates", combined);
                                el.value = "";
                              }
                            }}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition whitespace-nowrap shadow-sm cursor-pointer"
                          >
                            + Add States
                          </button>
                        </div>
                      </div>

                      <ZoneStateSelector
                        selected={form.preferredStates || []}
                        onChange={(states) => sf("preferredStates", states)}
                      />
                    </div>
                  </div>

                {/* Step 5: Why Us & Key Metrics */}
                <div className="space-y-6 pt-10" id="section-stats">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 rounded-2xl shadow-sm">
                    <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl text-white font-black text-xl tracking-wider shadow-inner">05</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Why Us & Stats</h3>
                      <p className="text-orange-100 text-sm font-medium mt-1">Key metrics and reasons to supply.</p>
                    </div>
                  </div>
                    <div className={sectionCard}>
                      <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                        <h3 className="text-sm font-black text-gray-900">Why Supply to Us</h3>
                        <button type="button" onClick={() => addListItem("whyUs", "")} className={addBtn}><Plus size={12} /> Add Point</button>
                      </div>
                      <div className="space-y-2">
                        {(form.whyUs || []).map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-emerald-500 text-sm">✓</span>
                            <input value={item} onChange={(e) => setListItem("whyUs", i, e.target.value)} placeholder="Enter why choose us point" className={`flex-1 ${inp_sm}`} />
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
                            <input value={item} onChange={(e) => setListItem("requirements", i, e.target.value)} placeholder="Enter requirement" className={`flex-1 ${inp_sm}`} />
                            <button type="button" onClick={() => delListItem("requirements", i)} className={delBtn}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Key Stats (Bottom Strip)</h3>
                      <div className="space-y-3">
                        {(form.stats || []).map((stat, i) => (
                          <div key={stat.id || i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                            <div className="flex items-center gap-2">
                              <input value={stat.icon} onChange={(e) => setArr("stats", i, "icon", e.target.value)} placeholder="🏪" className="w-12 text-center text-lg border border-gray-200 rounded-lg px-2 py-1.5 outline-none bg-white" />
                              <input value={stat.value} onChange={(e) => setArr("stats", i, "value", e.target.value)} placeholder="Enter value" className={`flex-1 sm:w-24 ${inp_sm}`} />
                              <button type="button" onClick={() => delArr("stats", i)} className={`sm:hidden ${delBtn}`}><X size={12} /></button>
                            </div>
                            <input value={stat.label} onChange={(e) => setArr("stats", i, "label", e.target.value)} placeholder="Enter label" className={`flex-1 min-w-0 ${inp_sm}`} />
                            <button type="button" onClick={() => delArr("stats", i)} className={`hidden sm:flex ${delBtn}`}><X size={12} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => addArr("stats", { id: uid(), icon: "⭐", value: "", label: "" })} className={addBtn}><Plus size={12} /> Add Stat</button>
                      </div>
                    </div>
                  </div>

                {/* Step 6: Contact & Settings */}
                <div className="space-y-6 pt-10" id="section-contact">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex items-center gap-4 rounded-2xl shadow-sm">
                    <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl text-white font-black text-xl tracking-wider shadow-inner">06</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Contact & Settings</h3>
                      <p className="text-orange-100 text-sm font-medium mt-1">Contact person and listing status.</p>
                    </div>
                  </div>
                    <div className={sectionCard}>
                      <h3 className="text-sm font-black text-gray-900 pb-3 border-b border-gray-50">Key Contact Person</h3>
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <div className="flex-shrink-0">
                          <UploadBox field="contactPhoto" value={form.contactPhotoUrl} onPick={(e) => handleImagePick(e, "contactPhoto")} small />
                          {ProgPill({ field: "contactPhoto", uploadStatus, uploadProgress })}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div><label className={fieldLabel}>Name</label><input value={form.contactName} onChange={(e) => sf("contactName", e.target.value)} placeholder="Enter contact person name" className={inp} /></div>
                          <div><label className={fieldLabel}>Role / Designation</label><input value={form.contactRole} onChange={(e) => sf("contactRole", e.target.value)} placeholder="Enter role / designation" className={inp} /></div>
                          <div><label className={fieldLabel}>Phone</label><input value={form.contactPhone} onChange={(e) => sf("contactPhone", e.target.value)} placeholder="Enter phone number" className={inp} /></div>
                          <div><label className={fieldLabel}>Email</label><input value={form.contactEmail} onChange={(e) => sf("contactEmail", e.target.value)} placeholder="Enter email address" className={inp} /></div>
                          <div className="sm:col-span-2"><label className={fieldLabel}>Portal Login Password</label><input type="text" value={form.password || ""} onChange={(e) => sf("password", e.target.value)} placeholder="Minimum 6 characters" className={inp} /></div>
                          <label className="sm:col-span-2 flex items-center gap-3 p-3.5 bg-orange-50/50 border border-orange-100 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors mt-1">
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={!!(form.hideContact || form.hidePhone)} onChange={e => setForm(p => ({ ...p, hideContact: e.target.checked, hidePhone: e.target.checked }))} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">Hide Contact Details on Public Page</p>
                              <p className="text-xs text-gray-500 mt-0.5">Buyer's phone &amp; email will be hidden. Koop India's phone (+91 95998 26131) will be shown instead.</p>
                            </div>
                          </label>
                        </div>
                      </div>
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

              </div>

                            <datalist id="business-type-list">
                <option value="Manufacturer" />
                <option value="Distributor" />
                <option value="Retailer" />
                <option value="Wholesaler" />
                <option value="Supermarket Chain" />
                <option value="Buyer" />
                <option value="Importer / Exporter" />
              </datalist>
              <datalist id="category-list">
                {PRODUCT_CATEGORY_ICONS.map((c) => (
                  <option key={c.label} value={c.label} />
                ))}
              </datalist>
              <datalist id="city-list">
                <option value="Delhi" />
                <option value="Mumbai" />
                <option value="Bangalore" />
                <option value="Chennai" />
                <option value="Kolkata" />
                <option value="Hyderabad" />
                <option value="Pune" />
                <option value="Ahmedabad" />
                <option value="Surat" />
                <option value="Jaipur" />
              </datalist>
              <datalist id="state-list">
                <option value="Delhi" />
                <option value="Maharashtra" />
                <option value="Karnataka" />
                <option value="Tamil Nadu" />
                <option value="West Bengal" />
                <option value="Telangana" />
                <option value="Gujarat" />
                <option value="Rajasthan" />
                <option value="Uttar Pradesh" />
                <option value="Madhya Pradesh" />
              </datalist>

            </div>
          </div>
        </div>
      )}

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

      {/* ── Excel Import Modal ── */}
      {showImportModal && (
        <ExcelImportModal
          onClose={() => setShowImportModal(false)}
          onSuccess={async () => {
            // Reload buyers list after successful import
            try {
              const snap = await getDocs(query(collection(db, "buyers"), orderBy("createdAt", "desc")));
              setBuyers(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
            } catch (e) {
              console.error("Reload error after import:", e);
            }
          }}
        />
      )}
    </div>
  );
}
