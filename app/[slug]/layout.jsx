import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const q = query(collection(db, "sellers"), where("slug", "==", slug));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const seller = snap.docs[0].data();
      const title = `${seller.name || seller.companyName} | Koop India`;
      let desc = seller.aboutText || seller.description || "";
      if (desc.length > 150) desc = desc.substring(0, 147) + "...";
      if (!desc) {
        desc = `${seller.name || seller.companyName} is a verified seller on Koop India. View their product catalog, certifications, and contact details.`;
      }
      return {
        title,
        description: desc,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata for seller:", error);
  }

  return {
    title: "Seller Profile | Koop India",
    description: "View verified sellers and manufacturers on Koop India.",
  };
}

export default function SellerLayout({ children }) {
  return <>{children}</>;
}
