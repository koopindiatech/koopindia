"use client";
import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, ArrowRight, ShieldCheck, 
  Instagram, Facebook, Linkedin, 
  Video, PenTool, Users, MapPin, 
  TrendingUp, Award, Target, MessageCircle, ChevronDown,
  Megaphone, Smartphone, PlayCircle, Youtube
} from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function SocialMediaMarketingPage() {
  const { onOpenModal } = useModal();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    {
      title: "Social Media Management",
      desc: "End-to-end social media management services in Delhi to build your brand’s voice, engage with followers, and maintain a consistent posting schedule across all platforms.",
      icon: <Target className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "Instagram Marketing",
      desc: "Top-tier Instagram marketing services in Delhi and Noida. We craft stunning grids, engaging stories, and high-converting campaigns to turn followers into loyal customers.",
      icon: <Instagram className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "Facebook Marketing",
      desc: "Comprehensive Facebook marketing services in Delhi to reach targeted demographics, run highly optimized groups, and build thriving communities for your business.",
      icon: <Facebook className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "LinkedIn Marketing",
      desc: "B2B social media marketing agency in Gurgaon & Delhi focusing on lead generation, professional networking, and thought leadership for corporate brands.",
      icon: <Linkedin className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "Social Media Advertising",
      desc: "As a leading social media advertising agency in Delhi and Gurgaon, we run highly profitable paid ad campaigns on FB, Insta, and LinkedIn with maximum ROI.",
      icon: <Megaphone className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "Reels Marketing",
      desc: "Partner with the best Instagram reels marketing agency in Delhi. We script, shoot, and edit viral-worthy short-form video content to skyrocket your organic reach.",
      icon: <PlayCircle className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "Social Media Content Creation",
      desc: "Professional social media content creation services in Delhi, Noida, and Gurgaon. Graphics, carousels, videos, and copywriting that perfectly align with your brand.",
      icon: <PenTool className="w-8 h-8 text-[#F97316]" />
    },
    {
      title: "Influencer Marketing",
      desc: "We connect you with niche influencers and micro-influencers across Delhi NCR to build trust, drive immediate sales, and enhance your brand's credibility.",
      icon: <Users className="w-8 h-8 text-[#F97316]" />
    }
  ];

  const faqs = [
    {
      q: "What makes you the best social media marketing agency in Delhi NCR?",
      a: "We don't just post content; we build data-driven strategies. As a leading social media marketing company in Delhi, we focus on actual business metrics like lead generation, website traffic, and conversions, rather than just vanity metrics like likes."
    },
    {
      q: "Do you offer affordable social media marketing packages in Delhi?",
      a: "Yes! We specialize in social media marketing for small businesses in Delhi NCR. Our affordable social media marketing services in Delhi are customized based on your budget, ensuring you get maximum ROI without overspending."
    },
    {
      q: "Can you help my business in Noida specifically?",
      a: "Absolutely. We are a prominent social media marketing agency in Noida, helping clients in Sector 62, Sector 63, and beyond. We understand the local market and provide tailored social media management services in Noida."
    },
    {
      q: "Do you handle B2B social media marketing in Gurgaon?",
      a: "Yes, we are a highly sought-after B2B social media marketing agency in Gurgaon. Whether you are based in Cyber City or Sector 44, our LinkedIn marketing and social media advertising agency in Gurgaon will help you generate high-quality B2B leads."
    },
    {
      q: "What is included in your social media content creation services?",
      a: "Our social media content creation services in Delhi NCR include graphic design, copywriting, Instagram Reels production, video editing, and interactive story creation. We handle everything from ideation to publishing."
    }
  ];

  return (
    <>
      <Head>
        <title>Social Media Marketing Services in Delhi NCR | Koop India</title>
        <meta name="description" content="Looking for the best social media marketing agency in Delhi, Noida, or Gurugram? We offer Instagram, Facebook, and LinkedIn marketing for small businesses." />
        <meta name="keywords" content="social media marketing services in Delhi, social media marketing agency in Delhi, social media marketing company in Delhi, social media marketing services Delhi NCR" />
      </Head>

      <div className="font-sans bg-white overflow-hidden text-gray-800">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-16 pb-14  bg-[#0a1128] overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#F97316] opacity-15 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Text */}
              <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                {/* <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm mb-8 backdrop-blur-sm shadow-xl"
                >
                  <span className="flex h-2 w-2 rounded-full bg-[#F97316] animate-pulse"></span>
                  Top-Rated Social Media Agency in Delhi NCR
                </motion.div> */}
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-5xl  font-extrabold text-white leading-[1.15] mb-6"
                >
                  <span className="text-[#F97316] relative">
                    Social Media Marketing
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#F97316]/30 hidden sm:block" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
                  </span> Services in Delhi
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-light"
                >
                  Transform your digital presence with the leading agency in Delhi. We craft viral content, manage vibrant communities, and run high-converting ad campaigns.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-10"
                >
                  <button 
                    onClick={onOpenModal}
                    className="w-full sm:w-auto px-8 py-4 bg-[#F97316] text-white rounded-xl font-bold text-lg hover:bg-[#e86611] hover:-translate-y-1 transition-all shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2"
                  >
                    Get a Free Audit <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={onOpenModal}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                  >
                    View Packages
                  </button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-400"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>Data-Driven</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>ROI Focused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>100+ Brands</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Visual Composition */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative hidden lg:block h-[550px] w-full"
              >
                {/* Main Glassy Plate */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[480px] rounded-[40px] border border-white/10 shadow-2xl z-10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-2xl overflow-hidden flex flex-col items-center justify-center">
                  
                  {/* Background Glows inside the plate */}
                  <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-pink-500/30 blur-[60px] rounded-full"></div>
                  <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-blue-500/30 blur-[60px] rounded-full"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                  {/* Central Hub Icon */}
                  <div className="relative z-20 w-24 h-24 bg-gradient-to-br from-[#F97316] to-pink-600 rounded-3xl shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center mb-10 border border-white/20 mt-4">
                    <Megaphone className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Mock UI elements */}
                  <div className="relative z-20 w-[80%] h-12 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center px-4 backdrop-blur-md shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-white/20 rounded-full mb-1"></div>
                      <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="h-6 w-16 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="h-1.5 w-8 bg-white/30 rounded-full"></div>
                    </div>
                  </div>

                  <div className="relative z-20 w-[80%] h-12 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center px-4 backdrop-blur-md shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center mr-3">
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-20 bg-white/20 rounded-full mb-1"></div>
                      <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="h-6 w-16 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="h-1.5 w-8 bg-white/30 rounded-full"></div>
                    </div>
                  </div>

                  <div className="relative z-20 w-[80%] h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 backdrop-blur-md shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center mr-3">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-28 bg-white/20 rounded-full mb-1"></div>
                      <div className="h-2 w-12 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="h-6 w-16 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="h-1.5 w-8 bg-white/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* Floating Stats on Image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Total Reach</p>
                        <p className="text-2xl font-black text-white">2.4M+</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements (Framer Motion logic for bobbing effect) */}
                <motion.div 
                  animate={{ y: [0, -20, 0], rotate: [12, 15, 12] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-[10%] right-[0%] z-20 w-20 h-20 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-[20px] shadow-2xl flex items-center justify-center border border-white/30"
                >
                  <Instagram className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0], rotate: [-12, -8, -12] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[20%] left-[8%] z-20 w-16 h-16 bg-gradient-to-tr from-[#1877F2] to-[#145CB3] rounded-[16px] shadow-2xl flex items-center justify-center border border-white/30"
                >
                  <Facebook className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [6, 10, 6] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 2 }}
                  className="absolute top-[35%] left-[5%] z-20 w-14 h-14 bg-gradient-to-tr from-[#0A66C2] to-cyan-500 rounded-[14px] shadow-2xl flex items-center justify-center border border-white/30"
                >
                  <Linkedin className="w-7 h-7 text-white" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0], rotate: [-5, -15, -5] }} 
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
                  className="absolute bottom-[10%] right-[5%] z-20 w-16 h-16 bg-gradient-to-tr from-[#FF0000] to-[#CC0000] rounded-[16px] shadow-2xl flex items-center justify-center border border-white/30"
                >
                  <Youtube className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>
          

        </section>

        {/* ================= INTRODUCTION ================= */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1128] mb-6 leading-tight">
                Your Trusted Social Media Marketing Agency in Delhi NCR
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                In today’s hyper-competitive digital landscape, just having a profile isn't enough. As the premier <strong className="text-gray-900">social media marketing agency in Delhi NCR</strong>, we help brands stand out, build loyalty, and drive revenue through strategic organic and paid campaigns.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Whether you need comprehensive <strong className="text-gray-900">social media management services in Delhi</strong>, aggressive lead generation, or stunning <strong className="text-gray-900">social media content creation services Delhi</strong>, our expert team delivers results that matter.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Data-Driven Strategies", 
                  "Creative Excellence", 
                  "Transparent Reporting", 
                  "Dedicated Account Managers"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#16a34a] flex-shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img 
                src="/banner/social-media-banner.png" 
                alt="Social Media Marketing Agency in Delhi NCR" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

            </motion.div>
          </div>
        </section>

        {/* ================= SERVICES WE OFFER ================= */}
        <section className="py-24 px-4 sm:px-6 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm">Our Core Expertise</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1128] mt-3 mb-6">
                Social Media Marketing Services We Offer
              </h2>
              <p className="text-gray-600 text-lg">
                From organic growth to high-ROI paid campaigns, our <strong className="text-gray-900">social media marketing services in Delhi</strong> cover every aspect of your brand's digital journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((srv, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#F97316]/30 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#F97316] transition-all">
                    {React.cloneElement(srv.icon, { className: "w-8 h-8 text-[#F97316] group-hover:text-white transition-colors" })}
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1128] mb-3">{srv.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{srv.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LOCATION SPECIFIC SECTIONS ================= */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* NOIDA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-0 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-[#F97316] w-8 h-8" />
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1128]">
                    Social Media Marketing Services in Noida
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Looking for a top-rated <strong className="text-gray-900">social media marketing agency in Noida</strong>? We empower local businesses, startups, and IT enterprises across Noida with cutting-edge digital strategies. 
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Whether you need an <strong className="text-gray-900">Instagram marketing agency Noida</strong>, or comprehensive <strong className="text-gray-900">social media management services Noida</strong>, our team is equipped to deliver. We actively serve businesses seeking a reliable <strong className="text-gray-900">social media marketing agency Sector 62 Noida</strong> and <strong className="text-gray-900">Sector 63 Noida</strong>.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> Affordable social media marketing agency Noida
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> Social media content creation Noida
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#F97316]" /> Social media advertising agency Noida
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* GURUGRAM */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0a1128] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/50 rounded-bl-full -z-0"></div>
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-blue-400 w-8 h-8" />
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                    Social Media Marketing Services in Gurugram
                  </h2>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Gurgaon is the hub of corporate innovation. As a premier <strong className="text-white">social media marketing agency in Gurugram</strong>, we specialize in elevating corporate brands, real estate firms, and B2B enterprises.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  From being the go-to <strong className="text-white">B2B social media marketing agency Gurgaon</strong> to providing exceptional <strong className="text-white">Instagram marketing services Gurgaon</strong>, we dominate the landscape. We partner with clients looking for a <strong className="text-white">social media marketing agency Cyber City Gurgaon</strong> or <strong className="text-white">Sector 44 Gurgaon</strong>.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <CheckCircle className="w-4 h-4 text-blue-400" /> Social media management services Gurgaon
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <CheckCircle className="w-4 h-4 text-blue-400" /> Social media content creation Gurgaon
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    <CheckCircle className="w-4 h-4 text-blue-400" /> Social media advertising agency Gurgaon
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= SMALL BUSINESS & PRICING ================= */}
        <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#eff6ff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1128] mb-4">
                  Social Media Marketing for Small Businesses in Delhi NCR
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Small businesses need high impact without massive budgets. Our <strong className="text-gray-900">social media marketing for small business Delhi</strong> is designed specifically to drive local footfall, generate targeted inquiries, and build community trust fast and effectively.
                </p>
                <button onClick={onOpenModal} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 transition-colors">
                  Grow Your Small Business <ArrowRight size={18} />
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#F97316] p-10 rounded-3xl shadow-lg text-white relative overflow-hidden"
              >
                <div className="absolute right-[-50px] bottom-[-50px] opacity-10">
                  <Award className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                    Affordable Social Media Marketing Packages in Delhi
                  </h2>
                  <p className="text-white/90 leading-relaxed mb-6">
                    Premium quality shouldn't always mean premium pricing. As a trusted <strong className="text-white">social media marketing company in Delhi</strong>, we offer <strong className="text-white">affordable social media marketing services in Delhi</strong>. Get custom-tailored packages that perfectly align with your growth objectives.
                  </p>
                  <button onClick={onOpenModal} className="bg-white text-[#F97316] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-md">
                    Request a Custom Quote
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1128] mb-6">
              Why Choose Our Social Media Marketing Agency?
            </h2>
            <p className="text-gray-600 text-lg">
              We aren't just another agency; we are your growth partners in the digital space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "ROI-Focused Approach", d: "We focus on real metrics that impact your bottom line—leads, sales, and conversions." },
              { t: "Local Expertise", d: "Deep understanding of the Delhi, Noida, and Gurugram demographics and consumer behavior." },
              { t: "Creative Storytelling", d: "Engaging content that captures attention in a crowded feed, backed by top-tier design." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-[#F97316]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1128] mb-3">{feature.t}</h3>
                <p className="text-gray-600">{feature.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1128] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">Got questions? We've got answers about our social media services.</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:border-[#F97316]/50 transition-colors"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-[#0a1128] pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-[#F97316]" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto bg-[#0a1128] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl  font-extrabold text-white mb-6">
                Ready to Dominate Social Media?
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                Partner with the top <strong className="text-white">social media marketing agency in Delhi NCR</strong> and watch your brand grow exponentially.
              </p>
              <button 
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-white rounded-xl font-bold text-lg hover:bg-[#e86611] transition-all shadow-lg hover:shadow-[#F97316]/30 hover:-translate-y-1"
              >
                Let's Discuss Your Project <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
