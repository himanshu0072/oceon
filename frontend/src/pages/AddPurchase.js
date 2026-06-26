import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AddPurchase() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouseStock, setWarehouseStock] = useState({});

  const [selectedClient, setSelectedClient] = useState("");

  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientRes, productRes, warehouseRes] = await Promise.all([
        api.get("/b2b/clients"),
        api.get("/products"),
        api.get("/warehouse"),
      ]);

      setClients(clientRes.data);
      setProducts(productRes.data);

      // Create stock map
      const stockMap = {};

      warehouseRes.data.forEach((item) => {
        if (item.product) {
          stockMap[item.product._id] = item.currentStock || 0;
        }
      });

      setWarehouseStock(stockMap);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        product: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];

    // Quantity validation
    if (field === "quantity") {
      const stock = warehouseStock[updated[index].product] || 0;

      if (Number(value) > stock) {
        toast.error(`Only ${stock} units available in warehouse`);
        return;
      }
    }

    updated[index][field] = value;
    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0),
    0,
  );

  const finalAmount = subtotal - Number(discount || 0);

  const dueAmount = finalAmount - Number(paidAmount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClient) {
      return toast.error("Select client");
    }

    if (items.some((i) => !i.product || !i.quantity || !i.price)) {
      return toast.error("Fill all product details");
    }

    // Final stock validation
    for (let item of items) {
      const stock = warehouseStock[item.product] || 0;

      if (Number(item.quantity) > stock) {
        return toast.error(`Insufficient stock. Available: ${stock}`);
      }
    }

    setLoading(true);

    try {
      await api.post("/b2b/purchases", {
        client: selectedClient,
        items,
        subtotal,
        discount,
        finalAmount,
        paidAmount,
        dueAmount,
      });

      toast.success("Purchase added successfully");

      setSelectedClient("");

      setItems([
        {
          product: "",
          quantity: 1,
          price: 0,
        },
      ]);

      setDiscount(0);
      setPaidAmount(0);

      // refresh stock
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add purchase");
    }

    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: 24 }}>
      <div className="page-header">
        <h1>🛒 Add B2B Purchase</h1>
        <p>Create wholesale order for client</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* CLIENT */}

        <div className="card">
          <div
            style={{
              fontWeight: 700,
              marginBottom: 15,
            }}
          >
            Client Information
          </div>

          <select
            className="form-input"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
          >
            <option value="">Select Client</option>

            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.businessName} ({client.ownerName})
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCTS */}

        <div className="card" style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h3>Products</h3>

            <button type="button" className="btn btn-primary" onClick={addRow}>
              + Add Product
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Available Stock</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => {
                  const stock = warehouseStock[item.product] || 0;

                  return (
                    <tr key={index}>
                      <td>
                        <select
                          className="form-input"
                          value={item.product}
                          onChange={(e) =>
                            updateItem(index, "product", e.target.value)
                          }
                          required
                        >
                          <option value="">Select Product</option>

                          {products.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.name} (Stock: {warehouseStock[p._id] || 0})
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <span
                          style={{
                            color: stock > 0 ? "var(--green)" : "var(--red)",
                            fontWeight: 700,
                          }}
                        >
                          {stock}
                        </span>
                      </td>

                      <td>
                        <input
                          className="form-input"
                          type="number"
                          min="1"
                          max={stock}
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                        />

                        {Number(item.quantity) > stock && (
                          <small style={{ color: "red" }}>
                            Stock not available
                          </small>
                        )}
                      </td>

                      <td>
                        <input
                          className="form-input"
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(index, "price", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        ₹
                        {(
                          Number(item.quantity || 0) * Number(item.price || 0)
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {items.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removeRow(index)}
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAYMENT */}

        <div className="card" style={{ marginTop: 20 }}>
          <h3 style={{ marginBottom: 20 }}>Payment Summary</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            <div className="form-group">
              <label className="form-label">Discount</label>

              <input
                className="form-input"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Paid Amount</label>

              <input
                className="form-input"
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 15,
            }}
          >
            <div className="stat-card">
              <div className="stat-label">Subtotal</div>
              <div className="stat-value">
                ₹{subtotal.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Discount</div>
              <div className="stat-value">₹{discount}</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Final Amount</div>

              <div className="stat-value" style={{ color: "var(--green)" }}>
                ₹{finalAmount.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Due Amount</div>

              <div className="stat-value" style={{ color: "var(--red)" }}>
                ₹{dueAmount.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 30,
              textAlign: "right",
            }}
          >
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Purchase"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
