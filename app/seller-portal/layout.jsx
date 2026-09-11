"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, User, Users, LogOut, Globe, Menu, X,
  ChevronLeft, ChevronRight, Store, Edit3,
} from "lucide-react";
import { getSellerUser, sellerLogout } from "./lib/auth";

const NAV = [
  { label: "Dashboard",  href: "/seller-portal/dashboard",   icon: LayoutDashboard },
  { label: "My Listing", href: "/seller-portal/my-listing",  icon: Edit3           },
  { label: "My Leads",   href: "/seller-portal/leads",       icon: Users           },
  { label: "My Profile", href: "/seller-portal/profile",     icon: User            },
];

function Sidebar({ user, collapsed, pathname, onLogout, onLinkClick }) {
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-4 border-b flex-shrink-0 ${collapsed ? "justify-center" : ""}`}
        style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <Store size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="leading-none">
            <div className="flex items-baseline">
              <span className="text-white font-extrabold text-base leading-none">koop</span>
              <span className="font-extrabold text-base leading-none" style={{ color: "#f5c842" }}>india</span>
            </div>
            <p className="text-[9px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Seller Portal</p>
          </div>
        )}
      </div>

      {/* User badge */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs text-white"
              style={{ background: "rgba(255,255,255,0.2)" }}>
              {user.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-xs truncate">{user.name}</p>
              <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${collapsed ? "justify-center" : ""}`}
              style={active
                ? { background: "rgba(255,255,255,0.18)", color: "#fff" }
                : { color: "rgba(255,255,255,0.6)" }
              }
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-semibold">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-3 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <button onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${collapsed ? "justify-center" : ""}`}
          style={{ color: "rgba(255,255,255,0.55)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
        >
          <LogOut size={16} />
          {!collapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default function SellerPortalLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/seller-portal/login") { setChecking(false); return; }
    const u = getSellerUser();
    if (!u) { router.replace("/adminpanel/login"); return; }
    setUser(u);
    setChecking(false);
  }, [pathname, router]);

  const handleLogout = async () => {
    await sellerLogout();
    router.replace("/adminpanel/login");
  };

  if (pathname === "/seller-portal/login") return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f9fafb" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "rgba(45,90,39,0.3)", borderTopColor: "#2d5a27" }} />
      </div>
    );
  }

  const sidebarBg = "linear-gradient(175deg, #1a3c1a 0%, #2d5a27 60%, #3a6d35 100%)";
  const sidebarProps = { user, collapsed, pathname, onLogout: handleLogout, onLinkClick: () => setMobileOpen(false) };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f1f5f0", fontFamily: "'Inter', sans-serif" }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col flex-shrink-0 transition-all duration-300"
        style={{ width: collapsed ? "56px" : "228px", background: sidebarBg }}>
        <Sidebar {...sidebarProps} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-60 z-50 transition-transform duration-300 md:hidden flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: sidebarBg }}>
        <button onClick={() => setMobileOpen(false)}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition">
          <X size={16} />
        </button>
        <Sidebar {...sidebarProps} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 shadow-sm flex items-center px-4 gap-4 flex-shrink-0" style={{ height: "52px" }}>
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-gray-500 hover:text-gray-800">
            <Menu size={20} />
          </button>
          <button onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-6 h-6 items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all">
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "#2d5a27" }}>
              <Store size={11} className="text-white" />
            </div>
            <span className="text-gray-400 text-xs font-semibold">Seller Portal</span>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-gray-700 text-xs font-bold capitalize">
              {pathname.split("/").pop() || "dashboard"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-green-300 transition-all">
              <Globe size={12} /> View Site
            </a>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ background: "linear-gradient(135deg, #2d5a27, #4a7c3f)" }}>
              {user?.name?.[0]?.toUpperCase() || "S"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
