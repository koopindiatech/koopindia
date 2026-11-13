// Structured Data Schemas for Original SEO Website Development Page
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development Services in Delhi | Custom Web Design & E-Commerce",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.209,
    },
    areaServed: [
      "Delhi", "New Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad",
      "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Jaipur", "Lucknow", "Kolkata"
    ],
  },
  serviceType: [
    "Website Development Services in Delhi",
    "Custom Website Design",
    "E-commerce Website Development",
    "Corporate & Business Websites",
    "Startup Website Solutions",
    "CRM & WhatsApp API Integration",
    "On-Page SEO & Core Web Vitals Optimization",
    "Responsive Mobile Web Design",
  ],
  description:
    "Professional Website Development Services in Delhi NCR & pan-India. High-performance, SEO-optimized business websites, e-commerce stores, and custom web portals built for startups and growing enterprises.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/website-development",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does website development take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timeline varies by project scope: Business websites (7-14 days), E-commerce (15-30 days), Custom solutions (30-60 days). We provide a clear timeline after requirement analysis.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO with website development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All our websites include on-page SEO optimization, fast loading structure, mobile responsiveness, and schema markup to help you rank better on search engines.",
      },
    },
    {
      "@type": "Question",
      name: "Can you integrate CRM or WhatsApp with my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We integrate popular CRMs (HubSpot, Zoho, Salesforce), WhatsApp Business API, payment gateways, and any third-party tools you need.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide post-launch support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer comprehensive post-launch support including security updates, performance monitoring, content updates, and growth consulting.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.koopindia.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tech Solutions",
      item: "https://www.koopindia.com/tech-solutions",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Website Development Services",
      item: "https://www.koopindia.com/tech-solutions/website-development",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Koop India - Website Development Services Delhi",
  description:
    "Leading Website Development Company in Delhi providing custom business website design, e-commerce development, and CRM integrated web solutions.",
  url: "https://www.koopindia.com/tech-solutions/website-development",
  logo: "https://www.koopindia.com/koopindia-logo.png",
  telephone: "+91-9891233311",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.6139,
    longitude: 77.209,
  },
  areaServed: [
    "Delhi", "New Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad",
    "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Jaipur", "Lucknow", "Kolkata"
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "780",
    bestRating: "5",
    worstRating: "1",
  },
};

// SEO Metadata Configuration
export const metadata = {
  title:
    "Website Development Services in Delhi | Custom Web Design & E-Commerce | Koop India",
  description:
    "Looking for top Website Development Services in Delhi? Koop India builds high-performance, SEO-friendly websites for startups & MSMEs. Custom web design, e-commerce, CRM integration & mobile-ready development. Get a free quote today!",
  keywords:
    "website development services in delhi, website development company in delhi, web development company delhi ncr, website design company delhi, custom website development india, ecommerce website development delhi, business website design delhi, startup website development, responsive web design delhi, crm integrated website, seo friendly website development, koop india web services",
  alternates: {
    canonical: "https://www.koopindia.com/website-development",
  },
  openGraph: {
    title:
      "Website Development Services in Delhi | Koop India",
    description:
      "High-converting, SEO-optimized websites built for growth. Business sites, e-commerce & custom solutions with expert support.",
    url: "https://www.koopindia.com/website-development",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/koopindia-logo.png",
        width: 800,
        height: 600,
        alt: "Koop India – Website Development Services Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Services in Delhi | Koop India",
    description:
      "Build a powerful digital presence with conversion-focused, SEO-friendly websites. Free consultation available.",
    images: ["https://www.koopindia.com/koopindia-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function WebsiteDevelopmentTechLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hidden SEO H1 – crawlable, city-targeted */}
      <h1 className="sr-only">
        Website Development Services in Delhi – Custom Web Design & E-Commerce Development | Koop India
      </h1>

      {children}
    </>
  );
}

