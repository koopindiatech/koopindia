import SocialMediaContent from "./SocialMediaContent";

// Structured Data Schemas
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Social Media Marketing Agency in Delhi NCR | SMM Services",
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
    "Instagram Growth & Reels Marketing",
    "Facebook Ads & Lead Generation Campaigns",
    "LinkedIn B2B Thought Leadership Marketing",
    "YouTube Video Strategy & Production",
    "Influencer Outreach & Brand Collaborations",
    "Social Media Content Calendar & Graphic Design",
  ],
  description:
    "Result-oriented social media marketing services in Delhi NCR. High-converting paid ad campaigns, viral video creation, and dedicated brand community building.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.koopindia.com/social-media-marketing",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.koopindia.com" },
    { "@type": "ListItem", position: 2, name: "Digital Marketing", item: "https://www.koopindia.com/digital-marketing" },
    { "@type": "ListItem", position: 3, name: "Social Media Marketing", item: "https://www.koopindia.com/social-media-marketing" },
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
  title: "Social Media Marketing Agency in Delhi NCR | SMM Services | Koop India",
  description:
    "Top Social Media Marketing Company in Delhi NCR. Scale your brand with Instagram, Facebook, LinkedIn & YouTube ads and viral content. Get a Free Social Audit!",
  keywords:
    "social media marketing agency in delhi, smm company delhi ncr, instagram marketing delhi, facebook ads agency delhi, b2b linkedin marketing, social media management delhi",
  alternates: {
    canonical: "https://www.koopindia.com/social-media-marketing",
  },
  openGraph: {
    title: "Social Media Marketing Agency Delhi NCR | Koop India",
    description: "Build authority and generate high-ROI leads with performance social media marketing & creative storytelling.",
    url: "https://www.koopindia.com/social-media-marketing",
    type: "website",
    images: [{ url: "https://www.koopindia.com/koopindia-logo.png", width: 800, height: 600, alt: "Koop India – Social Media Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Marketing Agency Delhi NCR | Koop India",
    description: "Creative & performance-driven social media marketing campaigns for startups and growing brands.",
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
      <SocialMediaContent />
    </>
  );
}
