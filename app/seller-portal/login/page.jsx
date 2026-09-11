"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { sellerLogin } from "../lib/auth";

export default function SellerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await sellerLogin(email.trim(), password);
    setLoading(false);
    if (result.success) {
      router.replace("/seller-portal/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left — branding panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a3c1a 0%, #2d5a27 40%, #4a7c3f 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #a3f4a3 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f5c842 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 w-40 h-96 opacity-5" style={{ background: "linear-gradient(180deg, #ffffff 0%, transparent 100%)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <span className="text-white font-extrabold text-xl leading-none">koop</span>
              <span className="font-extrabold text-xl leading-none" style={{ color: "#f5c842" }}>india</span>
              <span className="font-extrabold text-xl leading-none" style={{ color: "#f5c842" }}>.</span>
            </div>
          </div>
          <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>Seller Portal</p>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(255,255,255,0.12)" }}>
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Your Business,<br />Your Dashboard.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)" }} className="text-sm leading-relaxed">
              Access your seller profile, manage inquiries, and track leads — all from one secure place.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-2.5">
            {[
              { emoji: "📊", text: "View your assigned leads" },
              { emoji: "👤", text: "Manage your seller profile" },
              { emoji: "🔒", text: "Secure, isolated access" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <span className="text-lg">{f.emoji}</span>
                <span className="text-white text-sm font-semibold">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-xs">
            © 2025 KoopIndia. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#2d5a27" }}>
              <Globe size={16} className="text-white" />
            </div>
            <span className="font-black text-lg text-gray-900">koop<span style={{ color: "#f97316" }}>india</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Seller Sign In</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access the seller portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:border-green-500 placeholder:text-gray-400 transition-all shadow-sm"
                style={{ "--tw-ring-color": "rgba(45,90,39,0.2)" }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:border-green-500 placeholder:text-gray-400 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                <span className="text-red-500 text-xs font-semibold">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold transition-all shadow-lg mt-2 disabled:opacity-60"
              style={{ background: loading ? "#4a7c3f" : "linear-gradient(135deg, #2d5a27 0%, #4a7c3f 100%)", boxShadow: "0 4px 20px rgba(45,90,39,0.35)" }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                <>Sign In to Seller Portal <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Credentials are provided by your KoopIndia admin.
          </p>
        </div>
      </div>
    </div>
  );
}
