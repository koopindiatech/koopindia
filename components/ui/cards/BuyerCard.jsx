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

  const getCertification = () => {
    const validCert = (b.certifications || [])
      .map(safeStr)
      .map(c => c.replace(/\bfssai\b/gi, "").replace(/^[/\s,&-]+|[/\s,&-]+$/g, "").trim())
      .find(c => Boolean(c));
    if (validCert) return validCert;

    if (b.certification) {
      const cleanSingle = b.certification.replace(/\bfssai\b/gi, "").replace(/^[/\s,&-]+|[/\s,&-]+$/g, "").trim();
      if (cleanSingle) return cleanSingle;
    }
    return "GST / MSME";
  };

  const rows = [
    { label: "Business Type", val: b.businessType || b.natureOfBusiness || "Buyer" },
    { label: "Location", val: (b.city ? b.city + ", " : "") + (b.state || "India") },
    { label: "Category", val: safeStr(b.category) || "General" },
    { label: "Certification", val: getCertification() },
  ];

  return (
    <Link
      href={b.slug ? `/buyers/${b.slug}` : "/marketplace"}
      target="_blank"
      className="flex flex-col bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100"
      style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
    >
      <div className="px-4 pt-3.5 pb-0">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md text-white shadow-xs"
          style={{ background: color }}
        >
          ★ Premium
        </span>
      </div>

      <div className="flex items-center justify-center pt-2.5 pb-2 px-4">
        <div className="w-full h-[105px] rounded-xl overflow-hidden bg-gray-50/70 border border-gray-100 flex items-center justify-center relative">
          {b.logoUrl ? (
            <Image
              src={b.logoUrl}
              alt={b.buyerName || "Logo"}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, 240px"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="font-black text-2xl" style={{ color }}>
              {ini(b.buyerName)}
            </span>
          )}
        </div>
      </div>

      {/* Category + Name */}
      <div className="px-4 pb-2 pt-1">
        <p className="text-[11px] font-bold mb-1 truncate" style={{ color }}>
          {b.category || b.businessType || "Buyer"}
        </p>
        <p className="font-extrabold text-gray-900 text-[13px] sm:text-sm leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors">
          {b.buyerName}
        </p>
      </div>

      <div className="px-4 pb-3 flex-1">
        <div className="border-t border-gray-100 pt-2 space-y-1.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start justify-between gap-1.5">
              <span className="text-gray-400 text-[10px] font-medium flex-shrink-0">{r.label}:</span>
              <span className="text-[10px] font-bold text-right line-clamp-1" style={{ color }}>
                {r.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <span
          className="block w-full text-center text-xs font-bold py-2 rounded-xl border-2 transition-all cursor-pointer"
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
