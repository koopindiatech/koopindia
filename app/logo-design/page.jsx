import LogoDesignContent from "./LogoDesignContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Professional Logo Design & Brand Identity Services in Delhi NCR",
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
    "Custom Logo Design & Trademark-Ready Vector Files",
    "Complete Brand Style Guides & Color Palettes",
    "Business Stationery (Visiting Cards, Letterheads, Envelopes)",
    "Packaging & Product Label Design",
    "Social Media Branding Kits",
    "Company Profiles & Pitch Decks",
  ],
  description:
    "Award-winning logo design & branding studio in Delhi NCR. 100% original, copyright-transferred brand identity design crafted to stand out.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/logo-design",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.koopindia.com" },
    { "@type": "ListItem", position: 2, name: "Digital Marketing", item: "https://www.koopindia.com/digital-marketing" },
    { "@type": "ListItem", position: 3, name: "Logo Design", item: "https://www.koopindia.com/logo-design" },
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
  title: "Professional Logo Design Company in Delhi NCR | Branding | Koop India",
  description:
    "Need a unique, trademark-ready logo? Koop India provides creative logo design & brand identity services in Delhi NCR. 100% original designs & full copyright ownership.",
  keywords:
    "logo design company in delhi, professional logo designer delhi ncr, brand identity design, custom business logo, corporate branding agency delhi, trademark logo design",
  alternates: {
    canonical: "https://www.koopindia.com/logo-design",
  },
  openGraph: {
    title: "Professional Logo Design & Brand Identity | Koop India",
    description: "Get unforgettable, trademark-ready logos & brand assets designed by experts with full IP ownership.",
    url: "https://www.koopindia.com/logo-design",
    type: "website",
    images: [{ url: "https://www.koopindia.com/koopindia-logo.png", width: 800, height: 600, alt: "Koop India – Logo Design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logo Design Company in Delhi NCR | Koop India",
    description: "Memorable logo design & branding for ambitious startups and businesses. Vector files & complete copyright.",
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
      <LogoDesignContent />
    </>
  );
}
