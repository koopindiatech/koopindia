"use client";
import React from "react";
import { Rocket, Target, Zap,CheckCircle,Star } from "lucide-react";
import Link from "next/link";
import { Brain, Palette, FileText, Box } from "lucide-react";
import Footer from "../layout/Footer";
import  { useState, useRef } from "react"; 


const HeroSection = ({onOpenModal}) => {
  const [showAllServices, setShowAllServices] = useState(false);
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };


  const services= [
   { title: "Business Consulting", img: "/bussiness-consulting.jpg" },
      { title: "Product & Margin Valuation", img: "/product-valuation.jpg" },
      { title: "Graphic & Logo Designing", img: "/graphics-designing.jpg" },
      { title: "Content Writing", img: "/content-writing.jpg" },
      { title: "Social Media Promotion & Management", img: "/social-media.jpg" },
      { title: "Digital Marketing", img: "digital-marketing.jpg" },
      { title: "Tax and Compliances", img: "/tax.jpg" },
      { title: "Company Accounting", img: "/company-accounting.jpg" },
      { title: "GST Registration & Filing", img: "/gst-registration.jpg" },
      { title: "Company Registration", img: "/company-registration.jpg" },
      { title: "Trademark Registration", img: "/trademark-registration.jpg" },
      { title: "FSSAI License Registration", img: "/fssai.jpg" },
      { title: "ISO Certification", img: "/iso.jpg" },
      { title: "Startup India Registration", img: "/startup-registration.jpg" },
      { title: "Market Analysis", img: "/market-analyses.jpg" },
      { title: "Distribution & Franchise Module", img: "/distributor-franchise.jpg" },
  ];

  // const Services = showAllServices ? servicesData : servicesData.slice(0, 4);
  // const doubledServices = [...services, ...services];

  const testimonials = [
    {
      name: "Umair Misbah",
      company: " EZDoors India Pvt Ltd",
      role: "Founder & CEO",
      content: "Koop India transformed our startup journey. Their comprehensive support helped us raise ₹2Cr in Series A funding.",
      rating: 5 ,
      image: "umair.jpg" 
    },
    {
      name: "Sarikha",
      company: "Kiro Elvi Foods Pvt Ltd",
      role: "Founder & CEO",
      content: "From business registration to digital marketing, their one-stop solution approach saved us months of effort.",
      rating: 5,
      image: "sarikha.jpg" 
    },
    {
      name: "Amir Quadri",
      company: "Foodista Spices",
      role: "Founder & CEO",
      content: "The strategic guidance and branding solutions provided by Koop India accelerated our market entry significantly.",
      rating: 5,
      image: "amir.webp" 
    }
  ];


    const handleNavigation = (href) => {
    router.push(href); 
    setIsOpen(false);
  };


  return (
    <div className="bg-[#141d32] text-white">
      {/* ------- Hero Section ------- */}

   <section className="pt-20 sm:pt-20 px-6 sm:px-6 md:px-10 lg:px-15 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-8 md:gap-10">
     <div>
    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 sm:mb-6">
      Empowering your Startup &<br />
      <span className="text-[#F97316] text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
        Business with us
      </span>
    </h1>
    <p className="text-lg sm:text-lg mb-8 sm:mb-6">
      Koop India helps startups to launch, grow, and scale with the right
      solutions, strategies, and guidance.
    </p>
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-10 mb-8 sm:mb-8">
      <Link href="#solution">
        <button className="w-full sm:w-auto bg-[#F97316] text-white px-8 sm:px-6 py-4 sm:py-3 text-lg sm:text-base rounded-lg sm:rounded font-semibold cursor-pointer">
          Explore Solutions →
        </button>
      </Link>
      <button className="w-full sm:w-auto border border-[#F97316] text-[#F97316] hover:bg-[#4e4037] px-8 sm:px-6 py-4 sm:py-3 text-lg sm:text-base rounded-lg sm:rounded font-semibold cursor-pointer"
       onClick={onOpenModal}>
        Get Started →
      </button>
    </div>
    
    {/* Action Cards */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-3 md:gap-4 mb-10 sm:mb-8 md:mb-10">
      <div className="flex items-center gap-3 sm:gap-2 bg-white text-[#141d32] px-6 sm:px-4 md:px-6 py-4 sm:py-2.5 md:py-3 rounded-xl shadow hover:bg-gray-100 border border-[#F97316]">
        <Rocket size={20} className="sm:w-5 sm:h-5" />
        <span className="font-semibold text-lg sm:text-base">Launch</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-2 bg-white text-[#141d32] px-6 sm:px-4 md:px-6 py-4 sm:py-2.5 md:py-3 rounded-xl shadow hover:bg-gray-100 border border-[#F97316]">
        <Target size={20} className="sm:w-5 sm:h-5" />
        <span className="font-semibold text-lg sm:text-base">Grow</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-2 bg-white text-[#141d32] px-6 sm:px-4 md:px-6 py-4 sm:py-2.5 md:py-3 rounded-xl shadow hover:bg-gray-100 border border-[#F97316]">
        <Zap size={20} className="sm:w-5 sm:h-5" />
        <span className="font-semibold text-lg sm:text-base">Scale</span>
      </div>
    </div>
    
    {/* Trust Section */}
    <div className="bg-white/5 p-6 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl shadow-lg border border-white/10">
      <h3 className="text-xl sm:text-xl font-semibold text-[#F97316] mb-6 sm:mb-4">
        Trusted by Innovators & Founders
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-4 md:gap-6 text-white/80 sm:text-white/70">
        <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
          50+ Startups Guided
        </div>
        <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
          ₹2Cr+ Funding
        </div>
        <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
          99% Client Satisfaction
        </div>
        <div className="p-4 sm:p-3 md:p-4 rounded-xl sm:rounded-xl bg-white/10 text-base sm:text-sm md:text-base text-center font-medium sm:font-normal">
          24x7 Founder Support
        </div>
      </div>
    </div>
  </div>
  
  {/* Right-side image placeholder */}
  <div className="hidden md:block mt-8 md:mt-0">
    <img
      src="dashboard-image.jpg"
      alt="Dashboard Preview"
      className="rounded-2xl shadow-2xl border border-gray-300 w-full h-auto"
    />
  </div>
   </section>
      
         {/* About Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#141d32] mb-6">
                About Koop India
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                India's most trusted business launchpad, empowering entrepreneurs with comprehensive solutions for sustainable growth.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Koop India is a full-spectrum business consulting and support platform that caters to startups, SMEs, and growing brands across India. We provide everything from company registration to scaling operations, ensuring your business succeeds in today's competitive market.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-[#141d32] mb-2">Our Mission</h4>
                  <p className="text-sm text-gray-600">
                    To simplify entrepreneurship by providing reliable, efficient business solutions that fuel innovation and growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#141d32] mb-2">Our Vision</h4>
                  <p className="text-sm text-gray-600">
                    To be India's leading business ecosystem that transforms every entrepreneurial dream into reality.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F97316]">100+</div>
                  <div className="text-sm text-gray-600">Clients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F97316]">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F97316]">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#F97316]/10 to-transparent p-8 rounded-2xl">
                <img 
                  src="/about1.jpeg" 
                  alt="Koop India Team" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ------- Solutions Section ------- */}

      <section
        id="solution"
        className="bg-[#141d32] text-white py-16 md:px-8 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-center mb-14 tracking-wide">
            OUR CORE SOLUTIONS
          </h1>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Strategic Business Solutions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
                  ♟
                </span>
                <h2 className="text-xl font-bold text-[#141d32]">
                  Strategic Business Solutions
                </h2>
              </div>
              <p className="text-gray-600 mb-3">
                Market insights & strategies designed for sustainable business
                growth.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Business Consulting</li>
                <li>Market Research & Analysis</li>
                <li>Product & Margin Valuation</li>
                <li>Distribution & Franchise Consultancy</li>
              </ul>
            </div>

            {/* Creative & Branding Solutions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
                  💡
                </span>
                <h2 className="text-xl font-bold text-[#141d32]">
                  Creative & Branding Solutions
                </h2>
              </div>
              <p className="text-gray-600 mb-3">
                Build a strong brand identity with compelling designs & creative
                assets.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Logo & Brand Identity Design</li>
                <li>Product Packaging Design</li>
                <li>Marketing Collaterals</li>
                <li>Social Media Creative Designs</li>
              </ul>
            </div>

            {/* Digital Growth Solutions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
                  📈
                </span>
                <h2 className="text-xl font-bold text-[#141d32]">
                  Digital Growth Solutions
                </h2>
              </div>
              <p className="text-gray-600 mb-3">
                Drive performance & generate quality leads with digital
                marketing.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Social Media Marketing</li>
                <li>Search Engine Optimization (SEO)</li>
                <li>Google & Meta Ads Management</li>
                <li>Website Design & Development</li>
              </ul>
            </div>

            {/* Tech & Automation Solutions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
                  ⚙️
                </span>
                <h2 className="text-xl font-bold text-[#141d32]">
                  Tech & Automation Solutions
                </h2>
              </div>
              <p className="text-gray-600 mb-3">
                Automate workflows & improve efficiency with smart tech
                solutions.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>CRM Software Development</li>
                <li>ERP for Business Automation</li>
                <li>E-commerce Store Setup</li>
                <li>Data Analytics & Reporting Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
     {/* ------- Services Section ------- */}
      <section className="py-20 px-6 md:px-16 bg-gray-50 relative">
  <h2 className="text-2xl md:text-3xl font-bold text-[#141d32] mb-12">
    Our Services
  </h2>

  {/* Scroll buttons */}
  <button
    onClick={scrollLeft}
    className="absolute left-8 top-1/2 -translate-y-1/2 bg-white border border-[#F97316] cursor-pointer text-[#F97316] rounded-full p-2 shadow z-10 hover:bg-[#141d32]"
  >
    &#8592; {/* Left arrow */}
  </button>
  <button
    onClick={scrollRight}
    className="absolute right-8 top-1/2 -translate-y-1/2 bg-white border border-[#F97316] cursor-pointer text-[#F97316] rounded-full p-2 shadow z-10 hover:bg-[#141d32]"
  >
    &#8594; {/* Right arrow */}
  </button>

  {/* Horizontal scrollable carousel */}
  <div
    ref={carouselRef}
    className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
  >
    {services.map((service, index) => (
      <div
        key={index}
        className="min-w-[250px] md:min-w-[280px] lg:min-w-[300px] snap-center relative rounded-xl overflow-hidden shadow hover:shadow-lg cursor-pointer h-50"
      >
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover border border-black/10 rounded-lg"
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-end justify-center pb-2">
          <h3 className="text-black font-bold rounded-lg bg-amber-100 text-lg md:text-xl text-center px-2">
            {service.title}
          </h3>
        </div>
      </div>
    ))}
  </div>
</section>

  

      {/* Testimonials */}
<section className="py-20 px-6 lg:px-8 bg-[#141d32] text-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
      <p className="text-xl text-gray-300">
        Success stories from entrepreneurs who transformed their businesses with us
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
          <div className="flex items-center mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#F97316] fill-current" />
            ))}
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            "{testimonial.content}"
          </p>
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center space-x-4">
              {/* Client Image */}
              <div className="flex-shrink-0">
                <img
                  src={testimonial.image || `/client-${index + 1}.jpg`}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F97316]/20"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=F97316&color=fff&size=48`;
                  }}
                />
              </div>
              
              {/* Client Info */}
              <div className="flex-1">
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-[#F97316] text-sm">{testimonial.role}</div>
                <div className="text-sm text-gray-400">{testimonial.company}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ------- Section -------- */}
      <div>
         {/* CTA Section */}
              <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-[#F97316] to-[#e5650d] text-white">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-xl text-white/90 mb-8">
                    Join 100+ successful entrepreneurs who chose Koop India as their growth partner. 
                    Get started with a free consultation today.
                  </p>
                  
                  <div className=" sm:flex-row gap-4 justify-center items-center">
                    <button className="bg-white text-[#F97316] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                     onClick={onOpenModal}>
                      Schedule Free Consultation
                    </button>
                  </div>
        
                  <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-white/80">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Free Consultation
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      No Hidden Charges
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      24/7 Support
                    </div>
                  </div>
                </div>
              </section>
      </div>

     
      
    </div>
  );
};

export default HeroSection;
