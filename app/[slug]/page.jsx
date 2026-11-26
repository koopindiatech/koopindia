import { notFound } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SellerClientPage from "./SellerClientPage";

const ASSET_EXT_REGEX = /\.(png|jpe?g|gif|webp|svg|ico|css|js|map|json|xml|txt|php|html|env|woff2?|ttf)$/i;

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
  const { slug } = resolvedParams || {};

  if (!slug || ASSET_EXT_REGEX.test(slug)) {
    return {
      title: "Page Not Found | Koop India",
      robots: { index: false, follow: false },
    };
  }

  try {
    const q = query(collection(db, "sellers"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const data = snap.docs[0].data();
      return {
        title: `${data.companyName} | Koop India B2B Marketplace`,
        description: data.aboutText || `Check out ${data.companyName} on Koop India. Connect for B2B trade, distributorship, and wholesale inquiries.`,
        alternates: {
          canonical: `https://www.koopindia.com/${slug}`,
        },
        openGraph: {
          title: data.companyName,
          description: data.aboutText,
          images: data.logoUrl ? [data.logoUrl] : [],
        }
      };
    }
  } catch (error) {}

  return {
    title: "Seller Profile | Koop India",
    robots: { index: false, follow: false },
  };
}

export default async function SellerPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams || {};

  if (!slug || ASSET_EXT_REGEX.test(slug)) {
    notFound();
  }

  let initialSeller = null;
  let querySucceeded = false;

  try {
    const q = query(collection(db, "sellers"), where("slug", "==", slug));
    const snap = await getDocs(q);
    querySucceeded = true;

    if (!snap.empty) {
      const d = snap.docs[0];
      const data = d.data();

      const proxyUrl = (u, width = 800) =>
        u && typeof u === "string" && u.startsWith("http") && u.includes("firebase")
          ? `/api/img?url=${encodeURIComponent(u)}&w=${width}`
          : u;

      const raw = {
        id: d.id,
        ...data,
        logoUrl: proxyUrl(data.logoUrl, 280),
        heroBannerUrl: proxyUrl(data.heroBannerUrl, 1400),
        bannerUrl: proxyUrl(data.bannerUrl, 1400),
        aboutImageUrl: proxyUrl(data.aboutImageUrl, 800),
        contactBannerUrl: proxyUrl(data.contactBannerUrl, 1200),
        heroBanners: (Array.isArray(data.heroBanners) ? data.heroBanners : []).map((b) =>
          typeof b === "object" ? { ...b, url: proxyUrl(b.url || b.imageUrl, 1400) } : proxyUrl(b, 1400)
        ),
        products: (Array.isArray(data.products) ? data.products : []).map((p) => ({ ...p, imageUrl: proxyUrl(p.imageUrl, 450) })),
        certifications: (Array.isArray(data.certifications) ? data.certifications : []).map((c) => ({ ...c, imageUrl: proxyUrl(c.imageUrl, 240) })),
        infrastructure: (Array.isArray(data.infrastructure) ? data.infrastructure : []).map((i) => ({ ...i, imageUrl: proxyUrl(i.imageUrl, 600) })),
      };

      initialSeller = serialize(raw);
    }
  } catch (error) {
    console.error("Error fetching seller:", error);
  }

  if (querySucceeded && !initialSeller) {
    notFound();
  }

  return <SellerClientPage initialSeller={initialSeller} />;
}
