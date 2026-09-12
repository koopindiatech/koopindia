// Admin Auth Utility — Firestore-backed users, localStorage session
import { db } from "../../../lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  query, where, serverTimestamp, arrayUnion
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
  try {
    // 1. Check Admin / General Users
    let q = query(collection(db, "users"), where("email", "==", email.toLowerCase()));
    let snap = await getDocs(q);
    if (!snap.empty) {
      const userData = snap.docs[0].data();
      if (userData.password === password) {
        const session = {
          id: snap.docs[0].id,
          name: userData.name,
          email: userData.email,
          role: userData.role || "user",
          permissions: userData.permissions || [],
          loginAt: Date.now(),
        };
        localStorage.setItem("ki_admin_session", JSON.stringify(session));
        try { await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: session }) }); } catch(e) {}
        return { success: true, user: session, role: session.role };
      }
    }

    // 2. Check Sellers
    q = query(collection(db, "seller_users"), where("email", "==", email.toLowerCase()));
    snap = await getDocs(q);
    if (!snap.empty) {
      const userData = snap.docs[0].data();
      if (userData.password === password) {
        if (userData.status === "suspended") return { success: false, error: "Your account has been suspended. Contact admin." };
        const session = {
          id: snap.docs[0].id,
          name: userData.name,
          email: userData.email,
          linkedSlug: userData.linkedSlug,
          linkedId: userData.linkedId,
          role: "seller",
          loginAt: Date.now(),
        };
        localStorage.setItem("ki_admin_session", JSON.stringify(session));
        try { await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: session }) }); } catch(e) {}
        return { success: true, user: session, role: "seller" };
      }
    }

    // 3. Check Buyers
    q = query(collection(db, "buyer_users"), where("email", "==", email.toLowerCase()));
    snap = await getDocs(q);
    if (!snap.empty) {
      const userData = snap.docs[0].data();
      if (userData.password === password) {
        if (userData.status === "suspended") return { success: false, error: "Your account has been suspended. Contact admin." };
        const session = {
          id: snap.docs[0].id,
          name: userData.name,
          email: userData.email,
          linkedSlug: userData.linkedSlug,
          linkedId: userData.linkedId,
          role: "buyer",
          loginAt: Date.now(),
        };
        localStorage.setItem("ki_admin_session", JSON.stringify(session));
        try { await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: session }) }); } catch(e) {}
        return { success: true, user: session, role: "buyer" };
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

// ── Assign lead to admin user ──────────────────────────────────────────
export async function assignLeadToUser(leadId, userId, userName) {
  try {
    await updateDoc(doc(db, "leads", leadId), {
      assignedTo: userId,
      assignedToName: userName,
      assignedAt: serverTimestamp(),
      history: arrayUnion({
        action: `Assigned to user: ${userName}`,
        timestamp: new Date().toISOString(), // Use ISO string for consistent sorting in UI without serverTimestamp delay
        user: getCurrentUser()?.name || "System"
      })
    });
    return { success: true };
  } catch (e) {
    console.error("assignLeadToUser error:", e);
    return { success: false, error: e.message };
  }
}

// ── Assign lead to a Seller (by slug) ─────────────────────────────────
export async function assignLeadToSeller(leadId, sellerSlug, sellerName) {
  try {
    await updateDoc(doc(db, "leads", leadId), {
      assignedToSellerSlug: sellerSlug || null,
      assignedToSellerName: sellerName || null,
      assignedToSellerAt: sellerSlug ? serverTimestamp() : null,
      history: arrayUnion({
        action: sellerSlug ? `Assigned to Seller: ${sellerName}` : "Unassigned from Seller",
        timestamp: new Date().toISOString(),
        user: getCurrentUser()?.name || "System"
      })
    });
    return { success: true };
  } catch (e) {
    console.error("assignLeadToSeller error:", e);
    return { success: false, error: e.message };
  }
}

// ── Assign lead to a Buyer (by slug) ──────────────────────────────────
export async function assignLeadToBuyer(leadId, buyerSlug, buyerName) {
  try {
    await updateDoc(doc(db, "leads", leadId), {
      assignedToBuyerSlug: buyerSlug || null,
      assignedToBuyerName: buyerName || null,
      assignedToBuyerAt: buyerSlug ? serverTimestamp() : null,
      history: arrayUnion({
        action: buyerSlug ? `Assigned to Buyer: ${buyerName}` : "Unassigned from Buyer",
        timestamp: new Date().toISOString(),
        user: getCurrentUser()?.name || "System"
      })
    });
    return { success: true };
  } catch (e) {
    console.error("assignLeadToBuyer error:", e);
    return { success: false, error: e.message };
  }
}

// ── Seller users ──────────────────────────────────────────
export async function getFirestoreSellerUsers() {
  const s = await getDocs(collection(db, "seller_users"));
  return s.docs.map(d => ({id:d.id, ...d.data()}));
}
export async function createSellerUser(data) {
  const ref = await addDoc(collection(db, "seller_users"), {...data, createdAt: serverTimestamp()});
  return {success:true, user:{id:ref.id, ...data}};
}
export async function updateSellerUser(id, data) {
  await updateDoc(doc(db, "seller_users", id), {...data, updatedAt: serverTimestamp()});
  return {success:true};
}
export async function deleteSellerUser(id) {
  await deleteDoc(doc(db, "seller_users", id));
  return {success:true};
}

// ── Buyer users ──────────────────────────────────────────
export async function getFirestoreBuyerUsers() {
  const s = await getDocs(collection(db, "buyer_users"));
  return s.docs.map(d => ({id:d.id, ...d.data()}));
}
export async function createBuyerUser(data) {
  const ref = await addDoc(collection(db, "buyer_users"), {...data, createdAt: serverTimestamp()});
  return {success:true, user:{id:ref.id, ...data}};
}
export async function updateBuyerUser(id, data) {
  await updateDoc(doc(db, "buyer_users", id), {...data, updatedAt: serverTimestamp()});
  return {success:true};
}
export async function deleteBuyerUser(id) {
  await deleteDoc(doc(db, "buyer_users", id));
  return {success:true};
}
