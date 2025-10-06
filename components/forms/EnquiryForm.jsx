"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { addEnquiry } from "@/lib/enquiryService";

export default function EnquiryModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    city: "",
    service: "",
  });

  const [successMsg, setSuccessMsg] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");     
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const leadId = await addEnquiry(form);
      setSuccessMsg(`Your enquiry has been sent successfully!`);
      setErrorMsg("");
      setForm({
        name: "",
        company: "",
        mobile: "",
        email: "",
        city: "",
        service: "",
      });
      
      // Auto close after 3s
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error saving enquiry:", error);
      setErrorMsg("Something went wrong. Please try again!");
      setSuccessMsg("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
        <Dialog.Panel
          className="bg-white rounded-xl w-full max-w-md md:max-w-4xl p-4 sm:p-6 relative 
          flex flex-col md:flex-row shadow-xl overflow-y-auto max-h-[95vh] border border-gray-300"
        >
           {/* Success Overlay */}
          {successMsg && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-gray-200
                w-[80%] max-w-sm h-[50%]">
                <div className="text-center p-4 max-w-xs">
                  <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-[#F97316] to-orange-500 mb-3 shadow-lg">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 text-xs mb-3">{successMsg}</p>
                  <div className="flex items-center justify-center space-x-2 text-[#F97316]">
                    <div className="animate-pulse">📧</div>
                    <span className="text-xs">We'll get back to you soon!</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Left Image (hidden on phones) */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-[#141d32]">
            <Image
              src="/form-image.png"
              alt="Person"
              width={450}
              height={500}
              className="rounded-lg max-h-[500px] object-contain"
            />
          </div>

          {/* Right Form */}
          <div className="md:w-1/2 w-full px-2 sm:px-6 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 text-center md:text-left">
              Unlocking <span className="text-[#F97316]">Your Business</span> Potential
            </h2>
            <p className="mb-4 text-gray-600 text-xs sm:text-sm text-center md:text-left">
              Empowering Startups & Businesses with expert strategies and actionable solutions tailored for growth.
            </p>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errorMsg}</p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] text-gray-700 text-sm"
                required
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] text-gray-700 text-sm"
                required
                disabled={isSubmitting}
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] text-gray-700 text-sm"
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] text-gray-700 text-sm"
                required
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] text-gray-700 text-sm"
                required
                disabled={isSubmitting}
              />

              {/* Dropdown */}
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#F97316] text-gray-700 text-sm"
                required
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Looking For
                </option>
                <option value="GST Registration">GST Registration</option>
                <option value="Trademark Registration">Trademark Registration</option>
                <option value="Company Registration">Company Registration</option>
                <option value="Food Licence">Food Licence</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Website">Website</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#F97316] to-orange-500 text-white py-2 sm:py-3 rounded-md 
                  cursor-pointer font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl 
                  hover:from-orange-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02]
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "SEND →"
                )}
              </button>
            </form>

            <p className="text-[11px] sm:text-xs text-gray-500 mt-2 text-center md:text-left">
              Signup today to claim your Discount. Get Started before it's too late!
            </p>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-600 cursor-pointer hover:text-black text-lg sm:text-xl font-bold z-20"
            >
              ×
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}