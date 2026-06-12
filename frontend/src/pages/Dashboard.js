import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      setData(res.data);
    } catch (err) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  if (loading) return <div className="loading"><div className="spinner" />Loading dashboard...</div>;
  if (!data) return null;

  const chartData = (data.topSellingProducts || []).map(p => ({
    name: p.product?.name?.split(' ').slice(0, 2).join(' ') || 'Unknown',
    qty: p.totalQty,
    revenue: p.totalRevenue
  }));

  const allLowStock = [
    ...(data.warehouse?.lowStockItems || []).map(w => ({ ...w, source: 'Warehouse' })),
    ...(data.fc?.lowStockItems || []).map(f => ({ ...f, source: 'FC' }))
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Good {getGreeting()}, {user?.name} 👋</div>
          <div className="page-subtitle">Here's what's happening at OCEON today</div>
        </div>
        <button className="btn btn-outline" onClick={fetchDashboard}>↻ Refresh</button>
      </div>

      {/* Today's KPIs */}
      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Today's Revenue</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>₹{data.today?.revenue?.toLocaleString('en-IN') || 0}</div>
          <div className="stat-sub">Total sales value</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Today's Orders</div>
          <div className="stat-value">{data.today?.orders || 0}</div>
          <div className="stat-sub">{data.today?.units || 0} units sold</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Warehouse Stock</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{data.warehouse?.totalStock || 0}</div>
          <div className="stat-sub">Total units in warehouse</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">FC Stock</div>
          <div className="stat-value" style={{ color: '#a78bfa' }}>{data.fc?.totalStock || 0}</div>
          <div className="stat-sub">Total units at FC</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Top Selling Products */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Top Selling Products</div>
            <span className="badge badge-blue">Last 30 days</span>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis dataKey="name" tick={{ fill: '#8892b0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8892b0', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#181e2e', border: '1px solid #252d45', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#e8eaf2' }}
                  itemStyle={{ color: '#00d4ff' }}
                />
                <Bar dataKey="qty" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={['#00d4ff', '#00e676', '#a78bfa', '#ffab40', '#ff5252'][i % 5]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: 40 }}>No sales data yet</div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              <span className="low-stock-dot" />Low Stock Alerts
            </div>
            <span className="badge badge-red">{allLowStock.length} items</span>
          </div>
          {allLowStock.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 210, overflowY: 'auto' }}>
              {allLowStock.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg3)', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.product?.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{item.product?.sku}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', fontFamily: 'JetBrains Mono' }}>{item.currentStock} left</div>
                    <span className="badge badge-orange" style={{ fontSize: 10 }}>{item.source}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: 40 }}>✓ All stock levels healthy</div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Pending Transfers */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Pending Transfers</div>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/transfers')}>View All →</button>
          </div>
          {data.pendingTransfers?.length > 0 ? (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Product</th><th>Qty</th><th>By</th></tr></thead>
                <tbody>
                  {data.pendingTransfers.slice(0, 5).map(t => (
                    <tr key={t._id}>
                      <td style={{ color: 'var(--text)' }}>{t.product?.name}</td>
                      <td><span className="badge badge-orange">{t.quantity}</span></td>
                      <td>{t.requestedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: 30 }}>No pending transfers</div>
          )}
        </div>

        {/* Today's Sales */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Today's Sales</div>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/sales')}>View All →</button>
          </div>
          {data.today?.sales?.length > 0 ? (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Product</th><th>Qty</th><th>Amount</th></tr></thead>
                <tbody>
                  {data.today.sales.slice(0, 5).map(s => (
                    <tr key={s._id}>
                      <td style={{ color: 'var(--text)' }}>{s.product?.name}</td>
                      <td>{s.quantity}</td>
                      <td style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono', fontSize: 12 }}>₹{s.totalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: 30 }}>No sales recorded today</div>
          )}
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
