import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [salesRes, todayRes] = await Promise.all([
        api.get('/sales?limit=100'),
        api.get('/sales/today'),
      ]);
      setSales(salesRes.data);
      setTodayData(todayRes.data);
    } catch (err) {
      toast.error('Failed to load sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = sales.filter(s =>
    s.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.orderId?.toLowerCase().includes(search.toLowerCase()) ||
    s.customer?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading"><div className="spinner" />Loading sales...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">₹ Sales</div>
          <div className="page-subtitle">FC Sales Records</div>
        </div>
        <button className="btn btn-outline" onClick={fetchData}>↻ Refresh</button>
      </div>

      <div className="stats-grid stats-grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Today's Revenue</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>₹{(todayData?.totalRevenue || 0).toLocaleString('en-IN')}</div>
          <div className="stat-sub">{todayData?.totalOrders || 0} orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Units Sold Today</div>
          <div className="stat-value">{todayData?.totalUnits || 0}</div>
          <div className="stat-sub">Items dispatched</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">{sales.length}</div>
          <div className="stat-sub">In history</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Sales History</div>
          <input
            className="form-input" style={{ width: 250 }}
            placeholder="Search product, order ID, customer..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Qty</th>
                <th>Price/Unit</th>
                <th>Total</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text3)', padding: 40 }}>No sales found</td></tr>
              ) : filtered.map(sale => (
                <tr key={sale._id}>
                  <td><span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{sale.orderId}</span></td>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{sale.product?.name}</td>
                  <td style={{ fontSize: 12 }}>{sale.customer}</td>
                  <td>{sale.quantity}</td>
                  <td><span className="mono" style={{ fontSize: 12 }}>₹{sale.pricePerUnit}</span></td>
                  <td><span className="mono" style={{ color: 'var(--green)', fontWeight: 700 }}>₹{sale.totalAmount.toLocaleString('en-IN')}</span></td>
                  <td style={{ fontSize: 11, color: 'var(--text3)' }}>
                    {new Date(sale.saleDate).toLocaleString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
