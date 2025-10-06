import React from "react";



const sections = [
  {
    title: "Introduction",
    content:
      "Welcome to Koop India. By accessing or using our website, services, or platforms, you agree to abide by these Terms & Conditions. If you do not agree, you should discontinue using our services immediately.",
  },
  {
    title: "Definitions",
    content: [
      "Company/We/Us: Refers to Koop India.",
      "User/You: Refers to any person using our services or website.",
      "Services: Refers to consulting, business registration, digital marketing, startup advisory, or any other services offered by Koop India.",
    ],
  },
  {
    title: "Use of Services",
    content: [
      "Services are provided only for lawful purposes.",
      "Users must be 18 years or older or have parental/guardian consent.",
      "Users must provide accurate, current, and complete information for service delivery.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    content:
      "All content, designs, logos, and materials on our website are the property of Koop India. Users may not copy, reproduce, or distribute them without prior written permission.",
  },
  {
    title: "Payments & Refunds",
    content: [
      "Fees for services will be disclosed before purchase.",
      "Refunds, if any, will be governed by Koop India’s Refund Policy.",
      "We reserve the right to refuse service for any reason, at our discretion.",
    ],
  },
  {
    title: "Third-Party Links & Tools",
    content:
      "Our services may include third-party tools or links. We are not responsible for the content or privacy practices of such external platforms.",
  },
  {
    title: "Limitation of Liability",
    content: [
      "Koop India shall not be held liable for any loss, damage, or expenses incurred due to reliance on our services or information provided.",
      "We do not guarantee uninterrupted or error-free operation of our services.",
    ],
  },
  {
    title: "Indemnification",
    content:
      "You agree to indemnify and hold Koop India harmless against any claims, damages, or expenses arising out of your use of our services.",
  },
  {
    title: "Termination",
    content:
      "We may suspend or terminate your access to our services for violation of these terms without prior notice.",
  },
  {
    title: "Governing Law & Dispute Resolution",
    content: [
      "These terms are governed by the laws of India.",
      "Any disputes will first be resolved through arbitration in India before proceeding to courts in the jurisdiction of [Your City/State].",
    ],
  },
  {
    title: "Amendments",
    content:
      "Koop India reserves the right to update or change these Terms & Conditions at any time. Users will be notified of significant changes via email or website notification.",
  },
];

const TermsConditions = () => {
  return (
    <main className="bg-white text-[#141d32]">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#141d32] via-[#1f2a48] to-[#F97316] py-16 text-center text-white">
        <h1 className="text-4xl font-bold">
          Terms & Conditions – <span className="text-[#F97316]">Koop India</span>
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Please read these terms carefully before using our services.
        </p>
      </header>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-lg leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
