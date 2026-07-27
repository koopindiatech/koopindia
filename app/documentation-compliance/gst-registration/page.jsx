import GSTContent from "./GSTContent";

/* ─────────────────────────────────────────────────────────────
   STRUCTURED DATA – Service + FAQPage + LocalBusiness
───────────────────────────────────────────────────────────── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "GST Registration Consultant in Delhi | Online GST Registration India",
  provider: {
    "@type": "LocalBusiness",
    name: "Koop India",
    url: "https://www.koopindia.com",
    logo: "https://www.koopindia.com/koopindia-logo.png",
    telephone: "+91-9891233311",
    email: "info@koopindia.com",
    priceRange: "₹₹",
    openingHours: ["Mo-Sa 09:00-19:00"],
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
      longitude: 77.2090,
    },
    hasMap: "https://maps.google.com/?q=New+Delhi,India",
    areaServed: [
      "Delhi", "New Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi",
      "Central Delhi", "Connaught Place", "Karol Bagh", "Saket", "Dwarka", "Rohini",
      "Lajpat Nagar", "Pitampura", "Janakpuri", "Vasant Kunj", "Nehru Place",
      "Noida", "Greater Noida", "Gurugram", "Gurgaon", "Faridabad", "Ghaziabad",
      "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune",
      "Jaipur", "Lucknow", "Ahmedabad", "Kolkata", "Chandigarh",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1240",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/koopindia",
      "https://www.linkedin.com/company/koopindia",
      "https://www.instagram.com/koopindia",
    ],
  },
  serviceType: [
    "GST Registration Consultant in Delhi",
    "GST Registration Consultant in Noida",
    "GST Registration Consultant in Gurugram",
    "Online GST Registration Delhi",
    "GST Number Registration Delhi",
    "GSTIN Registration India",
    "GST Registration for Small Business Delhi",
    "GST Registration for E-commerce Sellers",
    "GST Registration for Startups Delhi",
    "GST Compliance Services Delhi",
    "GST Return Filing Delhi",
  ],
  description:
    "Expert GST Registration Consultant in Delhi. 100% online GST registration in Delhi, Noida, Gurugram & pan-India. Get your GSTIN in 7–10 days. Error-free documentation, CA-supervised filing, post-registration compliance support. Starting ₹2,999.",
  offers: {
    "@type": "Offer",
    price: "2999",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-01",
    url: "https://www.koopindia.com/documentation-compliance/gst-registration",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is the best GST registration consultant in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Koop India is one of the most trusted GST registration consultants in Delhi, Noida, and Gurugram. We offer 100% online GST registration with CA-supervised filing, error-free documentation, and GSTIN delivery in 7–10 working days. Over 10,000 businesses registered pan-India.",
      },
    },
    {
      "@type": "Question",
      name: "How much does GST registration cost in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GST registration through the government portal (gst.gov.in) is free. Professional consultant fees in Delhi like Koop India start from ₹2,999 and include expert consultation, document verification, error-free filing, query handling, and GSTIN delivery.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get GST registration online from Delhi without visiting any office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GST registration in Delhi is 100% online through the GST portal. Koop India handles everything digitally — document collection, GST REG-01 filing, Aadhaar OTP authentication, and query responses. No physical visit required.",
      },
    },
    {
      "@type": "Question",
      name: "What is GST Registration and who needs it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GST Registration is mandatory for businesses with turnover above ₹40L (goods) or ₹20L (services). Also mandatory for e-commerce sellers, inter-state suppliers, and RCM-liable businesses regardless of turnover.",
      },
    },
    {
      "@type": "Question",
      name: "How long does GST registration take in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With correct documents, GST registration in Delhi takes 7–10 working days. Koop India ensures error-free submission to avoid delays.",
      },
    },
    {
      "@type": "Question",
      name: "What documents are required for GST registration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PAN Card, Aadhaar, business address proof, bank account proof, and entity-specific documents like Certificate of Incorporation, Partnership Deed, etc.",
      },
    },
    {
      "@type": "Question",
      name: "Is GST registration free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Filing on gst.gov.in is free. Professional service fees from consultants like Koop India cover expert assistance, documentation, and follow-up — saving time and avoiding costly errors.",
      },
    },
    {
      "@type": "Question",
      name: "What is GSTIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GSTIN is a unique 15-digit alphanumeric number assigned to every GST-registered taxpayer. First 2 digits are state code, next 10 are PAN, followed by entity number, 'Z', and a check digit.",
      },
    },
    {
      "@type": "Question",
      name: "Is Koop India a GST registration consultant in Noida and Gurugram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Koop India provides GST registration services in Noida, Gurugram, Ghaziabad, Faridabad, Greater Noida and all major cities across India. The entire process is 100% online — no office visit required.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   BREADCRUMB SCHEMA – Google SERP breadcrumbs
───────────────────────────────────────────────────────────── */
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
      name: "GST Registration Consultant in Delhi",
      item: "https://www.koopindia.com/documentation-compliance/gst-registration",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   METADATA – 20+ targeted keywords, city-specific H1 intent
───────────────────────────────────────────────────────────── */
export const metadata = {
  title:
    "GST Registration Consultant in Delhi 2025 | Get GSTIN in 7 Days | Koop India",
  description:
    "#1 GST registration consultant in Delhi 2025 — get your GSTIN in 7–10 working days. Koop India provides 100% online GST registration in Delhi, Noida, Gurugram & pan-India. CA-supervised, error-free filing. Starting ₹2,999. Free consultation. Also serving Connaught Place, Karol Bagh, Saket, Dwarka, Rohini.",
  keywords:
    "gst registration consultant in delhi, gst registration in delhi 2025, online gst registration delhi, gst number registration delhi, best gst consultant in delhi, gst registration near me delhi, gst registration noida, gst registration gurugram, gst registration gurgaon, gst registration faridabad, gst registration ghaziabad, gst registration consultant near me, gst registration fees in delhi, gstin registration delhi, how to get gst number in delhi, gst registration for small business delhi, gst registration for ecommerce sellers, gst registration for startups delhi, gst registration online india 2025, new gst registration india, gst registration documents required, gst registration procedure india, gst registration for proprietorship, gst registration for private limited company, gst registration for llp, composition scheme gst registration, voluntary gst registration india, gst consultant near me, gst registration connaught place, gst registration karol bagh, gst registration saket, gst registration dwarka, gst registration rohini",
  alternates: {
    canonical: "https://www.koopindia.com/documentation-compliance/gst-registration",
  },
  openGraph: {
    title:
      "GST Registration Consultant in Delhi 2025 | Get GSTIN in 7 Days | Koop India",
    description:
      "Trusted GST registration consultant in Delhi, Noida & Gurugram. 100% online GST registration, CA-supervised, error-free documentation, GSTIN in 7 days. Free consultation. Starting ₹2,999.",
    url: "https://www.koopindia.com/documentation-compliance/gst-registration",
    type: "website",
    locale: "en_IN",
    siteName: "Koop India",
    images: [
      {
        url: "https://www.koopindia.com/koopindia-logo.png",
        width: 1200,
        height: 630,
        alt: "Koop India – GST Registration Consultant Delhi 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Registration Consultant in Delhi 2025 | Koop India",
    description:
      "Get GSTIN in 7–10 working days. Expert GST registration consultant in Delhi, Noida, Gurugram & pan-India. Starting ₹2,999. 100% online. Call Koop India.",
    images: ["https://www.koopindia.com/koopindia-logo.png"],
    creator: "@KoopIndia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.6139;77.2090",
    "ICBM": "28.6139, 77.2090",
  },
};

export default function Page() {
  return (
    <>
      {/* Structured Data – Service + LocalBusiness + AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* FAQ Schema – Triggers Google FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* BreadcrumbList – Shows path in Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Primary H1 – Delhi-first, high-intent — visible & in hero section too */}
      <h1 className="sr-only">
        GST Registration Consultant in Delhi 2025 | Get GSTIN in 7 Days | Koop India
      </h1>

      <GSTContent />
    </>
  );
}
