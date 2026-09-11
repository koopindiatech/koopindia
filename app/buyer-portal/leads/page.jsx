"use client";
import { useState, useEffect } from "react";
import { Search, Loader2, Phone, Mail, Building2, Clock, CheckCircle2, XCircle, AlertCircle, X, UserCheck, StickyNote } from "lucide-react";
import { getBuyerUser } from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, updateDoc, doc, query, where, orderBy } from "firebase/firestore";

const statusConfig = {
  New:             { color: "text-orange-600", bg: "bg-orange-50 border-orange-200",   icon: AlertCircle  },
  "In Progress":   { color: "text-blue-600",   bg: "bg-blue-50 border-blue-200",       icon: Clock        },
  Closed:          { color: "text-emerald-600",bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  "Not Interested":{ color: "text-gray-500",   bg: "bg-gray-100 border-gray-200",      icon: XCircle      },
};

const formatTime = (ts) => {
  if (!ts) return "—";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export default function BuyerLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    const u = getBuyerUser();
    if (!u?.linkedSlug) { setLoading(false); return; }
    const load = async () => {
      try {
        let snap;
        try {
          snap = await getDocs(query(
            collection(db, "leads"),
            where("buyerSlug", "==", u.linkedSlug),
            orderBy("createdAt", "desc")
          ));
        } catch {
          snap = await getDocs(query(collection(db, "leads"), where("buyerSlug", "==", u.linkedSlug)));
        }
        setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Buyer leads load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openLead = (lead) => {
    setSelected(selected?.id === lead.id ? null : lead);
    setNotes(lead.notes || "");
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    try {
      await updateDoc(doc(db, "leads", selected.id), { notes });
      setLeads((prev) => prev.map((l) => (l.id === selected.id ? { ...l, notes } : l)));
      setSelected((p) => ({ ...p, notes }));
    } catch (e) {
      console.error("Notes save error:", e);
    }
    setSavingNotes(false);
  };


  const filtered = leads.filter((l) => {
    const s = search.toLowerCase();
    const match = (l.name || "").toLowerCase().includes(s) ||
      (l.phone || "").includes(s) ||
      (l.email || "").toLowerCase().includes(s) ||
      (l.message || "").toLowerCase().includes(s);
    const matchStatus = filterStatus === "All" || l.status === filterStatus || (!l.status && filterStatus === "New");
    return match && matchStatus;
  });

  const counts = {
    All: leads.length,
    New: leads.filter((l) => l.status === "New" || !l.status).length,
    "In Progress": leads.filter((l) => l.status === "In Progress").length,
    Closed: leads.filter((l) => l.status === "Closed").length,
    "Not Interested": leads.filter((l) => l.status === "Not Interested").length,
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "leads", id), { status });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      if (selected?.id === id) setSelected((p) => ({ ...p, status }));
    } catch (e) { console.error("Status update error:", e); }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">My Leads</h1>
          <p className="text-gray-500 text-sm">Inquiries from your buyer listing page.</p>
        </div>
        {loading && <div className="flex items-center gap-2 text-gray-400 text-sm"><Loader2 size={15} className="animate-spin" /> Loading...</div>}
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([status, count]) => (
          <button key={status} onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${filterStatus === status ? "text-white border-transparent shadow-sm" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}`}
            style={filterStatus === status ? { background: "#4c1d95" } : {}}>
            {status} <span className="ml-1 opacity-70">{count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search by name, phone, email, message..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 shadow-sm" />
      </div>

      {/* Table + Side panel */}
      <div className="flex gap-4">
        <div className={`bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all ${selected ? "flex-[2]" : "flex-1"}`}>
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
              <Loader2 size={22} className="animate-spin" style={{ color: "#6d28d9" }} />
              <span className="text-sm font-semibold">Loading leads...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-bold text-gray-600">{search || filterStatus !== "All" ? "No matching leads" : "No leads yet"}</p>
              <p className="text-sm mt-1">Leads appear when visitors submit inquiries from your buyer listing page.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Lead", "Source", "Message", "Status", "Time"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => {
                    const cfg = statusConfig[lead.status] || statusConfig["New"];
                    const Icon = cfg.icon;
                    return (
                      <tr key={lead.id}
                        className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === lead.id ? "border-purple-100" : ""}`}
                        style={selected?.id === lead.id ? { background: "#f5f3ff" } : {}}
                        onClick={() => openLead(lead)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                              style={{ background: "linear-gradient(135deg, #4c1d95, #6d28d9)" }}>
                              {(lead.name || "?")[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="text-gray-900 text-xs font-semibold">{lead.name || "—"}</p>
                              <p className="text-gray-400 text-[10px]">{lead.phone || lead.email || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${lead.source === "product_page" ? "bg-orange-100 text-orange-600" : lead.source === "buyer_page" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}>
                            {lead.source === "buyer_page" ? "Buyer Inquiry" : lead.source === "product_page" ? "Product Inquiry" : "Contact"}
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
                        <td className="px-4 py-3 text-gray-400 text-[10px] whitespace-nowrap">
                          <div>{formatTime(lead.createdAt)}</div>
                          {lead.assignedTo && (
                            <div className="flex items-center gap-1 mt-1">
                              <UserCheck size={9} className="text-purple-500" />
                              <span className="text-purple-600 font-bold text-[9px]">Admin Assigned</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-72 bg-white rounded-2xl p-5 flex-shrink-0 space-y-4 shadow-md border" style={{ borderColor: "#ddd6fe" }}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                style={{ background: "linear-gradient(135deg, #4c1d95, #6d28d9)" }}>
                {(selected.name || "?")[0].toUpperCase()}
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition">
                <X size={16} />
              </button>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold">{selected.name || "Unknown"}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{formatTime(selected.createdAt)}</p>
            </div>
            <div className="space-y-2">
              {selected.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} className="flex-shrink-0" style={{ color: "#4c1d95" }} />
                  <a href={`tel:${selected.phone}`} className="text-gray-600 text-xs hover:underline">{selected.phone}</a>
                </div>
              )}
              {selected.email && (
                <div className="flex items-center gap-2">
                  <Mail size={13} className="flex-shrink-0" style={{ color: "#4c1d95" }} />
                  <a href={`mailto:${selected.email}`} className="text-gray-600 text-xs hover:underline break-all">{selected.email}</a>
                </div>
              )}
              {selected.companyName && (
                <div className="flex items-center gap-2">
                  <Building2 size={13} className="flex-shrink-0" style={{ color: "#4c1d95" }} />
                  <span className="text-gray-600 text-xs">{selected.companyName}</span>
                </div>
              )}
              {selected.productCategory && (
                <div className="rounded-lg px-3 py-2 border" style={{ background: "#f5f3ff", borderColor: "#ddd6fe" }}>
                  <p className="text-[10px] font-bold mb-0.5" style={{ color: "#6d28d9" }}>PRODUCT CATEGORY</p>
                  <p className="text-xs font-bold" style={{ color: "#4c1d95" }}>{selected.productCategory}</p>
                </div>
              )}
            </div>
            {selected.message && (
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 mb-1">MESSAGE</p>
                <p className="text-gray-600 text-xs leading-relaxed">{selected.message}</p>
              </div>
            )}
            {/* Admin assigned badge */}
            {selected.assignedTo && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 border border-purple-100">
                <UserCheck size={13} className="text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-purple-400">ASSIGNED BY ADMIN</p>
                  <p className="text-purple-700 text-xs font-semibold">{selected.assignedToName || "Admin"}</p>
                </div>
              </div>
            )}
            {/* Notes */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <StickyNote size={11} className="text-gray-400" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">My Notes</p>
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this lead..."
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-400 resize-none"
              />
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="mt-2 w-full py-1.5 rounded-lg text-[10px] font-bold text-white flex items-center justify-center gap-1 disabled:opacity-50"
                style={{ background: "#4c1d95" }}
              >
                {savingNotes ? <><Loader2 size={10} className="animate-spin" /> Saving...</> : "Save Notes"}
              </button>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">UPDATE STATUS</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.keys(statusConfig).map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} disabled={updatingId === selected.id}
                    className={`text-[10px] font-bold py-1.5 rounded-lg border transition-all disabled:opacity-50 ${selected.status === s || (!selected.status && s === "New") ? "border-transparent text-white" : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 bg-white"}`}
                    style={(selected.status === s || (!selected.status && s === "New")) ? { background: "#4c1d95" } : {}}>
                    {updatingId === selected.id ? "..." : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
