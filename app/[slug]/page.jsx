import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SellerClientPage from "./SellerClientPage";

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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  try {
    const q = query(collection(db, "sellers"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const data = snap.docs[0].data();
      return {
        title: `${data.companyName} | Koop India B2B Marketplace`,
        description: data.aboutText || `Check out ${data.companyName} on Koop India. Connect for B2B trade, distributorship, and wholesale inquiries.`,
        openGraph: {
          title: data.companyName,
          description: data.aboutText,
          images: data.logoUrl ? [data.logoUrl] : [],
        }
      };
    }
  } catch (error) {}
  
  return { title: 'Seller Profile | Koop India' };
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
        heroBanners: (Array.isArray(data.heroBanners) ? data.heroBanners : []).map((b) =>
          typeof b === "object" ? { ...b, url: proxyUrl(b.url || b.imageUrl) } : proxyUrl(b)
        ),
        products: (Array.isArray(data.products) ? data.products : []).map((p) => ({ ...p, imageUrl: proxyUrl(p.imageUrl) })),
        certifications: (Array.isArray(data.certifications) ? data.certifications : []).map((c) => ({ ...c, imageUrl: proxyUrl(c.imageUrl) })),
        infrastructure: (Array.isArray(data.infrastructure) ? data.infrastructure : []).map((i) => ({ ...i, imageUrl: proxyUrl(i.imageUrl) })),
      };

      initialSeller = serialize(raw);
    }
  } catch (error) {
    console.error("Error fetching seller:", error);
  }

  return <SellerClientPage initialSeller={initialSeller} />;
}
