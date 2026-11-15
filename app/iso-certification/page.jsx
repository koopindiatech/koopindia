import ISOContent from "./ISOContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ISO Certification Consultant in Delhi NCR & India",
  provider: {
    "@type": "LocalBusiness",
    name: "Koop India",
    url: "https://www.koopindia.com",
    logo: "https://www.koopindia.com/koopindia-logo.png",
    telephone: "+91-9891233311",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Delhi NCR",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    areaServed: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad", "Mumbai", "Bangalore", "Pune", "Jaipur"],
  },
  serviceType: [
    "ISO 9001:2015 Quality Management",
    "ISO 14001:2015 Environmental Management",
    "ISO 27001 Information Security",
    "ISO 22000 Food Safety Management",
    "ISO 45001 Occupational Health & Safety",
    "ISO 13485 Medical Devices",
  ],
  description:
    "Fast online ISO certification services in Delhi NCR. Get ISO 9001, 14001, 27001, 22000 certificates in 7–10 days with expert audit support.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/iso-certification",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.koopindia.com" },
    { "@type": "ListItem", position: 2, name: "Documentation & Compliance", item: "https://www.koopindia.com/documentation-compliance" },
    { "@type": "ListItem", position: 3, name: "ISO Certification", item: "https://www.koopindia.com/iso-certification" },
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
  title: "ISO Certification Consultant in Delhi NCR | Online ISO 9001, 14001 | Koop India",
  description:
    "Get ISO Certification in Delhi NCR in 7–10 days. ISO 9001, 14001, 27001, 22000 & 45001 certification with expert audit guidance & 100% online process. Call now!",
  keywords:
    "iso certification in delhi, iso certification consultant delhi, online iso certification india, iso 9001 certification delhi, iso 14001 consultant, iso 27001 certification, iso certification for tenders, iso certificate cost delhi, iso certification body india",
  alternates: {
    canonical: "https://www.koopindia.com/iso-certification",
  },
  openGraph: {
    title: "ISO Certification Consultant in Delhi NCR | Koop India",
    description: "Fast, hassle-free online ISO certification in 7–10 days. ISO 9001, 14001, 27001 with audit support.",
    url: "https://www.koopindia.com/iso-certification",
    type: "website",
    images: [{ url: "https://www.koopindia.com/koopindia-logo.png", width: 800, height: 600, alt: "Koop India – ISO Certification" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISO Certification Consultant in Delhi NCR | Koop India",
    description: "Online ISO certification in 7–10 days. ISO 9001, 14001, 27001 & more with audit guidance.",
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
      <ISOContent />
    </>
  );
}
