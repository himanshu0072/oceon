import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function SalespersonHome() {
  const [fcInventory, setFcInventory] = useState([]);
  const [todaySales, setTodaySales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSale, setShowSale] = useState(false);
  const [saleForm, setSaleForm] = useState({ productId: '', quantity: '', pricePerUnit: '', customer: '', orderId: '' });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [inv, sales] = await Promise.all([api.get('/fc'), api.get('/sales/today')]);
      setFcInventory(inv.data);
      setTodaySales(sales.data);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
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
        customer: saleForm.customer || user?.name,
        orderId: saleForm.orderId,
      });
      toast.success('✅ Sale recorded!');
      setShowSale(false);
      setSaleForm({ productId: '', quantity: '', pricePerUnit: '', customer: '', orderId: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sale failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner" />Loading...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">🛒 Sales Dashboard</div>
          <div className="page-subtitle">Welcome, {user?.name} — Record and track your sales</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowSale(true)}>+ New Sale</button>
      </div>

      <div className="stats-grid stats-grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Today's Revenue</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>₹{(todaySales?.totalRevenue || 0).toLocaleString('en-IN')}</div>
          <div className="stat-sub">Your sales today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Orders Today</div>
          <div className="stat-value" style={{ color: '#ffab40' }}>{todaySales?.totalOrders || 0}</div>
          <div className="stat-sub">Transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Units Sold</div>
          <div className="stat-value">{todaySales?.totalUnits || 0}</div>
          <div className="stat-sub">Items dispatched today</div>
        </div>
      </div>

      {/* Available stock quick view */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Available FC Stock</div>
          <button className="btn btn-sm btn-primary" onClick={() => setShowSale(true)}>+ Record Sale</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
          {fcInventory.map(item => (
            <div key={item._id}
              onClick={() => { setShowSale(true); setSaleForm(f => ({ ...f, productId: item.product?._id })); }}
              style={{ background: 'var(--bg3)', border: `1px solid ${item.isLowStock ? 'rgba(255,82,82,0.3)' : 'var(--border)'}`, borderRadius: 8, padding: '12px 14px', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#ffab40'}
              onMouseLeave={e => e.currentTarget.style.borderColor = item.isLowStock ? 'rgba(255,82,82,0.3)' : 'var(--border)'}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.product?.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>{item.product?.sku}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700, color: item.isLowStock ? 'var(--red)' : 'var(--accent)' }}>
                  {item.currentStock}
                </span>
                <span style={{ fontSize: 10, color: 'var(--text3)' }}>{item.product?.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's sales list */}
      {todaySales?.sales?.length > 0 && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Today's Sales</div>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/sales')}>Full History →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Product</th><th>Qty</th><th>Price/Unit</th><th>Total</th><th>Time</th></tr></thead>
              <tbody>
                {todaySales.sales.slice(0, 10).map(s => (
                  <tr key={s._id}>
                    <td style={{ color: 'var(--text)', fontWeight: 600 }}>{s.product?.name}</td>
                    <td>{s.quantity}</td>
                    <td>₹{s.pricePerUnit}</td>
                    <td style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>₹{s.totalAmount.toLocaleString('en-IN')}</td>
                    <td style={{ fontSize: 11, color: 'var(--text3)' }}>
                      {new Date(s.saleDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showSale && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowSale(false)}>
          <div className="modal">
            <div className="modal-title">🛒 Record New Sale</div>
            <form onSubmit={handleSale} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Product</label>
                <select className="form-input" required value={saleForm.productId}
                  onChange={e => setSaleForm(f => ({ ...f, productId: e.target.value }))}>
                  <option value="">Select product...</option>
                  {fcInventory.map(item => (
                    <option key={item.product?._id} value={item.product?._id}>
                      {item.product?.name} — Stock: {item.currentStock}
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
                  <label className="form-label">Price/Unit (₹)</label>
                  <input className="form-input" type="number" min="0.01" step="0.01" required placeholder="0.00"
                    value={saleForm.pricePerUnit} onChange={e => setSaleForm(f => ({ ...f, pricePerUnit: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <input className="form-input" placeholder="Walk-in customer"
                  value={saleForm.customer} onChange={e => setSaleForm(f => ({ ...f, customer: e.target.value }))} />
              </div>
              {saleForm.quantity && saleForm.pricePerUnit && (
                <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                  Total: <strong style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono' }}>
                    ₹{(Number(saleForm.quantity) * Number(saleForm.pricePerUnit)).toLocaleString('en-IN')}
                  </strong>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowSale(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Record Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
