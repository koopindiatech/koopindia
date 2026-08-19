"use client";
import { useState, useEffect } from "react";
import {
  UserCog, Plus, Trash2, Edit2, Shield, Eye, EyeOff,
  Users, Check, X, Loader2, RefreshCw, UserPlus,
} from "lucide-react";
import {
  getFirestoreUsers, createFirestoreUser, updateFirestoreUser,
  deleteFirestoreUser, ALL_PERMISSIONS, getCurrentUser, isAdmin as checkIsAdmin,
} from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function UsersPage() {
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

  const currentUser = getCurrentUser();
  const isAdmin = checkIsAdmin();

  const load = async () => {
    setLoading(true);
    try {
      const us = await getFirestoreUsers();
      setUsers(us);
      // Fetch assigned lead counts per user
      const counts = {};
      for (const u of us) {
        try {
          const uid = u.firestoreId || u.id;
          const snap = await getDocs(query(collection(db, "leads"), where("assignedTo", "==", uid)));
          counts[uid] = snap.size;
        } catch (_) { counts[u.firestoreId || u.id] = 0; }
      }
      setLeadCounts(counts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", role: "user", permissions: [] });
    setError("");
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role || "user", permissions: [...(user.permissions || [])] });
    setError("");
    setShowModal(true);
  };

  const togglePerm = (key) => {
    setForm((p) => ({
      ...p,
      permissions: p.permissions.includes(key)
        ? p.permissions.filter((k) => k !== key)
        : [...p.permissions, key],
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) { setError("Name and email are required."); return; }
    if (!editUser && !form.password.trim()) { setError("Password is required for new users."); return; }
    setSaving(true);
    setError("");
    try {
      if (editUser) {
        const updateData = { name: form.name, email: form.email.toLowerCase(), role: form.role, permissions: form.permissions };
        if (form.password.trim()) updateData.password = form.password;
        const result = await updateFirestoreUser(editUser.firestoreId || editUser.id, updateData);
        if (!result.success) { setError(result.error || "Update failed"); setSaving(false); return; }
      } else {
        const result = await createFirestoreUser({ name: form.name, email: form.email, password: form.password, role: form.role, permissions: form.permissions });
        if (!result.success) { setError(result.error || "Create failed"); setSaving(false); return; }
      }
      setShowModal(false);
      await load();
    } catch (e) {
      setError("Error: " + e.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (user) => {
    setSaving(true);
    try {
      await deleteFirestoreUser(user.firestoreId || user.id);
      await load();
    } catch (e) { console.error(e); }
    finally { setSaving(false); setDelConfirm(null); }
  };

  if (!isAdmin) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
        <Shield size={28} className="text-red-500" />
      </div>
      <h2 className="text-gray-900 font-bold text-lg">Access Denied</h2>
      <p className="text-gray-500 text-sm">Only Admins can manage users.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm">Create team members and assign leads. Users can only login — not create accounts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20">
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>



      {/* Users List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={24} className="animate-spin text-orange-400" />
          <span className="text-sm font-semibold">Loading users...</span>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">👤</div>
          <h3 className="font-bold text-gray-700 text-base mb-1">No users yet</h3>
          <p className="text-gray-400 text-sm mb-4">Create team members to assign leads and manage access.</p>
          <button onClick={openAdd} className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md">
            Create First User
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {users.map((user) => {
            const uid = user.firestoreId || user.id;
            const assignedCount = leadCounts[uid] || 0;
            return (
              <div key={uid} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-black text-base">{user.name?.[0]?.toUpperCase() || "U"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm truncate">{user.name}</p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${user.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                      {user.role === 'admin' ? '⚡ Admin' : '👤 Team Member'}
                    </span>
                  </div>
                </div>

                {/* Assigned leads */}
                <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-3 py-2 mb-4 border border-orange-100">
                  <Users size={12} className="text-orange-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-orange-700">{assignedCount} lead{assignedCount !== 1 ? "s" : ""} assigned</span>
                </div>

                {/* Access */}
                <div className="mb-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Access</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Assigned Leads Only
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => openEdit(user)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
                    <Edit2 size={11} /> Edit
                  </button>
                  <button onClick={() => setDelConfirm(user)}
                    className="w-9 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-red-500 transition">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-gray-900 font-black text-lg">{editUser ? "Edit User" : "Create New User"}</h2>
                <p className="text-gray-400 text-xs mt-0.5">{editUser ? "Update user details and permissions" : "New user will be able to login and see assigned leads"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="user@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password {editUser && <span className="text-gray-400 normal-case font-normal">(leave blank to keep existing)</span>}
                  </label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={editUser ? "Enter new password (optional)" : "Create password"}
                      className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 font-medium" />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Role *</label>
                  <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 font-medium">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>


              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl">
                  ⚠️ {error}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition shadow-md shadow-orange-500/20 disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Check size={14} /> {editUser ? "Save Changes" : "Create User"}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {delConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 className="text-red-500" size={24} /></div>
            <h3 className="font-black text-gray-900 text-lg mb-1">Delete User?</h3>
            <p className="text-gray-500 text-sm mb-1"><strong>{delConfirm.name}</strong> will lose all access.</p>
            <p className="text-gray-400 text-xs mb-5">Their assigned leads will remain but become unassigned.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => handleDelete(delConfirm)} disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition disabled:opacity-60">
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
