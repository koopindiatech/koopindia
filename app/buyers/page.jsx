"use client";
import { useState, useEffect, useRef } from "react";
import MarketplaceHeader from "@/components/layout/MarketplaceHeader";
import MarketplaceFooter from "@/components/layout/MarketplaceFooter";
import BuyerCard from "@/components/ui/cards/BuyerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

// SVG icon helpers
const SearchIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  <circle cx="11" cy="11" r="8" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDown = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;
const ChevronLeft = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>;
const ChevronRight2 = () => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>;

const CATEGORIES = [
  { label: "Food & Beverage", emoji: "🍱" },
  { label: "Health & Beauty", emoji: "💄" },
  { label: "Pharmaceuticals", emoji: "💊" },
  { label: "Apparel & Fashion", emoji: "👗" },
  { label: "Chemicals", emoji: "🧪" },
  { label: "Home Supplies", emoji: "🧹" },
  { label: "Construction & Real Estate", emoji: "🏗️" },
  { label: "Electronics & Electrical Supplies", emoji: "⚡" },
  { label: "Agriculture", emoji: "🌾" },
  { label: "Automobile", emoji: "🚗" },
  { label: "Packaging & Paper", emoji: "📦" },
  { label: "Hospital & Medical Supplies", emoji: "🏥" },
  { label: "Gifts & Crafts", emoji: "🎁" },
  { label: "Consumer Electronics", emoji: "📱" },
  { label: "Pipes, Tubes & Fittings", emoji: "🔧" },
  { label: "Industrial Supplies", emoji: "🏭" },
  { label: "Computer Hardware & Software", emoji: "💻" },
  { label: "Energy & Power", emoji: "🔋" },
  { label: "Furniture", emoji: "🪑" },
  { label: "Home Textiles & Furnishings", emoji: "🛋️" },
  { label: "Hotel Supplies & Equipment", emoji: "🏨" },
  { label: "Jewelry & Gemstones", emoji: "💎" },
  { label: "Leather & Leather Products", emoji: "👞" },
  { label: "Machinery", emoji: "⚙️" },
  { label: "Mineral & Metals", emoji: "⛏️" },
  { label: "Plastics & Products", emoji: "🛞" },
  { label: "Printing & Publishing", emoji: "🖨️" },
  { label: "Security & Protection", emoji: "🛡️" },
  { label: "Sports & Entertainment", emoji: "⚽" },
  { label: "Telecommunications", emoji: "📡" },
  { label: "Textiles & Fabrics", emoji: "🧵" },
  { label: "Toys", emoji: "🧸" },
  { label: "Transportation", emoji: "🚚" },
  { label: "Brass Hardware & Components", emoji: "🔩" },
  { label: "Environment & Pollution", emoji: "🌱" },
  { label: "Office & School Supplies", emoji: "✏️" },
  { label: "Scientific & Laboratory Instruments", emoji: "🔬" },
  { label: "Business Services", emoji: "💼" },
];

const STATES = [
  "All States", "Delhi", "Maharashtra", "Gujarat", "Karnataka", "Rajasthan",
  "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Punjab", "Haryana",
  "Madhya Pradesh", "Bihar", "Telangana", "Andhra Pradesh", "Kerala",
  "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh",
];

const Skeleton = ({ cls }) => <div className={`animate-pulse bg-gray-200 rounded-lg ${cls}`} />;

export default function BuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [catSel, setCatSel] = useState("All Categories");
  const [stateSel, setStateSel] = useState("All States");
  const catScrollRef = useRef(null);

  const scrollCats = (dir) => {
    if (catScrollRef.current) {
      catScrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        // Fetch up to 100 buyers for local filtering
        const q = query(collection(db, "buyers"), orderBy("createdAt", "desc"), limit(100));
        const snap = await getDocs(q);
        setBuyers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Error fetching buyers:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, []);

  // Filter buyers based on search query, category, and state
  const filteredBuyers = buyers.filter(b => {
    if (b.status === "paused" || b.status === "draft") return false;

    let match = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = (b.buyerName || b.companyName || b.name || "").toLowerCase();
      const cat = (b.category || "").toLowerCase();
      const state = (b.state || "").toLowerCase();
      const city = (b.city || "").toLowerCase();
      const biz = (b.businessType || "").toLowerCase();
      const req = Array.isArray(b.requirements)
        ? b.requirements.join(" ").toLowerCase()
        : (b.requirements || b.requirement || "").toLowerCase();
      const prodCats = Array.isArray(b.productCategories)
        ? b.productCategories.map(c => typeof c === "string" ? c : (c.name || "")).join(" ").toLowerCase()
        : "";
      if (!(name.includes(q) || cat.includes(q) || state.includes(q) || city.includes(q) || biz.includes(q) || req.includes(q) || prodCats.includes(q))) {
        match = false;
      }
    }

    if (match && catSel !== "All Categories") {
      const qCat = catSel.toLowerCase();
      const bCat = (b.category || "").toLowerCase();
      const bProdCats = (b.productCategories || []).map(c => typeof c === "string" ? c.toLowerCase() : (c.name || "").toLowerCase());
      const bBiz = (b.businessType || "").toLowerCase();
      if (!bCat.includes(qCat) && !bProdCats.some(c => c.includes(qCat)) && !bBiz.includes(qCat)) {
        match = false;
      }
    }

    if (match && stateSel !== "All States") {
      const qState = stateSel.toLowerCase();
      const bState = (b.state || "").toLowerCase();
      const bPrefStates = (b.preferredStates || []).map(s => (typeof s === "string" ? s : "").toLowerCase());
      if (!bState.includes(qState) && !bPrefStates.some(s => s.includes(qState))) {
        match = false;
      }
    }

    return match;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setCatSel("All Categories");
    setStateSel("All States");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <MarketplaceHeader />

      <main className="flex-1 pt-16">
        {/* Search Bar */}
        <section className="bg-[#1e3a5f] py-5 px-4 sm:px-6 shadow-md border-t border-white/5 relative z-40">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl p-2 shadow-xl shadow-blue-900/20">
              <div className="flex items-center flex-1 gap-2 px-3">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search buyers, requirements or categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm py-2 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
                />
              </div>

              <div className="relative hidden md:block">
                <select
                  value={stateSel}
                  onChange={e => setStateSel(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 pl-3 pr-7 py-2.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 min-w-[130px]"
                >
                  {STATES.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              <button className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-7 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-400/30 text-sm flex-shrink-0 flex items-center gap-2 justify-center">
                Search
              </button>
            </div>

            {/* Mobile State Filter */}
            <div className="mt-2 block md:hidden">
              <select
                value={stateSel}
                onChange={e => setStateSel(e.target.value)}
                className="w-full appearance-none bg-white/10 text-white border border-white/20 text-xs font-semibold px-3 py-2 rounded-xl outline-none"
              >
                {STATES.map(o => <option key={o} value={o} className="text-gray-800">{o}</option>)}
              </select>
            </div>

            {(catSel !== "All Categories" || stateSel !== "All States" || searchQuery) && (
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
                {searchQuery && (
                  <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-orange-300">×</button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-bold text-orange-300 hover:text-orange-200 underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="bg-white py-6 px-4 sm:px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">BROWSE BY</span>
              <h2 className="text-2xl font-black text-[#1e3a5f] mt-1 tracking-tight">Explore All Categories</h2>
            </div>

            <div className="relative">
              {/* Left Scroll Button */}
              <button
                onClick={() => scrollCats(-1)}
                aria-label="Scroll Categories Left"
                className="flex absolute left-0 top-1/2 -translate-y-[calc(50%+8px)] -ml-2 sm:-ml-4 z-20 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-white border border-gray-200 shadow-md sm:shadow-lg rounded-full text-gray-600 hover:text-orange-500 hover:border-orange-300 active:scale-95 transition-all hover:scale-105"
              >
                <ChevronLeft />
              </button>

              {/* Right Scroll Button */}
              <button
                onClick={() => scrollCats(1)}
                aria-label="Scroll Categories Right"
                className="flex absolute right-0 top-1/2 -translate-y-[calc(50%+8px)] -mr-2 sm:-mr-4 z-20 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-white border border-gray-200 shadow-md sm:shadow-lg rounded-full text-gray-600 hover:text-orange-500 hover:border-orange-300 active:scale-95 transition-all hover:scale-105"
              >
                <ChevronRight2 />
              </button>

              <div
                ref={catScrollRef}
                className="flex gap-3 overflow-x-auto pb-4 px-6 sm:px-1 scrollbar-hide scroll-smooth"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              >
                <button
                  onClick={() => setCatSel("All Categories")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all font-bold text-sm ${catSel === "All Categories" ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/20" : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"}`}
                >
                  <span>📁</span> All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.label}
                    onClick={() => setCatSel(cat.label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all font-bold text-sm ${catSel === cat.label ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/20" : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"}`}
                  >
                    <span>{cat.emoji}</span> {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buyers Grid */}
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {searchQuery || catSel !== "All Categories" || stateSel !== "All States" ? "Search & Filter Results" : "Latest Buyers"}
            </h2>
            <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              {loading ? "..." : filteredBuyers.length} Buyers Found
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-52" />)
            ) : filteredBuyers.length > 0 ? (
              filteredBuyers.map(b => <BuyerCard key={b.id} b={b} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No buyers found</h3>
                <p className="text-sm text-center max-w-md">
                  We couldn't find any buyers matching your current filters
                  {catSel !== "All Categories" && ` in "${catSel}"`}
                  {stateSel !== "All States" && ` from "${stateSel}"`}
                  {searchQuery && ` for "${searchQuery}"`}.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 text-sm font-bold text-orange-500 hover:text-orange-600 underline"
                >
                  Clear All Filters
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
