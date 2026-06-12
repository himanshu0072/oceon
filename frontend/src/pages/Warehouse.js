import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Warehouse() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReceive, setShowReceive] = useState(false);
  const [receiveForm, setReceiveForm] = useState({ productId: '', quantity: '' });
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [invRes, prodRes] = await Promise.all([api.get('/warehouse'), api.get('/products')]);
      setInventory(invRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      toast.error('Failed to load warehouse data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleReceive = async (e) => {
    e.preventDefault();
    if (!receiveForm.productId || !receiveForm.quantity || receiveForm.quantity <= 0) {
      return toast.error('Please fill all fields');
    }
    setSubmitting(true);
    try {
      await api.post('/warehouse/receive', { productId: receiveForm.productId, quantity: Number(receiveForm.quantity) });
      toast.success('Stock received successfully');
      setShowReceive(false);
      setReceiveForm({ productId: '', quantity: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to receive stock');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = inventory.filter(item =>
    item.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.product?.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = inventory.reduce((s, i) => s + i.currentStock, 0);
  const lowStockCount = inventory.filter(i => i.isLowStock).length;
  const totalReceived = inventory.reduce((s, i) => s + i.totalReceived, 0);
  const totalSent = inventory.reduce((s, i) => s + i.totalSentToFC, 0);

  if (loading) return <div className="loading"><div className="spinner" />Loading warehouse...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">🏭 Warehouse</div>
          <div className="page-subtitle">OCEON Wholesale Pvt. Ltd. — Main Storage</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowReceive(true)}>+ Receive Stock</button>
      </div>

      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Current Stock</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{totalStock.toLocaleString()}</div>
          <div className="stat-sub">Total units</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Stock Received</div>
          <div className="stat-value">{totalReceived.toLocaleString()}</div>
          <div className="stat-sub">Lifetime</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sent to FC</div>
          <div className="stat-value" style={{ color: '#a78bfa' }}>{totalSent.toLocaleString()}</div>
          <div className="stat-sub">Total dispatched</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock Alerts</div>
          <div className="stat-value" style={{ color: lowStockCount > 0 ? 'var(--red)' : 'var(--green)' }}>{lowStockCount}</div>
          <div className="stat-sub">{lowStockCount > 0 ? 'Needs attention' : 'All levels healthy'}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Inventory ({filtered.length} products)</div>
          <input
            className="form-input"
            style={{ width: 220 }}
            placeholder="Search product / SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Received</th>
                <th>Sent to FC</th>
                <th>Remaining</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text3)', padding: 40 }}>No products found</td></tr>
              ) : filtered.map(item => (
                <tr key={item._id}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{item.product?.name}</td>
                  <td><span className="mono" style={{ fontSize: 11, color: 'var(--text3)' }}>{item.product?.sku}</span></td>
                  <td>{item.product?.category}</td>
                  <td><span className="mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.currentStock}</span></td>
                  <td>{item.totalReceived}</td>
                  <td>{item.totalSentToFC}</td>
                  <td><span className="mono" style={{ fontWeight: 600 }}>{item.remainingStock}</span></td>
                  <td>
                    {item.isLowStock ? (
                      <span className="badge badge-red"><span className="low-stock-dot" style={{ margin: '0 4px 0 0', width: 6, height: 6 }} />Low Stock</span>
                    ) : (
                      <span className="badge badge-green">● In Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showReceive && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowReceive(false)}>
          <div className="modal">
            <div className="modal-title">📥 Receive Stock into Warehouse</div>
            <form onSubmit={handleReceive} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Product</label>
                <select
                  className="form-input"
                  required
                  value={receiveForm.productId}
                  onChange={e => setReceiveForm(f => ({ ...f, productId: e.target.value }))}
                >
                  <option value="">Select product...</option>
                  {products.map(p => <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input
                  className="form-input" type="number" min="1" required
                  placeholder="Enter quantity"
                  value={receiveForm.quantity}
                  onChange={e => setReceiveForm(f => ({ ...f, quantity: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowReceive(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Receiving...' : 'Confirm Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
