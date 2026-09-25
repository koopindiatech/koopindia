"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MarketplaceHeader from "../layout/MarketplaceHeader";
import MarketplaceFooter from "../layout/MarketplaceFooter";
import SellerCard from "./cards/SellerCard";
import BuyerCard from "./cards/BuyerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, where, doc, getDoc } from "firebase/firestore";
import { useModal } from "@/context/ModalContext";


/* ─── tiny icon helpers ─── */
const Icon = ({ d, size = 20, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);
const SearchIcon = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={18} />;
const StarIcon = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill={filled ? "#F97316" : "none"}
    stroke="#F97316" strokeWidth={2}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
);
const MapPin = () => <Icon d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" size={12} cls="inline" />;
const ArrowRight = () => <Icon d="M5 12h14M12 5l7 7-7 7" size={14} cls="inline" />;
const ChevronLeft = () => <Icon d="M15 18l-6-6 6-6" size={18} />;
const ChevronRight2 = () => <Icon d="M9 18l6-6-6-6" size={18} />;
const ChevronDown = () => <Icon d="M6 9l6 6 6-6" size={14} />;

const proxyImg = (u) =>
  u && typeof u === "string" && u.startsWith("http") && u.includes("firebase")
    ? `/api/img?url=${encodeURIComponent(u)}` : u;

const ini = (n = "") => n.split(" ").slice(0, 2).map(w => w[0] || "").join("").toUpperCase();

const CATEGORY_MAP = {
  "Spices & Masala": { emoji: "🌶️", subs: ["Whole Spices", "Ground Spices", "Blended Masala", "Curry Powder", "Chilli Products", "Turmeric Products", "Coriander Products", "Cumin Products", "Pepper Products", "Cardamom & Clove", "Garam Masala", "Kitchen King Masala", "Biryani Masala", "Chat Masala", "Pickle Masala", "Meat Masala", "Sambar Masala", "Other Masala"] },
  "FMCG & Grocery": { emoji: "🛒", subs: ["Staples & Grains", "Pulses & Lentils", "Rice & Wheat", "Flour & Atta", "Sugar & Salt", "Tea & Coffee", "Personal Care", "Home Care", "Baby Care", "Oral Care", "Skin Care", "Hair Care", "Detergent & Soap", "Other FMCG"] },
  "Agriculture & Farming": { emoji: "🌾", subs: ["Seeds & Seedlings", "Fertilizers", "Pesticides & Herbicides", "Farm Equipment", "Irrigation Products", "Crop Protection", "Organic Farming", "Horticulture", "Agri Commodities", "Livestock Feed", "Poultry Products", "Fishery Products", "Other Agri"] },
  "Food & Beverages": { emoji: "🍱", subs: ["Soft Drinks & Juices", "Alcoholic Beverages", "Energy Drinks", "Mineral Water", "Bakery & Confectionery", "Frozen Foods", "Ready to Eat", "Sauces & Condiments", "Jam & Spreads", "Noodles & Pasta", "Breakfast Cereals", "Dry Fruits & Nuts", "Honey & Sweeteners", "Other Food & Beverages"] },
  "Dairy & Dairy Products": { emoji: "🥛", subs: ["Milk & Cream", "Butter & Ghee", "Cheese", "Yogurt & Curd", "Paneer", "Ice Cream", "Dairy Whitener", "Flavoured Milk", "Khoa & Mawa", "Condensed Milk", "Dairy Blends", "Other Dairy"] },
  "Packaged Foods": { emoji: "🥫", subs: ["Canned Foods", "Pickles & Chutneys", "Papad & Fryums", "Mukhwas", "Instant Mixes", "Health Foods", "Protein Supplements", "Ethnic Foods", "Vegan & Organic", "Gluten Free", "Other Packaged Foods"] },
  "Snacks & Namkeen": { emoji: "🥨", subs: ["Chips & Wafers", "Namkeen & Bhujia", "Popcorn", "Extruded Snacks", "Roasted Snacks", "Biscuits & Cookies", "Crackers", "Puff Snacks", "Nuts & Seeds Snacks", "Chivda & Mixture", "Other Snacks"] },
  "Edible Oils": { emoji: "🛢️", subs: ["Mustard Oil", "Sunflower Oil", "Soybean Oil", "Palm Oil", "Groundnut Oil", "Rice Bran Oil", "Coconut Oil", "Sesame Oil", "Olive Oil", "Blended Oil", "Vanaspati & Shortening", "Other Edible Oils"] },
  "Health & Wellness": { emoji: "⚕️", subs: ["Vitamins & Minerals", "Protein Supplements", "Herbal Supplements", "Immunity Boosters", "Weight Management", "Sports Nutrition", "Probiotics", "Omega & Fish Oil", "Diabetic Care", "Women Health", "Kids Nutrition", "Other Health Products"] },
  "Ayurvedic & Herbal": { emoji: "🌿", subs: ["Ayurvedic Medicines", "Herbal Extracts", "Churna & Powder", "Kadha & Syrup", "Herbal Tea", "Essential Oils", "Herbal Cosmetics", "Herbal Food Products", "Ashwagandha Products", "Tulsi Products", "Amla Products", "Other Herbal"] },
  "Pharmaceuticals": { emoji: "💊", subs: ["Tablets & Capsules", "Syrup & Liquid", "Injections", "Topical Creams", "Surgical Disposables", "Diagnostic Products", "OTC Medicines", "Generic Medicines", "Veterinary Medicines", "Hospital Supplies", "Other Pharma"] },
  "Chemicals & Fertilizers": { emoji: "🧪", subs: ["Industrial Chemicals", "Agricultural Chemicals", "Dyes & Pigments", "Adhesives & Sealants", "Cleaning Chemicals", "Urea & DAP", "Micronutrients", "Bio Fertilizers", "Water Treatment", "Coating & Paints", "Other Chemicals"] },
  "Textile & Garments": { emoji: "👕", subs: ["Cotton Fabric", "Synthetic Fabric", "Knitted Fabric", "Woven Fabric", "Ready Made Garments", "Sarees & Ethnic Wear", "Kids Wear", "Sportswear", "Uniforms & Workwear", "Home Textiles", "Yarn & Thread", "Other Textile"] },
  "Electronics & Hardware": { emoji: "🔌", subs: ["Consumer Electronics", "Mobile Accessories", "LED & Lighting", "Cables & Wires", "Switches & Sockets", "CCTV & Security", "Solar Products", "Computer Hardware", "PCB & Components", "Industrial Electronics", "Other Electronics"] },
  "Construction Materials": { emoji: "🏗️", subs: ["Cement & Concrete", "Steel & Iron", "Bricks & Tiles", "Paints & Varnish", "Plumbing Materials", "Electrical Fittings", "Glass & Aluminum", "Waterproofing", "Stone & Marble", "Plywood & Laminates", "Other Construction"] },
  "Machinery & Equipment": { emoji: "⚙️", subs: ["Food Processing Machines", "Packaging Machines", "Agricultural Machines", "Industrial Pumps", "Compressors", "CNC & Lathe", "Welding Equipment", "Material Handling", "Generators", "HVAC Equipment", "Other Machinery"] },
  "Furniture & Interiors": { emoji: "🪑", subs: ["Wooden Furniture", "Metal Furniture", "Office Furniture", "Modular Kitchen", "Sofa & Seating", "Beds & Mattresses", "Wardrobes & Cabinets", "Decor & Artifacts", "Curtains & Blinds", "Flooring", "Other Furniture"] },
  "Automotive Parts": { emoji: "🚗", subs: ["Engine Parts", "Body Parts", "Electrical Parts", "Brake System", "Transmission Parts", "Filters & Lubricants", "Tyres & Wheels", "Car Accessories", "Two Wheeler Parts", "Heavy Vehicle Parts", "Other Auto Parts"] },
  "Handicrafts & Gifts": { emoji: "🎁", subs: ["Wooden Handicrafts", "Metal Handicrafts", "Textile Handicrafts", "Pottery & Ceramics", "Jewellery & Accessories", "Decorative Items", "Gift Items", "Festive Products", "Religious Items", "Wall Art", "Other Handicrafts"] },
  "Stationery & Paper": { emoji: "📝", subs: ["Office Stationery", "School Stationery", "Paper Products", "Notebooks & Diaries", "Pens & Writing Instruments", "Art & Craft Supplies", "Packaging Paper", "Labels & Tags", "Printing Solutions", "Other Stationery"] },
  "Plastics & Rubber": { emoji: "🛞", subs: ["PET Products", "HDPE Products", "PP Products", "PVC Products", "Rubber Products", "Silicone Products", "Plastic Packaging", "Plastic Components", "Rubber Seals & Gaskets", "Other Plastics & Rubber"] },
  "Export & Import": { emoji: "🚢", subs: ["Agricultural Exports", "Food & Spice Exports", "Textile Exports", "Handicraft Exports", "Chemical Exports", "Pharma Exports", "Import Trading", "Freight & Logistics", "Customs Clearance", "Other Export & Import"] },
  "Other": { emoji: "📦", subs: ["Other Products", "Other Services", "Other Businesses"] }
};

const CATEGORIES = Object.keys(CATEGORY_MAP).map(k => ({ label: k, emoji: CATEGORY_MAP[k].emoji, subs: CATEGORY_MAP[k].subs }));

const STATES = [
  "All States", "Delhi", "Maharashtra", "Gujarat", "Karnataka", "Rajasthan",
  "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Punjab", "Haryana",
  "Madhya Pradesh", "Bihar", "Telangana", "Andhra Pradesh", "Kerala",
  "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh",
];

const CERTS = ["All Certifications", "FSSAI", "GST", "ISO", "MSME", "Startup India", "BIS", "Organic Certified"];

const WHY = [
  { icon: "🛡️", title: "Verified & Trusted Buyers", desc: "All buyers are verified for quality, authenticity and business reliability." },
  { icon: "🏆", title: "Quality Assurance", desc: "We ensure high quality products from certified manufacturers." },
  { icon: "🤝", title: "Wide Business Network", desc: "Connect with distributors, retailers, exporters and business buyers." },
  { icon: "📍", title: "Nationwide Reach", desc: "Presence across all states of India for strong supply and distribution." },
];

const HOW_STEPS = [
  { num: "01", color: "bg-[#f97316]", label: "Register Your\nBuyer", icon: "📝" },
  { num: "02", color: "bg-[#1d4ed8]", label: "Verification &\nApproval", icon: "✅" },
  { num: "03", color: "bg-[#0ea5e9]", label: "Buyer Profile\nCreation", icon: "📄" },
  { num: "04", color: "bg-[#84cc16]", label: "Lead Generation\n& Promotion", icon: "📢" },
  { num: "05", color: "bg-[#f97316]", label: "Business\nGrowth", icon: "📈" },
];

const TESTIMONIALS = [
  { buyer: "Krivisha Industries", logo: "KI", color: "#1e40af", text: "\"Koop India helped us connect with verified distributors in 18 states and boost our sales by 300%\"", stars: 5 },
  { buyer: "Freemind Notebook", logo: "FN", color: "#059669", text: "\"Through Koop India, we reached thousands of buyers and expanded our buyer visibility nationwide.\"", stars: 5 },
  { buyer: "Hindustan Doors", logo: "HD", color: "#dc2626", text: "\"Excellent platform for buyer promotion and generating quality leads. Highly recommended!\"", stars: 5 },
];

/* ─── Skeleton ─── */
const Skeleton = ({ cls }) => <div className={`animate-pulse bg-gray-200 rounded-lg ${cls}`} />;

/* ─── Banner Section ─── */
const BannerSection = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <section className="py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-md group">
          <div 
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((b, i) => (
              <a key={i} href={b.link || "#"} target={b.link ? "_blank" : "_self"} rel="noopener noreferrer" 
                 className="flex-shrink-0 w-full">
                <img src={b.imageUrl} alt={`Banner ${i}`} className="w-full h-auto min-h-[150px] max-h-[350px] object-cover" />
              </a>
            ))}
          </div>
          
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {banners.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6 shadow-sm' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────── */
export default function KoopIndiaHomepage() {
  const { onOpenModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ── state ── */
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const urlCat = searchParams.get("category");
  let initCat = "All Categories";
  if (urlCat) {
    const found = CATEGORIES.find(c => c.label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === urlCat);
    if (found) initCat = found.label;
  }
  const [catSel, setCatSel] = useState(initCat);
  const [subCatSel, setSubCatSel] = useState("All");
  const [stateSel, setStateSel] = useState("All States");
  const [certSel, setCertSel] = useState("All Certifications");
  const [catDropOpen, setCatDropOpen] = useState(false);
  const catRef = useRef(null);

  /* ── Registration modal ── */


  /* ── Firestore data ── */
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [topBanners, setTopBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [logosLoading, setLogosLoading] = useState(true);

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(!!(searchParams.get("q") || urlCat));

  /* ── fetch ── */
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [sellSnap, buyerSnap, blogSnap] = await Promise.all([
          getDocs(query(collection(db, "sellers"), orderBy("createdAt", "desc"), limit(10))),
          getDocs(query(collection(db, "buyers"), orderBy("createdAt", "desc"), limit(10))),
          getDocs(query(collection(db, "blog"), orderBy("date", "desc"), limit(5))).catch(() =>
            getDocs(query(collection(db, "blogs"), orderBy("date", "desc"), limit(5))).catch(() => ({ docs: [] }))
          ),
        ]);
        setSellers(sellSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setBuyers(buyerSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setBlogs(blogSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error("Marketplace fetch error:", e); }
      finally { setLoading(false); }

      // Fetch partner logos separately so main data isn't blocked
      try {
        const mSnap = await getDoc(doc(db, "settings", "marketplace_page"));
        if (mSnap.exists()) {
          const data = mSnap.data();
          if (Array.isArray(data.partnerLogos) && data.partnerLogos.length > 0) {
            setPartnerLogos(data.partnerLogos);
          }
          if (Array.isArray(data.topBanners) && data.topBanners.length > 0) {
            setTopBanners(data.topBanners);
          }
          if (Array.isArray(data.bottomBanners) && data.bottomBanners.length > 0) {
            setBottomBanners(data.bottomBanners);
          }
        }
      } catch (e) { console.error("Partner logos fetch error:", e); }
      finally { setLogosLoading(false); }
    };
    fetchAll();
  }, []);

  /* ── close cat dropdown on outside click ── */
  useEffect(() => {
    const fn = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatDropOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* ── search ── */
  const performSearch = async (currentSearch, currentCat, currentSub, currentState) => {
    setSearching(true);
    setSearched(true);
    try {
      const snap = await getDocs(collection(db, "sellers"));
      let results = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      const q = currentSearch.toLowerCase().trim();
      if (q) results = results.filter(s =>
        s.name?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.companyName?.toLowerCase().includes(q)
      );
      
      if (currentCat !== "All Categories") results = results.filter(s =>
        s.category?.toLowerCase().includes(currentCat.toLowerCase()) ||
        (s.productCategories || []).some(c => {
          const catName = typeof c === "string" ? c : (c.name || "");
          return catName.toLowerCase().includes(currentCat.toLowerCase());
        })
      );
      
      if (currentSub !== "All") results = results.filter(s =>
        (s.productCategories || []).some(c => {
          const catName = typeof c === "string" ? c : (c.name || "");
          return catName.toLowerCase().includes(currentSub.toLowerCase());
        })
      );
      
      if (currentState !== "All States") results = results.filter(s =>
        s.state?.toLowerCase() === currentState.toLowerCase()
      );
      
      setSearchResults(results.filter(s => s.status !== "paused" && s.status !== "draft"));
    } catch (e) { console.error(e); }
    finally { setSearching(false); }
  };

  const handleSearch = () => performSearch(search, catSel, subCatSel, stateSel);

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  const Stars = ({ n }) => Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled={i < n} />);

  const selectedCatData = CATEGORIES.find(c => c.label === catSel);

  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      <MarketplaceHeader onOpenModal={onOpenModal} />

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-white to-[#fff8f3] pt-28 pb-14 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse inline-block" />
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest">India's Growing Buyers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#1e3a5f] leading-tight mb-4">
                Discover Trusted<br />Indian Buyers<br />
                <span className="text-[#F97316]">Under One Roof</span>
              </h1>
              <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-md">
                Connect with verified manufacturers, startups and MSME buyers across multiple industries.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/seller-buyer-registration"
                  className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#162c4a] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:scale-105">
                  Register as Seller <ArrowRight />
                </Link>
                <Link
                  href="/seller-buyer-registration"
                  className="flex items-center gap-2 border-2 border-[#F97316] text-[#F97316] font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all hover:scale-105">
                  List Your Buyer <ArrowRight />
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: "🏪", val: "1000+", label: "Buyers Listed" },
                  { icon: "📦", val: "500+", label: "Categories" },
                  { icon: "📍", val: "28+", label: "States Covered" },
                  { icon: "🤝", val: "50K+", label: "Business Connections" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="font-black text-[#1e3a5f] text-lg leading-none">{s.val}</p>
                      <p className="text-gray-400 text-[10px] font-semibold">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-3 gap-3 relative">
              {logosLoading
                ? ["", "", "", "", "", ""].map((_, i) => (
                    <div key={i}
                      className={`animate-pulse rounded-2xl bg-gray-100/50 shadow-sm border border-gray-50 ${i === 0 ? "row-span-2" : ""}`}
                      style={{ minHeight: i === 0 ? 200 : 90 }}
                    />
                  ))
                : partnerLogos.length > 0
                ? partnerLogos.slice(0, 6).map((logo, i) => {
                    const href = logo.link
                      ? (logo.link.startsWith("http") ? logo.link : `https://${logo.link}`)
                      : null;
                    const imgSrc = proxyImg(logo.imageUrl);
                    const bgColors = ["#fff8f3", "#f0f7ff", "#f0fdf4", "#fdf4ff", "#fffbeb", "#f0f9ff"];
                    const glowColors = [
                      "rgba(249,115,22,0.35)", "rgba(59,130,246,0.35)", "rgba(34,197,94,0.35)",
                      "rgba(168,85,247,0.35)", "rgba(234,179,8,0.35)", "rgba(14,165,233,0.35)"
                    ];
                    const delay = `${i * 0.4}s`;
                    const cardStyle = {
                      minHeight: i === 0 ? 200 : 90,
                      background: bgColors[i],
                      animationDelay: delay,
                    };
                    const cardClass = `logo-card-anim rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300 ${i === 0 ? "row-span-2" : ""}`;
                    const cardContent = (
                      <div className="text-center px-2 relative">
                        {/* glow ring */}
                        <div style={{
                          position: "absolute", inset: -6, borderRadius: "50%",
                          background: glowColors[i],
                          filter: "blur(8px)",
                          animation: `logo-glow 2.5s ease-in-out infinite alternate`,
                          animationDelay: delay,
                          zIndex: 0,
                        }} />
                        <img src={imgSrc} alt="Partner"
                          className="max-h-14 w-auto object-contain mx-auto relative z-10" />
                      </div>
                    );
                    return href ? (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                        className={cardClass} style={cardStyle}>
                        {cardContent}
                      </a>
                    ) : (
                      <div key={i} className={cardClass} style={cardStyle}>
                        {cardContent}
                      </div>
                    );
                  })
                : ["🌶️ Spices", "🏭 Factory", "🌿 Herbal", "🧴 Skincare", "📦 Exports", "🤝 Business"].map((item, i) => (
                    <div key={i}
                      className={`rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-gray-100 ${i === 0 ? "row-span-2" : ""}`}
                      style={{ minHeight: i === 0 ? 200 : 90, background: ["#fff8f3", "#f0f7ff", "#f0fdf4", "#fdf4ff", "#fffbeb", "#f0f9ff"][i] }}>
                      <div className="text-center">
                        <div className="text-4xl">{item.split(" ")[0]}</div>
                        <p className="text-[9px] font-bold text-gray-400 mt-1">{item.split(" ").slice(1).join(" ")}</p>
                      </div>
                    </div>
                  ))
              }
              <style>{`
                @keyframes logo-float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
                @keyframes logo-glow {
                  0% { opacity: 0.3; transform: scale(0.9); }
                  100% { opacity: 1; transform: scale(1.15); }
                }
                @keyframes logo-shimmer {
                  0% { box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
                  50% { box-shadow: 0 8px 30px rgba(249,115,22,0.25), 0 0 0 2px rgba(249,115,22,0.1); }
                  100% { box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
                }
                .logo-card-anim {
                  animation: logo-float 3s ease-in-out infinite, logo-shimmer 3s ease-in-out infinite;
                }
                .logo-card-anim:hover {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SEARCH BAR ══════════════ */}
      <section className="bg-[#1e3a5f] py-5 px-4 sm:px-6 sticky top-0 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl p-2 shadow-2xl shadow-blue-900/30">
            <div className="flex items-center flex-1 gap-2 px-3">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search buyers, products or categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-sm py-2 outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
            </div>

                        <div className="relative hidden md:block" ref={catRef}>
              <button
                onClick={() => setCatDropOpen(o => !o)}
                className="flex items-center gap-2 appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 pl-3 pr-3 py-2.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 min-w-[160px]">
                <span className="flex-1 text-left truncate">{catSel === "All Categories" ? "All Categories" : catSel}</span>
                <ChevronDown />
              </button>
              {catDropOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden" style={{ width: "280px" }}>
                  <div className="p-2 max-h-[400px] overflow-y-auto">
                    <button onClick={() => { setCatSel("All Categories"); setSubCatSel("All"); setCatDropOpen(false); performSearch(search, "All Categories", "All", stateSel); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition ${catSel === "All Categories" ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50 text-gray-600"}`}>
                      All Categories
                    </button>
                    {CATEGORIES.map(cat => (
                      <div key={cat.label}>
                        <button onClick={() => { setCatSel(cat.label); setSubCatSel("All"); performSearch(search, cat.label, "All", stateSel); }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${catSel === cat.label ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50 text-gray-700"}`}>
                          <span>{cat.emoji}</span> {cat.label}
                        </button>
                        {catSel === cat.label && (
                          <div className="pl-4 pb-1">
                            <button onClick={() => { setSubCatSel("All"); performSearch(search, catSel, "All", stateSel); }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${subCatSel === "All" ? "text-orange-600 bg-orange-50" : "text-gray-500 hover:bg-gray-50"}`}>
                              All {cat.label}
                            </button>
                            {cat.subs.map(sub => (
                              <button key={sub} onClick={() => { setSubCatSel(sub); setCatDropOpen(false); performSearch(search, catSel, sub, stateSel); }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${subCatSel === sub ? "text-orange-600 bg-orange-50" : "text-gray-500 hover:bg-gray-50"}`}>
                                {sub}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

                        <div className="relative hidden md:block">
              <select value={stateSel} onChange={e => { setStateSel(e.target.value); performSearch(search, catSel, subCatSel, e.target.value); }}
                className="appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 pl-3 pr-7 py-2.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 min-w-[130px]">
                {STATES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>



            <button onClick={handleSearch} disabled={searching}
              className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-7 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-400/30 text-sm flex-shrink-0 disabled:opacity-70 flex items-center gap-2">
              {searching ? <span className="animate-spin">⏳</span> : null} Search
            </button>
          </div>

                    {(catSel !== "All Categories" || stateSel !== "All States") && (
            <div className="flex flex-wrap gap-2 mt-2 px-1">
              {catSel !== "All Categories" && (
                <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1">
                  {catSel} {subCatSel !== "All" && `› ${subCatSel}`}
                  <button onClick={() => { setCatSel("All Categories"); setSubCatSel("All"); performSearch(search, "All Categories", "All", stateSel); }} className="ml-1 hover:text-orange-300">×</button>
                </span>
              )}
              {stateSel !== "All States" && (
                <span className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1">
                  {stateSel}
                  <button onClick={() => { setStateSel("All States"); performSearch(search, catSel, subCatSel, "All States"); }} className="ml-1 hover:text-orange-300">×</button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <BannerSection banners={topBanners} />

      {/* ══════════════ EXPLORE TOP CATEGORIES ══════════════ */}
      <section className="bg-white py-10 px-4 sm:px-6 relative border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-extrabold text-[#F97316] uppercase tracking-widest mb-1">Browse By</p>
              <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight whitespace-nowrap">Explore All Categories</h2>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto sm:ml-auto">
              {/* Category Dropdown */}
              <div className="relative w-full sm:w-72 flex-shrink-0">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl">
                  {catSel !== "All Categories" ? (CATEGORIES.find(c => c.label === catSel)?.emoji || "📂") : "📂"}
                </div>
                <select
                  value={catSel}
                  onChange={e => {
                    const val = e.target.value;
                    setCatSel(val);
                    setSubCatSel("All");
                    performSearch(search, val, "All", stateSel);
                    document.getElementById("sellers-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border-2 border-gray-200 bg-white text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-orange-400/25 focus:border-orange-400 transition-all appearance-none cursor-pointer shadow-sm hover:border-gray-300"
                >
                  <option value="All Categories">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.label} value={c.label}>{c.emoji} {c.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              {catSel !== "All Categories" && (
                <button
                  onClick={() => { setCatSel("All Categories"); setSubCatSel("All"); performSearch(search, "All Categories", "All", stateSel); }}
                  className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl hover:bg-orange-100 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  ✕ Clear: {catSel}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED SELLERS / SEARCH RESULTS ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-[#f8fafc]" id="sellers-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-extrabold text-[#F97316] uppercase tracking-widest mb-1">
                {searched ? "Showing Matches" : "Verified Partners"}
              </p>
              <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight">
                {searched ? "Search Results" : "Featured Sellers"}
              </h2>
            </div>
            {!searched && (
              <Link href="/sellers" className="flex items-center gap-2 text-sm font-bold text-[#1e3a5f] border border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-4 py-2 rounded-xl transition-all hover:shadow-md">
                View All <ArrowRight />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading || searching
              ? [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-52" />)
              : searched
                ? searchResults.length > 0
                  ? searchResults.slice(0, 10).map(s => <SellerCard key={s.id} s={s} />)
                  : <div className="col-span-5 text-center py-12 text-gray-400"><div className="text-4xl mb-2">🔍</div><p className="font-bold">No results found for your search.</p></div>
                : sellers.length > 0
                  ? sellers.slice(0, 10).map(s => <SellerCard key={s.id} s={s} />)
                  : <div className="col-span-5 text-center py-12 text-gray-400"><div className="text-4xl mb-2">🏪</div><p className="font-bold">No sellers yet</p></div>
            }
          </div>
        </div>
      </section>

      <BannerSection banners={bottomBanners} />

      {/* ══════════════ FEATURED BUYERS ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-white" id="buyers-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-extrabold text-[#F97316] uppercase tracking-widest mb-1">Top Buyers</p>
              <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight">Featured Buyers</h2>
            </div>
            <Link href="/buyers" className="flex items-center gap-2 text-sm font-bold text-[#1e3a5f] border border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-4 py-2 rounded-xl transition-all hover:shadow-md">
              View All <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading
              ? [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-52" />)
              : buyers.length > 0
                ? buyers.slice(0, 10).map(b => <BuyerCard key={b.id} b={b} />)
                : <div className="col-span-5 text-center py-12 text-gray-400"><div className="text-4xl mb-2">🏷️</div><p className="font-bold">No buyers yet</p></div>
            }
          </div>
        </div>
      </section>

      {/* ══════════════ WHY KOOP INDIA ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-8 tracking-tight uppercase">WHY CHOOSE KOOP INDIA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY.map(w => (
              <div key={w.title} className="flex flex-row items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 transition-all hover:shadow-md">
                <div className="text-4xl flex-shrink-0">{w.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1e3a5f] text-[15px] leading-tight mb-1">{w.title}</h3>
                  <p className="text-[#1e3a5f]/80 text-xs leading-relaxed font-medium">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ LATEST: 3 COLUMNS ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] font-extrabold text-[#F97316] uppercase tracking-widest">Recently Joined</p>
                <h3 className="font-black text-[#1e3a5f] text-sm uppercase tracking-wide mt-0.5">Latest Sellers</h3>
              </div>
              <Link href="/sellers" className="text-xs font-bold text-[#F97316] hover:underline">View All →</Link>
            </div>
            <div className="space-y-2.5">
              {loading
                ? [...Array(4)].map((_, i) => <Skeleton key={i} cls="h-14" />)
                : sellers.slice(0, 4).map(s => (
                  <Link key={s.id} href={`/${s.slug}`} target="_blank"
                    className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 overflow-hidden ring-2 ring-gray-100"
                      style={{ background: `linear-gradient(135deg, ${s.primaryColor ? s.primaryColor + '18' : '#e8eef8'}, ${s.primaryColor ? s.primaryColor + '0a' : '#f0f4fc'})`, border: `1.5px solid ${s.primaryColor || '#1e3a5f'}22` }}>
                      {s.logoUrl ? <img src={proxyImg(s.logoUrl)} alt="" className="w-full h-full object-contain p-0.5" /> : <span className="text-xs">{ini(s.name)}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-xs truncate">{s.name || s.companyName}</p>
                      <p className="text-gray-400 text-[10px]">{s.state || "India"}</p>
                    </div>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0">New</span>
                  </Link>
                ))}
            </div>
          </div>

                    <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] font-extrabold text-[#F97316] uppercase tracking-widest">Recently Joined</p>
                <h3 className="font-black text-[#1e3a5f] text-sm uppercase tracking-wide mt-0.5">Latest Buyers</h3>
              </div>
              <Link href="/buyers" className="text-xs font-bold text-[#F97316] hover:underline">View All →</Link>
            </div>
            <div className="space-y-2.5">
              {loading
                ? [...Array(4)].map((_, i) => <Skeleton key={i} cls="h-14" />)
                : buyers.slice(0, 4).map(b => (
                  <Link key={b.id} href={`/buyers/${b.slug}`} target="_blank"
                    className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 overflow-hidden ring-2 ring-gray-100"
                      style={{ background: `linear-gradient(135deg, ${b.primaryColor ? b.primaryColor + '18' : '#fff4ec'}, ${b.primaryColor ? b.primaryColor + '0a' : '#fff8f3'})`, border: `1.5px solid ${b.primaryColor || '#f97316'}22` }}>
                      {b.logoUrl ? <img src={proxyImg(b.logoUrl)} alt="" className="w-full h-full object-contain p-0.5" /> : <span className="text-xs">{ini(b.buyerName)}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-xs truncate">{b.buyerName}</p>
                      <p className="text-gray-400 text-[10px]">{b.state || "India"}</p>
                    </div>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-100 flex-shrink-0">New</span>
                  </Link>
                ))}
            </div>
          </div>

                    <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-[#1e3a5f] text-sm uppercase tracking-wide">LATEST BLOGS</h3>
              <Link href="/blog" className="text-xs font-bold text-[#F97316] hover:underline">View All →</Link>
            </div>
            <div className="space-y-3">
              {loading
                ? [...Array(5)].map((_, i) => <Skeleton key={i} cls="h-20" />)
                : blogs.length > 0
                  ? blogs.map(b => (
                    <Link key={b.id} href={b.slug ? `/blog/${b.slug}` : "/blog"}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all flex gap-3 p-3 cursor-pointer">
                      <div className="w-16 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden bg-gray-100">
                        {b.coverImage || b.image
                          ? <img src={proxyImg(b.coverImage || b.image)} alt={b.title} className="w-full h-full object-cover" />
                          : "📝"}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-700 text-xs leading-snug mb-2 line-clamp-2">{b.title}</p>
                        <span className="text-[10px] font-bold text-[#F97316] hover:underline">Read More →</span>
                      </div>
                    </Link>
                  ))
                  : [
                    { title: "Top 10 Spice Buyers Making India Proud Globally", img: "🌶️" },
                    { title: "How Indian Buyers are Expanding in Global Markets", img: "🌍" },
                    { title: "Buyering Tips for Startups to Stand Out in 2026", img: "🚀" },
                  ].map((b, i) => (
                    <Link key={i} href="/blog"
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all flex gap-3 p-3 cursor-pointer">
                      <div className="w-16 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 bg-gray-50">{b.img}</div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-700 text-xs leading-snug mb-2">{b.title}</p>
                        <span className="text-[10px] font-bold text-[#F97316]">Read More →</span>
                      </div>
                    </Link>
                  ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-[#f8fafc]" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight">BUYER SUCCESS STORIES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl font-black text-white flex items-center justify-center text-sm shadow-sm"
                    style={{ backgroundColor: t.color }}>{t.logo}</div>
                  <div>
                    <p className="font-black text-[#1e3a5f] text-sm">{t.buyer}</p>
                    <div className="flex gap-0.5 mt-0.5"><Stars n={t.stars} /></div>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed italic">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-10 tracking-tight uppercase">HOW IT WORKS?</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
            {HOW_STEPS.map((s, i) => [
              <div key={`step-${i}`} className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-md ${s.color}`}>
                  {s.icon}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[13px] font-black leading-none mb-0.5 text-[#f97316]">{s.num}</span>
                  <p className="font-bold text-[#1e3a5f] text-[13px] leading-tight whitespace-pre-line">{s.label}</p>
                </div>
              </div>,
              i < HOW_STEPS.length - 1 && (
                <div key={`arrow-${i}`} className="hidden lg:flex flex-shrink-0 text-[#1e3a5f]/40 mx-2">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h24" strokeDasharray="4 4" />
                    <path d="M22 8l4 4-4 4" />
                  </svg>
                </div>
              )
            ])}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left bg-[#05193B] rounded-3xl px-8 py-10 lg:px-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-6 left-[15%] text-white/30 text-2xl">✨</div>
            <div className="absolute top-10 right-[35%] text-white/20 text-xl">✨</div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 relative z-10 w-full lg:w-auto">
            <div className="relative w-40 h-28 flex-shrink-0 hidden lg:block">
              <div className="absolute bottom-2 left-4 text-[80px] z-10 drop-shadow-2xl origin-bottom-left -rotate-12">🚀</div>
              <div className="absolute -bottom-4 -left-4 text-6xl opacity-90 z-20">☁️</div>
              <div className="absolute -bottom-2 left-10 text-6xl opacity-90 z-20">☁️</div>
            </div>
            <div className="flex-1">
              <h2 className="text-[26px] sm:text-3xl font-bold text-white mb-2 leading-snug tracking-wide">
                Ready to Grow Your Buyer Across India?
              </h2>
              <p className="text-gray-200 text-sm sm:text-[15px] max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
                List your buyer on Koop India and connect with thousands of business buyers, distributors and retailers.
              </p>
            </div>
          </div>
          <div className="relative z-10 flex-shrink-0 mt-2 lg:mt-0">
            <Link
              href="/seller-buyer-registration"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-xl shadow-orange-500/20 text-[15px] flex items-center justify-center gap-2 hover:scale-105">
              List Your Buyer Now →
            </Link>
          </div>
        </div>
      </section>

      <MarketplaceFooter />

    </div>
  );
}