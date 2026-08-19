import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import BuyerClientPage from "./BuyerClientPage";

// Recursively convert Firestore Timestamps and non-serializable values to plain JS
function serialize(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  // Firestore Timestamp has a toMillis method
  if (typeof obj.toMillis === "function") return obj.toMillis();
  if (Array.isArray(obj)) return obj.map(serialize);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, serialize(v)])
  );
}

export default async function BuyerPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let initialBuyer = null;

  try {
    const q = query(collection(db, "buyers"), where("slug", "==", slug));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const d = snap.docs[0];
      const data = d.data();

      const proxy = (u) =>
        u && typeof u === "string" && u.startsWith("http") && u.includes("firebase")
          ? `/api/img?url=${encodeURIComponent(u)}`
          : u;

      const raw = {
        id: d.id,
        ...data,
        logoUrl: proxy(data.logoUrl),
        // Support both old 'coverUrl' field and new 'coverImageUrl' field
        coverImageUrl: proxy(data.coverImageUrl || data.coverUrl),
        contactPhotoUrl: proxy(data.contactPhotoUrl),
        buyersWeWorkWith: (data.buyersWeWorkWith || []).map((b) => ({ ...b, logoUrl: proxy(b.logoUrl) })),
      };


      // Serialize to strip Firestore Timestamps and other non-plain objects
      initialBuyer = serialize(raw);
    }
  } catch (error) {
    console.error("Error fetching buyer:", error);
  }

  return <BuyerClientPage initialBuyer={initialBuyer} />;
}
