import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = { pending: 'badge-orange', approved: 'badge-green', rejected: 'badge-red' };

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouseMap, setWarehouseMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [showRequest, setShowRequest] = useState(false);
  const [form, setForm] = useState({ productId: '', quantity: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchData = async () => {
    try {
      const [tRes, pRes, wRes] = await Promise.all([
        api.get('/transfers'),
        api.get('/products'),
        api.get('/warehouse'),
      ]);
      setTransfers(tRes.data);
      setProducts(pRes.data);
      const map = {};
      wRes.data.forEach(w => { map[w.product._id] = w.currentStock; });
      setWarehouseMap(map);
    } catch (err) {
      toast.error('Failed to load transfers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/transfers', { productId: form.productId, quantity: Number(form.quantity), note: form.note });
      toast.success('Transfer request sent to warehouse');
      setShowRequest(false);
      setForm({ productId: '', quantity: '', note: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to request transfer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await api.put(`/transfers/${id}/approve`);
      toast.success(`✅ Transfer approved! Warehouse: ${res.data.warehouseStock} → FC: ${res.data.fcStock}`);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/transfers/${id}/reject`);
      toast.success('Transfer rejected');
      fetchData();
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  const filtered = filter === 'all' ? transfers : transfers.filter(t => t.status === filter);
  const pendingCount = transfers.filter(t => t.status === 'pending').length;

  if (loading) return <div className="loading"><div className="spinner" />Loading transfers...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">⇄ Warehouse → FC Transfers</div>
          <div className="page-subtitle">Request and approve stock replenishment to Fulfillment Center</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowRequest(true)}>+ Request Transfer</button>
      </div>

      <div className="stats-grid stats-grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Pending Requests</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>{pendingCount}</div>
          <div className="stat-sub">Awaiting approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Approved</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>{transfers.filter(t => t.status === 'approved').length}</div>
          <div className="stat-sub">Completed transfers</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Requests</div>
          <div className="stat-value">{transfers.length}</div>
          <div className="stat-sub">All time</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(f)}
            style={{ textTransform: 'capitalize' }}
          >
            {f} {f === 'pending' && pendingCount > 0 && <span style={{ background: 'rgba(0,0,0,0.3)', padding: '1px 6px', borderRadius: 10, marginLeft: 4 }}>{pendingCount}</span>}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Qty Requested</th>
                <th>Requested By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 40 }}>
                  No {filter === 'all' ? '' : filter} transfers found
                </td></tr>
              ) : filtered.map(t => (
                <tr key={t._id}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{t.product?.name}</td>
                  <td><span className="mono" style={{ fontSize: 11, color: 'var(--text3)' }}>{t.product?.sku}</span></td>
                  <td>
                    <span className="mono" style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>{t.quantity}</span>
                    {t.status === 'pending' && warehouseMap[t.product?._id] !== undefined && (
                      <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>
                        Warehouse: {warehouseMap[t.product._id]}
                      </div>
                    )}
                  </td>
                  <td>{t.requestedBy}</td>
                  <td style={{ fontSize: 11, color: 'var(--text3)' }}>
                    {new Date(t.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td><span className={`badge ${STATUS_COLORS[t.status]}`}>{t.status}</span></td>
                  <td>
                    {t.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-sm btn-success" onClick={() => handleApprove(t._id)}>✓ Approve</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleReject(t._id)}>✕ Reject</button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                        {t.approvedBy ? `by ${t.approvedBy}` : '—'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer flow visual */}
      {transfers.filter(t => t.status === 'pending').length > 0 && (
        <div style={{ marginTop: 20, padding: 20, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pending Transfer Flow
          </div>
          {transfers.filter(t => t.status === 'pending').slice(0, 3).map(t => (
            <div key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ background: 'var(--bg3)', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, minWidth: 120 }}>
                🏭 Warehouse
              </div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--orange)' }} />
                <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700 }}>+{t.quantity} {t.product?.name?.split(' ')[0]}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--orange)' }} />
                →
              </div>
              <div style={{ background: 'var(--bg3)', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, minWidth: 120 }}>
                📦 FC
              </div>
            </div>
          ))}
        </div>
      )}

      {showRequest && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowRequest(false)}>
          <div className="modal">
            <div className="modal-title">📤 Request Transfer from Warehouse</div>
            <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Product</label>
                <select className="form-input" required value={form.productId}
                  onChange={e => setForm(f => ({ ...f, productId: e.target.value }))}>
                  <option value="">Select product...</option>
                  {products.map(p => <option key={p._id} value={p._id}>{p.name} (WH Stock: {warehouseMap[p._id] ?? 'N/A'})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity Requested</label>
                <input className="form-input" type="number" min="1" required placeholder="How many units?"
                  value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Note (optional)</label>
                <input className="form-input" placeholder="Reason for request..."
                  value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
              </div>
              <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--text2)' }}>
                ℹ This request will be sent to the warehouse team for approval. Stock will be automatically updated upon approval.
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowRequest(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
