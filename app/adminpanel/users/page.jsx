"use client";
import { useState, useEffect } from "react";
import {
  UserCog, Plus, Trash2, Edit2, Shield, Eye, EyeOff,
  Users, Check, X, Loader2, RefreshCw, UserPlus, Store, ShoppingBag,
  ExternalLink, Link as LinkIcon, AlertCircle, Search, PauseCircle, PlayCircle,
  MoreVertical,
} from "lucide-react";
import {
  getFirestoreUsers, createFirestoreUser, updateFirestoreUser,
  deleteFirestoreUser, getCurrentUser, isAdmin as checkIsAdmin,
  getFirestoreSellerUsers, createSellerUser, updateSellerUser, deleteSellerUser,
  getFirestoreBuyerUsers, createBuyerUser, updateBuyerUser, deleteBuyerUser,
} from "../lib/auth";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const inp = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 font-medium transition-all";

function formatUserDate(u) {
  if (u.createdAt) {
    try {
      const d = u.createdAt?.toDate ? u.createdAt.toDate() : new Date(u.createdAt);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        let hours = d.getHours();
        const mins = String(d.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        return {
          label: "Created",
          text: `${y}/${m}/${day} at ${hours}:${mins} ${ampm}`,
        };
      }
    } catch {}
  }
  return { label: "Account", text: "Registered" };
}

// Reusable Delete Confirmation Modal
function DeleteModal({ item, onConfirm, onCancel, saving, type }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="text-red-500" size={24} />
        </div>
        <h3 className="font-black text-gray-900 text-lg mb-1">Delete {type} User?</h3>
        <p className="text-gray-500 text-sm mb-1"><strong>{item.name}</strong> will lose portal access.</p>
        <p className="text-gray-400 text-xs mb-5">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition cursor-pointer">Cancel</button>
          <button onClick={onConfirm} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition disabled:opacity-60 cursor-pointer">
            {saving ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Admin Users Management Tab (Row Table Layout)
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
  const [menuId, setMenuId] = useState(null);

  // Filter & Pagination state
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedIds, setSelectedIds] = useState([]);

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

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q || (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
    const matchRole = filterRole === "All" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {/* ── Top Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-orange-500 shadow-sm">
              <UserCog size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-gray-900 text-sm sm:text-base leading-none truncate">
                Admin Team Members
              </h2>
              <p className="text-gray-400 text-[10px] sm:text-[11px] mt-1 font-medium truncate">
                {users.length} admin accounts with panel access
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={load}
              disabled={loading}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition cursor-pointer flex-shrink-0"
              title="Refresh list"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={openAdd}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-orange-200 transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer"
            >
              <UserPlus size={16} className="flex-shrink-0" />
              <span>Add Admin User</span>
            </button>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="px-4 sm:px-6 pt-4 pb-4 border-b border-gray-100 flex flex-wrap gap-2.5 sm:gap-3 items-center">
          {/* Search input */}
          <div className="flex-1 min-w-[200px] sm:min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, email..."
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white text-xs sm:text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
            {search && (
              <button onClick={() => { setSearch(""); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={filterRole}
              onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="user">Team Member</option>
            </select>
          </div>

          {/* Reset button if active */}
          {(search || filterRole !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setFilterRole("All");
                setCurrentPage(1);
              }}
              className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 transition"
              title="Reset all filters"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto justify-between sm:justify-end pt-1 sm:pt-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
              <span className="text-gray-400">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none focus:border-orange-400 cursor-pointer shadow-xs"
              >
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
                <option value={200}>200 / page</option>
              </select>
            </div>
            <div className="text-xs text-gray-400 font-semibold">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>

        {/* ── Table / List Content ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Loader2 size={28} className="animate-spin text-orange-400" />
            <span className="text-sm font-semibold">Loading admin users...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-3xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3">
              <UserCog size={28} />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">
              {search || filterRole !== "All" ? "No admin users match your search" : "No admin users yet"}
            </h3>
            <p className="text-gray-400 text-xs max-w-sm mx-auto mb-4">
              {search || filterRole !== "All" ? "Try clearing your filters or search terms." : "Create team members to assign leads and manage platform access."}
            </p>
            {!search && filterRole === "All" && (
              <button onClick={openAdd} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition cursor-pointer">
                Create First User
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* Table Header (Desktop) */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50/90 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider items-center">
              <div className="col-span-5 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={paginatedUsers.length > 0 && paginatedUsers.every(u => selectedIds.includes(u.firestoreId || u.id))}
                  onChange={() => {
                    const allIds = paginatedUsers.map(u => u.firestoreId || u.id);
                    if (allIds.every(id => selectedIds.includes(id))) {
                      setSelectedIds(prev => prev.filter(id => !allIds.includes(id)));
                    } else {
                      setSelectedIds(prev => Array.from(new Set([...prev, ...allIds])));
                    }
                  }}
                  className="w-4 h-4 rounded text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span>User / Name</span>
              </div>
              <div className="col-span-3">
                <span>Role / Access</span>
              </div>
              <div className="col-span-2">
                <span>Assigned Leads</span>
              </div>
              <div className="col-span-2 text-right">
                <span>Status & Actions</span>
              </div>
            </div>

            {/* Table Rows (WordPress Style) */}
            <div className="divide-y divide-gray-100">
              {paginatedUsers.map((u) => {
                const uid = u.firestoreId || u.id;
                const assignedCount = leadCounts[uid] || 0;
                const isSelected = selectedIds.includes(uid);
                const dateInfo = formatUserDate(u);

                return (
                  <div
                    key={uid}
                    className={`group px-5 py-3.5 hover:bg-gray-50/80 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center ${
                      isSelected ? "bg-orange-50/30" : ""
                    }`}
                  >
                    {/* Col 1: Checkbox + Avatar + Name + Sub action links */}
                    <div className="col-span-12 lg:col-span-5 flex items-start gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedIds(prev =>
                            prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
                          );
                        }}
                        className="w-4 h-4 rounded text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer mt-1 flex-shrink-0"
                      />
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-xs bg-gradient-to-br from-orange-500 to-amber-500">
                        {u.name?.[0]?.toUpperCase() || "A"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[14px] text-gray-900 group-hover:text-orange-600 transition truncate">
                          {u.name}
                        </p>
                        <p className="text-gray-400 text-[11px] font-medium truncate mt-0.5">
                          {u.email}
                        </p>

                        {/* WordPress-style sub actions */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold mt-1.5 text-gray-400 flex-wrap">
                          <button onClick={() => openEdit(u)} className="text-orange-600 hover:text-orange-800 hover:underline cursor-pointer">
                            Edit
                          </button>
                          <span>|</span>
                          <button onClick={() => setDelConfirm(u)} className="text-red-500 hover:text-red-700 hover:underline cursor-pointer">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Role / Access Badge */}
                    <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${
                        u.role === "admin" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.role === "admin" ? "bg-orange-500" : "bg-blue-500"}`} />
                        {u.role === "admin" ? "Administrator" : "Team Member"}
                      </span>
                    </div>

                    {/* Col 3: Assigned Leads */}
                    <div className="col-span-12 sm:col-span-4 lg:col-span-2 text-xs">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 font-bold text-xs">
                        <Users size={12} className="text-orange-500" />
                        <span>{assignedCount} lead{assignedCount !== 1 ? "s" : ""}</span>
                      </div>
                    </div>

                    {/* Col 4: Status & Actions */}
                    <div className="col-span-12 sm:col-span-4 lg:col-span-2 flex items-center justify-end gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                      <button
                        onClick={() => openEdit(u)}
                        className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition cursor-pointer"
                        title="Edit User"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDelConfirm(u)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-500 font-medium">
            Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
              <span>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none focus:border-orange-400 cursor-pointer shadow-xs"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-40 hover:bg-white transition cursor-pointer"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => (
                    <span key={p} className="flex items-center">
                      {i > 0 && p - arr[i - 1] > 1 && <span className="px-1 text-gray-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                          currentPage === p ? "bg-orange-500 text-white shadow-xs" : "text-gray-600 hover:bg-white"
                        }`}
                      >
                        {p}
                      </button>
                    </span>
                  ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-40 hover:bg-white transition cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Admin User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-gray-900 font-black text-lg">{editUser ? "Edit Admin User" : "Create Admin User"}</h2>
                <p className="text-gray-400 text-xs mt-0.5">Manage administrator credentials and permissions</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name (e.g. John Doe)" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="admin@koopindia.com" className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password {editUser && <span className="text-gray-400 normal-case font-normal">(optional)</span>}
                  </label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={editUser ? "Leave blank to keep unchanged" : "Minimum 6 characters"} className={inp + " pr-10"} />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Role *</label>
                  <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className={inp}>
                    <option value="user">Team Member</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              {error && (
                <div className="flex items-start gap-2.5 bg-red-50/90 border border-red-200 text-red-800 text-xs font-medium px-3.5 py-2.5 rounded-xl">
                  <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer">
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

// Reusable Portal Users Tab (Row Table Layout for Seller and Buyer)
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

  // Filter & Pagination state
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedIds, setSelectedIds] = useState([]);

  const isSeller = type === "Seller";

  const load = async () => {
    setLoading(true);
    try {
      const [users, slugSnap] = await Promise.all([
        fetchUsers(),
        getDocs(collection(db, slugCollection)),
      ]);
      setPortalUsers(users);
      setSlugOptions(slugSnap.docs.map((d) => ({
        id: d.id,
        slug: d.data().slug,
        label: d.data()[slugLabelField] || d.data().slug,
        status: d.data().status || "paused",
      })));
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
    const selectedOption = slugOptions.find(s => s.slug === form.linkedSlug);
    const linkedId = selectedOption?.id || editUser?.linkedId || "";
    try {
      if (editUser) {
        const data = {
          name: form.name,
          email: form.email.toLowerCase().trim(),
          linkedSlug: form.linkedSlug,
          linkedId: linkedId,
          role: isSeller ? "seller" : "buyer",
          status: form.status,
        };
        if (form.password.trim()) data.password = form.password;
        const r = await update(editUser.firestoreId || editUser.id, data);
        if (!r.success) { setError(r.error || "Update failed"); setSaving(false); return; }
      } else {
        const r = await create({
          name: form.name,
          email: form.email.toLowerCase().trim(),
          password: form.password,
          linkedSlug: form.linkedSlug,
          linkedId: linkedId,
          role: isSeller ? "seller" : "buyer",
          status: form.status,
        });
        if (!r.success) { setError(r.error || "Create failed"); setSaving(false); return; }
      }
      setShowModal(false); await load();
    } catch (e) { setError("Error: " + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (u) => {
    setSaving(true);
    try { await remove(u.firestoreId || u.id); await load(); }
    catch (e) { console.error(e); }
    finally { setSaving(false); setDelConfirm(null); }
  };

  const toggleStatus = async (u) => {
    const id = u.firestoreId || u.id;
    const newStatus = u.status === "active" ? "paused" : "active";
    await update(id, { status: newStatus });
    setPortalUsers((prev) => prev.map((x) => ((x.firestoreId === id || x.id === id) ? { ...x, status: newStatus } : x)));
  };

  const getStatusBadge = (u, linkedListing) => {
    const isListingLive = linkedListing ? linkedListing.status === "live" : true;
    const isUserActive = u.status === "active";
    const effectiveCanLogin = isUserActive && isListingLive;

    if (u.status === "suspended") {
      return {
        label: "Suspended",
        badge: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
      };
    }
    if (!isUserActive) {
      return {
        label: "Account Paused",
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    }
    if (!isListingLive) {
      return {
        label: "Listing Paused",
        badge: "bg-gray-100 text-gray-700 border-gray-200",
        dot: "bg-gray-400",
      };
    }
    return {
      label: "Active & Live",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    };
  };

  const filteredUsers = portalUsers.filter((u) => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q ||
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.linkedSlug || "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || u.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const Icon = isSeller ? Store : ShoppingBag;
  const accent = accentColor;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {/* ── Top Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm" style={{ backgroundColor: accent }}>
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-gray-900 text-sm sm:text-base leading-none truncate">
                {type} Portal Accounts
              </h2>
              <p className="text-gray-400 text-[10px] sm:text-[11px] mt-1 font-medium truncate">
                {portalUsers.length} {type.toLowerCase()} portal accounts with listing access
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={load}
              disabled={loading}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition cursor-pointer flex-shrink-0"
              title="Refresh list"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={openAdd}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: accent, boxShadow: `0 4px 14px ${accent}40` }}
            >
              <UserPlus size={16} className="flex-shrink-0" />
              <span>Add {type} User</span>
            </button>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="px-4 sm:px-6 pt-4 pb-4 border-b border-gray-100 flex flex-wrap gap-2.5 sm:gap-3 items-center">
          {/* Search input */}
          <div className="flex-1 min-w-[200px] sm:min-w-[220px] relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder={`Search by name, email, listing slug...`}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white text-xs sm:text-sm outline-none transition"
            />
            {search && (
              <button onClick={() => { setSearch(""); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 outline-none transition cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Reset button if active */}
          {(search || filterStatus !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setFilterStatus("All");
                setCurrentPage(1);
              }}
              className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 transition"
              title="Reset all filters"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto justify-between sm:justify-end pt-1 sm:pt-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
              <span className="text-gray-400">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none cursor-pointer shadow-xs"
              >
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
                <option value={200}>200 / page</option>
              </select>
            </div>
            <div className="text-xs text-gray-400 font-semibold">
              Showing {filteredUsers.length} of {portalUsers.length} users
            </div>
          </div>
        </div>

        {/* ── Table / List Content ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Loader2 size={28} className="animate-spin" style={{ color: accent }} />
            <span className="text-sm font-semibold">Loading {type.toLowerCase()} users...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3" style={{ background: `${accent}15`, color: accent }}>
              <Icon size={28} />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">
              {search || filterStatus !== "All" ? `No ${type.toLowerCase()} users match your search` : `No ${type.toLowerCase()} portal users yet`}
            </h3>
            <p className="text-gray-400 text-xs max-w-sm mx-auto mb-4">
              {search || filterStatus !== "All" ? "Try clearing your filters or search terms." : `Create a ${type.toLowerCase()} account and link it to their listing.`}
            </p>
            {!search && filterStatus === "All" && (
              <button onClick={openAdd} className="text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition cursor-pointer" style={{ background: accent }}>
                Create First {type} User
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* Table Header (Desktop) */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50/90 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider items-center">
              <div className="col-span-5 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={paginatedUsers.length > 0 && paginatedUsers.every(u => selectedIds.includes(u.firestoreId || u.id))}
                  onChange={() => {
                    const allIds = paginatedUsers.map(u => u.firestoreId || u.id);
                    if (allIds.every(id => selectedIds.includes(id))) {
                      setSelectedIds(prev => prev.filter(id => !allIds.includes(id)));
                    } else {
                      setSelectedIds(prev => Array.from(new Set([...prev, ...allIds])));
                    }
                  }}
                  className="w-4 h-4 rounded text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span>User / Contact</span>
              </div>
              <div className="col-span-3">
                <span>Linked Listing</span>
              </div>
              <div className="col-span-2">
                <span>Portal & Date</span>
              </div>
              <div className="col-span-2 text-right">
                <span>Status & Actions</span>
              </div>
            </div>

            {/* Table Rows (WordPress Style) */}
            <div className="divide-y divide-gray-100">
              {paginatedUsers.map((u, index) => {
                const uid = u.firestoreId || u.id || u.uid || index;
                const linkedListing = slugOptions.find(s => s.slug === u.linkedSlug || s.id === u.linkedId);
                const isSelected = selectedIds.includes(uid);
                const stBadge = getStatusBadge(u, linkedListing);
                const dateInfo = formatUserDate(u);

                return (
                  <div
                    key={uid}
                    className={`group px-5 py-3.5 hover:bg-gray-50/80 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center ${
                      isSelected ? "bg-orange-50/30" : ""
                    }`}
                  >
                    {/* Col 1: Checkbox + Avatar + Name + Sub action links */}
                    <div className="col-span-12 lg:col-span-5 flex items-start gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedIds(prev =>
                            prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
                          );
                        }}
                        className="w-4 h-4 rounded text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer mt-1 flex-shrink-0"
                      />
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-xs"
                        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
                      >
                        {u.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[14px] text-gray-900 group-hover:underline transition truncate" style={{ color: "#111827" }}>
                          {u.name}
                        </p>
                        <p className="text-gray-400 text-[11px] font-medium truncate mt-0.5">
                          {u.email}
                        </p>

                        {/* WordPress-style sub actions */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold mt-1.5 text-gray-400 flex-wrap">
                          <button onClick={() => openEdit(u)} className="hover:underline cursor-pointer" style={{ color: accent }}>
                            Edit
                          </button>
                          {u.linkedSlug && (
                            <>
                              <span>|</span>
                              <a
                                href={`/${isSeller ? "" : "buyers/"}${u.linkedSlug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                View Listing ↗
                              </a>
                            </>
                          )}
                          <span>|</span>
                          <button onClick={() => toggleStatus(u)} className="text-gray-600 hover:text-gray-900 hover:underline cursor-pointer">
                            {u.status === "active" ? "Pause Access" : "Activate Access"}
                          </button>
                          <span>|</span>
                          <button onClick={() => setDelConfirm(u)} className="text-red-500 hover:text-red-700 hover:underline cursor-pointer">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Linked Listing */}
                    <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                      {u.linkedSlug ? (
                        <div className="space-y-1">
                          <a
                            href={`/${isSeller ? "" : "buyers/"}${u.linkedSlug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold hover:underline flex items-center gap-1 truncate max-w-[260px]"
                            style={{ color: accent }}
                            title={`koopindia.com/${isSeller ? "" : "buyers/"}${u.linkedSlug}`}
                          >
                            <LinkIcon size={12} className="flex-shrink-0" />
                            <span className="truncate">{linkedListing?.label || u.linkedSlug}</span>
                          </a>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-gray-400 font-mono truncate">
                              /{isSeller ? "" : "buyers/"}{u.linkedSlug}
                            </span>
                            {linkedListing && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                                linkedListing.status === "live" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-600 border border-gray-200"
                              }`}>
                                Listing: {linkedListing.status || "paused"}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-gray-400 italic">No listing linked</span>
                      )}
                    </div>

                    {/* Col 3: Portal & Date */}
                    <div className="col-span-12 sm:col-span-4 lg:col-span-2 text-xs">
                      <span className="text-gray-400 text-[11px] block">{dateInfo.label}</span>
                      <span className="font-semibold text-gray-700 text-xs">{dateInfo.text}</span>
                    </div>

                    {/* Col 4: Status & Actions */}
                    <div className="col-span-12 sm:col-span-4 lg:col-span-2 flex items-center justify-end gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${stBadge.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stBadge.dot}`} />
                        {stBadge.label}
                      </span>
                      <button
                        onClick={() => openEdit(u)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                        style={{ color: accent }}
                        title="Edit User"
                      >
                        <Edit2 size={14} />
                      </button>
                      {u.linkedSlug && (
                        <a
                          href={`/${isSeller ? "" : "buyers/"}${u.linkedSlug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Listing Page"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => setDelConfirm(u)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-500 font-medium">
            Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
              <span>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none cursor-pointer shadow-xs"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-40 hover:bg-white transition cursor-pointer"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => (
                    <span key={p} className="flex items-center">
                      {i > 0 && p - arr[i - 1] > 1 && <span className="px-1 text-gray-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                          currentPage === p ? "text-white shadow-xs" : "text-gray-600 hover:bg-white"
                        }`}
                        style={currentPage === p ? { backgroundColor: accent } : {}}
                      >
                        {p}
                      </button>
                    </span>
                  ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-40 hover:bg-white transition cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Portal User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-gray-900 font-black text-lg">{editUser ? `Edit ${type} User` : `Create ${type} User`}</h2>
                <p className="text-gray-400 text-xs mt-0.5">Access to the {type.toLowerCase()} portal</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Primary contact name" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="business@company.com" className={inp} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password {editUser && <span className="text-gray-400 normal-case font-normal">(optional)</span>}
                  </label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={editUser ? "Leave blank to keep unchanged" : "Minimum 6 characters"} className={inp + " pr-10"} />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Account Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inp}>
                    <option value="active">Active (Access enabled when listing is Live)</option>
                    <option value="paused">Paused (Access temporarily disabled)</option>
                    <option value="suspended">Suspended (Access permanently revoked)</option>
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
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate">
                                {s.label} <span className={`text-xs font-normal ${form.linkedSlug === s.slug ? 'text-orange-500' : 'text-gray-400'}`}>({s.slug})</span>
                              </span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${s.status === "live" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                {s.status === "live" ? "Live" : "Paused"}
                              </span>
                            </div>
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
              {error && (
                <div className="flex items-start gap-2.5 bg-red-50/90 border border-red-200 text-red-800 text-xs font-medium px-3.5 py-2.5 rounded-xl">
                  <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
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

// Main Users Management Page Component
export default function UsersPage() {
  const [tab, setTab] = useState("admin");
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("tab");
      if (t && ["admin", "seller", "buyer"].includes(t)) {
        setTab(t);
      }
    }
  }, []);

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
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">User Management</h1>
        <p className="text-gray-500 text-sm mt-0.5 font-medium">Manage admin team members, seller portal accounts, and buyer portal accounts.</p>
      </div>

      {/* Tabs Switcher Bar */}
      <div className="flex gap-2 flex-wrap bg-white p-1.5 rounded-2xl border border-gray-200/80 shadow-xs w-full sm:w-max">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                active ? "text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              style={active ? { background: t.color, boxShadow: `0 4px 14px ${t.color}35` } : {}}
            >
              <Icon size={16} />
              <span>{t.label}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {t.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
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
          portalPath="/adminpanel/login"
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
          portalPath="/adminpanel/login"
        />
      )}
    </div>
  );
}
