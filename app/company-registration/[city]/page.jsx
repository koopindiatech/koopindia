import { notFound } from "next/navigation";
import {
  COMPANY_REGISTRATION_CITIES,
  CITIES_LIST,
  getCityBySlug,
} from "@/lib/companyRegistrationCities";
import CompanyRegistrationCityClient from "./CompanyRegistrationCityClient";

export async function generateStaticParams() {
  return CITIES_LIST.map((c) => ({
    city: c.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { city: citySlug } = resolvedParams || {};
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "Company Registration in India | Koop India",
      description: "Online Company Registration services across India by Koop India CA/CS experts.",
    };
  }

  const title = `Company Registration in ${city.name} | Online Pvt Ltd, OPC & LLP | Koop India`;
  const description = `Register your Private Limited Company, OPC or LLP in ${city.name}, ${city.state}. 100% online MCA filing, DSC, DIN, SPICe+, COI in ${city.timeline} with Koop India CA/CS experts.`;
  const canonicalUrl = `https://www.koopindia.com/company-registration/${city.slug}`;

  return {
    title,
    description,
    keywords: [
      `company registration in ${city.name}`,
      `pvt ltd company registration ${city.name}`,
      `register private limited company ${city.name}`,
      `online company registration ${city.name}`,
      `OPC registration ${city.name}`,
      `LLP registration in ${city.name}`,
      `company registration consultant ${city.name}`,
      `CA in ${city.name} for company registration`,
      `ROC ${city.name}`,
      `startup registration ${city.name}`,
      `business registration in ${city.name} ${city.state}`,
      `Koop India ${city.name}`,
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
          alt: `Company Registration in ${city.name} - Koop India`,
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

export default async function CompanyRegistrationCityPage({ params }) {
  const resolvedParams = await params;
  const { city: citySlug } = resolvedParams || {};
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Company Registration in ${city.name}`,
    serviceType: "Company Registration",
    provider: {
      "@type": "LocalBusiness",
      name: "Koop India",
      url: "https://www.koopindia.com",
      logo: "https://www.koopindia.com/koopindia-logo.png",
      telephone: "+91-9599826131",
      email: "koopindiadl@gmail.com",
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
    description: `Professional online company registration services in ${city.name}, ${city.state}. Fast Private Limited, OPC, and LLP incorporation under MCA v3 with complete legal compliance.`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://www.koopindia.com/company-registration/${city.slug}`,
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
      <CompanyRegistrationCityClient city={city} />
    </>
  );
}
