"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Building2, Users, ShoppingBag, FileText,
  ChevronLeft, ChevronRight, Bell, Search, Settings, LogOut,
  Globe, BarChart3, Menu, X, UserCog, ShieldAlert, Store,
} from "lucide-react";
import { getCurrentUser, logout, hasPermission } from "./lib/auth";
import { db } from "../../lib/firebase";
import { collection, getDocs, getCountFromServer, query, where } from "firebase/firestore";

/* ─── SidebarContent is defined at MODULE SCOPE to prevent React remount ─── */
function SidebarContent({ user, collapsed, allowedNav, isActive, onLinkClick, onLogout, counts }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo — compact height */}
      <div className={`flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 flex-shrink-0 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Globe size={14} className="text-white" />
        </div>
        {!collapsed && (
          <div className="leading-none">
            <div className="flex items-baseline">
              <span className="text-gray-900 font-extrabold text-base leading-none">koop</span>
              <span className="text-orange-500 font-extrabold text-base leading-none">india</span>
              <span className="text-orange-500 font-extrabold text-base leading-none">.</span>
            </div>
            <p className="text-[9px] text-gray-500 mt-0.5 font-semibold tracking-wide uppercase">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Role badge — compact */}
      {!collapsed && user && (
        <div className="px-3 py-1.5 border-b border-gray-200">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.role === "admin" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
            {user.role === "admin" ? "⚡ Admin" : "👤 User"}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-2.5 space-y-0.5 overflow-y-auto">
        {allowedNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const dynamicBadge = counts[item.key];
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                active
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-semibold flex-1">{item.label}</span>}
              {!collapsed && dynamicBadge > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${item.badgeColor || "bg-gray-500"}`}>
                  {dynamicBadge}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-3 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="p-3 border-t border-gray-200 bg-gray-50/50">
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-[10px] font-bold">{user?.name?.[0] || "A"}</span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-xs font-bold truncate">{user?.name}</p>
                <p className="text-gray-500 text-[10px] truncate">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
              >
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function AdminLayout({ children }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [user, setUser]             = useState(null);
  const [checking, setChecking]     = useState(true);
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts]         = useState({ sellers: 0, buyers: 0, leads: 0, buyers: 0 });

  // ── Auth guard ──────────────────────────────────────────────
  useEffect(() => {
    if (pathname === "/adminpanel/login") { setChecking(false); return; }
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace("/adminpanel/login");
      return;
    }
    setUser(currentUser);
    // Redirect normal users to leads page since they don't have dashboard access
    if (currentUser.role !== "admin" && pathname === "/adminpanel") {
      router.replace("/adminpanel/leads");
      return;
    }
    setChecking(false);
  }, [pathname, router]);

  // ── Fetch dynamic badge counts ──────────────────────────────
  useEffect(() => {
    if (pathname === "/adminpanel/login") return;
    const fetchCounts = async () => {
      try {
        const [sellersCount, leadsCount, buyersCount] = await Promise.all([
          getCountFromServer(collection(db, "sellers")),
          getCountFromServer(query(collection(db, "leads"), where("status", "==", "New"))),
          getCountFromServer(collection(db, "buyers")),
        ]);
        setCounts({
          sellers: sellersCount.data().count,
          buyers: buyersCount.data().count,
          leads: leadsCount.data().count,
        });
      } catch (e) {
        console.error("Badge counts error:", e);
      }
    };
    fetchCounts();
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.replace("/adminpanel/login");
  };

  // ── Login page — render bare (no sidebar) ───────────────────
  if (pathname === "/adminpanel/login") {
    return <>{children}</>;
  }

  // ── While checking auth ──────────────────────────────────────
  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Nav items with dynamic badge keys ───────────────────────
  const NAV_ITEMS = [
    { label: "Dashboard",       href: "/adminpanel",           icon: LayoutDashboard, key: "dashboard", exact: true },
    { label: "Seller Listings", href: "/adminpanel/sellers",  icon: Store,           key: "sellers",   badgeColor: "bg-gray-600"    },
    { label: "Buyer Listings",  href: "/adminpanel/buyers",   icon: Building2,       key: "buyers",    badgeColor: "bg-purple-500"  },
    { label: "Lead Manager",    href: "/adminpanel/leads",     icon: Users,           key: "leads",     badgeColor: "bg-orange-500"  },
    { label: "User Management", href: "/adminpanel/users",     icon: UserCog,         key: "users"      },
  ];

  // ── Filter nav by permission ─────────────────────────────────
  const allowedNav = NAV_ITEMS.filter((item) => {
    if (user?.role === "admin") return true;
    return item.key === "leads"; // non-admins only see leads
  });

  // ── Permission denied for current route ─────────────────────
  const currentKey = NAV_ITEMS.find((n) =>
    n.exact ? pathname === n.href : pathname.startsWith(n.href)
  )?.key;
  const accessDenied =
    currentKey &&
    user?.role !== "admin" &&
    currentKey !== "leads";

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const sidebarProps = {
    user,
    collapsed,
    allowedNav,
    isActive,
    onLinkClick: () => setMobileOpen(false),
    onLogout: handleLogout,
    counts,
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 flex-shrink-0 ${collapsed ? "w-14" : "w-58"}`}
        style={{ width: collapsed ? "56px" : "230px" }}>
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-200 shadow-xl z-50 transition-transform duration-300 md:hidden flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={() => setMobileOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">
          <X size={16} />
        </button>
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar — darker */}
        <header className="h-13 bg-white border-b border-gray-200 shadow-sm flex items-center px-4 gap-4 flex-shrink-0" style={{ height: "52px" }}>
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-gray-500 hover:text-gray-800">
            <Menu size={20} />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-6 h-6 items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sellers, leads..."
                className="w-full bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg pl-8 pr-4 py-1.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-colors"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all">
              <Bell size={16} />
              {counts.leads > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />}
            </button>
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-orange-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-orange-300 transition-all"
            >
              <Globe size={12} /> View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {accessDenied ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
                <ShieldAlert size={32} className="text-red-500" />
              </div>
              <h2 className="text-gray-900 text-xl font-bold">Access Denied</h2>
              <p className="text-gray-600 text-sm max-w-xs">
                You don&apos;t have permission to view this section. Contact your Admin.
              </p>
              <Link
                href="/adminpanel"
                className="mt-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-orange-500/20"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
