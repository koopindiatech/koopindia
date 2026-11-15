import GSTContent from "./GSTContent";

// Structured Data Schema (Service, FAQPage, LocalBusiness)
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "GST Registration Consultant in Delhi",
  provider: {
    "@type": "LocalBusiness",
    name: "Koop India",
    url: "https://www.koopindia.com",
    logo: "https://www.koopindia.com/koopindia-logo.png",
    telephone: "+91-9891233311",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    areaServed: [
      "Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad",
      "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune",
      "Jaipur", "Lucknow", "Ahmedabad", "Kolkata", "Chandigarh",
    ],
  },
  serviceType: "GST Registration",
  description:
    "Professional GST Registration Consultant in Delhi. Expert-assisted GSTIN in 7–10 days. 100% online, error-free documentation, post-registration compliance support.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/gst-registration",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
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
      name: "What documents are needed for GST registration in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Required documents: PAN Card, Aadhaar Card, business address proof (rent agreement or electricity bill with NOC), bank account details (cancelled cheque or bank statement), Certificate of Incorporation (for companies), and passport-size photograph of the authorized signatory.",
      },
    },
    {
      "@type": "Question",
      name: "Can I apply for GST registration online without visiting any GST office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GST registration is 100% online via gst.gov.in. Koop India handles the entire process digitally — document collection, filing GST REG-01, Aadhaar OTP authentication, and responding to department queries. No physical office visit required. GSTIN delivered in 7–10 working days.",
      },
    },
    {
      "@type": "Question",
      name: "What is the penalty for not registering under GST?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Operating without mandatory GST registration is illegal under GST law. Penalties include 100% of the tax evaded or ₹10,000 (whichever is higher). The business cannot collect GST from customers, cannot issue valid tax invoices, and loses the right to claim Input Tax Credit (ITC).",
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
      name: "GST Registration Consultant Delhi",
      item: "https://www.koopindia.com/gst-registration",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Koop India - GST Registration Consultant Delhi",
  description:
    "Top-rated GST Registration Consultant in Delhi NCR offering online GSTIN registration, GST filing, and business tax compliance services.",
  url: "https://www.koopindia.com/gst-registration",
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
    reviewCount: "1240",
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
  name: "How to Apply for Online GST Registration in Delhi NCR",
  description: "Step-by-step procedure to get your 15-digit GSTIN number online in 7–10 days with Koop India.",
  totalTime: "P7D",
  step: [
    {
      "@type": "HowToStep",
      name: "Document Verification",
      text: "Submit PAN Card, Aadhaar, business address proof (rent agreement/electricity bill & NOC), and bank details to Koop India for CA verification.",
    },
    {
      "@type": "HowToStep",
      name: "Part-A Filing & TRN Generation",
      text: "Submission of Part-A of Form GST REG-01 using verified mobile & email OTP to generate your Temporary Reference Number (TRN).",
    },
    {
      "@type": "HowToStep",
      name: "Part-B Filing & Aadhaar Authentication",
      text: "Filling business category, authorized signatory, bank account, and HSN/SAC codes, followed by instant Aadhaar OTP e-verification.",
    },
    {
      "@type": "HowToStep",
      name: "ARN Generation & GSTIN Issuance",
      text: "Application Reference Number (ARN) issued for tracking. Department verifies and grants Form GST REG-06 Certificate with your 15-digit GSTIN.",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Koop India",
  url: "https://www.koopindia.com",
  logo: "https://www.koopindia.com/koopindia-logo.png",
  description: "Koop India is a leading business services company in Delhi NCR offering GST Registration, Trademark Registration, Website Development, and Digital Marketing services.",
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
  name: "GST Registration Services by Koop India Delhi",
  description: "Complete list of GST-related services offered by Koop India in Delhi NCR",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "New GST Registration (GSTIN)",
      url: "https://www.koopindia.com/gst-registration",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "GST Registration for E-Commerce Sellers",
      url: "https://www.koopindia.com/gst-registration",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Composition Scheme GST Registration",
      url: "https://www.koopindia.com/gst-registration",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "GST Amendment & Update Services",
      url: "https://www.koopindia.com/gst-registration",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "GST Cancellation & Revocation",
      url: "https://www.koopindia.com/gst-registration",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "GST Registration Consultant in Delhi | Koop India",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".sr-only", "h1", "h2"],
  },
  url: "https://www.koopindia.com/gst-registration",
};

// SEO Metadata Configuration
export const metadata = {
  title:
    "GST Registration Consultant in Delhi | Online GSTIN in 7 Days | Koop India",
  description:
    "Best GST Registration Consultant in Delhi, Noida & Gurgaon. Expert-assisted GSTIN in 7–10 days. 100% online, error-free, pan-India support. Call now!",
  keywords:
    "gst registration consultant in delhi, gst registration in delhi, online gst registration delhi, gst registration near me, gst registration consultant near me, gst registration fees in delhi, gst number registration delhi, gstin registration delhi, how to get gst number in india, gst registration for small business delhi, gst registration for ecommerce sellers, gst registration noida, gst registration gurgaon, gst registration faridabad, gst registration ghaziabad, gst registration online india 2025, new gst registration india, gst registration documents required, gst registration procedure india, gst registration for proprietorship, gst registration for private limited company, gst registration for llp, composition scheme gst registration, voluntary gst registration india, gst consultant near me",
  alternates: {
    canonical: "https://www.koopindia.com/gst-registration",
  },
  openGraph: {
    title:
      "GST Registration Consultant in Delhi | Get GSTIN in 7 Days | Koop India",
    description:
      "Fast, expert-guided GST Registration in Delhi & all India. Documents, procedure, fees & GSTIN issuance — 100% handled by Koop India.",
    url: "https://www.koopindia.com/gst-registration",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/koopindia-logo.png",
        width: 800,
        height: 600,
        alt: "Koop India – GST Registration Consultant Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Registration Consultant in Delhi | Koop India",
    description:
      "Get GSTIN in 7–10 working days. Expert GST Registration in Delhi, Noida, Gurgaon & pan-India. Affordable fees, 100% online.",
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

      {/* Hidden SEO H1 – crawlable, city-targeted */}
      <h1 className="sr-only">
        GST Registration Consultant in Delhi – Online GST Number in 7 Days |
        Koop India
      </h1>

      <GSTContent />
    </>
  );
}
