"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/auth";
import { sellerLogin } from "../../seller-portal/lib/auth";
import { buyerLogin } from "../../buyer-portal/lib/auth";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Globe, Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, ChevronRight } from "lucide-react";

// Try login across all 3 roles in sequence
async function autoLogin(email, password) {
  // 1. Try Admin
  const adminResult = await login(email, password);
  if (adminResult.success) return { ...adminResult, role: "admin" };

  // 2. Try Seller
  const sellerResult = await sellerLogin(email, password);
  if (sellerResult.success) return { ...sellerResult, role: "seller" };

  // 3. Try Buyer
  const buyerResult = await buyerLogin(email, password);
  if (buyerResult.success) return { ...buyerResult, role: "buyer" };

  return { success: false, error: "Invalid email or password." };
}

export default function UnifiedLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [banner, setBanner] = useState(null); // { imageUrl, title, subtitle, bgColor }
  const [bannerLoading, setBannerLoading] = useState(true);

  // Fetch admin-managed banner from Firestore
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "login_banner"));
        if (snap.exists()) {
          setBanner(snap.data());
        }
      } catch (e) {
        // Banner fetch fail — use default gradient
      } finally {
        setBannerLoading(false);
      }
    };
    fetchBanner();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);

    const result = await autoLogin(email.trim(), password);
    setLoading(false);

    if (result.success) {
      if (result.role === "admin") router.replace("/adminpanel");
      else if (result.role === "seller") router.replace("/seller-portal/dashboard");
      else router.replace("/buyer-portal/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  const defaultBg = "linear-gradient(160deg, #1c0a00 0%, #7c2d12 50%, #f97316 100%)";

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Left Banner Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 flex-shrink-0 relative overflow-hidden"
        style={{
          background: banner?.bgColor || defaultBg,
        }}
      >
        {/* Banner image (full cover) */}
        {!bannerLoading && banner?.imageUrl && (
          <img
            src={banner.imageUrl}
            alt="Login Banner"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: banner.imageOpacity ?? 1 }}
          />
        )}

        {/* Overlay gradient for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: banner?.imageUrl
              ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)"
              : "transparent",
          }}
        />

        {/* Decorative blobs (shown when no image) */}
        {!banner?.imageUrl && (
          <>
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: "#fb923c" }} />
            <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background: "#fde68a" }} />
          </>
        )}

        {/* Logo top-left */}
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Globe size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-white font-extrabold text-lg leading-none">koop</span>
                <span className="font-extrabold text-lg leading-none" style={{ color: "#fed7aa" }}>india.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="relative z-10 p-8">

          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} KoopIndia. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            <span className="font-black text-lg text-gray-900">koop<span className="text-orange-500">india.</span></span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900">Sign in</h1>
            <p className="text-gray-400 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
              <span className="text-red-600 text-xs font-semibold">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-gray-500 text-xs font-bold block mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-500 text-xs font-bold block mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-10 py-3 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-colors shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-orange-500/25 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Credentials are provided by your KoopIndia admin.
          </p>
        </div>
      </div>
    </div>
  );
}
