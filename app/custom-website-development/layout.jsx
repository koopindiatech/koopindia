// Custom Website Development Layout (Google Ads & High-Conversion Landing Page)
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Website Development Services | Next.js, Shopify & WordPress",
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
    "Custom Website Development",
    "E-commerce Store Development",
    "Shopify Website Development",
    "WordPress Website Development",
    "Google Ads High-Converting Landing Pages",
    "CRM & WhatsApp API Integration",
  ],
  description:
    "Fast, conversion-focused custom website development. Modern tech stack (Next.js, Shopify, WordPress), 100% source code ownership, delivered in 3-5 days with 24/7 support.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/custom-website-development",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you deliver my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For landing pages, delivery is in 3 to 5 business days. Full corporate sites take 5 to 8 days, and e-commerce portals take 10 to 18 days.",
      },
    },
    {
      "@type": "Question",
      name: "Do I get full ownership of source code and design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you own 100% of the source code, design assets, and content with zero proprietary lock-ins.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support Shopify and WordPress development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We specialize in custom Next.js web applications, high-converting Shopify stores, and modern headless WordPress setups.",
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
      name: "Custom Website Development",
      item: "https://www.koopindia.com/custom-website-development",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Koop India - Custom Website Development",
  description:
    "High-converting custom web design, Shopify & WordPress solutions built for growth.",
  url: "https://www.koopindia.com/custom-website-development",
  logo: "https://www.koopindia.com/koopindia-logo.png",
  telephone: "+91-9599826131",
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
    reviewCount: "640",
    bestRating: "5",
    worstRating: "1",
  },
};

// SEO & Google Ads Landing Page Quality Score Configuration
export const metadata = {
  title:
    "Custom Website Development Services | Shopify, WordPress & Next.js Experts | Koop India",
  description:
    "Get custom website development for your business in 3-5 days. Fast loading, green Core Web Vitals, CRM & WhatsApp integration, 100% source code ownership. Free consultation & project quote!",
  keywords:
    "custom website development, shopify website development, wordpress website development india, custom web design company, business website packages, ecommerce web development, next js website development, landing page design, fast website development india",
  alternates: {
    canonical: "https://www.koopindia.com/custom-website-development",
  },
  openGraph: {
    title: "Custom Website Development Services | Koop India",
    description:
      "High-converting, lightning-fast business websites & e-commerce stores with 100% code ownership.",
    url: "https://www.koopindia.com/custom-website-development",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/koopindia-logo.png",
        width: 800,
        height: 600,
        alt: "Koop India – Custom Website Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Website Development Services | Koop India",
    description:
      "Fast business websites, Shopify stores & custom web apps. 100% ownership & 24/7 support.",
    images: ["https://www.koopindia.com/koopindia-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function CustomWebsiteDevelopmentLayout({ children }) {
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

      <h1 className="sr-only">
        Custom Website Development Services – Next.js, Shopify, WordPress & E-Commerce Web Solutions | Koop India
      </h1>

      {children}
    </>
  );
}

