import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    gstNumber: "",
    panNumber: "",
    businessType: "Kirana Store",
    address: "",
    city: "",
    state: "",
    pincode: "",
    creditLimit: "",
    paymentTerms: "Cash",
    notes: "",
  });

  const fetchClients = async () => {
    try {
      const res = await api.get("/b2b/clients");

      setClients(res.data);
    } catch (err) {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.businessName || !form.ownerName || !form.mobile) {
      return toast.error("Business name, owner and mobile are required");
    }

    setSubmitting(true);

    try {
      await api.post("/b2b/clients", form);

      toast.success("Client registered successfully");

      setShowModal(false);

      setForm({
        businessName: "",
        ownerName: "",
        mobile: "",
        alternateMobile: "",
        email: "",
        gstNumber: "",
        panNumber: "",
        businessType: "Kirana Store",
        address: "",
        city: "",
        state: "",
        pincode: "",
        creditLimit: "",
        paymentTerms: "Cash",
        notes: "",
      });

      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register client");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.businessName?.toLowerCase().includes(search.toLowerCase()) ||
      c.ownerName?.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile?.includes(search),
  );

  const activeClients = clients.filter((c) => c.status === "Active").length;

  const inactiveClients = clients.length - activeClients;

  if (loading) return <div>Loading clients...</div>;

  return (
    <div className="container" style={{ padding: 24 }}>
      {/* Header */}

      <div className="page-header">
        <div>
          <h1>🤝 B2B Clients</h1>

          <p style={{ color: "var(--text3)" }}>
            Register and manage wholesale customers
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Register Client
        </button>
      </div>

      {/* Stats */}

      <div className="stats-grid stats-grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Clients</div>

          <div className="stat-value">{clients.length}</div>

          <div className="stat-sub">Registered wholesalers</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Clients</div>

          <div className="stat-value" style={{ color: "var(--green)" }}>
            {activeClients}
          </div>

          <div className="stat-sub">Currently active</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Inactive Clients</div>

          <div className="stat-value" style={{ color: "var(--red)" }}>
            {inactiveClients}
          </div>

          <div className="stat-sub">Require follow-up</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Credit Exposure</div>

          <div className="stat-value" style={{ color: "var(--accent)" }}>
            ₹
            {clients
              .reduce((s, c) => s + (c.creditLimit || 0), 0)
              .toLocaleString("en-IN")}
          </div>

          <div className="stat-sub">Total credit limit</div>
        </div>
      </div>

      {/* Clients Table */}

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Clients ({filtered.length})
          </div>

          <input
            className="form-input"
            style={{ width: 250 }}
            placeholder="Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>Owner</th>
                <th>Mobile</th>
                <th>Type</th>
                <th>City</th>
                <th>Credit Limit</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: 40,
                    }}
                  >
                    No clients found
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client._id}>
                    <td
                      style={{
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      {client.businessName}
                    </td>

                    <td>{client.ownerName}</td>

                    <td>{client.mobile}</td>

                    <td>{client.businessType}</td>

                    <td>{client.city}</td>

                    <td>
                      ₹{(client.creditLimit || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {client.status === "Active" ? (
                        <span className="badge badge-green">● Active</span>
                      ) : (
                        <span className="badge badge-red">● Inactive</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal" style={{ maxWidth: 700 }}>
            <div className="modal-title">📝 Register B2B Client</div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <input
                className="form-input"
                placeholder="Business Name *"
                value={form.businessName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    businessName: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Owner Name *"
                value={form.ownerName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ownerName: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Mobile *"
                value={form.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Alternate Mobile"
                value={form.alternateMobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    alternateMobile: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="GST Number"
                value={form.gstNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gstNumber: e.target.value,
                  })
                }
              />

              <select
                className="form-input"
                value={form.businessType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    businessType: e.target.value,
                  })
                }
              >
                <option>Kirana Store</option>
                <option>Restaurant</option>
                <option>Hotel</option>
                <option>Caterer</option>
                <option>Distributor</option>
                <option>Supermarket</option>
                <option>Other</option>
              </select>

              <input
                className="form-input"
                placeholder="Credit Limit"
                type="number"
                value={form.creditLimit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    creditLimit: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value,
                  })
                }
              />

              <input
                className="form-input"
                placeholder="State"
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value,
                  })
                }
              />

              <textarea
                className="form-input"
                placeholder="Address"
                rows={3}
                style={{
                  gridColumn: "1 / span 2",
                }}
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
              />

              <textarea
                className="form-input"
                placeholder="Notes"
                rows={3}
                style={{
                  gridColumn: "1 / span 2",
                }}
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
              />

              <div
                style={{
                  gridColumn: "1 / span 2",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Registering..." : "Register Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
