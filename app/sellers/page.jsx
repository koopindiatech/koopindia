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

const ChevronDown = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;

const CATEGORIES = [
  { label: "Spices & Masala", emoji: "🌶️" },
  { label: "FMCG & Grocery", emoji: "🛒" },
  { label: "Agriculture & Farming", emoji: "🌾" },
  { label: "Food & Beverages", emoji: "🍱" },
  { label: "Dairy & Dairy Products", emoji: "🥛" },
  { label: "Packaged Foods", emoji: "🥫" },
  { label: "Snacks & Namkeen", emoji: "🥨" },
  { label: "Edible Oils", emoji: "🛢️" },
  { label: "Health & Wellness", emoji: "⚕️" },
  { label: "Ayurvedic & Herbal", emoji: "🌿" },
  { label: "Pharmaceuticals", emoji: "💊" },
  { label: "Chemicals & Fertilizers", emoji: "🧪" },
  { label: "Textile & Garments", emoji: "👕" },
  { label: "Electronics & Hardware", emoji: "🔌" },
  { label: "Construction Materials", emoji: "🏗️" },
  { label: "Machinery & Equipment", emoji: "⚙️" },
  { label: "Furniture & Interiors", emoji: "🪑" },
  { label: "Automotive Parts", emoji: "🚗" },
  { label: "Handicrafts & Gifts", emoji: "🎁" },
  { label: "Stationery & Paper", emoji: "📝" },
  { label: "Plastics & Rubber", emoji: "🛞" },
  { label: "Export & Import", emoji: "🚢" },
  { label: "Other", emoji: "📦" }
];

const STATES = [
  "All States", "Delhi", "Maharashtra", "Gujarat", "Karnataka", "Rajasthan",
  "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Punjab", "Haryana",
  "Madhya Pradesh", "Bihar", "Telangana", "Andhra Pradesh", "Kerala",
  "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh",
];

const Skeleton = ({ cls }) => <div className={`animate-pulse bg-gray-200 rounded-lg ${cls}`} />;

export default function SellersPage() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [catSel, setCatSel] = useState("All Categories");
  const [stateSel, setStateSel] = useState("All States");
  const [catDropOpen, setCatDropOpen] = useState(false);

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
    let match = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = (s.companyName || s.name || "").toLowerCase();
      const cat = (s.category || "").toLowerCase();
      const state = (s.state || "").toLowerCase();
      const city = (s.city || "").toLowerCase();
      if (!(name.includes(q) || cat.includes(q) || state.includes(q) || city.includes(q))) match = false;
    }
    
    if (match && catSel !== "All Categories") {
      const sellerCat = (s.category || "").toLowerCase();
      const sellerProdCats = (s.productCategories || []).map(c => typeof c === "string" ? c.toLowerCase() : (c.name || "").toLowerCase());
      if (!sellerCat.includes(catSel.toLowerCase()) && !sellerProdCats.some(c => c.includes(catSel.toLowerCase()))) match = false;
    }
    
    if (match && stateSel !== "All States") {
      const sellerState = (s.state || "").toLowerCase();
      if (!sellerState.includes(stateSel.toLowerCase())) match = false;
    }
    
    return match;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <MarketplaceHeader />

      <main className="flex-1 pt-16">
        <div className="bg-white py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-black text-[#1e3a5f] tracking-tight">
              All Verified Sellers
            </h1>
          </div>
        </div>

        {/* ══════════════ SEARCH BAR ══════════════ */}
        <section className="bg-[#1e3a5f] py-5 px-4 sm:px-6 shadow-md border-t border-white/5 relative z-40">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl p-2 shadow-xl shadow-blue-900/20">
              <div className="flex items-center flex-1 gap-2 px-3">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search buyers, products or categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm py-2 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
                />
              </div>

              <div className="relative hidden md:block">
                <button
                  onClick={() => setCatDropOpen(o => !o)}
                  className="flex items-center justify-between gap-2 appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 pl-3 pr-3 py-2.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 min-w-[160px]">
                  <span className="flex-1 text-left truncate">{catSel === "All Categories" ? "All Categories" : catSel}</span>
                  <ChevronDown />
                </button>
                {catDropOpen && (
                  <div className="absolute top-full left-0 md:right-0 md:left-auto mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden" style={{ width: "280px" }}>
                    <div className="p-2 max-h-[400px] overflow-y-auto">
                      <button onClick={() => { setCatSel("All Categories"); setCatDropOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition ${catSel === "All Categories" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50 text-gray-600"}`}>
                        All Categories
                      </button>
                      {CATEGORIES.map(cat => (
                        <button key={cat.label} onClick={() => { setCatSel(cat.label); setCatDropOpen(false); }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${catSel === cat.label ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50 text-gray-700"}`}>
                          <span>{cat.emoji}</span> {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative hidden md:block">
                <select value={stateSel} onChange={e => setStateSel(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 pl-3 pr-7 py-2.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 min-w-[130px]">
                  {STATES.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              <button className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-7 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-400/30 text-sm flex-shrink-0 flex items-center gap-2 justify-center">
                Search
              </button>
            </div>
            
            {(catSel !== "All Categories" || stateSel !== "All States") && (
              <div className="flex flex-wrap gap-2 mt-2 px-1">
                {catSel !== "All Categories" && (
                  <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    {catSel}
                    <button onClick={() => setCatSel("All Categories")} className="ml-1 hover:text-orange-300">×</button>
                  </span>
                )}
                {stateSel !== "All States" && (
                  <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    {stateSel}
                    <button onClick={() => setStateSel("All States")} className="ml-1 hover:text-orange-300">×</button>
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

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
