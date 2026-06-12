import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function FCHome() {
  const [inventory, setInventory] = useState([]);
  const [todaySales, setTodaySales] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get('/fc'), api.get('/sales/today')])
      .then(([inv, sales]) => { setInventory(inv.data); setTodaySales(sales.data); })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner" />Loading...</div>;

  const totalStock = inventory.reduce((s, i) => s + i.currentStock, 0);
  const lowStockItems = inventory.filter(i => i.isLowStock);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">📦 FC Manager Overview</div>
          <div className="page-subtitle">Fulfillment center inventory & replenishment</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/fc')}>Manage FC →</button>
      </div>

      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">FC Stock</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{totalStock}</div>
          <div className="stat-sub">Units available</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Today's Revenue</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>₹{(todaySales?.totalRevenue || 0).toLocaleString('en-IN')}</div>
          <div className="stat-sub">{todaySales?.totalOrders || 0} orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Units Sold Today</div>
          <div className="stat-value">{todaySales?.totalUnits || 0}</div>
          <div className="stat-sub">Items dispatched</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock Alerts</div>
          <div className="stat-value" style={{ color: lowStockItems.length > 0 ? 'var(--red)' : 'var(--green)' }}>{lowStockItems.length}</div>
          <div className="stat-sub">{lowStockItems.length > 0 ? 'Request transfer' : 'All OK'}</div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="card" style={{ marginBottom: 20, borderColor: 'rgba(255,82,82,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}><span className="low-stock-dot" />Low Stock — Request Transfer</div>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/transfers')}>Request Transfer →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {lowStockItems.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg3)', borderRadius: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{item.product?.name}</span>
                <span style={{ color: 'var(--red)', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700 }}>{item.currentStock} left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>FC Inventory Snapshot</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>FC Stock</th><th>Daily Sales</th><th>Status</th></tr></thead>
            <tbody>
              {inventory.slice(0, 8).map(item => (
                <tr key={item._id}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{item.product?.name}</td>
                  <td><span className="mono" style={{ color: 'var(--accent)', fontWeight: 700 }}>{item.currentStock}</span></td>
                  <td><span className="badge badge-green">{item.dailySales}</span></td>
                  <td>{item.isLowStock ? <span className="badge badge-red">Low</span> : <span className="badge badge-green">OK</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
