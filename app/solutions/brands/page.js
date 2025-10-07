"use client";
import React from "react";
import { Store, TrendingUp, Users, Globe, Award, Target, ArrowRight, CheckCircle, Building, Zap } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import EnquiryModal from "@/components/forms/EnquiryForm";

import Image from "next/image";

const BrandsPage = () => {
   const { isOpen, onOpenModal, onCloseModal } = useModal();

  const solutions = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Company Registration",
      description: "Complete company incorporation services including Private Limited, LLP, and Partnership firms",
      features: ["Private Limited Company", "LLP Registration", "Partnership Firm", "One Person Company"]
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trademark & IP Protection",
      description: "Protect your brand identity with comprehensive trademark and intellectual property services",
      features: ["Trademark Registration", "Copyright Protection", "Design Registration", "Patent Filing"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "GST & Tax Services",
      description: "Complete tax compliance and GST registration services for your business operations",
      features: ["GST Registration", "Tax Filing", "Compliance Management", "Return Preparation"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Marketing & Branding",
      description: "Build your brand presence online with comprehensive digital marketing solutions",
      features: ["Website Development", "Social Media Marketing", "SEO & Content", "Brand Identity Design"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Food License & Permits",
      description: "FSSAI registration and food business licensing for restaurants and food startups",
      features: ["FSSAI Registration", "Food License", "Health Permits", "Compliance Support"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Startup Support Services",
      description: "End-to-end support for startups from idea to execution with expert guidance",
      features: ["Business Plan Development", "Funding Assistance", "Mentor Connect", "Legal Support"]
    }
  ];

  const benefits = [
    "Complete legal compliance and documentation",
    "Expert guidance from experienced professionals",
    "Fast and hassle-free registration processes",
    "End-to-end digital marketing solutions",
    "Dedicated support throughout your business journey",
    "Cost-effective packages tailored for Indian businesses",
    "Government-approved processes and documentation",
    "24/7 customer support and assistance"
  ];

  const stats = [
    { number: "100+", label: "Brands Registered" },
    { number: "99%", label: "Success Rate" },
    { number: "48 Hrs", label: "Average Processing" },
    { number: "24/7", label: "Expert Support" }
  ];

  const services = [
    {
      title: "Legal & Compliance",
      description: "Complete legal setup for your brand",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Tax & GST Services",
      description: "Hassle-free tax compliance",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Digital Solutions",
      description: "Online presence and marketing",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Business Support",
      description: "End-to-end business guidance",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/30">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8 bg-gradient-to-br from-white via-orange-50/20 to-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-[#141d32]">
              {/* <div className="flex items-center space-x-2 mb-4">
                <Store className="w-8 h-8 text-[#F97316]" />
                <span className="text-[#F97316] font-semibold">Solutions for Brands</span>
              </div> */}
              <h1 className="text-5xl lg:text-5xl font-bold mb-6">
                Launch Your <span className="text-[#F97316]">Brand</span> in India
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From company registration to digital marketing, KoopIndia provides complete 
                business solutions to help your brand succeed in the Indian market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                 onClick={onOpenModal}
                 className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer">
                  <span>Start Your Business</span>
                  <ArrowRight className="w-20 h-5" />
                </button>
                {/* <button className="border-2 border-[#F97316] hover:bg-[#F97316] text-[#F97316] hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  View Success Stories
                </button> */}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#141d32] to-gray-800 rounded-2xl p-8 text-white border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose KoopIndia?</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-[#F97316] mb-1">{stat.number}</div>
                      <div className="text-gray-300 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-gray-50/80 via-white to-yellow-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#141d32] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/30 to-orange-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141d32] mb-4">
              Complete Brand Solutions for Indian Market
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your brand needs to establish and grow in India - from legal compliance 
              to digital marketing, all under one roof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white border-2 border-[#f1b082] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-[#F97316]/30 group">
                <div className="text-[#F97316] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-[#141d32] mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#F97316]" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-[#F97316] font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50/60 via-blue-50/30 to-slate-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#141d32] mb-8">
                Why Indian <span className="text-[#F97316]">Brands</span> Choose Us
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#F97316] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#F97316]/20">
              <h3 className="text-2xl font-bold text-[#141d32] mb-6">Ready to Launch Your Brand?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Join thousands of successful brands who have launched and scaled their 
                businesses in India with KoopIndia&apos; comprehensive support.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-[#F97316]" />
                  <span className="text-gray-700">Complete legal compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#F97316]" />
                  <span className="text-gray-700">Dedicated relationship manager</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-[#F97316]" />
                  <span className="text-gray-700">Guaranteed results & support</span>
                </div>
              </div>
              {/* <button className="w-full mt-8 bg-[#F97316] hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Get Free Brand Consultation
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-t from-slate-50/50 via-white to-yellow-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141d32] mb-4">
              Simple <span className="text-[#F97316]">4-Step</span> Process
            </h2>
            <p className="text-xl text-gray-600">
              From consultation to launch - we make it easy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Consultation</h3>
              <p className="text-gray-600">Free consultation to understand your business needs</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Documentation</h3>
              <p className="text-gray-600">Prepare and submit all required documents</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Registration</h3>
              <p className="text-gray-600">Complete legal registration and compliance setup</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Launch</h3>
              <p className="text-gray-600">Your brand is ready to operate legally in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-[#F97316]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Launch Your Brand in India?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Don&apos;t wait! Start your business journey today with India&apos;s most trusted 
            business registration and compliance partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
             onClick={onOpenModal}
             className="bg-white hover:bg-gray-100 text-[#F97316] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
              Start Your Business Registration
            </button>
          </div>
        </div>
      </section>
       <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
    </div>
  );
};

export default BrandsPage;