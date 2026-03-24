"use client";
import { useState,useEffect } from "react";
import Link from "next/link";

const categories = [
  {
    label: "Documentation & Compliance",
    slug: "documentation-compliance",
    icon: "📋",
    color: "from-blue-50 to-indigo-50",
    accent: "#4f46e5",
    badge: "bg-indigo-100 text-indigo-700",
    services: [
      {
        title: "GST Registration",
        slug: "gst-registration",
        price: "₹999",
        desc: "Quick GST number with end-to-end filing support.",
      },
      {
        title: "Company Registration",
        slug: "company-registration",
        price: "₹2,499",
        desc: "Pvt Ltd, OPC, or LLP — registered in days.",
      },
      {
        title: "Trademark Registration",
        slug: "trademark-registration",
        price: "₹1,499",
        desc: "Protect your brand identity legally.",
      },
      {
        title: "FSSAI License",
        slug: "fssai-license",
        price: "₹1,299",
        desc: "Mandatory food business licensing made easy.",
      },
      {
        title: "ISO Certification",
        slug: "iso-certification",
        price: "₹4,999",
        desc: "Boost credibility with international standards.",
      },
    ],
  },
  {
    label: "Digital Marketing",
    slug: "digital-marketing",
    icon: "📣",
    color: "from-pink-50 to-rose-50",
    accent: "#e11d48",
    badge: "bg-rose-100 text-rose-700",
    services: [
      {
        title: "Content Writing",
        slug: "content-writing",
        price: "₹499/article",
        desc: "SEO-optimised blogs, copies & web content.",
      },
      {
        title: "Google My Business",
        slug: "gmb",
        price: "₹999/mo",
        desc: "Rank higher in local Google searches.",
      },
      {
        title: "Logo Design",
        slug: "logo-design",
        price: "₹1,499",
        desc: "Memorable logos that make you stand out.",
      },
      {
        title: "Social Media Management",
        slug: "social-media",
        price: "₹3,999/mo",
        desc: "Consistent presence across all platforms.",
      },
    ],
  },
  {
    label: "Startup Consulting",
    slug: "startup-consulting",
    icon: "🚀",
    color: "from-amber-50 to-orange-50",
    accent: "#d97706",
    badge: "bg-amber-100 text-amber-700",
    services: [
      {
        title: "Business Consulting",
        slug: "business",
        price: "₹2,999",
        desc: "Expert guidance to build & scale your idea.",
      },
      {
        title: "Market Analysis",
        slug: "market-analysis",
        price: "₹4,999",
        desc: "Data-driven insights on your target market.",
      },
    ],
  },
  {
    label: "Tech Solutions",
    slug: "tech-solutions",
    icon: "💻",
    color: "from-emerald-50 to-teal-50",
    accent: "#0d9488",
    badge: "bg-teal-100 text-teal-700",
    services: [
      {
        title: "Website Development",
        slug: "website-development",
        price: "₹9,999",
        desc: "Fast, modern websites built to convert.",
      },
      {
        title: "CRM Development",
        slug: "crm-development",
        price: "₹19,999",
        desc: "Custom CRM tailored to your workflow.",
      },
      {
        title: "SEO",
        slug: "seo",
        price: "₹2,999/mo",
        desc: "Climb Google rankings with proven strategies.",
      },
    ],
  },
];

export default function ServicesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

// ✅ SERVICES PAGE MEIN SIRF YE RAKHO
useEffect(() => {
  localStorage.setItem("enquiry_scroll_shown", "true");
  sessionStorage.setItem("enquiry_open", "true");

  return () => {
    localStorage.removeItem("enquiry_scroll_shown");
    sessionStorage.removeItem("enquiry_open");
  };
}, []);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      className="min-h-screen bg-[#fafaf8] text-gray-800"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .card-service {
          transition: all 0.22s cubic-bezier(.4,0,.2,1);
        }
        .card-service:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px -8px rgba(0,0,0,0.12);
        }
        .arrow-btn {
          transition: transform 0.2s ease;
        }
        .card-service:hover .arrow-btn {
          transform: translateX(4px);
        }
        .cat-pill {
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .cat-pill:hover { opacity: 0.85; }
        .form-input {
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.12);
        }
        .submit-btn {
          transition: all 0.2s ease;
        }
        .submit-btn:hover {
          background: #ea6300;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px -4px rgba(249,115,22,0.45);
        }
        .badge-popular {
          animation: pulse-badge 2.5s infinite;
        }
        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <p className="text-orange-100 text-sm font-bold tracking-widest uppercase mb-2">
            Everything your business needs
          </p>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
            className="font-bold leading-tight mb-3"
          >
            Services Built for
            <br />
            Indian Businesses 🇮🇳
          </h1>
          <p className="text-orange-50 max-w-lg text-base opacity-90">
            From compliance to growth — we handle it all so you can focus on
            what matters.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — SERVICE CARDS */}
          <div className="flex-1 space-y-8">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                id={cat.slug}
                className={`rounded-2xl p-6 bg-gradient-to-br ${cat.color} border border-white shadow-sm`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2
                        style={{ fontFamily: "'Syne', sans-serif" }}
                        className="text-xl font-bold text-gray-900"
                      >
                        {cat.label}
                      </h2>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${cat.badge}`}
                  ></span>
                </div>

                {/* Service Cards Grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {cat.services.map((svc, i) => (
                    <Link
                      key={svc.slug}
                      href={`/${cat.slug}/${svc.slug}`}
                      className="card-service group bg-white rounded-xl p-4 border border-gray-100 flex flex-col justify-between gap-3 relative overflow-hidden"
                    >
                      {i === 0 && (
                        <span className="badge-popular absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}

                      <div>
                        <p className="font-semibold text-gray-900 text-sm leading-snug pr-12">
                          {svc.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                          {svc.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span
                          className="arrow-btn flex items-center gap-1 text-xs font-semibold"
                          style={{ color: cat.accent }}
                        >
                          View Details
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — STICKY FORM */}
          <div className="w-full lg:w-[370px] shrink-0">
            <div className="sticky top-24 rounded-2xl shadow-xl overflow-hidden border border-orange-100">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-5">
                <h3
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-white text-xl font-bold mt-0.5"
                >
                  Get Free Consultation
                </h3>
                <p className="text-orange-50 text-xs mt-1">
                  Our expert will call you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white p-8 text-center">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-xl font-bold text-gray-900"
                  >
                    Request Received!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Our team will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-orange-500 text-sm font-semibold underline underline-offset-2"
                  >
                    Submit another request →
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white px-6 py-6 space-y-4"
                >
                  {[
                    {
                      type: "text",
                      placeholder: "Full Name",
                      key: "name",
                      icon: "👤",
                    },
                    {
                      type: "email",
                      placeholder: "Email Address",
                      key: "email",
                      icon: "✉️",
                    },
                    {
                      type: "tel",
                      placeholder: "Phone Number",
                      key: "phone",
                      icon: "📱",
                    },
                  ].map(({ type, placeholder, key, icon }) => (
                    <div key={key} className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                        {icon}
                      </span>
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        className="form-input w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm bg-gray-50"
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                      />
                    </div>
                  ))}

                  <select
                    className="form-input w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700"
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                  >
                    <option value=""> Select a Service</option>
                    {categories.map((cat) =>
                      cat.services.map((svc) => (
                        <option key={svc.slug} value={svc.slug}>
                          {cat.icon} {svc.title}
                        </option>
                      )),
                    )}
                  </select>

                  <textarea
                    placeholder="Tell us about your requirement..."
                    rows={3}
                    className="form-input w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 resize-none"
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />

                  <button
                    type="submit"
                    className="submit-btn w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-sm tracking-wide"
                  >
                    Get Free Consultation →
                  </button>

                  <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                    🔒 Your details are safe with us. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* Side reassurance cards */}
            <div className="mt-4 space-y-3">
              {[
                {
                  icon: "🏆",
                  title: "Trusted by 5,000+ Businesses",
                  sub: "Across India since 2019",
                },
                {
                  icon: "⚡",
                  title: "Fast Turnaround",
                  sub: "Most services done within 72 hrs",
                },
                {
                  icon: "💬",
                  title: "Dedicated Support",
                  sub: "WhatsApp + Call support 9AM–9PM",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
                >
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
