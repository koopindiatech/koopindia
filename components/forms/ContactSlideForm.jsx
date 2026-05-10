"use client";
import { useState } from "react";
import { X } from "lucide-react"; 
import { addEnquiry } from "@/lib/enquiryService";

export default function ContactSlideForm({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    agreed: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) return alert("Please agree to terms");
    
    setLoading(true);
    try {
      await addEnquiry({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        message: formData.service,
        source: "Sidebar-Floating",
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", mobile: "", email: "", service: "", agreed: false });
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[110] transition-opacity duration-300 ${
          open ? "bg-black/40 opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Floating Card - Dark Theme */}
      <div
        className={`fixed right-4 top-2/3 -translate-y-1/2 z-[120] w-[90%] max-w-[340px] bg-[#141d32] rounded-2xl shadow-2xl border border-white/10 transform transition-all duration-300 ease-in-out ${
          open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-[#F97316] transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-white mb-1 mt-1">
            Contact <span className="text-[#F97316]">Us</span>
          </h2>
          <div className="w-10 h-1 bg-[#F97316] mb-6 rounded-full"></div>

          {submitted ? (
            <div className="py-10 text-center animate-in fade-in zoom-in">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} /> 
              </div>
              <h3 className="text-lg font-bold text-white">Thank You!</h3>
              <p className="text-sm text-gray-400">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                placeholder="Which service are you interested in?"
                rows="3"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none resize-none"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              ></textarea>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  className="rounded border-white/20 bg-white/5 text-[#F97316] focus:ring-[#F97316] focus:ring-offset-0"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                />
                <span className="text-[11px] text-gray-400">
                  I agree to the terms and conditions.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F97316] text-white font-bold cursor-pointer py-3 rounded-xl hover:bg-[#ea6300] transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:bg-gray-600 mt-2"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

const CheckCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);