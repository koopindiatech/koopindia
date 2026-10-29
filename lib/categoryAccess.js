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

export const CATEGORY_KEYWORDS = {
  "Food & Beverage": ["food", "beverag", "fmcg", "snack", "namkeen", "grocer", "tea", "coffee", "spices", "masala", "edibleoil", "bakery", "sweet", "dairy", "liquor", "whisky", "vodka", "rum", "beer", "alcoholic", "packagedfood", "jaggery", "wafer", "chips"],
  "Health & Beauty": ["beauty", "cosmetic", "skincare", "haircare", "personalcare", "herbal", "ayurved", "perfume", "fragrance"],
  "Pharmaceuticals": ["pharma", "medicine", "drug", "healthcare", "genericmedicine"],
  "Apparel & Fashion": ["apparel", "fashion", "clothing", "garment", "wear", "shirt", "jeans", "tshirt", "suit", "saree", "dress"],
  "Chemicals": ["chemic", "fertilizer", "adhesive", "sealant", "coating", "paint"],
  "Home Supplies": ["homesuppl", "householdsuppl", "cleaning", "householdessential", "detergent", "cleaner"],
  "Construction & Real Estate": ["construct", "consturct", "realestate", "cement", "building", "tiles", "marble", "granite", "roofing"],
  "Electronics & Electrical Supplies": ["electronicsandelectrical", "electrical", "switch", "socket", "wire", "cable", "lighting", "polycab"],
  "Agriculture": ["agri", "farming", "farm", "crop", "seed", "livestock", "feed", "grain", "agro"],
  "Automobile": ["automobile", "automotive", "vehicle", "car", "bike", "lubricant", "engineoil", "motor", "autoparts"],
  "Packaging & Paper": ["packaging", "paper", "corrugated", "carton", "bubblewrap", "stretchfilm", "shrinkfilm", "polybag", "kraftpaper", "paperbag", "packingbox"],
  "Hospital & Medical Supplies": ["hospit", "medic", "surgical", "medicalequipment"],
  "Gifts & Crafts": ["gift", "craft", "handicraft", "souvenir", "novelty"],
  "Consumer Electronics": ["consumerelectronic", "homeappliance", "appliancestore", "gadget", "smartphone", "mobilephone", "boat"],
  "Pipes, Tubes & Fittings": ["pipe", "tube", "fitting", "valve", "plumbing"],
  "Industrial Supplies": ["industrialsuppl", "fastener", "bearing", "industrialhardware"],
  "Computer Hardware & Software": ["comput", "softwar", "it", "hardware", "laptop", "server"],
  "Energy & Power": ["energy", "power", "solar", "battery", "generator", "inverter"],
  "Furniture": ["furniture", "chair", "table", "desk", "officefurniture"],
  "Home Textiles & Furnishings": ["hometextil", "furnishing", "curtain", "bedsheet", "linen", "cushion"],
  "Hotel Supplies & Equipment": ["hotelsuppl", "hotelequip", "hospitality", "crockery", "cutlery"],
  "Jewelry & Gemstones": ["jewel", "gemstone", "diamond", "gold", "silver", "ornament"],
  "Leather & Leather Products": ["leather", "footwear", "shoe", "boot", "belt", "wallet"],
  "Machinery": ["machin", "plant", "tool"],
  "Mineral & Metals": ["mineral", "metal", "steel", "iron", "aluminum", "copper"],
  "Plastics & Products": ["plastic", "polymer", "pvc"],
  "Printing & Publishing": ["print", "publish", "book"],
  "Security & Protection": ["secur", "cctv", "surveillance", "fireprotection", "alarm"],
  "Sports & Entertainment": ["sport", "entertainment", "fitness", "gym"],
  "Telecommunications": ["telecom", "broadband", "fiber"],
  "Textiles & Fabrics": ["textil", "fabric", "yarn", "cotton", "silk"],
  "Toys": ["toy", "babytoy"],
  "Transportation": ["transport", "logistics", "cargo", "freight"],
  "Brass Hardware & Components": ["brass", "brasshardware"],
  "Environment & Pollution": ["environ", "pollution", "recycling"],
  "Office & School Supplies": ["office", "school", "stationery", "pen", "notebook"],
  "Scientific & Laboratory Instruments": ["scientif", "laborat", "microscope"],
  "Business Services": ["businessservice", "consulting", "consultancy", "accounting", "legal"]
};

function checkCategoryPair(normA, normB) {
  if (!normA || !normB) return false;
  if (normA === normB) return true;

  // Specific domain exclusions:
  // 1. "Packaging & Paper" must never match food/beverage or packaged foods
  const isPackagingSide = normA.includes("packaging") || normB.includes("packaging") || normA.includes("paper") || normB.includes("paper");
  const isFoodSide = normA.includes("food") || normB.includes("food") || normA.includes("beverag") || normB.includes("beverag") || normA.includes("snack") || normB.includes("snack") || normA.includes("namkeen") || normB.includes("namkeen") || normA.includes("packagedfood") || normB.includes("packagedfood");
  if (isPackagingSide && isFoodSide) {
    return false;
  }

  // 2. "Consumer Electronics" must never match "Automobile" (which ends in "mobile")
  const isConsumerElectrSide = normA.includes("consumerelectronic") || normB.includes("consumerelectronic") || normA.includes("appliance") || normB.includes("appliance");
  const isAutoSide = normA.includes("automobile") || normB.includes("automobile") || normA.includes("vehicle") || normB.includes("vehicle") || normA.includes("lubricant") || normB.includes("lubricant");
  if (isConsumerElectrSide && isAutoSide) {
    return false;
  }

  // 3. "Home Supplies" vs "Home Textiles"
  const isHomeSupplies = normA.includes("homesuppl") || normB.includes("homesuppl") || normA.includes("cleaning") || normB.includes("cleaning");
  const isHomeTextiles = normA.includes("textil") || normB.includes("textil") || normA.includes("bedsheet") || normB.includes("bedsheet");
  if (isHomeSupplies && isHomeTextiles) {
    return false;
  }

  // Check matching against standard category keyword lists
  for (const [catName, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const catNorm = normalizeCategory(catName);
    const sideIsCatA = normA === catNorm || normA.includes(catNorm);
    const sideIsCatB = normB === catNorm || normB.includes(catNorm);

    if (sideIsCatA) {
      for (const kw of keywords) {
        if (normB.includes(kw)) return true;
      }
    }
    if (sideIsCatB) {
      for (const kw of keywords) {
        if (normA.includes(kw)) return true;
      }
    }
  }

  // Substring matching for specific category names (>= 5 characters)
  if (normA.length >= 5 && normB.length >= 5) {
    if (normA.includes(normB) || normB.includes(normA)) {
      return true;
    }
  }

  return false;
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
