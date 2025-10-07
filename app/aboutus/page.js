"use client";
import React from "react";
import { Users, Target, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";

const AboutPage = () => {
   const { isOpen, onOpenModal, onCloseModal } = useModal();

  const services = [
    "Business Consulting",
    "Product & Margin Valuation", 
    "Graphic & Logo Designing",
    "3D Modelling & Rendering",
    "Content Writing",
    "Social Media Promotion & Digital Marketing",
    "Tax, Compliance & Accounting (GST, FSSAI, ISO)",
    "Company & Startup India Registrations",
    "Market Research & Distribution / Franchise Models",
  ];

  const whyChooseUs = [
    "All-in-one business solution—from legal to branding under one roof.",
    "Dedicated experts delivering specialist support across services.",
    "Startup-focused, affordable pricing.",
    "Pan-India support with execution across regions.", 
    "Proven track record with personalized strategies.",
    "Long-term partnerships built on sustainable growth."
  ];

  const stats = [
    { number: '100+', label: 'Startups Launched' },
    { number: '20+', label: 'Services Offered' },
    { number: '100+', label: 'Cities Covered' },
    { number: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="bg-[#141d32] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Empowering Startups • Enabling Growth •{" "}
              <span className="text-[#F97316]">Elevating Brands</span>
            </h1>
            <p className="mt-4 text-gray-300 leading-relaxed">
              At <span className="text-[#F97316] font-semibold">Koop India</span>, we are more than just a consulting firm—we're your strategic launchpad for business success. Founded to empower Indian entrepreneurs, we offer a 360° suite of services—from registration to branding, compliance to promotion, valuation to distribution.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/about1.jpeg"
              alt="Koop India Journey"
              width={600} height={400}
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#F97316] to-[#ea580c] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gradient-to-r from-[#141d32] via-[#1c2545] to-[#141d32] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#F97316]">Who We Are</h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              Koop India is a full-spectrum business consulting and support platform
              that caters to startups, SMEs, and growing brands across India. Whether
              you're a budding entrepreneur or a scaling enterprise, we guide you at
              every step with expertise and dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-[#f9fafb] p-8 rounded-xl shadow hover:shadow-lg border-l-4 border-[#F97316] transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-[#141d32]">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To simplify entrepreneurship by providing affordable, reliable, and
              efficient business solutions under one roof—fueling innovation and
              accelerating growth in India.
            </p>
          </div>
          <div className="space-y-4 bg-[#f9fafb] p-8 rounded-xl shadow hover:shadow-lg border-l-4 border-[#F97316] transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-[#141d32]">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be India's most trusted business launchpad, empowering every
              entrepreneur with the tools, guidance, and support they need to succeed
              in today's competitive market.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-[#f3f4f9] py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <h2 className="text-3xl font-bold text-center text-[#141d32]">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#F97316] group"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                  <p className="text-gray-800 font-medium group-hover:text-[#141d32] transition-colors">
                    {service}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#141d32] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <h2 className="text-3xl font-bold text-center text-[#F97316]">
            Why Choose Koop India?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-[#1c2545] hover:bg-[#253454] transition-colors duration-300">
                <CheckCircle className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                <p className="text-gray-300 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#141d32] mb-6">Our Approach</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  We believe that every business is unique, and so are its challenges. 
                  Our approach is built on understanding your specific needs, industry 
                  dynamics, and growth aspirations.
                </p>
                <p>
                  From the initial consultation to long-term partnership, we work 
                  closely with you to develop customized strategies that deliver 
                  measurable results and sustainable growth.
                </p>
                <div className="flex items-center space-x-3 p-4 bg-[#f3f4f9] rounded-lg">
                  <Target className="w-6 h-6 text-[#F97316]" />
                  <span className="font-semibold text-[#141d32]">
                    Tailored Solutions for Every Business Stage
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/about2.jpeg"
                  alt="Our Approach"
                  width={600} height={400}
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#F97316] rounded-full opacity-80"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#141d32] rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's turn your entrepreneurial vision into reality. Get in touch with our experts today.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-6 h-6" />
              <span>koopindiadl@gmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-6 h-6" />
              <span>+91 85889 99978</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-6 h-6" />
              <span>Pan India Services</span>
            </div>
          </div>
          <button 
            onClick={onOpenModal}
            className="bg-white text-[#F97316] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg cursor-pointer">
            Start Your Journey Today
          </button>
        </div>
      </section>
       <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
    </div>
  );
};

export default AboutPage;