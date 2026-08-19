// Admin Auth Utility — Firestore-backed users, localStorage session
import { db } from "../../../lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  query, where, serverTimestamp,
} from "firebase/firestore";

export const ALL_PERMISSIONS = [
  { key: "dashboard",  label: "Dashboard",        icon: "LayoutDashboard" },
  { key: "buyers",     label: "Buyer Listings",   icon: "Building2"       },
  { key: "sellers",    label: "Seller Listings",  icon: "Store"           },
  { key: "leads",      label: "Lead Manager",     icon: "Users"           },
  { key: "buyers",     label: "Buyer Leads",      icon: "ShoppingBag"     },
  { key: "blog",       label: "Blog Manager",     icon: "FileText"        },
  { key: "analytics",  label: "Analytics",        icon: "BarChart3"       },
  { key: "settings",   label: "Site Settings",    icon: "Settings"        },
  { key: "users",      label: "User Management",  icon: "UserCog"         },
];

// ── Session helpers ──────────────────────────────────────────────
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("ki_admin_session");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return;
  localStorage.setItem("ki_admin_session", JSON.stringify(user));
}

export async function login(email, password) {
  // Check Firestore users collection
  try {
    const q = query(collection(db, "users"), where("email", "==", email.toLowerCase()));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const userData = snap.docs[0].data();
      if (userData.password === password) {


        const session = {
          id: snap.docs[0].id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          permissions: userData.permissions || [],
          loginAt: Date.now(),
        };
        localStorage.setItem("ki_admin_session", JSON.stringify(session));

        // Call the API route to set the HTTP-only cookie
        try {
          await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: session }),
          });
        } catch (e) {
          console.error("Failed to set secure cookie:", e);
        }

        return { success: true, user: session };
      }
    }
  } catch (e) {
    console.error("Firestore login error:", e);
    return { success: false, error: "An error occurred during login." };
  }

  return { success: false, error: "Invalid email or password" };
}

export async function logout() {
  localStorage.removeItem("ki_admin_session");
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (e) {
    console.error("Failed to clear secure cookie:", e);
  }
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === "admin";
}

export function hasPermission(key) {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === "admin") return true;
  return Array.isArray(user.permissions) && user.permissions.includes(key);
}

// ── Firestore User Management (admin only) ─────────────────
export async function getFirestoreUsers() {
  try {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
  } catch (e) {
    console.error("getFirestoreUsers error:", e);
    return [];
  }
}

export async function createFirestoreUser(data) {
  try {
    // Check if email exists
    const q = query(collection(db, "users"), where("email", "==", data.email.toLowerCase()));
    const existing = await getDocs(q);
    if (!existing.empty) return { success: false, error: "Email already exists" };

    const newUser = {
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      role: data.role || "user",
      permissions: data.permissions || [],
      assignedLeads: [],
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "users"), newUser);
    return { success: true, user: { firestoreId: docRef.id, ...newUser } };
  } catch (e) {
    console.error("createFirestoreUser error:", e);
    return { success: false, error: e.message };
  }
}

export async function updateFirestoreUser(firestoreId, data) {
  try {
    await updateDoc(doc(db, "users", firestoreId), { ...data, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (e) {
    console.error("updateFirestoreUser error:", e);
    return { success: false, error: e.message };
  }
}

export async function deleteFirestoreUser(firestoreId) {
  try {
    await deleteDoc(doc(db, "users", firestoreId));
    return { success: true };
  } catch (e) {
    console.error("deleteFirestoreUser error:", e);
    return { success: false, error: e.message };
  }
}

// ── Assign lead to user ──────────────────────────────────────────
export async function assignLeadToUser(leadId, userId, userName) {
  try {
    await updateDoc(doc(db, "leads", leadId), {
      assignedTo: userId,
      assignedToName: userName,
      assignedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (e) {
    console.error("assignLeadToUser error:", e);
    return { success: false, error: e.message };
  }
}
