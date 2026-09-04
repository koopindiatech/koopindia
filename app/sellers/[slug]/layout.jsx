import { db } from "../../../lib/firebase";
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
      
      const images = [];
      if (seller.logoUrl) images.push(seller.logoUrl);
      if (seller.homeBannerUrl) images.push(seller.homeBannerUrl);
      if (seller.aboutImageUrl) images.push(seller.aboutImageUrl);

      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          images: images.length > 0 ? images : undefined,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description: desc,
          images: images.length > 0 ? images : undefined,
        },
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
