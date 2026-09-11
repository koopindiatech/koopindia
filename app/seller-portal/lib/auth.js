// Seller Portal Auth — Firestore-backed, localStorage session
import { db } from "../../../lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  query, where, serverTimestamp,
} from "firebase/firestore";

const SESSION_KEY = "ki_seller_session";

// ── Session helpers ──────────────────────────────────────────────
export function getSellerUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSellerUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function sellerLogin(email, password) {
  try {
    const q = query(
      collection(db, "seller_users"),
      where("email", "==", email.toLowerCase())
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const userData = snap.docs[0].data();
      if (userData.password === password) {
        if (userData.status === "suspended") {
          return { success: false, error: "Your account has been suspended. Contact admin." };
        }
        const session = {
          id: snap.docs[0].id,
          name: userData.name,
          email: userData.email,
          linkedSlug: userData.linkedSlug,
          linkedId: userData.linkedId,
          role: "seller",
          loginAt: Date.now(),
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        try {
          await fetch("/api/auth/seller-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: session }),
          });
        } catch (e) {
          console.error("Failed to set seller cookie:", e);
        }

        return { success: true, user: session };
      }
    }
  } catch (e) {
    console.error("Seller login error:", e);
    return { success: false, error: "An error occurred during login." };
  }
  return { success: false, error: "Invalid email or password." };
}

export async function sellerLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
  try {
    await fetch("/api/auth/seller-logout", { method: "POST" });
  } catch (e) {
    console.error("Failed to clear seller cookie:", e);
  }
}

// ── Firestore Seller User Management (admin only) ───────────────
export async function getFirestoreSellerUsers() {
  try {
    const snap = await getDocs(collection(db, "seller_users"));
    return snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
  } catch (e) {
    console.error("getFirestoreSellerUsers error:", e);
    return [];
  }
}

export async function createSellerUser(data) {
  try {
    const q = query(
      collection(db, "seller_users"),
      where("email", "==", data.email.toLowerCase())
    );
    const existing = await getDocs(q);
    if (!existing.empty) return { success: false, error: "Email already exists" };

    const newUser = {
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      linkedSlug: data.linkedSlug || "",
      linkedId: data.linkedId || "",
      status: "active",
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "seller_users"), newUser);
    return { success: true, user: { firestoreId: docRef.id, ...newUser } };
  } catch (e) {
    console.error("createSellerUser error:", e);
    return { success: false, error: e.message };
  }
}

export async function updateSellerUser(firestoreId, data) {
  try {
    await updateDoc(doc(db, "seller_users", firestoreId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (e) {
    console.error("updateSellerUser error:", e);
    return { success: false, error: e.message };
  }
}

export async function deleteSellerUser(firestoreId) {
  try {
    await deleteDoc(doc(db, "seller_users", firestoreId));
    return { success: true };
  } catch (e) {
    console.error("deleteSellerUser error:", e);
    return { success: false, error: e.message };
  }
}
