// Category & Contact Access Control Utility for Koop India
// Manages privacy of Buyer & Seller direct contact details based on registration, live status & category match.

export const KOOP_SUPPORT_PHONE = "+91 95998 26131";
export const KOOP_SUPPORT_EMAIL = "support@koopindia.com";

/**
 * Normalizes a category string for reliable comparison
 */
export function normalizeCategory(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

export const GENERIC_CATEGORY_STOPWORDS = new Set([
  "all", "other", "products", "supplies", "equipment", "services", "hardware",
  "components", "materials", "items", "and", "all products", "other products",
  "all categories", "allcategories"
]);

export function isGenericStopword(str) {
  if (!str || typeof str !== "string") return true;
  const s = str.trim().toLowerCase();
  return GENERIC_CATEGORY_STOPWORDS.has(s) || /^(all|other|all products|other products)$/i.test(s);
}

/**
 * Extracts all relevant category tokens from a Seller object
 */
export function extractSellerCategories(seller) {
  if (!seller) return [];
  const set = new Set();

  if (seller.category && typeof seller.category === "string") {
    const s = seller.category.trim();
    if (!isGenericStopword(s)) set.add(s);
  }
  if (seller.subcategory && typeof seller.subcategory === "string") {
    const s = seller.subcategory.trim();
    if (!isGenericStopword(s)) set.add(s);
  }

  // productCategories: [{ id, name }, ...] or ['Spices', ...]
  if (Array.isArray(seller.productCategories)) {
    seller.productCategories.forEach((c) => {
      const val = typeof c === "string" ? c.trim() : (c?.name || "").trim();
      if (val && !isGenericStopword(val)) set.add(val);
    });
  }

  // products: [{ name, categoryId, category }, ...]
  if (Array.isArray(seller.products)) {
    seller.products.forEach((p) => {
      if (p?.category && typeof p.category === "string") {
        const val = p.category.trim();
        if (val && !isGenericStopword(val)) set.add(val);
      }
    });
  }

  return Array.from(set).filter(Boolean);
}

/**
 * Extracts all relevant category tokens from a Buyer object
 */
export function extractBuyerCategories(buyer) {
  if (!buyer) return [];
  const set = new Set();

  if (buyer.category && typeof buyer.category === "string") {
    const s = buyer.category.trim();
    if (!isGenericStopword(s)) set.add(s);
  }
  if (buyer.subcategory && typeof buyer.subcategory === "string") {
    const s = buyer.subcategory.trim();
    if (!isGenericStopword(s)) set.add(s);
  }

  if (Array.isArray(buyer.productCategories)) {
    buyer.productCategories.forEach((c) => {
      const val = typeof c === "string" ? c.trim() : (c?.name || c?.label || "").trim();
      if (val && !isGenericStopword(val)) set.add(val);
    });
  }

  if (typeof buyer.productCategoryText === "string" && buyer.productCategoryText.trim()) {
    buyer.productCategoryText.split(/[,;\n]+/).forEach((item) => {
      const val = item.trim();
      if (val && !isGenericStopword(val)) set.add(val);
    });
  }

  return Array.from(set).filter(Boolean);
}

export const STANDARD_CATEGORIES = [
  "Agriculture", "Apparel & Fashion", "Automobile", "Brass Hardware & Components",
  "Business Services", "Chemicals", "Computer Hardware & Software", "Construction & Real Estate",
  "Consumer Electronics", "Electronics & Electrical Supplies", "Energy & Power", "Environment & Pollution",
  "Food & Beverage", "Furniture", "Gifts & Crafts", "Health & Beauty",
  "Home Supplies", "Home Textiles & Furnishings", "Hospital & Medical Supplies", "Hotel Supplies & Equipment",
  "Industrial Supplies", "Jewelry & Gemstones", "Leather & Leather Products", "Machinery",
  "Mineral & Metals", "Office & School Supplies", "Packaging & Paper", "Pharmaceuticals",
  "Pipes, Tubes & Fittings", "Plastics & Products", "Printing & Publishing", "Scientific & Laboratory Instruments",
  "Security & Protection", "Sports & Entertainment", "Telecommunications", "Textiles & Fabrics",
  "Toys", "Transportation"
];

// Mapping variations & subcategories strictly to their canonical category
export const CATEGORY_SYNONYMS = {
  "Food & Beverage": [
    "food", "foods", "beverage", "beverages", "food & beverages", "foods & beverages",
    "fmcg", "fmcg & grocery", "grocery", "groceries", "snacks & namkeen", "snack", "snacks",
    "namkeen", "spices & masala", "spices", "masala", "packaged foods", "packaged food",
    "edible oils", "edible oil", "bakery & confectionery", "tea & coffee", "dairy products",
    "chips & wafers", "namkeen & bhujia", "alcoholic beverages", "grains & cereals", "organic food"
  ],
  "Health & Beauty": [
    "health & beauty", "beauty", "cosmetics", "cosmetic", "skincare", "haircare",
    "personal care", "herbal & ayurvedic beauty", "ayurvedic & herbal", "ayurvedic", "herbal",
    "herbal cosmetics", "salon & spa supplies", "fragrances & deodorants"
  ],
  "Pharmaceuticals": [
    "pharmaceutical", "pharmaceuticals", "pharma", "medicines", "medicine", "generic drugs",
    "generic medicines", "tablets & capsules", "syrups & liquids", "ayurvedic & herbal medicines",
    "nutraceuticals", "otc medicines"
  ],
  "Apparel & Fashion": [
    "apparel", "fashion", "clothing", "garments", "textiles & garments", "wear", "ethnic wear",
    "western wear", "mens wear", "womens wear", "kids & baby wear", "footwear", "fashion accessories"
  ],
  "Chemicals": [
    "chemical", "chemicals", "chemicals & fertilizers", "fertilizers", "industrial chemicals",
    "cleaning chemicals", "adhesives & sealants", "coating & paints", "solvents", "dyes & pigments"
  ],
  "Home Supplies": [
    "home supplies", "household supplies", "household essentials", "cleaning supplies",
    "kitchenware", "bathroom accessories", "disposable items", "pest control"
  ],
  "Construction & Real Estate": [
    "construction", "consturction", "building materials", "tiles & flooring", "real estate",
    "cement & concrete", "sanitaryware & fittings", "doors & windows", "paints & wall finishes"
  ],
  "Electronics & Electrical Supplies": [
    "electronics & electrical", "electronics and electrical", "electrical", "electrical supplies",
    "electronics & hardware", "cables & wires", "switches & sockets", "led & lighting",
    "transformers & switchgear", "circuit breakers", "solar panels & systems"
  ],
  "Agriculture": [
    "agriculture", "agriculture & farming", "farming", "agro", "seeds & saplings",
    "fertilizers & nutrients", "livestock feed", "farm equipment", "seeds & seedlings", "animal feed"
  ],
  "Automobile": [
    "automobile", "automotive", "automotive parts", "auto parts", "lubricants & oils",
    "lubricant oil", "spare parts", "filters & lubricants", "two wheeler parts", "batteries", "tires & tubes"
  ],
  "Packaging & Paper": [
    "packaging & paper", "packaging", "corrugated boxes", "paper bags", "flexible packaging",
    "paper", "carton", "labels & tapes", "packaging films", "kraft paper & board"
  ],
  "Hospital & Medical Supplies": [
    "hospital & medical supplies", "medical supplies", "hospital supplies", "medical equipment",
    "surgical instruments", "disposable medical supplies", "diagnostic equipment", "ppe & masks"
  ],
  "Gifts & Crafts": [
    "gift & craft", "gifts & crafts", "handicrafts", "corporate gifts", "decorative items",
    "wooden crafts", "candles & scents"
  ],
  "Consumer Electronics": [
    "consumer electronics", "appliance store", "home appliance", "mobile phones & accessories",
    "home appliances", "audio & headphones", "televisions & home theater", "smart home devices"
  ],
  "Pipes, Tubes & Fittings": [
    "pipes, tubes & fittings", "pipes & tubes", "pvc pipes", "pipe fittings", "valves & cocks",
    "hose pipes", "industrial tubing"
  ],
  "Industrial Supplies": [
    "industrial supplies", "tools", "fasteners & bolts", "industrial hardware", "bearings & belts",
    "welding supplies", "pumps & compressors", "safety gear & ppe"
  ],
  "Computer Hardware & Software": [
    "computer hardware & software", "computer hardware", "it products", "software", "laptops & desktops",
    "networking equipment", "printers & scanners", "enterprise software"
  ],
  "Energy & Power": [
    "energy & power", "solar energy systems", "generators & inverters", "batteries & ups"
  ],
  "Furniture": [
    "furniture", "furniture & interiors", "office furniture", "home furniture", "modular furniture",
    "beds & mattresses", "sofas & chairs", "tables & desks"
  ],
  "Home Textiles & Furnishings": [
    "home textiles & furnishings", "home textiles", "curtains & blinds", "bed linen & sheets",
    "cushions & covers", "carpets & rugs", "towels & bath linen"
  ],
  "Hotel Supplies & Equipment": [
    "hotel supplies & equipment", "commercial kitchen equipment", "hotel linen", "guest amenities",
    "tableware & crockery"
  ],
  "Jewelry & Gemstones": [
    "jewelry & gemstones", "jewelry", "fashion jewelry", "gemstones", "silver jewelry", "gold jewelry"
  ],
  "Leather & Leather Products": [
    "leather & leather products", "leather products", "leather footwear", "leather bags", "leather belts"
  ],
  "Machinery": [
    "machinery", "food processing machinery", "packaging machinery", "industrial machinery",
    "agricultural machinery", "textile machinery", "cnc & lathe machines"
  ],
  "Mineral & Metals": [
    "mineral & metals", "minerals & metals", "steel", "iron & steel", "aluminum products",
    "copper & brass", "industrial minerals", "scrap metal"
  ],
  "Plastics & Products": [
    "plastics & products", "plastic products", "plastic containers & bottles", "plastic molded components"
  ],
  "Printing & Publishing": [
    "printing & publishing", "commercial printing", "digital printing", "offset printing services"
  ],
  "Security & Protection": [
    "security & protection", "cctv cameras & systems", "fire safety", "access control & biometrics"
  ],
  "Sports & Entertainment": [
    "sports & entertainment", "fitness & gym equipment", "sports goods", "outdoor sports goods"
  ],
  "Telecommunications": [
    "telecommunications", "telecom", "optical fiber", "wireless equipment", "networking switches & routers"
  ],
  "Textiles & Fabrics": [
    "textiles & fabrics", "fabrics", "cotton fabrics", "yarn & thread", "synthetic fabrics", "denim fabrics"
  ],
  "Toys": [
    "toys", "educational toys", "board games", "plastic & action toys", "soft & plush toys"
  ],
  "Transportation": [
    "transportation", "logistics & cargo services", "commercial vehicles", "warehousing equipment"
  ],
  "Brass Hardware & Components": [
    "brass hardware & components", "brass hardware", "brass screws & fasteners", "brass precision turned parts"
  ],
  "Environment & Pollution": [
    "environment & pollution", "water & wastewater treatment", "recycling", "waste management"
  ],
  "Office & School Supplies": [
    "office & school supplies", "school supplies", "stationery", "office supplies", "notebooks & diaries", "pens & writing instruments"
  ],
  "Scientific & Laboratory Instruments": [
    "scientific & laboratory instruments", "laboratory equipment", "laboratory glassware", "microscopes", "testing & measurement equipment"
  ],
  "Business Services": [
    "business services", "consulting", "company registration", "taxation & accounting services", "digital marketing"
  ]
};

// Build canonical reverse lookup
const CANONICAL_MAP = new Map();
STANDARD_CATEGORIES.forEach(cat => {
  CANONICAL_MAP.set(normalizeCategory(cat), cat);
});
for (const [canon, syns] of Object.entries(CATEGORY_SYNONYMS)) {
  for (const s of syns) {
    CANONICAL_MAP.set(normalizeCategory(s), canon);
  }
}

export function toCanonicalCategory(str) {
  if (!str) return null;
  const norm = normalizeCategory(str);
  if (!norm) return null;
  return CANONICAL_MAP.get(norm) || null;
}

function checkCategoryPair(normA, normB) {
  if (!normA || !normB) return false;
  if (normA === normB) return true;

  const canonA = CANONICAL_MAP.get(normA);
  const canonB = CANONICAL_MAP.get(normB);

  // If both resolve to canonical categories, they MUST match exactly
  if (canonA && canonB) {
    return canonA === canonB;
  }

  // If one resolves to a canonical category, check if the other matches this canonical's synonyms
  if (canonA) {
    const syns = CATEGORY_SYNONYMS[canonA] || [];
    return syns.some(s => normalizeCategory(s) === normB);
  }
  if (canonB) {
    const syns = CATEGORY_SYNONYMS[canonB] || [];
    return syns.some(s => normalizeCategory(s) === normA);
  }

  // For unmapped strings, require strong word-level exact equality
  return normA === normB;
}

/**
 * Check if any category from listA matches any category from listB
 */
export function isCategoryMatch(listA = [], listB = []) {
  const normA = (Array.isArray(listA) ? listA : [listA]).map(normalizeCategory).filter(Boolean);
  const normB = (Array.isArray(listB) ? listB : [listB]).map(normalizeCategory).filter(Boolean);

  if (normA.length === 0 || normB.length === 0) return false;

  for (const a of normA) {
    for (const b of normB) {
      if (checkCategoryPair(a, b)) return true;
    }
  }
  return false;
}

/**
 * Robust Category matcher comparing single/array category with target category
 */
export function matchCategory(itemCategory, targetCategory) {
  if (!targetCategory || targetCategory === "All" || targetCategory === "All Categories") return true;
  if (!itemCategory) return false;
  const listA = Array.isArray(itemCategory)
    ? itemCategory.map(c => typeof c === "string" ? c : (c?.name || c?.label || ""))
    : [itemCategory];
  const listB = Array.isArray(targetCategory)
    ? targetCategory.map(c => typeof c === "string" ? c : (c?.name || c?.label || ""))
    : [targetCategory];
  return isCategoryMatch(listA, listB);
}

export function matchState(itemState, targetState) {
  if (!targetState || targetState === "All" || targetState === "All States") return true;
  if (!itemState) return false;
  const sTarget = targetState.toLowerCase().trim();
  const sItem = (typeof itemState === "string" ? itemState : "").toLowerCase().trim();
  if (sItem === sTarget || sItem.includes(sTarget) || sTarget.includes(sItem)) return true;
  if (sTarget === "maharashtra" && sItem.includes("महाराष्ट्र")) return true;
  if (sTarget === "delhi" && (sItem.includes("new delhi") || sItem.includes("ncr"))) return true;
  return false;
}

/**
 * Robust City matcher
 */
export function matchCity(itemCity, queryCity) {
  if (!queryCity || !queryCity.trim()) return true;
  const q = queryCity.toLowerCase().trim();
  const c = (typeof itemCity === "string" ? itemCity : "").toLowerCase().trim();
  return c.includes(q) || q.includes(c);
}

/**
 * Evaluates contact access for a user viewing a Buyer listing
 */
export function checkSellerToBuyerAccess({ currentUser, userListing, buyer }) {
  if (!buyer) {
    return { hasAccess: false, reason: "not_found", message: "Buyer profile not found." };
  }

  // 1. Admin always has full access
  if (currentUser?.role === "admin") {
    return { hasAccess: true, reason: "admin", message: "Admin full access." };
  }

  // 2. Buyer viewing their own listing
  const isOwner = currentUser?.role === "buyer" && (
    currentUser?.linkedSlug === buyer?.slug ||
    currentUser?.linkedId === buyer?.id ||
    (currentUser?.email && (buyer?.contactEmail || buyer?.email || "").toLowerCase() === currentUser.email.toLowerCase())
  );
  if (isOwner) {
    return { hasAccess: true, reason: "owner", message: "Your own buyer listing." };
  }

  // 3. Buyer has explicitly opted to hide contact details
  if (buyer?.hideContact || buyer?.hidePhone) {
    return {
      hasAccess: false,
      reason: "buyer_hidden",
      message: "This buyer has opted to keep their direct contact details private. Please connect via Koop India Desk.",
    };
  }

  // 4. Admin explicitly assigned this seller to this buyer
  const isAssigned = currentUser?.role === "seller" && (
    (Array.isArray(buyer?.assignedSellerIds) && buyer.assignedSellerIds.includes(currentUser.linkedId)) ||
    (Array.isArray(buyer?.assignedSellerSlugs) && buyer.assignedSellerSlugs.includes(currentUser.linkedSlug)) ||
    (Array.isArray(buyer?.assignedSellerEmails) && buyer.assignedSellerEmails.includes(currentUser.email?.toLowerCase())) ||
    (Array.isArray(buyer?.assignedSellers) && buyer.assignedSellers.some(s =>
      s?.id === currentUser.linkedId ||
      s?.slug === currentUser.linkedSlug ||
      (s?.email && s.email.toLowerCase() === currentUser.email?.toLowerCase())
    ))
  );
  if (isAssigned) {
    return { hasAccess: true, reason: "assigned", message: "Admin assigned direct contact access." };
  }

  // 5. Check if visitor is a logged-in seller
  if (currentUser?.role === "seller") {
    // Check if seller has a listing on our portal
    if (!userListing) {
      return {
        hasAccess: false,
        reason: "not_listed",
        message: "You are not listed on Koop India yet. Direct contact details unlock once your business is registered and listed as Live on our portal.",
      };
    }

    // Check if seller's listing is live
    const listingStatus = userListing?.status || "draft";
    if (listingStatus !== "live") {
      return {
        hasAccess: false,
        reason: "listing_not_live",
        message: `Your seller listing is currently in "${listingStatus}" status. Contact details unlock once your listing is verified and set to Live on our portal by Admin.`,
      };
    }

    // Match seller category against buyer category
    const sellerCats = extractSellerCategories(userListing);
    const buyerCats = extractBuyerCategories(buyer);
    const matched = isCategoryMatch(sellerCats, buyerCats);

    if (matched) {
      return {
        hasAccess: true,
        reason: "category_match",
        message: "Verified Seller: Unlocked via matching category.",
        matchedCategories: { seller: sellerCats, buyer: buyerCats },
      };
    } else {
      const buyerCatName = buyer.category || "this category";
      const sellerCatName = userListing?.category || "different category";
      return {
        hasAccess: false,
        reason: "category_mismatch",
        message: `Direct contact is unlocked for sellers listed in "${buyerCatName}". Your listing is in "${sellerCatName}".`,
      };
    }
  }

  // 6. Unregistered / Public visitor / Buyer viewing another buyer
  return {
    hasAccess: false,
    reason: "not_logged_in",
    message: "Buyer contact details are private. Only verified businesses listed on Koop India can view direct contact details.",
  };
}

/**
 * Evaluates contact access for a user viewing a Seller listing
 */
export function checkBuyerToSellerAccess({ currentUser, userListing, seller }) {
  if (!seller) {
    return { hasAccess: false, reason: "not_found", message: "Seller profile not found." };
  }

  // 1. Admin always has full access
  if (currentUser?.role === "admin") {
    return { hasAccess: true, reason: "admin", message: "Admin full access." };
  }

  // 2. Seller viewing their own listing
  const isOwner = currentUser?.role === "seller" && (
    currentUser?.linkedSlug === seller?.slug ||
    currentUser?.linkedId === seller?.id ||
    (currentUser?.email && (seller?.email || "").toLowerCase() === currentUser.email.toLowerCase())
  );
  if (isOwner) {
    return { hasAccess: true, reason: "owner", message: "Your own seller listing." };
  }

  // 3. Seller has explicitly opted to hide contact details
  if (seller?.hideContact || seller?.hidePhone) {
    return {
      hasAccess: false,
      reason: "seller_hidden",
      message: "This seller has opted to keep their direct contact details private. Please connect via Koop India Desk.",
    };
  }

  // 4. Check if visitor is a logged-in buyer
  if (currentUser?.role === "buyer") {
    // Check if buyer has a profile listed on our portal
    if (!userListing) {
      return {
        hasAccess: false,
        reason: "not_listed",
        message: "You are not listed on Koop India yet. Direct contact details unlock once your business profile is registered and listed as Live on our portal.",
      };
    }

    // Check if buyer's listing is live
    const listingStatus = userListing?.status || "draft";
    if (listingStatus !== "live") {
      return {
        hasAccess: false,
        reason: "listing_not_live",
        message: `Your buyer profile is currently in "${listingStatus}" status. Contact details unlock once your profile is verified and set to Live on our portal by Admin.`,
      };
    }

    // Match buyer category against seller category
    const buyerCats = extractBuyerCategories(userListing);
    const sellerCats = extractSellerCategories(seller);
    const matched = isCategoryMatch(buyerCats, sellerCats);

    if (matched) {
      return {
        hasAccess: true,
        reason: "category_match",
        message: "Verified Buyer: Unlocked via matching category.",
        matchedCategories: { buyer: buyerCats, seller: sellerCats },
      };
    } else {
      const sellerCatName = seller.category || "this category";
      const buyerCatName = userListing?.category || "different category";
      return {
        hasAccess: false,
        reason: "category_mismatch",
        message: `Direct contact is unlocked for buyers in "${sellerCatName}". Your registered category is "${buyerCatName}".`,
      };
    }
  }

  // 4. Unregistered / Public visitor / Seller viewing another seller
  return {
    hasAccess: false,
    reason: "not_logged_in",
    message: "Contact details are private. Register or login as a verified Buyer in this category to unlock.",
  };
}

export const CATEGORY_MAP = {
  "Agriculture": { emoji: "🌾", subs: ["Agri Commodities","Agricultural Machinery","Animal Feed & Cattle Feed","Biofertilizers","Crop Protection Products","Drip & Sprinkler Equipment","Farm Tools & Implements","Fertilizers","Greenhouse Supplies","Herbicides & Fungicides","Irrigation Systems","Organic Farming Inputs","Pesticides & Insecticides","Post-Harvest Equipment","Poultry Feed & Supplies","Seeds & Planting Material"] },
  "Apparel & Fashion": { emoji: "👗", subs: ["Bags & Wallets","Belts & Suspenders","Ethnic Wear","Fashion Accessories","Footwear","Innerwear & Loungewear","Kids' Clothing","Men's Clothing","Scarves & Stoles","Sportswear & Activewear","Sunglasses & Eyewear","Uniforms & Workwear","Watches","Western Wear","Women's Clothing"] },
  "Automobile": { emoji: "🚗", subs: ["Automotive Electricals","Batteries","Braking Systems","Car Care Products","Commercial Vehicle Parts","EV Components & Accessories","Filters","Garage & Workshop Equipment","Lighting & Accessories","Lubricants & Oils","Passenger Vehicle Parts","Three-Wheeler Parts","Two-Wheeler Parts","Tyres & Tubes","Vehicle Accessories"] },
  "Brass Hardware & Components": { emoji: "🔩", subs: ["Brass Anchors & Bushes","Brass Cable Glands","Brass Decorative Hardware","Brass Electrical Components","Brass Fasteners","Brass Industrial Components","Brass Inserts","Brass Machined Components","Brass Plumbing Fittings","Brass Sanitary Fittings","Brass Terminals & Connectors","Brass Turned Parts","Brass Valves"] },
  "Business Services": { emoji: "💼", subs: ["Accounting & Tax Services","Business Consulting","Company Registration & Compliance","CRM & Software Development","Digital Marketing Services","Distributor & Dealer Appointment Services","Franchise Development","Lead Generation Services","Logistics & Supply Chain Services","Market Research Services","Packaging & Design Services","Recruitment & HR Services","Trademark & Intellectual Property Services","Training & Skill Development","Website Development"] },
  "Chemicals": { emoji: "🧪", subs: ["Adhesives & Sealants","Agrochemicals","Chemical Raw Materials","Cleaning Chemicals","Construction Chemicals","Dyes & Pigments","Food-Grade Chemicals","Industrial Chemicals","Laboratory Chemicals","Lubricant Additives","Paints & Coatings","Rubber Chemicals","Specialty Chemicals","Textile Chemicals","Water Treatment Chemicals"] },
  "Computer Hardware & Software": { emoji: "💻", subs: ["Backup & Data Management","Business & Accounting Software","Cloud & Hosting Services","Computer Components","Computer Peripherals","Cybersecurity Software","Desktop Computers","ERP & CRM Software","IT Accessories","Laptops & Workstations","Networking Equipment","Operating Systems","POS Hardware & Software","Printers & Scanners","Servers & Storage"] },
  "Construction & Real Estate": { emoji: "🏗️", subs: ["Bricks, Blocks & Tiles","Building Hardware","Cement & Cement Products","Construction Chemicals","Doors & Windows","Flooring Materials","Insulation Materials","Modular Construction Products","Paints & Wall Finishes","Plumbing Materials","Plywood & Laminates","Roofing Materials","Sanitaryware","Timber & Wood Products","Waterproofing Solutions"] },
  "Consumer Electronics": { emoji: "📱", subs: ["Audio Systems & Speakers","Cameras & Accessories","Consumer Batteries","Drones","Gaming Accessories","Headphones & Earphones","Home Entertainment","Mobile Accessories","Personal Audio Devices","Power Banks & Chargers","Projectors","Smart Home Devices","Smart Watches & Wearables","Televisions"] },
  "Electronics & Electrical Supplies": { emoji: "⚡", subs: ["Batteries & Inverters","Circuit Breakers & Protection","Connectors & Terminals","Control Gear","Earthing & Lightning Protection","Electrical Accessories","Electrical Panels","Industrial Automation","LED Lighting","Motors & Drives","Power Distribution Products","Solar Electrical Components","Switches & Sockets","Transformers","Wires & Cables"] },
  "Energy & Power": { emoji: "🔋", subs: ["Biomass Energy Products","Diesel & Gas Generator Sets","Energy Efficiency Products","Energy Meters","Energy Storage Systems","EV Charging Equipment","Power Conditioning Equipment","Power Generation Equipment","Power Plant Components","Solar Batteries","Solar Inverters","Solar Mounting Structures","Solar Panels & Modules","Solar Water Heaters","Wind Energy Components"] },
  "Environment & Pollution": { emoji: "🌱", subs: ["Air Filtration Systems","Air Pollution Control","Biodegradable Products","Composting Equipment","Effluent Treatment Plants","Environmental Monitoring Systems","Noise Pollution Control","Oil Spill Control Products","Recycling Equipment","Solid Waste Management","Waste Handling Equipment","Wastewater Treatment Equipment","Water Testing Instruments","Water Treatment Systems"] },
  "Food & Beverage": { emoji: "🍱", subs: ["Animal Food & Pet Food","Bakery Products","Biscuits & Cookies","Dairy Products","Dry Fruits & Nuts","Edible Oils & Ghee","Frozen Foods","Health Foods & Nutrition","Juices & Fruit Drinks","Packaged Drinking Water","Packaged Snacks & Namkeen","Pickles & Chutneys","Pulses & Grains","Ready-to-Cook Foods","Ready-to-Eat Foods","Sauces, Ketchup & Dips","Soft Drinks & Energy Drinks","Spices & Masala","Sweets & Confectionery","Tea & Coffee"] },
  "Furniture": { emoji: "🪑", subs: ["Bedroom Furniture","Chairs & Seating","Furniture Hardware","Home Furniture","Hotel Furniture","Industrial Furniture","Kitchen Furniture","Living Room Furniture","Mattresses & Bed Bases","Modular Furniture","Office Furniture","Outdoor & Garden Furniture","Retail Display Fixtures","School & Institutional Furniture","Wooden Furniture"] },
  "Gifts & Crafts": { emoji: "🎁", subs: ["Art & Craft Supplies","Candles & Fragrance Gifts","Corporate Gifts","Festive Gifts","Gift Hampers","Greeting Cards","Handicrafts","Home Décor Crafts","Personalized Gifts","Promotional Gifts","Souvenirs","Traditional Crafts","Trophies & Awards","Wedding & Occasion Gifts"] },
  "Health & Beauty": { emoji: "💄", subs: ["Baby Care","Bath & Body Products","Beauty Salon Products","Beauty Tools & Accessories","Cosmetics & Makeup","Essential Oils","Feminine Hygiene","Hair Care","Herbal & Ayurvedic Personal Care","Men's Grooming","Oral Care","Perfumes & Deodorants","Personal Hygiene","Skin Care"] },
  "Home Supplies": { emoji: "🧹", subs: ["Bathroom Accessories","Bedding Essentials","Cookware & Bakeware","Home Décor","Home Storage & Organization","Home Utility Products","Household Cleaning Products","Kitchenware","Laundry Products","Lighting & Lamps","Pest Control Products","Plastic Household Products","Small Home Appliances","Tableware & Dinnerware"] },
  "Home Textiles & Furnishings": { emoji: "🛋️", subs: ["Bed Sheets & Pillow Covers","Blankets & Comforters","Carpets & Rugs","Curtains & Drapes","Cushions & Throws","Decorative Fabrics","Institutional Linen","Kitchen Linen","Mats & Door Mats","Mattress Protectors","Mosquito Nets","Quilts & Dohars","Table Linen","Towels & Bath Linen","Upholstery Fabrics"] },
  "Hospital & Medical Supplies": { emoji: "🏥", subs: ["Dental Supplies","Diagnostic Equipment","Hospital Furniture","Hospital Housekeeping Supplies","IV & Infusion Supplies","Laboratory Consumables","Medical Disposables","Medical Imaging Equipment","Oxygen & Respiratory Equipment","Patient Monitoring Devices","PPE & Safety Wear","Rehabilitation Equipment","Sterilization Equipment","Surgical Instruments","Wound Care Products"] },
  "Hotel Supplies & Equipment": { emoji: "🏨", subs: ["Access Control & Key Systems","Bed & Bath Linen","Buffet & Catering Equipment","Commercial Kitchen Equipment","Food Service Disposables","Guest Room Amenities","Hotel Cleaning Chemicals","Hotel Furniture","Hotel Toiletries","Hotel Uniforms","Housekeeping Supplies","Laundry Equipment","Minibar Equipment","Restaurant Tableware","Spa & Wellness Supplies"] },
  "Industrial Supplies": { emoji: "🏭", subs: ["Bearings & Power Transmission","Compressors & Pneumatics","Factory Maintenance Supplies","Hydraulics","Industrial Adhesives","Industrial Fasteners","Industrial Filters","Material Handling Equipment","Process Equipment","Pumps & Pump Parts","Safety Equipment & PPE","Seals & Gaskets","Tools & Tooling","Valves & Flow Control","Welding Equipment & Consumables"] },
  "Jewelry & Gemstones": { emoji: "💎", subs: ["Bridal Jewelry","Diamond Jewelry","Fashion Jewelry","Gemstones & Precious Stones","Gold Jewelry","Imitation Jewelry","Jewelry Display Supplies","Jewelry Findings & Components","Jewelry Packaging","Jewelry Tools & Equipment","Men's Jewelry","Pearls & Pearl Jewelry","Silver Jewelry"] },
  "Leather & Leather Products": { emoji: "👞", subs: ["Belts","Industrial Leather Goods","Leather Accessories","Leather Bags","Leather Care Products","Leather Footwear","Leather Garments","Saddlery & Equestrian Goods","Synthetic Leather Products","Travel Goods","Upholstery Leather","Wallets & Card Holders"] },
  "Machinery": { emoji: "⚙️", subs: ["Agricultural Machinery","Bottling & Filling Machinery","CNC Machines","Construction Machinery","Food Processing Machinery","Industrial Automation Machinery","Machine Tools","Material Handling Machinery","Packaging Machinery","Pharmaceutical Machinery","Plastic Processing Machinery","Printing Machinery","Pumps & Compressors","Textile Machinery","Woodworking Machinery"] },
  "Mineral & Metals": { emoji: "⛏️", subs: ["Aluminium Products","Copper & Brass","Foundry Products","Industrial Minerals","Iron & Steel Products","Metal Bars & Rods","Metal Pipes & Tubes","Metal Powders","Metal Scrap & Recyclables","Metal Sheets & Plates","Non-Metallic Minerals","Stainless Steel","Wire & Wire Products","Zinc & Lead"] },
  "Office & School Supplies": { emoji: "✏️", subs: ["Art & Craft Supplies","Classroom Supplies","Educational Aids","Files, Folders & Organizers","Notebooks & Registers","Office Consumables","Office Furniture","Office Machines","Office Paper","Pens, Pencils & Writing Instruments","Printer Consumables","School Bags & Backpacks","School Uniform Accessories","Stationery Kits","Whiteboards & Presentation Supplies"] },
  "Packaging & Paper": { emoji: "📦", subs: ["Cartons & Folding Boxes","Corrugated Boxes","Flexible Packaging","Food Packaging","Industrial Packaging","Labels & Stickers","Packaging Films","Packaging Machinery","Paper Bags","Paper Rolls & Sheets","Pharmaceutical Packaging","Plastic Packaging","Printing Paper","Protective Packaging","Tissue & Hygiene Paper"] },
  "Pharmaceuticals": { emoji: "💊", subs: ["Ayurvedic Medicines","Branded Medicines","Diagnostic Products","Disinfectants & Antiseptics","Generic Medicines","Homeopathic Products","Medical Consumables","Nutraceuticals","OTC Products","Pharma Packaging","Pharmaceutical Raw Materials","Surgical Products","Veterinary Medicines","Vitamins & Supplements"] },
  "Pipes, Tubes & Fittings": { emoji: "🔧", subs: ["Copper Pipes & Fittings","CPVC Pipes & Fittings","Ductile Iron Pipes","GI Pipes & Fittings","HDPE Pipes","Hoses & Flexible Tubing","Industrial Process Piping","Irrigation Pipes","MS Pipes & Tubes","Pipe Clamps & Supports","PPR Pipes & Fittings","PVC Pipes & Fittings","Stainless Steel Tubes","UPVC Pipes & Fittings","Valves & Pipe Accessories"] },
  "Plastics & Products": { emoji: "🛞", subs: ["Blow-Moulded Products","Engineering Plastics","Injection-Moulded Products","Plastic Components","Plastic Furniture","Plastic Granules","Plastic Household Goods","Plastic Moulds & Dies","Plastic Packaging Products","Plastic Pipes & Fittings","Plastic Raw Materials & Resins","Plastic Sheets & Films","PVC Products","Recycled Plastics"] },
  "Printing & Publishing": { emoji: "🖨️", subs: ["Binding & Finishing Equipment","Books & Publications","Commercial Printing","Digital Printing","Educational Publishing","Labels & Tags","Large-Format Printing","Offset Printing","Packaging Printing","Printing Inks & Consumables","Printing Plates & Materials","Promotional Printing","Publishing Services","Security Printing"] },
  "Scientific & Laboratory Instruments": { emoji: "🔬", subs: ["Analytical Instruments","Balances & Weighing Equipment","Calibration Equipment","Environmental Testing Instruments","Lab Furniture","Lab Plasticware","Lab Safety Products","Laboratory Chemicals & Reagents","Laboratory Glassware","Microscopes & Optical Instruments","pH & Water Testing Instruments","Research & Educational Lab Kits","Sample Preparation Equipment","Scientific Sensors","Testing & Measurement Instruments"] },
  "Security & Protection": { emoji: "🛡️", subs: ["Access Control Systems","Alarm Systems","Biometric Systems","CCTV Cameras & Systems","Cybersecurity Products","Fire Detection & Alarm Systems","Fire Extinguishers","Firefighting Equipment","Locks & Padlocks","Metal Detectors","Perimeter Security","Personal Protective Equipment","Safes & Vaults","Safety Signage","Security Guards' Equipment"] },
  "Sports & Entertainment": { emoji: "⚽", subs: ["Audio-Visual Equipment","Camping & Outdoor Recreation","Event & Stage Equipment","Fitness Equipment","Gym Accessories","Indoor Sports Equipment","Musical Instruments","Outdoor Sports Equipment","Racket Sports Equipment","Sports Apparel","Sports Footwear","Swimming Pool Equipment","Team Sports Goods","Toys & Recreational Products","Trophies & Medals"] },
  "Telecommunications": { emoji: "📡", subs: ["Antennas & RF Components","Communication Test Equipment","Fiber Optic Products","Mobile Network Accessories","Network Racks & Cabinets","PBX & VoIP Systems","Routers & Modems","Satellite Communication Equipment","Switching Equipment","Telecom Cables","Telecom Installation Tools","Telecom Network Equipment","Telecom Power Systems","Two-Way Radios"] },
  "Textiles & Fabrics": { emoji: "🧵", subs: ["Blended Fabrics","Cotton Fabrics","Denim Fabrics","Garment Fabrics","Home Furnishing Fabrics","Industrial Textiles","Knitted Fabrics","Nonwoven Fabrics","Polyester Fabrics","Silk & Silk Fabrics","Technical Textiles","Textile Dyes & Auxiliaries","Textile Yarns","Wool & Wool Blends","Woven Fabrics"] },
  "Toys": { emoji: "🧸", subs: ["Action Figures","Board Games & Puzzles","Building & Construction Toys","Creative & Craft Kits","Dolls & Accessories","Educational Toys","Electronic Toys","Infant & Toddler Toys","Outdoor Play Equipment","Remote-Controlled Toys","Ride-On Toys","Soft Toys","Sports Toys","Toy Parts & Accessories","Traditional Toys"] },
  "Transportation": { emoji: "🚚", subs: ["Air Cargo Services","Cold Chain Logistics","Courier & Express Services","Fleet Management Solutions","Freight & Cargo Services","Last-Mile Delivery","Logistics Software","Material Handling & Logistics Equipment","Moving & Relocation","Packaging & Cargo Protection","Rail Transport Services","Road Transport Services","Sea Freight & Shipping","Warehousing & Distribution"] },
};

export const CATEGORIES = Object.keys(CATEGORY_MAP);

export const CATEGORY_SUBCATEGORIES = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([cat, data]) => [cat, data.subs])
);

export const PRODUCT_CATEGORY_ICONS = Object.entries(CATEGORY_MAP).map(
  ([label, data]) => ({ label, icon: data.emoji })
);

export const FILTER_STATES = [
  "All States", "Delhi", "Maharashtra", "Gujarat", "Karnataka", "Rajasthan",
  "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Punjab", "Haryana",
  "Madhya Pradesh", "Bihar", "Telangana", "Andhra Pradesh", "Kerala",
  "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh",
  "Goa", "Chhattisgarh", "Jammu and Kashmir", "Chandigarh"
];
