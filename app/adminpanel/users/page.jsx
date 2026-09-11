"use client";
import { useState, useEffect } from "react";
import {
  UserCog, Plus, Trash2, Edit2, Shield, Eye, EyeOff,
  Users, Check, X, Loader2, RefreshCw, UserPlus, Store, ShoppingBag,
  ExternalLink, Link as LinkIcon,
} from "lucide-react";
import {
  getFirestoreUsers, createFirestoreUser, updateFirestoreUser,
  deleteFirestoreUser, getCurrentUser, isAdmin as checkIsAdmin,
} from "../lib/auth";
import {
  getFirestoreSellerUsers, createSellerUser, updateSellerUser, deleteSellerUser,
} from "../../seller-portal/lib/auth";
import {
  getFirestoreBuyerUsers, createBuyerUser, updateBuyerUser, deleteBuyerUser,
} from "../../buyer-portal/lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 font-medium transition-all";

// ─── Shared Delete Confirm Modal ─────────────────────────────────────
function DeleteModal({ item, onConfirm, onCancel, saving, type }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="text-red-500" size={24} />
        </div>
        <h3 className="font-black text-gray-900 text-lg mb-1">Delete {type} User?</h3>
        <p className="text-gray-500 text-sm mb-1"><strong>{item.name}</strong> will lose portal access.</p>
        <p className="text-gray-400 text-xs mb-5">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
          <button onClick={onConfirm} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition disabled:opacity-60">
            {saving ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Users Tab ─────────────────────────────────────────────────
function AdminUsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [leadCounts, setLeadCounts] = useState({});
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user", permissions: [] });
  const [error, setError] = useState("");
  const [delConfirm, setDelConfirm] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const us = await getFirestoreUsers();
      setUsers(us);
      const counts = {};
      for (const u of us) {
        try {
          const uid = u.firestoreId || u.id;
          const snap = await getDocs(query(collection(db, "leads"), where("assignedTo", "==", uid)));
          counts[uid] = snap.size;
        } catch { counts[u.firestoreId || u.id] = 0; }
      }
      setLeadCounts(counts);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditUser(null); setForm({ name: "", email: "", password: "", role: "user", permissions: [] }); setError(""); setShowModal(true); };
  const openEdit = (u) => { setEditUser(u); setForm({ name: u.name, email: u.email, password: "", role: u.role || "user", permissions: [...(u.permissions || [])] }); setError(""); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) { setError("Name and email are required."); return; }
    if (!editUser && !form.password.trim()) { setError("Password is required for new users."); return; }
    setSaving(true); setError("");
    try {
      if (editUser) {
        const data = { name: form.name, email: form.email.toLowerCase(), role: form.role, permissions: form.permissions };
        if (form.password.trim()) data.password = form.password;
        const r = await updateFirestoreUser(editUser.firestoreId || editUser.id, data);
        if (!r.success) { setError(r.error || "Update failed"); setSaving(false); return; }
      } else {
        const r = await createFirestoreUser({ name: form.name, email: form.email, password: form.password, role: form.role, permissions: form.permissions });
        if (!r.success) { setError(r.error || "Create failed"); setSaving(false); return; }
      }
      setShowModal(false); await load();
    } catch (e) { setError("Error: " + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (u) => {
    setSaving(true);
    try { await deleteFirestoreUser(u.firestoreId || u.id); await load(); }
    catch (e) { console.error(e); }
    finally { setSaving(false); setDelConfirm(null); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">Team members who can log in to the admin panel.</p>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20">
            <UserPlus size={16} /> Add Admin User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={24} className="animate-spin text-orange-400" />
          <span className="text-sm font-semibold">Loading users...</span>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">👤</div>
          <h3 className="font-bold text-gray-700 text-base mb-1">No admin users yet</h3>
          <p className="text-gray-400 text-sm mb-4">Create team members to assign leads and manage access.</p>
          <button onClick={openAdd} className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md">Create First User</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {users.map((u) => {
            const uid = u.firestoreId || u.id;
            const assignedCount = leadCounts[uid] || 0;
            return (
              <div key={uid} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-black text-base">{u.name?.[0]?.toUpperCase() || "U"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm truncate">{u.name}</p>
                    <p className="text-gray-400 text-xs truncate">{u.email}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${u.role === "admin" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                      {u.role === "admin" ? "⚡ Admin" : "👤 Team Member"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-3 py-2 mb-4 border border-orange-100">
                  <Users size={12} className="text-orange-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-orange-700">{assignedCount} lead{assignedCount !== 1 ? "s" : ""} assigned</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(u)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
                    <Edit2 size={11} /> Edit
                  </button>
                  <button onClick={() => setDelConfirm(u)} className="w-9 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-red-500 transition">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-gray-900 font-black text-lg">{editUser ? "Edit Admin User" : "Create Admin User"}</h2>
                <p className="text-gray-400 text-xs mt-0.5">Access to admin panel</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Rahul Sharma" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="user@company.com" className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password {editUser && <span className="text-gray-400 normal-case font-normal">(optional)</span>}
                  </label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={editUser ? "Leave blank to keep" : "Create password"} className={inp + " pr-10"} />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Role *</label>
                  <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className={inp}>
                    <option value="user">Team Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl">⚠️ {error}</div>}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Check size={14} /> {editUser ? "Save Changes" : "Create User"}</>}
              </button>
            </div>
          </div>
        </div>
      )}
      {delConfirm && <DeleteModal item={delConfirm} onConfirm={() => handleDelete(delConfirm)} onCancel={() => setDelConfirm(null)} saving={saving} type="Admin" />}
    </div>
  );
}

// ─── Reusable Portal Users Tab (for both Seller and Buyer) ──────────
function PortalUsersTab({ type, accentColor, fetchUsers, create, update, remove, slugCollection, slugLabelField, portalPath }) {
  const [portalUsers, setPortalUsers] = useState([]);
  const [slugOptions, setSlugOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", linkedSlug: "", status: "active" });
  const [error, setError] = useState("");
  const [delConfirm, setDelConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isSeller = type === "Seller";

  const load = async () => {
    setLoading(true);
    try {
      const [users, slugSnap] = await Promise.all([
        fetchUsers(),
        getDocs(collection(db, slugCollection)),
      ]);
      setPortalUsers(users);
      setSlugOptions(slugSnap.docs.map((d) => ({ id: d.id, slug: d.data().slug, label: d.data()[slugLabelField] || d.data().slug })));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditUser(null); setForm({ name: "", email: "", password: "", linkedSlug: "", status: "active" }); setError(""); setSearchQuery(""); setDropdownOpen(false); setShowModal(true); };
  const openEdit = (u) => { setEditUser(u); setForm({ name: u.name, email: u.email, password: "", linkedSlug: u.linkedSlug || "", status: u.status || "active" }); setError(""); setSearchQuery(""); setDropdownOpen(false); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) { setError("Name and email are required."); return; }
    if (!editUser && !form.password.trim()) { setError("Password is required."); return; }
    setSaving(true); setError("");
    try {
      if (editUser) {
        const data = { name: form.name, email: form.email.toLowerCase(), linkedSlug: form.linkedSlug, status: form.status };
        if (form.password.trim()) data.password = form.password;
        const r = await update(editUser.firestoreId, data);
        if (!r.success) { setError(r.error || "Update failed"); setSaving(false); return; }
      } else {
        const r = await create({ name: form.name, email: form.email, password: form.password, linkedSlug: form.linkedSlug, status: form.status });
        if (!r.success) { setError(r.error || "Create failed"); setSaving(false); return; }
      }
      setShowModal(false); await load();
    } catch (e) { setError("Error: " + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (u) => {
    setSaving(true);
    try { await remove(u.firestoreId); await load(); }
    catch (e) { console.error(e); }
    finally { setSaving(false); setDelConfirm(null); }
  };

  const toggleStatus = async (u) => {
    const newStatus = u.status === "active" ? "suspended" : "active";
    await update(u.firestoreId, { status: newStatus });
    setPortalUsers((prev) => prev.map((x) => (x.firestoreId === u.firestoreId ? { ...x, status: newStatus } : x)));
  };

  const Icon = isSeller ? Store : ShoppingBag;
  const accent = accentColor;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
            style={{ background: accent, boxShadow: `0 4px 14px ${accent}40` }}>
            <UserPlus size={16} /> Add {type} User
          </button>
        </div>
      </div>



      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={24} className="animate-spin" style={{ color: accent }} />
          <span className="text-sm font-semibold">Loading {type.toLowerCase()} users...</span>
        </div>
      ) : portalUsers.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">{isSeller ? "🏪" : "🛒"}</div>
          <h3 className="font-bold text-gray-700 text-base mb-1">No {type.toLowerCase()} portal users yet</h3>
          <p className="text-gray-400 text-sm mb-4">Create a {type.toLowerCase()} account and link it to their listing.</p>
          <button onClick={openAdd} className="text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md" style={{ background: accent }}>
            Create First {type} User
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portalUsers.map((u) => (
            <div key={u.firestoreId} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-white font-black text-base"
                  style={{ background: `linear-gradient(135deg, ${accent}dd, ${accent}99)` }}>
                  {u.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-gray-900 text-sm truncate">{u.name}</p>
                  <p className="text-gray-400 text-xs truncate">{u.email}</p>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${u.status === "suspended" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {u.status === "suspended" ? "⛔ Suspended" : "✅ Active"}
                  </span>
                </div>
              </div>

              {/* Linked slug */}
              <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4 border"
                style={{ background: `${accent}08`, borderColor: `${accent}20` }}>
                <LinkIcon size={11} style={{ color: accent }} className="flex-shrink-0" />
                <span className="text-xs font-bold truncate" style={{ color: accent }}>
                  {u.linkedSlug ? `/${isSeller ? "" : "buyers/"}${u.linkedSlug}` : "No listing linked"}
                </span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openEdit(u)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
                  <Edit2 size={11} /> Edit
                </button>
                <button onClick={() => toggleStatus(u)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl border transition"
                  style={u.status === "active"
                    ? { borderColor: "#fecaca", background: "#fef2f2", color: "#dc2626" }
                    : { borderColor: "#bbf7d0", background: "#f0fdf4", color: "#16a34a" }}>
                  {u.status === "active" ? "⛔ Suspend" : "✅ Activate"}
                </button>
                <button onClick={() => setDelConfirm(u)} className="w-9 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-red-500 transition">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-gray-900 font-black text-lg">{editUser ? `Edit ${type} User` : `Create ${type} User`}</h2>
                <p className="text-gray-400 text-xs mt-0.5">Access to the {type.toLowerCase()} portal</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Contact person name" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="login@example.com" className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password {editUser && <span className="text-gray-400 normal-case font-normal">(optional)</span>}
                  </label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={editUser ? "Leave blank to keep" : "Set password"} className={inp + " pr-10"} />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inp}>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Link to {type} Listing *
                </label>
                <div className="relative">
                  <div 
                    className={inp + " flex justify-between items-center cursor-pointer select-none"} 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="truncate text-gray-700">
                      {form.linkedSlug ? (
                        <>
                          {slugOptions.find(s => s.slug === form.linkedSlug)?.label} <span className="text-gray-400 font-normal">({form.linkedSlug})</span>
                        </>
                      ) : `— Select a ${type.toLowerCase()} listing —`}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-64 overflow-hidden flex flex-col">
                      <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                        <input 
                          type="text" 
                          placeholder="Search listing..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 transition-all shadow-sm"
                        />
                      </div>
                      <div className="overflow-y-auto py-1">
                        <div 
                          className="px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setForm((p) => ({ ...p, linkedSlug: "" }));
                            setDropdownOpen(false);
                          }}
                        >
                          — Select a {type.toLowerCase()} listing —
                        </div>
                        {slugOptions.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()) || s.slug.toLowerCase().includes(searchQuery.toLowerCase())).map((s) => (
                          <div 
                            key={s.id}
                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${form.linkedSlug === s.slug ? 'bg-orange-50 font-bold text-orange-700' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => {
                              setForm((p) => ({ ...p, linkedSlug: s.slug }));
                              setDropdownOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            {s.label} <span className={`text-xs font-normal ${form.linkedSlug === s.slug ? 'text-orange-500' : 'text-gray-400'}`}>({s.slug})</span>
                          </div>
                        ))}
                        {slugOptions.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()) || s.slug.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-400 text-center">
                            No listings found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">This user will only see leads from this listing.</p>
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl">⚠️ {error}</div>}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: accent }}>
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Check size={14} /> {editUser ? "Save Changes" : `Create ${type} User`}</>}
              </button>
            </div>
          </div>
        </div>
      )}
      {delConfirm && <DeleteModal item={delConfirm} onConfirm={() => handleDelete(delConfirm)} onCancel={() => setDelConfirm(null)} saving={saving} type={type} />}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function UsersPage() {
  const [tab, setTab] = useState("admin");
  const isAdmin = checkIsAdmin();

  if (!isAdmin) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
        <Shield size={28} className="text-red-500" />
      </div>
      <h2 className="text-gray-900 font-bold text-lg">Access Denied</h2>
      <p className="text-gray-500 text-sm">Only Admins can manage users.</p>
    </div>
  );

  const tabs = [
    { id: "admin",  label: "Admin Users",  icon: UserCog,     color: "#f97316", desc: "Admin panel access" },
    { id: "seller", label: "Seller Users", icon: Store,        color: "#2d5a27", desc: "Seller portal access" },
    { id: "buyer",  label: "Buyer Users",  icon: ShoppingBag,  color: "#4c1d95", desc: "Buyer portal access"  },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage admin team members, seller portal accounts, and buyer portal accounts.</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${active ? "text-white border-transparent shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm"}`}
              style={active ? { background: t.color, boxShadow: `0 4px 14px ${t.color}35` } : {}}>
              <Icon size={15} />
              {t.label}
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                {t.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === "admin" && <AdminUsersTab />}
      {tab === "seller" && (
        <PortalUsersTab
          type="Seller"
          accentColor="#2d5a27"
          fetchUsers={getFirestoreSellerUsers}
          create={createSellerUser}
          update={updateSellerUser}
          remove={deleteSellerUser}
          slugCollection="sellers"
          slugLabelField="name"
          portalPath="/seller-portal/login"
        />
      )}
      {tab === "buyer" && (
        <PortalUsersTab
          type="Buyer"
          accentColor="#4c1d95"
          fetchUsers={getFirestoreBuyerUsers}
          create={createBuyerUser}
          update={updateBuyerUser}
          remove={deleteBuyerUser}
          slugCollection="buyers"
          slugLabelField="buyerName"
          portalPath="/buyer-portal/login"
        />
      )}
    </div>
  );
}
