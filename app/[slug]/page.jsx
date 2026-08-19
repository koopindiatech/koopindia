import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SellerClientPage from "./SellerClientPage";

// Recursively convert Firestore Timestamps and non-serializable values to plain JS
function serialize(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  // Firestore Timestamp has seconds + nanoseconds
  if (typeof obj.toMillis === "function") return obj.toMillis();
  if (Array.isArray(obj)) return obj.map(serialize);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, serialize(v)])
  );
}

export default async function SellerPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let initialSeller = null;

  try {
    const q = query(collection(db, "sellers"), where("slug", "==", slug));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const d = snap.docs[0];
      const data = d.data();

      const proxyUrl = (u) =>
        u && typeof u === "string" && u.startsWith("http") && u.includes("firebase")
          ? `/api/img?url=${encodeURIComponent(u)}`
          : u;

      const raw = {
        id: d.id,
        ...data,
        logoUrl: proxyUrl(data.logoUrl),
        heroBannerUrl: proxyUrl(data.heroBannerUrl),
        bannerUrl: proxyUrl(data.bannerUrl),
        aboutImageUrl: proxyUrl(data.aboutImageUrl),
        contactBannerUrl: proxyUrl(data.contactBannerUrl),
        heroBanners: (data.heroBanners || []).map((b) =>
          typeof b === "object" ? { ...b, url: proxyUrl(b.url || b.imageUrl) } : proxyUrl(b)
        ),
        products: (data.products || []).map((p) => ({ ...p, imageUrl: proxyUrl(p.imageUrl) })),
        certifications: (data.certifications || []).map((c) => ({ ...c, imageUrl: proxyUrl(c.imageUrl) })),
        infrastructure: (data.infrastructure || []).map((i) => ({ ...i, imageUrl: proxyUrl(i.imageUrl) })),
      };

      // Serialize to strip Firestore Timestamps and other non-plain objects
      initialSeller = serialize(raw);
    }
  } catch (error) {
    console.error("Error fetching seller:", error);
  }

  return <SellerClientPage initialSeller={initialSeller} />;
}
