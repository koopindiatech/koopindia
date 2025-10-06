import React from "react";
import Link from "next/link";

export default function SolutionsPage() {
  return (
    <main className="bg-[#141d32] text-white">
      {/* Intro Section */}
      <section className="pt-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Innovative Solutions for Modern Businesses
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          At <span className="text-orange-500 font-semibold">Koop India</span>, 
          we go beyond consultancy — we partner with organizations to design, 
          build, and implement strategies that drive measurable results.  
          From strategic planning to creative branding, digital growth, and 
          automation, our solutions are built to empower your business in an 
          ever-changing marketplace.
        </p>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Core Solutions
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Strategic Business Solutions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 border-t-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-500 mb-3">
              ♟ Strategic Business Solutions
            </h3>
            <p className="mb-4">
              In-depth market understanding and strategy planning to drive
              sustainable growth.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Business Consulting</li>
              <li>Market Research & Analysis</li>
              <li>Product & Margin Valuation</li>
              <li>Distribution & Franchise Consultancy</li>
            </ul>
          </div>

          {/* Creative & Branding Solutions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 border-t-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-500 mb-3">
              💡 Creative & Branding Solutions
            </h3>
            <p className="mb-4">
              Distinct brand identity and engaging creatives to connect with
              your audience.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Logo & Brand Identity Design</li>
              <li>Product Packaging Design</li>
              <li>Marketing Collaterals (Brochures, Catalogues, Posters)</li>
              <li>Social Media Creative Designs</li>
            </ul>
          </div>

          {/* Digital Growth Solutions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 border-t-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-500 mb-3">
              📈 Digital Growth Solutions
            </h3>
            <p className="mb-4">
              Performance-led digital presence to stand out and generate quality
              leads.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Social Media Marketing (Facebook, Instagram, LinkedIn)</li>
              <li>Search Engine Optimization (SEO)</li>
              <li>Google Ads & Meta Ads Campaign Management</li>
              <li>Website Design & Development</li>
            </ul>
          </div>

          {/* Tech & Automation Solutions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 border-t-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-500 mb-3">
              ⚙️ Tech & Automation Solutions
            </h3>
            <p className="mb-4">
              Technology to reduce manual work and improve efficiency across
              teams.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>CRM Software Development</li>
              <li>ERP Solutions for Business Automation</li>
              <li>E-commerce Store Setup</li>
              <li>Data Analytics & Reporting Tools</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Let’s Build Your Growth Story Together
        </h2>
        <p className="text-lg mb-6">
          Connect with Koop India today and explore how our solutions can drive
          your success.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
