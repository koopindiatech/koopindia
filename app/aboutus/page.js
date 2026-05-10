import AboutContent from "./Aboutcontent";

export const metadata = {
  title: "About Us | Koop India - Business Launchpad for Startups",
  description: "Learn more about Koop India, a 360° business consulting firm empowering Indian entrepreneurs with registration, branding, compliance, and growth strategies.",
  keywords: "business consulting, startup registration, branding, tax compliance, Koop India",
  openGraph: {
    title: "About Koop India",
    description: "Your strategic launchpad for business success in India.",
    images: ["/about1.jpeg"],
  },
};

export default function Page() {
  return <AboutContent />;
}