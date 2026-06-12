import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function WarehouseHome() {
  const [inventory, setInventory] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get('/warehouse'), api.get('/transfers?status=pending')])
      .then(([inv, trf]) => { setInventory(inv.data); setTransfers(trf.data); })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner" />Loading...</div>;

  const totalStock = inventory.reduce((s, i) => s + i.currentStock, 0);
  const lowStockCount = inventory.filter(i => i.isLowStock).length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">🏭 Warehouse Overview</div>
          <div className="page-subtitle">Stock management & transfer approvals</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/warehouse')}>Manage Warehouse →</button>
      </div>

      <div className="stats-grid stats-grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Warehouse Stock</div>
          <div className="stat-value" style={{ color: '#a78bfa' }}>{totalStock.toLocaleString()}</div>
          <div className="stat-sub">Units stored</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock Products</div>
          <div className="stat-value" style={{ color: lowStockCount > 0 ? 'var(--red)' : 'var(--green)' }}>{lowStockCount}</div>
          <div className="stat-sub">{lowStockCount > 0 ? 'Restock needed' : 'All levels OK'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Transfers</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>{transfers.length}</div>
          <div className="stat-sub">Awaiting your approval</div>
        </div>
      </div>

      {transfers.length > 0 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              <span className="low-stock-dot" />Pending Transfer Requests
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => navigate('/transfers')}>View All →</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Product</th><th>Requested Qty</th><th>By</th><th>Action</th></tr></thead>
              <tbody>
                {transfers.slice(0, 5).map(t => (
                  <tr key={t._id}>
                    <td style={{ color: 'var(--text)', fontWeight: 600 }}>{t.product?.name}</td>
                    <td><span className="badge badge-orange">{t.quantity}</span></td>
                    <td>{t.requestedBy}</td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={() => navigate('/transfers')}>Review →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Stock Levels</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Current Stock</th><th>Sent to FC</th><th>Status</th></tr></thead>
            <tbody>
              {inventory.slice(0, 8).map(item => (
                <tr key={item._id}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{item.product?.name}</td>
                  <td><span className="mono" style={{ color: '#a78bfa', fontWeight: 700 }}>{item.currentStock}</span></td>
                  <td>{item.totalSentToFC}</td>
                  <td>
                    {item.isLowStock
                      ? <span className="badge badge-red">Low Stock</span>
                      : <span className="badge badge-green">OK</span>}
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
