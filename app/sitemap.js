import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CITIES_LIST } from "@/lib/companyRegistrationCities";
import { FSSAI_CITIES_LIST } from "@/lib/fssaiRegistrationCities";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://www.koopindia.com";
  const lastModified = new Date("2026-11-26T00:00:00.000Z");

  let blogEntries = [];
  try {
    const snap = await Promise.race([
      getDocs(collection(db, "blogs")),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3500)),
    ]);
    blogEntries = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((b) => {
        if (!b.title && !b.seo?.metaTitle) return false;
        if (b.status && String(b.status).toLowerCase() === "draft") return false;
        return true;
      })
      .map((b) => ({
        url: `${baseUrl}/blog/${b.slug || b.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
      }));
  } catch {
    blogEntries = [];
  }

  const cityEntries = CITIES_LIST.map((c) => ({
    url: `${baseUrl}/company-registration/${c.slug}`,
    lastModified: new Date("2026-11-26T00:00:00.000Z"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const fssaiCityEntries = FSSAI_CITIES_LIST.map((c) => ({
    url: `${baseUrl}/fssai-registration/${c.slug}`,
    lastModified: new Date("2026-11-26T00:00:00.000Z"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [

    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contactus`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/term-services`,
      lastModified,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/buyers`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/distributors`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/website-development`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/custom-website-development`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/crm-development`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seo-services`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/startup-consulting/business`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/appoint-distributors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sellers`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/buyers`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seller-buyer-registration`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/franchise-model`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/market-analysis`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-consulting/product-valuation`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/documentation-compliance/company-registration-services`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gst-registration`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/documentation-compliance/fssai-license`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iso-certification`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/startup-india-registration`,
      lastModified,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/documentation-compliance/company-accounting`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentation-compliance/tax-compliance`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trademark-registration`,
      lastModified,
      priority: 0.9,
    },

    {
      url: `${baseUrl}/social-media-marketing`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-marketing/gmb`,
      lastModified,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/logo-design`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-marketing/content-writing`,
      lastModified,
      priority: 0.75,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.75,
    },
    ...cityEntries,
    ...fssaiCityEntries,
    ...blogEntries,
  ];
}
