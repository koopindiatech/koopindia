"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { addEnquiry } from "@/lib/enquiryService";

const categories = [
  {
    label: "Documentation & Compliance",
    slug: "documentation-compliance",
    icon: "📋",
    color: "from-[#eef2ff] to-[#e0e7ff]",
    accent: "#4338ca",
    accentLight: "#c7d2fe",
    badge: "bg-indigo-600 text-white",
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
    color: "from-[#fff1f2] to-[#ffe4e6]",
    accent: "#be123c",
    accentLight: "#fecdd3",
    badge: "bg-rose-600 text-white",
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
    color: "from-[#fffbeb] to-[#fef3c7]",
    accent: "#b45309",
    accentLight: "#fde68a",
    badge: "bg-amber-600 text-white",
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
    color: "from-[#ecfdf5] to-[#d1fae5]",
    accent: "#047857",
    accentLight: "#a7f3d0",
    badge: "bg-emerald-700 text-white",
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

const reviews = [
  {
    quote:
      "Koop India supported us throughout our startup journey — from initial setup to scaling. The process was smooth and well-managed, which helped us focus more on building the business.",
    name: "Umair Misbah",
    role: "Founder & CEO",
    company: "EZDoors India Pvt Ltd",
    initials: "UM",
    roleColor: "#f97316",
    avatarBg: "#fff0e6",
    avatarText: "#c2440e",
  },
  {
    quote:
      "We got everything done in one place — registration, compliance, and marketing support. It saved us a lot of time and reduced the usual back-and-forth.",
    name: "Sarikha",
    role: "Founder & CEO",
    company: "Kiro Elvi Foods Pvt Ltd",
    initials: "S",
    roleColor: "#4338ca",
    avatarBg: "#eef0ff",
    avatarText: "#3730a3",
  },
  {
    quote:
      "The team provided clear guidance and practical solutions. It made our market entry much more structured and less stressful than expected.",
    name: "Amir Quadri",
    role: "Founder & CEO",
    company: "Foodista Spices",
    initials: "AQ",
    roleColor: "#047857",
    avatarBg: "#ecfdf5",
    avatarText: "#065f46",
  },
];

const stats = [
  { num: "1,000+", label: "Businesses Served" },
  { num: "4.9★", label: "Average Rating" },
  { num: "99%", label: "Client Satisfaction" },
  { num: "72hrs", label: "Avg Turnaround" },
];

const defaultForm = {
  name: "",
  email: "",
  mobile: "",
  city: "",
  service: "",
  message: "",
};

function EnquiryForm({
  submitted,
  setSubmitted,
  submittedId,
  setSubmittedId,
  form,
  setForm,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const id = await addEnquiry({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        city: form.city,
        service: form.service,
        message: form.message,
        source: "facebook",
      });
      setSubmittedId(id);
      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl shadow-xl overflow-hidden border border-orange-100">
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #f97316 0%, #fb923c 40%, #fbbf24 100%)",
        }}
        className="px-6 py-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-lg">✨</span>
          <h3
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-white text-xl font-bold"
          >
            Request a Callback
          </h3>
        </div>
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

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Our team will reach out to you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSubmittedId("");
              setForm(defaultForm);
            }}
            className="mt-5 cursor-pointer text-orange-500 text-sm font-semibold underline underline-offset-2"
          >
            Submit another request →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white px-6 py-6 space-y-3">
          {/* Name */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
              👤
            </span>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              className="form-input w-full border border-gray-300 rounded-xl pl-9 pr-4 py-2 text-sm bg-gray-50"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
              ✉️
            </span>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              className="form-input w-full border border-gray-300 rounded-xl pl-9 pr-4 py-2 text-sm bg-gray-50"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone + City — side by side */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                📞
              </span>
              <input
                type="tel"
                placeholder="Phone"
                required
                value={form.mobile}
                className="form-input w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-sm bg-gray-50"
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                🏙️
              </span>
              <input
                type="text"
                placeholder="City"
                required
                value={form.city}
                className="form-input w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-sm bg-gray-50"
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
          </div>

          {/* Service */}
          <select
            className="form-input w-full border border-gray-300 rounded-xl px-4 py-2 text-sm bg-gray-50 text-gray-700"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Select a Service</option>
            {categories.map((cat) =>
              cat.services.map((svc) => (
                <option key={svc.slug} value={svc.slug}>
                  {svc.title}
                </option>
              )),
            )}
          </select>

          {/* Message */}
          <textarea
            placeholder="Tell us about your requirement..."
            rows={3}
            value={form.message}
            className="form-input w-full border border-gray-300 rounded-xl px-4 py-2 text-sm bg-gray-50 resize-none"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-btn cursor-pointer w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Enquiry →"
            )}
          </button>

          <p className="text-center text-[11px] text-gray-400 leading-relaxed">
            🔒 Your details are safe with us. No spam, ever.
          </p>
        </form>
      )}
    </div>
  );
}

function ReassuranceCards() {
  return (
    <div className="mt-4 space-y-3">
      {[
        {
          icon: "🏆",
          title: "Trusted by 1,000+ Businesses",
          sub: "Across India since 2022",
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
            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-400">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ServiceCategory({ cat }) {
  return (
    <div
      id={cat.slug}
      className={`rounded-2xl p-5 bg-gradient-to-br ${cat.color} border shadow-sm`}
      style={{ borderColor: cat.accentLight }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="cat-header-icon shadow-sm"
            style={{
              background: cat.accentLight,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              fontSize: 18,
            }}
          >
            {cat.icon}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{cat.label}</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {cat.services.map((svc, i) => (
          <Link
            key={svc.slug}
            href={`/${cat.slug}/${svc.slug}`}
            className="card-service group bg-white rounded-xl p-4 border border-gray-100 flex flex-col justify-between gap-3 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
              style={{
                background:
                  i === 0
                    ? `linear-gradient(90deg, ${cat.accent}, ${cat.accentLight})`
                    : cat.accentLight,
              }}
            />
            {i === 0 && (
              <span className="badge-popular absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Popular
              </span>
            )}
            <div className="mt-1">
              <p className="font-semibold text-gray-900 text-sm leading-snug pr-14">
                {svc.title}
              </p>
              <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                {svc.desc}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span
                className="arrow-btn flex items-center gap-1 text-xs font-semibold"
                style={{ color: cat.accent }}
              >
                View
                <svg
                  width="13"
                  height="13"
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
  );
}

export default function ServicesPage() {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState("");

  useEffect(() => {
    localStorage.setItem("enquiry_scroll_shown", "true");
    sessionStorage.setItem("enquiry_open", "true");
    return () => {
      localStorage.removeItem("enquiry_scroll_shown");
      sessionStorage.removeItem("enquiry_open");
    };
  }, []);

  const docCategory = categories[0];
  const restCategories = categories.slice(1);

  const formProps = {
    submitted,
    setSubmitted,
    submittedId,
    setSubmittedId,
    form,
    setForm,
  };

  return (
    <main
      className="min-h-screen bg-[#f8f8f6] text-gray-800"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Syne:wght@700;800&display=swap');

        .card-service { transition: all 0.22s cubic-bezier(.4,0,.2,1); }
        .card-service:hover { transform: translateY(-3px); box-shadow: 0 12px 32px -8px rgba(0,0,0,0.13); }
        .arrow-btn { transition: transform 0.2s ease; }
        .card-service:hover .arrow-btn { transform: translateX(5px); }
        .form-input { transition: border-color 0.2s, box-shadow 0.2s; }
        .form-input:focus { outline: none; border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
        .submit-btn { transition: all 0.2s ease; }
        .submit-btn:hover:not(:disabled) { background: #ea6300; transform: translateY(-1px); box-shadow: 0 8px 20px -4px rgba(249,115,22,0.45); }
        .badge-popular { animation: pulse-badge 2.5s infinite; }
        @keyframes pulse-badge { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }
        .hero-bg {
          background: linear-gradient(135deg, #0f1729 0%, #141d32 50%, #1a2545 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          top: -40%; right: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: -30%; left: -5%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* HERO */}
      <section className="hero-bg text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-orange-200 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse inline-block" />
            Everything your business needs
          </span>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            }}
            className="font-bold leading-tight mb-4"
          >
            Services Built for
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #fb923c, #fbbf24)",
              }}
            >
              {" "}
              Indian Businesses
            </span>{" "}
            🇮🇳
          </h1>
          <p className="text-slate-300 max-w-lg text-base leading-relaxed">
            From compliance to growth — we handle it all so you can focus on
            what matters.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["1000+ Businesses", "Fast Turnaround", "Expert Support"].map(
              (t) => (
                <span
                  key={t}
                  className="text-xs text-white/70 bg-white/8 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  ✓ {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — SERVICE CARDS */}
          <div className="flex-1 space-y-6">
            {/* First category: Documentation & Compliance */}
            <ServiceCategory cat={docCategory} />

            {/* MOBILE FORM — shown right after Documentation, hidden on desktop */}
            <div className="block lg:hidden">
              <EnquiryForm {...formProps} />
              <ReassuranceCards />
            </div>

            {/* Remaining categories */}
            {restCategories.map((cat) => (
              <ServiceCategory key={cat.slug} cat={cat} />
            ))}
          </div>

          {/* RIGHT — STICKY FORM (desktop only) */}
          <div className="hidden lg:block w-full lg:w-[370px] shrink-0">
            <div className="sticky top-24">
              <EnquiryForm {...formProps} />
              <ReassuranceCards />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-500 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
              ⭐ Client Stories
            </span>

            <h2
              style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-xl md:text-2xl font-bold text-gray-900"
            >
              Trusted by Founders Across India
            </h2>

            <p className="text-gray-400 text-xs mt-1">
              Real results from real businesses
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-[2px] mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, s) => (
                      <svg
                        key={s}
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="#f97316"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>

                {/* Quote */}
                <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3 line-clamp-4">
                  "{r.quote}"
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-3" />

                {/* Author */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold"
                    style={{ background: r.avatarBg, color: r.avatarText }}
                  >
                    {r.initials}
                  </div>

                  <div className="leading-tight">
                    <p className="text-md font-semibold text-gray-900">
                      {r.name}
                    </p>
                    <p
                      className="text-[12px] font-semibold"
                      style={{ color: r.roleColor }}
                    >
                      {r.role}
                    </p>
                    <p className="text-[14px] text-gray-400">{r.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{ fontFamily: "'Syne', sans-serif", color: "#f97316" }}
                  className="text-xl font-bold"
                >
                  {stat.num}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
