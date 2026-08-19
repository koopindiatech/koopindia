"use client";
import { BarChart3, TrendingUp, Users, Eye, Globe, ArrowUp } from "lucide-react";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const pageViews = [1200, 1900, 1500, 2800, 2200, 3400, 2900, 4100, 3500, 4800, 4200, 5600];
const leadData =  [8, 14, 11, 22, 18, 28, 24, 35, 30, 42, 36, 48];

export default function AnalyticsPage() {
  const maxViews = Math.max(...pageViews);
  const maxLeads = Math.max(...leadData);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm">Platform performance overview — last 12 months.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Page Views", value: "28,400", change: "+18%", icon: Eye, color: "from-orange-500 to-amber-400" },
          { label: "Unique Visitors", value: "14,200", change: "+24%", icon: Users, color: "from-blue-500 to-cyan-400" },
          { label: "Total Leads", value: "316", change: "+32%", icon: TrendingUp, color: "from-emerald-500 to-teal-400" },
          { label: "Active Buyers", value: "24", change: "+3", icon: Globe, color: "from-violet-500 to-purple-400" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center mb-4`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{k.value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-400 text-xs">{k.label}</p>
                <span className="flex items-center gap-0.5 text-emerald-600 text-xs font-bold">
                  <ArrowUp size={10} /> {k.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Page Views chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-bold text-sm mb-1">Page Views</h2>
          <p className="text-gray-400 text-xs mb-5">Monthly website traffic</p>
          <div className="flex items-end gap-2 h-40">
            {pageViews.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-orange-300 hover:opacity-100 opacity-70 transition-opacity cursor-pointer relative group"
                  style={{ height: `${(v / maxViews) * 100}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md">
                    {v.toLocaleString()}
                  </div>
                </div>
                <span className="text-[9px] text-gray-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leads chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-bold text-sm mb-1">Lead Generation</h2>
          <p className="text-gray-400 text-xs mb-5">Monthly leads acquired</p>
          <div className="flex items-end gap-2 h-40">
            {leadData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300 hover:opacity-100 opacity-70 transition-opacity cursor-pointer relative group"
                  style={{ height: `${(v / maxLeads) * 100}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-md">
                    {v}
                  </div>
                </div>
                <span className="text-[9px] text-gray-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top pages */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <h2 className="text-gray-900 font-bold text-sm mb-4">Top Pages by Traffic</h2>
        <div className="space-y-3">
          {[
            { page: "/gst-registration", views: 5400, pct: 90 },
            { page: "/documentation-compliance/fssai-license", views: 3200, pct: 53 },
            { page: "/", views: 4800, pct: 80 },
            { page: "/seller-onboarding", views: 1900, pct: 31 },
            { page: "/services", views: 1600, pct: 27 },
          ].map((r) => (
            <div key={r.page} className="flex items-center gap-3">
              <span className="text-gray-600 text-xs flex-1 font-mono truncate">{r.page}</span>
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="text-orange-500 text-xs font-bold w-12 text-right">{r.views.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
