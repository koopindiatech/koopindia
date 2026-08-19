"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SellerCard from "./cards/SellerCard";
import BuyerCard from "./cards/BuyerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const proxyImg = (u) =>
  u && typeof u === "string" && u.startsWith("http") && u.includes("firebase")
    ? `/api/img?url=${encodeURIComponent(u)}` : u;

const ini = (n = "") => n.split(" ").slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
const Skeleton = ({ cls }) => <div className={`animate-pulse bg-gray-200 rounded-xl ${cls}`} />;

const SELLER_CATS = ["Food & Beverages", "Spices & Masalas", "Healthcare", "Industrial", "Home Care", "Cosmetics"];
const BUYER_CATS  = ["FMCG", "Textile", "Electronics", "Pharma", "Agro", "Apparel"];

/* ══════════════════════════════════════════════════════
   1. LATEST SELLERS with its own search bar
══════════════════════════════════════════════════════ */
export function HomeLatestSellers() {
  const [latest, setLatest]     = useState([]);
  const [results, setResults]   = useState(null); // null = not searched
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [searching, setSearching] = useState(false);
  const resultsRef = useRef(null);

  /* fetch latest sellers on mount */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const snap = await getDocs(query(collection(db, "sellers"), orderBy("createdAt", "desc"), limit(10)));
        setLatest(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  /* search sellers from Firestore */
  const runSearch = async (term) => {
    const q = (term ?? search).trim().toLowerCase();
    if (!q) { setResults(null); return; }
    setSearching(true);
    try {
      const snap = await getDocs(collection(db, "sellers"));
      const all  = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setResults(all.filter(s => {
        const name  = (s.name || s.companyName || "").toLowerCase();
        const cat   = (s.category || "").toLowerCase();
        const state = (s.state || s.city || "").toLowerCase();
        const biz   = (s.natureOfBusiness || "").toLowerCase();
        return name.includes(q) || cat.includes(q) || state.includes(q) || biz.includes(q);
      }));
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch (e) { console.error(e); setResults([]); }
    finally { setSearching(false); }
  };

  const clear = () => { setSearch(""); setResults(null); };
  const display = results ?? latest; // show results if searched, else show latest

  return (
    <section className="py-12 px-4 sm:px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[#F97316] text-xs font-black uppercase tracking-widest mb-1">Buyer Directory</p>
            <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight">
              Latest Listed <span className="text-[#F97316]">Sellers</span>
            </h2>
          </div>
          <Link href="/sellers"
            className="text-sm font-bold text-[#1e3a5f] border border-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white px-4 py-2 rounded-xl transition-all self-start sm:self-auto">
            View All Sellers →
          </Link>
        </div>

        {/* Seller search bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 mb-6">
          <div className="flex gap-2">
            <div className="flex items-center flex-1 gap-2 px-3 bg-[#f8fafc] rounded-xl border border-gray-200">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search sellers by name, category, state..."
                value={search}
                onChange={e => { setSearch(e.target.value); if (!e.target.value.trim()) setResults(null); }}
                onKeyDown={e => e.key === "Enter" && runSearch()}
                className="flex-1 text-sm py-2.5 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
              {search && (
                <button onClick={clear} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
              )}
            </div>
            <button onClick={() => runSearch()} disabled={searching}
              className="bg-[#1e3a5f] hover:bg-[#162c4a] text-white font-black px-5 py-2.5 rounded-xl text-sm transition-all flex-shrink-0 flex items-center gap-2 disabled:opacity-70">
              {searching && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Search
            </button>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {SELLER_CATS.map(cat => (
              <button key={cat} onClick={() => { setSearch(cat); runSearch(cat); }}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 hover:bg-[#1e3a5f] hover:text-white text-gray-600 transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status bar when searching */}
        {results !== null && (
          <div ref={resultsRef} className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="text-sm font-bold text-[#1e3a5f]">
              {searching ? "Searching..." : results.length > 0
                ? <>{results.length} seller{results.length !== 1 ? "s" : ""} found for <span className="text-[#F97316]">"{search}"</span></>
                : <>No sellers found for <span className="text-[#F97316]">"{search}"</span></>
              }
            </p>
            <button onClick={clear} className="text-xs font-bold text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1 rounded-lg">
              × Clear
            </button>
          </div>
        )}

        {/* Grid */}
        {searching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} cls="h-44" />)}
          </div>
        ) : results !== null && results.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-2">🔍</div>
            <p className="font-bold text-gray-500">No sellers found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different keyword or browse all</p>
            <Link href="/sellers" className="mt-3 inline-block bg-[#1e3a5f] text-white font-bold text-sm px-5 py-2 rounded-xl hover:bg-[#162c4a] transition-all">
              Browse All Sellers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading && results === null
              ? [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-56" />)
              : display.slice(0, 10).map(s => <SellerCard key={s.id} s={s} />)
            }
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   2. LATEST BUYERS with its own search bar
══════════════════════════════════════════════════════ */
export function HomeLatestBuyers() {
  const [latest, setLatest]       = useState([]);
  const [results, setResults]     = useState(null);
  const [search, setSearch]       = useState("");
  const [loading, setLoading]     = useState(true);
  const [searching, setSearching] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const snap = await getDocs(query(collection(db, "buyers"), orderBy("createdAt", "desc"), limit(6)));
        setLatest(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const runSearch = async (term) => {
    const q = (term ?? search).trim().toLowerCase();
    if (!q) { setResults(null); return; }
    setSearching(true);
    try {
      const snap = await getDocs(collection(db, "buyers"));
      const all  = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setResults(all.filter(b => {
        const name  = (b.buyerName || "").toLowerCase();
        const cat   = (b.category || b.businessType || "").toLowerCase();
        const state = (b.state || b.city || "").toLowerCase();
        return name.includes(q) || cat.includes(q) || state.includes(q);
      }));
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch (e) { console.error(e); setResults([]); }
    finally { setSearching(false); }
  };

  const clear = () => { setSearch(""); setResults(null); };
  const display = results ?? latest;

  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[#F97316] text-xs font-black uppercase tracking-widest mb-1">Buyer Listings</p>
            <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight">
              Latest Listed <span className="text-[#F97316]">Buyers</span>
            </h2>
          </div>
          <Link href="/marketplace"
            className="text-sm font-bold text-[#F97316] border border-[#F97316] hover:bg-[#F97316] hover:text-white px-4 py-2 rounded-xl transition-all self-start sm:self-auto">
            View All Buyers →
          </Link>
        </div>

        {/* Buyer search bar */}
        <div className="bg-[#fff8f3] rounded-2xl border border-orange-100 shadow-sm p-3 mb-6">
          <div className="flex gap-2">
            <div className="flex items-center flex-1 gap-2 px-3 bg-white rounded-xl border border-orange-100">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search buyers by name, category, state..."
                value={search}
                onChange={e => { setSearch(e.target.value); if (!e.target.value.trim()) setResults(null); }}
                onKeyDown={e => e.key === "Enter" && runSearch()}
                className="flex-1 text-sm py-2.5 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
              {search && (
                <button onClick={clear} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
              )}
            </div>
            <button onClick={() => runSearch()} disabled={searching}
              className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-5 py-2.5 rounded-xl text-sm transition-all flex-shrink-0 flex items-center gap-2 disabled:opacity-70">
              {searching && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Search
            </button>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {BUYER_CATS.map(cat => (
              <button key={cat} onClick={() => { setSearch(cat); runSearch(cat); }}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 hover:bg-[#F97316] hover:text-white text-orange-600 border border-orange-100 transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status bar */}
        {results !== null && (
          <div ref={resultsRef} className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="text-sm font-bold text-[#1e3a5f]">
              {searching ? "Searching..." : results.length > 0
                ? <>{results.length} buyer{results.length !== 1 ? "s" : ""} found for <span className="text-[#F97316]">"{search}"</span></>
                : <>No buyers found for <span className="text-[#F97316]">"{search}"</span></>
              }
            </p>
            <button onClick={clear} className="text-xs font-bold text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1 rounded-lg">
              × Clear
            </button>
          </div>
        )}

        {/* Grid */}
        {searching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} cls="h-44" />)}
          </div>
        ) : results !== null && results.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-2">🔍</div>
            <p className="font-bold text-gray-500">No buyers found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different keyword or browse all</p>
            <Link href="/marketplace" className="mt-3 inline-block bg-[#F97316] text-white font-bold text-sm px-5 py-2 rounded-xl hover:bg-orange-600 transition-all">
              Browse All Buyers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading && results === null
              ? [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-56" />)
              : display.slice(0, 10).map(b => <BuyerCard key={b.id} b={b} />)
            }
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] text-white rounded-2xl px-8 py-5 shadow-xl flex-wrap justify-center">
            <span className="text-3xl">🚀</span>
            <div className="text-left">
              <p className="font-black text-base">Grow Your Buyer Nationwide</p>
              <p className="text-white/80 text-xs">Join 1000+ verified buyers on Koop India</p>
            </div>
            <Link href="/marketplace"
              className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 shadow-lg whitespace-nowrap">
              List Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── default export ── */
export default function HomeMarketSection() {
  return (
    <div>
      <HomeLatestSellers />
      <HomeLatestBuyers />
    </div>
  );
}
