"use client";
import React from "react";
import Link from "next/link";
import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";
import { Button } from "@headlessui/react";
import Image from "next/image";
const packages = [
  {
    title: "Koop Essential – Basic Package",
    subtitle: "For Starting Your Social Media Presence",
    image: "/essential.jpg",
    price: "₹4,999 / Month",
    why: [
      "Kickstart your brand with professional profile setup",
      "Stay consistent with regular posts",
      "Creative first impression with eye-catching designs",
      "Simple, effective & budget-friendly",
      "Dedicated team support for your queries",
      "Tailored content that matches your industry & audience",
      "Analytics-driven approach to track your brand growth",
    ],
    deliverables: [
      { label: "Number of Posts", value: "8 Posts per Month" },
      { label: "Reels", value: "2 Reels per Month" },
      { label: "Graphics", value: "Unique & Professional Creative Designs" },
      { label: "Content Writing", value: "Captions + Hashtags included" },
      { label: "Platforms Covered", value: "Facebook, Instagram, LinkedIn" },
      { label: "Posting Method", value: "Manual Posting (no bots)" },
      { label: "Feedback Sharing", value: "Monthly Performance Report" },
    ],
    highlight:
      "With Koop Essential, your brand gets the perfect launchpad on social media – professional, consistent & engaging.",
  },
  {
    title: "Koop Accelerater – Intermediate Package",
    subtitle: "For Growth & Engagement",
    image: "/accelerater.jpg",
    price: "₹8,999 / Month",
    why: [
      "More Content, More Reach – 15 premium posts + 4 reels to maximize your visibility.",
      "Audience Engagement – Likes, comments, shares & replies to keep your audience active.",
      "Growth Tracking – Bi-weekly reports for clear insights on performance.",
      "Stronger Branding – Advanced captions, hashtags & keyword strategy for better discovery.",
      "Professional Presence – Focused on Facebook, Instagram & LinkedIn for credibility & impact.",
    ],
    deliverables: [
      { label: "Number of Posts", value: "15 Posts per Month" },
      { label: "Reels", value: "4 Reels per Month" },
      { label: "Graphics", value: "Premium & Professionally Designed Creatives" },
      { label: "Content Writing", value: "Captions, Hashtags & Keyword Optimization" },
      { label: "Platforms Covered", value: "Facebook, Instagram, LinkedIn" },
      { label: "Posting Method", value: "Manual Posting (no bots)" },
      { label: "Engagement", value: "Basic Interaction (Likes, Comments, Shares)" },
      { label: "Performance Report", value: "Bi-Weekly Growth & Engagement Report" },
    ],
    highlight:
      "With Koop Accelerater, your brand takes the leap from just existing to actively growing – building relationships, creating impact, and becoming memorable.",
  },
  {
    title: "Koop Dominator – Premium Package",
    subtitle: "For Maximum Reach & Brand Impact",
    image: "/dominator.jpg",
    price: "₹11,999 / Month",
    why: [
      "Full-Fledged Presence – 25 premium posts + 6 reels every month for maximum visibility.",
      "Tailored Strategy – Content customized for Facebook, Instagram & LinkedIn to fit your brand’s tone.",
      "Community Building – Replies, comments & DMs handled to build a loyal audience.",
      "Detailed Analytics – Weekly performance reports for growth tracking.",
      "Premium Branding – Consistency + creativity = long-term brand recall.",
    ],
    deliverables: [
      { label: "Number of Posts", value: "25 Posts per Month" },
      { label: "Reels", value: "6 Reels per Month" },
      { label: "Graphics", value: "High-Quality Premium Creative Designs" },
      { label: "Content Writing", value: "Captions, Hashtags, Advanced Strategy" },
      { label: "Platforms Covered", value: "Facebook, Instagram, LinkedIn" },
      { label: "Posting Method", value: "Manual Posting (no bots)" },
      { label: "Community Engagement", value: "Replies, Comments & DM Handling" },
      { label: "Performance Report", value: "Weekly Growth & Analytics Report" },
      { label: "Strategy Call", value: "1:1 Monthly Strategy Session" },
    ],
    highlight:
      "With Koop Dominator, your brand doesn’t just grow – it leads, inspires & impacts. This package is for businesses who want to be seen as an authority in their industry.",
  },
];

const Page = () => {
   const { isOpen, onOpenModal, onCloseModal } = useModal();
  
  return (
    <div className="bg-[#141d32] text-white px-6 md:px-10 py-20">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6">
          Our <span className="text-[#F97316]">Packages</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Choose the right plan for your business growth. Whether you’re just
          starting out or ready to dominate, Koop India provides tailor-made
          solutions to help you shine across digital platforms.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white text-[#141d32] rounded-2xl border-t-4 border-[#F97316] hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-4 flex flex-col"
          >
            {/* Image */}
            <Image
              src={pkg.image}
              alt={pkg.title}
              width={400} height={300}
              className="w-full object-cover rounded-xl mb-6 h-90"
            />

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>
            <p className="text-gray-600 mb-6">{pkg.subtitle}</p>

            {/* Why Choose */}
            <h3 className="text-xl font-semibold text-[#F97316] mb-3">
              Why Choose?
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              {pkg.why.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {/* Deliverables */}
            <h3 className="text-xl font-semibold text-[#F97316] mb-3">
              Deliverables
            </h3>
            <table className="w-full text-sm text-left mb-6 border-collapse">
              <tbody>
                {pkg.deliverables.map((d, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-2 font-medium">{d.label}</td>
                    <td className="py-2 text-gray-600">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Price */}
            <div className="mt-auto">
              <p className="text-2xl font-bold text-[#F97316] mb-4">
                {pkg.price}
              </p>
              <p className="text-gray-700 italic">{pkg.highlight}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA Section */}
      <div className="max-w-6xl mx-auto mt-24 bg-[#141d32]">
        <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-[#4b515d] via-[#1b2439] to-[#141d32] text-center rounded-3xl shadow-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
            Let’s Build Your <span className="text-[#F97316]">Growth Story</span>{" "}
            Together
          </h2>
          <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Partner with Koop India and unlock your brand’s full potential with
            strategies designed for consistency, creativity, and measurable
            growth.
          </p>
          <Button 
             onClick={onOpenModal}
             className="border bg-[#F97316] border-[#F97316]  px-25 py-3 rounded-xl shadow-lg transition cursor-pointer "
           >
            Get Started
          </Button>
        </section>
      </div>

      <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
    </div>
  );
};

export default Page;
