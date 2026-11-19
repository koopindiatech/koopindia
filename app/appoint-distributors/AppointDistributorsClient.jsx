"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getCountFromServer,
} from "firebase/firestore";
import { addEnquiry } from "@/lib/enquiryService";
import { CATEGORIES } from "@/lib/categoryAccess";

const generateSlug = (...candidates) => {
  for (const c of candidates) {
    if (!c || typeof c !== "string") continue;
    const s = c
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (s.length >= 2) return s;
  }
  return "";
};

const generatePortalPassword = () =>
  `Koop@${Math.floor(1000 + Math.random() * 9000)}`;

async function sendRegistrationCredentialsEmail({
  to,
  name,
  companyName,
  password,
  role,
  profileId,
}) {
  if (!to || !password) return;
  try {
    await fetch("/api/email/send-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: to.toLowerCase().trim(),
        name: name || "Partner",
        companyName: companyName || "",
        password,
        role: role || "seller",
        profileId: profileId || "",
      }),
    });
  } catch (err) {
    console.warn("Failed to dispatch credentials email:", err);
  }
}

const BENEFITS = [
  {
    icon: "⌂",
    title: "Digital Brand Presence",
    desc: "A dedicated, subdomain-based four-page website to present your brand and distributor opportunity.",
  },
  {
    icon: "▦",
    title: "Centralised Brand Dashboard",
    desc: "A dedicated workspace to manage brand information, enquiries and distributor lead activity.",
  },
  {
    icon: "◉",
    title: "Marketing & Promotion",
    desc: "Digital marketing and promotional activities designed to create awareness and attract distributor enquiries.",
  },
  {
    icon: "♧",
    title: "Relationship Management",
    desc: "A dedicated relationship manager to coordinate communication and keep the process moving.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Register on Koop India Marketplace",
    desc: "Submit your brand details, product information and distribution requirements to get started.",
  },
  {
    num: "02",
    title: "Get Your 4-Page Brand Website",
    desc: "Koop India creates a subdomain-based website to showcase your company, products and distributor opportunity.",
  },
  {
    num: "03",
    title: "Access Your Brand Dashboard",
    desc: "Your dedicated brand dashboard helps organise brand information, enquiries and lead activity.",
  },
  {
    num: "04",
    title: "Marketing & Brand Promotion",
    desc: "We promote your brand through suitable digital marketing activities to generate distributor enquiries.",
  },
  {
    num: "05",
    title: "Circulate Your Requirement",
    desc: "Your distributor requirement is shared with relevant members of Koop India's existing distributor network.",
  },
  {
    num: "06",
    title: "Dedicated Relationship Manager",
    desc: "A relationship manager coordinates the process, supports communication and follows up on lead progress.",
  },
  {
    num: "07",
    title: "Receive Verified Distributor Leads",
    desc: "Get distributor enquiries that go through a verification process before being shared with your brand.",
  },
  {
    num: "08",
    title: "Connect, Evaluate & Onboard",
    desc: "Your team connects with the leads, discusses commercial terms and selects suitable distributors for onboarding.",
  },
];

const PLATFORM_FEATURES = [
  {
    title: "Subdomain-Based 4-Page Website",
    desc: "Showcase your company profile, products, about information and distributor opportunity.",
  },
  {
    title: "Dedicated Brand Dashboard",
    desc: "Keep key brand and distributor enquiry information organised in one place.",
  },
  {
    title: "Lead Activity & Coordination",
    desc: "Make it easier to review shared enquiries and coordinate follow-up with your team.",
  },
  {
    title: "Relationship Manager Support",
    desc: "Get a dedicated point of contact for process coordination and updates.",
  },
];

const GROWTH_CHANNELS = [
  {
    icon: "◎",
    title: "Digital Marketing & Promotion",
    desc: "Build brand visibility and attract relevant distributor enquiries through planned digital promotional activities.",
  },
  {
    icon: "♧",
    title: "Existing Distributor Network",
    desc: "Circulate your brand's requirements among relevant distributors in the Koop India network.",
  },
  {
    icon: "✓",
    title: "Lead Verification & Sharing",
    desc: "Screen distributor enquiries and share relevant, verified lead details for your team's evaluation.",
  },
];

const WHY_POINTS = [
  {
    num: "01",
    title: "One Coordinated Process",
    desc: "Bring registration, promotion and lead coordination together.",
  },
  {
    num: "02",
    title: "Professional Brand Presence",
    desc: "Present your brand and opportunity through a dedicated website.",
  },
  {
    num: "03",
    title: "Relevant Lead Focus",
    desc: "Prioritise distributor enquiries aligned with your stated requirements.",
  },
  {
    num: "04",
    title: "Human Relationship Support",
    desc: "Work with a dedicated point of contact for coordination.",
  },
];

const FAQS = [
  {
    q: "Who can register for distributor appointment services?",
    a: "Manufacturers, brand owners and businesses looking to appoint distributors or expand their existing distribution network can enquire about the service.",
  },
  {
    q: "What does the four-page brand website include?",
    a: "Koop India sets up a subdomain-based website to present your brand, company information, products and distributor opportunity. The exact page structure and content are finalised during onboarding.",
  },
  {
    q: "What is the Brand Dashboard used for?",
    a: "The dedicated dashboard is intended to organise your brand information and distributor lead activity, helping your team review and coordinate the process.",
  },
  {
    q: "How does Koop India generate distributor enquiries?",
    a: "Activities may include digital marketing and promotion, along with circulation of your brand's distributor requirement through relevant members of the existing distributor network.",
  },
  {
    q: "Are distributor leads verified?",
    a: "Distributor enquiries go through a verification process before being shared. Your brand should independently assess commercial suitability, credentials and final terms before appointment.",
  },
  {
    q: "Does Koop India guarantee distributor appointments?",
    a: "No specific number of leads or distributor appointments should be assumed or guaranteed. Results depend on factors such as product-market fit, territory, margins, pricing, demand and the brand's commercial decisions.",
  },
];

export default function AppointDistributorsClient() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    category: "",
    markets: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [createdProfileId, setCreatedProfileId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setCreatedProfileId("");

    try {
      const cleanName = formData.name.trim();
      const cleanCompany = formData.company.trim();
      const cleanPhone = formData.phone.trim();
      const cleanEmail = formData.email.toLowerCase().trim();
      const cleanCategory = formData.category || "";
      const cleanMarkets = formData.markets || "";
      const cleanMessage = formData.message.trim();
      const combinedRequirements = [
        cleanMarkets ? `Target Market: ${cleanMarkets}` : "",
        cleanMessage,
      ]
        .filter(Boolean)
        .join(" | ");

      // 1. Generate Seller Profile ID, Slug & Portal Password
      const countSnap = await getCountFromServer(collection(db, "sellers"));
      const profileId = `KIS${String(countSnap.data().count + 1).padStart(5, "0")}`;
      const sellerSlug =
        generateSlug(
          cleanCompany,
          cleanName,
          cleanEmail ? cleanEmail.split("@")[0] : "",
          profileId
        ) || `seller-${profileId.toLowerCase()}`;
      const portalPassword = generatePortalPassword();

      // 2. Create Seller Listing in "sellers" collection (same flow as Seller Registration)
      const sellerDocRef = await addDoc(collection(db, "sellers"), {
        profileId,
        name: cleanCompany || cleanName,
        companyName: cleanCompany || cleanName,
        contact: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        password: portalPassword,
        category: cleanCategory,
        subcategory: "",
        businessType: "Brand Owner",
        targetMarket: cleanMarkets,
        requirements: combinedRequirements,
        about: cleanMessage,
        status: "paused",
        source: "appoint_distributors_page",
        slug: sellerSlug,
        createdAt: serverTimestamp(),
      });

      // 3. Create Lead in "leads" collection
      await addDoc(collection(db, "leads"), {
        profileId,
        name: cleanName || cleanCompany || "Unknown",
        company: cleanCompany,
        email: cleanEmail,
        phone: cleanPhone,
        category: cleanCategory || "Appoint Distributors",
        location: cleanMarkets,
        service: "Appoint Distributors",
        requirements: combinedRequirements,
        source: "appoint_distributors_page",
        status: "New",
        createdAt: serverTimestamp(),
        sellerId: sellerDocRef.id,
        sellerSlug,
        sellerName: cleanCompany || cleanName,
        assignedToSellerSlug: null,
        assignedToSellerName: null,
        assignedTo: null,
      });

      // 4. Create Enquiry in "enquiries" collection
      await addEnquiry({
        name: cleanName,
        company: cleanCompany,
        phone: cleanPhone,
        email: cleanEmail,
        category: cleanCategory || "Appoint Distributors",
        targetMarket: cleanMarkets,
        service: "Appoint Distributors",
        requirements: combinedRequirements,
        source: "appoint-distributors-page",
        sellerId: sellerDocRef.id,
        sellerSlug,
        sellerProfileId: profileId,
      });

      // 5. Create Seller Portal Credentials in "seller_users" & Dispatch Welcome Email
      if (cleanEmail) {
        await addDoc(collection(db, "seller_users"), {
          name: cleanName || cleanCompany,
          email: cleanEmail,
          password: portalPassword,
          status: "active",
          linkedId: sellerDocRef.id,
          linkedSlug: sellerSlug,
          role: "seller",
          createdAt: serverTimestamp(),
        });

        await sendRegistrationCredentialsEmail({
          to: cleanEmail,
          name: cleanName || cleanCompany,
          companyName: cleanCompany,
          password: portalPassword,
          role: "seller",
          profileId,
        });
      }

      setCreatedProfileId(profileId);
      setSubmitStatus("success");
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        category: "",
        markets: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit distributor enquiry:", err);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#17243b] leading-[1.6] pb-16 md:pb-0 font-sans">
      <main>
        {/* ── HERO ── */}
        <section
          id="home"
          className="relative overflow-hidden bg-[linear-gradient(115deg,#101a30_0%,#142d5b_56%,#06449d_100%)] text-white pt-[62px] pb-[52px] md:pt-[86px] md:pb-[80px] scroll-mt-20"
        >
          {/* Decorative concentric rings */}
          <div className="pointer-events-none absolute w-[580px] h-[580px] -right-[170px] -top-[260px] rounded-full border border-white/[0.09]" />
          <div className="pointer-events-none absolute w-[420px] h-[420px] -right-[90px] -top-[180px] rounded-full border border-white/[0.09]" />

          <div className="relative z-10 mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))] grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-6 lg:gap-[54px] items-center">
            <div>
              <div className="inline-flex items-center gap-[9px] uppercase tracking-[0.14em] text-[10px] font-black text-[#ffb27e]">
                <span className="inline-block w-6 h-[2px] bg-[#ff6900]" />
                Distributor appointment services
              </div>

              <h1 className="text-[39px] sm:text-[clamp(38px,5.1vw,62px)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white mt-[19px] mb-[22px] max-w-[690px]">
                Build Your Distribution Network.{" "}
                <span className="text-[#ff8b3c]">Grow Across India.</span>
              </h1>

              <p className="text-[#d3deef] text-[14px] md:text-[16px] max-w-[570px] leading-[1.8]">
                From brand registration to verified distributor leads, Koop India
                helps manufacturers and brand owners build a stronger
                distribution network with a structured, technology-enabled
                approach.
              </p>

              <div className="flex flex-wrap gap-[13px] my-[30px]">
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-[9px] px-[21px] py-[13px] rounded-[10px] font-extrabold text-[13px] bg-[#ff6900] text-white shadow-[0_9px_22px_rgba(255,105,0,0.22)] hover:bg-[#e95e00] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started Today <span>↗</span>
                </a>
                <a
                  href="#process"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-[9px] px-[21px] py-[13px] rounded-[10px] font-extrabold text-[13px] border border-white/35 text-white bg-transparent hover:bg-white hover:text-[#141d32] transition-all duration-200"
                >
                  Explore Our Process <span>↓</span>
                </a>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-[22px] text-[#dbe5f4] text-[12px] font-semibold">
                <span className="inline-flex items-center gap-[7px]">
                  <span className="w-[17px] h-[17px] rounded-full inline-grid place-items-center bg-[#ff6900]/20 text-[#ff9a5b] text-[11px]">
                    ✓
                  </span>
                  Dedicated relationship manager
                </span>
                <span className="inline-flex items-center gap-[7px]">
                  <span className="w-[17px] h-[17px] rounded-full inline-grid place-items-center bg-[#ff6900]/20 text-[#ff9a5b] text-[11px]">
                    ✓
                  </span>
                  Verified distributor leads
                </span>
                <span className="inline-flex items-center gap-[7px]">
                  <span className="w-[17px] h-[17px] rounded-full inline-grid place-items-center bg-[#ff6900]/20 text-[#ff9a5b] text-[11px]">
                    ✓
                  </span>
                  Pan-India reach
                </span>
              </div>
            </div>

            {/* Right Visual Illustration */}
            <div
              className="relative min-h-[315px] sm:min-h-[350px] md:min-h-[420px] grid place-items-center mt-1 md:mt-0"
              aria-label="Illustration of a distributor lead dashboard"
            >
              {/* Dashed Orbit Ring */}
              <div className="absolute w-[265px] h-[265px] sm:w-[300px] sm:h-[300px] md:w-[370px] md:h-[370px] border border-dashed border-white/25 rounded-full">
                <span className="absolute top-[43px] left-[45px] w-3 h-3 rounded-full bg-[#ff6900] shadow-[0_0_0_8px_rgba(255,105,0,0.13)]" />
                <span className="absolute right-[22px] bottom-[75px] w-3 h-3 rounded-full bg-[#6da9ff] shadow-[0_0_0_8px_rgba(109,169,255,0.13)]" />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute left-[-3px] sm:left-0 md:-left-1 top-[28px] md:top-[50px] z-20 bg-white text-[#17243b] rounded-[13px] px-[11px] py-[9px] sm:px-[15px] sm:py-[12px] shadow-[0_15px_35px_rgba(0,0,0,0.18)] text-[10px] font-extrabold">
                <b className="block text-[#00348c] text-[18px] leading-tight">
                  360°
                </b>
                Brand growth support
              </div>

              {/* Floating Card 2 */}
              <div className="absolute right-[-3px] sm:right-0 md:-right-2.5 bottom-[25px] md:bottom-[48px] z-20 bg-white text-[#17243b] rounded-[13px] px-[11px] py-[9px] sm:px-[15px] sm:py-[12px] shadow-[0_15px_35px_rgba(0,0,0,0.18)] text-[10px] font-extrabold">
                <b className="block text-[#00348c] text-[18px] leading-tight">
                  1:1
                </b>
                Relationship support
              </div>

              {/* Rotated Dashboard Card */}
              <div className="relative z-10 w-full max-w-[365px] md:max-w-[410px] bg-white text-[#17243b] rounded-[20px] p-[15px] sm:p-[21px] shadow-[0_30px_90px_rgba(0,0,0,0.3)] rotate-2">
                <div className="flex justify-between items-center mb-[19px]">
                  <div>
                    <div className="text-[13px] font-black text-[#17243b]">
                      Brand Performance
                    </div>
                    <div className="text-[10px] text-[#8190a6] mt-0.5">
                      Your distribution workspace
                    </div>
                  </div>
                  <span className="text-[9px] text-[#16845a] bg-[#e8f7ef] px-[9px] py-[5px] rounded-full font-extrabold">
                    ● LIVE OVERVIEW
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-[9px]">
                  <div className="bg-[#f4f7fc] py-[13px] px-[10px] rounded-[12px]">
                    <strong className="block text-[21px] font-extrabold text-[#00348c] tracking-[-0.04em]">
                      08
                    </strong>
                    <span className="text-[9px] text-[#78869b] font-bold">
                      Growth stages
                    </span>
                  </div>
                  <div className="bg-[#f4f7fc] py-[13px] px-[10px] rounded-[12px]">
                    <strong className="block text-[21px] font-extrabold text-[#00348c] tracking-[-0.04em]">
                      24/7
                    </strong>
                    <span className="text-[9px] text-[#78869b] font-bold">
                      Dashboard access
                    </span>
                  </div>
                  <div className="bg-[#f4f7fc] py-[13px] px-[10px] rounded-[12px]">
                    <strong className="block text-[21px] font-extrabold text-[#00348c] tracking-[-0.04em]">
                      1:1
                    </strong>
                    <span className="text-[9px] text-[#78869b] font-bold">
                      Dedicated support
                    </span>
                  </div>
                </div>

                <div className="relative h-[116px] mt-4 mb-[13px] bg-gradient-to-b from-[#edf4ff] to-white rounded-[12px] overflow-hidden p-3">
                  <div className="text-[9px] text-[#75849b] font-extrabold">
                    Lead generation activity · Illustrative
                  </div>
                  <svg
                    viewBox="0 0 340 90"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute top-6 left-2 right-2 bottom-1 w-[calc(100%-16px)] h-[82px]"
                  >
                    <defs>
                      <linearGradient
                        id="adpChartFill"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#2e77df"
                          stopOpacity="0.28"
                        />
                        <stop
                          offset="100%"
                          stopColor="#2e77df"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 70 C28 66 35 53 61 59 S98 35 122 46 S160 18 185 35 S225 17 250 24 S300 7 340 10 L340 90 L0 90Z"
                      fill="url(#adpChartFill)"
                    />
                    <path
                      d="M0 70 C28 66 35 53 61 59 S98 35 122 46 S160 18 185 35 S225 17 250 24 S300 7 340 10"
                      fill="none"
                      stroke="#2468c8"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-[9px] border-t border-[#edf0f5] pt-2.5 mt-1">
                  <div className="w-7 h-7 rounded-[9px] bg-[#e5efff] text-[#00348c] grid place-items-center text-[10px] font-black">
                    AD
                  </div>
                  <div className="flex-1">
                    <b className="block text-[10px] font-bold text-[#17243b]">
                      Distributor lead management
                    </b>
                    <small className="text-[9px] text-[#8794a8]">
                      Organised brand enquiry pipeline
                    </small>
                  </div>
                  <span className="text-[8px] text-[#13845b] bg-[#eaf8f1] rounded-full px-[7px] py-1 font-black">
                    VERIFIED FLOW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div className="border-b border-[#e3e9f2] py-5 bg-white">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))] flex justify-center md:justify-between items-center gap-[18px] flex-wrap">
            <span className="w-full md:w-auto text-center md:text-left text-[10px] uppercase tracking-[0.13em] font-black text-[#8995a8]">
              A structured growth partner for brands
            </span>
            <span className="text-[12px] font-extrabold text-[#516079] inline-flex items-center gap-2">
              <span className="text-[#ff6900] text-[17px]">✦</span> Brand
              onboarding
            </span>
            <span className="text-[12px] font-extrabold text-[#516079] inline-flex items-center gap-2">
              <span className="text-[#ff6900] text-[17px]">⌂</span> Digital
              presence
            </span>
            <span className="text-[12px] font-extrabold text-[#516079] inline-flex items-center gap-2">
              <span className="text-[#ff6900] text-[17px]">◎</span> Lead
              generation
            </span>
            <span className="text-[12px] font-extrabold text-[#516079] inline-flex items-center gap-2">
              <span className="text-[#ff6900] text-[17px]">↗</span> Network
              expansion
            </span>
          </div>
        </div>

        {/* ── BENEFITS ── */}
        <section
          id="benefits"
          className="py-[66px] md:py-[88px] scroll-mt-20 bg-white"
        >
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))]">
            <div className="text-center max-w-[720px] mx-auto mb-[46px]">
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                One partner. Complete support.
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#141d32] mt-3 mb-3.5">
                Everything Your Brand Needs to Expand Distribution
              </h2>
              <p className="text-[#63718a] text-[14px] leading-[1.8]">
                Bring your brand, marketing and distributor development
                activities together with one coordinated growth solution.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[11px] md:gap-4">
              {BENEFITS.map((item) => (
                <article
                  key={item.title}
                  className="p-[18px_15px] md:px-[21px] md:py-6 border border-[#e3e9f2] rounded-[17px] bg-white transition-all duration-200 hover:-translate-y-[5px] hover:shadow-[0_18px_55px_rgba(20,29,50,0.10)] hover:border-[#c9d8f2]"
                >
                  <div className="w-[43px] h-[43px] rounded-[13px] bg-[#edf3ff] text-[#00348c] grid place-items-center text-[19px] font-extrabold mb-[17px]">
                    {item.icon}
                  </div>
                  <h3 className="text-[15px] font-extrabold text-[#141d32] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-[#63718a] leading-[1.7]">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8-STEP PROCESS ── */}
        <section
          id="process"
          className="py-[66px] md:py-[88px] bg-[#f3f6fb] scroll-mt-20"
        >
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))]">
            <div className="text-center max-w-[720px] mx-auto mb-[46px]">
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                Your growth journey
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#141d32] mt-3 mb-3.5">
                Our 8-Step Distributor Appointment Process
              </h2>
              <p className="text-[#63718a] text-[14px] leading-[1.8]">
                A clear, step-by-step workflow that takes your brand from
                registration to distributor conversations and onboarding.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[11px] md:gap-4 relative">
              {STEPS.map((step, idx) => {
                const isOrange = idx % 4 === 1 || idx % 4 === 2;
                return (
                  <article
                    key={step.num}
                    className="relative overflow-hidden bg-white border border-[#e5ebf4] rounded-[17px] px-[15px] py-[18px] md:px-5 md:py-[22px] min-h-[225px] sm:min-h-[210px] md:min-h-[208px]"
                  >
                    {/* Watermark Step Number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute right-[13px] top-[5px] text-[58px] leading-none font-black text-[#f1f4f9] z-0"
                    >
                      {step.num}
                    </span>

                    <div className="relative z-10">
                      <div
                        className={`w-[31px] h-[31px] rounded-[10px] text-white grid place-items-center text-[11px] font-black mb-[17px] ${
                          isOrange ? "bg-[#ff6900]" : "bg-[#00348c]"
                        }`}
                      >
                        {step.num}
                      </div>
                      <h3 className="text-[13px] sm:text-[14px] font-extrabold leading-[1.35] text-[#141d32] mb-[9px]">
                        {step.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-[#63718a] leading-[1.7]">
                        {step.desc}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="text-center mt-[27px] text-[12px] text-[#738199]">
              <b className="font-bold text-[#00348c]">
                Koop India builds the opportunity pipeline.
              </b>{" "}
              Final commercial discussions and distributor appointments are
              completed by the brand.
            </p>
          </div>
        </section>

        {/* ── DEDICATED DIGITAL PLATFORM ── */}
        <section
          id="dashboard"
          className="py-[66px] md:py-[88px] scroll-mt-20 bg-white"
        >
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))] grid grid-cols-1 md:grid-cols-2 gap-[35px] lg:gap-[65px] items-center">
            <div>
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                Your brand. One workspace.
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#141d32] mt-3 mb-3.5 max-w-[500px]">
                A Dedicated Digital Platform for Your Brand
              </h2>
              <p className="text-[14px] text-[#63718a] leading-[1.8]">
                Give your brand a professional digital presence and a central
                place to manage its distributor development journey.
              </p>

              <div className="grid gap-[15px] mt-[25px] mb-[29px]">
                {PLATFORM_FEATURES.map((feat) => (
                  <div key={feat.title} className="flex gap-3 items-start">
                    <span className="flex-none w-[23px] h-[23px] rounded-full bg-[#eaf2ff] text-[#00348c] inline-grid place-items-center text-[13px] font-bold">
                      ✓
                    </span>
                    <div>
                      <b className="block text-[13px] font-bold text-[#141d32]">
                        {feat.title}
                      </b>
                      <small className="block text-[11px] text-[#63718a] mt-[3px]">
                        {feat.desc}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-[9px] px-[21px] py-[13px] rounded-[10px] font-extrabold text-[13px] bg-[#ff6900] text-white shadow-[0_9px_22px_rgba(255,105,0,0.22)] hover:bg-[#e95e00] hover:-translate-y-0.5 transition-all duration-200"
              >
                Register Your Brand <span>↗</span>
              </a>
            </div>

            {/* Browser Dashboard Mockup */}
            <div className="bg-[linear-gradient(145deg,#edf3ff,#f7f9fd)] rounded-[25px] p-3.5 md:p-[25px] relative">
              <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_18px_55px_rgba(20,29,50,0.10)]">
                <div className="h-[35px] bg-[#f7f9fc] border-b border-[#e3e9f2] flex items-center px-3 gap-[5px]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#d5dce7] block" />
                  <span className="w-[7px] h-[7px] rounded-full bg-[#d5dce7] block" />
                  <span className="w-[7px] h-[7px] rounded-full bg-[#d5dce7] block" />
                </div>

                <div className="grid grid-cols-[92px_1fr] min-h-[280px]">
                  <aside className="bg-[#141d32] py-[17px] px-2.5 text-[#aebbd0] text-[8px]">
                    <div className="text-white text-[10px] font-black mb-[25px]">
                      KOOP INDIA
                    </div>
                    <div className="py-2 px-1.5 rounded-[5px] my-1 bg-white/[0.13] text-white">
                      Overview
                    </div>
                    <div className="py-2 px-1.5 rounded-[5px] my-1">
                      Brand Profile
                    </div>
                    <div className="py-2 px-1.5 rounded-[5px] my-1">
                      Products
                    </div>
                    <div className="py-2 px-1.5 rounded-[5px] my-1">
                      Distributor Leads
                    </div>
                    <div className="py-2 px-1.5 rounded-[5px] my-1">
                      Support
                    </div>
                  </aside>

                  <div className="p-[18px]">
                    <h4 className="text-[13px] font-extrabold text-[#141d32] mb-[3px]">
                      Welcome to your Brand Dashboard
                    </h4>
                    <small className="text-[9px] text-[#8794a8] block">
                      Your distribution development overview
                    </small>

                    <div className="grid grid-cols-3 gap-2 my-3.5">
                      <div className="p-2.5 bg-[#f5f7fb] rounded-lg">
                        <b className="block text-[16px] font-bold text-[#00348c]">
                          01
                        </b>
                        <span className="text-[8px] text-[#7e8ba0]">
                          Brand profile
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#f5f7fb] rounded-lg">
                        <b className="block text-[16px] font-bold text-[#00348c]">
                          08
                        </b>
                        <span className="text-[8px] text-[#7e8ba0]">
                          Process stages
                        </span>
                      </div>
                      <div className="p-2.5 bg-[#f5f7fb] rounded-lg">
                        <b className="block text-[16px] font-bold text-[#00348c]">
                          1:1
                        </b>
                        <span className="text-[8px] text-[#7e8ba0]">
                          Manager support
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-[1.3fr_1fr_0.8fr] gap-1.5 py-2 px-1.5 text-[8px] bg-[#f4f6fa] text-[#8793a6] font-extrabold">
                      <span>Activity</span>
                      <span>Category</span>
                      <span>Status</span>
                    </div>

                    {[
                      ["Brand registration", "Onboarding"],
                      ["Website setup", "Digital"],
                      ["Lead coordination", "Growth"],
                      ["Relationship support", "Service"],
                    ].map(([activity, category]) => (
                      <div
                        key={activity}
                        className="grid grid-cols-[1.3fr_1fr_0.8fr] gap-1.5 py-2 px-1.5 text-[8px] border-b border-[#edf0f5] text-[#53627a] items-center"
                      >
                        <span>{activity}</span>
                        <span>{category}</span>
                        <span className="bg-[#eaf8f1] text-[#16845a] rounded-full px-1.5 py-[3px] text-[7px] font-extrabold justify-self-start">
                          Illustrative
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MULTIPLE CHANNELS / GROWTH ── */}
        <section
          id="growth"
          className="relative overflow-hidden bg-[#141d32] text-white py-[66px] md:py-[88px] scroll-mt-20"
        >
          <div className="pointer-events-none absolute w-[470px] h-[470px] -right-[140px] -top-[230px] rounded-full border border-white/[0.08]" />

          <div className="relative z-10 mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))]">
            <div className="text-center max-w-[720px] mx-auto mb-[46px]">
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                More reach. More conversations.
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-white mt-3 mb-3.5">
                Multiple Channels. One Distribution Goal.
              </h2>
              <p className="text-[#c0cce0] text-[14px] leading-[1.8]">
                We combine brand promotion, distributor network circulation and
                relationship-led coordination to support your market expansion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {GROWTH_CHANNELS.map((card) => (
                <article
                  key={card.title}
                  className="border border-white/[0.14] bg-white/[0.06] rounded-[17px] p-[23px]"
                >
                  <div className="w-[43px] h-[43px] rounded-[13px] bg-[#ff6900]/15 text-[#ff9b5d] grid place-items-center text-[19px] font-extrabold mb-[17px]">
                    {card.icon}
                  </div>
                  <h3 className="text-[15px] font-extrabold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[12px] text-[#c2cde0] leading-[1.7]">
                    {card.desc}
                  </p>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 md:gap-[13px] mt-[35px]">
              <div className="bg-white rounded-[14px] p-[18px] text-center text-[#141d32] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <b className="block text-[13px] font-bold">Brand Requirement</b>
                <small className="text-[10px] text-[#7c8ba2]">
                  Products, territory &amp; expectations
                </small>
              </div>
              <div className="text-[#ff9654] text-[22px] font-black text-center rotate-90 md:rotate-0">
                →
              </div>
              <div className="bg-white rounded-[14px] p-[18px] text-center text-[#141d32] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <b className="block text-[13px] font-bold">
                  Koop India Growth Network
                </b>
                <small className="text-[10px] text-[#7c8ba2]">
                  Promotion, circulation &amp; coordination
                </small>
              </div>
              <div className="text-[#ff9654] text-[22px] font-black text-center rotate-90 md:rotate-0">
                →
              </div>
              <div className="bg-white rounded-[14px] p-[18px] text-center text-[#141d32] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <b className="block text-[13px] font-bold">
                  Distributor Conversations
                </b>
                <small className="text-[10px] text-[#7c8ba2]">
                  Brand connects and evaluates
                </small>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY PARTNER ── */}
        <section
          id="why"
          className="py-[66px] md:py-[88px] scroll-mt-20 bg-white"
        >
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))] grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-[30px] lg:gap-[60px] items-center">
            <div className="bg-[linear-gradient(145deg,#edf3ff,#fff)] rounded-[22px] p-8 min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="text-[65px] leading-[0.8] text-[#ff6900] font-black">
                  “
                </div>
                <h3 className="text-[23px] font-extrabold leading-[1.25] text-[#141d32] max-w-[350px] my-[15px]">
                  Distribution growth needs more than just a list of contacts.
                </h3>
                <p className="text-[12px] text-[#63718a]">
                  It needs visibility, relevant opportunities and consistent
                  follow-up.
                </p>
              </div>
              <div className="inline-flex items-center gap-[9px] uppercase tracking-[0.14em] text-[10px] font-black text-[#65748d] mt-6">
                <span className="inline-block w-6 h-[2px] bg-[#ff6900]" />
                The Koop India approach
              </div>
            </div>

            <div>
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                Why partner with Koop India?
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#141d32] mt-3 mb-6">
                Make Distributor Development More Structured
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] md:gap-[23px]">
                {WHY_POINTS.map((pt) => (
                  <div key={pt.num} className="flex gap-3">
                    <div className="flex-none w-[38px] h-[38px] rounded-[13px] bg-[#edf3ff] text-[#00348c] grid place-items-center text-[15px] font-extrabold">
                      {pt.num}
                    </div>
                    <div>
                      <b className="block text-[13px] font-bold text-[#141d32]">
                        {pt.title}
                      </b>
                      <small className="block text-[#63718a] text-[11px] mt-1 leading-[1.6]">
                        {pt.desc}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <div className="pb-[85px]">
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))]">
            <div className="relative overflow-hidden bg-[linear-gradient(110deg,#00348c,#0a4db2)] rounded-[23px] px-[25px] py-[30px] md:px-12 md:py-[42px] text-white block md:flex items-center justify-between gap-[30px]">
              <div className="pointer-events-none absolute w-[300px] h-[300px] rounded-full border border-white/[0.12] right-[23%] -top-[200px]" />

              <div className="relative z-10">
                <h2 className="text-[26px] md:text-[30px] font-extrabold leading-[1.16] tracking-[-0.035em] text-white mb-2">
                  Ready to Expand Your Distribution Network?
                </h2>
                <p className="text-[#d5e3fb] text-[13px]">
                  Tell us about your brand, products and target markets.
                  Let&apos;s plan your next growth move.
                </p>
              </div>

              <a
                href="#contact"
                className="relative z-10 mt-[22px] md:mt-0 w-full md:w-auto inline-flex justify-center items-center gap-[9px] px-[21px] py-[13px] rounded-[10px] font-extrabold text-[13px] bg-[#ff6900] text-white shadow-[0_9px_22px_rgba(255,105,0,0.22)] hover:bg-[#e95e00] hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
              >
                Start Brand Registration <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <section
          id="faq"
          className="py-[66px] md:py-[88px] bg-[#f7f9fc] scroll-mt-20"
        >
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))]">
            <div className="text-center max-w-[720px] mx-auto mb-[46px]">
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                Questions, answered
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#141d32] mt-3 mb-3.5">
                Frequently Asked Questions
              </h2>
              <p className="text-[#63718a] text-[14px] leading-[1.8]">
                Understand how Koop India&apos;s distributor appointment service
                works.
              </p>
            </div>

            <div className="max-w-[820px] mx-auto grid gap-2.5">
              {FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="bg-white border border-[#e3e9f2] rounded-[12px] px-5 py-[17px]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left cursor-pointer text-[13px] font-extrabold text-[#141d32] flex justify-between items-center gap-5"
                    >
                      <span>{item.q}</span>
                      <span className="text-[19px] text-[#ff6900] leading-none flex-shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="text-[12px] text-[#63718a] leading-[1.75] mt-3">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONTACT / ENQUIRY FORM ── */}
        <section
          id="contact"
          className="py-[66px] md:py-[88px] scroll-mt-20 bg-white"
        >
          <div className="mx-auto w-[min(1160px,calc(100%-32px))] md:w-[min(1160px,calc(100%-44px))] grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-7 lg:gap-[55px] items-start">
            <div>
              <div className="text-[#ff6900] text-[10px] font-black tracking-[0.16em] uppercase">
                Let&apos;s build your network
              </div>
              <h2 className="text-[clamp(29px,3.7vw,42px)] font-extrabold leading-[1.16] tracking-[-0.035em] text-[#141d32] mt-3 mb-3.5 max-w-[430px]">
                Get Started With Koop India&apos;s Distributor Development
                Service
              </h2>
              <p className="text-[#63718a] text-[13px] leading-[1.8]">
                Share a few details about your business. Our team can understand
                your requirements and discuss the next steps for brand
                onboarding.
              </p>

              <div className="flex items-center gap-3 mt-5 text-[13px] font-bold">
                <div className="w-[39px] h-[39px] rounded-[13px] bg-[#edf3ff] text-[#00348c] grid place-items-center text-[19px] font-extrabold">
                  ☎
                </div>
                <div>
                  <small className="block text-[#8794a8] text-[9px] font-bold">
                    CALL OUR TEAM
                  </small>
                  <a
                    href="tel:+919599826131"
                    className="text-[#17243b] hover:text-[#00348c]"
                  >
                    +91 95998 26131
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 text-[13px] font-bold">
                <div className="w-[39px] h-[39px] rounded-[13px] bg-[#edf3ff] text-[#00348c] grid place-items-center text-[19px] font-extrabold">
                  ✉
                </div>
                <div>
                  <small className="block text-[#8794a8] text-[9px] font-bold">
                    EMAIL US
                  </small>
                  <a
                    href="mailto:koopindiadl@gmail.com"
                    className="text-[#17243b] hover:text-[#00348c]"
                  >
                    koopindiadl@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 text-[13px] font-bold">
                <div className="w-[39px] h-[39px] rounded-[13px] bg-[#edf3ff] text-[#00348c] grid place-items-center text-[19px] font-extrabold">
                  ⌂
                </div>
                <div>
                  <small className="block text-[#8794a8] text-[9px] font-bold">
                    VISIT ONLINE
                  </small>
                  <a
                    href="https://www.koopindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#17243b] hover:text-[#00348c]"
                  >
                    www.koopindia.com
                  </a>
                </div>
              </div>
            </div>

            <form
              id="leadForm"
              onSubmit={handleSubmit}
              className="bg-white border border-[#e3e9f2] rounded-[20px] p-[22px] md:p-[29px] shadow-[0_18px_55px_rgba(20,29,50,0.10)]"
            >
              <h3 className="text-[19px] font-extrabold text-[#141d32] mb-[5px]">
                Register Your Interest
              </h3>
              <p className="text-[11px] text-[#63718a] mb-[22px]">
                Complete the form and connect with our team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label
                    htmlFor="adp-name"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Your Name *
                  </label>
                  <input
                    id="adp-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="adp-company"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Company / Brand Name *
                  </label>
                  <input
                    id="adp-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    required
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="adp-phone"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="adp-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    required
                    pattern="[0-9+ ()-]{8,18}"
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="adp-email"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Business Email *
                  </label>
                  <input
                    id="adp-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="adp-category"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Product Category
                  </label>
                  <select
                    id="adp-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="adp-markets"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Target Market
                  </label>
                  <select
                    id="adp-markets"
                    name="markets"
                    value={formData.markets}
                    onChange={handleChange}
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  >
                    <option value="">Select target market</option>
                    <option value="Pan India">Pan India</option>
                    <option value="North India">North India</option>
                    <option value="South India">South India</option>
                    <option value="East India">East India</option>
                    <option value="West India">West India</option>
                    <option value="Selected States / Cities">
                      Selected States / Cities
                    </option>
                  </select>
                </div>

                <div className="grid gap-1.5 sm:col-span-2">
                  <label
                    htmlFor="adp-message"
                    className="text-[10px] font-extrabold text-[#4e5d74]"
                  >
                    Tell Us About Your Requirement
                  </label>
                  <textarea
                    id="adp-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Products, target states, current distribution or other requirements..."
                    className="w-full border border-[#dce3ed] rounded-[9px] p-3 text-[#17243b] bg-white text-[12px] outline-none resize-y min-h-[85px] focus:border-[#00348c] focus:shadow-[0_0_0_3px_rgba(0,52,140,0.08)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-[17px] inline-flex justify-center items-center gap-[9px] px-[21px] py-[13px] rounded-[10px] font-extrabold text-[13px] bg-[#ff6900] text-white shadow-[0_9px_22px_rgba(255,105,0,0.22)] hover:bg-[#e95e00] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                {submitting ? (
                  "Submitting Enquiry..."
                ) : (
                  <>
                    Submit Enquiry <span>↗</span>
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="mt-3 px-3.5 py-3 rounded-[10px] bg-[#eaf8f1] border border-[#b6e6cc] text-[#13724f] text-[12px] font-bold text-center">
                  Thank you! Your brand registration{createdProfileId ? ` (${createdProfileId})` : ""} &amp; enquiry have been submitted successfully. Portal login details have been sent to your email, and our team will connect with you shortly.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mt-3 px-3.5 py-3 rounded-[10px] bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-[12px] font-bold text-center">
                  Something went wrong while submitting. Please try again or
                  call us at +91 95998 26131.
                </div>
              )}

              <div className="text-[9px] text-[#8b97a8] text-center mt-2.5">
                By submitting, you agree that Koop India may contact you about
                this enquiry.
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-4 py-2.5 bg-white/95 border-t border-[#e3e9f2] backdrop-blur-md">
        <a
          href="#contact"
          className="w-full inline-flex justify-center items-center gap-[9px] px-[21px] py-[13px] rounded-[10px] font-extrabold text-[13px] bg-[#ff6900] text-white shadow-[0_9px_22px_rgba(255,105,0,0.22)] hover:bg-[#e95e00] transition-all duration-200"
        >
          Appoint Distributors With Koop India ↗
        </a>
      </div>
    </div>
  );
}
