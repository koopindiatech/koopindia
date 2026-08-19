"use client";
import { useState, useEffect } from "react";
import {
  Users, Search, Phone, Mail, Building2, Clock,
  CheckCircle2, XCircle, AlertCircle, Trash2,
  Loader2, Package, UserPlus, ChevronDown, X,
} from "lucide-react";
import { db } from "../../../lib/firebase";
import {
  collection, getDocs, updateDoc, deleteDoc, doc,
  query, orderBy, serverTimestamp, where,
} from "firebase/firestore";
import { getCurrentUser, isAdmin as checkIsAdmin, assignLeadToUser, getFirestoreUsers } from "../lib/auth";

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

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [selected, setSelected] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [assignDropId, setAssignDropId] = useState(null);
  const [assigning, setAssigning] = useState(false);

  const currentUser = getCurrentUser();
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    const load = async () => {
      try {
        let snap;
        try {
          if (isAdmin) {
            snap = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc")));
          } else {
            // Non-admin: only see assigned leads
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
        // If non-admin and fallback didn't filter, filter manually
        if (!isAdmin) {
          allLeads = allLeads.filter((l) => l.assignedTo === currentUser?.id);
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

  // Load admin users for assignment dropdown (admin only)
  useEffect(() => {
    if (!isAdmin) return;
    getFirestoreUsers().then(setAdminUsers).catch(() => {});
  }, [isAdmin]);

  const filtered = leads.filter((l) => {
    const s = search.toLowerCase();
    const matchSearch =
      (l.name || "").toLowerCase().includes(s) ||
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
      setLeads(leads.filter((l) => l.id !== id));
      if (selected?.id === id) setSelected(null);
      setDelConfirm(null);
    } catch (e) { console.error("Delete error:", e); }
  };

  const handleAssign = async (lead, user) => {
    setAssigning(true);
    const result = await assignLeadToUser(lead.id, user.firestoreId || user.id, user.name);
    if (result.success) {
      const updated = { ...lead, assignedTo: user.firestoreId || user.id, assignedToName: user.name };
      setLeads(leads.map((l) => (l.id === lead.id ? updated : l)));
      if (selected?.id === lead.id) setSelected(updated);
    }
    setAssigning(false);
    setAssignDropId(null);
  };

  const counts = {
    New: leads.filter((l) => l.status === "New").length,
    "In Progress": leads.filter((l) => l.status === "In Progress").length,
    Closed: leads.filter((l) => l.status === "Closed").length,
    "Not Interested": leads.filter((l) => l.status === "Not Interested").length,
  };

  const formatTime = (ts) => {
    if (!ts) return "—";
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Lead Manager</h1>
          <p className="text-gray-500 text-sm">
            {isAdmin ? "All leads — assign them to team members." : `Showing your assigned leads (${leads.length}).`}
          </p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Loader2 size={16} className="animate-spin" /> Loading leads...
          </div>
        )}
      </div>

      {/* Stat row */}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search name, buyer, product..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 shadow-sm" />
        </div>
        {["All", "contact_page", "product_page", "buyer_page"].map((src) => (
          <button key={src} onClick={() => setFilterSource(src)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${filterSource === src ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20" : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 bg-white shadow-sm"}`}>
            {src === "All" ? "All Sources" : sourceLabels[src]}
          </button>
        ))}
      </div>

      {/* Table + Side Panel */}
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
                    {["Lead", "Buyer / Product", "Source", "Message", "Status", isAdmin && "Assigned To", "Time", ""].filter(Boolean).map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => {
                    const cfg = statusConfig[lead.status] || statusConfig["New"];
                    const Icon = cfg.icon;
                    return (
                      <tr key={lead.id}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === lead.id ? "bg-orange-50 border-orange-100" : ""}`}
                        onClick={() => setSelected(selected?.id === lead.id ? null : lead)}>
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
                        <td className="px-4 py-3 max-w-[160px]">
                          <p className="text-gray-500 text-[10px] line-clamp-2">{lead.message || "—"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border w-fit ${cfg.bg} ${cfg.color}`}>
                            <Icon size={9} /> {lead.status || "New"}
                          </span>
                        </td>
                        {/* Assign column — admin only */}
                        {isAdmin && (
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="relative">
                              <button onClick={() => setAssignDropId(assignDropId === lead.id ? null : lead.id)}
                                className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all ${lead.assignedToName ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300 bg-white"}`}>
                                <UserPlus size={10} />
                                {lead.assignedToName || "Assign"}
                                <ChevronDown size={8} />
                              </button>
                              {assignDropId === lead.id && (
                                <div className="absolute left-0 top-8 z-40 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-1 overflow-hidden">
                                  <p className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Assign to</p>
                                  {adminUsers.map((u) => (
                                    <button key={u.firestoreId || u.id} onClick={() => handleAssign(lead, u)}
                                      className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2 transition">
                                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-black text-white flex-shrink-0">{u.name?.[0] || "U"}</div>
                                      {u.name}
                                    </button>
                                  ))}
                                  {adminUsers.length === 0 && <p className="px-3 py-2 text-xs text-gray-400">No users yet. Create users first.</p>}
                                  {lead.assignedTo && (
                                    <>
                                      <div className="border-t border-gray-100 my-1" />
                                      <button onClick={() => handleAssign(lead, { firestoreId: null, id: null, name: null })}
                                        className="w-full text-left px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2 transition">
                                        <X size={10} /> Unassign
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                        <td className="px-4 py-3 text-gray-400 text-[10px] whitespace-nowrap">{formatTime(lead.createdAt)}</td>
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

        {/* Side detail panel */}
        {selected && (
          <div className="w-72 bg-white border border-orange-200 rounded-2xl p-5 flex-shrink-0 space-y-4 shadow-md">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
                <span className="text-white font-bold">{(selected.name || "?")[0].toUpperCase()}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition">
                <XCircle size={16} />
              </button>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold">{selected.name || "Unknown"}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{sourceLabels[selected.source] || selected.source || "—"}</p>
            </div>
            <div className="space-y-2">
              {selected.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-orange-500 flex-shrink-0" />
                  <a href={`tel:${selected.phone}`} className="text-gray-600 text-xs hover:underline">{selected.phone}</a>
                </div>
              )}
              {selected.email && (
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-orange-500 flex-shrink-0" />
                  <a href={`mailto:${selected.email}`} className="text-gray-600 text-xs hover:underline break-all">{selected.email}</a>
                </div>
              )}
              {(selected.sellerName || selected.buyerName) && (
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600 text-xs">{selected.sellerName || selected.buyerName}</span>
                </div>
              )}
              {selected.companyName && (
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600 text-xs">{selected.companyName}</span>
                </div>
              )}
              {selected.productCategory && (
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-semibold mb-0.5">PRODUCT CATEGORY</p>
                  <p className="text-gray-700 text-xs font-bold">{selected.productCategory}</p>
                </div>
              )}
              {selected.subject && (
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  <p className="text-gray-400 text-[10px] font-semibold mb-0.5">INQUIRY TYPE</p>
                  <p className="text-gray-700 text-xs font-bold">{selected.subject}</p>
                </div>
              )}
              {selected.assignedToName && (
                <div className="bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                  <p className="text-blue-400 text-[10px] font-semibold mb-0.5">ASSIGNED TO</p>
                  <p className="text-blue-700 text-xs font-bold">{selected.assignedToName}</p>
                </div>
              )}
            </div>
            {selected.message && (
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-gray-400 text-[10px] font-semibold mb-1">MESSAGE</p>
                <p className="text-gray-600 text-xs leading-relaxed">{selected.message}</p>
              </div>
            )}
            <div>
              <p className="text-gray-400 text-[10px] font-semibold mb-2">UPDATE STATUS</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.keys(statusConfig).map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`text-[10px] font-bold py-1.5 rounded-lg border transition-all ${selected.status === s ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Assign in detail panel — admin only */}
            {isAdmin && (
              <div>
                <p className="text-gray-400 text-[10px] font-semibold mb-2">ASSIGN TO TEAM</p>
                <div className="flex flex-wrap gap-1.5">
                  {adminUsers.map((u) => (
                    <button key={u.firestoreId || u.id} onClick={() => handleAssign(selected, u)}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all ${selected.assignedTo === (u.firestoreId || u.id) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 bg-white"}`}>
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="pt-2 border-t border-gray-100">
              {selected.sellerSlug && (
                <a href={`/${selected.sellerSlug}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">🔗 View Buyer Page</a>
              )}
              {selected.buyerSlug && (
                <a href={`/buyers/${selected.buyerSlug}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 mt-1">🔗 View Buyer Listing</a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {delConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 className="text-red-500" size={24} /></div>
            <h3 className="font-black text-gray-900 text-lg mb-1">Delete Lead?</h3>
            <p className="text-gray-500 text-sm mb-5">This will permanently remove this lead and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => deleteLead(delConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
