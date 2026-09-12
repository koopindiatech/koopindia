"use client";
import { useState, useEffect, useRef } from "react";
import {
  Users, Search, Phone, Mail, Building2, Clock,
  CheckCircle2, XCircle, AlertCircle, Trash2,
  Loader2, Package, UserPlus, ChevronDown, X,
  Store, ShoppingBag, UserCheck, StickyNote, ArrowRight, Edit2, History, Send, Calendar, Activity
} from "lucide-react";
import { db } from "../../../lib/firebase";
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

const sourceLabels = {
  contact_page: "Contact Form",
  product_page: "Product Inquiry",
  buyer_page: "Buyer Inquiry",
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

function LeadDetailsModal({ lead, onClose, onUpdate, sellers, buyers, currentUser, isAdmin }) {
  const [remark, setRemark] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(lead?.status || "New");
  const [followUpDate, setFollowUpDate] = useState(lead?.followUpDate || "");
  const [updating, setUpdating] = useState(false);

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

  const leadIdFormatted = `KI${(lead?.id || "").slice(0, 5).toUpperCase().padStart(5, '0')}`;
  
  const InfoRow = ({ label, value, isBadge }) => (
    <div className="flex py-1 border-b border-gray-50/80 last:border-0 items-start">
      <div className="w-[120px] text-gray-500 font-medium text-[13px] shrink-0">{label}</div>
      <div className="flex-1 text-gray-900 font-semibold text-[13px]">
        {isBadge ? (value && value !== "—" ? <span className="inline-flex px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-bold border border-indigo-100/50">{value}</span> : "—") : (value || "—")}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col h-[85vh] max-h-[650px] overflow-hidden border border-gray-100">
                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          
                    <div className="flex-1 w-1/2 flex flex-col border-r border-gray-100 bg-white min-w-0">
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
              
                            <div>
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Lead Information</h4>
                <div className="flex flex-col">
                  <InfoRow label="Name" value={lead?.name} />
                  <InfoRow label="Email" value={lead?.email} />
                  <InfoRow label="Mobile" value={lead?.phone} />
                  <InfoRow label="Follow Up" value={lead?.followUpDate} />
                  <InfoRow label="Message" value={lead?.message} />
                </div>
              </div>

                            <div className="pt-6 border-t border-gray-100">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusConfig).map((s) => {
                     const isSel = selectedStatus === s;
                     return (
                       <button key={s} onClick={() => setSelectedStatus(s)}
                         className={`flex-1 min-w-[120px] text-[11px] font-bold py-2.5 rounded-xl border transition-all ${isSel ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm" : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"}`}>
                         {s}
                       </button>
                     );
                  })}
                </div>
              </div>

                            <div className="pt-6 border-t border-gray-100">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><StickyNote size={12}/> Add Remark</h4>
                <textarea rows={3} value={remark} onChange={e => setRemark(e.target.value)} placeholder="Type a note or remark..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none mb-4" />
                
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Calendar size={10}/> Follow Up Date</label>
                    <input type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-all" />
                  </div>
                  <button onClick={handleSaveUpdates} disabled={updating} className="flex-[1.5] py-2.5 rounded-xl bg-[#ffae86] hover:bg-orange-400 text-white font-bold text-sm transition-all shadow-sm disabled:opacity-70 flex items-center justify-center gap-2">
                    {updating ? <Loader2 size={14} className="animate-spin" /> : <><Send size={12} /> Save Updates</>}
                  </button>
                </div>
              </div>

            </div>
          </div>

                    <div className="flex-1 w-1/2 bg-gray-50/50 flex flex-col min-w-0">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-gray-50/50 backdrop-blur-sm z-10">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <History size={14}/> Comment History
              </h4>
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{Array.isArray(lead?.history) ? lead.history.length : 0} note</span>
                <button onClick={onClose} className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm">
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {(!Array.isArray(lead?.history) || lead.history.length === 0) ? (
                <div className="text-center py-10">
                  <Activity size={24} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-bold text-gray-500">No history yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...lead.history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((h, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">
                            {(h.user || "S")[0].toUpperCase()}
                          </div>
                          <p className="text-xs font-bold text-gray-900">{h.user || "System"}</p>
                        </div>
                        <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(h.timestamp).toLocaleString("en-IN", {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mt-2 mb-3 leading-relaxed">
                        {h.remarkText ? h.remarkText : h.action}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {h.action.includes("Changed status") && (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold">
                            Status Update
                          </span>
                        )}
                        {h.followUp && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 rounded-md text-[10px] font-bold border border-orange-100">
                            <Calendar size={10}/> Follow up: {h.followUp}
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

function BulkAssignModal({ onClose, onConfirm, sellers, buyers, assigning }) {
  const [activeTab, setActiveTab] = useState("seller");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const lists = { seller: sellers, buyer: buyers };
  const filtered = (lists[activeTab] || []).filter(u => 
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-black text-gray-900 text-lg">Bulk Assign Leads</h3>
            <p className="text-gray-500 text-xs mt-1">Select a user to assign all selected leads.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <X size={16} />
          </button>
        </div>

                <div className="p-5 border-b border-gray-100">
          <div className="flex p-1 bg-gray-100/80 rounded-xl mb-4 relative">
            <button onClick={() => { setActiveTab("seller"); setSelectedUser(null); }} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "seller" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
              Sellers
            </button>
            <button onClick={() => { setActiveTab("buyer"); setSelectedUser(null); }} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "buyer" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
              Buyers
            </button>
          </div>
          
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${activeTab}s...`} className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition" />
          </div>
        </div>

                <div className="p-2 h-[250px] overflow-y-auto custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm font-medium">No users found.</div>
          ) : (
            filtered.map((u) => (
              <div key={u.id || u.slug} onClick={() => setSelectedUser(u)} className={`p-3 m-1 rounded-xl cursor-pointer flex items-center justify-between border transition-all ${selectedUser?.id === u.id ? "bg-orange-50 border-orange-200" : "border-transparent hover:bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedUser?.id === u.id ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {(u.name || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${selectedUser?.id === u.id ? "text-orange-900" : "text-gray-900"}`}>{u.name || "Unknown"}</p>
                    <p className={`text-[10px] ${selectedUser?.id === u.id ? "text-orange-600" : "text-gray-400"}`}>{u.email || u.slug}</p>
                  </div>
                </div>
                {selectedUser?.id === u.id && <CheckCircle2 size={16} className="text-orange-500" />}
              </div>
            ))
          )}
        </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition">Cancel</button>
          <button onClick={() => onConfirm(selectedUser, activeTab)} disabled={!selectedUser || assigning} className="px-5 py-2 bg-[#ffae86] hover:bg-orange-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 disabled:opacity-50">
            {assigning ? <Loader2 size={14} className="animate-spin" /> : "Confirm Assignment"}
          </button>
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
  const [selected, setSelected] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [assignDropId, setAssignDropId] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [notesMap, setNotesMap] = useState({});
  const [savingNotes, setSavingNotes] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // details | assign | notes
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatingLead, setUpdatingLead] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [bulkAssigning, setBulkAssigning] = useState(false);

  const dropRef = useRef(null);

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
          if (isAdmin) {
            snap = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc")));
          } else if (currentUser?.role === "seller") {
            snap = await getDocs(query(
              collection(db, "leads"),
              where("assignedToSellerSlug", "==", currentUser?.linkedSlug),
              orderBy("createdAt", "desc")
            ));
          } else if (currentUser?.role === "buyer") {
            snap = await getDocs(query(
              collection(db, "leads"),
              where("assignedToBuyerSlug", "==", currentUser?.linkedSlug),
              orderBy("createdAt", "desc")
            ));
          } else {
            snap = await getDocs(query(
              collection(db, "leads"),
              where("assignedTo", "==", currentUser?.id),
              orderBy("createdAt", "desc")
            ));
          }
        } catch {
          snap = await getDocs(collection(db, "leads"));
        }
        let allLeads = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (!isAdmin) {
          if (currentUser?.role === "seller") {
            allLeads = allLeads.filter((l) => l.assignedToSellerSlug === currentUser?.linkedSlug);
          } else if (currentUser?.role === "buyer") {
            allLeads = allLeads.filter((l) => l.assignedToBuyerSlug === currentUser?.linkedSlug);
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
  }, [isAdmin, currentUser?.id]);

  useEffect(() => {
    if (!isAdmin) return;
    getFirestoreUsers().then(setAdminUsers).catch(() => {});
    
    // Load sellers for assignment (fallback if orderBy fails)
    const loadSellers = async () => {
      try {
        let snap;
        try {
          snap = await getDocs(query(collection(db, "sellers"), orderBy("name")));
        } catch (err) {
          console.warn("Sellers orderBy failed, falling back:", err);
          snap = await getDocs(collection(db, "sellers"));
        }
        setSellers(snap.docs.map(d => ({ id: d.id, slug: d.data().slug, name: d.data().name || d.data().companyName || "Unnamed Seller" })));
      } catch (e) {
        console.error("Failed to load sellers:", e);
      }
    };

    const loadBuyers = async () => {
      try {
        let snap;
        try {
          snap = await getDocs(query(collection(db, "buyers"), orderBy("name")));
        } catch (err) {
          console.warn("Buyers orderBy failed, falling back:", err);
          snap = await getDocs(collection(db, "buyers"));
        }
        setBuyers(snap.docs.map(d => ({ id: d.id, slug: d.data().slug, name: d.data().name || d.data().companyName || "Unnamed Buyer" })));
      } catch (e) {
        console.error("Failed to load buyers:", e);
      }
    };

    loadSellers();
    loadBuyers();
  }, [isAdmin]);

  const filtered = leads.filter((l) => {
    const s = search.toLowerCase();
    const matchSearch =
      (l.name || "").toLowerCase().includes(s) ||
      (l.phone || "").includes(s) ||
      (l.email || "").toLowerCase().includes(s) ||
      (l.sellerName || l.buyerName || l.buyer || "").toLowerCase().includes(s) ||
      (l.productName || "").toLowerCase().includes(s);
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchSource = filterSource === "All" || l.source === filterSource;
    return matchSearch && matchStatus && matchSource;
  });

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
    } catch (e) {
      console.error(e);
      alert("Delete failed.");
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
      alert("Update failed.");
    } finally {
      setUpdatingLead(false);
    }
  };

  const handleAssignSeller = async (lead, seller) => {
    setAssigning(true);
    const result = await assignLeadToSeller(lead.id, seller?.slug || null, seller?.name || null);
    if (result.success) {
      const updated = { 
        ...lead, 
        assignedToSellerSlug: seller?.slug || null, 
        assignedToSellerName: seller?.name || null,
        assignedToSellerAt: seller?.slug ? new Date() : null,
        assignedToBuyerSlug: null,
        assignedToBuyerName: null,
      };
      setLeads(leads.map((l) => (l.id === lead.id ? updated : l)));
      if (selected?.id === lead.id) setSelected(updated);
    }
    setAssigning(false);
    setAssignDropId(null);
  };

  
  const handleBulkAssignConfirm = async (user, type) => {
    setBulkAssigning(true);
    try {
      for (const leadId of selectedLeads) {
        if (type === "seller") {
          await assignLeadToSeller(leadId, user.slug || null, user.name || null);
        } else {
          await assignLeadToBuyer(leadId, user.slug || null, user.name || null);
        }
      }
      
      setLeads(leads.map(l => {
        if (selectedLeads.includes(l.id)) {
           return {
              ...l,
              ...(type === "seller" ? {
                assignedToSellerSlug: user.slug,
                assignedToSellerName: user.name,
                assignedToSellerAt: new Date(),
                assignedToBuyerSlug: null,
                assignedToBuyerName: null
              } : {
                assignedToBuyerSlug: user.slug,
                assignedToBuyerName: user.name,
                assignedToBuyerAt: new Date(),
                assignedToSellerSlug: null,
                assignedToSellerName: null
              })
           };
        }
        return l;
      }));
      setSelectedLeads([]);
      setShowBulkAssign(false);
    } catch(e) {
      console.error(e);
      alert("Bulk assignment failed.");
    }
    setBulkAssigning(false);
  };

  const handleAssignBuyer = async (lead, buyer) => {
    setAssigning(true);
    const result = await assignLeadToBuyer(lead.id, buyer?.slug || null, buyer?.name || null);
    if (result.success) {
      const updated = { 
        ...lead, 
        assignedToBuyerSlug: buyer?.slug || null, 
        assignedToBuyerName: buyer?.name || null,
        assignedToBuyerAt: buyer?.slug ? new Date() : null,
        assignedToSellerSlug: null,
        assignedToSellerName: null,
      };
      setLeads(leads.map((l) => (l.id === lead.id ? updated : l)));
      if (selected?.id === lead.id) setSelected(updated);
    }
    setAssigning(false);
    setAssignDropId(null);
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    try {
      const notes = notesMap[selected.id] || "";
      await updateDoc(doc(db, "leads", selected.id), { notes });
      setLeads(leads.map((l) => l.id === selected.id ? { ...l, notes } : l));
      setSelected(p => ({ ...p, notes }));
    } catch (e) { console.error("Notes save error:", e); }
    setSavingNotes(false);
  };

  const counts = {
    New: leads.filter((l) => l.status === "New" || !l.status).length,
    "In Progress": leads.filter((l) => l.status === "In Progress").length,
    Closed: leads.filter((l) => l.status === "Closed").length,
    "Not Interested": leads.filter((l) => l.status === "Not Interested").length,
  };

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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              <p className="text-gray-400 text-[11px]">{status}</p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search name, email, phone, product..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 shadow-sm" />
        </div>
        
        {isAdmin && selectedLeads.length > 0 && (
          <div className="flex items-center gap-2 bg-gray-900 text-white px-2 py-1.5 rounded-xl shadow-sm animate-in fade-in slide-in-from-left-4">
            <span className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-xs font-bold">{selectedLeads.length}</span>
            <button onClick={() => setShowBulkAssign(true)} className="flex items-center gap-2 text-sm font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">
              <UserPlus size={14} /> Assign
            </button>
            <button onClick={() => setSelectedLeads([])} className="p-1.5 hover:bg-white/10 rounded-lg transition mr-1">
              <X size={14} />
            </button>
          </div>
        )}

        {["All", "contact_page", "product_page", "buyer_page"].map((src) => (
          <button key={src} onClick={() => setFilterSource(src)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${filterSource === src ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20" : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 bg-white shadow-sm"}`}>
            {src === "All" ? "All Sources" : sourceLabels[src]}
          </button>
        ))}
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
                {!isAdmin ? "No leads assigned to you yet." : search || filterStatus !== "All" || filterSource !== "All" ? "No matching leads" : "No leads yet"}
              </p>
              <p className="text-sm mt-1">
                {!isAdmin ? "Contact your admin to assign leads." : "Leads appear when visitors submit inquiry forms."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {isAdmin && (
                      <th className="px-4 py-3 w-[40px]">
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
                    {["Lead", "Listing / Product", "Source", "Status", isAdmin && "Assigned To", "Time", ""].filter(Boolean).map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => {
                    const cfg = statusConfig[lead.status] || statusConfig["New"];
                    const Icon = cfg.icon;
                    const hasSellerAssign = !!lead.assignedToSellerSlug;
                    const hasBuyerAssign = !!lead.assignedToBuyerSlug;
                    return (
                      <tr key={lead.id}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === lead.id || selectedLeads.includes(lead.id) ? "bg-orange-50 border-orange-100" : ""}`}
                        onClick={() => { setSelected(selected?.id === lead.id ? null : lead); setActiveTab("details"); setNotesMap(p => ({ ...p, [lead.id]: lead.notes || "" })); }}>
                        {isAdmin && (
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
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
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[10px] font-bold">{(lead.name || "?")[0].toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="text-gray-900 text-xs font-semibold">{lead.name || "—"}</p>
                              <p className="text-gray-400 text-[10px]">{lead.phone || lead.email || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-gray-700 text-xs font-semibold">{lead.sellerName || lead.buyerName || lead.buyer || "—"}</p>
                          {lead.productName && <p className="text-gray-400 text-[10px] flex items-center gap-1"><Package size={9} /> {lead.productName}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${lead.source === "product_page" ? "bg-orange-100 text-orange-600" : lead.source === "buyer_page" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}>
                            {sourceLabels[lead.source] || lead.source || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border w-fit ${cfg.bg} ${cfg.color}`}>
                            <Icon size={9} /> {lead.status || "New"}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="px-4 py-3 min-w-[120px]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col gap-1 items-start">
                              {hasSellerAssign && (
                                <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-md bg-green-50 text-green-700 border border-green-200 w-fit">
                                  <Store size={8} /> {lead.assignedToSellerName}
                                </span>
                              )}
                              {hasBuyerAssign && (
                                <span className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 w-fit">
                                  <ShoppingBag size={8} /> {lead.assignedToBuyerName}
                                </span>
                              )}
                              {!hasSellerAssign && !hasBuyerAssign && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelected(lead); setShowClientModal(true); }}
                                  className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 bg-white transition-all shadow-sm"
                                >
                                  Assign
                                </button>
                              )}
                              {(hasSellerAssign || hasBuyerAssign) && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelected(lead); setShowClientModal(true); }}
                                  className="text-[9px] font-bold text-gray-400 hover:text-orange-500 underline decoration-dashed underline-offset-2 transition-colors mt-0.5"
                                >
                                  Change
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                        <td className="px-4 py-3 text-gray-400 text-[10px] whitespace-nowrap">{formatTime(lead.assignedToSellerAt || lead.assignedToBuyerAt || lead.createdAt)}</td>
                        <td className="px-4 py-3">
                          <button onClick={(e) => { e.stopPropagation(); setDelConfirm(lead.id); }}
                            className="text-gray-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50">
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
      {selected && (
        <LeadDetailsModal
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdateLeadDetails}
          updating={updatingLead}
          sellers={sellers}
          buyers={buyers}
          handleAssignSeller={handleAssignSeller}
          handleAssignBuyer={handleAssignBuyer}
          assigning={assigning}
          isAdmin={isAdmin}
          currentUser={currentUser}
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
          onClose={() => setShowBulkAssign(false)}
          onConfirm={handleBulkAssignConfirm}
        />
      )}

    </div>
  );
}

