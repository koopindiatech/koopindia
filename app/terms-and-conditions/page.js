import React from "react";

export const metadata = {
  title: "Terms & Conditions | Koop India",
  description: "Read Koop India's Terms & Conditions regarding professional services, proforma invoice validity, payment terms, refund policies, and jurisdiction.",
};

const termsData = [
  {
    num: 1,
    title: "Acceptance of Terms",
    content: <>Payment of this Proforma Invoice shall constitute the Client&apos;s acceptance of these Terms &amp; Conditions and confirmation to proceed with the services.</>
  },
  {
    num: 2,
    title: "Validity",
    content: <>This Proforma Invoice/Quotation is valid for <strong className="text-gray-900 font-extrabold">15 (Fifteen) days</strong> from the date of issue unless otherwise specified.</>
  },
  {
    num: 3,
    title: "Fees & Taxes",
    content: <>The charges mentioned in this Proforma Invoice include the applicable Government/Authority Fees and Professional Service Fees, wherever specified. GST shall be applicable as per prevailing Government regulations.</>
  },
  {
    num: 4,
    title: "Payment Terms",
    content: <>Services shall commence only upon receipt of the agreed advance payment. The balance amount, if any, shall be payable as per the agreed payment schedule.</>
  },
  {
    num: 5,
    title: "Client Responsibilities",
    content: <>The Client shall provide complete, accurate, and authentic documents, information, approvals, and other requirements necessary for execution of the services. Any delay or deficiency from the Client&apos;s end may result in extension of timelines.</>
  },
  {
    num: 6,
    title: "Professional Fee – Non-Refundable",
    content: <>The <strong className="text-gray-900 font-extrabold">Professional Service Fee charged by Koop India is strictly non-refundable once the assignment has commenced</strong>, irrespective of project cancellation, change in business plans, non-submission of documents, rejection due to incorrect or incomplete information provided by the Client, delay attributable to the Client, or any other reason.</>
  },
  {
    num: 7,
    title: "Government & Third-Party Fees",
    content: <>Government fees, statutory charges, certification fees, domain registration charges, hosting charges, advertisement budgets, payment gateway charges, third-party software licenses, premium plugins, premium themes, SMS/Email gateway charges, and other third-party costs are non-refundable once paid and shall be governed by the refund policies of the respective authorities or service providers.</>
  },
  {
    num: 8,
    title: "Regulatory Services",
    content: <>Koop India shall provide professional assistance for registrations, licenses, certifications, and compliance services. However, approval, grant, issuance, renewal, or rejection of any application is solely at the discretion of the respective Government Authority, Regulatory Body, or Certification Agency.</>
  },
  {
    num: 9,
    title: "Marketing & Promotional Services",
    content: <>Marketing, buyering, social media management, SEO, advertising, lead generation, and promotional activities are provided on a best-effort basis. Koop India does not guarantee any specific number of leads, sales, distributors, revenue, website traffic, rankings, or return on investment (ROI). Campaign performance depends on market conditions, product quality, pricing, competition, audience response, and third-party advertising platforms.</>
  },
  {
    num: 10,
    title: "Advertisement Budget",
    content: <>Advertising budgets for Meta Ads, Google Ads, LinkedIn Ads, YouTube Ads, or any other paid promotional platform are <strong className="text-gray-900 font-extrabold">not included</strong> unless specifically mentioned in the proposal or invoice and shall be borne separately by the Client.</>
  },
  {
    num: 11,
    title: "Website & Software Development",
    content: <>Development work shall commence only after receipt of all required content, credentials, approvals, and advance payment. Any additional features, revisions, integrations, or scope changes beyond the agreed deliverables shall be treated as additional work and may attract extra charges.</>
  },
  {
    num: 12,
    title: "Project Timelines",
    content: <>Delivery timelines are indicative and subject to timely receipt of documents, approvals, and information from the Client, as well as timelines of Government Authorities, Certification Bodies, third-party vendors, and technology partners.</>
  },
  {
    num: 13,
    title: "Ownership & Handover",
    content: <>Ownership of the completed website, software, design files, or other deliverables shall be transferred to the Client only after full payment of all outstanding dues. Koop India reserves the right to showcase completed projects in its portfolio and marketing materials unless otherwise agreed in writing.</>
  },
  {
    num: 14,
    title: "Additional Charges",
    content: <>Any work requested beyond the agreed scope of services shall be chargeable separately upon mutual approval.</>
  },
  {
    num: 15,
    title: "Limitation of Liability",
    content: <>Koop India shall not be liable for any indirect, incidental, consequential, or business losses arising due to delays, rejection by authorities, changes in government policies, third-party service interruptions, technical issues, force majeure events, or the Client&apos;s failure to provide timely information or approvals.</>
  },
  {
    num: 16,
    title: "Confidentiality",
    content: <>Koop India shall maintain reasonable confidentiality of the Client&apos;s information and documents and shall use them solely for the purpose of providing the agreed services, except where disclosure is required by law or competent authority.</>
  },
  {
    num: 17,
    title: "Force Majeure",
    content: <>Koop India shall not be responsible for any delay or failure in performance caused by events beyond its reasonable control, including but not limited to natural disasters, government actions, internet outages, pandemics, strikes, or technical failures.</>
  },
  {
    num: 18,
    title: "Cancellation",
    content: <>In the event of cancellation by the Client after commencement of work, all Professional Service Fees paid shall remain non-refundable. Any expenses incurred on behalf of the Client shall also be recoverable.</>
  },
  {
    num: 19,
    title: "Jurisdiction",
    content: <>Any dispute, claim, or difference arising out of or in connection with this Proforma Invoice, the services provided, or these Terms &amp; Conditions shall be subject to the <strong className="text-gray-900 font-extrabold">exclusive jurisdiction of the competent courts at New Delhi, Delhi, India</strong>.</>
  },
  {
    num: 20,
    title: "Entire Agreement",
    content: <>These Terms &amp; Conditions, together with the Proforma Invoice, Quotation, or Proposal, constitute the entire understanding between the parties concerning the services and supersede any prior verbal discussions or communications.</>
  }
];

const TermsAndConditions = () => {
  return (
    <main className="bg-gray-50/70 text-[#141d32] min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#141d32] via-[#1f2a48] to-[#F97316] py-20 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full text-[#F97316] mb-4 inline-block backdrop-blur-sm border border-white/10">
            Legal &amp; Policy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">
            Terms &amp; <span className="text-[#F97316]">Conditions</span>
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Please review our governing policies regarding services, billing, deliverables, and client responsibilities.
          </p>
        </div>
      </header>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 sm:p-10 lg:p-14 space-y-10">
          
          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview &amp; Acceptance</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Welcome to Koop India. These Terms &amp; Conditions set forth the standard protocol, responsibilities, and legally binding agreements between Koop India and the Client upon acceptance of a Proforma Invoice, Quotation, or Proposal.
            </p>
          </div>

          <div className="space-y-8">
            {termsData.map((item) => (
              <div key={item.num} className="flex gap-4 sm:gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#F97316] font-extrabold text-sm sm:text-base flex items-center justify-center group-hover:bg-[#F97316] group-hover:text-white transition-colors duration-300">
                  {item.num}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 bg-[#FFF7ED] p-6 sm:p-8 rounded-2xl border border-[#FFEDD5]">
            <h4 className="font-bold text-[#9A3412] text-lg mb-2">Have questions regarding our Terms?</h4>
            <p className="text-sm text-[#C2410C]">
              If you require clarification on any of the above clauses or payment schedules, please contact your designated account manager or reach out to our legal support team at Koop India.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
