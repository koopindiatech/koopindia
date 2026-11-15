import SEOContent from "./SEOContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Services Company in Delhi NCR | Top Google Rankings",
  provider: {
    "@type": "LocalBusiness",
    name: "Koop India",
    url: "https://www.koopindia.com",
    logo: "https://www.koopindia.com/koopindia-logo.png",
    telephone: "+91-9599826131",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Delhi NCR",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    areaServed: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad", "Mumbai", "Bangalore", "Pune", "Hyderabad"],
  },
  serviceType: [
    "Technical SEO & Schema Optimization",
    "Local SEO & Google Maps 3-Pack Ranking",
    "On-Page SEO & Content Strategy",
    "E-Commerce SEO & Core Web Vitals",
    "High-Authority Backlink Acquisition",
    "Google Search Console Penalty Recovery",
  ],
  description:
    "Data-driven SEO agency in Delhi NCR delivering proven Google Top 5 organic rankings, qualified business leads, and sustainable search traffic.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/seo-services",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.koopindia.com" },
    { "@type": "ListItem", position: 2, name: "Tech Solutions", item: "https://www.koopindia.com/tech-solutions" },
    { "@type": "ListItem", position: 3, name: "SEO Services", item: "https://www.koopindia.com/seo-services" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Koop India",
  url: "https://www.koopindia.com",
  logo: "https://www.koopindia.com/koopindia-logo.png",
  sameAs: [
    "https://www.facebook.com/koopindia",
    "https://www.instagram.com/koopindia",
    "https://www.linkedin.com/company/koopindia",
    "https://twitter.com/koopindia",
    "https://www.youtube.com/@koopindia",
  ],
};

export const metadata = {
  title: "SEO Services Company in Delhi NCR | Top Google Rankings | Koop India",
  description:
    "Top-rated SEO Services Company in Delhi NCR. Technical SEO, Google Maps 3-Pack, high-authority link building & keyword ranking to dominate Google Top 5. Free Audit!",
  keywords:
    "seo company in delhi, seo services delhi ncr, local seo consultant delhi, technical seo agency india, e-commerce seo services, google ranking expert delhi, website seo audit delhi",
  alternates: {
    canonical: "https://www.koopindia.com/seo-services",
  },
  openGraph: {
    title: "SEO Services Company in Delhi NCR | Koop India",
    description: "Rank in Google Top 5 with data-driven SEO strategies, technical audits & local map dominance.",
    url: "https://www.koopindia.com/seo-services",
    type: "website",
    images: [{ url: "https://www.koopindia.com/koopindia-logo.png", width: 800, height: 600, alt: "Koop India – SEO Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services Company in Delhi NCR | Koop India",
    description: "Proven SEO services to get your business in Google Top 5. Technical SEO & Local Search experts.",
    images: ["https://www.koopindia.com/koopindia-logo.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <SEOContent />
    </>
  );
}
