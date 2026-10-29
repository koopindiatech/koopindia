"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Users, Search, Phone, Mail, Building2, Clock,
  CheckCircle2, XCircle, AlertCircle, Trash2,
  Loader2, Package, UserPlus, ChevronDown, X,
  Store, ShoppingBag, UserCheck, StickyNote, ArrowRight, Edit2, History, Send, Calendar, Activity,
  Briefcase, Tag, MapPin
} from "lucide-react";
import { db } from "../../../lib/firebase";
import { matchCategory, matchState, matchCity } from "../../../lib/categoryAccess";
import {
  collection, getDocs, updateDoc, deleteDoc, doc,
  query, orderBy, serverTimestamp, where, arrayUnion
} from "firebase/firestore";
import {
  getCurrentUser, isAdmin as checkIsAdmin,
  assignLeadToUser, assignLeadToSeller, assignLeadToBuyer,
  getFirestoreUsers,
} from "../lib/auth";

const statusConfig = {
  New: { color: "text-orange-600", bg: "bg-orange-50 border-orange-200", icon: AlertCircle },
  "In Progress": { color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: Clock },
  Closed: { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  "Not Interested": { color: "text-gray-500", bg: "bg-gray-100 border-gray-200", icon: XCircle },
};

const NATURE_OF_BUSINESS_OPTIONS = [
  "Manufacturer",
  "Brand Owner",
  "Distributor",
  "Whole seller",
  "Trader",
  "Super Stockiest"
];

const CATEGORIES = [
  "Food & Beverage", "Health & Beauty", "Pharmaceuticals", "Apparel & Fashion",
  "Chemicals", "Home Supplies", "Construction & Real Estate", "Electronics & Electrical Supplies",
  "Agriculture", "Automobile", "Packaging & Paper", "Hospital & Medical Supplies",
  "Gifts & Crafts", "Consumer Electronics", "Pipes, Tubes & Fittings", "Industrial Supplies",
  "Computer Hardware & Software", "Energy & Power", "Furniture", "Home Textiles & Furnishings",
  "Hotel Supplies & Equipment", "Jewelry & Gemstones", "Leather & Leather Products", "Machinery",
  "Mineral & Metals", "Plastics & Products", "Printing & Publishing", "Security & Protection",
  "Sports & Entertainment", "Telecommunications", "Textiles & Fabrics", "Toys",
  "Transportation", "Brass Hardware & Components", "Environment & Pollution", "Office & School Supplies",
  "Scientific & Laboratory Instruments", "Business Services"
];

const STATES = [
  "All States", "Delhi", "Maharashtra", "Gujarat", "Karnataka", "Rajasthan",
  "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Punjab", "Haryana",
  "Madhya Pradesh", "Bihar", "Telangana", "Andhra Pradesh", "Kerala",
  "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh",
  "Goa", "Chhattisgarh", "Jammu and Kashmir", "Chandigarh"
];

const isBadSlug = (s, id, uid) => {
  if (!s || typeof s !== "string") return true;
  const tr = s.trim();
  if (!tr) return true;
  if (tr === id || tr === uid) return true;
  if (/^[a-zA-Z0-9]{20}$/.test(tr)) return true;
  return false;
};

const generateCleanSlug = (...candidates) => {
  for (const c of candidates) {
    if (!c || typeof c !== "string") continue;
    const clean = c
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (clean.length >= 2) return clean;
  }
  return "";
};

const formatTime = (ts) => {
  if (!ts) return "—";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

// Resilient helper to match categories (handles plural, singular, subwords)
const matchCategoryHelper = (itemCategory, selectedCategory) => {
  if (!selectedCategory || selectedCategory === "All") return true;
  if (!itemCategory) return false;
  
  const norm = (s) => (s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
  const targetNorm = norm(selectedCategory);
  const cNorm = norm(itemCategory);
  
  if (!cNorm) return false;
  if (cNorm === targetNorm || cNorm.includes(targetNorm) || targetNorm.includes(cNorm)) return true;

  const keywords = [
    "food", "beverag", "health", "beaut", "pharma", "apparel", "fashion",
    "chemic", "home", "household", "construct", "consturct", "electr", "agri",
    "auto", "packag", "hospit", "medic", "gift", "craft", "pipe", "tube",
    "industr", "comput", "softwar", "energy", "power", "furnit", "textil",
    "hotel", "jewel", "leather", "machin", "metal", "mineral", "plastic",
    "print", "secur", "sport", "telecom", "toy", "transport", "brass",
    "environ", "offic", "scientif", "business"
  ];
  
  for (const kw of keywords) {
    if (cNorm.includes(kw) && targetNorm.includes(kw)) return true;
  }
  return false;
};

// Resilient helper to match states
const matchStateHelper = (itemState, selectedState) => {
  if (!selectedState || selectedState === "All States") return true;
  if (!itemState) return false;
  const sTarget = selectedState.toLowerCase().trim();
  const sItem = (typeof itemState === "string" ? itemState : "").toLowerCase().trim();
  if (sItem === sTarget || sItem.includes(sTarget) || sTarget.includes(sItem)) return true;
  if (sTarget === "maharashtra" && sItem.includes("महाराष्ट्र")) return true;
  if (sTarget === "delhi" && (sItem.includes("new delhi") || sItem.includes("ncr"))) return true;
  return false;
};

// Resilient helper to match cities
const matchCityHelper = (itemCity, queryCity) => {
  if (!queryCity || !queryCity.trim()) return true;
  const q = queryCity.toLowerCase().trim();
  const c = (typeof itemCity === "string" ? itemCity : "").toLowerCase().trim();
  return c.includes(q) || q.includes(c);
};

// Field extractors for Lead documents
export const getLeadNatureOfBusiness = (lead) => {
  if (lead.natureOfBusiness) return lead.natureOfBusiness;
  if (lead.businessType) return lead.businessType;
  if (lead.buyerType) return lead.buyerType;
  const text = `${lead.service || ""} ${lead.requirements || ""} ${lead.message || ""}`.toLowerCase();
  for (const opt of NATURE_OF_BUSINESS_OPTIONS) {
    if (text.includes(opt.toLowerCase())) return opt;
  }
  if (text.includes("wholesaler") || text.includes("whole-seller")) return "Whole seller";
  if (text.includes("super-stockist") || text.includes("super stockist")) return "Super Stockiest";
  return "";
};

export const getLeadCategory = (lead) => {
  if (lead.category) return lead.category;
  if (lead.productCategory) return lead.productCategory;
  if (Array.isArray(lead.productCategories) && lead.productCategories.length > 0) {
    const c = lead.productCategories[0];
    return typeof c === "string" ? c : (c.name || c.label || "");
  }
  if (lead.service && lead.service !== "Buyer Listing" && lead.service !== "Seller Listing") {
    return lead.service;
  }
  return "";
};

export const getLeadState = (lead) => {
  if (lead.state && lead.state !== "Select State") return lead.state.trim();
  if (lead.location && lead.location !== "Verify Location" && lead.location !== "Please verify") {
    const loc = lead.location.trim();
    const found = STATES.find(s => s !== "All States" && loc.toLowerCase().includes(s.toLowerCase()));
    if (found) return found;
    return loc;
  }
  return "";
};

export const getLeadCity = (lead) => {
  if (lead.city) return lead.city.trim();
  if (lead.location && lead.location !== "Verify Location" && lead.location !== "Please verify") {
    if (lead.location.includes(",")) {
      return lead.location.split(",")[0].trim();
    }
    const isState = STATES.some(s => s.toLowerCase() === lead.location.toLowerCase().trim());
    if (!isState) return lead.location.trim();
  }
  return "";
};

function LeadDetailsModal({ lead, onClose, onUpdate, sellers, buyers, currentUser, isAdmin, onOpenAssign }) {
  const [remark, setRemark] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(lead?.status || "New");
  const [followUpDate, setFollowUpDate] = useState(lead?.followUpDate || "");
  const [selectedNature, setSelectedNature] = useState(getLeadNatureOfBusiness(lead));
  const [selectedCategory, setSelectedCategory] = useState(lead?.displayCategory || getLeadCategory(lead));
  const [selectedState, setSelectedState] = useState(lead?.displayState || getLeadState(lead));
  const [selectedCity, setSelectedCity] = useState(lead?.displayCity || getLeadCity(lead));
  const [updating, setUpdating] = useState(false);

  const isSelfBuyer = !!(
    (lead?.buyerSlug && lead?.assignedToBuyerSlug === lead?.buyerSlug) ||
    (lead?.buyerId && lead?.assignedToBuyerSlug && !lead?.assignedToSellerSlug) ||
    (lead?.profileId?.startsWith("KIB") && lead?.assignedToBuyerSlug && !lead?.assignedToSellerSlug) ||
    (lead?.assignedToBuyerName && (
      lead?.assignedToBuyerName === lead?.buyerName || 
      lead?.assignedToBuyerName === lead?.company || 
      lead?.assignedToBuyerName === lead?.name
    ))
  );
  const isSelfSeller = !!(
    (lead?.sellerSlug && lead?.assignedToSellerSlug === lead?.sellerSlug) ||
    (lead?.sellerId && lead?.assignedToSellerSlug && !lead?.assignedToBuyerSlug) ||
    (lead?.profileId?.startsWith("KIS") && lead?.assignedToSellerSlug && !lead?.assignedToBuyerSlug) ||
    (lead?.assignedToSellerName && (
      lead?.assignedToSellerName === lead?.sellerName || 
      lead?.assignedToSellerName === lead?.company || 
      lead?.assignedToSellerName === lead?.name
    ))
  );
  const modalHasSellerAssign = !!lead?.assignedToSellerSlug && !isSelfSeller;
  const modalHasBuyerAssign = !!lead?.assignedToBuyerSlug && !isSelfBuyer;
  const modalIsAssigned = modalHasSellerAssign || modalHasBuyerAssign;

  const handleSaveUpdates = async () => {
    setUpdating(true);
    let actionParts = [];
    let updates = {};
    
    if (remark.trim()) {
      actionParts.push(`Added remark: ${remark}`);
    }
    if (selectedStatus !== (lead?.status || "New")) {
      actionParts.push(`Changed status to ${selectedStatus}`);
      updates.status = selectedStatus;
    }
    if (followUpDate !== (lead?.followUpDate || "")) {
      actionParts.push(`Set follow up date to ${followUpDate}`);
      updates.followUpDate = followUpDate;
    }
    if (selectedNature !== getLeadNatureOfBusiness(lead)) {
      actionParts.push(`Updated nature of business to ${selectedNature}`);
      updates.natureOfBusiness = selectedNature;
    }
    if (selectedCategory !== getLeadCategory(lead)) {
      actionParts.push(`Updated category to ${selectedCategory}`);
      updates.category = selectedCategory;
    }
    if (selectedState !== getLeadState(lead)) {
      actionParts.push(`Updated state to ${selectedState}`);
      updates.state = selectedState;
    }
    if (selectedCity !== getLeadCity(lead)) {
      actionParts.push(`Updated city to ${selectedCity}`);
      updates.city = selectedCity;
    }

    if (actionParts.length === 0) {
      setUpdating(false);
      return;
    }

    await onUpdate(lead.id, updates, {
      action: actionParts.join(", "),
      timestamp: new Date().toISOString(),
      user: currentUser?.name || "System",
      remarkText: remark.trim() || undefined,
      followUp: followUpDate || undefined
    });
    
    setRemark("");
    setUpdating(false);
  };

  const InfoRow = ({ label, value, isBadge }) => (
    <div className="flex py-2 border-b border-gray-50/80 last:border-0 items-start gap-2">
      <div className="w-[110px] sm:w-[130px] text-gray-500 font-medium text-[12px] sm:text-[13px] shrink-0">{label}</div>
      <div className="flex-1 text-gray-900 font-semibold text-[12px] sm:text-[13px] break-words min-w-0">
        {isBadge ? (value && value !== "—" ? <span className="inline-flex px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-bold border border-indigo-100/50">{value}</span> : "—") : (value || "—")}
      </div>
    </div>
  );

  const [mobileTab, setMobileTab] = useState("info");

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-4xl shadow-2xl flex flex-col" style={{ height: '90vh', maxHeight: '720px' }}>

        {/* Mobile tab switcher */}
        <div className="flex md:hidden border-b border-gray-100 bg-gray-50/80 rounded-t-3xl">
          <button onClick={() => setMobileTab("info")}
            className={`flex-1 py-3 text-xs font-bold rounded-tl-3xl transition-all ${mobileTab === "info" ? "bg-white text-orange-600 border-b-2 border-orange-500" : "text-gray-500"}`}>
            Lead Info
          </button>
          <button onClick={() => setMobileTab("history")}
            className={`flex-1 py-3 text-xs font-bold rounded-tr-3xl transition-all ${mobileTab === "history" ? "bg-white text-orange-600 border-b-2 border-orange-500" : "text-gray-500"}`}>
            History ({Array.isArray(lead?.history) ? lead.history.length : 0})
          </button>
          <button onClick={onClose} className="px-4 text-gray-400 hover:text-gray-700 transition">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          
          {/* LEFT PANEL — Lead Info + Actions */}
          <div className={`flex-1 md:w-1/2 flex flex-col border-r border-gray-100 bg-white min-w-0 ${mobileTab === "info" ? "flex" : "hidden md:flex"}`}>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-5">
              
              <div>
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">Lead Information</h4>
                <div className="flex flex-col">
                  <InfoRow label="Profile ID" value={lead?.profileId || `KI${(lead?.id || "").slice(0, 5).toUpperCase().padStart(5, '0')}`} />
                  <InfoRow label="Company" value={lead?.displayCompany || lead?.company || lead?.buyerName} />
                  <InfoRow label="Contact Name" value={lead?.displayName || lead?.name} />
                  <InfoRow label="Mobile" value={lead?.displayPhone || lead?.phone} />
                  <InfoRow label="Email" value={lead?.displayEmail || lead?.email} />
                  <InfoRow label="Category" value={selectedCategory || "—"} isBadge={!!selectedCategory} />
                  <InfoRow label="State" value={selectedState || "—"} />
                  <InfoRow label="City" value={selectedCity || "—"} />
                  <div className="py-2 flex items-start gap-3 border-b border-gray-50 last:border-0">
                    <span className="w-24 sm:w-28 text-gray-400 font-bold text-[11px] sm:text-[12px] flex-shrink-0">Assigned To</span>
                    <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                      <div className="text-gray-900 font-semibold text-[12px] sm:text-[13px] truncate">
                        {modalHasSellerAssign ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200">
                            <Store size={12} className="flex-shrink-0" /> <span className="truncate">{lead.assignedToSellerName}</span> <span className="text-[10px] text-green-600 font-normal">(Seller)</span>
                          </span>
                        ) : modalHasBuyerAssign ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                            <ShoppingBag size={12} className="flex-shrink-0" /> <span className="truncate">{lead.assignedToBuyerName}</span> <span className="text-[10px] text-purple-600 font-normal">(Buyer)</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 font-medium text-xs italic">Not assigned yet</span>
                        )}
                      </div>
                      {isAdmin && onOpenAssign && (
                        <button
                          type="button"
                          onClick={onOpenAssign}
                          className="px-2.5 py-1 text-[11px] font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition border border-orange-200 flex-shrink-0 flex items-center gap-1"
                        >
                          <UserPlus size={11} />
                          <span>{modalIsAssigned ? "Change" : "Assign"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <InfoRow label="Source" value={lead?.source} isBadge={true} />
                  <InfoRow label="Requirement" value={lead?.requirements} />
                  <InfoRow label="Message" value={lead?.message} />
                </div>
              </div>

              {/* Editable Business & Location Details */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Edit2 size={12}/> Update Business & Location
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 outline-none focus:border-orange-400"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 outline-none focus:border-orange-400"
                    >
                      <option value="">Select State</option>
                      {STATES.filter(s => s !== "All States").map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">City</label>
                    <input
                      type="text"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      placeholder="Enter city..."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 outline-none focus:border-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusConfig).map((s) => {
                     const isSel = selectedStatus === s;
                     return (
                       <button key={s} onClick={() => setSelectedStatus(s)}
                         className={`flex-1 min-w-[100px] text-[11px] font-bold py-2 rounded-xl border transition-all ${isSel ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm" : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"}`}>
                         {s}
                       </button>
                     );
                  })}
                </div>
              </div>

              {/* Remarks & Follow-up */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><StickyNote size={12}/> Add Remark</h4>
                <textarea rows={2} value={remark} onChange={e => setRemark(e.target.value)} placeholder="Type a note or remark..." className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-all resize-none mb-3" />
                
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar size={10}/> Follow Up Date</label>
                    <input type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-orange-400" />
                  </div>
                  <button onClick={handleSaveUpdates} disabled={updating} className="flex-[1.4] py-2.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-sm disabled:opacity-70 flex items-center justify-center gap-2">
                    {updating ? <Loader2 size={14} className="animate-spin" /> : <><Send size={12} /> Save Updates</>}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL — Comment History */}
          <div className={`flex-1 md:w-1/2 bg-gray-50/50 flex flex-col min-w-0 ${mobileTab === "history" ? "flex" : "hidden md:flex"}`}>
            <div className="p-4 sm:p-5 border-b border-gray-100 hidden md:flex items-center justify-between sticky top-0 bg-gray-50/50 backdrop-blur-sm z-10">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <History size={14}/> Comment History
              </h4>
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{Array.isArray(lead?.history) ? lead.history.length : 0} notes</span>
                <button onClick={onClose} className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm">
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {(!Array.isArray(lead?.history) || lead.history.length === 0) ? (
                <div className="text-center py-10">
                  <Activity size={24} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-bold text-gray-500">No history yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...lead.history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((h, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[9px]">
                            {(h.user || "S")[0].toUpperCase()}
                          </div>
                          <p className="text-xs font-bold text-gray-900">{h.user || "System"}</p>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(h.timestamp).toLocaleString("en-IN", {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-gray-700 mt-1 mb-2 leading-relaxed">
                        {h.remarkText ? h.remarkText : h.action}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {h.action.includes("Changed status") && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-bold">
                            Status Update
                          </span>
                        )}
                        {h.followUp && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[9px] font-bold border border-orange-100">
                            <Calendar size={9}/> Follow up: {h.followUp}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function BulkAssignModal({ onClose, onConfirm, onUnassign, sellers, buyers, assigning, isBulk = true, isCurrentlyAssigned = false, defaultTab = "seller" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const cleanPartnerName = (val) => {
    if (!val || typeof val !== "string") return "";
    const t = val.trim();
    if (t === "." || t === "-" || t === "—" || t === "null" || t === "undefined" || t === "Unknown") return "";
    return t;
  };

  // Strictly switch between sellers and buyers list based on activeTab
  const currentList = activeTab === "seller" ? (sellers || []) : (buyers || []);
  const s = search.toLowerCase().trim();

  const filtered = currentList.filter(u => {
    if (!s) return true;
    const url = activeTab === "seller" ? `koopindia.com/${u.slug || ""}` : `koopindia.com/buyers/${u.slug || ""}`;
    return (
      (u.name || "").toLowerCase().includes(s) ||
      (u.companyName || "").toLowerCase().includes(s) ||
      (u.contactName || "").toLowerCase().includes(s) ||
      (u.slug || "").toLowerCase().includes(s) ||
      url.toLowerCase().includes(s) ||
      (u.category || "").toLowerCase().includes(s) ||
      (u.city || "").toLowerCase().includes(s) ||
      (u.state || "").toLowerCase().includes(s) ||
      (u.email || "").toLowerCase().includes(s) ||
      (u.phone || "").includes(s) ||
      (u.profileId || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-black text-gray-900 text-lg">{isBulk ? "Bulk Assign Leads" : "Assign Lead to Client"}</h3>
            <p className="text-gray-500 text-xs mt-0.5">Select a seller or buyer to assign this lead to.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <X size={16} />
          </button>
        </div>

        {/* Tab switcher + search */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex p-1.5 bg-gray-100/80 rounded-2xl mb-4 relative">
            <button
              type="button"
              onClick={() => { setActiveTab("seller"); setSelectedUser(null); setSearch(""); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === "seller" ? "bg-white shadow-sm text-gray-900 border border-gray-200/60" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Store size={14} className={activeTab === "seller" ? "text-orange-500" : "text-gray-400"} />
              <span>Assign to Seller</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("buyer"); setSelectedUser(null); setSearch(""); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === "buyer" ? "bg-white shadow-sm text-gray-900 border border-gray-200/60" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <ShoppingBag size={14} className={activeTab === "buyer" ? "text-orange-500" : "text-gray-400"} />
              <span>Assign to Buyer</span>
            </button>
          </div>
          
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={activeTab === "seller" ? "Search sellers by name, URL, city, phone..." : "Search buyers by name, URL, city, phone..."}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition"
            />
          </div>
        </div>

        {/* List of partners matching reference design */}
        <div className="p-3 h-[300px] overflow-y-auto custom-scrollbar space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">
              <Users size={32} className="mx-auto text-gray-300 mb-2 opacity-60" />
              <p>No {activeTab === "seller" ? "sellers" : "buyers"} found.</p>
            </div>
          ) : (
            filtered.map((u) => {
              const isSelected = (selectedUser?.id && selectedUser.id === u.id) || (selectedUser?.slug && selectedUser.slug === u.slug);
              const displayName = cleanPartnerName(u.companyName) || cleanPartnerName(u.name) || cleanPartnerName(u.contactName) || cleanPartnerName(u.buyerName) || (!isBadSlug(u.slug, u.id, u.userId) ? u.slug : "") || "Partner";
              const slugText = !isBadSlug(u.slug, u.id, u.userId)
                ? u.slug
                : (generateCleanSlug(u.companyName, u.buyerName, u.name, u.contactName, u.email?.split("@")[0], u.profileId) || (activeTab === "seller" ? "seller" : "buyer"));

              return (
                <div
                  key={u.id || u.slug || u.userId}
                  onClick={() => setSelectedUser(u)}
                  className={`px-3.5 py-3 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${
                    isSelected ? "bg-slate-100/90 shadow-xs" : "hover:bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      isSelected ? "bg-slate-300 text-slate-800" : "bg-slate-200/70 text-slate-600"
                    }`}>
                      {(displayName[0] || (activeTab === "seller" ? "S" : "B")).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate tracking-tight">
                        {displayName}
                      </p>
                      <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                        {slugText}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0 ml-3" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          {!isBulk && isCurrentlyAssigned && onUnassign ? (
            <button
              onClick={onUnassign}
              disabled={assigning}
              className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition"
            >
              Remove Assignment
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition">Cancel</button>
            <button
              onClick={() => onConfirm(selectedUser, activeTab)}
              disabled={!selectedUser || assigning}
              className="px-5 py-2 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {assigning ? <Loader2 size={14} className="animate-spin" /> : "Confirm Assignment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterState, setFilterState] = useState("All States");
  const [filterCity, setFilterCity] = useState("");
  const [filterAssignment, setFilterAssignment] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selected, setSelected] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [assignDropId, setAssignDropId] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [notesMap, setNotesMap] = useState({});
  const [showClientModal, setShowClientModal] = useState(false);
  const [updatingLead, setUpdatingLead] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [bulkAssigning, setBulkAssigning] = useState(false);

  const currentUser = getCurrentUser();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    const handler = (e) => { if (!e.target.closest("[data-dropdown]")) setAssignDropId(null); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        let snap;
        try {
          snap = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc")));
        } catch {
          snap = await getDocs(collection(db, "leads"));
        }
        let allLeads = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (!isAdmin) {
          if (currentUser?.role === "seller") {
            allLeads = allLeads.filter((l) =>
              (currentUser?.linkedSlug && (l.assignedToSellerSlug === currentUser.linkedSlug || l.sellerSlug === currentUser.linkedSlug)) ||
              (currentUser?.linkedId && (l.sellerId === currentUser.linkedId || l.assignedToSellerId === currentUser.linkedId)) ||
              (currentUser?.id && l.assignedTo === currentUser.id)
            );
          } else if (currentUser?.role === "buyer") {
            allLeads = allLeads.filter((l) =>
              (currentUser?.linkedSlug && (l.assignedToBuyerSlug === currentUser.linkedSlug || l.buyerSlug === currentUser.linkedSlug)) ||
              (currentUser?.linkedId && (l.buyerId === currentUser.linkedId || l.assignedToBuyerId === currentUser.linkedId)) ||
              (currentUser?.id && l.assignedTo === currentUser.id)
            );
          } else {
            allLeads = allLeads.filter((l) => l.assignedTo === currentUser?.id);
          }
        }
        setLeads(allLeads);
      } catch (e) {
        console.error("Leads load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isAdmin, currentUser?.id, currentUser?.linkedSlug, currentUser?.linkedId]);

  useEffect(() => {
    if (!isAdmin) return;
    getFirestoreUsers().then(setAdminUsers).catch(() => {});
    
    const loadSellers = async () => {
      try {
        const [sellersSnap, sellerUsersSnap] = await Promise.all([
          getDocs(collection(db, "sellers")),
          getDocs(collection(db, "seller_users")).catch(() => ({ docs: [] }))
        ]);

        const sellerUsersMap = {};
        sellerUsersSnap.docs?.forEach(d => {
          const u = d.data();
          const userObj = {
            userId: d.id,
            name: u.name || u.contact || "",
            email: u.email || "",
            phone: u.phone || "",
            companyName: u.companyName || "",
            linkedSlug: u.linkedSlug || "",
            linkedId: u.linkedId || "",
            status: u.status || "active",
          };
          if (u.linkedSlug) sellerUsersMap[u.linkedSlug] = userObj;
          if (u.linkedId) sellerUsersMap[u.linkedId] = userObj;
          if (u.email) sellerUsersMap[u.email.toLowerCase()] = userObj;
        });

        const list = [];
        const seenSlugs = new Set();

        sellersSnap.docs.forEach(d => {
          const data = d.data();
          const status = (data.status || "live").toLowerCase();
          // Keep only live/active sellers (omit paused or draft)
          if (status === "paused" || status === "draft") return;

          const rawSlug = data.slug;
          const cleanCompany = (data.companyName && data.companyName !== "." && data.companyName !== "-") ? data.companyName.trim() : "";
          const cleanSellerName = (data.name && data.name !== "." && data.name !== "-") ? data.name.trim() : "";
          const cleanContact = (data.contact && data.contact !== "." && data.contact !== "-") ? data.contact.trim() : "";

          const slug = (!isBadSlug(rawSlug, d.id))
            ? rawSlug
            : (generateCleanSlug(cleanCompany, cleanSellerName, cleanContact, data.email?.split("@")[0], data.profileId) || "seller");

          seenSlugs.add(slug);
          const userAcc = sellerUsersMap[slug] || sellerUsersMap[d.id] || (data.email ? sellerUsersMap[data.email.toLowerCase()] : null);
          const cleanUserName = (userAcc?.name && userAcc.name !== ".") ? userAcc.name.trim() : "";
          const bestSellerName = cleanCompany || cleanSellerName || cleanContact || cleanUserName || slug;

          list.push({
            id: d.id,
            profileId: data.profileId || `KIS${d.id.slice(0, 5).toUpperCase()}`,
            slug: slug,
            name: bestSellerName,
            companyName: cleanCompany || cleanSellerName,
            contactName: cleanContact || cleanUserName,
            phone: data.phone || userAcc?.phone || "",
            email: data.email || userAcc?.email || "",
            category: data.category || "",
            state: data.state || "",
            city: data.city || "",
            isLive: true,
            hasUserAccount: !!userAcc,
            userStatus: userAcc?.status || "live",
          });
        });

        // Also add active seller_users from seller_users collection if not already present
        sellerUsersSnap.docs?.forEach(d => {
          const u = d.data();
          const userStatus = (u.status || "active").toLowerCase();
          if (userStatus === "paused" || userStatus === "suspended") return;
          const rawSlug = u.linkedSlug;
          const slug = (!isBadSlug(rawSlug, d.id, u.linkedId))
            ? rawSlug
            : (generateCleanSlug(u.companyName, u.name, u.email?.split("@")[0], u.profileId) || "seller");
          if (slug && seenSlugs.has(slug)) return;
          if (slug) seenSlugs.add(slug);

          list.push({
            id: u.linkedId || d.id,
            userId: d.id,
            profileId: u.profileId || "",
            slug: slug,
            name: u.companyName || u.name || "Seller User",
            companyName: u.companyName || "",
            contactName: u.name || "",
            phone: u.phone || "",
            email: u.email || "",
            category: u.category || "",
            state: u.state || "",
            city: u.city || "",
            isLive: true,
            hasUserAccount: true,
            userStatus: userStatus,
          });
        });

        list.sort((a, b) => (a.companyName || a.name || "").localeCompare(b.companyName || b.name || ""));
        setSellers(list);
      } catch (e) {
        console.error("Failed to load sellers:", e);
      }
    };

    const loadBuyers = async () => {
      try {
        const [buyersSnap, buyerUsersSnap] = await Promise.all([
          getDocs(collection(db, "buyers")),
          getDocs(collection(db, "buyer_users")).catch(() => ({ docs: [] }))
        ]);

        const buyerUsersMap = {};
        buyerUsersSnap.docs?.forEach(d => {
          const u = d.data();
          const userObj = {
            userId: d.id,
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            companyName: u.companyName || "",
            linkedSlug: u.linkedSlug || "",
            linkedId: u.linkedId || "",
            status: u.status || "active",
          };
          if (u.linkedSlug) buyerUsersMap[u.linkedSlug] = userObj;
          if (u.linkedId) buyerUsersMap[u.linkedId] = userObj;
          if (u.email) buyerUsersMap[u.email.toLowerCase()] = userObj;
        });

        const list = [];
        const seenSlugs = new Set();

        buyersSnap.docs.forEach(d => {
          const data = d.data();
          const status = (data.status || "live").toLowerCase();
          // Keep only live/active buyers (omit paused or draft)
          if (status === "paused" || status === "draft") return;

          const rawSlug = data.slug;
          const cleanCompany = (data.companyName && data.companyName !== "." && data.companyName !== "-") ? data.companyName.trim() : "";
          const cleanBuyerName = (data.buyerName && data.buyerName !== "." && data.buyerName !== "-") ? data.buyerName.trim() : "";
          const cleanContact = (data.contactName && data.contactName !== "." && data.contactName !== "-") ? data.contactName.trim() : "";

          const slug = (!isBadSlug(rawSlug, d.id))
            ? rawSlug
            : (generateCleanSlug(cleanCompany, cleanBuyerName, cleanContact, data.email?.split("@")[0], data.contactEmail?.split("@")[0], data.profileId) || "buyer");

          seenSlugs.add(slug);
          const userAcc = buyerUsersMap[slug] || buyerUsersMap[d.id] || (data.email ? buyerUsersMap[data.email.toLowerCase()] : null);
          const cleanUserName = (userAcc?.name && userAcc.name !== ".") ? userAcc.name.trim() : "";
          const bestBuyerName = cleanCompany || cleanBuyerName || cleanContact || cleanUserName || slug;

          list.push({
            id: d.id,
            profileId: data.profileId || `KIB${d.id.slice(0, 5).toUpperCase()}`,
            slug: slug,
            name: bestBuyerName,
            companyName: cleanCompany || cleanBuyerName,
            contactName: cleanContact || cleanUserName,
            phone: data.phone || data.contactPhone || userAcc?.phone || "",
            email: data.email || data.contactEmail || userAcc?.email || "",
            category: data.category || "",
            productCategories: data.productCategories || [],
            state: data.state || "",
            city: data.city || data.district || "",
            district: data.district || "",
            requirements: data.requirements || "",
            isLive: true,
            hasUserAccount: !!userAcc,
            userStatus: userAcc?.status || "live",
          });
        });

        // Also add active buyer_users from buyer_users collection if not already in list
        buyerUsersSnap.docs?.forEach(d => {
          const u = d.data();
          const userStatus = (u.status || "active").toLowerCase();
          if (userStatus === "paused" || userStatus === "suspended") return;
          const rawSlug = u.linkedSlug;
          const slug = (!isBadSlug(rawSlug, d.id, u.linkedId))
            ? rawSlug
            : (generateCleanSlug(u.companyName, u.name, u.email?.split("@")[0], u.profileId) || "buyer");
          if (slug && seenSlugs.has(slug)) return;
          if (slug) seenSlugs.add(slug);

          list.push({
            id: u.linkedId || d.id,
            userId: d.id,
            profileId: u.profileId || "",
            slug: slug,
            name: u.companyName || u.name || "Buyer User",
            companyName: u.companyName || "",
            contactName: u.name || "",
            phone: u.phone || "",
            email: u.email || "",
            category: u.category || "",
            state: u.state || "",
            city: u.city || "",
            isLive: true,
            hasUserAccount: true,
            userStatus: userStatus,
          });
        });

        list.sort((a, b) => (a.companyName || a.name || "").localeCompare(b.companyName || b.name || ""));
        setBuyers(list);
      } catch (e) {
        console.error("Failed to load buyers:", e);
      }
    };

    loadSellers();
    loadBuyers();
  }, [isAdmin]);
  const buyersMap = useMemo(() => {
    const map = {};
    for (const b of buyers) {
      if (b.id) map[b.id] = b;
      if (b.profileId) map[b.profileId] = b;
      if (b.slug) map[b.slug] = b;
    }
    return map;
  }, [buyers]);

  const sellersMap = useMemo(() => {
    const map = {};
    for (const s of sellers) {
      if (s.id) map[s.id] = s;
      if (s.profileId) map[s.profileId] = s;
      if (s.slug) map[s.slug] = s;
    }
    return map;
  }, [sellers]);

  const getEnrichedLead = (l) => {
    const buyer = buyersMap[l.buyerId] || buyersMap[l.profileId] || buyersMap[l.buyerSlug] || {};
    const seller = sellersMap[l.sellerId] || sellersMap[l.profileId] || sellersMap[l.sellerSlug] || {};

    let phone = l.phone || l.mobile || buyer.phone || buyer.contactPhone || seller.phone || "";
    let email = l.email || l.mail || buyer.email || buyer.contactEmail || seller.email || "";

    let category = getLeadCategory(l);
    if (!category || category === "Buyer Listing" || category === "Seller Listing") {
      category = buyer.category || seller.category || "";
      if (!category && Array.isArray(buyer.productCategories) && buyer.productCategories.length > 0) {
        const c = buyer.productCategories[0];
        category = typeof c === "string" ? c : (c?.name || c?.label || "");
      }
    }

    let state = getLeadState(l);
    if (!state || state === "Verify Location" || state === "Please verify") {
      state = (buyer.state && buyer.state !== "Verify Location" && buyer.state !== "Please verify")
        ? buyer.state
        : (seller.state && seller.state !== "Verify Location" ? seller.state : "");
    }

    let city = getLeadCity(l);
    if (!city || city === "Verify Location" || city === "Please verify") {
      city = buyer.city || buyer.district || seller.city || "";
    }

    // Smart fallback: if city or state is still blank, check if company/name contains "City, State"
    const companyRaw = l.company || l.buyerName || buyer.companyName || l.sellerName || seller.companyName || l.name || "";
    if ((!state || !city) && companyRaw.includes(",")) {
      const parts = companyRaw.split(",").map(p => p.trim());
      if (parts.length >= 2) {
        const potentialCity = parts[0];
        const potentialState = parts[1];
        const stateMatch = STATES.find(s => s !== "All States" && potentialState.toLowerCase().includes(s.toLowerCase()));
        if (stateMatch) {
          if (!state) state = stateMatch;
          if (!city) city = potentialCity;
        }
      }
    }

    const company = companyRaw;
    const name = l.name || buyer.contactName || seller.contact || "";
    const req = l.requirements || l.productName || (Array.isArray(buyer.requirements) ? buyer.requirements.join(", ") : "") || (l.service && l.service !== "Buyer Listing" && l.service !== "Seller Listing" ? l.service : "") || "";

    const isSelfBuyer = !!(
      (l.buyerSlug && l.assignedToBuyerSlug === l.buyerSlug) ||
      (l.buyerId && l.assignedToBuyerSlug && !l.assignedToSellerSlug) ||
      (l.profileId?.startsWith("KIB") && l.assignedToBuyerSlug && !l.assignedToSellerSlug) ||
      (l.assignedToBuyerName && (
        l.assignedToBuyerName === l.buyerName || 
        l.assignedToBuyerName === l.company || 
        l.assignedToBuyerName === l.name ||
        l.assignedToBuyerName === name ||
        l.assignedToBuyerName === company
      ))
    );
    const isSelfSeller = !!(
      (l.sellerSlug && l.assignedToSellerSlug === l.sellerSlug) ||
      (l.sellerId && l.assignedToSellerSlug && !l.assignedToBuyerSlug) ||
      (l.profileId?.startsWith("KIS") && l.assignedToSellerSlug && !l.assignedToBuyerSlug) ||
      (l.assignedToSellerName && (
        l.assignedToSellerName === l.sellerName || 
        l.assignedToSellerName === l.company || 
        l.assignedToSellerName === l.name ||
        l.assignedToSellerName === name ||
        l.assignedToSellerName === company
      ))
    );
    const hasSellerAssign = !!l.assignedToSellerSlug && !isSelfSeller;
    const hasBuyerAssign = !!l.assignedToBuyerSlug && !isSelfBuyer;
    const isActuallyAssigned = hasSellerAssign || hasBuyerAssign;

    return {
      ...l,
      displayCompany: company,
      displayName: name,
      displayPhone: phone,
      displayEmail: email,
      displayCategory: category,
      displayState: state,
      displayCity: city,
      displayRequirement: req || (l.service || "—"),
      hasSellerAssign,
      hasBuyerAssign,
      isActuallyAssigned,
    };
  };
  // Comprehensive filter logic for enriched leads
  const filtered = leads.map(getEnrichedLead).filter((l) => {
    const s = search.toLowerCase().trim();
    const matchSearch =
      !s ||
      (l.displayCompany || "").toLowerCase().includes(s) ||
      (l.displayName || "").toLowerCase().includes(s) ||
      (l.displayPhone || "").includes(s) ||
      (l.displayEmail || "").toLowerCase().includes(s) ||
      (l.displayCategory || "").toLowerCase().includes(s) ||
      (l.displayState || "").toLowerCase().includes(s) ||
      (l.displayCity || "").toLowerCase().includes(s) ||
      (l.displayRequirement || "").toLowerCase().includes(s) ||
      (l.profileId || "").toLowerCase().includes(s);

    const matchStatus = filterStatus === "All" || (l.status || "New") === filterStatus;
    const matchSource = filterSource === "All" || l.source === filterSource;

    const matchCat =
      filterCategory === "All" ||
      matchCategory(l.displayCategory, filterCategory);

    const matchSt =
      filterState === "All States" ||
      matchState(l.displayState, filterState);

    const matchCt =
      !filterCity.trim() ||
      matchCity(l.displayCity, filterCity);

    const matchAssignment =
      filterAssignment === "All" ||
      (filterAssignment === "Assigned" && l.isActuallyAssigned) ||
      (filterAssignment === "Unassigned" && !l.isActuallyAssigned);

    return matchSearch && matchStatus && matchSource && matchCat && matchSt && matchCt && matchAssignment;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus, filterSource, filterCategory, filterState, filterCity, filterAssignment]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedLeads = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "leads", id), { status });
      setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
      if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
    } catch (e) { console.error("Status update error:", e); }
  };

  const deleteLead = async (id) => {
    try {
      await deleteDoc(doc(db, "leads", id));
      setLeads((p) => p.filter((l) => l.id !== id));
      if (selected?.id === id) setSelected(null);
      setDelConfirm(null);
    } catch (e) {
      console.error(e);
      alert("Failed to delete lead. Please try again.");
    }
  };

  const handleUpdateLeadDetails = async (id, updatedData, newHistoryItem) => {
    setUpdatingLead(true);
    try {
      const firestoreData = { ...updatedData };
      if (newHistoryItem) {
        firestoreData.history = arrayUnion(newHistoryItem);
      }
      await updateDoc(doc(db, "leads", id), firestoreData);
      
      const localUpdatedData = { ...updatedData };
      if (newHistoryItem) {
        const currentLead = leads.find(l => l.id === id);
        const currentHistory = Array.isArray(currentLead?.history) ? currentLead.history : [];
        localUpdatedData.history = [...currentHistory, newHistoryItem];
      }
      
      setLeads(p => p.map(l => l.id === id ? { ...l, ...localUpdatedData } : l));
      if (selected?.id === id) setSelected(prev => ({ ...prev, ...localUpdatedData }));
    } catch (e) {
      console.error(e);
      alert("Failed to update lead details. Please try again.");
    } finally {
      setUpdatingLead(false);
    }
  };

  const handleAssignSeller = async (lead, seller) => {
    setAssigning(true);
    const targetSlug = seller?.slug || seller?.linkedSlug || null;
    const targetName = seller?.companyName || seller?.name || null;
    const targetId = seller?.id || seller?.linkedId || null;
    const result = await assignLeadToSeller(lead.id, targetSlug, targetName, targetId);
    if (result.success) {
      const updated = { 
        ...lead, 
        assignedToSellerSlug: targetSlug, 
        assignedToSellerName: targetName,
        assignedToSellerId: targetId,
        assignedToSellerAt: targetSlug ? new Date() : null,
        assignedToBuyerSlug: null,
        assignedToBuyerName: null,
        assignedToBuyerId: null,
      };
      setLeads(leads.map((l) => (l.id === lead.id ? updated : l)));
      if (selected?.id === lead.id) setSelected(updated);
    }
    setAssigning(false);
    setAssignDropId(null);
  };

  const handleBulkAssignConfirm = async (user, type) => {
    setBulkAssigning(true);
    const targetSlug = user?.slug || user?.linkedSlug || null;
    const targetName = user?.companyName || user?.name || user?.buyerName || null;
    const targetId = user?.id || user?.linkedId || null;
    try {
      for (const leadId of selectedLeads) {
        if (type === "seller") {
          await assignLeadToSeller(leadId, targetSlug, targetName, targetId);
        } else {
          await assignLeadToBuyer(leadId, targetSlug, targetName, targetId);
        }
      }
      
      setLeads(leads.map(l => {
        if (selectedLeads.includes(l.id)) {
           return {
              ...l,
              ...(type === "seller" ? {
                assignedToSellerSlug: targetSlug,
                assignedToSellerName: targetName,
                assignedToSellerId: targetId,
                assignedToSellerAt: new Date(),
                assignedToBuyerSlug: null,
                assignedToBuyerName: null,
                assignedToBuyerId: null
              } : {
                assignedToBuyerSlug: targetSlug,
                assignedToBuyerName: targetName,
                assignedToBuyerId: targetId,
                assignedToBuyerAt: new Date(),
                assignedToSellerSlug: null,
                assignedToSellerName: null,
                assignedToSellerId: null
              })
           };
        }
        return l;
      }));
      setSelectedLeads([]);
      setShowBulkAssign(false);
    } catch(e) {
      console.error(e);
      alert("Failed to assign leads. Please try again.");
    }
    setBulkAssigning(false);
  };

  const handleAssignBuyer = async (lead, buyer) => {
    setAssigning(true);
    const targetSlug = buyer?.slug || buyer?.linkedSlug || null;
    const targetName = buyer?.companyName || buyer?.name || buyer?.buyerName || null;
    const targetId = buyer?.id || buyer?.linkedId || null;
    const result = await assignLeadToBuyer(lead.id, targetSlug, targetName, targetId);
    if (result.success) {
      const updated = { 
        ...lead, 
        assignedToBuyerSlug: targetSlug, 
        assignedToBuyerName: targetName,
        assignedToBuyerId: targetId,
        assignedToBuyerAt: targetSlug ? new Date() : null,
        assignedToSellerSlug: null,
        assignedToSellerName: null,
        assignedToSellerId: null,
      };
      setLeads(leads.map((l) => (l.id === lead.id ? updated : l)));
      if (selected?.id === lead.id) setSelected(updated);
    }
    setAssigning(false);
    setAssignDropId(null);
  };

  const handleUnassignLead = async (lead) => {
    if (!lead?.id) return;
    setAssigning(true);
    try {
      const updates = {
        assignedToSellerSlug: null,
        assignedToSellerName: null,
        assignedToSellerId: null,
        assignedToSellerAt: null,
        assignedToBuyerSlug: null,
        assignedToBuyerName: null,
        assignedToBuyerId: null,
        assignedToBuyerAt: null,
        assignedTo: null,
      };
      await updateDoc(doc(db, "leads", lead.id), updates);
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, ...updates } : l)));
      if (selected?.id === lead.id) setSelected((prev) => ({ ...prev, ...updates }));
      setShowClientModal(false);
    } catch (e) {
      console.error("Unassign error:", e);
      alert("Failed to unassign lead.");
    } finally {
      setAssigning(false);
    }
  };

  const counts = {
    New: leads.filter((l) => l.status === "New" || !l.status).length,
    "In Progress": leads.filter((l) => l.status === "In Progress").length,
    Closed: leads.filter((l) => l.status === "Closed").length,
    "Not Interested": leads.filter((l) => l.status === "Not Interested").length,
  };

  const hasActiveFilters = search || filterStatus !== "All" || filterCategory !== "All" || filterState !== "All States" || filterCity || filterAssignment !== "All";

  return (
    <div className="space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Lead Manager</h1>
          <p className="text-gray-500 text-sm">
            {isAdmin ? `All leads — assign to team, sellers, or buyers.` : `Showing your assigned leads (${leads.length}).`}
          </p>
        </div>
        {loading && <div className="flex items-center gap-2 text-gray-400 text-sm"><Loader2 size={16} className="animate-spin" /> Loading leads...</div>}
      </div>

      {/* Status metric badges */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {Object.entries(counts).map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <button key={status} onClick={() => setFilterStatus(status === filterStatus ? "All" : status)}
              className={`bg-white border rounded-xl px-4 py-3 text-left transition-all hover:border-orange-300 shadow-sm ${filterStatus === status ? "border-orange-400 bg-orange-50" : "border-gray-100"}`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={13} className={cfg.color} />
                <p className={`text-xl font-extrabold ${cfg.color}`}>{count}</p>
              </div>
              <p className="text-gray-400 text-[11px] font-semibold">{status}</p>
            </button>
          );
        })}
        </div>
      </div>

      {/* Filter Bar: Search + Nature of Business + Category + State + City */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2.5 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, company, phone, email, product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium rounded-xl pl-9 pr-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-100 transition shadow-xs"
            />
          </div>

          {/* Category Filter */}
          <div className="min-w-[150px]">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-3 py-2.5 outline-none hover:border-gray-300 focus:border-orange-400 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div className="min-w-[130px]">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-3 py-2.5 outline-none hover:border-gray-300 focus:border-orange-400 cursor-pointer"
            >
              {STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="min-w-[130px]">
            <input
              type="text"
              placeholder="Filter by city..."
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium rounded-xl px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition"
            />
          </div>

          {/* Assignment Filter */}
          {isAdmin && (
            <div className="min-w-[140px]">
              <select
                value={filterAssignment}
                onChange={(e) => setFilterAssignment(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-3 py-2.5 outline-none hover:border-gray-300 focus:border-orange-400 cursor-pointer"
              >
                <option value="All">All Leads</option>
                <option value="Unassigned">Unassigned Only</option>
                <option value="Assigned">Assigned Only</option>
              </select>
            </div>
          )}

          {/* Clear all button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearch("");
                setFilterCategory("All");
                setFilterState("All States");
                setFilterCity("");
                setFilterStatus("All");
                setFilterAssignment("All");
              }}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline px-2 cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Selected leads bulk actions */}
        {isAdmin && selectedLeads.length > 0 && (
          <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-xl shadow-sm animate-in fade-in">
            <span className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-xs font-bold">{selectedLeads.length}</span>
            <span className="text-xs font-medium">selected leads</span>
            <button onClick={() => setShowBulkAssign(true)} className="flex items-center gap-1.5 text-xs font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition ml-auto">
              <UserPlus size={13} /> Bulk Assign
            </button>
            <button onClick={() => setSelectedLeads([])} className="p-1 hover:bg-white/10 rounded-lg transition">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className={`bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all shadow-sm ${selected ? "flex-[2]" : "flex-1"}`}>
          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 size={24} className="animate-spin text-orange-400" />
              <span className="text-sm font-semibold">Loading leads from Firestore...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-bold text-gray-500 text-base">
                {!isAdmin ? "No leads assigned to you yet." : hasActiveFilters ? "No matching leads found" : "No leads yet"}
              </p>
              <p className="text-sm mt-1">
                {!isAdmin ? "Contact your admin to assign leads." : "Try adjusting your category, business type, or location filters."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setFilterCategory("All");
                    setFilterState("All States");
                    setFilterCity("");
                    setFilterStatus("All");
                  }}
                  className="mt-4 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold border border-orange-200 hover:bg-orange-100 transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    {isAdmin && (
                      <th className="px-3 py-3 w-[36px]">
                        <input 
                          type="checkbox" 
                          checked={filtered.length > 0 && selectedLeads.length === filtered.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLeads(filtered.map(l => l.id));
                            } else {
                              setSelectedLeads([]);
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                        />
                      </th>
                    )}
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Profile ID</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Company / Name</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Category</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">State</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">City</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Mobile Number</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Mail ID</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Requirement</th>
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Status</th>
                    {isAdmin && <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Assigned To</th>}
                    <th className="text-left px-3 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Time</th>
                    {isAdmin && <th className="px-3 py-3"></th>}
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => {
                    const cfg = statusConfig[lead.status] || statusConfig["New"];
                    const Icon = cfg.icon;
                    const hasSellerAssign = lead.hasSellerAssign;
                    const hasBuyerAssign = lead.hasBuyerAssign;
                    const isActuallyAssigned = lead.isActuallyAssigned;

                    return (
                      <tr key={lead.id}
                        className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer ${selected?.id === lead.id || selectedLeads.includes(lead.id) ? "bg-orange-50/60 border-orange-100" : ""}`}
                        onClick={() => { setSelected(selected?.id === lead.id ? null : lead); setNotesMap(p => ({ ...p, [lead.id]: lead.notes || "" })); }}>
                        {isAdmin && (
                          <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox"
                              checked={selectedLeads.includes(lead.id)}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedLeads(p => [...p, lead.id]);
                                else setSelectedLeads(p => p.filter(id => id !== lead.id));
                              }}
                              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                          </td>
                        )}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-orange-600 font-bold text-xs bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                            {lead.profileId || `KI${(lead.id || "").slice(0, 5).toUpperCase().padStart(5, '0')}`}
                          </span>
                        </td>
                        <td className="px-3 py-3 min-w-[160px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-xs">
                              {((lead.displayCompany || lead.displayName || "?")[0]).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-gray-900 text-xs font-bold truncate max-w-[150px]">{lead.displayCompany || "—"}</p>
                              {lead.displayName && lead.displayName !== lead.displayCompany && (
                                <p className="text-gray-400 text-[10px] truncate max-w-[150px]">{lead.displayName}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {lead.displayCategory ? (
                            <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 max-w-[140px] truncate" title={lead.displayCategory}>
                              {lead.displayCategory}
                            </span>
                          ) : <span className="text-gray-300 text-xs">—</span>}
                        </td>

                        {/* State */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-gray-800 text-xs font-semibold">{lead.displayState || "—"}</span>
                        </td>

                        {/* City */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-gray-800 text-xs font-semibold">{lead.displayCity || "—"}</span>
                        </td>

                        {/* Mobile */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <p className="text-gray-700 text-xs font-medium">{lead.displayPhone || "—"}</p>
                        </td>

                        {/* Email */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <p className="text-gray-700 text-xs font-medium max-w-[140px] truncate" title={lead.displayEmail}>{lead.displayEmail || "—"}</p>
                        </td>

                        {/* Requirement */}
                        <td className="px-3 py-3">
                          <p className="text-gray-700 text-xs truncate max-w-[140px]" title={lead.displayRequirement || "—"}>
                            {lead.displayRequirement || "—"}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border w-fit ${cfg.bg} ${cfg.color}`}>
                            <Icon size={9} /> {lead.status || "New"}
                          </span>
                        </td>

                        {/* Assigned To */}
                        {isAdmin && (
                          <td className="px-3 py-3 min-w-[130px] whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            {isActuallyAssigned ? (
                              <div className="flex flex-col gap-1 items-start">
                                {hasSellerAssign && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-50 text-green-700 border border-green-200 w-fit max-w-[150px] truncate" title={lead.assignedToSellerName}>
                                    <Store size={10} className="flex-shrink-0" /> <span className="truncate">{lead.assignedToSellerName}</span>
                                  </span>
                                )}
                                {hasBuyerAssign && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 w-fit max-w-[150px] truncate" title={lead.assignedToBuyerName}>
                                    <ShoppingBag size={10} className="flex-shrink-0" /> <span className="truncate">{lead.assignedToBuyerName}</span>
                                  </span>
                                )}
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelected(lead); setShowClientModal(true); }}
                                  className="text-[9px] font-bold text-gray-400 hover:text-orange-500 underline decoration-dashed underline-offset-2 transition-colors mt-0.5"
                                >
                                  Change
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelected(lead); setShowClientModal(true); }}
                                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-dashed border-gray-300 text-gray-600 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 bg-white transition-all shadow-xs"
                              >
                                <UserPlus size={12} className="text-orange-500" />
                                <span>Assign</span>
                              </button>
                            )}
                          </td>
                        )}

                        <td className="px-3 py-3 text-gray-400 text-[10px] whitespace-nowrap">
                          {formatTime(lead.assignedToSellerAt || lead.assignedToBuyerAt || lead.createdAt)}
                        </td>

                        {isAdmin && (
                          <td className="px-3 py-3 whitespace-nowrap">
                            <button onClick={(e) => { e.stopPropagation(); setDelConfirm(lead.id); }}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                              <Trash2 size={13} />
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} leads
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .map((p, i, arr) => (
                        <span key={p} className="flex items-center">
                          {i > 0 && p - arr[i - 1] > 1 && <span className="px-2 text-gray-400 text-xs">...</span>}
                          <button
                            onClick={() => setCurrentPage(p)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
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
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {selected && (
          <LeadDetailsModal
            lead={selected}
            onClose={() => setSelected(null)}
            onUpdate={handleUpdateLeadDetails}
            sellers={sellers}
            buyers={buyers}
            isAdmin={isAdmin}
            currentUser={currentUser}
            onOpenAssign={() => setShowClientModal(true)}
          />
        )}
      </div>

      {delConfirm && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-500" size={24} />
            </div>
            <h3 className="font-black text-gray-900 text-lg mb-1">Delete Lead?</h3>
            <p className="text-gray-500 text-sm mb-5">Are you sure you want to delete this lead? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => deleteLead(delConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showBulkAssign && (
        <BulkAssignModal 
          sellers={sellers}
          buyers={buyers}
          assigning={bulkAssigning}
          isBulk={true}
          onClose={() => setShowBulkAssign(false)}
          onConfirm={handleBulkAssignConfirm}
        />
      )}

      {showClientModal && selected && (
        <BulkAssignModal 
          sellers={sellers}
          buyers={buyers}
          assigning={assigning}
          isBulk={false}
          defaultTab={selected.profileId?.startsWith("KIB") || selected.buyerId || selected.buyerSlug ? "seller" : "buyer"}
          isCurrentlyAssigned={!!(selected.assignedToSellerSlug || selected.assignedToBuyerSlug)}
          onClose={() => setShowClientModal(false)}
          onUnassign={() => handleUnassignLead(selected)}
          onConfirm={async (user, type) => {
            if (type === "seller") await handleAssignSeller(selected, user);
            else await handleAssignBuyer(selected, user);
            setShowClientModal(false);
          }}
        />
      )}

    </div>
  );
}
