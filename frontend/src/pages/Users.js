import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ROLES = ['admin', 'warehouse_manager', 'fc_manager', 'salesperson'];
const ROLE_LABELS = { admin: 'Admin', warehouse_manager: 'Warehouse Manager', fc_manager: 'FC Manager', salesperson: 'Salesperson' };
const ROLE_COLORS = { admin: 'badge-blue', warehouse_manager: 'badge-purple', fc_manager: 'badge-green', salesperson: 'badge-orange' };
const ROLE_ICONS = { admin: '👑', warehouse_manager: '🏭', fc_manager: '📦', salesperson: '🛒' };

const EMPTY = { name: '', email: '', password: '', role: 'salesperson' };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const { user: me } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch { toast.error('Failed to load users'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (u) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: '', role: u.role });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        const payload = { name: form.name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await api.put(`/users/${editing._id}`, payload);
        toast.success('User updated');
      } else {
        if (!form.password) return toast.error('Password required for new user');
        await api.post('/users', form);
        toast.success('User created');
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (u) => {
    if (u._id === me?.id) return toast.error('Cannot delete your own account');
    if (!window.confirm(`Delete user "${u.name}"?`)) return;
    try {
      await api.delete(`/users/${u._id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="loading"><div className="spinner" />Loading users...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">👥 User Management</div>
          <div className="page-subtitle">{users.length} team members — Admin access only</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add User</button>
      </div>

      {/* Role summary cards */}
      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        {ROLES.map(role => (
          <div className="stat-card" key={role}>
            <div className="stat-label">{ROLE_LABELS[role]}</div>
            <div className="stat-value" style={{ fontSize: 32 }}>
              {ROLE_ICONS[role]} {users.filter(u => u.role === role).length}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Access Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #0070ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#000', flexShrink: 0 }}>
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>
                        {u.name} {u._id === me?.id && <span style={{ fontSize: 10, color: 'var(--text3)' }}>(you)</span>}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 12 }}>{u.email}</td>
                  <td>
                    <span className={`badge ${ROLE_COLORS[u.role]}`}>
                      {ROLE_ICONS[u.role]} {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text2)' }}>{getAccessDesc(u.role)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-sm btn-outline" onClick={() => openEdit(u)}>✎ Edit</button>
                      {u._id !== me?.id && (
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u)}>✕</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-title">{editing ? '✎ Edit User' : '+ Add New User'}</div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" required placeholder="e.g. Rajan Kumar"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    {ROLES.map(r => <option key={r} value={r}>{ROLE_ICONS[r]} {ROLE_LABELS[r]}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" required placeholder="user@oceon.in"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">{editing ? 'New Password (leave blank to keep)' : 'Password'}</label>
                <input className="form-input" type="password" placeholder={editing ? '••••••••' : 'Min 6 characters'}
                  required={!editing}
                  value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              {/* Role access preview */}
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>{ROLE_ICONS[form.role]} {ROLE_LABELS[form.role]}</strong> — {getAccessDesc(form.role)}
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : (editing ? 'Update User' : 'Create User')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getAccessDesc(role) {
  const map = {
    admin:             'Full access — dashboard, warehouse, FC, transfers, sales, products, users',
    warehouse_manager: 'Warehouse stock, receive goods, approve/reject FC transfer requests',
    fc_manager:        'FC inventory, request transfers from warehouse, record sales',
    salesperson:       'Record sales at FC, view today\'s sales history only',
  };
  return map[role] || '—';
}
