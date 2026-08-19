import Link from "next/link";
import Image from "next/image";



const ini = (n = "") =>
  n
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();

export default function BuyerCard({ b }) {
  const color = b.primaryColor || "#1e3a5f";
  const safeStr = (v) => (typeof v === "string" ? v : v?.name || v?.label || "");
  const rows = [
    { label: "Business Type", val: b.businessType || b.natureOfBusiness || "Buyer" },
    { label: "Location", val: (b.city ? b.city + ", " : "") + (b.state || "India") },
    { label: "Category", val: safeStr(b.category) || "General" },
    { label: "Certification", val: safeStr(b.certifications?.[0]) || b.certification || "GST / MSME" },
  ];

  return (
    <Link
      href={b.slug ? `/buyers/${b.slug}` : "/marketplace"}
      target="_blank"
      className="flex flex-col bg-white rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}
    >
      {/* Badge */}
      <div className="px-3 pt-3 pb-0">
        <span
          className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-2 py-0.5 rounded text-white"
          style={{ background: color }}
        >
          ★ Premium
        </span>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center pt-2 pb-1.5 px-3">
        <div className="w-full h-[90px] rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center relative">
          {b.logoUrl ? (
            <Image
              src={b.logoUrl}
              alt={b.buyerName || "Logo"}
              fill
              className="object-contain p-1.5"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          ) : (
            <span className="font-black text-xl" style={{ color }}>
              {ini(b.buyerName)}
            </span>
          )}
        </div>
      </div>

      {/* Category + Name */}
      <div className="px-3 pb-1.5">
        <p className="text-[10px] font-bold mb-0.5 truncate" style={{ color }}>
          {b.category || b.businessType || "Buyer"}
        </p>
        <p className="font-extrabold text-gray-900 text-[12px] leading-snug line-clamp-1">
          {b.buyerName}
        </p>
      </div>

      {/* Details */}
      <div className="px-3 pb-2 flex-1">
        <div className="border-t border-gray-100 pt-1.5 space-y-1">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start justify-between gap-1">
              <span className="text-gray-400 text-[9px] font-medium flex-shrink-0">{r.label}:</span>
              <span className="text-[9px] font-bold text-right line-clamp-1" style={{ color }}>
                {r.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-3 pb-3">
        <span
          className="block w-full text-center text-[11px] font-bold py-1.5 rounded-lg border-2 transition-all"
          style={{ color, borderColor: color, background: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = color;
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = color;
          }}
        >
          Contact Buyer
        </span>
      </div>
    </Link>
  );
}
