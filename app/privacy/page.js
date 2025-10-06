import React from "react";



const sections = [
  {
    title: "Information We Collect",
    content: [
      "Personal Information: Name, email, phone number, company details.",
      "Technical Information: IP address, browser type, device details.",
      "Cookies & Analytics: To improve user experience and website performance.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To provide and improve our services.",
      "To process payments and send invoices.",
      "For marketing, promotions, and lead generation.",
      "To comply with legal obligations.",
    ],
  },
  {
    title: "Data Sharing & Third Parties",
    content: [
      "We may share information with trusted third parties like payment gateways, CRMs, and marketing platforms.",
      "We do not sell your data to any third party for commercial purposes.",
    ],
  },
  {
    title: "Data Security",
    content:
      "We use secure servers, encryption, and access controls to protect your data. However, no method of transmission is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Cookies",
    content:
      "Our website uses cookies to enhance user experience. Users can control cookie settings through browser options.",
  },
  {
    title: "User Rights",
    content: [
      "Access the personal data we hold about you.",
      "Request corrections to your information.",
      "Opt out of marketing communications at any time.",
      "Request deletion of your personal data (subject to legal obligations).",
    ],
  },
  {
    title: "Data Retention",
    content:
      "We will retain your data only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.",
  },
  {
    title: "Third-Party Links",
    content:
      "Our website may contain links to external websites. We are not responsible for their privacy practices or content.",
  },
  {
    title: "Changes to Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time. Users will be informed of major updates through email or website notifications.",
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="bg-white text-[#141d32]">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#141d32] via-[#1f2a48] to-[#F97316] py-16 text-center text-white">
        <h1 className="text-4xl font-bold">
          Privacy Policy – <span className="text-[#F97316]">Koop India</span>
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Your privacy is our priority. Learn how we handle your data responsibly.
        </p>
      </header>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Koop India is committed to protecting your privacy and ensuring that
              your personal information is handled securely and responsibly.
            </p>
          </div>

          {/* Policy Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-3">
                {section.title}
              </h2>
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

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy,
              you can contact us at:
            </p>
            <div className="mt-3 space-y-1 text-lg">
              <p><strong>Email:</strong> koopindiadl@gmail.com</p>
              <p><strong>Phone:</strong> 9599826131</p>
              <p>
                <strong>Address:</strong> A-81, Sector 4, Noida, Uttar Pradesh 201301
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
