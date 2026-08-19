import { db } from "../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const q = query(collection(db, "buyers"), where("slug", "==", slug));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const buyer = snap.docs[0].data();
      const title = `${buyer.buyerName || buyer.name || buyer.companyName} | Koop India Buyer`;
      let desc = buyer.aboutText || buyer.description || "";
      if (desc.length > 150) desc = desc.substring(0, 147) + "...";
      if (!desc) {
        desc = `${buyer.buyerName || buyer.name || buyer.companyName} is looking for verified suppliers on Koop India. View their requirements and connect directly.`;
      }
      return {
        title,
        description: desc,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata for buyer:", error);
  }

  return {
    title: "Buyer Profile | Koop India",
    description: "View verified buyers and their requirements on Koop India.",
  };
}

export default function BuyerLayout({ children }) {
  return <>{children}</>;
}
