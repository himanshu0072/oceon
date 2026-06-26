import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function TotalClientsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/b2b/dashboard");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  if (!data) return null;

  return (
    <div className="container" style={{ padding: 24 }}>
      <div className="page-header">
        <div>
          <h1>📊 B2B Clients Dashboard</h1>
          <p>Business intelligence and client analytics</p>
        </div>

        <button className="btn btn-primary" onClick={fetchDashboard}>
          ↻ Refresh
        </button>
      </div>

      {/* KPIs */}

      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Clients</div>

          <div className="stat-value">{data.totalClients}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Clients</div>

          <div className="stat-value" style={{ color: "var(--green)" }}>
            {data.activeClients}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Revenue</div>

          <div className="stat-value" style={{ color: "var(--accent)" }}>
            ₹{(data.totalRevenue || 0).toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Outstanding</div>

          <div className="stat-value" style={{ color: "var(--red)" }}>
            ₹{(data.outstanding || 0).toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* SECOND ROW */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>

          <div className="stat-value">{data.totalPurchases}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Order Value</div>

          <div className="stat-value">
            ₹{Math.round(data.averageOrderValue || 0).toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* CHART */}

      <div className="card">
        <div
          style={{
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Monthly Revenue
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlyRevenue}>
            <XAxis dataKey="month" tick={{ fill: "#8892b0" }} />

            <YAxis tick={{ fill: "#8892b0" }} />

            <Tooltip />

            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {(data.monthlyRevenue || []).map((_, index) => (
                <Cell
                  key={index}
                  fill={["#00d4ff", "#00e676", "#a78bfa", "#ffab40"][index % 4]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP CLIENTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginTop: 24,
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>🏆 Top Clients</h3>

          {(data.topClients || []).map((client, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {client.client.businessName}
                </div>

                <small>{client.orders} orders</small>
              </div>

              <div
                style={{
                  color: "var(--green)",
                  fontWeight: 700,
                }}
              >
                ₹{client.revenue.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 20 }}>⚠ Highest Outstanding</h3>

          {(data.highestOutstanding || []).map((client, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {client.client.businessName}
                </div>
              </div>

              <div
                style={{
                  color: "var(--red)",
                  fontWeight: 700,
                }}
              >
                ₹{client.due.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT PURCHASES */}

      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 20 }}>Recent Purchases</h3>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Due</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {(data.recentPurchases || []).map((purchase) => (
                <tr key={purchase._id}>
                  <td>{purchase.client?.businessName}</td>

                  <td>{purchase.invoiceNumber}</td>

                  <td>₹{purchase.finalAmount.toLocaleString("en-IN")}</td>

                  <td>₹{purchase.dueAmount.toLocaleString("en-IN")}</td>

                  <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
