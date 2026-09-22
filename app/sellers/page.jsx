"use client";
import { useState, useEffect } from "react";
import MarketplaceHeader from "@/components/layout/MarketplaceHeader";
import MarketplaceFooter from "@/components/layout/MarketplaceFooter";
import SellerCard from "@/components/ui/cards/SellerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

/* ─── tiny icon helpers ─── */
const SearchIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const Skeleton = ({ cls }) => <div className={`animate-pulse bg-gray-200 rounded-lg ${cls}`} />;

export default function SellersPage() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        // Fetch up to 100 sellers for local filtering
        const q = query(collection(db, "sellers"), orderBy("createdAt", "desc"), limit(100));
        const snap = await getDocs(q);
        setSellers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Error fetching sellers:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  // Filter sellers based on search query
  const filteredSellers = sellers.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = (s.companyName || s.name || "").toLowerCase();
    const cat = (s.category || "").toLowerCase();
    const state = (s.state || "").toLowerCase();
    const city = (s.city || "").toLowerCase();
    return name.includes(q) || cat.includes(q) || state.includes(q) || city.includes(q);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <MarketplaceHeader />

      <main className="flex-1 pt-16">
        {/* Header Section with Search */}
        <div className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-black text-[#1e3a5f] tracking-tight mb-6">
              All Verified Sellers
            </h1>

            <div className="relative max-w-2xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search by company name, category, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {searchQuery ? "Search Results" : "Latest Sellers"}
            </h2>
            <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              {loading ? "..." : filteredSellers.length} Sellers Found
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-52" />)
            ) : filteredSellers.length > 0 ? (
              filteredSellers.map(s => <SellerCard key={s.id} s={s} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No sellers found</h3>
                <p className="text-sm">We couldn't find any sellers matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-sm font-bold text-orange-500 hover:text-orange-600 underline"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
