import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function FCPage() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSale, setShowSale] = useState(false);
  const [saleForm, setSaleForm] = useState({ productId: '', quantity: '', pricePerUnit: '', customer: '', orderId: '' });
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [invRes, prodRes] = await Promise.all([api.get('/fc'), api.get('/products')]);
      setInventory(invRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      toast.error('Failed to load FC data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSale = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/fc/sale', {
        productId: saleForm.productId,
        quantity: Number(saleForm.quantity),
        pricePerUnit: Number(saleForm.pricePerUnit),
        customer: saleForm.customer,
        orderId: saleForm.orderId,
      });
      toast.success('Sale recorded successfully');
      setShowSale(false);
      setSaleForm({ productId: '', quantity: '', pricePerUnit: '', customer: '', orderId: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to record sale');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = inventory.filter(item =>
    item.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.product?.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = inventory.reduce((s, i) => s + i.currentStock, 0);
  const totalDailySales = inventory.reduce((s, i) => s + i.dailySales, 0);
  const totalConsumed = inventory.reduce((s, i) => s + i.totalConsumed, 0);
  const lowStockCount = inventory.filter(i => i.isLowStock).length;

  if (loading) return <div className="loading"><div className="spinner" />Loading FC inventory...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">📦 Fulfillment Center</div>
          <div className="page-subtitle">OCEON FC — Sales & Dispatch Hub</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowSale(true)}>+ Record Sale</button>
      </div>

      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Current Inventory</div>
          <div className="stat-value" style={{ color: '#a78bfa' }}>{totalStock.toLocaleString()}</div>
          <div className="stat-sub">Units at FC</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Daily Sales</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>{totalDailySales}</div>
          <div className="stat-sub">Units sold today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Inventory Consumed</div>
          <div className="stat-value">{totalConsumed.toLocaleString()}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock Alerts</div>
          <div className="stat-value" style={{ color: lowStockCount > 0 ? 'var(--red)' : 'var(--green)' }}>{lowStockCount}</div>
          <div className="stat-sub">{lowStockCount > 0 ? 'Request transfer' : 'Stock OK'}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>FC Inventory ({filtered.length} products)</div>
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
                <th>Current Inventory</th>
                <th>Daily Sales</th>
                <th>Consumed</th>
                <th>Remaining</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 40 }}>No products found</td></tr>
              ) : filtered.map(item => (
                <tr key={item._id}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{item.product?.name}</td>
                  <td><span className="mono" style={{ fontSize: 11, color: 'var(--text3)' }}>{item.product?.sku}</span></td>
                  <td><span className="mono" style={{ color: '#a78bfa', fontWeight: 600 }}>{item.currentStock}</span></td>
                  <td><span className="badge badge-green">{item.dailySales} today</span></td>
                  <td>{item.totalConsumed}</td>
                  <td><span className="mono" style={{ fontWeight: 600 }}>{item.inventoryRemaining}</span></td>
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

      {showSale && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowSale(false)}>
          <div className="modal">
            <div className="modal-title">🛒 Record Sale at FC</div>
            <form onSubmit={handleSale} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Product</label>
                <select
                  className="form-input" required
                  value={saleForm.productId}
                  onChange={e => setSaleForm(f => ({ ...f, productId: e.target.value }))}
                >
                  <option value="">Select product...</option>
                  {inventory.map(item => (
                    <option key={item.product?._id} value={item.product?._id}>
                      {item.product?.name} (Stock: {item.currentStock})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input className="form-input" type="number" min="1" required placeholder="Qty"
                    value={saleForm.quantity} onChange={e => setSaleForm(f => ({ ...f, quantity: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Price / Unit (₹)</label>
                  <input className="form-input" type="number" min="0.01" step="0.01" required placeholder="0.00"
                    value={saleForm.pricePerUnit} onChange={e => setSaleForm(f => ({ ...f, pricePerUnit: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Customer (optional)</label>
                <input className="form-input" placeholder="Walk-in Customer"
                  value={saleForm.customer} onChange={e => setSaleForm(f => ({ ...f, customer: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Order ID (optional)</label>
                <input className="form-input" placeholder="Auto-generated if blank"
                  value={saleForm.orderId} onChange={e => setSaleForm(f => ({ ...f, orderId: e.target.value }))} />
              </div>
              {saleForm.quantity && saleForm.pricePerUnit && (
                <div style={{ background: 'var(--bg3)', padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>
                  Total: <strong style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono' }}>
                    ₹{(Number(saleForm.quantity) * Number(saleForm.pricePerUnit)).toLocaleString('en-IN')}
                  </strong>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowSale(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Recording...' : 'Record Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
