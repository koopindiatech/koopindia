"use client";
import { useState, Suspense } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle, Loader2, Building2, Phone, MapPin, Package, TrendingUp, Users, ArrowRight, Store, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/, "");

const STATES = [
  "Select State", "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other",
];

const F = {
  wrap: "group relative",
  lbl: "block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2",
  inp: [
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white",
    "text-sm font-medium text-gray-800 placeholder:text-gray-400",
    "outline-none transition-all duration-200",
    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
    "hover:border-gray-400",
  ].join(" "),
  sel: [
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white",
    "text-sm font-medium text-gray-800 cursor-pointer",
    "outline-none transition-all duration-200",
    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
    "hover:border-gray-400 appearance-none",
  ].join(" "),
  ta: [
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white",
    "text-sm font-medium text-gray-800 placeholder:text-gray-400 resize-none",
    "outline-none transition-all duration-200",
    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
    "hover:border-gray-400",
  ].join(" "),
};

const SectionHead = ({ icon: Icon, label, color = "orange" }) => (
  <div className="flex items-center gap-3 mb-5 mt-8 first:mt-0">
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${color === "blue" ? "bg-blue-50 text-blue-500" : "bg-orange-50 text-orange-500"}`}>
      <Icon size={16} />
    </div>
    <div className="flex-1">
      <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">{label}</p>
    </div>
    <div className="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent" />
  </div>
);

function RegistrationForm() {
  const [tab, setTab] = useState(null); // null means "not selected yet"
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);


  const blankSeller = () => ({
    companyName: "", contactName: "", mobile: "", email: "",
    city: "", state: "Select State", businessType: "", products: "",
    expectedOrder: "",
  });
  const blankBuyer = () => ({
    companyName: "", contactName: "", mobile: "", email: "",
    city: "", state: "Select State", buyerType: "", requirements: "",
    currentBrands: "", purchaseRequirement: "", purchaseLocation: "",
    deliveryLocation: "", retailers: "", buyerTerritory: "", network: "",
  });

  const [seller, setSeller] = useState(blankSeller());
  const [buyer, setBuyer] = useState(blankBuyer());
  const setSF = (k, v) => setSeller(p => ({ ...p, [k]: v }));
  const setBF = (k, v) => setBuyer(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (tab === "seller") {
        await addDoc(collection(db, "sellers"), {
          name: seller.companyName, companyName: seller.companyName,
          contact: seller.contactName, phone: seller.mobile, email: seller.email,
          city: seller.city, state: seller.state, businessType: seller.businessType,
          products: seller.products, expectedOrder: seller.expectedOrder,
          status: "paused", source: "marketplace_registration_page",
          slug: slugify(seller.companyName), createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "buyers"), {
          buyerName: buyer.companyName, contactName: buyer.contactName,
          phone: buyer.mobile, email: buyer.email, city: buyer.city, state: buyer.state,
          buyerType: buyer.buyerType, requirements: buyer.requirements,
          currentBrands: buyer.currentBrands, purchaseRequirement: buyer.purchaseRequirement,
          purchaseLocation: buyer.purchaseLocation, deliveryLocation: buyer.deliveryLocation,
          retailers: buyer.retailers, buyerTerritory: buyer.buyerTerritory, network: buyer.network,
          status: "paused", source: "marketplace_registration_page",
          slug: slugify(buyer.companyName), createdAt: serverTimestamp(),
        });
      }
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 sm:px-12 text-center min-h-[500px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
        <div className="relative mb-10">
          <div className="w-24 h-24 rounded-full bg-emerald-50 border-[6px] border-emerald-100 flex items-center justify-center mx-auto relative z-10">
            <CheckCircle className="text-emerald-500" size={40} strokeWidth={2.5} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-400/20 blur-2xl rounded-full z-0" />
        </div>
        
        <h3 className="text-3xl sm:text-4xl font-black text-[#1e3a5f] mb-4 tracking-tight">Application Received</h3>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm mx-auto mb-8">
          Thank you for joining <strong className="text-[#1e3a5f]">Koop India</strong>. Our verification team will review your profile and activate it within 24-48 hours.
        </p>
        
        <div className="w-full max-w-sm bg-gray-50/80 rounded-2xl p-5 mb-10 border border-gray-100">
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/50 text-amber-600 font-bold text-xs tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Under Review
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Expected Live Time</span>
            <span className="text-gray-900 font-bold">24 – 48 Hours</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
          <button
            onClick={() => { setSuccess(false); setSeller(blankSeller()); setBuyer(blankBuyer()); }}
            className="flex-1 px-6 py-3.5 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-600 hover:border-gray-200 hover:bg-gray-50 transition-all text-center"
          >
            Submit Another
          </button>
          <Link href="/" className="flex-1 px-6 py-3.5 rounded-xl bg-[#1e3a5f] text-white text-sm font-black hover:bg-[#162c4a] transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2">
            Back Home <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  if (!tab) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <button
          onClick={() => setTab("seller")}
          className="group relative flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-100 rounded-3xl hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
        >
          <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm">
            <Store size={36} />
          </div>
          <h3 className="text-xl font-black text-[#1e3a5f] mb-3">Register as Seller</h3>
          <p className="text-gray-500 text-sm text-center">List your products and expand your distribution network.</p>
        </button>

        <button
          onClick={() => setTab("buyer")}
          className="group relative flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-100 rounded-3xl hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
            <ShoppingBag size={36} />
          </div>
          <h3 className="text-xl font-black text-[#1e3a5f] mb-3">Register as Buyer</h3>
          <p className="text-gray-500 text-sm text-center">Find trusted brands, manufacturers, and distributors.</p>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 p-2 bg-gray-50">
        <button
          onClick={() => setTab("seller")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
            tab === "seller"
              ? "bg-white text-[#1e3a5f] shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50 border border-transparent"
          }`}
        >
          <Store size={18} className={tab === "seller" ? "text-orange-500" : "text-gray-400"} />
          <span>Register as Seller</span>
        </button>
        <button
          onClick={() => setTab("buyer")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
            tab === "buyer"
              ? "bg-white text-[#1e3a5f] shadow-sm border border-gray-200"
              : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50 border border-transparent"
          }`}
        >
          <ShoppingBag size={18} className={tab === "buyer" ? "text-orange-500" : "text-gray-400"} />
          <span>Register as Buyer</span>
        </button>
      </div>

      <div className="p-6 md:p-10">
        {tab === "seller" ? (
          <form onSubmit={handleSubmit} className="space-y-6">

            <SectionHead icon={Building2} label="Company Information" color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap + " md:col-span-2"}>
                <label className={F.lbl}>Company / Brand Name <span className="text-red-400">*</span></label>
                <input required className={F.inp} placeholder="Enter company or brand name" value={seller.companyName} onChange={e => setSF("companyName", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Contact Person <span className="text-red-400">*</span></label>
                <input required className={F.inp} placeholder="Enter your full name" value={seller.contactName} onChange={e => setSF("contactName", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Business Type</label>
                <select className={F.sel} value={seller.businessType} onChange={e => setSF("businessType", e.target.value)}>
                  <option value="">Select type</option>
                  <option>Manufacturer</option>
                  <option>Trader / Wholesaler</option>
                  <option>Importer</option>
                  <option>Exporter</option>
                  <option>Brand Owner</option>
                  <option>Startup</option>
                </select>
              </div>
            </div>

            <SectionHead icon={Phone} label="Contact Details" color="orange" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap}>
                <label className={F.lbl}>Mobile Number <span className="text-red-400">*</span></label>
                <input required type="tel" className={F.inp} placeholder="Enter 10-digit mobile number" value={seller.mobile} onChange={e => setSF("mobile", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Email Address</label>
                <input type="email" className={F.inp} placeholder="Enter email address" value={seller.email} onChange={e => setSF("email", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>City</label>
                <input className={F.inp} placeholder="e.g. New Delhi" value={seller.city} onChange={e => setSF("city", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>State</label>
                <select className={F.sel} value={seller.state} onChange={e => setSF("state", e.target.value)}>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <SectionHead icon={Package} label="Seller Profile" color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap + " md:col-span-2"}>
                <label className={F.lbl}>Products / Brands You Sell</label>
                <textarea className={F.ta} rows={3} placeholder="List your top products, brand names, or categories you manufacture/sell..." value={seller.products} onChange={e => setSF("products", e.target.value)} />
              </div>
              <div className={F.wrap + " md:col-span-2"}>
                <label className={F.lbl}>Expected Monthly Order Value (Rs.)</label>
                <input type="number" className={F.inp} placeholder="e.g. 100000" value={seller.expectedOrder} onChange={e => setSF("expectedOrder", e.target.value)} />
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[12px] text-gray-400 leading-relaxed max-w-sm text-center md:text-left">
                🔒 Your information is secure and will be reviewed by our team within 24–48 hours.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl text-sm transition-all shadow-xl shadow-orange-500/20 hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap"
              >
                {submitting ? (
                  <><Loader2 size={17} className="animate-spin" /> Submitting…</>
                ) : (
                  <>Submit Registration <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <SectionHead icon={Building2} label="Company Information" color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap + " md:col-span-2"}>
                <label className={F.lbl}>Company / Business Name <span className="text-red-400">*</span></label>
                <input required className={F.inp} placeholder="Enter company or business name" value={buyer.companyName} onChange={e => setBF("companyName", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Contact Person <span className="text-red-400">*</span></label>
                <input required className={F.inp} placeholder="Enter your full name" value={buyer.contactName} onChange={e => setBF("contactName", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Buyer Type</label>
                <select className={F.sel} value={buyer.buyerType} onChange={e => setBF("buyerType", e.target.value)}>
                  <option value="">Select type</option>
                  <option>Distributor</option>
                  <option>Super Stockist</option>
                  <option>Wholesaler</option>
                  <option>Retailer</option>
                  <option>E-commerce Seller</option>
                  <option>Institutional Buyer</option>
                  <option>Exporter</option>
                  <option>Importer</option>
                </select>
              </div>
            </div>

            <SectionHead icon={Phone} label="Contact Details" color="orange" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap}>
                <label className={F.lbl}>Mobile Number <span className="text-red-400">*</span></label>
                <input required type="tel" className={F.inp} placeholder="Enter 10-digit mobile number" value={buyer.mobile} onChange={e => setBF("mobile", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Email Address</label>
                <input type="email" className={F.inp} placeholder="Enter email address" value={buyer.email} onChange={e => setBF("email", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>City</label>
                <input className={F.inp} placeholder="e.g. New Delhi" value={buyer.city} onChange={e => setBF("city", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>State</label>
                <select className={F.sel} value={buyer.state} onChange={e => setBF("state", e.target.value)}>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <SectionHead icon={MapPin} label="Location Preferences" color="blue" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap}>
                <label className={F.lbl}>Preferred Purchase Location</label>
                <input className={F.inp} placeholder="e.g. Maharashtra, Gujarat" value={buyer.purchaseLocation} onChange={e => setBF("purchaseLocation", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Required Delivery Location</label>
                <input className={F.inp} placeholder="e.g. Mumbai, Pune" value={buyer.deliveryLocation} onChange={e => setBF("deliveryLocation", e.target.value)} />
              </div>
              <div className={F.wrap + " md:col-span-2"}>
                <label className={F.lbl}>Interested States / Cities / Territories</label>
                <input className={F.inp} placeholder="e.g. All over India, or specific regions" value={buyer.buyerTerritory} onChange={e => setBF("buyerTerritory", e.target.value)} />
              </div>
            </div>

            <SectionHead icon={TrendingUp} label="Sourcing Requirements" color="orange" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={F.wrap + " md:col-span-2"}>
                <label className={F.lbl}>Products / Categories You Are Looking For</label>
                <textarea className={F.ta} rows={3} placeholder="What products or categories are you looking to buy?" value={buyer.requirements} onChange={e => setBF("requirements", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Brands Currently Dealing In</label>
                <input className={F.inp} placeholder="e.g. ITC, HUL, Patanjali (if any)" value={buyer.currentBrands} onChange={e => setBF("currentBrands", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Purchase Requirement</label>
                <select className={F.sel} value={buyer.purchaseRequirement} onChange={e => setBF("purchaseRequirement", e.target.value)}>
                  <option value="">Select</option>
                  <option>Regular Monthly Purchase</option>
                  <option>One-Time Purchase</option>
                  <option>Occasional / Seasonal</option>
                  <option>Just exploring options</option>
                </select>
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Retailers in Network</label>
                <input className={F.inp} placeholder="e.g. 100+ stores" value={buyer.retailers} onChange={e => setBF("retailers", e.target.value)} />
              </div>
              <div className={F.wrap}>
                <label className={F.lbl}>Distribution Network Size</label>
                <input className={F.inp} placeholder="e.g. District-level, State-level" value={buyer.network} onChange={e => setBF("network", e.target.value)} />
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[12px] text-gray-400 leading-relaxed max-w-sm text-center md:text-left">
                🔒 Your information is secure and will be reviewed by our team within 24–48 hours.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl text-sm transition-all shadow-xl shadow-orange-500/20 hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap"
              >
                {submitting ? (
                  <><Loader2 size={17} className="animate-spin" /> Submitting…</>
                ) : (
                  <>Submit Registration <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      
      {/* LEFT SIDE: BRANDING PANEL (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-[#1e3a5f] flex-col p-12 overflow-hidden justify-between">
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Subtle background pattern or image */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
        </div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-16 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span className="text-white font-black text-lg leading-none">K</span>
            </div>
            <div>
              <p className="text-white font-black text-xl leading-none tracking-tight">
                KOOP <span className="text-orange-500">INDIA</span>
              </p>
            </div>
          </Link>

          <h1 className="text-5xl font-black text-white leading-tight tracking-tight mb-6">
            Join India's Fastest Growing B2B Network.
          </h1>
          <p className="text-blue-100/80 text-lg max-w-md leading-relaxed mb-12">
            Whether you are a manufacturer looking for distributors, or a buyer looking for trusted brands—you've come to the right place.
          </p>

          <div className="space-y-6">
            {[
              { icon: Users, title: "Verified Partners", desc: "Connect with 100% verified businesses." },
              { icon: TrendingUp, title: "Grow Faster", desc: "Expand your distribution network across India." },
              { icon: Store, title: "Premium Visibility", desc: "Showcase your brand to high-intent buyers." }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-white backdrop-blur-sm">
                  <feature.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{feature.title}</h4>
                  <p className="text-blue-200/70 text-sm mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-16 text-blue-300/50 text-xs font-medium">
          © {new Date().getFullYear()} Koop India Network. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col p-4 sm:p-8 md:p-12 h-screen overflow-y-auto">
        <div className="w-full max-w-2xl m-auto py-8 lg:py-0">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm leading-none">K</span>
              </div>
              <p className="text-[#1e3a5f] font-black text-lg leading-none tracking-tight">
                KOOP <span className="text-orange-500">INDIA</span>
              </p>
            </Link>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              B2B Marketplace
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1e3a5f] mb-3 tracking-tight">
              Create Your Profile
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Join as a <strong className="text-[#1e3a5f]">Seller</strong> to expand your reach, or as a <strong className="text-[#1e3a5f]">Buyer</strong> to connect with top brands.
            </p>
          </div>

          <Suspense fallback={<div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>}>
            <RegistrationForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
