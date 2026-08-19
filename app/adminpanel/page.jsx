"use client";
import { useState, useEffect } from "react";
import {
  Building2, Users, ShoppingBag, FileText, TrendingUp,
  ArrowUp, ArrowDown, Eye, Globe, CheckCircle2, Clock,
  AlertCircle, Star, Zap, BarChart3, Loader2
} from "lucide-react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const statusColor = {
  New: "bg-orange-100 text-orange-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Closed: "bg-emerald-100 text-emerald-600",
  Live: "bg-emerald-100 text-emerald-600",
  live: "bg-emerald-100 text-emerald-600",
  Pending: "bg-amber-100 text-amber-600",
  draft: "bg-gray-100 text-gray-500",
  paused: "bg-amber-100 text-amber-600",
  "Not Interested": "bg-gray-100 text-gray-500",
};

const miniBarData = [40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88];

export default function AdminDashboard() {
  const [sellers, setSellers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [sellersSnap, leadsSnap] = await Promise.all([
          getDocs(collection(db, "sellers")),
          getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc"))),
        ]);
        setSellers(sellersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Dashboard load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalBuyers = sellers.length;
  const liveBuyers = sellers.filter(s => s.status === "live").length;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const productLeads = leads.filter(l => l.source === "product_page").length;
  const contactLeads = leads.filter(l => l.source === "contact_page").length;

  const recentLeads = leads.slice(0, 5);
  const recentBuyers = sellers.slice(0, 4);

  const stats = [
    {
      label: "Total Buyers Listed",
      value: loading ? "—" : String(totalBuyers),
      change: loading ? "" : `${liveBuyers} live`,
      up: true,
      icon: Building2,
      color: "from-orange-500 to-amber-400",
      bg: "bg-orange-50",
      href: "/adminpanel/sellers",
    },
    {
      label: "Total Leads",
      value: loading ? "—" : String(totalLeads),
      change: loading ? "" : `${newLeads} new`,
      up: true,
      icon: Users,
      color: "from-blue-500 to-cyan-400",
      bg: "bg-blue-50",
      href: "/adminpanel/leads",
    },
    {
      label: "Product Inquiries",
      value: loading ? "—" : String(productLeads),
      change: loading ? "" : "from product pages",
      up: true,
      icon: ShoppingBag,
      color: "from-emerald-500 to-teal-400",
      bg: "bg-emerald-50",
      href: "/adminpanel/leads",
    },
    {
      label: "Contact Page Leads",
      value: loading ? "—" : String(contactLeads),
      change: loading ? "" : "from contact forms",
      up: false,
      icon: FileText,
      color: "from-violet-500 to-purple-400",
      bg: "bg-violet-50",
      href: "/adminpanel/leads",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
            📅 {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          {loading && <Loader2 size={16} className="animate-spin text-orange-500" />}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-md transition-all duration-300 group shadow-sm block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <Icon size={16} className="text-white" />
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? "text-emerald-600" : "text-gray-400"}`}>
                  {s.up ? <ArrowUp size={12} /> : <Clock size={12} />}
                  {s.change}
                </span>
              </div>
              {loading
                ? <div className="h-8 w-16 bg-gray-100 rounded-lg animate-pulse mb-1" />
                : <p className="text-3xl font-extrabold text-gray-900 mb-1">{s.value}</p>
              }
              <p className="text-gray-500 text-xs font-medium">{s.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Activity Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 font-bold text-sm">Lead Activity</h2>
              <p className="text-gray-400 text-xs">Last 12 months</p>
            </div>
            <div className="flex gap-2">
              {["Product", "Contact"].map((t, i) => (
                <span key={t} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${i === 0 ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {miniBarData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-orange-300 opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                <span className="text-[9px] text-gray-400">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-bold text-sm mb-4">Quick Actions</h2>
          <div className="space-y-1">
            {[
              { label: "Add New Buyer", href: "/adminpanel/sellers", icon: Building2, color: "text-orange-500" },
              { label: "View All Leads", href: "/adminpanel/leads", icon: Users, color: "text-blue-500", badge: newLeads > 0 ? `${newLeads} new` : null },
              { label: "Manage Buyers", href: "/adminpanel/buyers", icon: ShoppingBag, color: "text-emerald-500" },
              { label: "Analytics Report", href: "/adminpanel/analytics", icon: BarChart3, color: "text-cyan-500" },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <Link key={a.label} href={a.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                  <Icon size={15} className={a.color} />
                  <span className="text-gray-600 text-sm flex-1 group-hover:text-gray-900 transition-colors">{a.label}</span>
                  {a.badge && (
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">{a.badge}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Leads */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 font-bold text-sm">Recent Leads</h2>
            <Link href="/adminpanel/leads" className="text-orange-500 text-xs hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-2xl mb-2">📭</p>
              <p className="text-xs">No leads yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentLeads.map((lead, i) => (
                <div key={lead.id || i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">{(lead.name || "?")[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-xs font-semibold truncate">{lead.name || "Unknown"}</p>
                    <p className="text-gray-400 text-[10px] truncate">{lead.sellerName || lead.buyer || "—"} · {lead.source === "product_page" ? "Product Inquiry" : "Contact Form"}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[lead.status] || "bg-gray-100 text-gray-500"}`}>
                    {lead.status || "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buyer Listings */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 font-bold text-sm">Buyer Listings</h2>
            <Link href="/adminpanel/sellers" className="text-orange-500 text-xs hover:underline">Manage →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : recentBuyers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-2xl mb-2">🏪</p>
              <p className="text-xs">No buyers yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentBuyers.map((buyer, i) => (
                <div key={buyer.id || i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                    {buyer.logoUrl
                      ? <img src={buyer.logoUrl} alt="" className="w-7 h-7 object-contain rounded" />
                      : <Globe size={14} className="text-orange-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-xs font-semibold truncate">{buyer.name}</p>
                    <p className="text-gray-400 text-[10px] truncate">/{buyer.slug}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${buyer.type === "product" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>
                    {buyer.type === "product" ? "Product" : "Service"}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[buyer.status] || "bg-gray-100 text-gray-500"}`}>
                    {buyer.status || "draft"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
