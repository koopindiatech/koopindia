"use client";
import React, { useState } from "react";
import { addEnquiry } from "@/lib/enquiryService";
import { useModal } from "@/context/ModalContext";

const Page = () => {
  const { onOpenModal } = useModal();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    company: "",
    service: "",
    source: "website",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      await addEnquiry(form);
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }
      setSuccessMsg("Thank you! Our team will contact you shortly.");
      setForm({ name: "", mobile: "", company: "", service: "", source: "website" });
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const branches = [
    {
      name: "Registered office",
      address: "D-455, Pul Prahladpur New Delhi 110044",
    },
    {
      name: "Corporate office:",
      address: "C-3 Third Floor Sector 6 Noida, Uttar Pradesh 201301 India",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 text-[#141d32] px-6 md:px-8 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Contact <span className="text-[#F97316]">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re here to help transform your business. Connect with our
            expert team for personalized solutions and strategic guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Contact Info & CTA */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Let&apos;s Start Your{" "}
                <span className="text-[#F97316]">Success Journey</span>
              </h2>
              <p className="text-gray-600 text-md mb-8 leading-relaxed">
                Ready to unlock your business potential? Our expert consultants
                are standing by to provide tailored strategies that drive real
                results. From startup guidance to enterprise solutions,
                we&apos;re your trusted growth partner.
              </p>

              {/* Enquiry Button */}
              <button
                onClick={onOpenModal}
                className="bg-gradient-to-r from-[#F97316] to-orange-500 text-white px-8 py-3 rounded-xl 
                font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-600 
                transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>Start Your Enquiry</span>
              </button>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#F97316] to-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email Us</p>
                    <p className="text-[#F97316] font-medium">
                      koopindiadl@gmail.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#F97316] to-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Call Us</p>
                    <p className="text-[#F97316] font-medium">
                      +91 95998 26131
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  {branches.map((branch, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#F97316] to-orange-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {branch.name}
                        </p>
                        <p className="text-[#F97316] font-medium ">
                          {branch.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#141d32] to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"></div>
                <div className="absolute top-12 right-12 w-8 h-8 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/20 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-1">Get Free Consultation</h3>
                <p className="text-gray-400 text-sm mb-6">Fill in the details and we&apos;ll call you back</p>

                {successMsg && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-medium text-center">
                    ✅ {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F97316] transition-colors placeholder:text-gray-500 w-full"
                    />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F97316] transition-colors placeholder:text-gray-500 w-full"
                    />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company / Business Name"
                    value={form.company}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F97316] transition-colors placeholder:text-gray-500"
                  />
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[#141d32] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#F97316] transition-colors"
                  >
                    <option value="" disabled>Looking For</option>
                    <option value="GST Registration &amp; Filing">GST Registration &amp; Filing</option>
                    <option value="Company Registration">Company Registration</option>
                    <option value="Trademark Registration">Trademark Registration</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="FSSAI License">FSSAI License</option>
                    <option value="ISO Certification">ISO Certification</option>
                    <option value="Seller Onboarding">Seller Onboarding</option>
                    <option value="Other Services">Other Services</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F97316] hover:bg-orange-600 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 mt-1"
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>
                        Submit Enquiry
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F97316]">100+</div>
                    <div className="text-sm text-gray-300">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F97316]">99%</div>
                    <div className="text-sm text-gray-300">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
