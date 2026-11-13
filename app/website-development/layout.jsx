// Structured Data Schemas for Website Development
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development Company in Delhi NCR | Custom Web Design & E-Commerce",
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
    "Website Development Company in Delhi",
    "Custom Web Application Development",
    "E-commerce Website Development",
    "Shopify Store Development",
    "WordPress Website Development",
    "Google Ads Landing Page Development",
    "Responsive Web Design",
    "Technical SEO & Core Web Vitals Optimization",
  ],
  description:
    "Top-rated Website Development Company in Delhi NCR. High-converting, lightning-fast business websites, custom web applications, Shopify & WordPress e-commerce solutions with 100% source code ownership and built-in SEO.",
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
      name: "How fast can you deliver my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Google Ads landing pages, we deliver in 3 to 5 business days. For full corporate business websites, turnaround is typically 5 to 8 business days. E-commerce portals and custom web applications take 10 to 18 days depending on the scope.",
      },
    },
    {
      "@type": "Question",
      name: "How do you ensure my website loads fast on mobile and desktop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build on Next.js with modern image compression (WebP/AVIF), lightweight semantic code, and edge CDN delivery. This avoids bulky bloated plugins and ensures your Core Web Vitals stay green for maximum ad conversion.",
      },
    },
    {
      "@type": "Question",
      name: "Where do customer leads go when someone submits a form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leads are instantly routed to your Koop India CRM dashboard, saved in your secure database, and can be configured to send instant WhatsApp and email notifications to your sales team.",
      },
    },
    {
      "@type": "Question",
      name: "Will I have full ownership of my website and source code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, absolutely. Once your project is completed, you own 100% of the intellectual property, source code, design assets, and content. There are zero proprietary lock-ins.",
      },
    },
    {
      "@type": "Question",
      name: "Can I easily update content, text, and images later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We integrate easy-to-use content management systems (CMS) so your team can effortlessly edit text, add blog articles, update banners, and manage products without needing a developer.",
      },
    },
    {
      "@type": "Question",
      name: "What post-launch support and maintenance do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every project includes complimentary post-launch developer support, bug fixing, and staff walkthrough training. We also provide ongoing maintenance for daily backups, security updates, and performance monitoring.",
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
      name: "Website Development Company Delhi",
      item: "https://www.koopindia.com/website-development",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Koop India - Website Development Company Delhi NCR",
  description:
    "Leading Website Development Agency in Delhi NCR delivering custom business websites, Shopify & WordPress e-commerce platforms with built-in SEO.",
  url: "https://www.koopindia.com/website-development",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "640",
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
  name: "How to Build a High-Performance Business Website in Delhi NCR",
  description: "Step-by-step methodology followed by Koop India to develop, optimize and launch SEO-ready websites.",
  totalTime: "P10D",
  step: [
    {
      "@type": "HowToStep",
      name: "Discovery & Technical Requirements",
      text: "Understand target audience, business goals, competitor landscape, and core feature requirements.",
    },
    {
      "@type": "HowToStep",
      name: "UI/UX Design & Prototype Approval",
      text: "Craft conversion-focused mobile-first wireframes and interactive Figma prototypes for client sign-off.",
    },
    {
      "@type": "HowToStep",
      name: "Modern Full-Stack Development",
      text: "Develop clean semantic code using Next.js, React, and Tailwind CSS with WhatsApp CRM integration.",
    },
    {
      "@type": "HowToStep",
      name: "Core Web Vitals & On-Page SEO Auditing",
      text: "Optimize page speed (LCP < 1.2s), implement schema markup, meta tags, and SSL security configuration.",
    },
    {
      "@type": "HowToStep",
      name: "Go-Live & Google Indexing",
      text: "Deploy on global edge CDN, connect custom domain, configure Google Search Console & Analytics.",
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Koop India",
  url: "https://www.koopindia.com",
  logo: "https://www.koopindia.com/koopindia-logo.png",
  description: "Koop India — Delhi NCR's leading technology & business services company for Website Development, GST Registration, Trademark Registration & Digital Marketing.",
  telephone: "+91-9599826131",
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
  name: "Website Development Services by Koop India Delhi NCR",
  description: "Full-stack web development services by Koop India for businesses in Delhi, Noida and Gurugram",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Custom Business & Corporate Websites",
      url: "https://www.koopindia.com/website-development",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "E-Commerce Web Portals (Next.js / Shopify)",
      url: "https://www.koopindia.com/website-development",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "High-Conversion Google Ads Landing Pages",
      url: "https://www.koopindia.com/website-development",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Startup MVP & Launchpad Websites",
      url: "https://www.koopindia.com/website-development",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "CRM & WhatsApp Integrated Business Portals",
      url: "https://www.koopindia.com/website-development",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "B2B Manufacturer & Distributor Portals",
      url: "https://www.koopindia.com/website-development",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Website Development Company in Delhi NCR | Koop India",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
  url: "https://www.koopindia.com/website-development",
};

// SEO Metadata Configuration
export const metadata = {
  title:
    "Website Development Company Delhi NCR | Next.js & Custom Web Design | Koop India",
  description:
    "Top Website Development Company in Delhi NCR. Custom Next.js sites, e-commerce portals & landing pages. 90+ PageSpeed, 100% code ownership. Free consultation!",
  keywords:
    "website development company in delhi, web development company delhi ncr, website design company delhi, custom website development india, ecommerce website development delhi, shopify store development delhi, wordpress website development india, b2b website development, corporate web design company delhi, landing page development delhi, web development agency delhi, responsive web design delhi, next js web development india, website development near me",
  alternates: {
    canonical: "https://www.koopindia.com/website-development",
  },
  openGraph: {
    title:
      "Website Development Company in Delhi NCR | Koop India",
    description:
      "High-converting, fast-loading business websites & e-commerce portals. Built on modern tech stack with 100% ownership & built-in SEO.",
    url: "https://www.koopindia.com/website-development",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/koopindia-logo.png",
        width: 800,
        height: 600,
        alt: "Koop India – Website Development Company Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Delhi NCR | Koop India",
    description:
      "High-converting business websites, Shopify & WordPress e-commerce stores, custom web apps with built-in SEO. Free consultation!",
    images: ["https://www.koopindia.com/koopindia-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function WebsiteDevelopmentLayout({ children }) {
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
        Website Development Company in Delhi NCR – Custom Web Design, Shopify & E-Commerce Development | Koop India
      </h1>

      {children}
    </>
  );
}
