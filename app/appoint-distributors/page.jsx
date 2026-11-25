import AppointDistributorsClient from "./AppointDistributorsClient";

export const metadata = {
  title: "Appoint Distributors Across India | Distributor Appointment Service | Koop India",
  description:
    "Appoint verified distributors across India with Koop India's structured distributor appointment service. Brand onboarding, dedicated dashboard, digital marketing, verified distributor leads & relationship manager. Manufacturers & brand owners — get started today.",
  keywords: [
    "appoint distributors India",
    "distributor appointment service India",
    "find distributors India",
    "distribution network India",
    "FMCG distributor appointment",
    "brand distribution India",
    "manufacturer distributor India",
    "appoint distributors pan India",
    "distributor leads India",
    "distribution consultant India",
  ],
  alternates: {
    canonical: "https://www.koopindia.com/appoint-distributors",
  },
  openGraph: {
    title: "Appoint Distributors Across India | Koop India Distributor Appointment Service",
    description:
      "Build your pan-India distribution network with Koop India. Verified distributor leads, brand dashboard, marketing & dedicated relationship manager for manufacturers and brand owners.",
    url: "https://www.koopindia.com/appoint-distributors",
    siteName: "Koop India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.koopindia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Appoint Distributors India — Koop India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appoint Distributors Across India | Koop India",
    description:
      "Build your pan-India distribution network. Verified distributor leads, brand dashboard & relationship manager.",
    images: ["https://www.koopindia.com/og-image.png"],
  },
};

export default function AppointDistributorsPage() {
  return <AppointDistributorsClient />;
}

