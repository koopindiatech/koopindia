"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MarketplaceHeader from "../layout/MarketplaceHeader";
import MarketplaceFooter from "../layout/MarketplaceFooter";
import SellerCard from "./cards/SellerCard";
import BuyerCard from "./cards/BuyerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, where, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useModal } from "@/context/ModalContext";


// SVG icon helpers
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
  "Food & Beverage": { emoji: "🍱", subs: ["Spices & Seasonings", "Bakery & Confectionery", "Beverages & Juices", "Dairy Products", "Grains & Cereals", "Edible Oils", "Snacks & Namkeen", "Packaged Foods", "Tea & Coffee", "Frozen Foods", "Organic Food", "Other Food & Beverage"] },
  "Health & Beauty": { emoji: "💄", subs: ["Skin Care", "Hair Care", "Personal Hygiene", "Oral Care", "Cosmetics & Makeup", "Fragrances & Deodorants", "Herbal & Ayurvedic Beauty", "Salon & Spa Supplies", "Other Health & Beauty"] },
  "Pharmaceuticals": { emoji: "💊", subs: ["Tablets & Capsules", "Syrups & Liquids", "Injections", "Ointments & Creams", "Generic Drugs", "OTC Medicines", "Ayurvedic & Herbal Medicines", "Nutraceuticals", "Veterinary Drugs", "Other Pharmaceuticals"] },
  "Apparel & Fashion": { emoji: "👗", subs: ["Men's Wear", "Women's Wear", "Kids & Baby Wear", "Ethnic Wear", "Western Wear", "Footwear", "Fashion Accessories", "Uniforms & Workwear", "Sportswear", "Other Apparel"] },
  "Chemicals": { emoji: "🧪", subs: ["Industrial Chemicals", "Agrochemicals", "Specialty Chemicals", "Dyes & Pigments", "Solvents", "Water Treatment Chemicals", "Cleaning Chemicals", "Polymers & Resins", "Other Chemicals"] },
  "Home Supplies": { emoji: "🧹", subs: ["Cleaning Supplies", "Kitchenware", "Bathroom Accessories", "Storage & Organization", "Disposable Items", "Laundry Care", "Pest Control", "Other Home Supplies"] },
  "Construction & Real Estate": { emoji: "🏗️", subs: ["Cement & Concrete", "Building Materials", "Tiles & Flooring", "Paints & Wall Finishes", "Roofing Materials", "Sanitaryware & Fittings", "Structural Steel", "Doors & Windows", "Other Construction"] },
  "Electronics & Electrical Supplies": { emoji: "⚡", subs: ["Cables & Wires", "Switches & Sockets", "LED & Lighting", "Transformers & Switchgear", "Circuit Breakers", "Solar Panels & Systems", "Industrial Electricals", "Power Distribution", "Other Electricals"] },
  "Agriculture": { emoji: "🌾", subs: ["Seeds & Saplings", "Fertilizers & Nutrients", "Pesticides & Bio-Pesticides", "Farming Equipment", "Irrigation Systems", "Animal Feed", "Horticulture", "Fresh Produce", "Other Agriculture"] },
  "Automobile": { emoji: "🚗", subs: ["Spare Parts", "Auto Accessories", "Batteries", "Tires & Tubes", "Lubricants & Oils", "Two Wheeler Parts", "Commercial Vehicle Parts", "Electric Vehicle Components", "Other Automobile"] },
  "Packaging & Paper": { emoji: "📦", subs: ["Corrugated Boxes", "Flexible Packaging", "Paper Bags & Pouches", "Bottles & Containers", "Labels & Tapes", "Packaging Films", "Cartons & Tubes", "Kraft Paper & Board", "Other Packaging"] },
  "Hospital & Medical Supplies": { emoji: "🏥", subs: ["Medical Equipment", "Surgical Instruments", "Hospital Furniture", "Disposable Medical Supplies", "Diagnostic Equipment", "PPE & Masks", "Bandages & Dressings", "Laboratory Disposables", "Other Medical Supplies"] },
  "Gifts & Crafts": { emoji: "🎁", subs: ["Handicrafts", "Corporate Gifts", "Decorative Items", "Festive Gifts", "Wooden Crafts", "Metal Crafts", "Candles & Scents", "Ceramic & Clay Crafts", "Other Gifts & Crafts"] },
  "Consumer Electronics": { emoji: "📱", subs: ["Mobile Phones & Accessories", "Audio & Headphones", "Televisions & Home Theater", "Smart Home Devices", "Wearables & Smartwatches", "Cameras & Optics", "Power Banks & Chargers", "Other Consumer Electronics"] },
  "Pipes, Tubes & Fittings": { emoji: "🔧", subs: ["PVC & CPVC Pipes", "GI & Steel Pipes", "Pipe Fittings & Flanges", "Valves & Cocks", "Hose Pipes", "Ductile Iron Pipes", "Industrial Tubing", "Other Pipes & Fittings"] },
  "Industrial Supplies": { emoji: "🏭", subs: ["Fasteners & Bolts", "Bearings & Belts", "Welding Supplies", "Abrasives & Cutting Tools", "Safety Gear & PPE", "Material Handling", "Lubrication Equipment", "Pumps & Compressors", "Other Industrial Supplies"] },
  "Computer Hardware & Software": { emoji: "💻", subs: ["Laptops & Desktops", "Monitors & Displays", "Networking Equipment", "Printers & Scanners", "Storage Devices", "Computer Peripherals", "Enterprise Software", "POS & Barcode Systems", "Other IT Products"] },
  "Energy & Power": { emoji: "🔋", subs: ["Solar Energy Systems", "Generators & Inverters", "Batteries & UPS", "Wind & Renewable Energy", "Transformers", "Biofuel & Biomass", "Power Cables", "Other Energy Products"] },
  "Furniture": { emoji: "🪑", subs: ["Office Furniture", "Home Furniture", "School & Institutional Furniture", "Outdoor Furniture", "Modular Furniture", "Beds & Mattresses", "Sofas & Chairs", "Tables & Desks", "Other Furniture"] },
  "Home Textiles & Furnishings": { emoji: "🛋️", subs: ["Bed Linen & Sheets", "Curtains & Blinds", "Cushions & Covers", "Carpets & Rugs", "Towels & Bath Linen", "Table Linen", "Blankets & Quilts", "Upholstery Fabrics", "Other Home Textiles"] },
  "Hotel Supplies & Equipment": { emoji: "🏨", subs: ["Commercial Kitchen Equipment", "Hotel Linen & Towels", "Guest Amenities", "Tableware & Crockery", "Buffet Equipment", "Housekeeping Equipment", "Hotel Uniforms", "Other Hotel Supplies"] },
  "Jewelry & Gemstones": { emoji: "💎", subs: ["Fashion Jewelry", "Silver Jewelry", "Gold & Diamond Jewelry", "Precious & Semi-Precious Stones", "Beads & Findings", "Jewelry Packaging & Displays", "Traditional Indian Jewelry", "Other Jewelry"] },
  "Leather & Leather Products": { emoji: "👞", subs: ["Leather Footwear", "Leather Bags & Wallets", "Leather Belts & Accessories", "Leather Garments", "Finished Leather Sheets", "Safety Leather Goods", "Other Leather Products"] },
  "Machinery": { emoji: "⚙️", subs: ["Food Processing Machinery", "Packaging Machinery", "Agricultural Machinery", "Textile Machinery", "Woodworking Machinery", "CNC & Lathe Machines", "Printing Machinery", "Plastic Processing Machines", "Other Machinery"] },
  "Mineral & Metals": { emoji: "⛏️", subs: ["Iron & Steel", "Aluminum Products", "Copper & Brass", "Industrial Minerals", "Ores & Concentrates", "Metal Sheets & Coils", "Scrap Metal", "Alloy Products", "Other Minerals & Metals"] },
  "Plastics & Products": { emoji: "🛞", subs: ["Plastic Containers & Bottles", "Plastic Molded Components", "Plastic Sheets & Films", "Engineering Plastics", "Plastic Household Goods", "Recycled Plastic Granules", "Other Plastics"] },
  "Printing & Publishing": { emoji: "🖨️", subs: ["Commercial Printing", "Offset Printing Services", "Digital Printing", "Screen Printing", "Books & Magazines", "Brochures & Flyers", "Printing Inks & Plates", "Binding & Finishing", "Other Printing"] },
  "Security & Protection": { emoji: "🛡️", subs: ["CCTV Cameras & Systems", "Access Control & Biometrics", "Fire Safety & Extinguishers", "Security Alarms", "Safety Barriers & Locks", "Surveillance Systems", "Personal Protective Equipment", "Other Security"] },
  "Sports & Entertainment": { emoji: "⚽", subs: ["Fitness & Gym Equipment", "Outdoor Sports Goods", "Indoor Games", "Playground Equipment", "Sports Apparel & Shoes", "Trophies & Medals", "Musical Instruments", "Other Sports & Entertainment"] },
  "Telecommunications": { emoji: "📡", subs: ["Telecom Cables & Optical Fiber", "Towers & Antennas", "Wireless Equipment", "Networking Switches & Routers", "Telecom Power Systems", "Intercom & PBX", "RF Components", "Other Telecom"] },
  "Textiles & Fabrics": { emoji: "🧵", subs: ["Cotton Fabrics", "Synthetic & Polyester Fabrics", "Silk & Wool Fabrics", "Yarn & Thread", "Knitted Fabrics", "Denim Fabrics", "Embroidered Fabrics", "Technical Textiles", "Other Fabrics"] },
  "Toys": { emoji: "🧸", subs: ["Educational Toys", "Plastic & Action Toys", "Soft & Plush Toys", "Wooden Toys", "Board Games & Puzzles", "Baby & Toddler Toys", "Ride-on & Outdoor Toys", "Electronic Toys", "Other Toys"] },
  "Transportation": { emoji: "🚚", subs: ["Logistics & Cargo Services", "Commercial Vehicles", "Trailers & Tankers", "E-Rickshaws & 3-Wheelers", "Material Handling Carts", "Fleet Management Devices", "Warehousing Equipment", "Other Transportation"] },
  "Brass Hardware & Components": { emoji: "🔩", subs: ["Brass Screws & Fasteners", "Brass Precision Turned Parts", "Brass Electrical Components", "Brass Sanitary Fittings", "Brass Hinges & Door Hardware", "Brass Inserts & Anchors", "Brass Valves & Fittings", "Other Brass Hardware"] },
  "Environment & Pollution": { emoji: "🌱", subs: ["Water & Wastewater Treatment", "Air Pollution Control Equipment", "Waste Management & Recycling", "Solar & Green Energy", "Biogas Systems", "Environmental Testing Equipment", "Eco-Friendly Products", "Other Environmental"] },
  "Office & School Supplies": { emoji: "✏️", subs: ["Notebooks & Diaries", "Pens & Writing Instruments", "Files & Folders", "Office Paper Products", "Desk Organizers & Accessories", "Whiteboards & Presentation Tools", "School Bags & Pouches", "Other Stationery"] },
  "Scientific & Laboratory Instruments": { emoji: "🔬", subs: ["Laboratory Glassware", "Microscopes & Optical Devices", "Testing & Measurement Equipment", "Analytical Instruments", "Chemical Lab Consumables", "Educational Lab Kits", "Cleanroom Equipment", "Other Scientific Instruments"] },
  "Business Services": { emoji: "💼", subs: ["Company Registration & Legal", "Taxation & Accounting Services", "ISO & Compliance Certifications", "Digital Marketing & Branding", "Web & Software Development", "Franchise Consulting", "Export & Import Advisory", "Logistics & Supply Chain", "Other Business Services"] }
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

// Skeleton loader
const Skeleton = ({ cls }) => <div className={`animate-pulse bg-gray-200 rounded-lg ${cls}`} />;

// Promotional banner carousel
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
                <img src={b.imageUrl} alt={`Banner ${i}`} className="w-full h-auto min-h-[150px] max-h-[500px] object-cover" />
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

export default function KoopIndiaHomepage() {
  const { onOpenModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search and filter state
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
  const catScrollRef = useRef(null);
  const scrollCats = (dir) => {
    if (catScrollRef.current) {
      catScrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  // Firestore entity data state
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [topBanners, setTopBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [logosLoading, setLogosLoading] = useState(true);
  const [logoIndex, setLogoIndex] = useState(0);

  // Buyer section filters
  const [buyerCatSel, setBuyerCatSel] = useState("All Categories");
  const [buyerStateSel, setBuyerStateSel] = useState("All States");
  const [buyerSearchResults, setBuyerSearchResults] = useState([]);
  const buyerScrollRef = useRef(null);
  const scrollBuyerCats = (dir) => {
    if (buyerScrollRef.current) {
      buyerScrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [heroSettings, setHeroSettings] = useState({
    badge: "India's Growing Buyers",
    line1: "Discover Trusted",
    line2: "Indian Buyers",
    highlight: "Under One Roof",
    subtitle: "Connect with verified manufacturers, startups and MSME buyers across multiple industries.",
    statsListedBuyers: "1000+",
    statsCategories: "500+",
    statsStates: "28+",
    statsConnections: "50K+"
  });

  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(!!(searchParams.get("q") || urlCat));

  // Firestore data synchronization
  useEffect(() => {
    let unsubSettings = null;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [sellSnap, buyerSnap, blogSnap] = await Promise.all([
          getDocs(query(collection(db, "sellers"), where("isFeatured", "==", true))),
          getDocs(query(collection(db, "buyers"), where("isFeatured", "==", true))),
          getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(5))).catch(async () => {
            return getDocs(query(collection(db, "blogs"), orderBy("date", "desc"), limit(5))).catch(() => ({ docs: [] }));
          }),
        ]);
        
        const fetchedSellers = sellSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(s => s.isFeatured === true && s.status !== "paused" && s.status !== "draft");
        const fetchedBuyers = buyerSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(b => b.isFeatured === true && b.status !== "paused" && b.status !== "draft");
        
        fetchedSellers.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        fetchedBuyers.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));

        setSellers(fetchedSellers);
        setBuyers(fetchedBuyers);
        setBlogs(blogSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error("Marketplace fetch error:", e); }
      finally { setLoading(false); }

      // Listen to partner logos and hero settings dynamically
      unsubSettings = onSnapshot(doc(db, "settings", "marketplace_page"), (mSnap) => {
        if (mSnap.exists()) {
          const data = mSnap.data();
          if (Array.isArray(data.partnerLogos)) {
            setPartnerLogos(data.partnerLogos.length > 0 ? data.partnerLogos : []);
          }
          if (Array.isArray(data.topBanners)) {
            setTopBanners(data.topBanners.length > 0 ? data.topBanners : []);
          }
          if (Array.isArray(data.bottomBanners)) {
            setBottomBanners(data.bottomBanners.length > 0 ? data.bottomBanners : []);
          }
          setHeroSettings(prev => ({
            badge: data.heroBadge !== undefined ? data.heroBadge : prev.badge,
            line1: data.heroTitleLine1 !== undefined ? data.heroTitleLine1 : prev.line1,
            line2: data.heroTitleLine2 !== undefined ? data.heroTitleLine2 : prev.line2,
            highlight: data.heroHighlight !== undefined ? data.heroHighlight : prev.highlight,
            subtitle: data.heroSubtitle !== undefined ? data.heroSubtitle : prev.subtitle,
            statsListedBuyers: data.statsListedBuyers !== undefined ? data.statsListedBuyers : prev.statsListedBuyers,
            statsCategories: data.statsCategories !== undefined ? data.statsCategories : prev.statsCategories,
            statsStates: data.statsStates !== undefined ? data.statsStates : prev.statsStates,
            statsConnections: data.statsConnections !== undefined ? data.statsConnections : prev.statsConnections
          }));
        }
        setLogosLoading(false);
      }, (e) => {
        console.error("Marketplace settings fetch error:", e);
        setLogosLoading(false);
      });
    };
    
    fetchAll();
    
    return () => { 
      if (unsubSettings) unsubSettings(); 
    };
  }, []);

  // Dismiss category dropdown on outside click
  useEffect(() => {
    const fn = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatDropOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Search and filter execution
  const performSearch = async (currentSearch, currentCat, currentSub, currentState) => {
    setSearching(true);
    setSearched(true);
    try {
      const [snap, bSnap] = await Promise.all([
        getDocs(query(collection(db, "sellers"), where("isFeatured", "==", true))),
        getDocs(query(collection(db, "buyers"), where("isFeatured", "==", true))),
      ]);
      let results = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(s => s.isFeatured === true && s.status !== "paused" && s.status !== "draft");
      let bResults = bSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(b => b.isFeatured === true && b.status !== "paused" && b.status !== "draft");
      
      const q = currentSearch.toLowerCase().trim();
      if (q) {
        results = results.filter(s =>
          s.name?.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q) ||
          s.companyName?.toLowerCase().includes(q)
        );
        bResults = bResults.filter(b =>
          (b.buyerName || b.companyName || b.name || "").toLowerCase().includes(q) ||
          (b.category || "").toLowerCase().includes(q) ||
          (b.state || "").toLowerCase().includes(q) ||
          (b.city || "").toLowerCase().includes(q) ||
          (Array.isArray(b.requirements) ? b.requirements.join(" ") : (b.requirements || "")).toLowerCase().includes(q) ||
          (Array.isArray(b.productCategories) ? b.productCategories.map(c => typeof c === "string" ? c : (c.name || "")).join(" ") : "").toLowerCase().includes(q)
        );
      }
      
      if (currentCat !== "All Categories") {
        results = results.filter(s =>
          s.category?.toLowerCase().includes(currentCat.toLowerCase()) ||
          (s.productCategories || []).some(c => {
            const catName = typeof c === "string" ? c : (c.name || "");
            return catName.toLowerCase().includes(currentCat.toLowerCase());
          })
        );
        bResults = bResults.filter(b =>
          (b.category || "").toLowerCase().includes(currentCat.toLowerCase()) ||
          (b.productCategories || []).some(c => {
            const catName = typeof c === "string" ? c : (c.name || "");
            return catName.toLowerCase().includes(currentCat.toLowerCase());
          })
        );
      }
      
      if (currentSub !== "All") results = results.filter(s =>
        (s.productCategories || []).some(c => {
          const catName = typeof c === "string" ? c : (c.name || "");
          return catName.toLowerCase().includes(currentSub.toLowerCase());
        })
      );
      
      if (currentState !== "All States") {
        results = results.filter(s =>
          s.state?.toLowerCase() === currentState.toLowerCase()
        );
        bResults = bResults.filter(b =>
          (b.state || "").toLowerCase() === currentState.toLowerCase() ||
          (b.preferredStates || []).some(st => (typeof st === "string" ? st : "").toLowerCase() === currentState.toLowerCase())
        );
      }
      
      setSearchResults(results);
      setBuyerSearchResults(bResults);
    } catch (e) { console.error(e); }
    finally { setSearching(false); }
  };

  const isBuyerFiltered = buyerCatSel !== "All Categories" || buyerStateSel !== "All States";
  
  const buyerPool = (searched && (search || catSel !== "All Categories" || stateSel !== "All States"))
    ? buyerSearchResults
    : buyers;

  const displayedBuyers = buyerPool.filter(b => {
    if (!b.isFeatured || b.status === "paused" || b.status === "draft") return false;
    let match = true;
    if (buyerCatSel !== "All Categories") {
      const qCat = buyerCatSel.toLowerCase();
      const bCat = (b.category || "").toLowerCase();
      const bProdCats = (b.productCategories || []).map(c => typeof c === "string" ? c.toLowerCase() : (c.name || "").toLowerCase());
      const bBiz = (b.businessType || "").toLowerCase();
      if (!bCat.includes(qCat) && !bProdCats.some(c => c.includes(qCat)) && !bBiz.includes(qCat)) match = false;
    }
    if (match && buyerStateSel !== "All States") {
      const qState = buyerStateSel.toLowerCase();
      const bState = (b.state || "").toLowerCase();
      const bPrefStates = (b.preferredStates || []).map(s => (typeof s === "string" ? s : "").toLowerCase());
      if (!bState.includes(qState) && !bPrefStates.some(s => s.includes(qState))) match = false;
    }
    return match;
  });

  const handleSearch = () => performSearch(search, catSel, subCatSel, stateSel);

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  const Stars = ({ n }) => Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled={i < n} />);

  const selectedCatData = CATEGORIES.find(c => c.label === catSel);

  return (
    <div className="bg-white text-gray-800 font-sans" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      <MarketplaceHeader onOpenModal={onOpenModal} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-white to-[#fff8f3] pt-28 pb-14 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {heroSettings.badge && (
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse inline-block" />
                  <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest">{heroSettings.badge}</span>
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl font-black text-[#1e3a5f] leading-tight mb-4">
                {heroSettings.line1}<br />{heroSettings.line2}<br />
                <span className="text-[#F97316]">{heroSettings.highlight}</span>
              </h1>
              <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-md">
                {heroSettings.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/seller-buyer-registration"
                  className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#162c4a] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:scale-105">
                  List Your Brand <ArrowRight />
                </Link>
                <Link
                  href="/seller-buyer-registration"
                  className="flex items-center gap-2 border-2 border-[#F97316] text-[#F97316] font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all hover:scale-105">
                  Find Buyers <ArrowRight />
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: "🏪", val: heroSettings.statsListedBuyers, label: "Buyers Listed" },
                  { icon: "📦", val: heroSettings.statsCategories, label: "Categories" },
                  { icon: "📍", val: heroSettings.statsStates, label: "States Covered" },
                  { icon: "🤝", val: heroSettings.statsConnections, label: "Business Connections" },
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 relative mt-8 lg:mt-0">
              {logosLoading
                ? Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-2xl bg-gray-100/50 shadow-sm border border-gray-50 h-[84px] sm:h-[96px] w-full"
                    />
                  ))
                : partnerLogos.length > 0
                ? (() => {
                    const numCards = Math.min(9, partnerLogos.length);
                    return Array.from({ length: numCards }).map((_, i) => {
                      const logosForCard = [];
                      for (let j = i; j < partnerLogos.length; j += numCards) {
                        logosForCard.push(partnerLogos[j]);
                      }
                      if (logosForCard.length === 0) return null;

                      const activeIdx = logoIndex % logosForCard.length;
                      const activeLogo = logosForCard[activeIdx];

                      const href = activeLogo?.link
                        ? (activeLogo.link.startsWith("http") ? activeLogo.link : (activeLogo.link.startsWith("/") ? activeLogo.link : `https://${activeLogo.link}`))
                        : null;
                      const bgColors = [
                        "#fff8f3", "#f0f7ff", "#f0fdf4",
                        "#fdf4ff", "#fffbeb", "#f0f9ff",
                        "#fdf2f8", "#f5f3ff", "#ecfdf5"
                      ];
                      const glowColors = [
                        "rgba(249,115,22,0.30)", "rgba(59,130,246,0.30)", "rgba(34,197,94,0.30)",
                        "rgba(168,85,247,0.30)", "rgba(234,179,8,0.30)", "rgba(14,165,233,0.30)",
                        "rgba(236,72,153,0.30)", "rgba(99,102,241,0.30)", "rgba(16,185,129,0.30)"
                      ];
                      const delay = `${(i % 3) * 0.3}s`;
                      const cardStyle = {
                        background: bgColors[i % bgColors.length],
                        animationDelay: delay,
                      };
                      const cardClass = `logo-card-anim rounded-2xl flex items-center justify-center shadow-md border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden h-[84px] sm:h-[96px] w-full`;
                      const cardContent = (
                        <div className="w-full h-full flex items-center justify-center relative p-2.5 sm:p-3">
                          {/* glow ring */}
                          <div style={{
                            position: "absolute", inset: -6, borderRadius: "50%",
                            background: glowColors[i % glowColors.length],
                            filter: "blur(8px)",
                            animation: `logo-glow 2.5s ease-in-out infinite alternate`,
                            animationDelay: delay,
                            zIndex: 0,
                          }} />
                          {logosForCard.map((l, j) => (
                            <img 
                              key={j} 
                              src={proxyImg(l.imageUrl)} 
                              alt="Partner Brand" 
                              className="object-contain drop-shadow-sm z-10 transition-opacity duration-700 absolute max-w-[85%] max-h-[75%]"
                              style={{ 
                                opacity: j === activeIdx ? 1 : 0, 
                                pointerEvents: j === activeIdx ? "auto" : "none" 
                              }} 
                            />
                          ))}
                        </div>
                      );

                      return href ? (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={cardStyle} className={cardClass}>
                          {cardContent}
                        </a>
                      ) : (
                        <div key={i} style={cardStyle} className={cardClass}>
                          {cardContent}
                        </div>
                      );
                    });
                  })()
                : null
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



      {/* Search Bar */}
      <section className="bg-[#1e3a5f] py-4 sm:py-5 px-3 sm:px-6 relative sm:sticky sm:top-[64px] z-40 shadow-xl">
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

            <div className="relative w-full sm:w-auto">
              <select value={stateSel} onChange={e => { setStateSel(e.target.value); performSearch(search, catSel, subCatSel, e.target.value); }}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 pl-3 pr-7 py-2.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 min-w-[130px]">
                {STATES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <button onClick={handleSearch} disabled={searching}
              className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-7 py-2.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-orange-400/30 text-sm flex-shrink-0 disabled:opacity-70 flex items-center justify-center gap-2">
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
                onClick={() => { setCatSel("All Categories"); setSubCatSel("All"); performSearch(search, "All Categories", "All", stateSel); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all font-bold text-sm ${catSel === "All Categories" ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/20" : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"}`}
              >
                <span>📁</span> All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => { setCatSel(cat.label); setSubCatSel("All"); performSearch(search, cat.label, "All", stateSel); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all font-bold text-sm ${catSel === cat.label ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/20" : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"}`}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sellers / Search Results */}
      <section className="py-14 px-4 sm:px-6 bg-orange-50/60" id="sellers-section">
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

      <BannerSection banners={topBanners} />

      {/* Featured Buyers */}
      <section className="py-14 px-4 sm:px-6 bg-rose-50/60" id="buyers-section">
        <div className="max-w-7xl mx-auto">
          {/* Header with Title and State dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-extrabold text-[#F97316] uppercase tracking-widest mb-1">
                {searched || isBuyerFiltered ? "Filtered Matches" : "Top Buyers"}
              </p>
              <h2 className="text-2xl font-black text-[#1e3a5f] tracking-tight">
                {searched || isBuyerFiltered ? "Filtered Buyers" : "Featured Buyers"}
              </h2>
            </div>
            
            <div className="flex items-center flex-wrap gap-2.5">
              {/* State Filter dropdown for buyers */}
              <div className="relative">
                <select
                  value={buyerStateSel}
                  onChange={e => setBuyerStateSel(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-xs font-bold text-gray-700 pl-3 pr-8 py-2.5 rounded-xl outline-none cursor-pointer hover:border-orange-300 shadow-sm"
                >
                  {STATES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDown />
                </div>
              </div>

              <Link href="/buyers" className="flex items-center gap-2 text-sm font-bold text-[#1e3a5f] bg-white border border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-4 py-2 rounded-xl transition-all hover:shadow-md">
                View All <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Categories Carousel Filter for Buyers */}
          <div className="mb-6 relative">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollBuyerCats(-1)} 
              aria-label="Scroll Buyer Categories Left"
              className="flex absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 z-20 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-white border border-gray-200 shadow-md sm:shadow-lg rounded-full text-gray-600 hover:text-orange-500 hover:border-orange-300 active:scale-95 transition-all hover:scale-105"
            >
              <ChevronLeft />
            </button>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollBuyerCats(1)} 
              aria-label="Scroll Buyer Categories Right"
              className="flex absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 z-20 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-white border border-gray-200 shadow-md sm:shadow-lg rounded-full text-gray-600 hover:text-orange-500 hover:border-orange-300 active:scale-95 transition-all hover:scale-105"
            >
              <ChevronRight2 />
            </button>

            <div 
              ref={buyerScrollRef}
              className="flex gap-2.5 overflow-x-auto pb-3 px-6 sm:px-1 scrollbar-hide scroll-smooth" 
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <button
                onClick={() => setBuyerCatSel("All Categories")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border whitespace-nowrap transition-all font-bold text-xs ${buyerCatSel === "All Categories" ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm" : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"}`}
              >
                <span>📁</span> All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => setBuyerCatSel(cat.label)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border whitespace-nowrap transition-all font-bold text-xs ${buyerCatSel === cat.label ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm" : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"}`}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Badges */}
          {(buyerCatSel !== "All Categories" || buyerStateSel !== "All States") && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-gray-500 font-semibold">Active filters:</span>
              {buyerCatSel !== "All Categories" && (
                <span className="text-[11px] font-bold bg-white text-orange-600 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  {buyerCatSel}
                  <button onClick={() => setBuyerCatSel("All Categories")} className="ml-1 hover:text-orange-800">×</button>
                </span>
              )}
              {buyerStateSel !== "All States" && (
                <span className="text-[11px] font-bold bg-white text-orange-600 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  {buyerStateSel}
                  <button onClick={() => setBuyerStateSel("All States")} className="ml-1 hover:text-orange-800">×</button>
                </span>
              )}
              <button 
                onClick={() => { setBuyerCatSel("All Categories"); setBuyerStateSel("All States"); }}
                className="text-xs text-gray-400 hover:text-orange-500 font-bold underline ml-1"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Buyers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading || searching
              ? [...Array(10)].map((_, i) => <Skeleton key={i} cls="h-52" />)
              : displayedBuyers.length > 0
                ? displayedBuyers.slice(0, 10).map(b => <BuyerCard key={b.id} b={b} />)
                : (
                  <div className="col-span-full text-center py-12 text-gray-400">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="font-bold text-gray-600">No buyers found matching current filters.</p>
                    <p className="text-xs text-gray-400 mt-1">Try changing category or state filter.</p>
                    {(buyerCatSel !== "All Categories" || buyerStateSel !== "All States") && (
                      <button
                        onClick={() => { setBuyerCatSel("All Categories"); setBuyerStateSel("All States"); }}
                        className="mt-4 text-xs font-bold text-orange-500 hover:underline"
                      >
                        Reset Buyer Filters
                      </button>
                    )}
                  </div>
                )
            }
          </div>
        </div>
      </section>

      <BannerSection banners={bottomBanners} />

      {/* Value Proposition */}
      <section className="py-14 px-4 sm:px-6 bg-white">
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

      {/* Latest Highlights (Sellers, Buyers, Blogs) */}
      <section className="py-14 px-4 sm:px-6 bg-orange-50/60">
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
            <div className="space-y-2.5">
              {loading
                ? [...Array(5)].map((_, i) => <Skeleton key={i} cls="h-16" />)
                : blogs.length > 0
                  ? blogs.map(b => (
                    <Link key={b.id} href={b.slug ? `/blog/${b.slug}` : (b.id ? `/blog/${b.id}` : "/blog")}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <div className="w-14 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden bg-gray-100">
                        {b.imageUrl || b.coverImage || b.image
                          ? <img src={proxyImg(b.imageUrl || b.coverImage || b.image)} alt={b.title} className="w-full h-full object-cover" />
                          : "📝"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-700 text-xs leading-snug mb-1 line-clamp-2">{b.title}</p>
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
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <div className="w-14 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 bg-gray-50">{b.img}</div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-700 text-xs leading-snug mb-1">{b.title}</p>
                        <span className="text-[10px] font-bold text-[#F97316]">Read More →</span>
                      </div>
                    </Link>
                  ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Success Stories */}
      <section className="py-14 px-4 sm:px-6 bg-pink-50/60" id="testimonials">
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

      {/* How It Works */}
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

      {/* Call to Action Banner */}
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
                Ready to Grow Your Business Across India?
              </h2>
              <p className="text-gray-200 text-sm sm:text-[15px] max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
                List your brand on Koop India and connect with thousands of business buyers, distributors and retailers.
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