"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, TrendingUp, CheckCircle2, Clock, AlertCircle, XCircle, ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { getBuyerUser } from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

const statusCfg = {
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
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export default function BuyerDashboard() {
  const [user, setUser] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getBuyerUser();
    setUser(u);
    if (!u?.linkedSlug) { setLoading(false); return; }

    const loadData = async () => {
      try {
        const buyerSnap = await getDocs(query(collection(db, "buyers"), where("slug", "==", u.linkedSlug)));
        if (!buyerSnap.empty) setBuyer({ id: buyerSnap.docs[0].id, ...buyerSnap.docs[0].data() });

        let leadsSnap;
        try {
          leadsSnap = await getDocs(query(
            collection(db, "leads"),
            where("buyerSlug", "==", u.linkedSlug),
            orderBy("createdAt", "desc"),
            limit(50)
          ));
        } catch {
          leadsSnap = await getDocs(query(collection(db, "leads"), where("buyerSlug", "==", u.linkedSlug)));
        }
        setLeads(leadsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Buyer dashboard load error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const counts = {
    New: leads.filter((l) => l.status === "New" || !l.status).length,
    "In Progress": leads.filter((l) => l.status === "In Progress").length,
    Closed: leads.filter((l) => l.status === "Closed").length,
    "Not Interested": leads.filter((l) => l.status === "Not Interested").length,
  };
  const recentLeads = leads.slice(0, 8);

  return (
    <div className="space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Welcome Banner */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "linear-gradient(135deg, #2e1065 0%, #4c1d95 60%, #6d28d9 100%)" }}>
        <div className="p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Welcome back,</p>
            <h1 className="text-2xl font-black text-white mb-1">{user?.name || "Buyer"}</h1>
            {buyer && (
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                {buyer.buyerName || "—"} · {buyer.city || buyer.state || ""}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            {buyer?.logoUrl ? (
              <img src={buyer.logoUrl} alt="logo" className="w-16 h-16 rounded-2xl object-contain bg-white p-1 shadow-lg" />
            ) : (
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
                <ShoppingBag size={28} className="text-white" />
              </div>
            )}
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
              🔗 {user?.linkedSlug || "—"}
            </div>
            {buyer?.status && (
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${buyer.status === "live" ? "bg-emerald-400/20 text-emerald-200" : "bg-amber-400/20 text-amber-200"}`}>
                {buyer.status === "live" ? "● Live" : "⏸ " + buyer.status}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
          <Loader2 size={22} className="animate-spin" style={{ color: "#6d28d9" }} />
          <span className="text-sm font-semibold">Loading your data...</span>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(counts).map(([status, count]) => {
              const cfg = statusCfg[status];
              const Icon = cfg.icon;
              return (
                <div key={status} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} className={cfg.color} />
                    <p className={`text-2xl font-black ${cfg.color}`}>{count}</p>
                  </div>
                  <p className="text-gray-400 text-[11px] font-semibold">{status}</p>
                </div>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/buyer-portal/leads"
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex items-center justify-between group hover:border-purple-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users size={15} style={{ color: "#4c1d95" }} />
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Leads</span>
                </div>
                <p className="text-2xl font-black text-gray-900">{leads.length}</p>
                <p className="text-gray-400 text-xs mt-0.5">total inquiries</p>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-all" style={{ color: undefined }} onMouseEnter={(e) => e.currentTarget.style.color = "#6d28d9"} onMouseLeave={(e) => e.currentTarget.style.color = ""} />
            </Link>
            <Link href="/buyer-portal/profile"
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex items-center justify-between group hover:border-purple-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={15} style={{ color: "#4c1d95" }} />
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Profile</span>
                </div>
                <p className="text-sm font-black text-gray-900">{buyer?.buyerName || "View Profile"}</p>
                <p className="text-gray-400 text-xs mt-0.5">{buyer?.city || "—"} · {buyer?.category || "—"}</p>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Recent Leads */}
          {recentLeads.length > 0 && (
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h2 className="text-sm font-black text-gray-900">Recent Leads</h2>
                <Link href="/buyer-portal/leads" className="text-xs font-bold hover:underline" style={{ color: "#4c1d95" }}>View All →</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50 bg-gray-50/50">
                      {["Contact", "Message", "Status", "Time"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => {
                      const cfg = statusCfg[lead.status] || statusCfg["New"];
                      const Icon = cfg.icon;
                      return (
                        <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                                style={{ background: "linear-gradient(135deg, #4c1d95, #6d28d9)" }}>
                                {(lead.name || "?")[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="text-gray-900 text-xs font-semibold">{lead.name || "—"}</p>
                                <p className="text-gray-400 text-[10px]">{lead.phone || lead.email || "—"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 max-w-[160px]">
                            <p className="text-gray-500 text-[10px] line-clamp-2">{lead.message || "—"}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border w-fit ${cfg.bg} ${cfg.color}`}>
                              <Icon size={9} /> {lead.status || "New"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-[10px] whitespace-nowrap">{formatTime(lead.createdAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {leads.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm text-center py-16 px-6">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-bold text-gray-700 text-base">No leads yet</p>
              <p className="text-gray-400 text-sm mt-1">Leads from your buyer listing page will appear here.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
