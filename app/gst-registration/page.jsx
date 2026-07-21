import GSTContent from "../documentation-compliance/gst-registration/GSTContent";

/* ─────────────────────────────────────────────────────────────
   STRUCTURED DATA – Service + FAQPage + LocalBusiness
───────────────────────────────────────────────────────────── */
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
    price: "2999",
    priceCurrency: "INR",
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
  ],
};

/* ─────────────────────────────────────────────────────────────
   METADATA – 25+ targeted keywords, city-specific, high-intent
───────────────────────────────────────────────────────────── */
export const metadata = {
  title:
    "GST Registration Consultant in Delhi | Online GSTIN in 7 Days | Koop India",
  description:
    "Looking for a GST Registration Consultant in Delhi? Koop India provides fast online GST Registration in Delhi, Noida, Gurgaon & pan-India. Get GSTIN in 7–10 working days with expert support, error-free documentation & affordable fees. Call now!",
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
