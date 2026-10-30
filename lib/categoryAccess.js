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
  "Food & Beverage", "Health & Beauty", "Pharmaceuticals", "Apparel & Fashion",
  "Chemicals", "Home Supplies", "Construction & Real Estate", "Electronics & Electrical Supplies",
  "Agriculture", "Automobile", "Packaging & Paper", "Hospital & Medical Supplies",
  "Gifts & Crafts", "Consumer Electronics", "Pipes, Tubes & Fittings", "Industrial Supplies",
  "Computer Hardware & Software", "Energy & Power", "Furniture", "Home Textiles & Furnishings",
  "Hotel Supplies & Equipment", "Jewelry & Gemstones", "Leather & Leather Products", "Machinery",
  "Mineral & Metals", "Plastics & Products", "Printing & Publishing", "Security & Protection",
  "Sports & Entertainment", "Telecommunications", "Textiles & Fabrics", "Toys",
  "Transportation", "Brass Hardware & Components", "Environment & Pollution", "Office & School Supplies",
  "Scientific & Laboratory Instruments", "Business Services"
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

export const CATEGORIES = [
  "Food & Beverage", "Health & Beauty", "Pharmaceuticals", "Apparel & Fashion",
  "Chemicals", "Home Supplies", "Construction & Real Estate", "Electronics & Electrical Supplies",
  "Agriculture", "Automobile", "Packaging & Paper", "Hospital & Medical Supplies",
  "Gifts & Crafts", "Consumer Electronics", "Pipes, Tubes & Fittings", "Industrial Supplies",
  "Computer Hardware & Software", "Energy & Power", "Furniture", "Home Textiles & Furnishings",
  "Hotel Supplies & Equipment", "Jewelry & Gemstones", "Leather & Leather Products", "Machinery",
  "Mineral & Metals", "Plastics & Products", "Printing & Publishing", "Security & Protection",
  "Sports & Entertainment", "Telecommunications", "Textiles & Fabrics", "Toys",
  "Transportation", "Brass Hardware & Components", "Environment & Pollution", "Office & School Supplies",
  "Scientific & Laboratory Instruments", "Business Services"
];

export const FILTER_STATES = [
  "All States", "Delhi", "Maharashtra", "Gujarat", "Karnataka", "Rajasthan",
  "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Punjab", "Haryana",
  "Madhya Pradesh", "Bihar", "Telangana", "Andhra Pradesh", "Kerala",
  "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh",
  "Goa", "Chhattisgarh", "Jammu and Kashmir", "Chandigarh"
];
