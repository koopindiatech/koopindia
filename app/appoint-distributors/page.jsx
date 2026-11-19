import AppointDistributorsClient from "./AppointDistributorsClient";

export const metadata = {
  title: "Appoint Distributors | Distributor Appointment Services | Koop India",
  description:
    "Grow your distribution network with Koop India. Get brand onboarding, a dedicated dashboard, marketing, verified distributor leads and relationship management.",
  alternates: {
    canonical: "https://www.koopindia.com/appoint-distributors",
  },
  openGraph: {
    title: "Appoint Distributors | Distributor Appointment Services | Koop India",
    description:
      "From brand registration to verified distributor leads, Koop India helps manufacturers and brand owners build a stronger distribution network across India.",
    url: "https://www.koopindia.com/appoint-distributors",
    siteName: "Koop India",
    locale: "en_US",
    type: "website",
  },
};

export default function AppointDistributorsPage() {
  return <AppointDistributorsClient />;
}
