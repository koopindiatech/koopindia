"use client";
import { useState, useEffect, useMemo } from "react";
import MarketplaceHeader from "@/components/layout/MarketplaceHeader";
import MarketplaceFooter from "@/components/layout/MarketplaceFooter";
import BuyerCard from "@/components/ui/cards/BuyerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { matchCategory, matchState, matchCity, FILTER_STATES } from "@/lib/categoryAccess";

// SVG icon helpers
const SearchIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MapPinIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FilterIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

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

// Helper to match buyer against a list of selected category labels
const matchBuyerCategories = (b, catList) => {
  if (!catList || catList.length === 0) return true;

  return catList.some(cat => {
    return (
      matchCategory(b.category, cat) ||
      matchCategory(b.subcategory, cat) ||
      matchCategory(b.productCategories, cat) ||
      matchCategory(b.productCategoryText, cat) ||
      matchCategory(b.requirements, cat) ||
      matchCategory(b.businessType, cat)
    );
  });
};

export default function BuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [stateSel, setStateSel] = useState("All States");
  const [citySel, setCitySel] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        let snap;
        try {
          snap = await getDocs(query(collection(db, "buyers"), orderBy("createdAt", "desc")));
        } catch {
          snap = await getDocs(collection(db, "buyers"));
        }
        setBuyers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Error fetching buyers:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, []);

  // Compute live counts for each category
  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(cat => {
      counts[cat.label] = buyers.filter(b => {
        if (b.status === "paused" || b.status === "draft") return false;
        return matchBuyerCategories(b, [cat.label]);
      }).length;
    });
    return counts;
  }, [buyers]);

  // Categories filtered by the sidebar's search input
  const visibleCategories = useMemo(() => {
    if (!categorySearch.trim()) return CATEGORIES;
    const q = categorySearch.toLowerCase().trim();
    return CATEGORIES.filter(c => c.label.toLowerCase().includes(q));
  }, [categorySearch]);

  // Filter buyers based on search query, selected checkbox categories, state, and city
  const filteredBuyers = useMemo(() => {
    return buyers.filter(b => {
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

      if (match && selectedCategories.length > 0) {
        if (!matchBuyerCategories(b, selectedCategories)) {
          match = false;
        }
      }

      if (match && stateSel !== "All States") {
        const matchPreferred = Array.isArray(b.preferredStates) && b.preferredStates.some(st => matchState(st, stateSel));
        if (!matchState(b.state, stateSel) && !matchPreferred) {
          match = false;
        }
      }

      if (match && citySel.trim()) {
        if (!matchCity(b.city, citySel) && !matchCity(b.district, citySel)) {
          match = false;
        }
      }

      return match;
    });
  }, [buyers, searchQuery, selectedCategories, stateSel, citySel]);

  const toggleCategory = (catLabel) => {
    setSelectedCategories(prev =>
      prev.includes(catLabel) ? prev.filter(c => c !== catLabel) : [...prev, catLabel]
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setStateSel("All States");
    setCitySel("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <MarketplaceHeader />

      <main className="flex-1 pt-16">
        {/* Search Bar */}
        <section className="bg-[#1e3a5f] py-5 px-4 sm:px-6 shadow-md border-t border-white/5 relative z-30">
          <div className="max-w-7xl mx-auto">
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

              {/* City Filter */}
              <div className="relative hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-1 min-w-[130px]">
                <MapPinIcon />
                <input
                  type="text"
                  placeholder="City (e.g. Delhi)"
                  value={citySel}
                  onChange={e => setCitySel(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-gray-700 outline-none w-full pl-2 placeholder:text-gray-400"
                />
                {citySel && (
                  <button onClick={() => setCitySel("")} className="text-gray-400 hover:text-gray-600 ml-1 text-xs">
                    ×
                  </button>
                )}
              </div>

              <button
                className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-7 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-400/30 text-sm flex-shrink-0 flex items-center gap-2 justify-center"
              >
                Search
              </button>
            </div>

            {/* Mobile State and City Filter */}
            <div className="mt-2 grid grid-cols-2 gap-2 md:hidden">
              <select
                value={stateSel}
                onChange={e => setStateSel(e.target.value)}
                className="w-full appearance-none bg-white/10 text-white border border-white/20 text-xs font-semibold px-3 py-2 rounded-xl outline-none"
              >
                {STATES.map(o => <option key={o} value={o} className="text-gray-800">{o}</option>)}
              </select>
              <input
                type="text"
                placeholder="City..."
                value={citySel}
                onChange={e => setCitySel(e.target.value)}
                className="w-full bg-white/10 text-white placeholder:text-white/60 border border-white/20 text-xs font-semibold px-3 py-2 rounded-xl outline-none"
              />
            </div>

            {(selectedCategories.length > 0 || stateSel !== "All States" || citySel || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
                {citySel && (
                  <span className="text-[11px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                    📍 {citySel}
                    <button onClick={() => setCitySel("")} className="ml-1 hover:text-orange-300 font-black">×</button>
                  </span>
                )}
                {selectedCategories.length > 0 && (
                  <span className="text-[11px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                    🏷️ {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"}
                    <button onClick={clearCategories} className="ml-1 hover:text-orange-300 font-black">×</button>
                  </span>
                )}
                {stateSel !== "All States" && (
                  <span className="text-[11px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                    📍 {stateSel}
                    <button onClick={() => setStateSel("All States")} className="ml-1 hover:text-orange-300 font-black">×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="text-[11px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5">
                    🔍 "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-orange-300 font-black">×</button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-bold text-orange-300 hover:text-orange-200 underline ml-1 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Main Content with Left Category Sidebar + Right Grid */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
          {/* Mobile Filter Toggle Button */}
          <div className="block lg:hidden mb-4">
            <button
              onClick={() => setMobileFilterOpen(p => !p)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-xs font-bold text-sm text-gray-800 hover:border-orange-300"
            >
              <div className="flex items-center gap-2">
                <FilterIcon />
                <span>Filter by Category</span>
                {selectedCategories.length > 0 && (
                  <span className="bg-[#F97316] text-white text-xs px-2 py-0.5 rounded-full font-black">
                    {selectedCategories.length}
                  </span>
                )}
              </div>
              <span className="text-xs text-orange-600">
                {mobileFilterOpen ? "Hide Filters ▲" : "Show Filters ▼"}
              </span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Sidebar Categories */}
            <aside
              className={`w-full lg:w-72 xl:w-80 flex-shrink-0 ${
                mobileFilterOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏷️</span>
                    <h3 className="font-extrabold text-gray-900 text-sm tracking-tight">Categories</h3>
                    {selectedCategories.length > 0 && (
                      <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        {selectedCategories.length}
                      </span>
                    )}
                  </div>
                  {selectedCategories.length > 0 ? (
                    <button
                      onClick={clearCategories}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  ) : (
                    <span className="text-[11px] font-medium text-gray-400">
                      {CATEGORIES.length} total
                    </span>
                  )}
                </div>

                {/* Category Search Input */}
                <div className="mt-3 relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search category..."
                    value={categorySearch}
                    onChange={e => setCategorySearch(e.target.value)}
                    className="w-full text-xs pl-8 pr-7 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white text-gray-800 placeholder:text-gray-400 transition-all"
                  />
                  {categorySearch && (
                    <button
                      onClick={() => setCategorySearch("")}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Select All / Deselect All */}
                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2.5 pb-1 px-1">
                  <button
                    onClick={() => {
                      if (visibleCategories.length > 0 && visibleCategories.every(c => selectedCategories.includes(c.label))) {
                        const visibleLabels = visibleCategories.map(c => c.label);
                        setSelectedCategories(prev => prev.filter(c => !visibleLabels.includes(c)));
                      } else {
                        const visibleLabels = visibleCategories.map(c => c.label);
                        setSelectedCategories(prev => Array.from(new Set([...prev, ...visibleLabels])));
                      }
                    }}
                    className="font-semibold text-orange-600 hover:underline cursor-pointer"
                  >
                    {visibleCategories.length > 0 && visibleCategories.every(c => selectedCategories.includes(c.label))
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                  <span className="text-gray-400">
                    {visibleCategories.length} {visibleCategories.length === 1 ? "category" : "categories"}
                  </span>
                </div>

                {/* Categories Scrollable Checkbox List */}
                <div className="mt-1 max-h-[calc(100vh-19rem)] overflow-y-auto pr-1 space-y-0.5 text-xs">
                  {visibleCategories.map(cat => {
                    const isChecked = selectedCategories.includes(cat.label);
                    const count = categoryCounts[cat.label] || 0;
                    return (
                      <label
                        key={cat.label}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer select-none transition-all group ${
                          isChecked
                            ? "bg-orange-50 text-orange-950 font-semibold"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.label)}
                            className="w-4 h-4 rounded text-orange-500 border-gray-300 focus:ring-orange-500 cursor-pointer accent-[#F97316] flex-shrink-0"
                          />
                          <span className="text-sm flex-shrink-0">{cat.emoji}</span>
                          <span className="truncate text-xs group-hover:text-orange-600 transition-colors">
                            {cat.label}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 flex-shrink-0 ${
                            isChecked
                              ? "bg-orange-200 text-orange-900"
                              : count > 0
                              ? "bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-700"
                              : "text-gray-300"
                          }`}
                        >
                          {count}
                        </span>
                      </label>
                    );
                  })}
                  {visibleCategories.length === 0 && (
                    <div className="py-6 text-center text-gray-400 text-xs">
                      No category matching "{categorySearch}"
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Right Main Content */}
            <div className="flex-1 min-w-0">
              {/* Active Category Badges / Filters Bar */}
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-4 bg-orange-50/60 p-3 rounded-2xl border border-orange-100/80 shadow-xs">
                  <span className="text-xs font-bold text-gray-600 mr-1 flex items-center gap-1">
                    <span>Selected:</span>
                  </span>
                  {selectedCategories.map(cat => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-orange-700 border border-orange-200 px-2.5 py-1 rounded-lg shadow-2xs"
                    >
                      <span>{cat}</span>
                      <button
                        onClick={() => toggleCategory(cat)}
                        className="hover:text-red-500 font-bold ml-1 text-gray-400 cursor-pointer"
                        title={`Remove ${cat}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearCategories}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 underline ml-auto cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Results Title & Count */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {searchQuery || selectedCategories.length > 0 || stateSel !== "All States"
                    ? "Search & Filter Results"
                    : "Latest Buyers"}
                </h2>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                  {loading ? "Loading..." : `${filteredBuyers.length} Buyers Found`}
                </span>
              </div>

              {/* Buyers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {loading ? (
                  [...Array(8)].map((_, i) => <Skeleton key={i} cls="h-56" />)
                ) : filteredBuyers.length > 0 ? (
                  filteredBuyers.map(b => <BuyerCard key={b.id} b={b} />)
                ) : (
                  <div className="col-span-full bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl mb-3">🔍</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">No buyers found</h3>
                    <p className="text-xs text-gray-500 max-w-md mb-4">
                      We couldn't find any buyers matching your current filters
                      {selectedCategories.length > 0 && ` in ${selectedCategories.join(", ")}`}
                      {stateSel !== "All States" && ` from "${stateSel}"`}
                      {searchQuery && ` for "${searchQuery}"`}.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-xs font-bold bg-[#F97316] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
