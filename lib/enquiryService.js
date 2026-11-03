import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

export async function addEnquiry(formData) {
  const counterRef = doc(db, "counters", "enquiryCounter");
  const counterSnap = await getDoc(counterRef);
  let newNumber;

  if (!counterSnap.exists()) {
    await setDoc(counterRef, { count: 1 });
    newNumber = 1;
  } else {
    newNumber = (counterSnap.data()?.count || 0) + 1;
    await updateDoc(counterRef, { count: increment(1) });
  }

  const uniqueId = `KI${String(newNumber).padStart(5, "0")}`;

  // Get IST date/time
  const now = new Date();
  const istDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const formattedDateTime = `${String(istDate.getDate()).padStart(2, '0')}/${
    String(istDate.getMonth() + 1).padStart(2, '0')
  }/${istDate.getFullYear()} ${
    String(istDate.getHours()).padStart(2, '0')
  }:${String(istDate.getMinutes()).padStart(2, '0')}:${
    String(istDate.getSeconds()).padStart(2, '0')
  }`;

  const cleanName = formData.name || formData.displayName || formData.fullName || "";
  const cleanPhone = formData.phone || formData.mobile || "";
  const cleanCompany = formData.company || formData.companyName || cleanName || "";
  const cleanEmail = formData.email || formData.mailId || "";
  const cleanService = formData.service || formData.serviceType || "Website Development";
  const cleanCategory = formData.category || cleanService;
  const cleanReq = formData.requirements || formData.message || formData.notes || "";
  const cleanState = formData.state || "";
  const cleanCity = formData.city || "";
  const cleanSource = formData.source || "website";

  const dataToSave = {
    id: uniqueId,
    profileId: uniqueId,
    ...formData,
    name: cleanName,
    displayName: cleanName,
    company: cleanCompany,
    displayCompany: cleanCompany,
    phone: cleanPhone,
    mobile: cleanPhone,
    displayPhone: cleanPhone,
    email: cleanEmail,
    displayEmail: cleanEmail,
    service: cleanService,
    category: cleanCategory,
    displayCategory: cleanCategory,
    requirements: cleanReq,
    message: cleanReq,
    state: cleanState,
    displayState: cleanState,
    city: cleanCity,
    displayCity: cleanCity,
    source: cleanSource,
    status: formData.status || "New",
    history: [
      {
        action: `Lead received via ${cleanSource}`,
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: serverTimestamp(),
    createdAtFormatted: formattedDateTime,
    updatedAt: serverTimestamp(),
  };

  // 1. Save to "leads" collection so the CRM (Admin Panel -> /adminpanel/leads) gets it directly
  const leadRef = doc(db, "leads", uniqueId);
  await setDoc(leadRef, dataToSave);

  // 2. Also save to "enquiries" collection for complete backup and legacy compatibility
  const enquiryRef = doc(db, "enquiries", uniqueId);
  await setDoc(enquiryRef, {
    ...dataToSave,
    createdAt: formattedDateTime, // keep legacy string format here
  });

  return uniqueId;
}
