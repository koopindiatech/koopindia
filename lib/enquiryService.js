import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";

export async function addEnquiry(formData) {
  const counterRef = doc(db, "counters", "enquiryCounter");
  const counterSnap = await getDoc(counterRef);
  let newNumber;

  if (!counterSnap.exists()) {
    await setDoc(counterRef, { count: 1 });
    newNumber = 1;
  } else {
    newNumber = counterSnap.data().count + 1;
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

  const dataToSave = {
    id: uniqueId,
    ...formData,
    createdAt: formattedDateTime, // use IST formatted date
  };

  // Save to Firestore
  const enquiryRef = doc(db, "enquiries", uniqueId);
  await setDoc(enquiryRef, dataToSave);

  return uniqueId;
}
