import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function ClientProfile() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClient = async () => {
    try {
      const res = await api.get(`/b2b/clients/${id}`);
      setData(res.data);
    } catch (err) {
      toast.error("Failed to load client");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  if (loading) return <div>Loading client profile...</div>;

  if (!data) return null;

  const { client, purchases, stats } = data;

  return (
    <div className="container" style={{ padding: 24 }}>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>🏢 {client.businessName}</h1>
          <p>{client.ownerName}</p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <a href={`tel:${client.mobile}`} className="btn btn-outline">
            📞 Call
          </a>

          <a
            href={`https://wa.me/91${client.mobile}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-grid stats-grid-4">
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{stats.totalOrders}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Lifetime Revenue</div>
          <div className="stat-value" style={{ color: "var(--green)" }}>
            ₹{stats.totalPurchaseAmount.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value" style={{ color: "var(--red)" }}>
            ₹{stats.totalDueAmount.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Credit Limit</div>
          <div className="stat-value">
            ₹{client.creditLimit?.toLocaleString("en-IN") || 0}
          </div>
        </div>
      </div>

      {/* BASIC DETAILS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginTop: 24,
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Client Information</h3>

          <div style={{ lineHeight: 2 }}>
            <div>
              <strong>Owner:</strong> {client.ownerName}
            </div>

            <div>
              <strong>Mobile:</strong> {client.mobile}
            </div>

            <div>
              <strong>Email:</strong> {client.email || "-"}
            </div>

            <div>
              <strong>GST:</strong> {client.gstNumber || "-"}
            </div>

            <div>
              <strong>City:</strong> {client.city}
            </div>

            <div>
              <strong>Address:</strong> {client.address}
            </div>

            <div>
              <strong>Status:</strong>{" "}
              <span className="badge badge-green">{client.status}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 20 }}>Business Summary</h3>

          <div style={{ lineHeight: 2 }}>
            <div>
              <strong>Business Type:</strong> {client.businessType || "-"}
            </div>

            <div>
              <strong>Created:</strong>{" "}
              {new Date(client.createdAt).toLocaleDateString()}
            </div>

            <div>
              <strong>Last Purchase:</strong>{" "}
              {purchases.length > 0
                ? new Date(purchases[0].createdAt).toLocaleDateString()
                : "No purchases"}
            </div>

            <div>
              <strong>Total Purchases:</strong> {purchases.length}
            </div>
          </div>
        </div>
      </div>

      {/* PURCHASE HISTORY */}

      <div className="card" style={{ marginTop: 24 }}>
        <div
          style={{
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Purchase History
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice</th>
                <th>Total Amount</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No purchases yet
                  </td>
                </tr>
              ) : (
                purchases.map((purchase) => (
                  <tr key={purchase._id}>
                    <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>

                    <td>{purchase.invoiceNumber}</td>

                    <td>₹{purchase.finalAmount.toLocaleString("en-IN")}</td>

                    <td>₹{purchase.paidAmount?.toLocaleString("en-IN")}</td>

                    <td
                      style={{
                        color:
                          purchase.dueAmount > 0
                            ? "var(--red)"
                            : "var(--green)",
                      }}
                    >
                      ₹{purchase.dueAmount?.toLocaleString("en-IN")}
                    </td>

                    <td>
                      {purchase.dueAmount > 0 ? (
                        <span className="badge badge-orange">Pending</span>
                      ) : (
                        <span className="badge badge-green">Paid</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
