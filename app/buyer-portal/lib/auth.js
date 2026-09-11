// Buyer Portal Auth — Firestore-backed, localStorage session
import { db } from "../../../lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  query, where, serverTimestamp,
} from "firebase/firestore";

const SESSION_KEY = "ki_buyer_session";

// ── Session helpers ──────────────────────────────────────────────
export function getBuyerUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setBuyerUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function buyerLogin(email, password) {
  try {
    const q = query(
      collection(db, "buyer_users"),
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
          role: "buyer",
          loginAt: Date.now(),
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        try {
          await fetch("/api/auth/buyer-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: session }),
          });
        } catch (e) {
          console.error("Failed to set buyer cookie:", e);
        }

        return { success: true, user: session };
      }
    }
  } catch (e) {
    console.error("Buyer login error:", e);
    return { success: false, error: "An error occurred during login." };
  }
  return { success: false, error: "Invalid email or password." };
}

export async function buyerLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
  try {
    await fetch("/api/auth/buyer-logout", { method: "POST" });
  } catch (e) {
    console.error("Failed to clear buyer cookie:", e);
  }
}

// ── Firestore Buyer User Management (admin only) ────────────────
export async function getFirestoreBuyerUsers() {
  try {
    const snap = await getDocs(collection(db, "buyer_users"));
    return snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
  } catch (e) {
    console.error("getFirestoreBuyerUsers error:", e);
    return [];
  }
}

export async function createBuyerUser(data) {
  try {
    const q = query(
      collection(db, "buyer_users"),
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
    const docRef = await addDoc(collection(db, "buyer_users"), newUser);
    return { success: true, user: { firestoreId: docRef.id, ...newUser } };
  } catch (e) {
    console.error("createBuyerUser error:", e);
    return { success: false, error: e.message };
  }
}

export async function updateBuyerUser(firestoreId, data) {
  try {
    await updateDoc(doc(db, "buyer_users", firestoreId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (e) {
    console.error("updateBuyerUser error:", e);
    return { success: false, error: e.message };
  }
}

export async function deleteBuyerUser(firestoreId) {
  try {
    await deleteDoc(doc(db, "buyer_users", firestoreId));
    return { success: true };
  } catch (e) {
    console.error("deleteBuyerUser error:", e);
    return { success: false, error: e.message };
  }
}
