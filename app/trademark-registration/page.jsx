import TrademarkContent from "./TrademarkContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Trademark Registration Consultant in Delhi | Brand & Logo Protection India",
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
    "Trademark Registration Consultant in Delhi",
    "Online Trademark Filing India",
    "Brand Name Registration",
    "Logo Trademark Registration",
    "Trademark Objection Reply",
    "Trademark Hearing & Opposition Support",
    "NICE Class Classification",
    "Trademark Renewal & Watch Service",
  ],
  description:
    "Expert Trademark Registration Consultant in Delhi NCR & pan-India. Fast online TM-A filing in 24 hours. Start using ™ symbol from Day 1. Comprehensive search, class guidance, objection handling & ® certificate issuance.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/trademark-registration",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Trademark Registration Services Delhi",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "New Trademark Registration Delhi – Form TM-A",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Trademark Search & Availability Report Delhi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trademark Objection Reply & Hearing Delhi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MSME / Startup 50% Rebate TM Filing Delhi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trademark Renewal – Form TM-R Delhi",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Trademark Registration and who should apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trademark Registration is the legal process of protecting your brand name, logo, tagline, or any unique identifier under the Trade Marks Act, 1999 in India. Any individual, startup, company, LLP, or partnership firm that wants exclusive legal rights over their brand identity should apply.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ™ and ® symbols?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "™ (TM) symbol can be used as soon as you file your trademark application—it indicates a pending trademark. ® (Registered) symbol can only be used after your trademark is officially registered and a registration certificate is issued.",
      },
    },
    {
      "@type": "Question",
      name: "How long does Trademark Registration take in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The application can be filed within 1–2 working days. Complete registration typically takes 8–18 months subject to examination and journal publication. You can legally use the ™ symbol from the filing date.",
      },
    },
    {
      "@type": "Question",
      name: "What are Trademark Classes and how do I choose the right one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trademarks are registered under 45 classes—Classes 1–34 cover goods and Classes 35–45 cover services. Choosing the correct class is critical because protection is class-specific.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my Trademark Application gets an Objection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After examination, the Trademark Office may issue an Examination Report. You must file a legal reply within 30 days. Koop India's attorneys draft strong legal replies and represent you in hearings.",
      },
    },
    {
      "@type": "Question",
      name: "Can two businesses have the same Trademark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally no, if they are in the same or similar class. Identical marks may coexist only if they are in completely unrelated classes with zero likelihood of confusion.",
      },
    },
    {
      "@type": "Question",
      name: "Is Trademark Registration valid across all of India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A trademark registered in India gives nationwide legal protection under The Trade Marks Act, 1999.",
      },
    },
    {
      "@type": "Question",
      name: "How long is a Trademark valid and how do I renew it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A registered trademark is valid for 10 years from the date of filing. It can be renewed indefinitely every 10 years by filing Form TM-R.",
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
      name: "Documentation & Compliance",
      item: "https://www.koopindia.com/documentation-compliance",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Trademark Registration Consultant Delhi",
      item: "https://www.koopindia.com/trademark-registration",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Koop India - Trademark Registration Consultant Delhi",
  description:
    "Top Trademark Registration Consultant in Delhi offering trademark search, Form TM-A online filing, objection replies, hearing representation, and ® certificate services.",
  url: "https://www.koopindia.com/trademark-registration",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "890",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/koopindia",
    "https://www.instagram.com/koopindia",
    "https://www.linkedin.com/company/koopindia",
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Register a Trademark Online in India",
  description: "Complete procedure to protect your brand name, logo, or tagline with Form TM-A online filing through Koop India.",
  totalTime: "P1D",
  step: [
    {
      "@type": "HowToStep",
      name: "Comprehensive Public Trademark Search",
      text: "Conduct an in-depth phonetic and visual search on IP India database to check similarity under Section 9 & 11 of the Trade Marks Act.",
    },
    {
      "@type": "HowToStep",
      name: "Class Selection & Document Preparation",
      text: "Identify relevant NICE classification (Classes 1–45), prepare Applicant details, logo graphics, and sign Form TM-48 (Power of Attorney).",
    },
    {
      "@type": "HowToStep",
      name: "Online Filing of Form TM-A & Legal ™ Use",
      text: "Submit electronic application on ipindiaonline.gov.in. Instant application number is generated, allowing immediate legal use of the ™ symbol.",
    },
    {
      "@type": "HowToStep",
      name: "Examination, Publication & ® Certificate",
      text: "Trademark examiner reviews the file. Once accepted, it is published in the Trademark Journal for 4 months. If unopposed, the official ® Registration Certificate is issued.",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Koop India",
  url: "https://www.koopindia.com",
  logo: "https://www.koopindia.com/koopindia-logo.png",
  description: "Koop India — Delhi NCR's leading business services company for Trademark Registration, GST Registration, Website Development & Digital Marketing.",
  telephone: "+91-9891233311",
  email: "info@koopindia.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/koopindia",
    "https://www.instagram.com/koopindia",
    "https://www.linkedin.com/company/koopindia",
    "https://twitter.com/koopindia",
    "https://www.youtube.com/@koopindia",
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Trademark Registration Services by Koop India Delhi",
  description: "Complete trademark and IP protection services offered by Koop India in Delhi NCR and pan-India",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Trademark Search & Availability Report",
      url: "https://www.koopindia.com/trademark-registration",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Online Trademark Filing – Form TM-A (24 hrs)",
      url: "https://www.koopindia.com/trademark-registration",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Trademark Objection Reply & Hearing",
      url: "https://www.koopindia.com/trademark-registration",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Trademark Renewal – Form TM-R",
      url: "https://www.koopindia.com/trademark-registration",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "MSME / Startup 50% Rebate TM Filing",
      url: "https://www.koopindia.com/trademark-registration",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "International Trademark – Madrid Protocol",
      url: "https://www.koopindia.com/trademark-registration",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Trademark Registration Consultant in Delhi | Koop India",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".sr-only", "h1", "h2"],
  },
  url: "https://www.koopindia.com/trademark-registration",
};

// SEO Metadata Configuration
export const metadata = {
  title:
    "Trademark Registration Consultant in Delhi | Online TM Filing | Koop India",
  description:
    "Expert Trademark Registration Consultant in Delhi. Online TM-A filing in 24 hrs. Free brand search, MSME 50% rebate, objection handling & ® certificate. Call now!",
  keywords:
    "trademark registration consultant in delhi, trademark registration in delhi, online trademark registration delhi, trademark filing delhi, trademark consultant near me delhi, brand registration delhi, logo trademark registration delhi ncr, trademark search delhi, trademark objection reply delhi, tm-a filing delhi, trademark certificate consultant delhi, trademark registration for startups delhi, msme trademark registration delhi, trademark classes india, trademark registration noida, trademark consultant gurugram, trademark registration faridabad, trademark registration ghaziabad, how to register trademark in delhi, trademark registration near me, ip india trademark filing delhi, trade marks registry delhi, trademark registration 2025 india",
  alternates: {
    canonical: "https://www.koopindia.com/trademark-registration",
  },
  openGraph: {
    title:
      "Trademark Registration Consultant in Delhi | Online TM Filing | Koop India",
    description:
      "Protect your brand name, logo & slogan legally with Koop India. Free trademark search, Form TM-A filing in 24 hours & end-to-end IP protection.",
    url: "https://www.koopindia.com/trademark-registration",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/koopindia-logo.png",
        width: 800,
        height: 600,
        alt: "Koop India – Trademark Registration Consultant Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Registration Consultant in Delhi | Koop India",
    description:
      "Online Trademark Registration in Delhi & Pan-India. Free TM search, TM-A filing in 24 hours, objection handling & ® certificate support.",
    images: ["https://www.koopindia.com/koopindia-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function Page() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* Hidden SEO H1 – crawlable, Delhi-targeted */}
      <h1 className="sr-only">
        Trademark Registration Consultant in Delhi – Online Brand, Logo & Trademark Filing in Delhi NCR | Koop India
      </h1>

      <TrademarkContent />
    </>
  );
}

