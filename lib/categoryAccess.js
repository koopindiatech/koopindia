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

/**
 * Extracts all relevant category tokens from a Seller object
 */
export function extractSellerCategories(seller) {
  if (!seller) return [];
  const set = new Set();

  if (seller.category && typeof seller.category === "string") {
    set.add(seller.category.trim());
  }
  if (seller.subcategory && typeof seller.subcategory === "string") {
    set.add(seller.subcategory.trim());
  }

  // productCategories: [{ id, name }, ...] or ['Spices', ...]
  if (Array.isArray(seller.productCategories)) {
    seller.productCategories.forEach((c) => {
      if (typeof c === "string" && c.trim()) set.add(c.trim());
      else if (c && typeof c.name === "string" && c.name.trim()) set.add(c.name.trim());
    });
  }

  // products: [{ name, categoryId, category }, ...]
  if (Array.isArray(seller.products)) {
    seller.products.forEach((p) => {
      if (p?.category && typeof p.category === "string" && p.category.trim()) set.add(p.category.trim());
      if (p?.name && typeof p.name === "string" && p.name.trim()) set.add(p.name.trim());
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
    set.add(buyer.category.trim());
  }

  if (Array.isArray(buyer.productCategories)) {
    buyer.productCategories.forEach((c) => {
      if (typeof c === "string" && c.trim()) set.add(c.trim());
      else if (c && typeof c.name === "string" && c.name.trim()) set.add(c.name.trim());
      else if (c && typeof c.label === "string" && c.label.trim()) set.add(c.label.trim());
    });
  }

  if (typeof buyer.productCategoryText === "string" && buyer.productCategoryText.trim()) {
    buyer.productCategoryText.split(/[,;\n]+/).forEach((item) => {
      if (item.trim()) set.add(item.trim());
    });
  }

  return Array.from(set).filter(Boolean);
}

/**
 * Check if any category from listA matches any category from listB
 */
export function isCategoryMatch(listA = [], listB = []) {
  const normA = listA.map(normalizeCategory).filter(Boolean);
  const normB = listB.map(normalizeCategory).filter(Boolean);

  if (normA.length === 0 || normB.length === 0) return false;

  const ROOT_KEYWORDS = [
    "food", "beverag", "health", "beaut", "pharma", "apparel", "fashion",
    "chemic", "home", "household", "construct", "consturct", "electr", "agri",
    "auto", "packag", "hospit", "medic", "gift", "craft", "pipe", "tube",
    "industr", "comput", "softwar", "energy", "power", "furnit", "textil",
    "hotel", "jewel", "leather", "machin", "metal", "mineral", "plastic",
    "print", "secur", "sport", "telecom", "toy", "transport", "brass",
    "environ", "offic", "scientif", "business", "fmcg", "ayurved", "grocer", "snack"
  ];

  for (const a of normA) {
    for (const b of normB) {
      if (a === b) return true;
      // Substring match for tokens of meaningful length (>= 4 characters)
      if (a.length >= 4 && b.length >= 4 && (a.includes(b) || b.includes(a))) {
        return true;
      }
      // Root keyword matching (handles typos like 'consturction' & plurals like 'beverages')
      for (const kw of ROOT_KEYWORDS) {
        if (a.includes(kw) && b.includes(kw)) {
          return true;
        }
      }
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

/**
 * Robust State matcher
 */
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
