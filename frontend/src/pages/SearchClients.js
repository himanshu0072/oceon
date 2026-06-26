import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SearchClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await api.get(`/b2b/clients?search=${search}`);

      setClients(res.data);
    } catch (err) {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchClients();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const deleteClient = async (id) => {
    if (!window.confirm("Delete this client?")) return;

    try {
      await api.delete(`/b2b/clients/${id}`);

      toast.success("Client deleted");

      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  if (loading) return <div>Loading clients...</div>;

  return (
    <div className="container" style={{ padding: 24 }}>
      <div className="page-header">
        <div>
          <h1>🔍 Search B2B Clients</h1>
          <p>Search and manage all wholesale customers.</p>
        </div>
      </div>

      <div className="card">
        <input
          className="form-input"
          placeholder="Search by business, owner, mobile or GST..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card">
        <div
          style={{
            marginBottom: 15,
            fontWeight: 700,
          }}
        >
          Total Clients: {clients.length}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>Owner</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: 40,
                    }}
                  >
                    No clients found
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
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

                    <td>{client.city}</td>

                    <td>
                      {client.status === "Active" ? (
                        <span className="badge badge-green">Active</span>
                      ) : (
                        <span className="badge badge-red">Inactive</span>
                      )}
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => navigate(`/app/client/${client._id}`)}
                        >
                          View
                        </button>

                        <a
                          className="btn btn-sm btn-outline"
                          href={`tel:${client.mobile}`}
                        >
                          Call
                        </a>

                        <a
                          className="btn btn-sm btn-primary"
                          target="_blank"
                          rel="noreferrer"
                          href={`https://wa.me/91${client.mobile}`}
                        >
                          WhatsApp
                        </a>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteClient(client._id)}
                        >
                          Delete
                        </button>
                      </div>
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
