import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchPurchases = async () => {
    try {
      const res = await api.get("/b2b/purchases");

      setPurchases(res.data);
    } catch (err) {
      toast.error("Failed to load purchases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const filtered = purchases.filter((purchase) => {
    const searchMatch =
      purchase.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
      purchase.client?.businessName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      purchase.client?.ownerName?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "all"
        ? true
        : statusFilter === "paid"
          ? purchase.dueAmount === 0
          : purchase.dueAmount > 0;

    return searchMatch && statusMatch;
  });

  const totalRevenue = filtered.reduce(
    (sum, purchase) => sum + purchase.finalAmount,
    0,
  );

  const totalDue = filtered.reduce(
    (sum, purchase) => sum + purchase.dueAmount,
    0,
  );

  if (loading) return <div>Loading purchases...</div>;

  return (
    <div className="container" style={{ padding: 24 }}>
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>📦 Purchase History</h1>
          <p>Complete B2B sales ledger and transaction history</p>
        </div>
      </div>

      {/* STATS */}

      <div className="stats-grid stats-grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>

          <div className="stat-value">{filtered.length}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Revenue</div>

          <div className="stat-value" style={{ color: "var(--green)" }}>
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Outstanding</div>

          <div className="stat-value" style={{ color: "var(--red)" }}>
            ₹{totalDue.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="card">
        <div
          style={{
            display: "flex",
            gap: 15,
            marginBottom: 20,
          }}
        >
          <input
            className="form-input"
            placeholder="Search invoice / client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-input"
            style={{ width: 200 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>

            <option value="paid">Fully Paid</option>

            <option value="pending">Payment Due</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice</th>
                <th>Client</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: 40,
                    }}
                  >
                    No purchases found
                  </td>
                </tr>
              ) : (
                filtered.map((purchase) => (
                  <tr key={purchase._id}>
                    <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>

                    <td>
                      <span
                        className="mono"
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        {purchase.invoiceNumber}
                      </span>
                    </td>

                    <td>
                      <div
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        {purchase.client?.businessName}
                      </div>

                      <div
                        style={{
                          color: "var(--text3)",
                          fontSize: 12,
                        }}
                      >
                        {purchase.client?.ownerName}
                      </div>
                    </td>

                    <td>
                      {purchase.items?.slice(0, 2).map((item, idx) => (
                        <div key={idx}>
                          {item.product?.name} x {item.quantity}
                        </div>
                      ))}

                      {purchase.items?.length > 2 && (
                        <small>+ {purchase.items.length - 2} more</small>
                      )}
                    </td>

                    <td
                      style={{
                        color: "var(--green)",
                        fontWeight: 600,
                      }}
                    >
                      ₹{purchase.finalAmount.toLocaleString("en-IN")}
                    </td>

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
