import StartupIndiaContent from "./StartupIndiaContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Startup India Registration & DPIIT Recognition Consultant",
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
    areaServed: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad", "Mumbai", "Bangalore", "Pune", "Hyderabad"],
  },
  serviceType: [
    "DPIIT Recognition Certificate",
    "Section 80-IAC Tax Exemption",
    "Angel Tax Exemption (Section 56)",
    "Self-Certification under Labour & Environmental Laws",
    "50% Trademark Govt Fee Rebate",
    "Government Tender Preference without Turnover/Experience",
  ],
  description:
    "Get DPIIT Startup India Recognition & 3-year tax exemption benefits. Complete pitch deck & documentation guidance with 100% approval support.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/startup-india-registration",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.koopindia.com" },
    { "@type": "ListItem", position: 2, name: "Documentation & Compliance", item: "https://www.koopindia.com/documentation-compliance" },
    { "@type": "ListItem", position: 3, name: "Startup India Registration", item: "https://www.koopindia.com/startup-india-registration" },
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
  title: "Startup India Registration & DPIIT Certificate Consultant | Koop India",
  description:
    "Apply for Startup India Registration & DPIIT Recognition with Koop India. Unlock 80-IAC tax exemptions, angel tax relief, patent/TM subsidies & Govt tenders. Call now!",
  keywords:
    "startup india registration, dpiit recognition delhi, startup india certificate consultant, 80-iac tax exemption, startup tax holiday india, seed fund scheme eligibility, startup india portal filing, dpiit certificate online",
  alternates: {
    canonical: "https://www.koopindia.com/startup-india-registration",
  },
  openGraph: {
    title: "Startup India Registration & DPIIT Recognition | Koop India",
    description: "Get DPIIT Recognition & Startup Tax Exemption with Koop India. Fast online filing & 100% approval support.",
    url: "https://www.koopindia.com/startup-india-registration",
    type: "website",
    images: [{ url: "https://www.koopindia.com/koopindia-logo.png", width: 800, height: 600, alt: "Koop India – Startup India Registration" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup India Registration & DPIIT Certificate | Koop India",
    description: "Get DPIIT Startup India Certificate & Tax Exemptions. 100% online guidance by expert consultants.",
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
      <StartupIndiaContent />
    </>
  );
}
