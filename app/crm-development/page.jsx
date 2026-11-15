import CRMContent from "./CRMContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom CRM Development Services in Delhi NCR & India",
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
    "Custom CRM Software Development",
    "Lead Management Automation",
    "WhatsApp Business API Integration",
    "Sales Pipeline Tracking",
    "Multi-Branch Dealer Portals",
    "Zoho & HubSpot Custom Workflows",
  ],
  description:
    "Tailored CRM software development for startups, B2B enterprises & manufacturers. Zero monthly SaaS fees, full source code ownership & instant WhatsApp lead sync.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/crm-development",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.koopindia.com" },
    { "@type": "ListItem", position: 2, name: "Tech Solutions", item: "https://www.koopindia.com/tech-solutions" },
    { "@type": "ListItem", position: 3, name: "CRM Development", item: "https://www.koopindia.com/crm-development" },
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
  title: "Custom CRM Development Company in Delhi NCR | Lead Automation | Koop India",
  description:
    "Looking for Custom CRM Development in Delhi NCR? Koop India builds tailored CRM systems with WhatsApp lead automation, zero SaaS fees & 100% source code ownership. Contact us!",
  keywords:
    "custom crm development delhi, crm software company delhi ncr, lead management system, b2b crm development, whatsapp crm integration, real estate crm delhi, custom sales pipeline software",
  alternates: {
    canonical: "https://www.koopindia.com/crm-development",
  },
  openGraph: {
    title: "Custom CRM Development Services | Koop India",
    description: "Automate leads & sales pipeline with bespoke CRM development. Zero per-seat monthly license fees.",
    url: "https://www.koopindia.com/crm-development",
    type: "website",
    images: [{ url: "https://www.koopindia.com/koopindia-logo.png", width: 800, height: 600, alt: "Koop India – CRM Development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom CRM Development Company Delhi | Koop India",
    description: "Bespoke CRM software solutions for growing businesses. WhatsApp lead sync & full IP ownership.",
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
      <CRMContent />
    </>
  );
}
