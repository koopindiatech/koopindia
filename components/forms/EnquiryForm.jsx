"use client";
import { useState } from "react";
import Image from "next/image";
import { addEnquiry } from "@/lib/enquiryService";
import { usePathname } from "next/navigation";

export default function EnquiryModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    service: "",
    source: "website",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  if (pathname === "/services") return null;
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addEnquiry(form);

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }

      setSuccessMsg("Your enquiry has been sent successfully!");
      setErrorMsg("");
      setForm({
        name: "",
        company: "",
        mobile: "",
        service: "",
      });

      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Background Overlay - Solid dark without blur
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-lg w-full max-w-4xl relative flex flex-col md:flex-row shadow-2xl overflow-hidden border border-gray-100">
        {/* Success Overlay */}
        {successMsg && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/95 transition-all">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
              <p className="text-gray-600 mt-2">{successMsg}</p>
            </div>
          </div>
        )}

        {/* LEFT IMAGE - Adjusted Height & Fitting */}
        <div className="md:w-[55%] hidden md:block relative bg-[#f8fafc] border-r border-gray-100">
          <div className="absolute inset-0 p-0 flex items-center justify-center">
            <div className="relative w-full h-[85%]">
              {" "}
              {/* Image height limited to 85% of container */}
              <Image
                src="/koopindia-popup-image.png"
                alt="Business Solutions"
                fill
                className="object-contain" // Changed to object-contain so image is not stretched
                priority
              />
            </div>
          </div>
          {/* Subtle logo or text on image side if needed */}
        </div>

        {/* RIGHT FORM - Clean 45% Width */}
        <div className="md:w-[45%] w-full p-4 flex flex-col justify-center bg-white relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors p-1 z-10"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
              Build Your <span className="text-[#F97316]">Success Story</span>
            </h2>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              Join with{" "}
              <span className="font-semibold text-gray-700">
                Koop India for{" "}
              </span>{" "}
              expert business solutions.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all text-gray-700 text-sm"
              required
              disabled={isSubmitting}
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all text-gray-700 text-sm"
              required
              disabled={isSubmitting}
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all text-gray-700 text-sm"
              required
              disabled={isSubmitting}
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all text-gray-600 bg-white text-sm"
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Looking For
              </option>
              <option value="GST Registration & Filing">
                GST Registration & Filing
              </option>
              <option value="Company Registration">Company Registration</option>
              <option value="Trademark Registration">
                Trademark Registration
              </option>
              <option value="Website Development">Website Development</option>
              <option value="Social Media Marketing">
                Social Media Marketing
              </option>
              <option value="FSSAI License">FSSAI License</option>
              <option value="ISO Certification">ISO Certification</option>
              <option value="Other Services">Other Services</option>
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F97316] hover:bg-orange-600 text-white cursor-pointer py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
            >
              {isSubmitting ? "Processing..." : "GET FREE CONSULTATION →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
