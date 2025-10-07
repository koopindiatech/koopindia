"use client"
import React, { useState } from "react";

import { 
  Truck, 
  Network, 
  BarChart3, 
  MapPin, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Package,
  Users,
  Clock,
  DollarSign,
  Search,
  MessageCircle,
  Handshake,
  Star,
  Globe,
  Smartphone,
  Eye
} from "lucide-react";
import EnquiryModal from "@/components/forms/EnquiryForm";
import { useModal } from "@/context/ModalContext";

const DistributorPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save Time",
      description: "Spend your time wisely by finding products for your clients faster. Do not waste time. Every minute you are not with your clients face to face someone else is.",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Save Money", 
      description: "Even though the hefty price tag is mainly for brands to pay to attend a trade show, distributors also pay their fair share. On average, a distributor pays ₹2.5-4 lakhs for flights, hotels and meals to visit a single trade show.",
    }
  ];

  const howItWorks = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Register",
      description: "Register and set up your profile 100% for free. We will review your information and confirm within 48 hours.",
      step: 1
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Search Products", 
      description: "Search our database of vetted companies with innovative products that are looking for distributors. Connect directly with companies you are interested to work with.",
      step: 2
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Start A Conversation",
      description: "Start a conversation with the brand of interest. Once there is a mutual interest, start discussing the possibilities of volume, shipping, retailers, certification, marketing and more.",
      step: 3
    },
    {
      icon: <Handshake className="w-12 h-12" />,
      title: "Build a Partnership",
      description: "Building a partnership is essential to gain trust and to be able to move the business forward. Set clear goals and grow your business successfully.",
      step: 4
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Rigorous Qualification Process",
      description: "We qualify each member, both brands and distributors. Our pre-qualification process ensures every member is a verified potential business partner."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Access to Exclusive Network", 
      description: "With more than 14 years experience working with the best in class brands and distributors around the world, we only select the best members on Koop India."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Accessible Anytime, Anywhere",
      description: "Want to be in full control when growing your business in a new target market? With Koop India you can start a conversation anytime, anywhere from your laptop or mobile."
    }
  ];

  const stats = [
    { number: "100+", label: "Verified Brands" },
    { number: "1000+", label: "Active Distributors" },
    { number: "50+", label: "Product Categories" },
    { number: "25+", label: "States Covered" }
  ];

  const quickFeatures = [
    {
      title: "Free Registration",
      description: "Join our platform at no cost",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Verified Brands",
      description: "Access pre-qualified companies",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Direct Connection",
      description: "Connect with brands directly",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Your Terms",
      description: "Negotiate on your conditions",
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Koop <span className="text-[#F97316]">India</span>
                </h1>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Find Innovative <span className="text-[#F97316]">Brands</span> to Distribute
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover consumer electronics innovative brands with Koop India. We select the best market-ready brands with great traction to help you find your next top seller!
              </p>
              <button  
               onClick={onOpenModal}
               className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer">
                <span>Register as a Distributor</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#141d32] to-gray-800 rounded-2xl p-8 text-white border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Platform Benefits</h3>
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

      {/* Quick Features */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-gray-50/80 via-white to-yellow-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {quickFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#141d32] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where Distributors Meet Innovation */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/30 to-orange-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-4xl font-bold text-[#141d32] mb-6">
              Where Distributors Meet <span className="text-[#F97316]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Being on top of all the latest innovations is key to avoid missing out on the star product your clients wants to see. Going from trade show to trade show to discover new and innovative products is a thing of the past.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white border-2 border-[#f1b082] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-[#F97316]/30 group">
                <div className="text-[#F97316] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#141d32] mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50/60 via-blue-50/30 to-slate-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-4xl font-bold text-[#141d32] mb-4">
              How Does It <span className="text-[#F97316]">Work?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to connect with innovative brands and build successful partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 group ${activeStep === index ? 'border-[#F97316]' : 'border-transparent hover:border-[#F97316]/30'}`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#F97316] rounded-2xl flex items-center justify-center text-white mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#141d32] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#141d32] mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-t from-slate-50/50 via-white to-yellow-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-4xl font-bold text-[#141d32] mb-4">
              Quality Above <span className="text-[#F97316]">Everything</span>
            </h2>
            <p className="text-xl text-gray-600">
              Why distributors trust our platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 group hover:border-[#F97316]/30">
                <div className="w-14 h-14 bg-[#F97316] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#141d32] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-gray-50/80 via-white to-orange-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#141d32] mb-6">
                Access Your Dashboard <span className="text-[#F97316]">Anywhere</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with brands directly through your personal dashboard. Manage partnerships, track conversations, and discover new opportunities on the go with our mobile-optimized platform.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#F97316]" />
                  <span className="text-gray-700 text-lg">Real-time brand notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#F97316]" />
                  <span className="text-gray-700 text-lg">Secure messaging system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#F97316]" />
                  <span className="text-gray-700 text-lg">Partnership analytics</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#F97316]/20">
              <h3 className="text-2xl font-bold text-[#141d32] mb-6">Ready to Start Discovering?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Join thousands of distributors who are already discovering the next big thing in consumer electronics. Do not get left behind in the innovation race.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-[#F97316]" />
                  <span className="text-gray-700">Access to vetted brands</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#F97316]" />
                  <span className="text-gray-700">Direct communication channel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-[#F97316]" />
                  <span className="text-gray-700">Fast partnership setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/30 to-blue-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#141d32] mb-4">
              Simple <span className="text-[#F97316]">4-Step</span> Process
            </h2>
            <p className="text-xl text-gray-600">
              A systematic approach to distribution excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Register</h3>
              <p className="text-gray-600">Create your free distributor profile</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Discover</h3>
              <p className="text-gray-600">Browse vetted innovative brands</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Connect</h3>
              <p className="text-gray-600">Start conversations with brands</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-bold text-[#141d32] mb-2">Partner</h3>
              <p className="text-gray-600">Build successful distribution partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-[#F97316]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Next Top Seller?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Join India premier platform connecting distributors with innovative consumer electronics brands. Register today and start discovering opportunities.
          </p>
          <button
           onClick={onOpenModal} 
           className="bg-white hover:bg-gray-100 text-[#F97316] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto cursor-pointer">
            <span>Register as a Distributor</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
       <EnquiryModal isOpen={isOpen} onClose={onCloseModal} />
    </div>
  );
};

export default DistributorPage;