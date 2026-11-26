import { notFound } from "next/navigation";
import {
  FSSAI_CITIES_LIST,
  getFssaiCityBySlug,
} from "@/lib/fssaiRegistrationCities";
import FssaiRegistrationCityClient from "./FssaiRegistrationCityClient";

export async function generateStaticParams() {
  return FSSAI_CITIES_LIST.map((c) => ({
    city: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { city: citySlug } = resolvedParams || {};
  const city = getFssaiCityBySlug(citySlug);

  if (!city) {
    return {
      title: "FSSAI Registration & Food License in India | Koop India",
      description: "Online FSSAI Registration and FoSCoS Food License consulting across India by Koop India.",
    };
  }

  const title = `FSSAI Registration in ${city.name} – Online Food License | Koop India`;
  const description = `Apply for Basic, State or Central FSSAI Registration & Food License in ${city.name}, ${city.state}. 100% online FoSCoS filing in ${city.timeline} by Koop India experts.`;
  const canonicalUrl = `https://www.koopindia.com/fssai-registration/${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `fssai registration in ${city.name}`,
      `food license in ${city.name}`,
      `fssai license consultant ${city.name}`,
      `online fssai registration ${city.name}`,
      `fssai registration fees in ${city.name}`,
      `foscos fssai registration ${city.name}`,
      `state food license ${city.name}`,
      `central fssai license ${city.name}`,
      `cloud kitchen fssai license ${city.name}`,
      `zomato swiggy food license ${city.name}`,
      `fssai renewal ${city.name} ${city.state}`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Koop India",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "https://www.koopindia.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `FSSAI Registration in ${city.name} - Koop India`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.koopindia.com/og-image.png"],
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
  };
}

export default async function FssaiRegistrationCityPage({ params }) {
  const resolvedParams = await params;
  const { city: citySlug } = resolvedParams || {};
  const city = getFssaiCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const pageUrl = `https://www.koopindia.com/fssai-registration/${city.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `FSSAI Registration in ${city.name}`,
    serviceType: "FSSAI Registration & Food License (FoSCoS)",
    url: pageUrl,
    provider: {
      "@type": "ProfessionalService",
      name: "Koop India",
      url: "https://www.koopindia.com",
      logo: "https://www.koopindia.com/koopindia-logo.png",
      telephone: "+91-9599826131",
      email: "koopindiadl@gmail.com",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.geo.latitude,
        longitude: city.geo.longitude,
      },
      areaServed: [city.name, city.state, city.region],
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    description: `Fast online FSSAI registration, Basic Form A, State Form B, and Central food licensing in ${city.name}, ${city.state} via FoSCoS.`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      priceCurrency: "INR",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.koopindia.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FSSAI License Registration",
        item: "https://www.koopindia.com/documentation-compliance/fssai-license",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `FSSAI Registration in ${city.name}`,
        item: pageUrl,
      },
    ],
  };

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
      <FssaiRegistrationCityClient city={city} />
    </>
  );
}
