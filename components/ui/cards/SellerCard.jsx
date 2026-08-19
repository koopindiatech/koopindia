import Link from "next/link";
import Image from "next/image";



const ini = (n = "") =>
  n
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();

export default function SellerCard({ s }) {
  const color = s.primaryColor || "#1e3a5f";
  const badge = s.status === "live" ? "Premium" : "Verified";
  const safeStr = (v) => (typeof v === "string" ? v : v?.name || v?.label || "");
  const rows = [
    { label: "Business Type", val: s.natureOfBusiness || s.businessType || "Manufacturer" },
    { label: "Location", val: (s.city ? s.city + ", " : "") + (s.state || "India") },
    { label: "Category", val: safeStr(s.productCategories?.[0]) || s.category || "General" },
    { label: "Certification", val: safeStr(s.certifications?.[0]) || s.certification || "FSSAI / GST" },
  ];

  return (
    <Link
      href={s.slug ? `/${s.slug}` : "/marketplace"}
      target="_blank"
      className="flex flex-col bg-white rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}
    >
      {/* Badge */}
      <div className="px-3 pt-3 pb-0">
        <span
          className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-2 py-0.5 rounded text-white"
          style={{ background: badge === "Premium" ? "#1e3a5f" : "#6b7280" }}
        >
          {badge === "Premium" ? "★ " : "✔ "}
          {badge}
        </span>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center pt-2 pb-1.5 px-3">
        <div className="w-full h-[90px] rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center relative">
          {s.logoUrl ? (
            <Image
              src={s.logoUrl}
              alt={s.name || "Logo"}
              fill
              className="object-contain p-1.5"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          ) : (
            <span className="font-black text-xl" style={{ color }}>
              {ini(s.name)}
            </span>
          )}
        </div>
      </div>

      {/* Category + Name */}
      <div className="px-3 pb-1.5">
        <p className="text-[10px] font-bold mb-0.5 truncate" style={{ color }}>
          {s.category || s.natureOfBusiness || "Manufacturer"}
        </p>
        <p className="font-extrabold text-gray-900 text-[12px] leading-snug line-clamp-1">
          {s.name || s.companyName}
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
          Contact Seller
        </span>
      </div>
    </Link>
  );
}
