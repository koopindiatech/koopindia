"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { buyerLogin } from "../lib/auth";

export default function BuyerLoginPage() {
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
    const result = await buyerLogin(email.trim(), password);
    setLoading(false);
    if (result.success) {
      router.replace("/buyer-portal/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left — branding panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #2e1065 0%, #4c1d95 40%, #6d28d9 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #c4b5fd 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f0abfc 0%, transparent 70%)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <span className="text-white font-extrabold text-xl">koop</span>
              <span className="font-extrabold text-xl" style={{ color: "#f0abfc" }}>india</span>
              <span className="font-extrabold text-xl" style={{ color: "#f0abfc" }}>.</span>
            </div>
          </div>
          <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>Buyer Portal</p>
        </div>

        {/* Center */}
        <div className="relative z-10 space-y-6">
          <div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(255,255,255,0.12)" }}>
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Source Smarter,<br />Grow Faster.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)" }} className="text-sm leading-relaxed">
              Your buyer dashboard — track supplier inquiries, manage your profile, and monitor leads in one place.
            </p>
          </div>
          <div className="space-y-2.5">
            {[
              { emoji: "📋", text: "View your assigned leads" },
              { emoji: "🏢", text: "Manage your buyer profile" },
              { emoji: "🔒", text: "Secure, isolated access" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <span className="text-lg">{f.emoji}</span>
                <span className="text-white text-sm font-semibold">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-xs">© 2025 KoopIndia. All rights reserved.</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#4c1d95" }}>
              <Globe size={16} className="text-white" />
            </div>
            <span className="font-black text-lg text-gray-900">koop<span style={{ color: "#f97316" }}>india</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Buyer Sign In</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access the buyer portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:border-purple-500 placeholder:text-gray-400 transition-all shadow-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} autoComplete="current-password" value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:border-purple-500 placeholder:text-gray-400 transition-all shadow-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                <span className="text-red-500 text-xs font-semibold">{error}</span>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold transition-all shadow-lg mt-2 disabled:opacity-60"
              style={{ background: loading ? "#6d28d9" : "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)", boxShadow: "0 4px 20px rgba(109,40,217,0.35)" }}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : <>Sign In to Buyer Portal <ArrowRight size={16} /></>}
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
